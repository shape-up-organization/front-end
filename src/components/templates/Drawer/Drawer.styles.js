import { makeStyles } from 'tss-react/mui'

export const sizes = {
  thinTall: {
    contentHeight() {
      return this.height - this.headerHeight
    },
    headerHeight: 6,
    height: 80,
    minWidth: 352,
    width: 100,
  },
  small: {
    contentHeight() {
      return this.height - this.headerHeight
    },
    headerHeight: 6,
    height: 48,
    minWidth: 400,
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
