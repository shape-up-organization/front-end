import { Grid, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'

const Footer = () => {
  return (
    <Grid container paddingLeft={12}>
      <Grid item xs={6} justifyContent={'space-around'} alignItems={'center'} display="flex">
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
    </Grid>
  )
}
export { Footer }
