import P from 'prop-types'

import CircleIcon from '@mui/icons-material/Circle'
import { Grid } from '@mui/material'

import { LinkButton } from '@atoms/LinkButton'

const Footer = ({ showCircles }) => (
  <>
    <Grid item>
      <LinkButton internal="about">Sobre</LinkButton>
    </Grid>
    {showCircles && <CircleIcon color="primary" sx={{ fontSize: 16 }} />}
    <Grid item>
      <LinkButton internal="privacy-policies">Privacidade</LinkButton>
    </Grid>
    {showCircles && <CircleIcon color="primary" sx={{ fontSize: 16 }} />}
    <Grid item>
      <LinkButton internal="help">Ajuda</LinkButton>
    </Grid>
  </>
)

Footer.propTypes = {
  showCircles: P.bool,
}

Footer.defaultProps = {
  showCircles: false,
}

export { Footer }
