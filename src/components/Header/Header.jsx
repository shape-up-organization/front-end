import { Button, Grid, Typography } from '@mui/material'

const Header = () => {
  return (
    <Grid container justifyContent="space-around" alignItems={'center'}>
      <Grid item xs={7} display={'flex'}>
        <Typography variant="h4" color={'secondary'}>
          ShapeUP{' '}
        </Typography>
      </Grid>
      <Grid item xs={1.8} justifyContent={'space-between'} display={'flex'}>
        <Button>Entrar</Button>
        <Button variant="contained" color="secondary">
          Cadastrar
        </Button>
      </Grid>
    </Grid>
  )
}

export { Header }
