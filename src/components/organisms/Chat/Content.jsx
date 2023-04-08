import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import emojisData from '@emoji-mart/data'
import EmojiPicker from '@emoji-mart/react'
import { useTranslation } from 'react-i18next'

import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import SendIcon from '@mui/icons-material/Send'
import {
  Badge,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  Popover,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material'

import { useVisible } from '@hooks'

import { useStyles } from './Content.styles'
import { Header } from './Header'

const username = 'user'

const Content = () => {
  const { t } = useTranslation()
  const [listBottomRef, isListBottomVisible] = useVisible()

  const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null)
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState('')
  const [isScrollingDown, setIsScrollingDown] = useState(true)

  const listRef = useRef(null)
  const emojiButtonRef = useRef(null)

  const { classes } = useStyles()

  const emojiPickerOpen = Boolean(emojiPickerAnchorEl)

  useEffect(() => {
    setIsScrollingDown(false)
  }, [isListBottomVisible])

  useLayoutEffect(() => {
    handleScrollToBottom()
  }, [messages])

  const handleClickEmoji = event => {
    setEmojiPickerAnchorEl(event.currentTarget)
  }

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

  const handleScrollToBottom = () => {
    setIsScrollingDown(true)
    listBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: messageText, sender: username },
      ])
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
    >
      <Header />
      <List
        ref={listRef}
        sx={{
          height: '80%',
          overflow: 'scroll',
        }}
      >
        {messages.map(message => (
          <ListItem
            key={message.id}
            sx={{
              justifyContent:
                message.sender === username ? 'flex-end' : 'flex-start',
            }}
          >
            <Typography component="p" variant="body1">
              {message.text}
            </Typography>
          </ListItem>
        ))}
        <Box component="span" ref={listBottomRef} />
      </List>
      <Grid container alignItems="center" height="20%" rowGap={0}>
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
                    zIndex: 3000,
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
                  onClick={handleClickEmoji}
                  ref={emojiButtonRef}
                >
                  <EmojiEmotionsIcon />
                </IconButton>
              </Tooltip>
              <Popover
                anchorEl={emojiPickerAnchorEl}
                onClose={() => setEmojiPickerAnchorEl(null)}
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
      </Grid>
    </Stack>
  )
}

export { Content }
