import { useMemo, useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CrisisAlertRoundedIcon from '@mui/icons-material/CrisisAlertRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import SearchIcon from '@mui/icons-material/Search'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import {
  Button,
  DialogTitle,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

import { Avatar } from '@atoms/Avatar'
import { Divider } from '@atoms/Divider'
import { CardProfile } from '@molecules/CardProfile'
import { CardRank } from '@molecules/CardRank'
import { SimpleModal } from '@templates/Modal'

import { useChat } from '@contexts'
import { useNavigateSearch } from '@hooks'

import { useStyles } from './MobileVariation.styles'

const MobileVariation = ({ openConfirmationModal }) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const navigateSearch = useNavigateSearch()
  const { userData } = useChat()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [openCardProfile, setOpenCardProfile] = useState(false)
  const [openCardRank, setOpenCardRank] = useState(false)

  const { classes } = useStyles()

  const handleCloseDrawer = () => setIsDrawerOpen(false)
  const handleOpenDrawer = () => setIsDrawerOpen(true)

  const toggleCardProfile = () => setOpenCardProfile(current => !current)
  const toggleCardRank = () => setOpenCardRank(current => !current)

  const handleNavigate = page => {
    if (pathname !== page) navigate(page)
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
      icon: () => <CrisisAlertRoundedIcon />,
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
        <Tooltip title={t('pages.feed.tooltip.summary')}>
          <IconButton onClick={toggleCardProfile} size="small">
            <AccountBoxRoundedIcon />
          </IconButton>
        </Tooltip>
        <SimpleModal
          open={openCardProfile}
          Component={CardProfile}
          handleClose={toggleCardProfile}
          title={t('pages.feed.tooltip.summary')}
        />
        <Tooltip title={t('pages.feed.tooltip.rank')}>
          <IconButton onClick={toggleCardRank} size="small">
            <MilitaryTechRoundedIcon />
          </IconButton>
        </Tooltip>
        <SimpleModal
          open={openCardRank}
          Component={CardRank}
          handleClose={toggleCardRank}
          title={t('pages.feed.tooltip.rank')}
        />
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
                    onClick={() => {
                      navigateSearch('/profile', {
                        username: userData.username,
                      })
                      handleCloseDrawer()
                    }}
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
                      {userData.name}
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
    </>
  )
}

MobileVariation.propTypes = {
  openConfirmationModal: P.func.isRequired,
}

export { MobileVariation }
