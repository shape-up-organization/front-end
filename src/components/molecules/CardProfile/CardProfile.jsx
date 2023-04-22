import P from 'prop-types'

import CloseRounded from '@mui/icons-material/CloseRounded'
import { Grid, IconButton, Paper, Stack } from '@mui/material'

import { Divider } from '@atoms/Divider'

import { Experience } from './components/Experience'
import { Quest } from './components/Quest'
import { UserInfo } from './components/UserInfo'

const CardProfile = ({ handleCloseCard }) => (
  <Grid container component={Paper}>
    {handleCloseCard && (
      <Grid item xs={12} pl={1} pt={1}>
        <IconButton onClick={handleCloseCard}>
          <CloseRounded />
        </IconButton>
      </Grid>
    )}
    <Grid item xs={12}>
      <Stack
        spacing={3}
        width="100%"
        px={4}
        py={6}
        pt={handleCloseCard ? 1 : 6}
      >
        <UserInfo closeCard={handleCloseCard} />
        <Experience />
        <Divider />
        <Quest />
      </Stack>
    </Grid>
  </Grid>
)

CardProfile.propTypes = {
  handleCloseCard: P.func,
}

CardProfile.defaultProps = {
  handleCloseCard: null,
}

export { CardProfile }
