import { useMemo, useState } from 'react'

import { useSnackbar } from 'notistack'
import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import BlockRoundedIcon from '@mui/icons-material/BlockRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded'

import api from '@api/services/friends'
import { useChat } from '@contexts'
import { Options } from '@templates/Options'

const FriendshipOptions = ({ isPost, postAction, data }) => {
  const { firstName, username } = data

  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const {
    chatsData: { friends },
    userData,
  } = useChat()

  const [menuItemLoading, setMenuItemLoading] = useState('')

  const isFriend = useMemo(
    () => friends.find(friend => friend.username === username),
    [friends, username]
  )
  const isUser = useMemo(() => userData.username === username, [username])

  const sendFriendship = async menuItem => {
    setMenuItemLoading(menuItem)
    const response = await api.sendFriendshipRequest(
      userData.jwtToken,
      username
    )
    setMenuItemLoading('')
    postAction()

    if (isFriend) {
      enqueueSnackbar(
        t('components.molecules.friendshipOptions.snackbar.alreadyFriends', {
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
        t('components.molecules.friendshipOptions.snackbar.userNotFound', {
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
        t(
          'components.molecules.friendshipOptions.snackbar.friendshipRequestAlreadyExists',
          {
            userFirstName: firstName,
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
          userFirstName: firstName,
        }
      ),
      {
        variant: 'success',
      }
    )
  }

  const acceptFriendship = async menuItem => {
    setMenuItemLoading(menuItem)
    const response = await api.acceptFriendshipRequest(
      userData.jwtToken,
      username
    )
    setMenuItemLoading('')
    postAction()

    if (response.status === 404) {
      enqueueSnackbar(
        t('components.molecules.friendshipOptions.snackbar.userNotFound', {
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
        t(
          'components.molecules.friendshipOptions.snackbar.friendshipRequestAlreadyExists',
          {
            userFirstName: firstName,
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
          userFirstName: firstName,
        }
      ),
      {
        variant: 'success',
      }
    )
  }

  const menuItems = useMemo(
    () => ({
      acceptFriend: {
        color: 'primary',
        icon: () => <CheckRoundedIcon />,
        onClick: () => acceptFriendship('acceptFriend'),
        text: 'acceptFriendshipRequest',
        variant: 'text',
      },
      addFriend: {
        color: 'primary',
        icon: () => <PersonAddRoundedIcon />,
        onClick: () => sendFriendship('addFriend'),
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
        onClick: () => {},
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
      refuseFriendshipRequest: {
        color: 'error',
        icon: () => <CancelRoundedIcon />,
        onClick: () => {},
        text: 'refuseFriendshipRequest',
        variant: 'text',
      },
      removeFriend: {
        color: 'error',
        icon: () => <PersonRemoveRoundedIcon />,
        onClick: () => {},
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

  if (isUser && isPost) {
    pushMenuItem(isPost ? 'deletePost' : 'sharePost')
  } else {
    if (isFriend) {
      pushMenuItem('removeFriend')
    } else {
      // TODO: add real check
      const hasFriendshipRequest = true
      const userWhoSent = false
      if (!hasFriendshipRequest) {
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
    firstName: P.string.isRequired,
    username: P.string.isRequired,
  }).isRequired,
  isPost: P.bool,
  postAction: P.func,
}

FriendshipOptions.defaultProps = {
  isPost: false,
  postAction: () => {},
}

export { FriendshipOptions }
