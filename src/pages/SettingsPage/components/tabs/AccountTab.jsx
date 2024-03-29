import { useState } from 'react'

import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { Divider } from '@atoms/Divider'
import { AnimatedWrapper } from '@layouts/AnimatedWrapper'
import { ConfirmationModal } from '@molecules/ConfirmationModal'

import apiProfile from '@api/services/profile'
import { useAuth, useChat } from '@contexts'

import { BirthUpdate } from '../accountOptions/BirthUpdate'
import { CellPhoneUpdate } from '../accountOptions/CellPhoneUpdate'
import { EmailUpdate } from '../accountOptions/EmailUpdate'
import { PasswordUpdate } from '../accountOptions/PasswordUpdate'

const options = {
  // address: { component: () => <AddressUpdate /> },
  email: { component: () => <EmailUpdate /> },
  cellPhone: { component: () => <CellPhoneUpdate /> },
  birth: { component: () => <BirthUpdate /> },
  password: { component: () => <PasswordUpdate /> },
}

const AccountTab = () => {
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))
  const { signOut } = useAuth()
  const { setUserData } = useChat()

  const [subPage, setSubPage] = useState('')
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [isButtonDeleteLoading, setIsButtonDeleteLoading] = useState(false)

  const handleCloseDeleteModal = () => setOpenDeleteModal(false)
  const handleOpenDeleteModal = () => setOpenDeleteModal(true)

  const handleDeleteAccount = async () => {
    setIsButtonDeleteLoading(true)

    const response = await apiProfile.deleteAccount()
    setIsButtonDeleteLoading(false)

    if (response.status !== 204) {
      enqueueSnackbar(
        t('pages.settings.accountOptions.snackbar.genericError'),
        {
          variant: 'error',
        }
      )
      return
    }

    setUserData({ connected: false })
    signOut()
  }

  return (
    <AnimatedWrapper>
      <Stack
        alignItems="center"
        columnGap={1}
        direction="row"
        justifyContent={lessThanMedium ? 'center' : 'flex-start'}
      >
        {subPage && (
          <Box>
            <IconButton onClick={() => setSubPage('')}>
              <ArrowBackIosRoundedIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
        <Typography
          color="primary"
          fontWeight={500}
          textAlign={lessThanMedium ? 'center' : 'left'}
          variant={lessThanMedium ? 'h6' : 'h4'}
        >
          {subPage
            ? t(`pages.settings.accountOptions.options.${subPage}`)
            : t('pages.settings.tabs.account')}
        </Typography>
      </Stack>
      {subPage ? (
        <AnimatedWrapper>{options[subPage].component()}</AnimatedWrapper>
      ) : (
        <Stack>
          {Object.keys(options).map((option, index) => (
            <Stack key={option}>
              <Button
                color="inherit"
                endIcon={<ArrowForwardIosRoundedIcon fontSize="small" />}
                onClick={() => setSubPage(option)}
                sx={{ justifyContent: 'flex-start', py: 4 }}
              >
                <Typography
                  fontWeight={500}
                  pl={2}
                  textAlign="left"
                  textTransform="none"
                  variant={lessThanMedium ? 'subtitle1' : 'h6'}
                >
                  {t(`pages.settings.accountOptions.options.${option}`)}
                </Typography>
              </Button>
              {index !== options.length - 1 && (
                <Divider color="disabled" size="small" />
              )}
            </Stack>
          ))}
          <Stack
            alignItems="center"
            px={{ xs: 0, md: 8, lg: 20, xl: 40 }}
            pb={2}
            pt={{ xs: 4, md: 8 }}
            width="100%"
          >
            {false && (
              <Button
                color="error"
                disabled={isButtonDeleteLoading}
                fullWidth
                onClick={handleOpenDeleteModal}
                size="large"
                variant="contained"
              >
                {isButtonDeleteLoading ? (
                  <CircularProgress color="secondary" size={24} />
                ) : (
                  <Typography fontWeight={900} variant="subtitle2">
                    {t('pages.settings.accountOptions.others.deleteAccount')}
                  </Typography>
                )}
              </Button>
            )}
            <ConfirmationModal
              isCritical
              handleCancel={handleCloseDeleteModal}
              handleConfirm={handleDeleteAccount}
              message={t(
                'pages.settings.accountOptions.confirmationModal.message'
              )}
              open={openDeleteModal}
              title={t('pages.settings.accountOptions.confirmationModal.title')}
            />
          </Stack>
        </Stack>
      )}
    </AnimatedWrapper>
  )
}

export { AccountTab }
