import { useMemo } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded'
import { Menu, MenuItem, Stack, Typography } from '@mui/material'

import { Divider } from '@atoms/Divider'

import api from '@api/services/friends'
import { useChat } from '@contexts'
import { useSnackbar } from 'notistack'

const ContextMenu = ({ anchorEl, handleCloseMenu, open, userSelected }) => {
  const { firstName, username } = userSelected

  const { t } = useTranslation()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const {
    chatsData: { friends },
    userData,
  } = useChat()

  const isFriend = friends.find(friend => friend.username === username)

  const sendFriendship = async () => {
    const response = await api.sendFriendshipRequest(
      userData.jwtToken,
      username
    )
    handleCloseMenu()

    if (isFriend) {
      enqueueSnackbar(
        t('pages.search.snackbar.alreadyFriends', {
          userFirstName: firstName,
        }),
        {
          variant: 'error',
        }
      )
      return
    }

    if (response.status === 404) {
      enqueueSnackbar(
        t('pages.search.snackbar.userNotFound', {
          userFirstName: firstName,
        }),
        {
          variant: 'error',
        }
      )
      return
    }

    if (response.status === 409) {
      enqueueSnackbar(
        t('pages.search.snackbar.friendshipRequestAlreadyExists', {
          userFirstName: firstName,
        }),
        {
          variant: 'error',
        }
      )
      return
    }

    if (response.status !== 201) {
      enqueueSnackbar(
        t('pages.search.snackbar.genericErrorAcceptFriendshipRequest'),
        {
          variant: 'error',
        }
      )
      return
    }

    enqueueSnackbar(
      t('pages.search.snackbar.sentFriendshipRequest', {
        userFirstName: firstName,
      }),
      {
        variant: 'success',
      }
    )
  }

  const acceptFriendship = async () => {
    const response = await api.acceptFriendshipRequest(
      userData.jwtToken,
      username
    )
    handleCloseMenu()

    if (response.status === 404) {
      enqueueSnackbar(
        t('pages.search.snackbar.userNotFound', {
          userFirstName: firstName,
        }),
        {
          variant: 'error',
        }
      )
      return
    }

    if (response.status === 409) {
      enqueueSnackbar(
        t('pages.search.snackbar.friendshipRequestAlreadyExists', {
          userFirstName: firstName,
        }),
        {
          variant: 'error',
        }
      )
      return
    }

    if (response.status !== 201) {
      enqueueSnackbar(
        t('pages.search.snackbar.genericErrorSendFriendshipRequest'),
        {
          variant: 'error',
        }
      )
      return
    }

    enqueueSnackbar(
      t('pages.search.snackbar.acceptFriendshipRequest', {
        userFirstName: firstName,
      }),
      {
        variant: 'success',
      }
    )
  }

  const handleGoToProfile = () => navigate(`/profile/${username}`)

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
      cancelFriendshipRequest: {
        icon: () => <CancelRoundedIcon />,
        onClick: () => {},
        text: 'cancelFriendshipRequest',
      },
      refuseFriendshipRequest: {
        icon: () => <CancelRoundedIcon />,
        onClick: () => {},
        text: 'refuseFriendshipRequest',
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

  if (isFriend) {
    iterateMenuItems.push(menuItems.removeFriend)
  } else {
    // TODO: add real check
    const hasFriendshipRequest = true
    const userWhoSent = true
    if (!hasFriendshipRequest) {
      iterateMenuItems.push(menuItems.addFriend)
    } else if (userWhoSent) {
      iterateMenuItems.push(menuItems.cancelFriendshipRequest)
    } else {
      iterateMenuItems.push(menuItems.acceptFriend)
      iterateMenuItems.push(menuItems.refuseFriendshipRequest)
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
      slotProps={{
        backdrop: {
          onClick: handleCloseMenu,
        },
      }}
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
            onClick={onClick}
            sx={{
              width: '100%',
              justifyContent: 'center',
              gap: 1,
              pointerEvents: 'all',
            }}
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
  userSelected: P.shape({
    firstName: P.string.isRequired,
    username: P.string.isRequired,
  }).isRequired,
}

ContextMenu.defaultProps = {
  anchorEl: null,
}

export { ContextMenu }
