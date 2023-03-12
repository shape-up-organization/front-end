import P from 'prop-types'

import { Button, Grid, Typography } from '@mui/material'

const Header = ({ openModals }) => {
  const { setLoginOpen, setSignupOpen } = openModals
  return (
    <Grid container justifyContent="space-around" alignItems={'center'}>
      <Grid item xs={7} display={'flex'}>
        <Typography variant="h4" color={'secondary'}>
          ShapeUP{' '}
        </Typography>
      </Grid>
      <Grid item xs={1.8} justifyContent={'space-between'} display={'flex'}>
        <Button onClick={setLoginOpen}>Entrar</Button>
        <Button onClick={setSignupOpen} variant="contained" color="secondary">
          Cadastrar
        </Button>
      </Grid>
    </Grid>
  )
}

Header.propTypes = {
  openModals: P.objectOf(P.func).isRequired,
}

export { Header }
