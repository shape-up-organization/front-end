import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  theme => ({
    content: {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.secondary.main,
      borderStyle: 'solid',
      borderWidth: 2,
    },
    messageDrawerContainer: {
      height: '72vh',
      maxWidth: theme.spacing(44),
      minWidth: theme.spacing(30),
      position: 'relative',
      transition: theme.transitions.create('bottom', {
        easing: theme.transitions.easing.easeOut,
        duration: 560,
      }),
      width: '18vw',
    },
  }),
  { name: 'MessagesDrawer' }
)
