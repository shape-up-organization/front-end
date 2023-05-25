import { useEffect, useState } from 'react'

import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

import { Box, Grid, Paper, Stack } from '@mui/material'

import { Divider } from '@atoms/Divider'
import { SearchField } from '@atoms/SearchField'
import { AnimatedWrapper } from '@layouts/AnimatedWrapper'

import apiUsers from '@api/services/users'

import { UsersList } from './components/UsersList'

const SearchPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  const searchUsers = async () => {
    if (search === '@') return
    setIsLoading(true)

    let response
    if (search.startsWith('@')) {
      response = await apiUsers.searchByUsername(search.slice(1))
    } else {
      response = await apiUsers.searchByName(search)
    }

    setIsLoading(false)

    if (response.status === 404 || response.status === 204) {
      setUsers([])
      return
    }

    if (response.status !== 200) {
      enqueueSnackbar(t('pages.search.snackbar.genericError'), {
        variant: 'error',
      })
      setUsers([])
      return
    }

    setUsers(response.data)
  }

  useEffect(() => {
    if (!search) {
      setUsers([])
      return
    }

    searchUsers()
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
          <Divider color="disabled" size="small" />
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
            <UsersList
              isLoading={isLoading}
              search={search}
              users={users}
              refetch={searchUsers}
            />
          </Grid>
        </Grid>
      </Stack>
    </AnimatedWrapper>
  )
}

export { SearchPage }
