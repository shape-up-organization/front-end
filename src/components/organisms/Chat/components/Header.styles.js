import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  theme => ({
    header: {
      borderRadius: 0,
      height: '10%',
      minHeight: 72,
      width: '100%',
      zIndex: theme.zIndex.appBar,
    },
  }),
  { name: 'Header' }
)
