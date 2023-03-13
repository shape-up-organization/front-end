import P from 'prop-types'

import Image from 'mui-image'

const Photo = ({ alt, src, ...props }) => (
  <Image alt={alt} src={src} {...props} />
)

Photo.propTypes = { alt: P.string.isRequired, src: P.string.isRequired }

export { Photo }
