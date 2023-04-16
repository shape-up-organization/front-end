import P from 'prop-types'

import { Avatar as AvatarMUI } from '@mui/material'

import defaultUser from '@assets/images/default-user.png'
import { useChat } from '@contexts'
import { getBorder } from '@utils/constants/levels'

import { useStyles } from './Avatar.styles'

const Avatar = ({ currentUser, mini, user, ...rest }) => {
  const { userData } = useChat()
  const { classes } = useStyles({ mini })

  const data = {
    profilePicture:
      (currentUser ? userData.profilePicture : user.profilePicture) ||
      defaultUser,
    username: currentUser ? userData.username : user.username,
    xp: currentUser ? userData.xp : user.xp,
  }

  return (
    <AvatarMUI
      alt={data.username}
      className={classes.avatar}
      src={data.profilePicture}
      sx={{
        background: `${getBorder(data.xp)} border-box`,
      }}
      {...rest}
    />
  )
}

Avatar.propTypes = {
  currentUser: P.bool,
  mini: P.bool,
  user: P.shape({
    profilePicture: P.string,
    username: P.string,
    xp: P.number,
  }),
}

Avatar.defaultProps = {
  currentUser: false,
  mini: false,
  user: {
    profilePicture: null,
    username: null,
    xp: 0,
  },
}

export { Avatar }
