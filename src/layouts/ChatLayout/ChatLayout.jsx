import { Outlet } from 'react-router-dom'

import { Grid } from '@mui/material'

import { ChatDrawer } from '@organisms/ChatDrawer'
import { MessagesDrawer } from '@organisms/MessagesDrawer'

import { useChat } from '@contexts'

const ChatLayout = () => {
  const { chats } = useChat()

  return (
    <>
      <Outlet />
      <Grid
        container
        bottom={0}
        flexDirection="row-reverse"
        gap={6}
        position="fixed"
        px={4}
      >
        <Grid item alignItems="end" display="flex">
          <MessagesDrawer />
        </Grid>
        <Grid item alignItems="end" display="flex" gap={4}>
          {chats?.map(chat => (
            <ChatDrawer key={chat.id} chatData={chat} />
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export { ChatLayout }
