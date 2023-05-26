import { useState } from 'react'

import { useSnackbar } from 'notistack'
import P from 'prop-types'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { zodResolver } from '@hookform/resolvers/zod'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from '@mui/material'

import { TextButton } from '@atoms/TextButton'
import { TextField } from '@atoms/TextField'
import { Modal } from '@templates/Modal'

import api from '@api/services/auth'
import { useAuth } from '@contexts'
import { schema } from './schema'

const PasswordEndAdornment = ({
  isShowingPasswordStates: { isShowingPassword, setIsShowingPassword },
}) => {
  const { t } = useTranslation()

  return (
    <InputAdornment position="end">
      <Tooltip
        title={
          isShowingPassword
            ? t('pages.landing.login.others.hidePassword')
            : t('pages.landing.login.others.showPassword')
        }
      >
        <IconButton
          onClick={() =>
            setIsShowingPassword(
              prevIsShowingPassword => !prevIsShowingPassword
            )
          }
          onMouseDown={event => event.preventDefault()}
        >
          {isShowingPassword ? (
            <VisibilityOff fontSize="small" />
          ) : (
            <Visibility fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
    </InputAdornment>
  )
}

PasswordEndAdornment.propTypes = {
  isShowingPasswordStates: P.shape([P.bool, P.func]).isRequired,
}

const Content = ({ switchModal }) => {
  const { signIn } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })
  const { t } = useTranslation()

  const [isShowingPassword, setIsShowingPassword] = useState(false)
  const [isButtonLoading, setIsButtonLoading] = useState(false)

  const handleLogin = async values => {
    setIsButtonLoading(true)
    const payload = values

    const response = await api.login(payload)
    setIsButtonLoading(false)

    if (response.status === 404) {
      enqueueSnackbar(t('pages.landing.login.snackbar.wrongCredentials'), {
        variant: 'error',
      })
      return
    }

    if (response.status !== 200) {
      enqueueSnackbar(t('pages.landing.login.snackbar.genericError'), {
        variant: 'error',
      })
      return
    }

    signIn(response.data['jwt-token'])
  }

  return (
    <Grid
      container
      component="form"
      justifyContent="center"
      noValidate
      onSubmit={handleSubmit(handleLogin)}
      paddingTop={1}
      rowSpacing={2}
    >
      <Grid item xs={12}>
        <TextField
          error={errors.email?.message}
          label={t('pages.landing.login.label.email')}
          name="email"
          type="email"
          register={register}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          endAdornment={
            <PasswordEndAdornment
              isShowingPasswordStates={{
                isShowingPassword,
                setIsShowingPassword,
              }}
            />
          }
          error={errors.password?.message}
          label={t('pages.landing.login.label.password')}
          name="password"
          type={isShowingPassword ? 'text' : 'password'}
          register={register}
        />
      </Grid>
      {/* <Grid item textAlign="center" xs={12}>
        <LinkButton internal="password-recovery">
          <Typography fontWeight="bold" variant="caption">
            {t('pages.landing.login.others.forgotPassword')}
          </Typography>
        </LinkButton>
      </Grid> */}
      <Grid item xs={8} sm={6}>
        <Button
          disabled={isButtonLoading}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {isButtonLoading ? (
            <CircularProgress color="secondary" size={24} />
          ) : (
            <Typography fontWeight="bold" textTransform="uppercase">
              {t('pages.landing.login.others.buttonSignIn')}
            </Typography>
          )}
        </Button>
      </Grid>
      <Grid item textAlign="center" xs={12} sm={12}>
        <Typography fontWeight="500" variant="caption">
          {t('pages.landing.login.others.signUpCall.1')}
          <TextButton
            handleClick={switchModal}
            text={t('pages.landing.login.others.signUpCall.2')}
          />
          {t('pages.landing.login.others.signUpCall.3')}
        </Typography>
      </Grid>
    </Grid>
  )
}

Content.propTypes = {
  switchModal: P.func.isRequired,
}

const size = 'small'
const LoginModal = ({ handleClose, isOpen, switchModal }) => {
  const { t } = useTranslation()

  return (
    <Modal
      content={<Content switchModal={switchModal} />}
      handleClose={handleClose}
      isOpen={isOpen}
      size={size}
      title={t('pages.landing.login.others.title')}
    />
  )
}

LoginModal.propTypes = {
  isOpen: P.bool.isRequired,
  handleClose: P.func.isRequired,
  switchModal: P.func.isRequired,
}

export { LoginModal }
