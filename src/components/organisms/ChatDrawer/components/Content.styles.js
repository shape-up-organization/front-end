import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  content: {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.secondary.main,
    borderStyle: 'solid',
    borderWidth: 2,
  },
}))
