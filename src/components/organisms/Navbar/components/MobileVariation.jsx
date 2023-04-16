import { useMemo, useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import SearchIcon from '@mui/icons-material/Search'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import {
  Button,
  Dialog,
  DialogTitle,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { Avatar } from '@atoms/Avatar'
import { Divider } from '@atoms/Divider'

import { useChat } from '@contexts'

import { CardProfile } from '@molecules/CardProfile'
import { useStyles } from './MobileVariation.styles'

const MobileVariation = ({ openConfirmationModal }) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { userData } = useChat()
  const lessThanSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isCardProfileOpen, setIsCardProfileOpen] = useState(false)

  const { classes } = useStyles()

  const handleCloseDrawer = () => setIsDrawerOpen(false)
  const handleOpenDrawer = () => setIsDrawerOpen(true)

  const handleCloseCardProfile = () => setIsCardProfileOpen(false)
  const handleOpenCardProfile = () => setIsCardProfileOpen(true)

  const handleNavigate = page => {
    navigate(page)
    handleCloseDrawer()
  }

  const drawerOptions = useMemo(() => [
    {
      icon: () => <HomeRoundedIcon />,
      page: 'feed',
    },
    {
      icon: () => <SearchIcon />,
      page: 'search',
    },
    {
      icon: () => <FitnessCenterRoundedIcon />,
      page: 'quests',
    },
    {
      icon: () => <MessageRoundedIcon />,
      page: 'chats',
    },
    {
      icon: () => <SettingsRoundedIcon />,
      page: 'settings',
    },
  ])

  return (
    <>
      <Grid item xs={4} display="flex" gap={2} justifyContent="center">
        <Tooltip title={t('pages.feed.tooltip.feed')}>
          <IconButton onClick={handleOpenCardProfile} size="small">
            <AccountBoxRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('pages.feed.tooltip.quests')}>
          <IconButton onClick={() => {}} size="small">
            <MilitaryTechRoundedIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="flex-end">
        <Tooltip title={t('pages.feed.tooltip.menu')}>
          <IconButton onClick={handleOpenDrawer} size="small">
            <MenuRoundedIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Drawer
        anchor="right"
        classes={{ paper: classes.drawerPaper }}
        onClose={handleCloseDrawer}
        open={isDrawerOpen}
      >
        <DialogTitle display="flex" justifyContent="flex-end">
          <IconButton onClick={handleCloseDrawer}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <Grid container justifyContent="center" height="100%">
          <Grid
            container
            item
            direction="column"
            display="flex"
            justifyContent="space-between"
            xs={10}
          >
            <Stack direction="column" gap={2}>
              <Grid container justifyContent="center">
                <Grid container item xs={7} rowGap={1}>
                  <Button
                    fullWidth
                    onClick={() => handleNavigate('profile')}
                    startIcon={<PersonRoundedIcon />}
                    variant="contained"
                  >
                    <Typography fontWeight={600} variant="body2">
                      {t(`pages.feed.menu.profile`)}
                    </Typography>
                  </Button>
                  <Button
                    color="error"
                    fullWidth
                    onClick={openConfirmationModal}
                    startIcon={<ExitToAppRoundedIcon />}
                    variant="contained"
                  >
                    <Typography fontWeight={600} variant="body2">
                      {t(`pages.feed.menu.exit`)}
                    </Typography>
                  </Button>
                </Grid>
                <Grid container item xs={5} justifyContent="center">
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    width="96%"
                  >
                    <Avatar currentUser />
                    <Typography
                      fontWeight={600}
                      textAlign="center"
                      variant="body2"
                    >
                      {userData.firstName}
                    </Typography>
                    <Typography
                      color="primary"
                      fontWeight={600}
                      textAlign="center"
                      variant="body2"
                    >
                      {`@${userData.username}`}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Divider />
              {drawerOptions.map(({ icon, page }) => (
                <Button
                  fullWidth
                  key={page}
                  onClick={() => handleNavigate(page)}
                  startIcon={icon()}
                  variant={pathname === `/${page}` ? 'contained' : 'outlined'}
                >
                  <Typography fontWeight={600} variant="body2">
                    {t(`pages.feed.tooltip.${page}`)}
                  </Typography>
                </Button>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Drawer>
      <Dialog
        fullScreen={lessThanSmall}
        onClose={handleCloseCardProfile}
        open={isCardProfileOpen}
        sx={{
          height: theme => `calc(100vh - ${theme.spacing(11)})`,
          top: theme => theme.spacing(11),
        }}
      >
        <CardProfile handleCloseCardProfile={handleCloseCardProfile} />
      </Dialog>
    </>
  )
}

MobileVariation.propTypes = {
  openConfirmationModal: P.func.isRequired,
}

export { MobileVariation }
