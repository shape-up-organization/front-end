import P from 'prop-types'

import Image from 'mui-image'

const Photo = ({ alt, animationSpeed, src, ...props }) => (
  <Image alt={alt} duration={animationSpeed} src={src} {...props} />
)

Photo.propTypes = {
  alt: P.string.isRequired,
  animationSpeed: P.number,
  src: P.string.isRequired,
}

Photo.defaultProps = { animationSpeed: 2000 }

export { Photo }
