import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { Box, Grid, Paper, Stack } from '@mui/material'

import { Divider } from '@atoms/Divider'
import { SearchField } from '@atoms/SearchField'
import { AnimatedWrapper } from '@layouts/AnimatedWrapper'

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
    <AnimatedWrapper>
      <Stack component={Paper} rowGap={4}>
        <Grid container justifyContent="center" pt={4} px={4}>
          <Grid item xs={12} sm={10} md={8}>
            <SearchField
              placeholder={t('pages.search.others.searchPlaceholder')}
              value={search}
              setValue={setSearch}
            />
          </Grid>
        </Grid>
        <Box px={4}>
          <Divider />
        </Box>
        <Grid container justifyContent="center">
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
    </AnimatedWrapper>
  )
}
export { SearchPage }
