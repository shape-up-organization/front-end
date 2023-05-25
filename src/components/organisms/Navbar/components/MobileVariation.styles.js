import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  theme => ({
    drawerPaper: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '72%',
      },

      [theme.breakpoints.up('md')]: {
        width: '56%',
      },

      [theme.breakpoints.up('lg')]: {
        width: '40%',
      },
    },
  }),
  { name: 'MobileVariation' }
)
