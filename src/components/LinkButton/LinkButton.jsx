import { Link as LinkMUI } from '@mui/material'
import P from 'prop-types'

const LinkButton = ({ children, href }) => {
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

LinkButton.propTypes = {
  children: P.oneOfType([P.element, P.string]).isRequired,
  href: P.string.isRequired,
}

export { LinkButton }
