import { Box, CircularProgress, Grid } from '@mui/material'

import { Divider } from '@atoms/Divider'
import { Photo } from '@atoms/Photo'

import { useChat } from '@contexts'

import chatNotFoundImageEn from '@assets/images/chats-not-found-en.png'
import chatNotFoundImagePt from '@assets/images/chats-not-found-pt.png'

import { ChatButton } from './ChatButton'

const locale = 'pt'
const chatNotFoundImage = {
  en: chatNotFoundImageEn,
  pt: chatNotFoundImagePt,
}

const ChatsList = () => {
  const { chatsList, isLoading } = useChat()

  if (isLoading || chatsList === undefined || chatsList.length <= 0)
    return (
      <Grid container item height="100%">
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
        username={friend.username}
      />
    </Box>
  ))
}

export { ChatsList }
