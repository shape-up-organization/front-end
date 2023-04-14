import P from 'prop-types'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

const ProgressBar = ({ progress }) => {
  function LinearProgressWithLabel(value) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...value} />
        </Box>
      </Box>
    )
  }
  LinearProgressWithLabel.propTypes = {
    value: P.number,
  }
  LinearProgressWithLabel.defaultProps = {
    value: 100,
  }
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  )
}
ProgressBar.propTypes = {
  progress: P.number.isRequired,
}
export { ProgressBar }
