import P from 'prop-types'

import {
  Badge,
  Box,
  Grow,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material'

import { Avatar } from '@atoms/Avatar'

import { useChat } from '@contexts'
import { getBorder } from '@utils/constants/levels'
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
      {messages?.map(({ date, message, senderName }, index) => (
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
                messages[index - 1]?.senderName !== senderName && (
                  <Stack
                    direction={
                      senderName === userData.username ? 'row-reverse' : 'row'
                    }
                    justifyContent="flex-start"
                    maxWidth={24}
                    gap={1}
                  >
                    <Avatar
                      avatarSize="mini"
                      user={getMessageSender(senderName)}
                    />
                    {senderName !== userData.username && (
                      <Typography
                        fontWeight={500}
                        mb={1}
                        sx={{
                          background: getBorder(
                            getMessageSender(senderName)?.xp
                          ),
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          userSelect: 'text',
                        }}
                        variant="body2"
                      >
                        {senderName}
                      </Typography>
                    )}
                  </Stack>
                )
              }
              component="div"
              overlap="rectangular"
              sx={{
                justifyContent:
                  senderName === userData.username ? 'flex-end' : 'flex-start',
                width: '100%',
              }}
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
                  sx={{ userSelect: 'text', wordBreak: 'break-word' }}
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
