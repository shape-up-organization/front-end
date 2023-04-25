import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSnackbar } from 'notistack'
import P from 'prop-types'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { DatePicker } from '@atoms/DatePicker'
import { LinkButton } from '@atoms/LinkButton'
import { TextButton } from '@atoms/TextButton'
import { TextField } from '@atoms/TextField'
import { Modal } from '@templates/Modal'

import api from '@api/services/auth'
import { masks } from '@utils/constants/masks'

import { schema } from './schema'

const Content = ({ switchModal }) => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    control,
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm({ resolver: zodResolver(schema) })
  const { t, i18n } = useTranslation()

  const [showPassword, setShowPassword] = useState(false)
  const [isTermsChecked, setIsTermsChecked] = useState(false)
  const [isButtonLoading, setIsButtonLoading] = useState(false)

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

    const response = await api.register(payload)
    setIsButtonLoading(false)

    if (response.status === 409) {
      const fieldMessage = response.data.messages[0]
        ?.toLowerCase()
        .includes('cell phone')
        ? 'cellPhone'
        : 'email'

      setError(fieldMessage, {
        type: 'onBlur',
        message: t(`pages.landing.signup.schema.${fieldMessage}AlreadyExists`),
      })
      return
    }

    if (response.status !== 201) {
      enqueueSnackbar(t('pages.landing.signup.snackbar.genericError'), {
        variant: 'error',
      })
      return
    }

    switchModal()
    enqueueSnackbar(t('pages.landing.signup.snackbar.success'), {
      variant: 'success',
    })
  }

  const handleOnBlurUsername = async event => {
    const { value } = event.target
    if (value === '') return
    const response = await api.validateUsername(value)
    if (response.status === 409) {
      setError('username', {
        type: 'onBlur',
        message: t('pages.landing.signup.schema.usernameAlreadyExists'),
      })
      return
    }
    if (response.status !== 200) {
      console.error(response)
      return
    }
    clearErrors('username')
  }

  return (
    <Grid
      container
      component="form"
      justifyContent="center"
      noValidate
      onSubmit={handleSubmit(handleSignup)}
      paddingTop={1}
      spacing={2}
    >
      <Grid item xs={12} sm={6}>
        <TextField
          error={errors.name?.message}
          label={t('pages.landing.signup.label.name')}
          name="name"
          type="text"
          register={register}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          error={errors.lastName?.message}
          label={t('pages.landing.signup.label.lastName')}
          name="lastName"
          type="text"
          register={register}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          error={errors.username?.message}
          label={t('pages.landing.signup.label.username')}
          name="username"
          type="text"
          register={() =>
            register('username', {
              onBlur: handleOnBlurUsername,
            })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          error={errors.email?.message}
          label={t('pages.landing.signup.label.email')}
          name="email"
          type="email"
          register={register}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          error={errors.cellPhone?.message}
          label={t('pages.landing.signup.label.cellPhone')}
          mask={masks.PHONES[i18n.resolvedLanguage]}
          name="cellPhone"
          type="tel"
          register={register}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DatePicker
          autoFocus
          control={control}
          errors={errors}
          label={t('pages.landing.signup.label.birthDate')}
          name="birth"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          error={errors.password?.message}
          label={t('pages.landing.signup.label.password')}
          name="password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip
                title={
                  showPassword
                    ? t('pages.landing.signup.others.hidePassword')
                    : t('pages.landing.signup.others.showPassword')
                }
              >
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
              </Tooltip>
            </InputAdornment>
          }
          register={register}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          error={errors.confirmPassword?.message}
          label={t('pages.landing.signup.label.confirmPassword')}
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip
                title={
                  showPassword
                    ? t('pages.landing.signup.others.hidePassword')
                    : t('pages.landing.signup.others.showPassword')
                }
              >
                <IconButton
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
              </Tooltip>
            </InputAdornment>
          }
          register={register}
        />
      </Grid>
      <Grid
        item
        xs={10}
        sm={12}
        display="flex"
        justifyContent="center"
        textAlign="center"
      >
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
              {t('pages.landing.signup.others.checkbox.1')}
              <LinkButton
                internal="/help"
                internalOptions={{
                  state: {
                    section: 'termsOfUse',
                  },
                }}
              >
                {t('pages.landing.signup.others.checkbox.2')}
              </LinkButton>
              {t('pages.landing.signup.others.checkbox.3')}
              <LinkButton
                internal="/help"
                internalOptions={{
                  state: {
                    section: 'privacyPolicy',
                  },
                }}
              >
                {t('pages.landing.signup.others.checkbox.4')}
              </LinkButton>
            </Typography>
          }
        />
      </Grid>
      <Grid item xs={6} sm={4} md={3} lg={4}>
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
            <Typography fontWeight="bold" textTransform="uppercase">
              {t('pages.landing.signup.others.buttonSignUp')}
            </Typography>
          )}
        </Button>
      </Grid>
      <Grid item textAlign="center" xs={12} sm={12}>
        <Typography fontWeight="500" variant="caption">
          {t('pages.landing.signup.others.signInCall.1')}
          <TextButton
            handleClick={switchModal}
            text={t('pages.landing.signup.others.signInCall.2')}
          />
        </Typography>
      </Grid>
    </Grid>
  )
}

Content.propTypes = { switchModal: P.func.isRequired }

const size = 'large'

const SignupModal = ({ isOpen, handleClose, switchModal }) => {
  const { t } = useTranslation()
  const lessThanLarge = useMediaQuery(theme => theme.breakpoints.down('lg'))

  return (
    <Modal
      content={<Content switchModal={switchModal} />}
      direction={lessThanLarge ? 'vertical' : 'horizontal'}
      handleClose={handleClose}
      isOpen={isOpen}
      size={size}
      title={t('pages.landing.signup.others.title')}
      titleAlignment={lessThanLarge ? 'center' : 'left'}
    />
  )
}

SignupModal.propTypes = {
  isOpen: P.bool.isRequired,
  handleClose: P.func.isRequired,
  switchModal: P.func.isRequired,
}

export { SignupModal }
