import { useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import {
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { Avatar } from '@atoms/Avatar'
import { Divider } from '@atoms/Divider'
import { FriendshipOptions } from '@molecules/FriendshipOptions'

import { getLevel } from '@utils/constants/levels'

import { EditModal } from './EditModal'

const UserCard = ({ isCurrentUser, user }) => {
  const { t } = useTranslation()
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const [openEditModal, setOpenEditModal] = useState(false)

  const handleOpenEditModal = () => setOpenEditModal(true)
  const handleCloseEditModal = () => setOpenEditModal(false)

  return (
    <Grid container item component={Paper} p={{ xs: 2, md: 4 }} gap={2}>
      <Grid
        item
        xs={12}
        lg={2}
        alignItems="center"
        display="flex"
        justifyContent="center"
      >
        <Avatar avatarSize="big" currentUser={isCurrentUser} user={user} />
      </Grid>
      <Grid
        container
        item
        xs={12}
        lg={6}
        rowGap={4}
        textAlign={lessThanMedium ? 'center' : 'left'}
      >
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
        >
          <Typography fontWeight={700} variant="h5">
            {user?.name}
          </Typography>
          <Typography
            color="disabled"
            fontWeight={700}
            variant="subtitle1"
          >{`@${user?.username}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight={700} variant="subtitle1">
            {t('pages.profile.others.friendsAmount', { amount: 30 })}
          </Typography>
          <Divider />
          <Typography pt={1} variant="body1">
            {user?.bio}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        alignItems="center"
        display="flex"
        justifyContent="center"
      >
        <Stack spacing={2} width="100%">
          <Stack
            bgcolor="background.default"
            borderRadius={theme => theme.shape.borderRadius}
            py={2}
            textAlign="center"
          >
            <Typography variant="h6">
              {t('pages.profile.others.level')}
            </Typography>
            <Typography variant="h3">{getLevel(user?.xp)}</Typography>
          </Stack>
          {!isCurrentUser && user?.firstName ? (
            <Stack rowGap={1}>
              <FriendshipOptions data={user} />
            </Stack>
          ) : (
            <Button
              startIcon={<EditRoundedIcon />}
              fullWidth
              onClick={handleOpenEditModal}
            >
              {t('pages.profile.others.editProfile')}
            </Button>
          )}
        </Stack>
      </Grid>
      <EditModal open={openEditModal} handleClose={handleCloseEditModal} />
    </Grid>
  )
}

UserCard.propTypes = {
  isCurrentUser: P.bool,
  user: P.shape({
    avatar: P.string,
    bio: P.string,
    firstName: P.string,
    lastName: P.string,
    name: P.string,
    username: P.string,
    xp: P.number,
  }).isRequired,
}

UserCard.defaultProps = {
  isCurrentUser: false,
}

export { UserCard }
