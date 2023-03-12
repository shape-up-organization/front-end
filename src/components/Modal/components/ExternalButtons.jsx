import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Button, Grid, Typography } from '@mui/material'

const types = {
  google: {
    icon: <GoogleIcon />,
    name: 'Google',
  },
  facebook: {
    icon: <FacebookIcon />,
    name: 'Facebook',
  },
  twitter: {
    icon: <TwitterIcon />,
    name: 'Twitter',
  },
}

const sites = Object.keys(types)

const ExternalButtons = () => {
  return (
    <Grid container justifyContent="center" gap={2}>
      {sites.map((site, index) => (
        <Grid item key={index} xs={12}>
          <Button
            fullWidth
            size="large"
            startIcon={types[site].icon}
            variant="contained"
          >
            <Typography fontWeight="bold" textTransform="none">
              Entre com {types[site].name}
            </Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  )
}

export { ExternalButtons }
