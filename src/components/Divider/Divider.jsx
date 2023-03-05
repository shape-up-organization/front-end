import P from 'prop-types'

import { Divider as DividerMUI, Typography } from '@mui/material'

const Divider = ({ direction, text }) => {
  return (
    <DividerMUI
      orientation={direction}
      sx={{
        margin: theme => theme.spacing(3, 0, 4),
        '&::before, &::after': {
          borderWidth: 2,
          borderColor: 'primary.main',
        },
      }}
      variant="fullWidth"
      flexItem={direction === 'vertical'}
    >
      {text && (
        <Typography fontWeight="bold" variant="caption">
          {text}
        </Typography>
      )}
    </DividerMUI>
  )
}

Divider.propTypes = {
  direction: P.oneOf(['horizontal', 'vertical']),
  text: P.string,
}

Divider.defaultProps = {
  direction: 'horizontal',
  text: '',
}

export { Divider }
