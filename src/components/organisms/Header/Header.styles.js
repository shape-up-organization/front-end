import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(
  theme => ({
    dogPic: {
      filter: 'grayscale(60%)',
      maxHeight: '20vh',
    },
    drawerPaper: {
      width: '48%',

      [theme.breakpoints.down('sm')]: {
        width: '80%',
      },
    },
  }),
  { name: 'Header' }
)
