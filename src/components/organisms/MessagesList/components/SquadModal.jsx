import P from 'prop-types'

import { Dialog } from '@mui/material'

const SquadModal = ({ handleClose, open }) => (
  <Dialog onClose={handleClose} open={open}>
    Squad Modal
  </Dialog>
)

SquadModal.propTypes = {
  handleClose: P.func.isRequired,
  open: P.bool,
}

SquadModal.defaultProps = {
  open: false,
}

export { SquadModal }
