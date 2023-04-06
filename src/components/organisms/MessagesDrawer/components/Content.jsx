import { Grid } from '@mui/material'

import { ChatTypeSwitcher } from './ChatTypeSwitcher'
import { ChatsList } from './ChatsList'
import { SearchField } from './SearchField'

import { useStyles } from './Content.styles'

const Content = () => {
  const { classes } = useStyles()

  return (
    <Grid
      item
      className={classes.content}
      display="flex"
      flexDirection="column"
      height="100%"
      padding={2}
      rowGap={1}
      width="100%"
    >
      <Grid item xs={12} maxHeight={72}>
        <SearchField />
      </Grid>
      <Grid
        container
        item
        alignItems="center"
        columnGap={4}
        justifyContent="center"
        maxHeight={56}
      >
        <ChatTypeSwitcher />
      </Grid>
      <Grid
        alignItems="start"
        height="100%"
        overflow="scroll"
        paddingBottom={4}
        paddingX={1}
        width="100%"
      >
        <ChatsList />
      </Grid>
    </Grid>
  )
}

export { Content }
