import P from 'prop-types'

import { Avatar, Badge, Button, Grid, Typography } from '@mui/material'

import { useChat } from '@contexts'
import { reformatSimpleDate } from '@utils/dateTimeHelper'

import { useStyles } from './ChatButton.styles'

const ChatButton = ({
  data: { lastMessage, name, unreadMessages },
  online,
  username,
}) => {
  const { activeChat, openChat } = useChat()

  const { classes } = useStyles()

  const handleSelectChat = () => {
    if (activeChat?.username === username) return
    openChat(username)
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
              {reformatSimpleDate(lastMessage?.date)}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography
              color="disabled"
              fontWeight={unreadMessages ? '700' : '400'}
              noWrap
              variant="subtitle2"
            >
              {lastMessage?.message}
            </Typography>
          </Grid>
          <Grid item xs={3} display="flex" justifyContent="end">
            <Badge
              anchorOrigin={{
                vertical: 'bottom',
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
    lastMessage: P.shape({
      date: P.string.isRequired,
      message: P.string.isRequired,
    }),
    name: P.string.isRequired,
    unreadMessages: P.number.isRequired,
  }).isRequired,
  online: P.bool,
  username: P.string,
}

ChatButton.defaultProps = {
  online: undefined,
  username: undefined,
}

export { ChatButton }
