import P from 'prop-types'

import {
  Avatar,
  Badge,
  Box,
  Grow,
  List,
  ListItem,
  Typography,
} from '@mui/material'

import { reformatSimpleTime } from '@utils/dateTimeHelper'
import { charactersToLineBreaks } from '@utils/stringHelper'

const MessagesList = ({ listBottomRef, messages, username }) => (
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
            justifyContent: senderName === username ? 'flex-end' : 'flex-start',
            '& span': {
              textAlign: senderName === username ? 'end' : 'start',
            },
          }}
        >
          <Badge
            anchorOrigin={
              senderName === username
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
              <Avatar alt={senderName} sx={{ height: 24, width: 24 }} />
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

MessagesList.propTypes = {
  listBottomRef: P.shape({ current: P.any }).isRequired,
  messages: P.arrayOf(
    P.shape({
      date: P.string.isRequired,
      message: P.string.isRequired,
      senderName: P.string.isRequired,
    })
  ).isRequired,
  username: P.string.isRequired,
}

export { MessagesList }
