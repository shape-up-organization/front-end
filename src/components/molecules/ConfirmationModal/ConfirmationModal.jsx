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
  isCritical,
  handleConfirm,
  handleCancel,
  message,
  open,
  title,
}) => {
  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle component="span">
        <Typography variant="h6">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText component="span">
          <Typography variant="body1">{message}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button
          autoFocus
          color={isCritical ? 'primary' : 'error'}
          fullWidth
          onClick={handleCancel}
          variant="contained"
        >
          <Typography fontWeight={700} variant="body2">
            {t('components.molecules.confirmationModal.cancel')}
          </Typography>
        </Button>
        <Button
          color={isCritical ? 'error' : 'primary'}
          fullWidth
          onClick={handleConfirm}
          variant="contained"
        >
          <Typography fontWeight={700} variant="body2">
            {t('components.molecules.confirmationModal.confirm')}
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmationModal.propTypes = {
  isCritical: P.bool,
  handleConfirm: P.func.isRequired,
  handleCancel: P.func.isRequired,
  message: P.string.isRequired,
  open: P.bool.isRequired,
  title: P.string.isRequired,
}

ConfirmationModal.defaultProps = {
  isCritical: false,
}

export { ConfirmationModal }
