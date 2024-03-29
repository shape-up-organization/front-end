import P from 'prop-types'

import { Badge, Button, Grid, Stack, Typography } from '@mui/material'

import { Avatar } from '@atoms/Avatar'

import { useNavigateSearch } from '@hooks'
import { getBorder, getContrastColor } from '@utils/constants/levels'

const CardUser = ({ user, position, onClose }) => {
  const navigateSearch = useNavigateSearch()

  const handleGoToProfile = () => {
    navigateSearch('/profile', { username: user.username })
    onClose()
  }

  return (
    <Badge
      key={user.username}
      badgeContent={position}
      sx={{
        '& .MuiBadge-badge': {
          background: getBorder(user.xp),
          color: getContrastColor(user.xp),
          right: 56,
        },
        zIndex: theme => theme.zIndex.fab,
      }}
    >
      <Stack
        alignItems="center"
        component={Button}
        onClick={handleGoToProfile}
        px={2}
        rowGap={1}
        textTransform="none"
        variant="outlined"
      >
        <Typography
          align="center"
          color="text.primary"
          variant="body1"
          width="100%"
        >
          {user.firstName}
        </Typography>

        <Avatar user={user} avatarSize="large" />
        <Typography color="text.primary" variant="body1">
          <Typography
            color="primary"
            component="span"
            display="inline"
            fontWeight={700}
          >
            {user.xp}
          </Typography>{' '}
          XP
        </Typography>
      </Stack>
    </Badge>
  )
}

CardUser.propTypes = {
  onClose: P.func,
  position: P.number.isRequired,
  user: P.shape({
    firstName: P.string,
    username: P.string.isRequired,
    xp: P.number.isRequired,
  }).isRequired,
}

CardUser.defaultProps = {
  onClose: () => null,
}

const Top = ({ rankedTopUsers, onClose }) => (
  <Grid container spacing={2} justifyContent="center">
    {rankedTopUsers.map((user, index) => (
      <Grid
        item
        xs={index === 0 ? 12 : 5}
        key={user.username}
        display="flex"
        justifyContent="center"
      >
        <CardUser position={index + 1} user={user} onClose={onClose} />
      </Grid>
    ))}
  </Grid>
)

Top.propTypes = {
  onClose: P.func,
  rankedTopUsers: P.arrayOf(P.object).isRequired,
}

Top.defaultProps = {
  onClose: () => null,
}

export { Top }
