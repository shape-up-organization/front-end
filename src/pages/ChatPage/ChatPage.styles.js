import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  theme => ({
    paper: {
      height: '100%',
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
