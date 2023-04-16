import P from 'prop-types'

import { Box, LinearProgress } from '@mui/material'

const ProgressBar = ({ progress }) => (
  <Box sx={{ width: '100%' }}>
    <LinearProgress
      sx={{ borderRadius: 9999, height: 24 }}
      value={progress}
      variant="determinate"
    />
  </Box>
)
ProgressBar.propTypes = {
  progress: P.number,
}

ProgressBar.defaultProps = {
  progress: 0,
}

export { ProgressBar }
