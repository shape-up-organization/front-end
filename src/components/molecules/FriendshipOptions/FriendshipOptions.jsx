import { useMemo, useState } from 'react'

import { useSnackbar } from 'notistack'
import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import BlockRoundedIcon from '@mui/icons-material/BlockRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded'

import apiFriends from '@api/services/friends'
import { useChat } from '@contexts'
import { Options } from '@templates/Options'

const FriendshipOptions = ({ isPost, postAction, data }) => {
  const {
    name,
    haveFriendRequest = false,
    isFriend = false,
    isSquad = false,
    username,
  } = data

  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const { updateFriends, userData } = useChat()

  const [menuItemLoading, setMenuItemLoading] = useState('')

  const isUser = useMemo(() => userData.username === username, [username])

  const sendFriendshipRequest = async menuItem => {
    setMenuItemLoading(menuItem)
    const response = await apiFriends.sendFriendshipRequest(username)
    setMenuItemLoading('')
    postAction()

    if (isFriend) {
      enqueueSnackbar(
        t('components.molecules.friendshipOptions.snackbar.alreadyFriends', {
          userFirstName: name,
        }),
        {
          variant: 'error',
        }
      )
      return
    }

    if (response.status === 404) {
      enqueueSnackbar(
        t('components.molecules.friendshipOptions.snackbar.userNotFound', {
          userFirstName: name,
        }),
        {
          variant: 'error',
        }
      )
      return
    }

    if (response.status === 409) {
      enqueueSnackbar(
        t(
          'components.molecules.friendshipOptions.snackbar.friendshipRequestAlreadyExists',
          {
            userFirstName: name,
          }
        ),
        {
          variant: 'error',
        }
      )
      return
    }

    if (response.status !== 201) {
      enqueueSnackbar(
        t(
          'components.molecules.friendshipOptions.snackbar.genericErrorAcceptFriendshipRequest'
        ),
        {
          variant: 'error',
        }
      )
      return
    }

    enqueueSnackbar(
      t(
        'components.molecules.friendshipOptions.snackbar.sentFriendshipRequest',
        {
          userFirstName: name,
        }
      ),
      {
        variant: 'success',
      }
    )
  }

  const acceptFriendshipRequest = async menuItem => {
    setMenuItemLoading(menuItem)
    const response = await apiFriends.acceptFriendshipRequest(username)
    setMenuItemLoading('')
    postAction()

    if (response.status === 404) {
      enqueueSnackbar(
        t('components.molecules.friendshipOptions.snackbar.userNotFound', {
          userFirstName: name,
        }),
        {
          variant: 'error',
        }
      )
      return
    }

    if (response.status === 409) {
      enqueueSnackbar(
        t(
          'components.molecules.friendshipOptions.snackbar.friendshipRequestAlreadyExists',
          {
            userFirstName: name,
          }
        ),
        {
          variant: 'error',
        }
      )
      return
    }

    if (response.status !== 201) {
      enqueueSnackbar(
        t(
          'components.molecules.friendshipOptions.snackbar.genericErrorSendFriendshipRequest'
        ),
        {
          variant: 'error',
        }
      )
      return
    }

    enqueueSnackbar(
      t(
        'components.molecules.friendshipOptions.snackbar.acceptFriendshipRequest',
        {
          userFirstName: name,
        }
      ),
      {
        variant: 'success',
      }
    )
    updateFriends()
  }

  const deleteFriendshipRequest = async menuItem => {
    setMenuItemLoading(menuItem)
    const response = await apiFriends.deleteFriendshipRequest(username)
    setMenuItemLoading('')
    postAction()

    if (response.status === 404) {
      enqueueSnackbar(
        t('components.molecules.friendshipOptions.snackbar.userNotFound', {
          userFirstName: name,
        }),
        {
          variant: 'error',
        }
      )
      return
    }

    if (response.status !== 204) {
      enqueueSnackbar(
        t(
          'components.molecules.friendshipOptions.snackbar.genericErrorSendFriendshipRequest'
        ),
        {
          variant: 'error',
        }
      )
      return
    }

    enqueueSnackbar(
      t(
        'components.molecules.friendshipOptions.snackbar.deleteFriendshipRequest'
      ),
      {
        variant: 'success',
      }
    )
  }

  const deleteFriend = async menuItem => {
    setMenuItemLoading(menuItem)
    const response = await apiFriends.deleteFriend(username)
    setMenuItemLoading('')
    postAction()

    if (response.status === 404) {
      enqueueSnackbar(
        t('components.molecules.friendshipOptions.snackbar.userNotFound', {
          userFirstName: name,
        }),
        {
          variant: 'error',
        }
      )
      return
    }

    if (response.status !== 204) {
      enqueueSnackbar(
        t(
          'components.molecules.friendshipOptions.snackbar.genericErrorSendFriendshipRequest'
        ),
        {
          variant: 'error',
        }
      )
      return
    }

    enqueueSnackbar(
      t('components.molecules.friendshipOptions.snackbar.deleteFriend'),
      {
        variant: 'success',
      }
    )
    updateFriends()
  }

  const menuItems = useMemo(
    () => ({
      acceptFriend: {
        color: 'primary',
        icon: () => <CheckRoundedIcon />,
        onClick: () => acceptFriendshipRequest('acceptFriend'),
        text: 'acceptFriendshipRequest',
        variant: 'text',
      },
      addFriend: {
        color: 'primary',
        icon: () => <PersonAddRoundedIcon />,
        onClick: () => sendFriendshipRequest('addFriend'),
        text: 'addFriend',
        variant: 'text',
      },
      blockUser: {
        color: 'error',
        icon: () => <BlockRoundedIcon />,
        onClick: () => {},
        text: 'blockUser',
        variant: 'contained',
      },
      cancelFriendshipRequest: {
        color: 'error',
        icon: () => <CancelRoundedIcon />,
        onClick: () => deleteFriendshipRequest('cancelFriendshipRequest'),
        text: 'cancelFriendshipRequest',
        variant: 'text',
      },
      deletePost: {
        color: 'error',
        icon: () => <DeleteForeverRoundedIcon />,
        onClick: () => {},
        text: 'deletePost',
        variant: 'contained',
      },
      quitSquad: {
        color: 'error',
        icon: () => <ExitToAppRoundedIcon />,
        onClick: () => {},
        text: 'quitSquad',
        variant: 'contained',
      },
      refuseFriendshipRequest: {
        color: 'error',
        icon: () => <CancelRoundedIcon />,
        onClick: () => deleteFriendshipRequest('refuseFriendshipRequest'),
        text: 'refuseFriendshipRequest',
        variant: 'text',
      },
      removeFriend: {
        color: 'error',
        icon: () => <PersonRemoveRoundedIcon />,
        onClick: () => deleteFriend('removeFriend'),
        text: 'removeFriend',
      },
      sharePost: {
        color: 'primary',
        icon: () => <ShareRoundedIcon />,
        onClick: () => {},
        text: 'sharePost',
        variant: 'text',
      },
    }),
    []
  )
  const iterateMenuItems = []

  const pushMenuItem = menuItem =>
    iterateMenuItems.push({
      name: menuItem,
      value: {
        ...menuItems[menuItem],
        text: `friendshipOptions.options.${menuItems[menuItem].text}`,
      },
    })

  if (isSquad) {
    pushMenuItem('quitSquad')
  } else if (isUser && isPost) {
    pushMenuItem(isPost ? 'deletePost' : 'sharePost')
  } else {
    if (isFriend) {
      pushMenuItem('removeFriend')
    } else {
      // TODO: add real check
      const userWhoSent = false
      if (!haveFriendRequest) {
        pushMenuItem('addFriend')
      } else if (userWhoSent) {
        pushMenuItem('cancelFriendshipRequest')
      } else {
        pushMenuItem('acceptFriend')
        pushMenuItem('refuseFriendshipRequest')
      }
    }
    pushMenuItem('blockUser')
  }

  return (
    <Options menuItems={iterateMenuItems} menuItemLoading={menuItemLoading} />
  )
}

FriendshipOptions.propTypes = {
  data: P.shape({
    name: P.string,
    isFriend: P.bool,
    isSquad: P.bool,
    haveFriendRequest: P.bool,
    username: P.string,
  }).isRequired,
  isPost: P.bool,
  postAction: P.func,
}

FriendshipOptions.defaultProps = {
  isPost: false,
  postAction: () => {},
}

export { FriendshipOptions }
