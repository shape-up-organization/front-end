import { useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import {
  Box,
  Button,
  Fab,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { Avatar } from '@atoms/Avatar'

import { useChat } from '@contexts'
import { useNavigateSearch } from '@hooks'
import { getLevel } from '@utils/constants/levels'

import { ContextMenu } from './ContextMenu'

const UserButton = ({ user }) => {
  const { name, lastName, username, xp } = user

  const { t } = useTranslation()
  const moreThanMedium = useMediaQuery(theme => theme.breakpoints.up('md'))
  const navigateSearch = useNavigateSearch()
  const {
    chatsData: { friends },
  } = useChat()

  const [menuAnchorEl, setContextMenuAnchorEl] = useState(null)

  const checkIfIsFriend = () =>
    friends.some(friend => friend.username === username)

  const handleCloseContextMenu = () => setContextMenuAnchorEl(null)
  const handleOpenContextMenu = event => {
    event.preventDefault()
    setContextMenuAnchorEl(current => (current ? null : event.currentTarget))
  }

  const handleGoToProfile = () => {
    if (menuAnchorEl) return
    navigateSearch('/profile', { username })
  }

  return (
    <Button component={Box} disableRipple fullWidth sx={{ p: 0 }}>
      <Grid
        container
        alignItems="center"
        color="text.primary"
        component={Button}
        disableRipple={!!menuAnchorEl}
        height="100%"
        justifyContent="center"
        onClick={handleGoToProfile}
        onContextMenu={handleOpenContextMenu}
        py={2}
        textAlign="left"
        textTransform="none"
      >
        <Grid item xs={2} display="flex" justifyContent="center">
          <Avatar user={user} />
        </Grid>
        <Grid container item xs={7} rowSpacing={0}>
          <Grid item xs={12}>
            <Typography
              color="primary"
              fontWeight="700"
              noWrap
              variant="caption"
            >
              {checkIfIsFriend() && t('pages.search.others.friendLabel')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight="700" noWrap variant="h6">
              {name} {lastName}
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography
              color="disabled"
              fontWeight="700"
              noWrap
              variant="subtitle2"
            >
              {`@${username}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={3} rowSpacing={1}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography
              fontWeight="700"
              noWrap
              textTransform="uppercase"
              variant="subtitle2"
            >
              {t('pages.search.others.levelLabel')}
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Fab color="primary" component="div" size="small">
              <Typography
                fontWeight="700"
                noWrap
                textTransform="uppercase"
                variant="subtitle2"
              >
                {getLevel(xp)}
              </Typography>
            </Fab>
          </Grid>
        </Grid>
      </Grid>
      {moreThanMedium && (
        <IconButton
          onClick={handleOpenContextMenu}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <MoreHorizRoundedIcon fontSize="small" />
        </IconButton>
      )}
      <ContextMenu
        anchorEl={menuAnchorEl}
        handleCloseMenu={handleCloseContextMenu}
        open={!!menuAnchorEl}
        userSelected={user}
      />
    </Button>
  )
}

UserButton.propTypes = {
  user: P.shape({
    name: P.string.isRequired,
    lastName: P.string.isRequired,
    profilePicture: P.string.isRequired,
    username: P.string.isRequired,
    xp: P.number.isRequired,
  }).isRequired,
}

export { UserButton }
