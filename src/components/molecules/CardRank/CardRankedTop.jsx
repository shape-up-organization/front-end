import { Avatar, Badge, Grid, Typography } from '@mui/material'
import P from 'prop-types'

const CardRankedTop = ({ numRank, src, alt, name, xp }) => (
  <Grid container direction="column" xs={12} spacing={1.5} alignItems="center">
    <Grid item xs={3}>
      <Typography>{name}</Typography>
    </Grid>
    <Grid container item xs={3} justifyContent="center">
      <Badge
        badgeContent={numRank}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        color="secondary"
        overlap="circular"
      >
        <Avatar alt={alt} src={src} />
      </Badge>
    </Grid>
    <Grid item xs={4}>
      <Typography>{xp}</Typography>
    </Grid>
    <Grid item xs={2}>
      <Typography> PE</Typography>
    </Grid>
  </Grid>
)

CardRankedTop.propTypes = {
  numRank: P.number.isRequired,
  src: P.string.isRequired,
  alt: P.string.isRequired,
  name: P.string.isRequired,
  xp: P.number.isRequired,
}
export { CardRankedTop }
