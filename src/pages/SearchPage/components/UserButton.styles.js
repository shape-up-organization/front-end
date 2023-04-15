import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  theme => ({
    avatar: {
      border: 4,
      borderColor: 'transparent',
      borderStyle: 'solid',
      height: 56,
      width: 56,

      [theme.breakpoints.down('md')]: {
        height: 40,
        width: 40,
      },
    },
    chatButton: {
      alignItems: 'center',
      color: theme.palette.text.primary,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingY: 2,
      textAlign: 'left',
      textTransform: 'none',
    },
  }),
  { name: 'UserButton' }
)
