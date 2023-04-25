import P from 'prop-types'

import { Dialog, Fade, Stack, useMediaQuery } from '@mui/material'

const SimpleModal = ({ Component, handleClose, open }) => {
  const lessThanSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullScreen={lessThanSmall}
      sx={{
        minHeight: '100vh',
      }}
      onClose={handleClose}
      open={open}
    >
      <Fade in>
        <Stack width="100%" height="100%">
          <Component handleCloseCard={handleClose} />
        </Stack>
      </Fade>
    </Dialog>
  )
}

SimpleModal.propTypes = {
  Component: P.elementType.isRequired,
  handleClose: P.func.isRequired,
  open: P.bool,
}

SimpleModal.defaultProps = {
  open: false,
}

export { SimpleModal }
