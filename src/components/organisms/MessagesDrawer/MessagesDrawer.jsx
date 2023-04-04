import { useEffect, useState } from 'react'

import { Grid } from '@mui/material'

import { useChat } from '@contexts'
import { ChatTypeSwitcher } from './ChatTypeSwitcher'
import { ChatsList } from './ChatsList'
import { Header } from './Header'
import { SearchField } from './SearchField'

import { useStyles } from './MessagesDrawer.styles'

const MessagesDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(true)

  const { loadData } = useChat()
  const { classes } = useStyles()

  useEffect(() => {
    loadData()
  }, [])

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
          <SearchField />
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
        <Grid
          width="100%"
          height="100%"
          overflow="auto"
          paddingBottom={8}
          paddingX={1}
        >
          <ChatsList />
        </Grid>
      </Grid>
    </Grid>
  )
}

export { MessagesDrawer }
