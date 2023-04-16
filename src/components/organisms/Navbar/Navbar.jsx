import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  AppBar,
  Grid,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { ConfirmationModal } from '@molecules/ConfirmationModal'

import { useAuth } from '@contexts'

import { useState } from 'react'
import { DesktopVariation } from './components/DesktopVariation'
import { MobileVariation } from './components/MobileVariation'

const Navbar = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { signOut } = useAuth()

  const lessThanLarge = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const handleCancelConfirmationModal = () => setConfirmModalOpen(false)

  const handleOpenConfirmationModal = () => setConfirmModalOpen(true)

  const handleNavigateToFeed = () => pathname !== 'feed' && navigate('/feed')

  return (
    <>
      <AppBar
        component={Paper}
        position="sticky"
        sx={{ bgcolor: theme => theme.palette.background.paper }}
      >
        <Toolbar>
          <Grid container justifyContent="center">
            <Grid
              container
              item
              xs={12}
              sm={10}
              display="flex"
              justifyContent="space-between"
              py={2}
            >
              <Grid container item xs={4} lg={4}>
                <Stack
                  alignItems="center"
                  flexDirection="row"
                  gap={2}
                  width="100%"
                >
                  <Tooltip title={t('pages.feed.tooltip.feed')}>
                    <Typography
                      color="primary"
                      fontWeight="bold"
                      onClick={() => handleNavigateToFeed()}
                      sx={{ cursor: 'pointer' }}
                      textTransform="none"
                      variant={lessThanLarge ? 'subtitle2' : 'h5'}
                    >
                      ShapeUp
                    </Typography>
                  </Tooltip>
                </Stack>
              </Grid>
              {lessThanLarge ? (
                <MobileVariation
                  openConfirmationModal={handleOpenConfirmationModal}
                />
              ) : (
                <DesktopVariation
                  openConfirmationModal={handleOpenConfirmationModal}
                />
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <ConfirmationModal
        handleConfirm={signOut}
        handleCancel={handleCancelConfirmationModal}
        message={t('pages.feed.others.confirmationModalMessage')}
        open={confirmModalOpen}
        title={t('pages.feed.others.confirmationModalTitle')}
      />
    </>
  )
}
export { Navbar }
