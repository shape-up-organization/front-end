import P from 'prop-types'

import { Divider } from '@components/Divider'
import Close from '@mui/icons-material/Close'
import {
  Box,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'
import { ExternalButtons } from './components/ExternalButtons'

const sizes = {
  small: 'xs',
  medium: 'md',
  large: 'lg',
}

const titleAlignments = {
  center: '0%',
  left: '-40%',
  right: '40%',
}

const Modal = ({
  content,
  direction,
  handleClose,
  open,
  size,
  title,
  titleAlignment,
}) => {
  const contentDirection = direction === 'horizontal' ? 'row' : 'column'
  const dividerDirection =
    contentDirection === 'row' ? 'vertical' : 'horizontal'

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      maxWidth={sizes[size]}
      PaperProps={{
        sx: { padding: theme => theme.spacing(2, 0, 3) },
      }}
    >
      <DialogTitle align="center" justifyContent="center">
        <Typography
          color="primary"
          component="p"
          fontWeight="bold"
          marginLeft={titleAlignments[titleAlignment]}
          variant="h4"
        >
          {title}
        </Typography>
        <IconButton
          aria-label="Close login modal"
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
        <Container
          maxWidth="xl"
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: contentDirection,
            gap: theme => theme.spacing(4),
          }}
        >
          {content}
          <Divider direction={dividerDirection} text="OU" />
          <Box alignItems="center" display="flex" flexDirection="column">
            <ExternalButtons />
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  )
}

Modal.propTypes = {
  content: P.element.isRequired,
  direction: P.oneOf(['horizontal', 'vertical']),
  handleClose: P.func.isRequired,
  open: P.bool.isRequired,
  size: P.oneOf(['small', 'medium', 'large']),
  title: P.string,
  titleAlignment: P.oneOf(['left', 'center', 'right']),
}

Modal.defaultProps = {
  direction: 'vertical',
  size: 'medium',
  title: '',
  titleAlignment: 'center',
}

export { Modal }
