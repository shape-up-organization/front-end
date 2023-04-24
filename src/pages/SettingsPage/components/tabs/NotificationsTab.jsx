import { Paper, Stack, Typography, useMediaQuery } from '@mui/material'

import { AnimatedWrapper } from '@layouts/AnimatedWrapper'

const NotificationsTab = () => {
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <AnimatedWrapper>
      <Stack component={Paper} rowGap={4} p={{ xs: 4, md: 8 }} pb={{ xs: 8 }}>
        <Typography
          color="primary"
          fontWeight={500}
          textAlign={lessThanMedium ? 'center' : 'left'}
          variant={lessThanMedium ? 'h6' : 'h4'}
        >
          Work in progress...
        </Typography>
      </Stack>
    </AnimatedWrapper>
  )
}

export { NotificationsTab }
