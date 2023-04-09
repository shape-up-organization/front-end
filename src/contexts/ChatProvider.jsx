import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useMediaQuery, useTheme } from '@mui/material'
import P from 'prop-types'

import mockedFriends from '@mocks/friends/get'
import { getLocalDateTimeFormatted } from '@utils/dateTimeHelper'
import { normalize } from '@utils/stringHelper'

import SockJS from 'sockjs-client'
import { over } from 'stompjs'

const ChatContext = createContext()
let stompClient = null

export const ChatProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState(null)
  const [canSendMessage, setCanSendMessage] = useState(true)
  const [chatsData, setChatsData] = useState({
    deprecated: true,
    friends: [],
    squads: [],
    type: 'friends',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [totalNotifications, setTotalNotifications] = useState(0)
  const [userData, setUserData] = useState({
    username: '',
    connected: false,
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
      if (import.meta.env.MODE === 'production') stompClient.debug = () => {}
    }
  }

  const onConnected = async username => {
    stompClient.subscribe('/chatroom/public', onPublicMessage)
    stompClient.subscribe(`/user/${username}/private`, onPrivateMessage)

    stompClient.send(
      '/app/message',
      {},
      JSON.stringify({
        date: getLocalDateTimeFormatted(),
        message: '',
        senderName: username,
        status: 'JOIN',
      })
    )

    // TODO: Fix private chat
    // const chatMessage = {
    //   date: getLocalDateTimeFormatted(),
    //   message: '',
    //   receiverName: username,
    //   senderName: username,
    //   status: 'JOIN',
    // }
    // stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage))
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
        addMessageToChat(payload.message, payload.senderName)
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
        addMessageToChat(payload, 'squads')
        break
      default:
        break
    }
  }

  const sendPublicMessage = (message, receiverName) => {
    if (stompClient) {
      setCanSendMessage(false)
      const chatMessage = {
        date: getLocalDateTimeFormatted(),
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
      setCanSendMessage(false)
      const chatMessage = {
        date: getLocalDateTimeFormatted(),
        message,
        receiverName,
        senderName: userData.username,
        status: 'MESSAGE',
      }

      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage))
    }
  }

  const updateUsername = username =>
    setUserData(current => ({ ...current, username }))

  const addMessageToChat = (
    { date, message, senderName, receiverName },
    type
  ) => {
    const newChat = chatsData[type].map(chat => {
      if (chat.username === receiverName) {
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
    setCanSendMessage(true)
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

  const getChatType = () => chatsData.type

  const filterChats = useCallback(
    value => {
      if (value === '') return
      const filteredChats = chatsData[chatsData.type].filter(({ name }) =>
        normalize(name).includes(normalize(value))
      )
      setChatsData(current => ({ ...current, [chatsData.type]: filteredChats }))
    },
    [chatsData.type]
  )

  const loadData = () => {
    if (chatsData.deprecated) {
      setIsLoading(true)
      const mockedData = mockedFriends.data
      setChatsData({
        ...chatsData,
        friends: mockedData.friends,
        squads: mockedData.squads,
        deprecated: false,
      })
      loadTotalNotifications(mockedData)
      setIsLoading(false)
    }
  }

  const loadTotalNotifications = obj => {
    setTotalNotifications(
      (obj.friends?.reduce(
        (acc, { unreadMessages }) => acc + unreadMessages,
        0
      ) || 0) +
        (obj.squads?.reduce(
          (acc, { unreadMessages }) => acc + unreadMessages,
          0
        ) || 0)
    )
  }

  const values = useMemo(
    () => ({
      displayChat,
      displayMessagesList,
      responsiveSize,
      activeChat,
      canSendMessage,
      changeChatType,
      chatsData,
      closeChat,
      filterChats,
      getChatType,
      isLoading,
      loadData,
      openChat,
      sendPublicMessage,
      sendPrivateMessage,
      totalNotifications,
      updateUsername,
    }),
    [
      activeChat,
      canSendMessage,
      chatsData,
      isLoading,
      totalNotifications,
      responsiveSize,
    ]
  )

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
}

ChatProvider.propTypes = {
  children: P.node.isRequired,
}

export const useChat = () => useContext(ChatContext)
