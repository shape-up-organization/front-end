import { useState } from 'react'

import i18n from '@app/i18n'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded'
import { Button, CircularProgress, Grid, Typography } from '@mui/material'

import { TextField } from '@atoms/TextField'

import apiProfile from '@api/services/profile'
import { masks } from '@utils/constants/masks'

const schema = z.object({
  cellPhone: z
    .string()
    .nonempty(i18n.t('pages.landing.login.schema.requiredField'))
    .transform(value => value.replace(/[\D][^_]/g, ''))
    .refine(value => !/\D/.test(value), {
      message: i18n.t('pages.landing.signup.schema.invalidNumber'),
    }),
})

const CellPhoneUpdate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm({ resolver: zodResolver(schema) })
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateCellPhone = async values => {
    setIsLoading(true)

    const payload = {
      cell_phone: values.cellPhone,
    }

    const response = await apiProfile.updateUserData(payload)
    setIsLoading(false)

    if (response.status === 409) {
      setError('cellPhone', {
        type: 'onBlur',
        message: t('pages.landing.signup.schema.cellPhoneAlreadyExists'),
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

    enqueueSnackbar(
      t('pages.settings.accountOptions.snackbar.successCellPhone'),
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
      onSubmit={handleSubmit(handleUpdateCellPhone)}
      rowGap={{ xs: 3, md: 6 }}
    >
      <Grid item xs={12} px={{ xs: 0, lg: 16, xl: 24 }}>
        <TextField
          autoFocus
          endAdornment={<LocalPhoneRoundedIcon color="primary" />}
          error={errors.cellPhone?.message}
          label={t(
            'pages.settings.accountOptions.cellPhone.newCellPhonePlaceholder'
          )}
          mask={masks.PHONES[i18n.resolvedLanguage]}
          name="cellPhone"
          type="tel"
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

export { CellPhoneUpdate }
