import P from 'prop-types'

import { Button, Typography } from '@mui/material'

const TextButton = ({ handleClick, marginBottom, text, variant }) => (
  <Button
    color="primary"
    fontWeight="bold"
    onClick={handleClick}
    size="small"
    sx={{ marginBottom, paddingY: 0, paddingBottom: 0 }}
  >
    <Typography fontWeight="bold" textTransform="none" variant={variant}>
      {text}
    </Typography>
  </Button>
)

TextButton.propTypes = {
  handleClick: P.func.isRequired,
  marginBottom: P.number,
  text: P.string.isRequired,
  variant: P.string,
}

TextButton.defaultProps = {
  marginBottom: 0.3,
  variant: 'caption',
}

export { TextButton }
