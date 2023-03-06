import P from 'prop-types'
import { useState } from 'react'

import { Link } from '@components/Link'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { Modal } from '../Modal'

const size = 'small'
const title = 'Faça login'

const Content = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Grid container justifyContent="center" rowSpacing={2} paddingTop={1}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="E-mail"
          name="email"
          type="email"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Senha"
          name="password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          onMouseEnter={event => event.preventDefault()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={() =>
                    setShowPassword(prevShowPassword => !prevShowPassword)
                  }
                  onMouseDown={event => event.preventDefault()}
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={5}>
        <Button fullWidth size="large" variant="contained">
          <Typography fontWeight="bold" textTransform="none">
            ENTRAR
          </Typography>
        </Button>
      </Grid>
      <Grid item textAlign="center" xs={12}>
        <Link>
          <Typography fontWeight="bold" variant="caption">
            Esqueceu sua senha?
          </Typography>
        </Link>
      </Grid>
    </Grid>
  )
}

const LoginModal = ({ open, handleClose }) => {
  return (
    <Modal
      content={<Content />}
      handleClose={handleClose}
      open={open}
      size={size}
      title={title}
    />
  )
}

LoginModal.propTypes = {
  open: P.bool.isRequired,
  handleClose: P.func.isRequired,
}

export { LoginModal }
