import { Button, Grid, Typography } from '@mui/material'

const Header = () => {
  return (
    <Grid container spacing={12} justifyContent="space-around">
      <Grid item xs={2}>
        <Typography variant="h3">SHAPEUP </Typography>
      </Grid>
      <Grid item xs={4} container alignItems="center" justifyContent="center" justifyItems="flex-end">
        <Button>Entrar</Button>
        <Button variant="outlined">Cadastrar</Button>
      </Grid>
    </Grid>
  )
}

export { Header }
