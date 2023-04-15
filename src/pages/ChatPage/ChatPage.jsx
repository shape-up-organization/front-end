import { Container, Fade, Grid, Paper } from '@mui/material'

import { Chat } from '@organisms/Chat'
import { MessagesList } from '@organisms/MessagesList'

import { useChat } from '@contexts'

import { useStyles } from './ChatPage.styles'

const sizes = {
  desktop: {
    messagesList: 4,
    chat: 8,
  },
  mobile: {
    messagesList: 12,
    chat: 12,
  },
}

const ChatPage = () => {
  const { activeChat, displayChat, displayMessagesList, responsiveSize } =
    useChat()

  const { classes } = useStyles()

  return (
    <Container className={classes.container} disableGutters fixed>
      <Grid container className={classes.paper} component={Paper}>
        <Fade in={displayMessagesList} unmountOnExit>
          <Grid
            item
            xs={sizes[responsiveSize].messagesList}
            className={classes.messagesList}
            height="100%"
            overflow="auto"
          >
            <MessagesList />
          </Grid>
        </Fade>
        <Fade in={displayChat} unmountOnExit>
          <Grid
            item
            xs={sizes[responsiveSize].chat}
            className={classes.chat}
            borderLeft={2}
            height="100%"
            overflow="auto"
          >
            {activeChat && <Chat />}
          </Grid>
        </Fade>
      </Grid>
    </Container>
  )
}
export { ChatPage }
