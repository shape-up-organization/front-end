import { zodResolver } from '@hookform/resolvers/zod'
import { useSnackbar } from 'notistack'
import P from 'prop-types'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button, Grid } from '@mui/material'

import { Avatar } from '@atoms/Avatar'
import { TextField } from '@atoms/TextField'
import { SimpleModal } from '@templates/Modal'

import apiProfile from '@api/services/profile'
import { useState } from 'react'

const Content = () => {
  const { enqueueSnackbar } = useSnackbar()
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm({ resolver: zodResolver({}) })
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateData = async values => {
    setIsLoading(true)

    console.log(isLoading)
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
    <Grid container p={4}>
      <Grid container item>
        <Grid item xs={12} md={3} alignItems="center" display="flex">
          <Avatar avatarSize="large" isCurrentUser />
        </Grid>
        <Grid container item xs={12} md={9}>
          <Grid item xs={12}>
            <Button color="primary" fullWidth variant="contained">
              Editar foto
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button color="error" fullWidth variant="contained">
              Remover foto
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        item
        component="form"
        onSubmit={handleSubmit(handleUpdateData)}
      >
        <Grid item xs={12}>
          <TextField
            error={errors.name?.message}
            label={t('pages.settings.accountOptions.email.newEmailPlaceholder')}
            name="name"
            type="text"
            register={register}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errors.lastName?.message}
            label={t('pages.settings.accountOptions.email.newEmailPlaceholder')}
            name="lastName"
            type="text"
            register={register}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errors.userName?.message}
            label={t('pages.settings.accountOptions.email.newEmailPlaceholder')}
            name="userName"
            type="text"
            register={register}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errors.bio?.message}
            label={t('pages.settings.accountOptions.email.newEmailPlaceholder')}
            name="bio"
            type="text"
            register={register}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

const EditModal = ({ handleClose, open }) => (
  <SimpleModal Component={Content} open={open} handleClose={handleClose} />
)

EditModal.propTypes = {
  handleClose: P.func.isRequired,
  open: P.bool,
}

EditModal.defaultProps = {
  open: false,
}

export { EditModal }
