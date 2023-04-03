import { Outlet } from 'react-router-dom'

import { Grid } from '@mui/material'

import { MessagesDrawer } from '@organisms/MessagesDrawer'

const ChatLayout = () => (
  <>
    <Outlet />
    <Grid container bottom={0} gap={1} position="fixed">
      <Grid item>
        <MessagesDrawer />
      </Grid>
    </Grid>
  </>
)

export { ChatLayout }
