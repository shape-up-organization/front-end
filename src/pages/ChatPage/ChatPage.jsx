import { useState } from 'react'

import { Container, Grid, Paper } from '@mui/material'

import { Chat } from '@organisms/Chat'
import { MessagesList } from '@organisms/MessagesList'

import { useChat } from '@contexts'

const ChatPage = () => {
  const [messagesListWidth] = useState(4)
  const [chatWidth] = useState(8)

  const { activeChat } = useChat()

  // TODO: Implement expand to responsiveness
  // const handleExpandMessagesList = () => {
  //   setMessagesListWidth(6)
  //   setChatWidth(6)
  // }

  return (
    <Container
      disableGutters
      fixed
      sx={{ alignItems: 'center', display: 'flex', height: '100vh' }}
    >
      <Grid container component={Paper} height="88%">
        <Grid
          item
          xs={messagesListWidth}
          height="100%"
          overflow="auto"
          sx={{
            transition: 'all 0.5s ease-in-out',
          }}
        >
          <MessagesList />
        </Grid>
        <Grid
          item
          xs={chatWidth}
          borderLeft={2}
          height="100%"
          overflow="auto"
          sx={{
            transition: 'all 0.5s ease-in-out',
            borderColor: 'primary.main',
          }}
        >
          {activeChat && <Chat />}
        </Grid>
      </Grid>
    </Container>
  )
}
export { ChatPage }
