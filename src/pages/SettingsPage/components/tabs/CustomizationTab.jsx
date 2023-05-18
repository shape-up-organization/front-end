import { Typography, useMediaQuery } from '@mui/material'

import { AnimatedWrapper } from '@layouts/AnimatedWrapper'

const CustomizationTab = () => {
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <AnimatedWrapper>
      <Typography
        color="primary"
        fontWeight={500}
        textAlign={lessThanMedium ? 'center' : 'left'}
        variant={lessThanMedium ? 'h6' : 'h4'}
      >
        Work in progress...
      </Typography>
    </AnimatedWrapper>
  )
}

export { CustomizationTab }
