import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(
  (theme, { mini }) => ({
    avatar: {
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: mini ? 3 : 4,
      ...(mini
        ? {
            height: 24,
            width: 24,
          }
        : {
            height: 56,
            width: 56,
          }),

      [theme.breakpoints.down('md')]: {
        ...(mini
          ? {
              height: 24,
              width: 24,
            }
          : {
              height: 40,
              width: 40,
            }),
      },
    },
  }),
  { name: 'Avatar' }
)
