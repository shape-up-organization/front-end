import { Grid, Typography } from '@mui/material'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'

const Banner = () => {
  return (
    <Grid container gap={12} sx={{ backgroundColor: 'red' }} direction="column">
      <Grid item xs={12} justifyContent="center" alignItems="center" display="flex">
        <FitnessCenterIcon sx={{ fontSize: 64 }} color="secondary" />
        <Typography variant="h7">Frase de impacto que defina nossa aplicação</Typography>
      </Grid>
      <Grid item xs={12} justifyContent="center" alignItems="center" display="flex">
        <CalendarMonthIcon sx={{ fontSize: 64 }} color="secondary" />
        <Typography variant="h7">Frase de impacto que defina nossa aplicação</Typography>
      </Grid>
      <Grid item xs={12} justifyContent="center" alignItems="center" display="flex">
        <SportsEsportsOutlinedIcon sx={{ fontSize: 64 }} color="secondary" />
        <Typography variant="h7">Frase de impacto que defina nossa aplicação</Typography>
      </Grid>
    </Grid>
  )
}
export { Banner }
