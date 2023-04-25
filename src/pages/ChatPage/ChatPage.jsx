import { Fade, Grid, Paper } from '@mui/material'

import { AnimatedWrapper } from '@layouts/AnimatedWrapper'
import { Chat } from '@organisms/Chat'
import { MessagesList } from '@organisms/MessagesList'

import { useChat } from '@contexts'

import { useStyles } from './ChatPage.styles'

const sizes = {
  desktop: {
    messagesList: 5,
    chat: 7,
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
    <AnimatedWrapper>
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
    </AnimatedWrapper>
  )
}
export { ChatPage }
