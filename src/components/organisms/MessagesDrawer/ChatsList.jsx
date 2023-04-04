import P from 'prop-types'

import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material'

import { Divider } from '@atoms/Divider'

import { useChat } from '@contexts'

import chatNotFoundImageEn from '@assets/images/chats-not-found-en.png'
import chatNotFoundImagePt from '@assets/images/chats-not-found-pt.png'

import { Photo } from '@atoms/Photo'
import { useStyles } from './ChatsList.styles'

const ChatButton = ({ lastMessage, name, online, unreadMessages }) => {
  const { classes } = useStyles()

  return (
    <Button className={classes.chatButton} fullWidth>
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
}

const locale = 'pt'

const chatNotFoundImage = {
  en: chatNotFoundImageEn,
  pt: chatNotFoundImagePt,
}

const ChatsList = () => {
  const { chatsList, isLoading } = useChat()

  if (isLoading || chatsList === undefined || chatsList.length <= 0)
    return (
      <Grid container item>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid
          item
          xs={12}
          alignItems="center"
          display="flex"
          height="100%"
          justifyContent="center"
          mt={8}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Photo
              alt="Mulher com uma lupa com texto 'Nenhum CHAT foi encontrado'"
              animationSpeed={400}
              src={chatNotFoundImage[locale]}
              fit="contain"
            />
          )}
        </Grid>
      </Grid>
    )

  return chatsList.map(friend => (
    <Box width="100%" key={friend.id}>
      <Divider />
      <ChatButton
        lastMessage={friend.lastMessage}
        name={friend.name}
        online={friend.online}
        unreadMessages={friend.unreadMessages}
      />
    </Box>
  ))
}

export { ChatsList }
