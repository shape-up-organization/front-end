import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { Container, Grid, Paper, Stack } from '@mui/material'

import { Divider } from '@atoms/Divider'
import { SearchField } from '@atoms/SearchField'

import mockedSearch from '@mocks/users/get'

import { UsersList } from './components/UsersList'

const SearchPage = () => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  useEffect(() => {
    setUsers(mockedSearch?.data?.users)
    setIsLoading(false)
  }, [search])

  return (
    <Container sx={{ height: '100%' }} disableGutters fixed>
      <Stack
        alignItems="center"
        component={Paper}
        height="100%"
        justifyContent="start"
        overflow="auto"
        px={8}
        py={4}
        spacing={4}
        width="100%"
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <SearchField
              placeholder={t('pages.search.others.searchPlaceholder')}
              value={search}
              setValue={setSearch}
            />
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
