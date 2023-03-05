import { Link as LinkMUI } from '@mui/material'
import P from 'prop-types'

const Link = ({ children }) => {
  return (
    <LinkMUI color="link" sx={{ cursor: 'pointer' }} underline="hover">
      {children}
    </LinkMUI>
  )
}

Link.propTypes = {
  children: P.element.isRequired,
}

export { Link }
