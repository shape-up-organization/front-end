import { useEffect, useState } from 'react'

import { Container, Grid, Paper, Stack } from '@mui/material'

import { Divider } from '@atoms/Divider'
import mockedSearch from '@mocks/users/get'
import { useStyles } from './SearchPage.styles'

import { SearchField } from './components/SearchField'
import { UsersList } from './components/UsersList'

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  const { classes } = useStyles()

  useEffect(() => {
    setUsers(mockedSearch?.data?.users)
    setIsLoading(false)
  }, [search])

  return (
    <Container className={classes.container} disableGutters fixed>
      <Stack
        alignItems="center"
        className={classes.paper}
        component={Paper}
        justifyContent="start"
        px={8}
        py={4}
        spacing={4}
        width="100%"
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <SearchField value={search} setValue={setSearch} />
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            alignItems="center"
            justifyContent="center"
            minWidth={312}
            px={2}
          >
            <UsersList isLoading={isLoading} search={search} users={users} />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  )
}
export { SearchPage }
