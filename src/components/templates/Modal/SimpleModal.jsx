import P from 'prop-types'

import { Dialog, Fade, Stack, useMediaQuery } from '@mui/material'

const SimpleModal = ({ Component, componentArgs, handleClose, open }) => {
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
          <Component {...componentArgs} />
        </Stack>
      </Fade>
    </Dialog>
  )
}

SimpleModal.propTypes = {
  Component: P.elementType.isRequired,
  componentArgs: P.object,
  handleClose: P.func.isRequired,
  open: P.bool,
}

SimpleModal.defaultProps = {
  componentArgs: {},
  open: false,
}

export { SimpleModal }
