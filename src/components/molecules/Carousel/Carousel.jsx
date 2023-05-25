import { Children, useEffect } from 'react'

import P from 'prop-types'
import { useSnapCarousel } from 'react-snap-carousel'

import CircleRoundedIcon from '@mui/icons-material/CircleRounded'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material'

import { useStyles } from './Carousel.styles'

const Carousel = ({ autoPlay, autoPlayTimeout, children }) => {
  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel()

  const { classes } = useStyles()

  const arrayChildren = Children.toArray(children)

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        if (activePageIndex === pages.length - 1) {
          goTo(0)
          return
        }
        next()
      }, autoPlayTimeout)

      return () => clearInterval(interval)
    }
  }, [autoPlay, next])

  return (
    <Stack className={classes.container}>
      {pages.length > 1 && (
        <Box
          bgcolor="background.default"
          className={classes.quantityElements}
          component={Paper}
        >
          <Typography fontWeight={500} variant="body2">
            {`${activePageIndex + 1} / ${pages.length}`}
          </Typography>
        </Box>
      )}
      <Box className={classes.carousel} component="ul" ref={scrollRef}>
        {Children.map(arrayChildren, child => (
          <Box component="li" className={classes.carouselItemWrapper}>
            {child}
          </Box>
        ))}
        <Stack className={classes.controllers}>
          <IconButton
            onClick={prev}
            sx={{
              opacity: activePageIndex === 0 ? 0 : 1,
            }}
            type="button"
          >
            <KeyboardArrowLeftRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={next}
            sx={{
              opacity: activePageIndex === pages.length - 1 ? 0 : 1,
            }}
            type="button"
          >
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
      {pages.length > 1 && (
        <Stack className={classes.bottomNav}>
          {pages.map((page, i) => (
            <IconButton key={page} onClick={() => goTo(i)}>
              <CircleRoundedIcon
                color={i === activePageIndex ? 'primary' : 'disabled'}
                sx={{
                  fontSize: 12,
                  transition: theme =>
                    theme.transitions.create('color', {
                      easing: theme.transitions.easing.easeInOut,
                      duration: theme.transitions.duration.standard,
                    }),
                }}
              />
            </IconButton>
          ))}
        </Stack>
      )}
    </Stack>
  )
}

Carousel.propTypes = {
  autoPlay: P.bool,
  autoPlayTimeout: P.number,
  children: P.node.isRequired,
}

Carousel.defaultProps = {
  autoPlay: false,
  autoPlayTimeout: 3000,
}

export { Carousel }
