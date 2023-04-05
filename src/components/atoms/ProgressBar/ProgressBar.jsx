import P from 'prop-types'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const ProgressBar = ({ progress }) => {
  function LinearProgressWithLabel(value) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...value} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            progress
          )}%`}</Typography>
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
  progress: P.number,
}
ProgressBar.defaultProps = { progress: 90 }
export { ProgressBar }
