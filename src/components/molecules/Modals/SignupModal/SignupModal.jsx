import P from 'prop-types'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSnackbar } from 'notistack'

import { LinkButton } from '@atoms/LinkButton'
import { TextField } from '@atoms/TextField'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  Checkbox,
  CircularProgress,
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
import { Modal } from '../../../templates/Modal/Modal'
import { schema } from './schema'

const size = 'large'
const title = 'Crie sua conta'

const Content = ({ switchModal }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isTermsChecked, setIsTermsChecked] = useState(false)
  const [isButtonLoading, setIsButtonLoading] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const handleSignup = async values => {
    setIsButtonLoading(true)

    const payload = {
      name: values.name,
      last_name: values.lastName,
      username: values.username,
      email: values.email,
      cell_phone: values.cellPhone,
      password: values.password,
      birth: values.birth,
    }

    try {
      const response = await users.create(payload)

      if (response.status === 201) {
        switchModal()
        enqueueSnackbar('Usuário registrado com sucesso!', {
          variant: 'success',
        })
      }
    } catch (error) {
      console.log('erro: ', error)
      enqueueSnackbar('Houve algum erro na criação do usuário', {
        variant: 'error',
      })
    } finally {
      setIsButtonLoading(false)
    }
  }

  return (
    <Grid
      component="form"
      container
      justifyContent="center"
      noValidate
      onSubmit={handleSubmit(handleSignup)}
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
          error={errors.username?.message}
          label="Nome de usuário"
          name="username"
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
          }}
          render={({ field: { ref, ...field } }) => {
            const getErrorColor = cssRule =>
              errors.birth?.message || errors.birth?.birth?.message
                ? {
                    [cssRule]: theme => {
                      const errorColor = theme.palette.error.main
                      return `${errorColor} !important`
                    },
                  }
                : {}

            return (
              <DatePicker
                format="dd/MM/yyyy"
                inputRef={ref}
                label="Data de nascimento"
                maxDate={new Date()}
                sx={{
                  '& .MuiButtonBase-root': {
                    marginRight: 0,
                  },
                  '& .MuiInputLabel-root': {
                    ...getErrorColor('color'),
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    ...getErrorColor('borderColor'),
                  },
                }}
                {...field}
              />
            )
          }}
        />
        <FormHelperText component="span">
          <Grow
            in={!!errors.birth?.message || !!errors.birth?.birth?.message}
            unmountOnExit
          >
            <Typography
              color="error"
              component="p"
              fontWeight={500}
              gutterBottom
              sx={{ padding: theme => theme.spacing(1, 2) }}
              variant="caption"
            >
              {errors.birth?.message || errors.birth?.birth?.message || ''}
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
              Li e aceito os{' '}
              <LinkButton internal="terms-of-use">termos de uso</LinkButton> e{' '}
              <LinkButton internal="privacy-policies">
                políticas de privacidade
              </LinkButton>
            </Typography>
          }
        />
      </Grid>
      <Grid item xs={5}>
        <Button
          disabled={!isTermsChecked || isButtonLoading}
          fullWidth
          size="large"
          variant="contained"
          type="submit"
        >
          {isButtonLoading ? (
            <CircularProgress color="secondary" size={24} />
          ) : (
            <Typography fontWeight="bold" textTransform="none">
              ENTRAR
            </Typography>
          )}
        </Button>
      </Grid>
    </Grid>
  )
}

Content.propTypes = { switchModal: P.func.isRequired }

const SignupModal = ({ isOpen, handleClose, switchModal }) => (
  <Modal
    content={<Content switchModal={switchModal} />}
    direction="horizontal"
    handleClose={handleClose}
    isOpen={isOpen}
    size={size}
    title={title}
    titleAlignment="left"
  />
)

SignupModal.propTypes = {
  isOpen: P.bool.isRequired,
  handleClose: P.func.isRequired,
  switchModal: P.func.isRequired,
}

export { SignupModal }
