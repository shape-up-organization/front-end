import P from 'prop-types'

import { Avatar, Badge, Button, Grid, Typography } from '@mui/material'

import { useChat } from '@contexts'
import { getBorder } from '@utils/constants/levels'
import { reformatSimpleDate } from '@utils/helpers/dateTime'

import { useStyles } from './ChatButton.styles'

const ChatButton = ({
  data: { messages, name, profilePicture, unreadMessages = 0, username, xp },
  online,
}) => {
  const { activeChat, openChat, userData } = useChat()

  const { classes } = useStyles()

  const handleSelectChat = () => {
    if (activeChat?.username === username) return
    openChat(username)
  }

  const mountLastMessage = () => {
    const lastMessage = messages.at(-1)
    let sender = ''
    const lastMessageContent = lastMessage?.message || ''

    if (lastMessage?.senderName) {
      if (lastMessage?.senderName === userData.username) sender = 'Você'
      else sender = lastMessage?.senderName
      sender += ':'
    }

    return `${sender} ${lastMessageContent}`
  }

  return (
    <Button className={classes.chatButton} fullWidth onClick={handleSelectChat}>
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
            variant={online !== undefined ? 'dot' : 'standard'}
          >
            <Avatar
              alt={username}
              src={profilePicture}
              sx={{
                border: 4,
                borderStyle: 'solid',
                borderColor: 'transparent',
                background: `${getBorder(xp)} border-box`,
                height: 56,
                width: 56,
              }}
            />
          </Badge>
        </Grid>
        <Grid container item xs={9} rowSpacing={1}>
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
              {reformatSimpleDate(messages.at(-1)?.date)}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography
              color="disabled"
              fontWeight={unreadMessages ? '700' : '400'}
              noWrap
              variant="subtitle2"
            >
              {mountLastMessage()}
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
  data: P.shape({
    name: P.string.isRequired,
    messages: P.arrayOf(
      P.shape({
        date: P.string.isRequired,
        message: P.string.isRequired,
        senderName: P.string.isRequired,
      })
    ),
    profilePicture: P.string,
    unreadMessages: P.number,
    username: P.string.isRequired,
    xp: P.number,
  }).isRequired,
  online: P.bool,
}

ChatButton.defaultProps = {
  online: undefined,
}

export { ChatButton }
