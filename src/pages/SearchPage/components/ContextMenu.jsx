import { useMemo } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded'
import { Menu, MenuItem, Stack, Typography } from '@mui/material'

import { Divider } from '@atoms/Divider'

import { useChat } from '@contexts'

const ContextMenu = ({ anchorEl, handleCloseMenu, userSelected }) => {
  const isMenuOpen = Boolean(anchorEl)

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { sendFriendshipRequest, acceptFriendshipRequest } = useChat()

  const menuItems = useMemo(
    () => [
      {
        icon: () => <CheckRoundedIcon />,
        onClick: acceptFriendshipRequest,
        text: 'acceptFriendshipRequest',
      },
      {
        icon: () => <PersonAddRoundedIcon />,
        onClick: sendFriendshipRequest,
        text: 'addFriend',
      },
      {
        icon: () => <PersonRemoveRoundedIcon />,
        onClick: () => {},
        text: 'removeFriend',
      },
    ],
    []
  )

  const handleGoToProfile = () => {
    handleCloseMenu()
    navigate(`/profile/${userSelected}`)
  }

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      onClose={handleCloseMenu}
      open={isMenuOpen}
      transformOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
    >
      <MenuItem
        onClick={handleGoToProfile}
        sx={{ width: '100%', justifyContent: 'center', gap: 1 }}
      >
        <ContactsRoundedIcon />
        <Typography variant="subtitle1">
          {t('pages.search.menu.goToProfile')}
        </Typography>
      </MenuItem>
      {menuItems.map(({ onClick, icon, text }) => (
        <Stack key={text}>
          <Divider />
          <MenuItem
            onClick={onClick}
            sx={{ width: '100%', justifyContent: 'center', gap: 1 }}
          >
            {icon()}
            <Typography variant="subtitle1">
              {t(`pages.search.menu.${text}`)}
            </Typography>
          </MenuItem>
        </Stack>
      ))}
    </Menu>
  )
}

ContextMenu.propTypes = {
  anchorEl: P.object,
  handleCloseMenu: P.func.isRequired,
  userSelected: P.string.isRequired,
}

ContextMenu.defaultProps = {
  anchorEl: null,
}

export { ContextMenu }
