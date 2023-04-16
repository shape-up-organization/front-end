import P from 'prop-types'

import CloseRounded from '@mui/icons-material/CloseRounded'
import { Grid, IconButton, Paper, Stack } from '@mui/material'

import { Divider } from '@atoms/Divider'

import { Experience } from './components/Experience'
import { Quest } from './components/Quest'
import { UserInfo } from './components/UserInfo'

const CardProfile = ({ handleCloseCardProfile }) => (
  <Grid container component={Paper}>
    {handleCloseCardProfile && (
      <IconButton
        onClick={handleCloseCardProfile}
        sx={{ position: 'absolute', top: 4, left: 4 }}
      >
        <CloseRounded />
      </IconButton>
    )}
    <Stack spacing={3} width="100%" px={4} py={4}>
      <UserInfo />
      <Experience />
      <Divider />
      <Quest />
    </Stack>
  </Grid>
)

CardProfile.propTypes = {
  handleCloseCardProfile: P.func,
}

CardProfile.defaultProps = {
  handleCloseCardProfile: null,
}

export { CardProfile }
