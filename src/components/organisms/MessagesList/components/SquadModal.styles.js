import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  theme => ({
    closeIcon: {
      right: theme.spacing(2),
      top: theme.spacing(2),
    },
    paperProps: {
      padding: theme.spacing(2, 0, 3),
    },
  }),
  { name: 'SquadModal' }
)
