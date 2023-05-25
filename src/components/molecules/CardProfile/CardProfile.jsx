import P from 'prop-types'

import { Grid, Paper, Stack, useMediaQuery } from '@mui/material'

import { Divider } from '@atoms/Divider'

import { Experience } from './components/Experience'
import { Quest } from './components/Quest'
import { UserInfo } from './components/UserInfo'

const CardProfile = ({ handleCloseCard }) => {
  const lessThanSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Grid
      container
      component={Paper}
      height={lessThanSmall ? '100%' : 'fit-content'}
    >
      <Grid item xs={12} height="100%">
        <Stack p={4} spacing={3} width="100%">
          <UserInfo closeCard={handleCloseCard} />
          <Experience />
          <Divider color="disabled" size="small" />
          <Quest />
        </Stack>
      </Grid>
    </Grid>
  )
}

CardProfile.propTypes = {
  handleCloseCard: P.func,
}

CardProfile.defaultProps = {
  handleCloseCard: null,
}

export { CardProfile }
