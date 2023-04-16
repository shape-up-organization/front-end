import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material'

const ConfirmationModal = ({
  handleConfirm,
  handleCancel,
  message,
  open,
  title,
}) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body1">{message}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 6 }}>
        <Button
          autoFocus
          color="error"
          fullWidth
          onClick={handleCancel}
          variant="contained"
        >
          <Typography variant="body1">
            {t('components.molecules.confirmationModal.cancel')}
          </Typography>
        </Button>
        <Button
          color="primary"
          fullWidth
          onClick={handleConfirm}
          variant="contained"
        >
          <Typography variant="body1">
            {t('components.molecules.confirmationModal.confirm')}
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmationModal.propTypes = {
  handleConfirm: P.func.isRequired,
  handleCancel: P.func.isRequired,
  message: P.string.isRequired,
  open: P.bool.isRequired,
  title: P.string.isRequired,
}

export { ConfirmationModal }
