import { makeStyles } from 'tss-react/mui'

export const sizes = {
  thinTall: {
    contentHeight() {
      return Math.ceil((94 / 100) * this.height)
    },
    headerHeight() {
      return this.height - this.contentHeight()
    },
    height: 72,
    minHeaderHeight: 32,
    minWidth: 352,
    width: 100,
  },
}

export const useStyles = makeStyles()(
  (theme, params) => ({
    badge: {
      transition: theme.transitions.create('bottom', {
        easing: theme.transitions.easing.easeOut,
        duration: 560,
      }),
    },
    content: {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.secondary.main,
      borderStyle: 'solid',
      borderWidth: 2,
    },
    drawerContainer: {
      height: `${sizes[params.size].height}vh`,
      maxWidth: theme.spacing(44),
      minWidth: sizes[params.size].minWidth,
      overflow: 'hidden',
      position: 'relative',
      width: `${sizes[params.size].width}vw`,
    },
  }),
  { name: 'Drawer' }
)
