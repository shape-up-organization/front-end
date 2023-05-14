import P from 'prop-types'

import { Divider as DividerMUI, Typography } from '@mui/material'

const colors = {
  primary: 'primary.main',
  secondary: 'secondary.main',
  error: 'error.main',
  warning: 'warning.main',
  info: 'info.main',
  disabled: 'none',
  disabledLight: 'disabled',
}

const sizes = {
  small: 1,
  medium: 2,
  large: 4,
}

const Divider = ({ color, direction, size, text }) => (
  <DividerMUI
    orientation={direction}
    sx={{
      borderWidth: sizes[size],
      borderColor: colors[color],
    }}
    variant="fullWidth"
    flexItem
  >
    {text && (
      <Typography fontWeight="bold" variant="caption">
        {text}
      </Typography>
    )}
  </DividerMUI>
)

Divider.propTypes = {
  color: P.oneOf(Object.keys(colors)),
  direction: P.oneOf(['horizontal', 'vertical']),
  size: P.oneOf(Object.keys(sizes)),
  text: P.string,
}

Divider.defaultProps = {
  color: 'primary',
  direction: 'horizontal',
  size: 'medium',
  text: '',
}

export { Divider }
