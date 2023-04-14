import { ProgressBar } from '@atoms/ProgressBar'
import { Typography, Grid } from '@mui/material'
import P from 'prop-types'

const CardPerfilExp = ({ currentLevel, progress }) => {
  const nextLevel = currentLevel + 1
  const xpLack = 100 - progress
  return (
    <Grid container spacing={1} xs={12}>
      <Grid container item xs={12} justifyContent="center">
        <Grid item xs={5}>
          <Typography variant="body2">120 pontos de XP</Typography>
        </Grid>
        <Grid item xs={5} display="flex" justifyContent="flex-end">
          <Typography variant="body2" color="text.secondary">
            {`${Math.round(progress)}%`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Grid item xs={10}>
          <ProgressBar progress={progress} />
        </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Grid item xs={5}>
          <Typography variant="body2">Nivel {currentLevel}</Typography>
        </Grid>
        <Grid item xs={5} display="flex" justifyContent="flex-end">
          <Typography variant="body2">
            {xpLack} PE para o nivel {nextLevel}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
CardPerfilExp.propTypes = {
  currentLevel: P.number.isRequired,
  progress: P.number.isRequired,
}
export { CardPerfilExp }
