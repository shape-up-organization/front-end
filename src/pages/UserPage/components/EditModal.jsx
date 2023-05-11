import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSnackbar } from 'notistack'
import P from 'prop-types'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Box, Button, Dialog, Grid, useMediaQuery } from '@mui/material'

import { Avatar } from '@atoms/Avatar'
import { Divider } from '@atoms/Divider'
import { TextField } from '@atoms/TextField'
import { ImageHandler } from '@molecules/ImageHandler'
import { TextArea } from '@molecules/TextArea'
import { SimpleModal } from '@templates/Modal'

import apiAuth from '@api/services/auth'
import apiProfile from '@api/services/profile'
import { useAuth, useChat } from '@contexts'
import { imageUrlToFileBlob } from '@utils/helpers/server'

import { schema } from './schema'

const Content = ({ handleClose, handleReload }) => {
  const { userData, updateUserData } = useChat()
  const { getUserData, updateJwtToken } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm({ resolver: zodResolver(schema), defaultValues: userData })
  const { t } = useTranslation()
  const isLessThanSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const [biography, setBiography] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [openImageModal, setOpenImageModal] = useState(false)
  const [startupPicture, setStartupPicture] = useState(null)

  const handleOnChangeUsername = async event => {
    const { value } = event.target
    if (value === userData.username) return
    if (value === '') {
      setError('username', {
        type: 'onChange',
        message: t('pages.landing.signup.schema.requiredField'),
      })
      return
    }
    if (value.length < 2) {
      setError('username', {
        type: 'onChange',
        message: t('pages.landing.signup.schema.moreThan1Letter'),
      })
      return
    }
    if (!/^[^@\s]+$/.test(value)) {
      setError('username', {
        type: 'onChange',
        message: t('pages.landing.signup.schema.noAtSignOrWhiteSpace'),
      })
      return
    }

    const response = await apiAuth.validateUsername(value)
    if (response.status === 409) {
      setError('username', {
        type: 'onChange',
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

  const handleUpdateData = async values => {
    setIsLoading(true)

    const payload = {
      biography: biography || userData.biography,
      last_name: values.lastName || userData.lastName,
      name: values.name || userData.name,
      username: values.username || userData.username,
    }

    const response = await apiProfile.updateUserData(payload)
    setIsLoading(false)

    if (response.status !== 200) {
      enqueueSnackbar(t('pages.profile.snackbar.genericError'), {
        variant: 'error',
      })
      return
    }

    enqueueSnackbar(t('pages.profile.snackbar.editSuccessfully'), {
      variant: 'success',
    })

    updateUserData({
      biography: biography || userData.biography,
      lastName: values.lastName || userData.lastName,
      name: values.name || userData.name,
      username: values.username || userData.username,
    })
    handleClose()
    handleReload()
  }

  const handleOpenImageHandler = () => setOpenImageModal(true)
  const handleCloseImageHandler = () => setOpenImageModal(false)

  const removeProfilePicture = async () => {
    const response = await apiProfile.removeProfilePicture()

    if (response.status !== 200) return

    updateUserData({ profilePicture: null })
  }

  const updateFilesArray = async files => {
    if (!files) return

    const payload = new FormData()
    payload.append('file', files[0]?.data)
    const {
      data: { jwt },
    } = await apiProfile.uploadProfilePicture(payload)

    if (jwt) {
      updateJwtToken(jwt)
      updateUserData(getUserData())
    }

    handleCloseImageHandler()
  }

  const loadStartupImage = async () => {
    if (!userData.profilePicture) return
    const currentImage = await imageUrlToFileBlob(userData.profilePicture)
    setStartupPicture(currentImage)
  }

  useEffect(() => {
    loadStartupImage()
  }, [])

  return (
    <Grid container p={4} spacing={4} justifyContent="center">
      <Grid container item xs={12} sm={9} spacing={2}>
        <Grid
          item
          xs={12}
          sm={3}
          alignItems="center"
          display="flex"
          justifyContent="center"
        >
          <Avatar avatarSize="large" currentUser />
        </Grid>
        <Grid container item xs={12} sm={9} spacing={2}>
          <Grid item xs={12}>
            <Button
              color="primary"
              fullWidth
              onClick={handleOpenImageHandler}
              variant="contained"
            >
              {t('pages.profile.buttons.editPicture')}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="error"
              fullWidth
              onClick={removeProfilePicture}
              variant="contained"
            >
              {t('pages.profile.buttons.removePicture')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid
        container
        item
        component="form"
        noValidate
        justifyContent="center"
        onSubmit={handleSubmit(handleUpdateData)}
        spacing={2}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            error={errors.name?.message}
            label={t('pages.profile.placeholders.firstName')}
            name="name"
            type="text"
            register={register}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={errors.lastName?.message}
            label={t('pages.profile.placeholders.lastName')}
            name="lastName"
            type="text"
            register={register}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errors.username?.message}
            label={t('pages.profile.placeholders.username')}
            name="username"
            type="text"
            register={() =>
              register('username', {
                onChange: handleOnChangeUsername,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextArea
            interfaceOptions={{
              alwaysShowBottom: true,
              isLoading,
              textAreaProps: {
                maxRows: 7,
                inputProps: {
                  maxLength: 252,
                  spellCheck: 'false',
                },
              },
            }}
            messageState={[biography, setBiography]}
            texts={{
              inputPlaceholder: t('pages.profile.placeholders.biography'),
            }}
          />
        </Grid>
        <Grid item xs={10} sm={6}>
          <Button
            disabled={isLoading || Object.keys(errors).length > 0}
            fullWidth
            type="submit"
            variant="contained"
          >
            {t('pages.profile.buttons.save')}
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={openImageModal}
        onClose={handleCloseImageHandler}
        fullScreen={isLessThanSm}
      >
        <Box
          height="100vh"
          maxHeight={isLessThanSm ? '100vh' : 300}
          width={isLessThanSm ? '100vw' : 512}
        >
          <ImageHandler
            startupImages={startupPicture ? [startupPicture] : []}
            updateFilesArray={updateFilesArray}
          />
        </Box>
      </Dialog>
    </Grid>
  )
}

Content.propTypes = {
  handleClose: P.func.isRequired,
  handleReload: P.func.isRequired,
}

const EditModal = ({ handleClose, handleReload, open }) => (
  <SimpleModal
    Component={Content}
    componentArgs={{ handleClose, handleReload }}
    open={open}
    handleClose={handleClose}
  />
)

EditModal.propTypes = {
  handleClose: P.func.isRequired,
  handleReload: P.func.isRequired,
  open: P.bool,
}

EditModal.defaultProps = {
  open: false,
}

export { EditModal }
