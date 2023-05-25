import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  theme => ({
    bottomNav: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderRadius: theme.shape.borderRadius * 4,
      bottom: 8,
      flexDirection: 'row',
      height: 'auto',
      justifyContent: 'center',
      left: 0,
      margin: 'auto',
      position: 'absolute',
      right: 0,
      transition: theme.transitions.create('background-color', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.standard,
      }),
      width: 'fit-content',
      zIndex: theme.zIndex.mobileStepper,

      '&:hover': {
        backgroundColor: theme.palette.background.default,
      },

      [theme.breakpoints.down('md')]: {
        backgroundColor: theme.palette.background.default,
      },
    },
    carousel: {
      display: 'flex',
      flexFlow: 'row nowrap',
      gap: theme.spacing(2),
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'hidden',
      overscrollBehavior: 'contain',
      scrollSnapType: 'x mandatory',
      scrollbarWidth: 'none',
      width: '100%',

      [theme.breakpoints.down('md')]: {
        overflowX: 'auto',
      },
    },
    carouselItemWrapper: {
      height: '100%',
      flexShrink: 0,
      overflow: 'hidden',
      scrollSnapAlign: 'center',
      width: '100%',
    },
    container: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'space-between',
      position: 'relative',
      width: '100%',
    },
    controllers: {
      alignItems: 'center',
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'space-between',
      display: 'flex',
      opacity: 0,
      position: 'absolute',
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      transition: theme.transitions.create('opacity', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.standard,
      }),
      width: '100%',
      zIndex: theme.zIndex.mobileStepper,

      '&:hover': {
        opacity: 1,
      },

      '& > button': {
        backgroundColor: theme.palette.background.default,
      },

      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    quantityElements: {
      borderRadius: theme.shape.borderRadius * 4,
      position: 'absolute',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
      right: 4,
      top: 6,
      zIndex: theme.zIndex.mobileStepper,
    },
  }),
  { name: 'Carousel' }
)
