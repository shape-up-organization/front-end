import { useState } from 'react'

import { Grid } from '@mui/material'

import { AutocompleteSearchMessages } from './AutocompleteSearchMessages'
import { ChatsList } from './ChatsLists'
import { ChatTypeSwitcher } from './ChatTypeSwitcher'
import { Header } from './Header'

import { useStyles } from './MessagesDrawer.styles'

const MessagesDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const { classes } = useStyles({ messagesRight: 2 })

  const toggleDrawer = () => {
    setDrawerOpen(current => !current)
  }

  return (
    <Grid
      container
      className={classes.messageDrawerContainer}
      sx={{
        bottom: drawerOpen ? 0 : '-68vh',
      }}
    >
      <Grid item xs={12} height="4vh">
        <Header expanded={drawerOpen} handleClick={toggleDrawer} />
      </Grid>
      <Grid
        container
        item
        className={classes.content}
        height="100%"
        padding={2}
        rowGap={1}
      >
        <Grid item xs={12}>
          <AutocompleteSearchMessages />
        </Grid>
        <Grid
          container
          item
          alignItems="center"
          columnGap={2}
          justifyContent="center"
        >
          <ChatTypeSwitcher />
        </Grid>
        <Grid height="100%" overflow="auto" paddingBottom={8} paddingX={1}>
          <ChatsList />
        </Grid>
      </Grid>
    </Grid>
  )
}

export { MessagesDrawer }
