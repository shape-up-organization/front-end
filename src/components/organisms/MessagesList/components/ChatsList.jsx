import { useTranslation } from 'react-i18next'

import { useChat } from '@contexts'

import { Photo } from '@atoms/Photo'
import { Box, CircularProgress, Divider, Stack } from '@mui/material'

import chatNotFoundImageEn from '@assets/images/chats-not-found-en.png'
import chatNotFoundImagePt from '@assets/images/chats-not-found-pt.png'

import { ChatButton } from './ChatButton'

const chatNotFoundImage = {
  en: chatNotFoundImageEn,
  pt: chatNotFoundImagePt,
}

const ChatsList = () => {
  const { chatsData, isLoading } = useChat()

  const {
    t,
    i18n: { resolvedLanguage },
  } = useTranslation()

  if (isLoading || chatsData.deprecated)
    return (
      <Stack alignItems="center">
        {isLoading ? (
          <Box pt={2}>
            <CircularProgress />
          </Box>
        ) : (
          <Photo
            alt={t('pages.chat.alt.notFoundChatImage')}
            animationSpeed={400}
            src={chatNotFoundImage[resolvedLanguage]}
            fit="contain"
          />
        )}
      </Stack>
    )

  return (
    <Stack>
      {chatsData[chatsData.type]?.map(friend => (
        <Stack key={friend.username}>
          <ChatButton
            data={friend}
            online={friend.online}
            username={friend.username}
          />
          <Divider />
        </Stack>
      ))}
    </Stack>
  )
}

export { ChatsList }
