import { Button, Typography } from '@mui/material'

import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import TwitterIcon from '@mui/icons-material/Twitter'

const types = {
  facebook: {
    icon: <FacebookIcon />,
    name: 'Facebook',
  },
  google: {
    icon: <GoogleIcon />,
    name: 'Google',
  },
  twitter: {
    icon: <TwitterIcon />,
    name: 'Twitter',
  },
}

const ExternalButton = ({ type }) => {
  return (
    <Button fullWidth size="large" startIcon={types[type].icon} variant="contained">
      <Typography fontWeight="bold" textTransform="none">
        Entre com {types[type].name}
      </Typography>
    </Button>
  )
}

export { ExternalButton }
