import { useMemo, useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import CrisisAlertRoundedIcon from '@mui/icons-material/CrisisAlertRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded'
import SearchIcon from '@mui/icons-material/Search'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import {
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

import { useChat } from '@contexts'
import { useNavigateSearch } from '@hooks'
import notificationsMock from '@mocks/notifications/get'

const types = {
  comment: 'Comentário de ',
  like: 'Curtida de ',
  post: 'Postagem de ',
}

const DesktopVariation = ({ openConfirmationModal }) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const navigateSearch = useNavigateSearch()
  const { userData } = useChat()

  const [anchorSettings, setAnchorSettings] = useState(null)
  const [anchorNotifications, setAnchorNotifications] = useState(null)

  const openSettings = Boolean(anchorSettings)
  const openNotifications = Boolean(anchorNotifications)

  const handleCloseNotifications = () => setAnchorNotifications(null)
  const handleOpenNotifications = event =>
    setAnchorNotifications(event.currentTarget)

  const handleCloseSettings = () => setAnchorSettings(null)
  const handleOpenSettings = event => setAnchorSettings(event.currentTarget)

  const navigateToPage = page => pathname !== page && navigate(page)

  const pages = useMemo(() => [
    {
      icon: color => <HomeRoundedIcon fontSize="large" color={color} />,
      page: 'feed',
    },
    {
      icon: color => <SearchIcon fontSize="large" color={color} />,
      page: 'search',
    },
    {
      icon: color => <CrisisAlertRoundedIcon fontSize="large" color={color} />,
      page: 'quests',
    },
    {
      icon: color => <MessageRoundedIcon fontSize="large" color={color} />,
      page: 'chats',
    },
  ])

  const menuItems = useMemo(() => [
    {
      onClick: () => {
        handleCloseSettings()
        navigateSearch('/profile', { username: userData.username })
      },
      text: 'pages.feed.menu.profile',
    },
    {
      onClick: () => {
        handleCloseSettings()
        navigateToPage('/settings')
      },
      text: 'pages.feed.menu.settings',
    },
    {
      onClick: openConfirmationModal,
      text: 'pages.feed.menu.exit',
    },
  ])

  return (
    <>
      <Grid item xs={0} lg={4} display="flex" gap={12} justifyContent="center">
        {pages.map(({ icon, page }) => (
          <Tooltip key={page} title={t(`pages.feed.tooltip.${page}`)}>
            <IconButton onClick={() => navigateToPage(page)}>
              {icon(pathname === `/${page}` ? 'primary' : 'inherit')}
            </IconButton>
          </Tooltip>
        ))}
      </Grid>
      <Grid item xs={0} lg={4}>
        <Stack flexDirection="row" gap={1} justifyContent="flex-end">
          <Tooltip
            placement="left"
            title={t('pages.feed.tooltip.notifications')}
          >
            <IconButton onClick={handleOpenNotifications}>
              <NotificationsRoundedIcon
                color={openNotifications ? 'primary' : 'inherit'}
                fontSize="large"
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorNotifications}
            anchorOrigin={{
              horizontal: 'center',
              vertical: 'bottom',
            }}
            onClose={handleCloseNotifications}
            open={openNotifications}
            transformOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
          >
            {notificationsMock.data.map(({ firstName, id, type }, index) => (
              <MenuItem
                divider={index < menuItems.length - 1}
                key={id}
                onClick={() => {}}
                sx={{
                  width: '100%',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <Typography variant="body1">{`${types[type]} de ${firstName}`}</Typography>
              </MenuItem>
            ))}
          </Menu>
          <Tooltip placement="right" title={t('pages.feed.tooltip.settings')}>
            <IconButton onClick={handleOpenSettings}>
              <SettingsRoundedIcon
                color={
                  openSettings || pathname === '/settings'
                    ? 'primary'
                    : 'inherit'
                }
                fontSize="large"
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorSettings}
            anchorOrigin={{
              horizontal: 'center',
              vertical: 'bottom',
            }}
            onClose={handleCloseSettings}
            open={openSettings}
            transformOrigin={{
              horizontal: 'center',
              vertical: 'top',
            }}
          >
            {menuItems.map(({ onClick, text }, index) => (
              <MenuItem
                divider={index < menuItems.length - 1}
                key={text}
                onClick={onClick}
                sx={{
                  width: '100%',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <Typography variant="subtitle1">{t(text)}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Grid>
    </>
  )
}

DesktopVariation.propTypes = {
  openConfirmationModal: P.func.isRequired,
}

export { DesktopVariation }
