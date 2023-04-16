import P from 'prop-types'

import {
  closeSnackbar,
  MaterialDesignContent,
  SnackbarProvider as SnackbarProviderNOTISTACK,
} from 'notistack'

import Close from '@mui/icons-material/Close'
import { IconButton, styled } from '@mui/material'

import { getDesignTokens } from '@styles/theme'

const StyledNotistack = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: getDesignTokens('light').palette.success.main,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: getDesignTokens('light').palette.error.main,
  },
}))

const CloseSnackbar = ({ snackbarId }) => (
  <IconButton onClick={() => closeSnackbar(Number(snackbarId))}>
    <Close fontSize="small" />
  </IconButton>
)

CloseSnackbar.propTypes = { snackbarId: P.string.isRequired }

const HIDE_DURATION = 5000

const SnackbarProvider = ({ children }) => (
  <SnackbarProviderNOTISTACK
    autoHideDuration={HIDE_DURATION}
    action={snackbarId => <CloseSnackbar snackbarId={String(snackbarId)} />}
    Components={{
      success: StyledNotistack,
      error: StyledNotistack,
    }}
  >
    {children}
  </SnackbarProviderNOTISTACK>
)

SnackbarProvider.propTypes = { children: P.node.isRequired }

export { SnackbarProvider }
