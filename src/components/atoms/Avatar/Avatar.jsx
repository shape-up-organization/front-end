import P from 'prop-types'

import { Avatar as AvatarMUI } from '@mui/material'

import { useChat } from '@contexts'
import { getBorder } from '@utils/constants/levels'

import { useStyles } from './Avatar.styles'

const Avatar = ({ avatarSize, currentUser, user, ...rest }) => {
  const { userData } = useChat()
  const { classes } = useStyles({ avatarSize })

  const data = {
    profilePicture:
      (currentUser ? userData.profilePicture : user.profilePicture) ||
      // defaultUser,
      'https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&w=1000',
    username: currentUser ? userData.username : user.username,
    xp: currentUser ? userData.xp : user.xp,
  }

  return (
    <AvatarMUI
      alt={data.username}
      className={classes.avatar}
      src={data.profilePicture}
      sx={{
        background: `${getBorder(Number(data.xp))} border-box`,
      }}
      {...rest}
    />
  )
}

Avatar.propTypes = {
  avatarSize: P.oneOf(['big', 'large', 'medium', 'mini']),
  currentUser: P.bool,
  user: P.shape({
    profilePicture: P.string,
    username: P.string,
    xp: P.oneOfType([P.string, P.number]),
  }),
}

Avatar.defaultProps = {
  avatarSize: 'medium',
  currentUser: false,
  user: {
    profilePicture: null,
    username: null,
    xp: 0,
  },
}

export { Avatar }
