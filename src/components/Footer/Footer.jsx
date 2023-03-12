import { Grid, Typography } from '@mui/material'

import CircleIcon from '@mui/icons-material/Circle'

const Footer = () => {
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Typography variant="h8">Sobre</Typography>
      </Grid>
      <CircleIcon color="secondary" fontSize="Small" />
      <Grid item>
        <Typography variant="h8">Privacidade</Typography>
      </Grid>
      <CircleIcon color="secondary" fontSize="Small" />
      <Grid item>
        <Typography variant="h8">Ajuda</Typography>
      </Grid>
    </Grid>
  )
}
export { Footer }
