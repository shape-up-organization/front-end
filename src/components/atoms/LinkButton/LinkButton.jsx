import P from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { Link as LinkMUI } from '@mui/material'

const LinkButton = ({ children, external, internal, internalOptions }) => {
  const navigate = useNavigate()

  const handleNavigation = event => {
    event.preventDefault()

    if (external) window.open(external, '_blank')
    else if (internal) navigate(internal, internalOptions)
    else navigate('')
  }

  return (
    <LinkMUI
      color="link"
      onClick={handleNavigation}
      sx={{ cursor: 'pointer' }}
      tabIndex={0}
      underline="always"
    >
      {children}
    </LinkMUI>
  )
}

LinkButton.propTypes = {
  children: P.oneOfType([P.element, P.string]).isRequired,
  external: P.string,
  internal: P.string,
  internalOptions: P.object,
}

LinkButton.defaultProps = {
  external: undefined,
  internal: '',
  internalOptions: {},
}

export { LinkButton }
