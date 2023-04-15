import { Avatar, Grid, Typography } from '@mui/material'
import P from 'prop-types'

const CardRanked = ({ numRank, src, alt, name, xp }) => (
  <Grid container xs={12} alignItems="center">
    <Grid item xs={1.5}>
      <Typography>{numRank}</Typography>
    </Grid>
    <Grid item xs={2.5}>
      <Avatar alt={alt} src={src} />
    </Grid>
    <Grid item xs={3}>
      <Typography>{name}</Typography>
    </Grid>
    <Grid item xs={5} display="flex" justifyContent="flex-end">
      <Typography>{xp} PE</Typography>
    </Grid>
  </Grid>
)

CardRanked.propTypes = {
  numRank: P.number.isRequired,
  src: P.string.isRequired,
  alt: P.string.isRequired,
  name: P.string.isRequired,
  xp: P.number.isRequired,
}
export { CardRanked }
