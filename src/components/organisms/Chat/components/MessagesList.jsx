import P from 'prop-types'

import { Badge, Box, Grow, List, ListItem, Typography } from '@mui/material'

import { Avatar } from '@atoms/Avatar'

import { useChat } from '@contexts'
import { reformatSimpleTime } from '@utils/helpers/dateTime'
import { charactersToLineBreaks } from '@utils/helpers/strings'

const MessagesList = ({ listBottomRef, messages }) => {
  const {
    chatsData: { friends },
    userData,
  } = useChat()

  const getMessageSender = senderName => {
    if (senderName === userData.username) return userData
    return friends.find(({ username }) => username === senderName)
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
              badgeContent={<Avatar mini user={getMessageSender(senderName)} />}
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
