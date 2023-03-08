import P from 'prop-types'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Link } from '@components/Link'
import { Modal } from '@components/Modal/Modal'

import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'

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
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const size = 'large'
const title = 'Crie sua conta'

const Content = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isTermsChecked, setIsTermsChecked] = useState(false)

  const {
    control,
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
          error={!!errors.name?.message}
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
          error={!!errors.lastName?.message}
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
          error={!!errors.email?.message}
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
      <Grid item xs={6}>
        <TextField
          autoComplete="off"
          error={!!errors.cellPhone?.message}
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
      <Grid item xs={6}>
        <Controller
          control={control}
          defaultValue={null}
          name="birth"
          rules={{
            required: true,

            validate: {
              min: date => isNow(date) || 'Please, enter a future date',
            },
          }}
          render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
            <DatePicker
              {...field}
              format="dd/MM/yyyy"
              inputRef={ref}
              label="Data de nascimento"
              sx={{
                '& .MuiButtonBase-root': {
                  marginRight: 0,
                },
              }}
              renderInput={inputProps => (
                <TextField
                  {...inputProps}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  name={name}
                  onBlur={onBlur}
                />
              )}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          autoComplete="off"
          error={!!errors.password?.message}
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
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
          error={!!errors.confirmPassword?.message}
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
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
