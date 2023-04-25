import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import P from 'prop-types'
import SockJS from 'sockjs-client'
import { over } from 'stompjs'

import { useMediaQuery } from '@mui/material'

import apiFriends from '@api/services/friends'
import apiPresence from '@api/services/presence'
import apiUsers from '@api/services/users'
import mockedSquads from '@mocks/squads/get'
import { formatLocalDate } from '@utils/helpers/dateTime'
import { normalizeString } from '@utils/helpers/strings'

const ChatContext = createContext()
let stompClient = null

export const ChatProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState(null)
  const [chatsData, setChatsData] = useState({
    deprecated: true,
    filteredChats: null,
    friends: [],
    notifications: {
      friends: 0,
      squads: 0,
      total: 0,
    },
    squads: [],
    type: 'friends',
  })
  const [friendsOnline, setFriendsOnline] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState({
    connected: false,
    onChat: false,
    profilePicture: null,
    username: null,
  })

  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))

  const [displayChat, setDisplayChat] = useState(
    !lessThanMedium || !!activeChat
  )
  const [displayMessagesList, setDisplayMessagesList] = useState(
    !lessThanMedium || (lessThanMedium && !activeChat)
  )
  const [responsiveSize, setResponsiveSize] = useState(
    lessThanMedium ? 'mobile' : 'desktop'
  )

  const beOnline = async () => {
    window.onbeforeunload = async () => {
      await apiPresence.markOffline(userData.id)
      updateUserData({ connected: false })
    }
    await apiPresence.markOnline(userData.id)
  }

  const beOffline = async () => apiPresence.markOffline(userData.id)

  useEffect(() => {
    if (userData.connected) {
      beOnline()
      return
    }
    beOffline()
  }, [userData.connected])

  useEffect(() => {
    if (!chatsData.deprecated) connect()
  }, [chatsData.deprecated])

  useEffect(() => {
    if (activeChat)
      setActiveChat(
        chatsData[chatsData.type].find(
          chat => chat.username === activeChat.username
        )
      )
  }, [chatsData.friends, chatsData.squads])

  useEffect(() => {
    setDisplayChat(!lessThanMedium || !!activeChat)
    setDisplayMessagesList(!lessThanMedium || (lessThanMedium && !activeChat))
    setResponsiveSize(lessThanMedium ? 'mobile' : 'desktop')
  }, [lessThanMedium])

  const connect = async () => {
    if (!stompClient && !chatsData.deprecated) {
      if (import.meta.env.VITE_ENABLE_WS !== 'true') return
      const Sock = new SockJS(`${import.meta.env.VITE_API_URL}/ws`)
      stompClient = over(Sock)
      stompClient.debug = () => {}
      await stompClient.connect(
        {},
        () => onConnected(userData.username),
        onError
      )
    }
  }

  const onConnected = async username => {
    stompClient.subscribe('/chatroom/public', onPublicMessage)
    stompClient.subscribe(`/user/${username}/private`, onPrivateMessage)

    stompClient.send(
      '/app/message',
      {},
      JSON.stringify({
        message: '',
        senderName: username,
        status: 'JOIN',
      })
    )
  }

  const onError = error => {
    console.error(error)
  }

  const onPrivateMessage = ({ body }) => {
    const payload = JSON.parse(body)
    switch (payload.status) {
      case 'JOIN':
        console.log('JOINING PRIVATE')
        break
      case 'MESSAGE':
        addMessageToChat(
          { ...payload, date: formatLocalDate(payload.date) },
          'friends',
          'receiving'
        )
        break
      default:
        break
    }
  }

  const onPublicMessage = ({ body }) => {
    const payload = JSON.parse(body)
    switch (payload.status) {
      case 'JOIN':
        updateUserData({ connected: true })
        break
      case 'MESSAGE':
        addMessageToChat(
          { ...payload, date: formatLocalDate(payload.date) },
          'squads',
          'sending'
        )
        break
      default:
        break
    }
  }

  const sendPublicMessage = (message, receiverName) => {
    if (stompClient) {
      const chatMessage = {
        message,
        receiverName,
        senderName: userData.username,
        status: 'MESSAGE',
      }
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage))
    }
  }

  const sendPrivateMessage = (message, receiverName) => {
    if (stompClient) {
      const chatMessage = {
        message,
        receiverName,
        senderName: userData.username,
        status: 'MESSAGE',
      }

      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage))
      addMessageToChat(
        { ...chatMessage, date: formatLocalDate(new Date()) },
        'friends',
        'sending'
      )
    }
  }

  const updateUserData = async data =>
    setUserData(current => ({ ...current, ...data }))

  const addMessageToChat = (payload, type, status) => {
    const { date, message, senderName, receiverName } = payload
    const newChat = chatsData[type].map(chat => {
      if (
        chat.username === (status === 'receiving' ? senderName : receiverName)
      ) {
        chat.messages.push({ date, message, senderName })
      }
      return {
        ...chat,
        lastMessage: {
          date,
          message,
        },
      }
    })

    setChatsData(current => ({ ...current, [type]: newChat }))
  }

  const openChat = username => {
    const newChat = chatsData[chatsData.type]?.find(
      chat => chat.username === username
    )
    if (newChat) {
      if (lessThanMedium) {
        setDisplayChat(true)
        setDisplayMessagesList(false)
      }
      setActiveChat(newChat)
    }
  }

  const closeChat = () => {
    setActiveChat(null)
    if (lessThanMedium) {
      setDisplayChat(false)
      setDisplayMessagesList(true)
    }
  }

  const changeChatType = newChatType =>
    setChatsData(current => ({ ...current, type: newChatType }))

  const filterChats = value =>
    setChatsData(current => ({
      ...current,
      filteredChats:
        value !== ''
          ? chatsData[chatsData.type]?.filter(chat =>
              normalizeString(chat.name).includes(normalizeString(value))
            )
          : null,
    }))

  const createOnlineEventSource = async friend => {
    const { id } = friend

    new EventSource(
      `${import.meta.env.VITE_API_URL}/presence/stream?userId=${id}`
    ).onmessage = event => {
      const data = JSON.parse(event.data)
      setFriendsOnline(current => ({
        ...current,
        [friend.username]: data.online,
      }))
    }
  }

  const loadData = async nextUserData => {
    await updateUserData(nextUserData)

    await connect()

    setIsLoading(true)

    const response = await apiFriends.getAllFriendship()

    if (response.status === 200) {
      let type = null
      if (response.data?.length > 0) type = 'friends'
      else if (mockedSquads.data.squads?.length > 0) type = 'squads'

      const newData = {
        ...chatsData,
        friends: response.data
          ?.filter(friend => friend.username !== nextUserData.username)
          ?.map(friend => ({
            ...friend,
            name: `${friend.firstName} ${friend.lastName || ''}`,
            messages: [],
            online: undefined,
          })),
        squads: mockedSquads.data.squads,
        type,
        deprecated: false,
      }

      newData.friends.forEach(friend => createOnlineEventSource(friend))

      setChatsData(newData)

      loadTotalNotifications(response.data)

      setIsLoading(false)
    }
  }

  const loadTotalNotifications = data => {
    const friends =
      data?.friends?.reduce((acc, cur) => acc + cur.unreadMessages, 0) || 0
    const squads =
      data?.squads?.reduce((acc, cur) => acc + cur.unreadMessages, 0) || 0
    const total = friends + squads

    setChatsData(current => ({
      ...current,
      notifications: { friends, squads, total },
    }))
  }

  const getUserData = async username => {
    if (username === userData.username) {
      return { data: userData, relation: 'current', status: 200 }
    }

    const friendUser = chatsData.friends.find(
      friend => friend.username === username
    )
    if (friendUser) return { data: friendUser, relation: 'friend', status: 200 }

    const { data, status } = await apiUsers.searchByUsername(username)
    return { data, relation: 'user', status }
  }

  const values = useMemo(
    () => ({
      activeChat,
      changeChatType,
      chatsData,
      closeChat,
      displayChat,
      displayMessagesList,
      filterChats,
      friendsOnline,
      getUserData,
      isLoading,
      loadData,
      openChat,
      responsiveSize,
      sendPrivateMessage,
      sendPublicMessage,
      updateUserData,
      userData,
    }),
    [activeChat, chatsData, friendsOnline, isLoading, responsiveSize, userData]
  )

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
}

ChatProvider.propTypes = {
  children: P.node.isRequired,
}

export const useChat = () => useContext(ChatContext)
