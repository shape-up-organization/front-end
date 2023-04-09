import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  theme => ({
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
    badge: {
      '& .MuiBadge-badge': {
        bottom: 10,
        left: -10,
      },
    },
  }),
  { name: 'ChatButton' }
)
