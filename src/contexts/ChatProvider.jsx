import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import P from 'prop-types'
import SockJS from 'sockjs-client'
import { over } from 'stompjs'

import { useMediaQuery, useTheme } from '@mui/material'

import api from '@api/services/friends'
import mockedSquads from '@mocks/squads/get'
import { formatLocalDate } from '@utils/helpers/dateTime'
import { normalize } from '@utils/helpers/strings'

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
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState({
    connected: false,
    profilePicture: null,
    username: null,
  })

  const lessThanMedium = useMediaQuery(useTheme().breakpoints.down('md'))

  const [displayChat, setDisplayChat] = useState(
    !lessThanMedium || !!activeChat
  )
  const [displayMessagesList, setDisplayMessagesList] = useState(
    !lessThanMedium || (lessThanMedium && !activeChat)
  )
  const [responsiveSize, setResponsiveSize] = useState(
    lessThanMedium ? 'mobile' : 'desktop'
  )

  useEffect(() => {
    if (userData.username) connect(userData.username)
  }, [userData.username])

  useEffect(() => {
    if (!chatsData.deprecated) connect(userData.username)
  }, [chatsData.deprecated])

  useEffect(() => {
    setDisplayChat(!lessThanMedium || !!activeChat)
    setDisplayMessagesList(!lessThanMedium || (lessThanMedium && !activeChat))
    setResponsiveSize(lessThanMedium ? 'mobile' : 'desktop')
  }, [lessThanMedium])

  const connect = async username => {
    if (!stompClient && !chatsData.deprecated) {
      const Sock = new SockJS(`${import.meta.env.VITE_API_URL}/ws`)
      stompClient = over(Sock)
      stompClient.connect({}, () => onConnected(username), onError)
      // if (import.meta.env.MODE === 'production')
      stompClient.debug = () => {}
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
        console.log('JOINING PUBLIC')
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

  const updateUserData = data => setUserData(data)

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
              normalize(chat.name).includes(normalize(value))
            )
          : null,
    }))

  const loadData = async nextUserData => {
    if (!userData.connected) updateUserData(nextUserData)

    if (chatsData.deprecated) {
      setIsLoading(true)

      const response = await api.getAllFriendship(nextUserData.jwtToken)

      if (response.status === 200) {
        let type = null
        if (response.data?.length > 0) type = 'friends'
        else if (mockedSquads.data.squads?.length > 0) type = 'squads'

        setChatsData({
          ...chatsData,
          friends: response.data
            ?.filter(friend => friend.username !== nextUserData.username)
            ?.map(friend => ({
              ...friend,
              name: `${friend.firstName} ${friend.lastName || ''}`,
              messages: [],
            })),
          squads: mockedSquads.data.squads,
          type,
          deprecated: false,
        })

        loadTotalNotifications(response.data)

        setIsLoading(false)
      }
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

  const values = useMemo(
    () => ({
      activeChat,
      changeChatType,
      chatsData,
      closeChat,
      displayChat,
      displayMessagesList,
      filterChats,
      isLoading,
      loadData,
      openChat,
      responsiveSize,
      sendPrivateMessage,
      sendPublicMessage,
      userData,
    }),
    [activeChat, chatsData, isLoading, responsiveSize, userData]
  )

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
}

ChatProvider.propTypes = {
  children: P.node.isRequired,
}

export const useChat = () => useContext(ChatContext)
