import P from 'prop-types'

import {
  Avatar,
  Badge,
  Box,
  Grow,
  List,
  ListItem,
  Tooltip,
  Typography,
} from '@mui/material'

import { useChat } from '@contexts'
import { reformatSimpleTime } from '@utils/helpers/dateTime'
import { charactersToLineBreaks } from '@utils/helpers/strings'

const MessagesList = ({ listBottomRef, messages }) => {
  const {
    chatsData: { friends },
    userData,
  } = useChat()

  const getMessageProfilePicture = senderName => {
    if (senderName === userData.username) return userData.profilePicture
    return friends.find(({ username }) => username === senderName)
      ?.profilePicture
  }

  return (
    <List
      sx={{
        height: '80%',
        overflowY: 'auto',
        px: 2,
      }}
    >
      {messages?.map(({ date, message, senderName }) => (
        <Grow in key={date} unmountOnExit>
          <ListItem
            key={date}
            sx={{
              justifyContent:
                senderName === userData.username ? 'flex-end' : 'flex-start',
              '& span': {
                textAlign: senderName === userData.username ? 'end' : 'start',
              },
            }}
          >
            <Badge
              anchorOrigin={
                senderName === userData.username
                  ? {
                      vertical: 'top',
                      horizontal: 'right',
                    }
                  : {
                      vertical: 'top',
                      horizontal: 'left',
                    }
              }
              badgeContent={
                <Tooltip title={senderName} placement="top" arrow>
                  <Avatar
                    alt={senderName}
                    src={getMessageProfilePicture(senderName)}
                    sx={{ height: 24, width: 24 }}
                  />
                </Tooltip>
              }
              component="div"
              overlap="rectangular"
              variant="standard"
            >
              <Box
                bgcolor="background.default"
                borderRadius={1}
                maxWidth={312}
                p={2}
                sx={{
                  '&:hover': {
                    backgroundColor: 'chat.backgroundHeader',
                    transition: 'background-color 0.2s ease-in-out',
                  },
                }}
              >
                <Typography
                  sx={{ userSelect: 'text' }}
                  variant="body1"
                  whiteSpace="pre-wrap"
                >
                  {charactersToLineBreaks(message)}
                </Typography>
                <span>
                  <Typography
                    color="text.secondary"
                    component="p"
                    variant="caption"
                  >
                    {reformatSimpleTime(date)}
                  </Typography>
                </span>
              </Box>
            </Badge>
          </ListItem>
        </Grow>
      ))}
      <Box component="span" ref={listBottomRef} />
    </List>
  )
}

MessagesList.propTypes = {
  listBottomRef: P.shape({ current: P.any }).isRequired,
  messages: P.arrayOf(
    P.shape({
      date: P.string.isRequired,
      message: P.string.isRequired,
      senderName: P.string.isRequired,
    })
  ).isRequired,
}

export { MessagesList }
