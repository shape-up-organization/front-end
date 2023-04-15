import Avatar from '@mui/material/Avatar'
import P from 'prop-types'

const AvatarPhoto = ({ alt, src }) => <Avatar alt={alt} src={src} />
AvatarPhoto.propTypes = { alt: P.string, src: P.string.isRequired }
AvatarPhoto.defaultProps = { alt: '' }
export { AvatarPhoto }
