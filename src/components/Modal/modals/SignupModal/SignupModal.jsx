import P from 'prop-types'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { LinkButton } from '@components/LinkButton'
import { Modal } from '@components/Modal/Modal'
import { TextField } from '@components/TextField'

import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from './schema'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  Grow,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import { users } from '@api/users'

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

  const handleSubmitForm = async (values, e) => {
    e.preventDefault()

    const payload = {
      name: values.name,
      last_name: values.lastName,
      email: values.email,
      cell_phone: values.cellPhone,
      password: values.password,
      birth: values.birth,
    }

    try {
      await users.create(payload)
    } catch (error) {
      console.log(error)
    }
    // console.log(response)
  }

  return (
    <Grid
      component="form"
      container
      justifyContent="center"
      noValidate
      onSubmit={handleSubmit(handleSubmitForm)}
      spacing={2}
      paddingTop={1}
    >
      <Grid item xs={6}>
        <TextField
          error={errors.name?.message}
          label="Nome"
          name="name"
          type="text"
          register={register}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          error={errors.lastName?.message}
          label="Sobrenome"
          name="lastName"
          type="text"
          register={register}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={errors.email?.message}
          label="E-mail"
          name="email"
          type="email"
          register={register}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          error={errors.cellPhone?.message}
          label="Número"
          name="cellPhone"
          type="tel"
          register={register}
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
          render={({ field: { ref, name, ...field }, fieldState }) => (
            <DatePicker
              {...field}
              format="dd/MM/yyyy"
              inputRef={ref}
              label="Data de nascimento"
              maxDate={new Date()}
              sx={{
                '& .MuiButtonBase-root': {
                  marginRight: 0,
                },
              }}
              renderInput={inputProps => (
                <TextField
                  {...inputProps}
                  error={!!fieldState.error}
                  name={name}
                  label="Data de nascimento"
                />
              )}
            />
          )}
        />
        <FormHelperText component="span">
          <Grow in={!!errors.birth?.message} unmountOnExit>
            <Typography
              color="error"
              component="p"
              fontWeight={500}
              gutterBottom
              sx={{ padding: theme => theme.spacing(1, 2) }}
              variant="caption"
            >
              {errors.birth?.message ?? ''}
            </Typography>
          </Grow>
        </FormHelperText>
      </Grid>
      <Grid item xs={6}>
        <TextField
          error={errors.password?.message}
          label="Senha"
          name="password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
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
          }
          register={register}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          error={errors.confirmPassword?.message}
          label="Confirmar senha"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
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
          }
          register={register}
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
              Li e aceito os <LinkButton href="/">termos de uso</LinkButton> e{' '}
              <LinkButton href="/">políticas de privacidade</LinkButton>
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
