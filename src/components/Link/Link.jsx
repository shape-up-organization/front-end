import { Link as LinkMUI } from '@mui/material'
import P from 'prop-types'

const Link = ({ children, href }) => {
  return (
    <LinkMUI
      color="link"
      href={href}
      sx={{ cursor: 'pointer' }}
      target="_blank"
      underline="always"
    >
      {children}
    </LinkMUI>
  )
}

Link.propTypes = {
  children: P.oneOfType([P.element, P.string]).isRequired,
  href: P.string.isRequired,
}

export { Link }
