import { useState } from 'react'

import i18n from '@app/i18n'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { TextField } from '@atoms/TextField'

import apiProfile from '@api/services/profile'

const schema = z.object({
  email: z
    .string()
    .nonempty(i18n.t('pages.landing.login.schema.requiredField'))
    .email(i18n.t('pages.landing.login.schema.invalidEmail')),
})

const EmailUpdate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm({ resolver: zodResolver(schema) })
  const { t } = useTranslation()
  const lessThanLarge = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateEmail = async values => {
    setIsLoading(true)

    const payload = {
      email: values.email,
    }

    const response = await apiProfile.updateUserData(payload)
    setIsLoading(false)

    if (response.status === 409) {
      setError('email', {
        type: 'onBlur',
        message: t('pages.landing.signup.schema.emailAlreadyExists'),
      })
      return
    }

    if (response.status !== 204) {
      enqueueSnackbar(
        t('pages.settings.accountOptions.snackbar.genericError'),
        {
          variant: 'error',
        }
      )
      return
    }

    enqueueSnackbar(t('pages.settings.accountOptions.snackbar.successEmail'), {
      variant: 'success',
    })
  }

  return (
    <Grid
      container
      component="form"
      justifyContent="center"
      noValidate
      onSubmit={handleSubmit(handleUpdateEmail)}
      rowGap={{ xs: 3, md: 6 }}
    >
      <Grid
        item
        xs={12}
        lg={8}
        bgcolor="background.default"
        component={Paper}
        p={{ xs: 2, lg: 4 }}
      >
        <Typography variant={lessThanLarge ? 'caption' : 'body1'}>
          {t('pages.settings.accountOptions.email.infoText')}
        </Typography>
      </Grid>
      <Grid item xs={12} px={{ xs: 0, lg: 16, xl: 24 }}>
        <TextField
          autoFocus
          endAdornment={<EmailRoundedIcon color="primary" />}
          error={errors.email?.message}
          label={t('pages.settings.accountOptions.email.newEmailPlaceholder')}
          name="email"
          type="email"
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

export { EmailUpdate }
