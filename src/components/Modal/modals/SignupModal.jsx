import P from 'prop-types'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
  const { register, handleSubmit } = useForm()

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <Grid
      component="form"
      container
      justifyContent="center"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      paddingTop={1}
    >
      <Grid item xs={6}>
        <TextField
          autoComplete="off"
          fullWidth
          label="Nome"
          name="name"
          type="text"
          variant="outlined"
          {...register('name')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          autoComplete="off"
          fullWidth
          label="Sobrenome"
          name="lastName"
          type="text"
          variant="outlined"
          {...register('lastName')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          autoComplete="off"
          fullWidth
          label="E-mail"
          name="email"
          type="email"
          variant="outlined"
          {...register('email')}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          autoComplete="off"
          fullWidth
          label="DDD"
          name="ddd"
          type="text"
          variant="outlined"
          {...register('ddd')}
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          autoComplete="off"
          fullWidth
          label="Número"
          name="cellPhone"
          type="text"
          variant="outlined"
          {...register('cellPhone')}
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          autoComplete="off"
          fullWidth
          label="Data de nascimento"
          name="birthDate"
          type="text"
          variant="outlined"
          {...register('birthDate')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          autoComplete="off"
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
          {...register('password')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          autoComplete="off"
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
          {...register('confirmPassword')}
        />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <FormControlLabel
          control={<Checkbox {...register('terms')} />}
          label={
            <Typography fontWeight="bold" variant="subtitle2">
              Li e aceito os <Link href="/">termos de uso</Link> e{' '}
              <Link href="/">políticas de privacidade</Link>
            </Typography>
          }
        />
      </Grid>
      <Grid item xs={5}>
        <Button fullWidth size="large" variant="contained" type="submit">
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
