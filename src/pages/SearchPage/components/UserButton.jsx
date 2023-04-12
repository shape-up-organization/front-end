import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Avatar, Button, Fab, Grid, Typography } from '@mui/material'

import { useChat } from '@contexts'
import { getBorder, getLevel } from '@utils/constants/levels'

import { useState } from 'react'
import { ContextMenu } from './ContextMenu'
import { useStyles } from './UserButton.styles'

const UserButton = ({ user }) => {
  const { name, profilePicture, username, xp } = user

  const {
    chatsData: { friends },
  } = useChat()
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = useState(null)

  const { classes } = useStyles()

  const checkIfIsFriend = () =>
    friends.some(friend => friend.username === username)

  const handleCloseMenu = () => setAnchorEl(null)

  const handleOpenContextMenu = event => {
    event.preventDefault()
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  return (
    <Button
      className={classes.chatButton}
      fullWidth
      onClick={handleOpenContextMenu}
    >
      <Grid
        alignItems="center"
        columnSpacing={1}
        container
        justifyContent="center"
        height="100%"
        py={1}
      >
        <Grid item xs={2} display="flex" justifyContent="center">
          <Avatar
            alt={name}
            className={classes.avatar}
            src={profilePicture}
            sx={{
              background: `${getBorder(xp)} border-box`,
            }}
          />
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
            <Typography fontWeight="700" noWrap variant="subtitle1">
              {name}
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
        <Grid container item xs={3} rowSpacing={0}>
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
      <ContextMenu
        anchorEl={anchorEl}
        open={!!anchorEl}
        handleCloseMenu={handleCloseMenu}
        userSelected={user}
      />
    </Button>
  )
}

UserButton.propTypes = {
  user: P.shape({
    name: P.string.isRequired,
    profilePicture: P.string.isRequired,
    username: P.string.isRequired,
    xp: P.number.isRequired,
  }).isRequired,
}

export { UserButton }
