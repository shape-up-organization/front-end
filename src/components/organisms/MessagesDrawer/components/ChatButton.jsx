import P from 'prop-types'

import { Avatar, Badge, Button, Grid, Typography } from '@mui/material'

import { useChat } from '@contexts'

import { useStyles } from './ChatsList.styles'

const ChatButton = ({ lastMessage, name, online, unreadMessages, userId }) => {
  const { addChat, chats, removeChat } = useChat()

  const { classes } = useStyles()

  const handleClick = () => {
    if (chats.find(chat => chat.id === userId)) {
      removeChat(userId)
      return
    }

    addChat(userId)
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
  online: P.bool.isRequired,
  unreadMessages: P.number.isRequired,
  userId: P.number.isRequired,
}

export { ChatButton }
