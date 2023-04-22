import P from 'prop-types'

import { useMediaQuery, useTheme } from '@mui/material'
import CarouselMUI from 'react-material-ui-carousel'

const Carousel = ({ children }) => {
  const theme = useTheme()
  const moreThanMedium = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <CarouselMUI
      duration={200}
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.main,
        },
      }}
      indicatorContainerProps={{
        style: {
          position: 'absolute',
          top: moreThanMedium ? '48vh' : '44vh',
          zIndex: theme.zIndex.mobileStepper,
        },
      }}
      indicatorIconButtonProps={{
        style: {
          marginLeft: 2,
          marginRight: 2,
          color: theme.palette.text.disabled,
        },
      }}
      sx={{
        width: '100%',
        height: '100% !important',
        '& div': {
          height: '100% !important',
        },
      }}
    >
      {children}
    </CarouselMUI>
  )
}

Carousel.propTypes = {
  children: P.node.isRequired,
}

export { Carousel }
