import { Button, Grid, Typography } from '@mui/material'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'

const Banner = () => {
  return (
    <Grid container spacing={6} direction={'column'}>
      <Grid xs={3} item>
        <Typography variant="h4">Seu impulso estético</Typography>
      </Grid>
      <Grid item xs={6} alignItems="center" direction={'column'}>
        <Grid item xs={4} alignItems="center" display="flex">
          <FitnessCenterIcon sx={{ fontSize: 48 }} color="secondary" />
          <Typography variant="h6">
            <Typography color="secondary" variant="h7" display="inline">
              Compartilhe{' '}
            </Typography>
            seu{' '}
            <Typography color="secondary" variant="h7" display="inline">
              progresso{' '}
            </Typography>
            com os amigos
          </Typography>
        </Grid>
        <Grid item xs={4} alignItems="center" display="flex">
          <CalendarMonthIcon sx={{ fontSize: 48 }} color="secondary" />
          <Typography variant="h6">
            <Typography color="secondary" variant="h7" display="inline">
              Participe{' '}
            </Typography>
            de{' '}
            <Typography color="secondary" variant="h7" display="inline">
              eventos{' '}
            </Typography>
            da comunidade
          </Typography>
        </Grid>
        <Grid item xs={4} alignItems="center" display="flex">
          <SportsEsportsOutlinedIcon sx={{ fontSize: 48 }} color="secondary" />
          <Typography variant="h6">
            Uma rede social{' '}
            <Typography color="secondary" variant="h7" display="inline">
              gameficada
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid item xs={3}>
          <Button variant="contained" color="secondary">
            Evolua já
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
export { Banner }
