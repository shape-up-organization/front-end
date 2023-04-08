import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import P from 'prop-types'

import mockedFriends from '@mocks/friends/get'
import { normalize } from '@utils/stringManipulation'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [data, setData] = useState({})
  const [activeChat, setActiveChat] = useState(null)
  const [chatsList, setChatsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [chatType, setChatType] = useState('')
  const [totalNotifications, setTotalNotifications] = useState(0)

  const openChat = username => {
    const newChat = data[chatType]?.find(chat => chat.username === username)
    if (newChat) setActiveChat(newChat)
  }

  const changeChatType = newChatType => setChatType(newChatType)

  const filterChats = useCallback(
    value => {
      if (value === '') {
        updateChats()
        return
      }
      const filteredChats = data[chatType].filter(({ name }) =>
        normalize(name).includes(normalize(value))
      )
      setChatsList(filteredChats)
    },
    [chatType]
  )

  const loadData = () => {
    setIsLoading(true)
    setTimeout(() => {
      const mockedData = mockedFriends.data
      setData(mockedData)

      loadTotalNotifications(mockedData)
      setupChats(mockedData)

      setIsLoading(false)
    }, 1)
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

  const setupChats = obj => {
    if (obj.friends?.length > 0) {
      setChatType('friends')
    } else if (obj.squads?.length > 0) {
      setChatType('squads')
    } else {
      setChatType(null)
    }
  }

  const updateChats = () => setChatsList(data[chatType] || undefined)

  useEffect(() => {
    if (data) updateChats()
  }, [chatType])

  const values = useMemo(
    () => ({
      changeChatType,
      activeChat,
      chatsList,
      chatType,
      filterChats,
      isLoading,
      loadData,
      openChat,
      totalNotifications,
    }),
    [activeChat, chatsList, chatType, totalNotifications]
  )

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
}

ChatProvider.propTypes = {
  children: P.node.isRequired,
}

export const useChat = () => useContext(ChatContext)
