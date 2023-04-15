import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  () => ({
    container: {
      display: 'flex',
      minHeight: '100vh',
    },
  }),
  { name: 'SearchPage' }
)
