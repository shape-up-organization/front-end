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

import api from '@api/services/friends'
import { useChat } from '@contexts'

const ContextMenu = ({ anchorEl, handleCloseMenu, open, userSelected }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    chatsData: { friends },
    userData,
  } = useChat()

  const sendFriendship = async () => {
    try {
      await api.sendFriendshipRequest(userData.jwtToken, userSelected)
    } catch (error) {
      console.log(error.response)
    } finally {
      handleCloseMenu()
    }
  }

  const acceptFriendship = async () => {
    try {
      await api.acceptFriendshipRequest(userData.jwtToken, userSelected)
    } catch (error) {
      console.log(error.response)
    } finally {
      handleCloseMenu()
    }
  }

  const menuItems = useMemo(
    () => ({
      acceptFriend: {
        icon: () => <CheckRoundedIcon />,
        onClick: acceptFriendship,
        text: 'acceptFriendshipRequest',
      },
      addFriend: {
        icon: () => <PersonAddRoundedIcon />,
        onClick: sendFriendship,
        text: 'addFriend',
      },
      removeFriend: {
        icon: () => <PersonRemoveRoundedIcon />,
        onClick: () => {},
        text: 'removeFriend',
      },
    }),
    []
  )

  const iterateMenuItems = []

  const handleGoToProfile = () => {
    handleCloseMenu()
    navigate(`/profile/${userSelected}`)
  }

  if (anchorEl) {
    if (friends.find(({ username }) => username === userSelected)) {
      iterateMenuItems.push(menuItems.removeFriend)
    } else {
      iterateMenuItems.push(menuItems.acceptFriend)
      iterateMenuItems.push(menuItems.addFriend)
    }
  }

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      onClose={handleCloseMenu}
      open={open}
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
      {iterateMenuItems.map(({ onClick, icon, text }) => (
        <Stack key={text}>
          <Divider />
          <MenuItem
            onClick={() => onClick()}
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
  open: P.bool.isRequired,
  userSelected: P.string.isRequired,
}

ContextMenu.defaultProps = {
  anchorEl: null,
}

export { ContextMenu }
