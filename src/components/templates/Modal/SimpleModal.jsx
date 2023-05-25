import P from 'prop-types'

import Close from '@mui/icons-material/Close'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { useStyles } from './Modal.styles'

const SimpleModal = ({
  Component,
  componentArgs,
  dialogProps,
  handleClose,
  open,
  title,
}) => {
  const lessThanSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const { classes } = useStyles()

  return (
    <Dialog
      fullScreen={lessThanSmall}
      fullWidth
      sx={{
        minHeight: '100vh',
      }}
      onClose={handleClose}
      open={open}
      {...dialogProps}
    >
      {title && (
        <DialogTitle
          align="center"
          bgcolor="background.default"
          justifyContent="center"
          sx={{ overflow: 'hidden' }}
        >
          <Typography
            color="primary"
            component="p"
            fontWeight="bold"
            variant="h6"
          >
            {title}
          </Typography>
          <IconButton
            className={classes.closeIcon}
            onClick={handleClose}
            sx={{ position: 'absolute' }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
      )}
      <Fade in>
        <DialogContent sx={{ p: 0, width: '100%' }}>
          <Stack width="100%" height="100%">
            <Component {...componentArgs} />
          </Stack>
        </DialogContent>
      </Fade>
    </Dialog>
  )
}

SimpleModal.propTypes = {
  Component: P.elementType.isRequired,
  componentArgs: P.object,
  dialogProps: P.object,
  handleClose: P.func.isRequired,
  open: P.bool,
  title: P.string,
}

SimpleModal.defaultProps = {
  componentArgs: {},
  dialogProps: {},
  open: false,
  title: '',
}

export { SimpleModal }
