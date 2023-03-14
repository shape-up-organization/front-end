import { useState } from 'react'

import { useSnackbar } from 'notistack'
import P from 'prop-types'
import { useForm } from 'react-hook-form'

import { LinkButton } from '@components/LinkButton'
import { TextButton } from '@components/TextButton'
import { TextField } from '@components/TextField'

import { zodResolver } from '@hookform/resolvers/zod'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material'

import { users } from '@api/users'
import { useAuth } from '@contexts'

import { Modal } from '../../Modal'
import { schema } from './schema'

const size = 'small'
const title = 'Faça login'

const PasswordEndAdornment = ({
  isShowingPasswordStates: { isShowingPassword, setIsShowingPassword },
}) => (
  <InputAdornment position="end">
    <IconButton
      aria-label={`Trocar visibilidade da senha para ser ${
        isShowingPassword ? 'escondida' : 'visível'
      }`}
      onClick={() =>
        setIsShowingPassword(prevIsShowingPassword => !prevIsShowingPassword)
      }
      onMouseDown={event => event.preventDefault()}
    >
      {isShowingPassword ? (
        <VisibilityOff fontSize="small" />
      ) : (
        <Visibility fontSize="small" />
      )}
    </IconButton>
  </InputAdornment>
)

PasswordEndAdornment.propTypes = {
  isShowingPasswordStates: P.shape([P.bool, P.func]).isRequired,
}

const Content = ({ switchModal }) => {
  const [isShowingPassword, setIsShowingPassword] = useState(false)
  const [isButtonLoading, setIsButtonLoading] = useState(false)

  const { signIn } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const handleLogin = async values => {
    setIsButtonLoading(true)
    const payload = values

    try {
      const response = await users.authenticate(payload)

      if (response.status === 200) {
        signIn(response.data['jwt-token'])
      }
    } catch (error) {
      console.log(error)
      enqueueSnackbar('E-mail e ou senha incorretos!', {
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
      onSubmit={handleSubmit(handleLogin)}
      rowSpacing={2}
      paddingTop={1}
    >
      <Grid item xs={12}>
        <TextField
          error={errors.email?.message}
          label="E-mail"
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
          label="Senha"
          name="password"
          type={isShowingPassword ? 'text' : 'password'}
          register={register}
        />
      </Grid>
      <Grid item textAlign="center" xs={12}>
        <LinkButton internal="password-recovery">
          <Typography fontWeight="bold" variant="caption">
            Esqueceu sua senha?
          </Typography>
        </LinkButton>
      </Grid>
      <Grid item xs={5}>
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
            <Typography fontWeight="bold" textTransform="none">
              ENTRAR
            </Typography>
          )}
        </Button>
      </Grid>
      <Grid item textAlign="center" xs={12} sm={12}>
        <Typography fontWeight="500" variant="caption">
          Primeira vez por aqui?
          <TextButton handleClick={switchModal} text="Crie sua conta" />
          agora mesmo!
        </Typography>
      </Grid>
    </Grid>
  )
}

Content.propTypes = {
  switchModal: P.func.isRequired,
}

const LoginModal = ({ handleClose, isOpen, switchModal }) => (
  <Modal
    content={<Content switchModal={switchModal} />}
    handleClose={handleClose}
    isOpen={isOpen}
    size={size}
    title={title}
  />
)

LoginModal.propTypes = {
  isOpen: P.bool.isRequired,
  handleClose: P.func.isRequired,
  switchModal: P.func.isRequired,
}

export { LoginModal }
