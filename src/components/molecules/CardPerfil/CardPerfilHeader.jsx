import { AvatarPhoto } from '@atoms/AvatarPhoto'
import { CardHeader, IconButton } from '@mui/material'
import P from 'prop-types'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const CardPerfilHeader = ({ alt, src, nomeUsuario, userUsuario }) => (
  <CardHeader
    avatar={<AvatarPhoto alt={alt} src={src} />}
    action={
      <IconButton aria-label="nextPage">
        <NavigateNextIcon />
      </IconButton>
    }
    title={nomeUsuario}
    subheader={userUsuario}
  />
)
CardPerfilHeader.propTypes = {
  alt: P.string.isRequired,
  src: P.string.isRequired,
  nomeUsuario: P.string.isRequired,
  userUsuario: P.string.isRequired,
}
export { CardPerfilHeader }
