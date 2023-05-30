import { useEffect, useLayoutEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { Stack } from '@mui/material'

import { TextArea } from '@molecules/TextArea'

import { useChat } from '@contexts'
import { useVisible } from '@hooks'
import { lineBreaksToCharacters } from '@utils/helpers/strings'

import { MessagesList } from './MessagesList'

import { useStyles } from './Content.styles'
import { UserButton } from './UserButton'

const Content = () => {
  const { t } = useTranslation()
  const {
    activeChat,
    chatsData,
    sendPrivateMessage,
    sendPublicMessage,
    userData,
  } = useChat()
  const [listBottomRef, isListBottomVisible] = useVisible()

  const [isScrollingDown, setIsScrollingDown] = useState(true)
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState('')

  const { classes } = useStyles()

  useEffect(() => {
    setIsScrollingDown(false)
  }, [isListBottomVisible])

  useEffect(() => {
    setMessages(activeChat?.messages)
  }, [activeChat])

  useLayoutEffect(() => {
    if (
      messages.at(-1)?.senderName !== userData.username &&
      !isListBottomVisible
    ) {
      return
    }
    handleScrollToBottom()
  }, [chatsData, messages])

  const handleScrollToBottom = () => {
    setIsScrollingDown(true)
    listBottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      if (activeChat.username === 'forum-shapeup') {
        sendPublicMessage(
          lineBreaksToCharacters(messageText),
          activeChat.username
        )
      } else {
        sendPrivateMessage(
          lineBreaksToCharacters(messageText),
          activeChat.username
        )
      }
      setMessageText('')
    }
  }

  return (
    <Stack
      className={classes.content}
      height="100%"
      justifyContent="space-between"
      overflow="auto"
      p={2}
      pb={{ xs: 8, md: 4 }}
    >
      <UserButton />
      <MessagesList listBottomRef={listBottomRef} messages={messages} />
      <TextArea
        handleSendMessage={handleSendMessage}
        interfaceOptions={{
          alwaysShowBottom: true,
          isLoading: !userData.connected,
          textAreaProps: {
            maxRows: 3,
          },
        }}
        messageState={[messageText, setMessageText]}
        scrollRelated={{
          handleScrollToBottom,
          isListBottomVisible,
          isScrollingDown,
        }}
        texts={{
          sendButton: t('pages.chat.tooltip.sendMessageButton'),
          inputPlaceholder: t('pages.chat.others.messageInputPlaceholder'),
        }}
      />
    </Stack>
  )
}

export { Content }
