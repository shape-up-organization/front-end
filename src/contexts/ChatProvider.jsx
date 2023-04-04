import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import P from 'prop-types'

import mockedFriends from '@mocks/users/friends/get'
import { normalize } from '@utils/stringManipulation'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [data, setData] = useState({})
  const [chatsList, setChatsList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [chatType, setChatType] = useState('')

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

      if (mockedData.friends?.length > 0) {
        setChatType('friends')
      } else if (mockedData.squads?.length > 0) {
        setChatType('squads')
      } else {
        setChatType(null)
      }

      setIsLoading(false)
    }, 1000)
  }

  const updateChats = () => setChatsList(data[chatType] || undefined)

  useEffect(() => {
    if (data) updateChats()
  }, [chatType])

  const values = useMemo(
    () => ({
      changeChatType,
      chatsList,
      chatType,
      filterChats,
      isLoading,
      loadData,
    }),
    [chatsList, chatType]
  )

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
}

ChatProvider.propTypes = {
  children: P.node.isRequired,
}

export const useChat = () => useContext(ChatContext)
