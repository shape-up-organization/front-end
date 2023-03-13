import { LinkButton } from '@components/LinkButton'

import { Grid } from '@mui/material'

import CircleIcon from '@mui/icons-material/Circle'

const Footer = () => (
  <Grid container alignItems="center" justifyContent="space-between">
    <Grid item>
      <LinkButton href="#">Sobre</LinkButton>
    </Grid>
    <CircleIcon color="primary" sx={{ fontSize: 16 }} />
    <Grid item>
      <LinkButton href="#">Privacidade</LinkButton>
    </Grid>
    <CircleIcon color="primary" sx={{ fontSize: 16 }} />
    <Grid item>
      <LinkButton href="#">Ajuda</LinkButton>
    </Grid>
  </Grid>
)
export { Footer }
