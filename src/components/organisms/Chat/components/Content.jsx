import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { Stack } from '@mui/material'

import { useChat } from '@contexts'
import { useVisible } from '@hooks'
import { lineBreaksToCharacters } from '@utils/helpers/strings'

import { Footer } from './Footer'
import { Header } from './Header'
import { MessagesList } from './MessagesList'

import { useStyles } from './Content.styles'

const Content = () => {
  const {
    activeChat,
    chatsData,
    sendPrivateMessage,
    sendPublicMessage,
    userData,
  } = useChat()
  const [listBottomRef, isListBottomVisible] = useVisible()

  const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null)
  const [isScrollingDown, setIsScrollingDown] = useState(true)
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState('')

  const emojiButtonRef = useRef(null)
  const { classes } = useStyles()

  const emojiPickerOpen = Boolean(emojiPickerAnchorEl)

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

  const handleChangeMessageText = ({ target: { value } }) =>
    setMessageText(value)

  const handleCloseEmojiPicker = () => setEmojiPickerAnchorEl(null)

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (event.shiftKey) {
        setMessageText(`${messageText}\n`)
        return
      }

      if (event.ctrlKey) {
        emojiButtonRef.current.click()
        return
      }

      handleSendMessage()
    }
  }

  const handleOpenEmojiPicker = event =>
    setEmojiPickerAnchorEl(event.currentTarget)

  const handleScrollToBottom = () => {
    setIsScrollingDown(true)
    listBottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      if (activeChat.username === 'group1') {
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

  const handleSelectEmoji = emoji => {
    setMessageText(messageText + emoji.native)
    handleCloseEmojiPicker()
  }

  return (
    <Stack
      className={classes.content}
      height="100%"
      justifyContent="space-between"
      overflow="auto"
      p={2}
    >
      <Header />
      <MessagesList
        listBottomRef={listBottomRef}
        messages={messages}
        username={userData.username}
      />
      <Footer
        emojiButtonRef={emojiButtonRef}
        emojiPickerAnchorEl={emojiPickerAnchorEl}
        emojiPickerOpen={emojiPickerOpen}
        handleChangeMessageText={handleChangeMessageText}
        handleCloseEmojiPicker={handleCloseEmojiPicker}
        handleKeyPress={handleKeyPress}
        handleOpenEmojiPicker={handleOpenEmojiPicker}
        handleSelectEmoji={handleSelectEmoji}
        handleSendMessage={handleSendMessage}
        handleScrollToBottom={handleScrollToBottom}
        isListBottomVisible={isListBottomVisible}
        isScrollingDown={isScrollingDown}
        messageText={messageText}
      />
    </Stack>
  )
}

export { Content }
