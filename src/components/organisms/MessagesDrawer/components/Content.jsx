import { Grid } from '@mui/material'

import { ChatTypeSwitcher } from './ChatTypeSwitcher'
import { ChatsList } from './ChatsList'
import { SearchField } from './SearchField'

const Content = () => (
  <>
    <Grid item xs={12} maxHeight={72}>
      <SearchField />
    </Grid>
    <Grid
      container
      item
      alignItems="center"
      columnGap={2}
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
  </>
)

export { Content }
