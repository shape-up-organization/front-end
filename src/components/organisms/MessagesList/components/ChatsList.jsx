import { useTranslation } from 'react-i18next'

import { useChat } from '@contexts'

import { Photo } from '@atoms/Photo'
import {
  Box,
  CircularProgress,
  Divider,
  Grow,
  Stack,
  Typography,
} from '@mui/material'

import notFoundGeneric from '@assets/images/not-found-generic.png'

import { ChatButton } from './ChatButton'

const ChatsList = () => {
  const { chatsData, isLoading, friendsOnline } = useChat()
  const friends = chatsData?.filteredChats ?? chatsData[chatsData.type]

  const { t } = useTranslation()

  if (isLoading || chatsData.deprecated || !friends?.length)
    return (
      <Stack alignItems="center">
        {isLoading ? (
          <Box pt={2}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack alignItems="center" justifyContent="center" pt={2} spacing={2}>
            <Grow in timeout={1000} unmountOnExit>
              <Typography
                color="primary"
                fontWeight="900"
                textAlign="center"
                textTransform="uppercase"
                variant="h6"
              >
                {t('pages.chat.others.chatNotFoundMessage')}
              </Typography>
            </Grow>
            <Box maxWidth={160}>
              <Photo
                alt={t('pages.chat.alt.notFoundChatImage')}
                animationSpeed={800}
                src={notFoundGeneric}
                fit="contain"
              />
            </Box>
          </Stack>
        )}
      </Stack>
    )

  return (
    <Stack>
      {friends?.map(friend => (
        <Stack key={friend.username}>
          <ChatButton data={friend} online={friendsOnline[friend.username]} />
          <Divider />
        </Stack>
      ))}
    </Stack>
  )
}

export { ChatsList }
