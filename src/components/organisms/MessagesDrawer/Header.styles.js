import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  theme => ({
    header: {
      alignItems: 'center',
      backgroundColor: theme.palette.chat.backgroundHeader,
      borderColor: theme.palette.secondary.main,
      borderStyle: 'solid',
      borderWidth: 2,
      borderBottomWidth: 0,
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      cursor: 'pointer',
      display: 'flex',
      gap: 1,
      height: '100%',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
    },
    icon: {
      color: theme.palette.getContrastText(theme.palette.chat.backgroundHeader),
    },
  }),
  { name: 'Header' }
)
