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
  Grow,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'

import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'

const size = 'large'
const title = 'Crie sua conta'

const Content = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isTermsChecked, setIsTermsChecked] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

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
      rowSpacing={1}
      columnSpacing={2}
      paddingTop={1}
    >
      <Grid item xs={6}>
        <TextField
          autoComplete="off"
          fullWidth
          helperText={
            Boolean(errors.name?.message) ? (
              <Grow in={Boolean(errors.name?.message)} unmountOnExit>
                <Typography color="error" variant="subtitle2">
                  {errors.name?.message}
                </Typography>
              </Grow>
            ) : (
              ' '
            )
          }
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
          helperText={
            Boolean(errors.lastName?.message) ? (
              <Grow in={Boolean(errors.lastName?.message)} unmountOnExit>
                <Typography color="error" variant="subtitle2">
                  {errors.lastName?.message}
                </Typography>
              </Grow>
            ) : (
              ' '
            )
          }
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
          helperText={
            Boolean(errors.email?.message) ? (
              <Grow in={Boolean(errors.email?.message)} unmountOnExit>
                <Typography color="error" variant="subtitle2">
                  {errors.email?.message}
                </Typography>
              </Grow>
            ) : (
              ' '
            )
          }
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
          helperText={
            Boolean(errors.ddd?.message) ? (
              <Grow in={Boolean(errors.ddd?.message)} unmountOnExit>
                <Typography color="error" variant="subtitle2">
                  {errors.ddd?.message}
                </Typography>
              </Grow>
            ) : (
              ' '
            )
          }
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
          helperText={
            Boolean(errors.cellPhone?.message) ? (
              <Grow in={Boolean(errors.cellPhone?.message)} unmountOnExit>
                <Typography color="error" variant="subtitle2">
                  {errors.cellPhone?.message}
                </Typography>
              </Grow>
            ) : (
              ' '
            )
          }
          label="Número"
          name="cellPhone"
          type="tel"
          variant="outlined"
          {...register('cellPhone')}
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          autoComplete="off"
          fullWidth
          helperText={
            Boolean(errors.birth?.message) ? (
              <Grow in={Boolean(errors.birth?.message)} unmountOnExit>
                <Typography color="error" variant="subtitle2">
                  {errors.birth?.message}
                </Typography>
              </Grow>
            ) : (
              ' '
            )
          }
          label="Data de nascimento"
          name="birth"
          type="text"
          variant="outlined"
          {...register('birth')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          autoComplete="off"
          fullWidth
          helperText={
            Boolean(errors.password?.message) ? (
              <Grow in={Boolean(errors.password?.message)} unmountOnExit>
                <Typography color="error" variant="subtitle2">
                  {errors.password?.message}
                </Typography>
              </Grow>
            ) : (
              ' '
            )
          }
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
          helperText={
            Boolean(errors.confirmPassword?.message) ? (
              <Grow in={Boolean(errors.confirmPassword?.message)} unmountOnExit>
                <Typography color="error" variant="subtitle2">
                  {errors.confirmPassword?.message}
                </Typography>
              </Grow>
            ) : (
              ' '
            )
          }
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
          control={
            <Checkbox
              checked={isTermsChecked}
              onChange={() =>
                setIsTermsChecked(prevIsTermsChecked => !prevIsTermsChecked)
              }
            />
          }
          label={
            <Typography fontWeight="bold" variant="subtitle2">
              Li e aceito os <Link href="/">termos de uso</Link> e{' '}
              <Link href="/">políticas de privacidade</Link>
            </Typography>
          }
        />
      </Grid>
      <Grid item xs={5}>
        <Button
          disabled={!isTermsChecked}
          fullWidth
          size="large"
          variant="contained"
          type="submit"
        >
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
