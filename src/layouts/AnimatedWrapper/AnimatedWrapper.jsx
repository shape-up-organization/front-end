import { motion } from 'framer-motion'
import P from 'prop-types'

import { Stack } from '@mui/material'

const AnimatedWrapper = ({ children }) => (
  <motion.div
    animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
    exit={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
    initial={{ filter: 'blur(3px)', opacity: 0, scale: 0.98 }}
    transition={{ easings: 'easeInOut', duration: 0.2 }}
    style={{
      display: 'flex',
      height: '100%',
      rowGap: 2,
      width: '100%',
    }}
  >
    <Stack height="100%" rowGap={4} width="100%">
      {children}
    </Stack>
  </motion.div>
)

AnimatedWrapper.propTypes = {
  children: P.node.isRequired,
}

export { AnimatedWrapper }
