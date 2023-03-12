import P from 'prop-types'

import { Button, Grid, Typography } from '@mui/material'

const Header = ({ handleOpenModals }) => {
  const { handleOpenLogin, handleOpenSignup } = handleOpenModals
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      paddingY={4}
    >
      <Grid item xs={4} sm={7} md={8} lg={9}>
        <Typography color="primary" fontWeight="bold" variant="h4">
          ShapeUP
        </Typography>
      </Grid>
      <Grid container item xs={7} sm={5} md={4} lg={3}>
        <Grid item xs={6}>
          <Button fullWidth onClick={handleOpenLogin}>
            Entrar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth onClick={handleOpenSignup} variant="contained">
            Cadastrar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  handleOpenModals: P.objectOf(P.func).isRequired,
}

export { Header }
