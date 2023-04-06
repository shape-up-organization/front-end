import { useLayoutEffect, useRef, useState } from 'react'

import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import SendIcon from '@mui/icons-material/Send'
import {
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material'

import { useStyles } from './Content.styles'

const username = 'user'

const Content = () => {
  const { classes } = useStyles()
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá, tudo bem?',
      sender: 'user',
    },
    {
      id: 2,
      text: 'Tudo sim, e você?',
      sender: 'bot',
    },
    {
      id: 3,
      text: 'Também tudo bem, obrigado!',
      sender: 'user',
    },
  ])
  const [messageText, setMessageText] = useState('')

  const listRef = useRef(null)

  const handleSendMessage = () => {
    console.log(listRef.current)
    if (messageText.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: messageText, sender: username },
      ])
      setMessageText('')
    }
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }

  useLayoutEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  return (
    <Grid
      item
      className={classes.content}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      padding={2}
      pb={8}
      px={2}
      rowGap={1}
      width="100%"
    >
      <List
        ref={listRef}
        sx={{
          height: '72%',
          overflow: 'scroll',
          rowGap: 0,
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
      </List>
      <Grid container item alignItems="center" rowGap={1} pb={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            onChange={event => setMessageText(event.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escreva uma mensagem..."
            value={messageText}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <IconButton color="primary" onClick={handleSendMessage}>
                <EmojiEmotionsIcon />
              </IconButton>
            </Grid>
            <Grid item xs={10} display="flex" justifyContent="flex-end">
              <IconButton color="primary" onClick={handleSendMessage}>
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export { Content }
