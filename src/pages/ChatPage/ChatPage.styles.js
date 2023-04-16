import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  theme => ({
    container: {
      height: '100%',
    },
    paper: {
      height: '94%',

      [theme.breakpoints.down('sm')]: {
        height: '100%',
      },
    },
    messagesList: {
      transition: 'all 0.5s ease-in-out',
    },
    chat: {
      transition: 'all 0.5s ease-in-out',
      borderColor: theme.palette.primary.main,
    },
  }),
  { name: 'ChatPage' }
)
