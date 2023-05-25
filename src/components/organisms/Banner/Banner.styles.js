import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  theme => ({
    title: {
      textAlign: 'left',

      [theme.breakpoints.down('lg')]: {
        textAlign: 'center',
      },
    },
    bullets: {
      [theme.breakpoints.down('lg')]: {
        '& > .MuiGrid-item': {
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          '& > svg': {
            display: 'none',
          },
          '& h6, span': {
            fontSize: theme.typography.pxToRem(16),
          },
        },
      },
    },
    buttonWrapper: {
      [theme.breakpoints.down('lg')]: {
        justifyContent: 'center',
        paddingBottom: theme.spacing(6),
      },
    },
    container: {
      gap: theme.spacing(5),

      [theme.breakpoints.down('lg')]: {
        gap: theme.spacing(0),
      },
    },
    image: {
      minHeight: '40vw',
      maxWidth: 600,

      [theme.breakpoints.down('lg')]: {
        paddingBottom: theme.spacing(1),
      },
    },
  }),
  { name: 'Banner' }
)
