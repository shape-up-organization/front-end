import P from 'prop-types'
import { useState } from 'react'

import { LinkButton } from '@components/LinkButton'
import { TextButton } from '@components/TextButton'
import { TextField } from '@components/TextField'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material'
import { Modal } from '../../Modal'

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

  return (
    <Grid container justifyContent="center" rowSpacing={2} paddingTop={1}>
      <Grid item xs={12}>
        <TextField label="E-mail" name="email" type="email" />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Senha"
          name="password"
          type={isShowingPassword ? 'text' : 'password'}
          endAdornment={
            <PasswordEndAdornment
              isShowingPasswordStates={{
                isShowingPassword,
                setIsShowingPassword,
              }}
            />
          }
        />
      </Grid>
      <Grid item textAlign="center" xs={12}>
        <LinkButton href="/">
          <Typography fontWeight="bold" variant="caption">
            Esqueceu sua senha?
          </Typography>
        </LinkButton>
      </Grid>
      <Grid item xs={5}>
        <Button fullWidth size="large" variant="contained">
          <Typography fontWeight="bold" textTransform="none">
            ENTRAR
          </Typography>
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
