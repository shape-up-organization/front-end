import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  dogPic: {
    filter: 'grayscale(60%)',
    maxHeight: '20vh',
  },
  drawerPaper: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '48%',
    },

    [theme.breakpoints.up('md')]: {
      width: '56%',
    },
  },
}))
