import { Stack } from '@mui/material'
import { motion } from 'framer-motion'
import P from 'prop-types'

const AnimatedWrapper = ({ children }) => (
  <motion.div
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    initial={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    style={{
      display: 'flex',
      height: '100%',
      rowGap: 2,
      width: '100%',
    }}
  >
    <Stack height="100%" width="100%" rowGap={4}>
      {children}
    </Stack>
  </motion.div>
)

AnimatedWrapper.propTypes = {
  children: P.node.isRequired,
}

export { AnimatedWrapper }
