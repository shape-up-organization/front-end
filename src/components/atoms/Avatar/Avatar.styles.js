import { makeStyles } from 'tss-react/mui'

const sizes = {
  big: {
    border: 8,
    default: {
      height: 176,
      width: 176,
    },
    downMd: {
      height: 96,
      width: 96,
    },
  },
  large: {
    border: 6,
    default: {
      height: 80,
      width: 80,
    },
    downMd: {
      height: 80,
      width: 80,
    },
  },
  medium: {
    border: 4,
    default: {
      height: 48,
      width: 48,
    },
    downMd: {
      height: 40,
      width: 40,
    },
  },
  mini: {
    border: 3,
    default: {
      height: 24,
      width: 24,
    },
    downMd: {
      height: 24,
      width: 24,
    },
  },
}

export const useStyles = makeStyles()(
  (theme, { avatarSize }) => {
    const size = sizes[avatarSize || 'medium']

    return {
      avatar: {
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: size.border,
        ...size.default,

        [theme.breakpoints.down('md')]: {
          ...size.downMd,
        },
      },
    }
  },
  { name: 'Avatar' }
)
