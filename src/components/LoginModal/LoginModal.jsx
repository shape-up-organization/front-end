import P from 'prop-types'
import { useState } from 'react'

import { Divider } from '@components/Divider'
import { ExternalButton } from '@components/ExternalButton'
import { Link } from '@components/Link'
import Close from '@mui/icons-material/Close'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'

const LoginModal = ({ open, handleClose }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      PaperProps={{
        sx: { padding: theme => theme.spacing(2, 0, 3) },
      }}
    >
      <DialogTitle
        align="center"
        color="primary"
        fontWeight="bold"
        justifyContent="center"
        variant="h4"
      >
        Faça Login
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: theme => theme.spacing(2),
            top: theme => theme.spacing(2),
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Container maxWidth="xs">
          <Grid container justifyContent="center" rowSpacing={2} paddingTop={1}>
            <Grid item xs={12}>
              <TextField fullWidth label="E-mail" name="email" type="email" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Senha"
                name="password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                onMouseEnter={event => event.preventDefault()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={() => setShowPassword(prevShowPassword => !prevShowPassword)}
                        onMouseDown={event => event.preventDefault()}
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={5}>
              <Button fullWidth size="large" variant="contained">
                <Typography fontWeight="bold" textTransform="none">
                  ENTRAR
                </Typography>
              </Button>
            </Grid>
            <Grid item textAlign="center" xs={12}>
              <Link>
                <Typography fontWeight="bold" variant="caption">
                  Esqueceu sua senha?
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Divider text="OU" />
          <Box alignItems="center" display="flex" flexDirection="column">
            <Grid container justifyContent="center" gap={2}>
              {['google', 'facebook', 'twitter'].map((site, index) => (
                <Grid item key={index} xs={12}>
                  <ExternalButton type={site} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  )
}

LoginModal.propTypes = {
  open: P.bool.isRequired,
  handleClose: P.func.isRequired,
}

export { LoginModal }
