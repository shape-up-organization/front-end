import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { Stack } from '@mui/material'

import { useAuth, useChat } from '@contexts'
import { useVisible } from '@hooks'

import { useStyles } from './Content.styles'
import { Footer } from './Footer'

import { Header } from './Header'
import { MessagesList } from './MessagesList'

const Content = () => {
  const { extractUsername } = useAuth()
  const {
    activeChat,
    canSendMessage,
    chatsData,
    sendPrivateMessage,
    sendPublicMessage,
  } = useChat()
  const [listBottomRef, isListBottomVisible] = useVisible()

  const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null)
  const [isScrollingDown, setIsScrollingDown] = useState(true)
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState('')
  const [username, setUsername] = useState('')

  const emojiButtonRef = useRef(null)
  const { classes } = useStyles()

  const emojiPickerOpen = Boolean(emojiPickerAnchorEl)

  useEffect(() => {
    getUsername()
  }, [])

  useEffect(() => {
    setIsScrollingDown(false)
  }, [isListBottomVisible])

  useEffect(() => {
    setMessages(activeChat?.messages)
  }, [activeChat])

  useLayoutEffect(() => {
    if (messages.at(-1)?.senderName !== username && !isListBottomVisible) {
      return
    }
    handleScrollToBottom()
  }, [chatsData, messages])

  const getUsername = async () => {
    const usernamePromise = await extractUsername()
    setUsername(usernamePromise)
  }

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
    listBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (canSendMessage && messageText.trim()) {
      if (activeChat.username === 'group1') {
        sendPublicMessage(messageText, activeChat.username)
      } else {
        sendPrivateMessage(messageText, activeChat.username)
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
        username={username}
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
      {/* <Grid container alignItems="center" height="20%" rowGap={0}>
        <Grid item xs={12}>
          <Badge
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            badgeContent={
              <Zoom
                in={!isListBottomVisible && !isScrollingDown}
                easing="ease-out"
              >
                <Tooltip
                  placement="top-start"
                  title={t('pages.chat.tooltip.scrollToBottom')}
                  sx={{
                    bgcolor: 'background.default',
                    mt: 1,
                    ml: 1,
                    zIndex: 1200,
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={handleScrollToBottom}
                    type="button"
                  >
                    <ArrowDownwardRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Zoom>
            }
            sx={{ width: '100%' }}
          >
            <TextField
              fullWidth
              onChange={event => setMessageText(event.target.value)}
              onKeyPress={handleKeyPress}
              maxRows={3}
              multiline
              placeholder={t('pages.chat.others.messageInputPlaceholder')}
              value={messageText}
              variant="outlined"
            />
          </Badge>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <Tooltip
                placement="bottom-start"
                title={t('pages.chat.tooltip.emojiPickerButton')}
              >
                <IconButton
                  color="primary"
                  onClick={handleOpenEmojiPicker}
                  ref={emojiButtonRef}
                >
                  <EmojiEmotionsIcon />
                </IconButton>
              </Tooltip>
              <Popover
                anchorEl={emojiPickerAnchorEl}
                onClose={handleCloseEmojiPicker}
                open={emojiPickerOpen}
              >
                <EmojiPicker
                  data={emojisData}
                  onEmojiSelect={emojiObject =>
                    setMessageText(messageText + emojiObject.native)
                  }
                />
              </Popover>
            </Grid>
            <Grid item xs={10} display="flex" justifyContent="flex-end">
              <IconButton color="primary" onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </Stack>
  )
}

export { Content }
