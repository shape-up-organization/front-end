import { Box, CircularProgress } from '@mui/material'

const LoadingPage = () => (
  <Box
    alignItems="center"
    display="flex"
    height="100vh"
    justifyContent="center"
    width="100vw"
  >
    <CircularProgress />
  </Box>
)
export { LoadingPage }
