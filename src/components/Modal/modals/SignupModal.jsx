import P from 'prop-types'
import { useState } from 'react'

import { Link } from '@components/Link'
import { Modal } from '../Modal'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'

const size = 'large'
const title = 'Crie sua conta'

const Content = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Grid container justifyContent="center" spacing={2} paddingTop={1}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Nome"
          name="name"
          type="text"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Sobrenome"
          name="lastName"
          type="text"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="E-mail"
          name="email"
          type="email"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          fullWidth
          label="DDD"
          name="ddd"
          type="text"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          fullWidth
          label="Número"
          name="cellPhone"
          type="text"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          fullWidth
          label="Data de nascimento"
          name="birthDate"
          type="text"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
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
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Confirmar senha"
          name="confirmPassword"
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
      <Grid item xs={12} display="flex" justifyContent="center">
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography fontWeight="bold" variant="subtitle2">
              Li e aceito os <Link href="/">termos de uso</Link> e{' '}
              <Link href="/">políticas de privacidade</Link>
            </Typography>
          }
        />
      </Grid>
      <Grid item xs={5}>
        <Button fullWidth size="large" variant="contained">
          <Typography fontWeight="bold" textTransform="none">
            ENTRAR
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

const SignupModal = ({ open, handleClose }) => {
  return (
    <Modal
      content={<Content />}
      direction="horizontal"
      handleClose={handleClose}
      open={open}
      size={size}
      title={title}
      titleAlignment="left"
    />
  )
}

SignupModal.propTypes = {
  open: P.bool.isRequired,
  handleClose: P.func.isRequired,
}

export { SignupModal }
