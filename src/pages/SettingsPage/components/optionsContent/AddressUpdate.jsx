import { useEffect, useState } from 'react'

import i18n from '@app/i18n'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { Button, CircularProgress, Grid, Typography } from '@mui/material'

import { TextField } from '@atoms/TextField'

import apiAddress from '@api/services/address'
import addressGetMock from '@mocks/address/get'
import { masks } from '@utils/constants/masks'

const schema = z.object({
  city: z
    .string()
    .nonempty(i18n.t('pages.landing.signup.schema.requiredField')),
  complement: z.string(),
  district: z
    .string()
    .nonempty(i18n.t('pages.landing.signup.schema.requiredField')),
  number: z.coerce.number(),
  state: z
    .string()
    .nonempty(i18n.t('pages.landing.signup.schema.requiredField')),
  street: z
    .string()
    .nonempty(i18n.t('pages.landing.signup.schema.requiredField')),
  zipCode: z
    .string()
    .nonempty(i18n.t('pages.landing.signup.schema.requiredField'))
    .transform(value => value.replace(/\D/g, '')),
})

const AddressUpdate = () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    formState: { errors },
    handleSubmit,
    register,
    setFocus,
    setValue,
  } = useForm({ resolver: zodResolver(schema) })
  const { t } = useTranslation()

  const [addressByZipCode, setAddressByZipCode] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const getInitialAddress = async () => {
    setIsLoading(true)

    const response = addressGetMock
    setIsLoading(false)

    if (response.status !== 200) {
      enqueueSnackbar(
        t('pages.settings.accountOptions.snackbar.genericError'),
        {
          variant: 'error',
        }
      )
      return
    }

    setAddressByZipCode(response.data)
  }

  const checkZipCode = async event => {
    const zipCode = event.target.value.replace(/\D/g, '')

    if (zipCode.length !== 8) return

    setIsLoading(true)
    const response = await apiAddress.getAddressByZipCode(zipCode)
    setIsLoading(false)

    if (response.data.erro) {
      enqueueSnackbar(
        t('pages.settings.accountOptions.snackbar.zipCodeNotFound'),
        {
          variant: 'error',
        }
      )
      return
    }

    if (response.status !== 200) {
      enqueueSnackbar(
        t('pages.settings.accountOptions.snackbar.genericError'),
        {
          variant: 'error',
        }
      )
      return
    }

    const data = {
      city: response.data.localidade,
      district: response.data.bairro,
      state: response.data.uf,
      street: response.data.logradouro,
      zipCode: response.data.cep,
    }
    setAddressByZipCode(data)
  }

  const handleUpdateAddress = async values => {
    setIsLoading(true)

    const payload = {
      ...values,
    }

    const response = await apiAddress.updateAddress(payload)
    setIsLoading(false)

    if (response.status === 400) {
      enqueueSnackbar(
        t('pages.settings.accountOptions.snackbar.invalidAddress'),
        {
          variant: 'error',
        }
      )
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
      t('pages.settings.accountOptions.snackbar.addressUpdated'),
      {
        variant: 'success',
      }
    )
  }

  const populateFields = () => {
    Object.keys(addressByZipCode).forEach(key => {
      setValue(key, addressByZipCode[key])
    })
    if (!addressByZipCode.number) setFocus('number')
  }

  useEffect(() => {
    getInitialAddress()
  }, [])

  useEffect(() => {
    populateFields()
  }, [addressByZipCode])

  return (
    <Grid
      container
      component="form"
      justifyContent="center"
      noValidate
      onSubmit={handleSubmit(handleUpdateAddress)}
      spacing={{ xs: 1, sm: 2, lg: 3 }}
    >
      <Grid item xs={12} sm={4}>
        <TextField
          autoFocus
          disabled={isLoading}
          error={errors.zipCode?.message}
          forceShrink={!!addressByZipCode.zipCode}
          label={t('pages.settings.accountOptions.address.zipCodePlaceholder')}
          mask={masks.ZIP_CODES.pt}
          name="zipCode"
          type="text"
          register={() =>
            register('zipCode', {
              onChange: checkZipCode,
            })
          }
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
          disabled={isLoading}
          error={errors.city?.message}
          forceShrink={!!addressByZipCode.city}
          label={t('pages.settings.accountOptions.address.cityPlaceholder')}
          name="city"
          type="text"
          register={register}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled={isLoading}
          error={errors.district?.message}
          forceShrink={!!addressByZipCode.district}
          label={t('pages.settings.accountOptions.address.districtPlaceholder')}
          name="district"
          type="text"
          register={register}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          disabled={isLoading}
          error={errors.state?.message}
          forceShrink={!!addressByZipCode.state}
          label={t('pages.settings.accountOptions.address.statePlaceholder')}
          name="state"
          type="text"
          register={register}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          disabled={isLoading}
          error={errors.street?.message}
          forceShrink={!!addressByZipCode.street}
          label={t('pages.settings.accountOptions.address.streetPlaceholder')}
          name="street"
          type="text"
          register={register}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          disabled={isLoading}
          error={errors.number?.message}
          forceShrink={!!addressByZipCode.number}
          label={t('pages.settings.accountOptions.address.numberPlaceholder')}
          name="number"
          type="text"
          register={register}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
          disabled={isLoading}
          error={errors.complement?.message}
          forceShrink={!!addressByZipCode.complement}
          label={t(
            'pages.settings.accountOptions.address.complementPlaceholder'
          )}
          name="complement"
          type="text"
          register={register}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={5}
        md={6}
        xl={4}
        alignItems="center"
        display="flex"
        justifyContent="center"
        my={3}
      >
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

export { AddressUpdate }
