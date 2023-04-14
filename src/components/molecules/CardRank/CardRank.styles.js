import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  theme => ({
    container: {
      backgroundColor: theme.palette.secondary.main,
      clipPath: 'polygon(0% 0%, 100% 0, 100% 100%, 51% 58%, 0% 100%)',
    },
  }),
  { name: 'CardRank' }
)
