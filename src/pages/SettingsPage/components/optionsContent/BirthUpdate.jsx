import { useState } from 'react'

import i18n from '@app/i18n'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parseISO } from 'date-fns'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { Button, CircularProgress, Grid, Typography } from '@mui/material'

import { DatePicker } from '@atoms/DatePicker'

import apiProfile from '@api/services/profile'

const schema = z.object({
  birth: z
    .date({
      required_error: i18n.t('pages.landing.signup.schema.requiredField'),
      invalid_type_error: i18n.t('pages.landing.signup.schema.invalidDate'),
    })
    .refine(
      value =>
        value <=
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
      {
        message: i18n.t('pages.landing.signup.schema.olderThan18'),
        path: ['birth'],
      }
    )
    .refine(
      value =>
        value >=
        new Date(new Date().setFullYear(new Date().getFullYear() - 120)),
      {
        message: i18n.t('pages.landing.signup.schema.invalidDate'),
        path: ['birth'],
      }
    )
    .transform(value => format(parseISO(value.toISOString()), 'dd/MM/yyyy')),
})

const BirthUpdate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: zodResolver(schema) })
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateBirth = async values => {
    setIsLoading(true)

    const payload = {
      birth: values.birth,
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

    enqueueSnackbar(t('pages.settings.accountOptions.snackbar.successBirth'), {
      variant: 'success',
    })
  }

  return (
    <Grid
      container
      component="form"
      justifyContent="center"
      noValidate
      onSubmit={handleSubmit(handleUpdateBirth)}
      rowGap={{ xs: 3, md: 6 }}
    >
      <Grid item xs={12} px={{ xs: 0, lg: 16, xl: 24 }}>
        <DatePicker
          autoFocus
          control={control}
          errors={errors}
          label={t('pages.settings.accountOptions.birth.newBirthPlaceholder')}
          name="birth"
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

export { BirthUpdate }
