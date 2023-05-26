import { useMemo, useState } from 'react'

import { useSnackbar } from 'notistack'
import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded'
import BlockRoundedIcon from '@mui/icons-material/BlockRounded'
import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded'

import apiFriends from '@api/services/friends'
import apiPosts from '@api/services/posts'
import { useChat } from '@contexts'
import { Options } from '@templates/Options'
import { downloadTxtFile } from '@utils/helpers/server'

const FriendshipOptions = ({ isPost, postAction, data, refetch }) => {
  const {
    name,
    userSenderFriendshipRequest,
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
    await refetch()
    setTimeout(() => {
      setMenuItemLoading('')
    }, 2000)
  }

  const acceptFriendshipRequest = async menuItem => {
    setMenuItemLoading(menuItem)
    const response = await apiFriends.acceptFriendshipRequest(username)
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
    setTimeout(() => {
      setMenuItemLoading('')
    }, 2000)
  }

  const deleteFriendshipRequest = async menuItem => {
    setMenuItemLoading(menuItem)
    const response = await apiFriends.deleteFriendshipRequest(username)
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
    await refetch()
    setTimeout(() => {
      setMenuItemLoading('')
    }, 2000)
  }

  const deleteFriend = async menuItem => {
    setMenuItemLoading(menuItem)
    const response = await apiFriends.deleteFriend(username)
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
    await updateFriends()
    await refetch()
    setMenuItemLoading('')
  }

  const deletePost = async menuItem => {
    setMenuItemLoading(menuItem)
    await apiPosts.deletePost(data.postId)
    await refetch()
    setTimeout(() => {
      setMenuItemLoading('')
    }, 2000)
  }

  const generateTxt = async menuItem => {
    setMenuItemLoading(menuItem)
    const response = await apiPosts.generateTxt(data.postId)

    const title = `${data.username}_post`
    downloadTxtFile(title, response.data)

    setTimeout(() => {
      setMenuItemLoading('')
    }, 2000)
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
        onClick: () => deletePost('deletePost'),
        text: 'deletePost',
        variant: 'contained',
      },
      generateTxt: {
        color: 'inherit',
        icon: () => <ArticleRoundedIcon />,
        onClick: () => generateTxt('generateTxt'),
        text: 'generateTxt',
        variant: 'text',
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

  if (isPost) {
    pushMenuItem('generateTxt')
  }

  if (isSquad) {
    pushMenuItem('quitSquad')
  } else if (isUser && isPost) {
    pushMenuItem(isPost ? 'deletePost' : 'sharePost')
  } else if (isFriend) {
    pushMenuItem('removeFriend')
  } else if (userSenderFriendshipRequest === null) {
    pushMenuItem('addFriend')
  } else if (userSenderFriendshipRequest === userData.username) {
    pushMenuItem('cancelFriendshipRequest')
  } else {
    pushMenuItem('acceptFriend')
    pushMenuItem('refuseFriendshipRequest')

    // }
    // pushMenuItem('blockUser')
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
    userSenderFriendshipRequest: P.string,
    postId: P.string,
    refetch: P.func,
  }).isRequired,
  isPost: P.bool,
  postAction: P.func,
  refetch: P.func,
}

FriendshipOptions.defaultProps = {
  isPost: false,
  postAction: () => {},
  refetch: () => null,
}

export { FriendshipOptions }
