import P from 'prop-types'

import api from '@api/services/friends'

import { Avatar, Badge, Button, Grid, Typography } from '@mui/material'

import { useAuth, useChat } from '@contexts'

import { useStyles } from './ChatsList.styles'

const ChatButton = ({
  lastMessage,
  name,
  online,
  unreadMessages,
  username,
}) => {
  const { addChat, chats, removeChat } = useChat()
  const { getJwtToken } = useAuth()

  const { classes } = useStyles()

  const handleClick = () => {
    if (chats.find(chat => chat.id === username)) {
      removeChat(username)
      return
    }

    addChat(username)
  }

  const handleAccept = async () => {
    try {
      const jwtToken = await getJwtToken()
      const response = await api.acceptFriendshipRequest(jwtToken, username)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const handleSend = async () => {
    try {
      const jwtToken = await getJwtToken()
      const response = await api.sendFriendshipRequest(jwtToken, username)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button className={classes.chatButton} fullWidth onClick={handleClick}>
      <Grid
        alignItems="center"
        columnSpacing={1}
        container
        justifyContent="center"
        height="100%"
        pr={2}
        py={1}
      >
        <Grid item xs={3} display="flex" justifyContent="center">
          <Badge
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            color={online ? 'secondary' : 'error'}
            overlap="circular"
            variant="dot"
          >
            <Avatar alt={name} />
          </Badge>
        </Grid>
        <Grid container item xs={9} rowSpacing={0}>
          <Grid item xs={8}>
            <button onClick={handleAccept} type="button">
              Accept
            </button>
            <button onClick={handleSend} type="button">
              Send
            </button>
            <Typography
              fontWeight={unreadMessages ? '700' : '400'}
              noWrap
              variant="subtitle1"
            >
              {name}
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            alignItems="center"
            display="flex"
            justifyContent="end"
          >
            <Typography
              color="disabled"
              fontWeight={unreadMessages ? '700' : '400'}
              noWrap
              variant="caption"
            >
              {lastMessage.date}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography
              color="disabled"
              fontWeight={unreadMessages ? '700' : '400'}
              noWrap
              variant="subtitle2"
            >
              {lastMessage.text}
            </Typography>
          </Grid>
          <Grid item xs={3} display="flex" justifyContent="end">
            <Badge
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              badgeContent={unreadMessages}
              className={classes.badge}
              color="secondary"
              overlap="circular"
              max={99}
            />
          </Grid>
        </Grid>
      </Grid>
    </Button>
  )
}

ChatButton.propTypes = {
  lastMessage: P.shape({
    date: P.string.isRequired,
    text: P.string.isRequired,
  }).isRequired,
  name: P.string.isRequired,
  online: P.bool,
  unreadMessages: P.number.isRequired,
  username: P.number.isRequired,
}

ChatButton.defaultProps = {
  online: false,
}

export { ChatButton }
