import P from 'prop-types'

import Close from '@mui/icons-material/Close'
import {
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { useStyles } from './Modal.styles'

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
  isOpen,
  size,
  title,
  titleAlignment,
}) => {
  const contentDirection = direction === 'horizontal' ? 'row' : 'column'
  const lessThanSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const { classes } = useStyles()

  return (
    <Dialog
      fullScreen={lessThanSmall}
      fullWidth
      open={isOpen}
      onClose={handleClose}
      maxWidth={sizes[size]}
      PaperProps={{
        className: classes.paperProps,
      }}
      sx={{ maxWidth: '100vw' }}
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
          className={classes.closeIcon}
          onClick={handleClose}
          sx={{ position: 'absolute' }}
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
          {/* <Divider
            direction={dividerDirection}
            text={t('pages.landing.others.dividerText')}
          />
          <Box alignItems="center" display="flex" flexDirection="column">
            <ExternalButtons />
          </Box> */}
        </Container>
      </DialogContent>
    </Dialog>
  )
}

Modal.propTypes = {
  content: P.element.isRequired,
  direction: P.oneOf(['horizontal', 'vertical']),
  handleClose: P.func.isRequired,
  isOpen: P.bool.isRequired,
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
