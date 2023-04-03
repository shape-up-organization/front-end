import { createContext, useCallback, useContext, useState } from 'react'

import P from 'prop-types'

const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
  const [chats] = useState([{}])

  const values = useCallback(
    () => ({
      chats,
    }),
    []
  )

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
}

ChatProvider.propTypes = { children: P.node.isRequired }

export const useChat = () => useContext(ChatContext)
