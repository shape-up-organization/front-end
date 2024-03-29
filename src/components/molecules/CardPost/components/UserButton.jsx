import { useState } from 'react'

import P from 'prop-types'
import { useSearchParams } from 'react-router-dom'

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import { Box, Button, Grid, IconButton, Typography } from '@mui/material'

import { Avatar } from '@atoms/Avatar'

import { useChat } from '@contexts'
import { useNavigateSearch } from '@hooks'

import { ContextMenu } from './ContextMenu'

const UserButton = ({ date, selected, refetch }) => {
  const { firstName, name, lastName, username } = selected

  const [searchParams] = useSearchParams()
  const navigateSearch = useNavigateSearch()
  const { userData } = useChat()

  const [menuAnchorEl, setContextMenuAnchorEl] = useState(null)

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
        fullWidth
        height="100%"
        onClick={
          searchParams.get('username') === userData.username
            ? () => {}
            : handleGoToProfile
        }
        onContextMenu={handleOpenContextMenu}
        py={2}
        textAlign="left"
        textTransform="none"
      >
        <Grid item xs={3} sm={2} display="flex" justifyContent="center">
          <Avatar user={selected} />
        </Grid>
        <Grid container item xs={9} sm={10} rowSpacing={0}>
          <Grid item xs={12}>
            <Typography fontWeight="700" noWrap variant="subtitle1">
              {`${firstName || name} ${lastName}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              color="disabled"
              fontWeight="700"
              noWrap
              variant="caption"
            >
              {date}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <IconButton
        onClick={handleOpenContextMenu}
        sx={{ position: 'absolute', right: 24, top: 24 }}
      >
        <MoreHorizRoundedIcon fontSize="small" />
      </IconButton>
      <ContextMenu
        anchorEl={menuAnchorEl}
        handleCloseMenu={handleCloseContextMenu}
        open={!!menuAnchorEl}
        selected={selected}
        refetch={refetch}
      />
    </Button>
  )
}

UserButton.propTypes = {
  date: P.string.isRequired,
  selected: P.shape({
    firstName: P.string,
    name: P.string.isRequired,
    lastName: P.string.isRequired,
    username: P.string.isRequired,
  }).isRequired,
  refetch: P.func,
}

UserButton.defaultProps = {
  refetch: () => {},
}

export { UserButton }
