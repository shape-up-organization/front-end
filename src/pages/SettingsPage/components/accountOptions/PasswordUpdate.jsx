import { useState } from 'react'

import i18n from '@app/i18n'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

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

import { TextField } from '@atoms/TextField'

import apiProfile from '@api/services/profile'

const schema = z
  .object({
    oldPassword: z
      .string()
      .nonempty(i18n.t('pages.landing.signup.schema.requiredField')),
    newPassword: z
      .string()
      .nonempty(i18n.t('pages.landing.signup.schema.requiredField'))
      .min(8, { message: i18n.t('pages.landing.signup.schema.atLeast8Chars') })
      .regex(/.*[0-9].*/, {
        message: i18n.t('pages.landing.signup.schema.atLeast1Number'),
      })
      .regex(/.*[A-Z].*/, {
        message: i18n.t('pages.landing.signup.schema.atLeast1UpperCaseLetter'),
      })
      .regex(/.*[a-z].*/, {
        message: i18n.t('pages.landing.signup.schema.atLeast1LowerCaseLetter'),
      })
      .regex(/.*[\W_].*/, {
        message: i18n.t('pages.landing.signup.schema.atLeast1SpecialChar'),
      }),
    newPasswordConfirmation: z
      .string()
      .nonempty(i18n.t('pages.landing.signup.schema.requiredField'))
      .min(8, {
        message: i18n.t('pages.landing.signup.schema.moreThan8Chars'),
      }),
  })
  .refine(
    ({ newPassword, newPasswordConfirmation }) =>
      newPassword === newPasswordConfirmation,
    {
      message: i18n.t('pages.landing.signup.schema.passwordsNotTheSame'),
      path: ['newPasswordConfirmation'],
    }
  )

const PasswordUpdate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({ resolver: zodResolver(schema) })
  const { t } = useTranslation()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdatePassword = async values => {
    setIsLoading(true)

    const payload = {
      password: values.newPassword,
    }

    const response = await apiProfile.updateUserData(payload)
    setIsLoading(false)

    if (response.status !== 204) {
      enqueueSnackbar(
        t('pages.settings.accountOptions.snackbar.genericError'),
        {
          variant: 'error',
        }
      )
      return
    }

    enqueueSnackbar(
      t('pages.settings.accountOptions.snackbar.successPassword'),
      {
        variant: 'success',
      }
    )
  }

  return (
    <Grid
      container
      component="form"
      justifyContent="center"
      noValidate
      onSubmit={handleSubmit(handleUpdatePassword)}
      rowGap={{ xs: 3, md: 6 }}
    >
      <Grid item xs={12} px={{ xs: 0, lg: 16, xl: 24 }}>
        <TextField
          autoFocus
          error={errors.oldPassword?.message}
          label={t(
            'pages.settings.accountOptions.password.oldPasswordPlaceholder'
          )}
          name="oldPassword"
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
      <Grid item xs={12} px={{ xs: 0, lg: 16, xl: 24 }}>
        <TextField
          error={errors.newPassword?.message}
          label={t(
            'pages.settings.accountOptions.password.newPasswordPlaceholder'
          )}
          name="newPassword"
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
      <Grid item xs={12} px={{ xs: 0, lg: 16, xl: 24 }}>
        <TextField
          error={errors.newPasswordConfirmation?.message}
          label={t(
            'pages.settings.accountOptions.password.newPasswordConfirmationPlaceholder'
          )}
          name="newPasswordConfirmation"
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
      <Grid item xs={12} px={{ xs: 0, sm: 18, lg: 28, xl: 44 }}>
        <Button
          disabled={isLoading}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {isLoading ? (
            <CircularProgress color="secondary" size={24} />
          ) : (
            <Typography fontWeight={700} textTransform="uppercase">
              {t('pages.settings.accountOptions.others.buttonUpdate')}
            </Typography>
          )}
        </Button>
      </Grid>
    </Grid>
  )
}

export { PasswordUpdate }
