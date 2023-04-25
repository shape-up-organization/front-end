import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'

import { Avatar } from '@atoms/Avatar'

import { useChat } from '@contexts'
import { useNavigateSearch } from '@hooks'

import { ContextMenu } from './ContextMenu'

const UserButton = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigateSearch = useNavigateSearch()
  const { activeChat, closeChat, responsiveSize, userData } = useChat()
  const { name, username } = activeChat

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
    <Button component={Paper} disableRipple fullWidth sx={{ p: 0 }}>
      <Grid
        container
        alignItems="center"
        color="text.primary"
        columnGap={{ xs: 1, md: 2, lg: 3, xl: 4 }}
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
        <Grid
          item
          xs={3}
          sm={2}
          lg={1}
          display="flex"
          justifyContent="flex-end"
        >
          <Avatar user={activeChat} />
        </Grid>
        <Grid container item xs={8} sm={9} lg={10} rowSpacing={0}>
          <Grid item xs={12}>
            <Typography fontWeight="700" noWrap variant="h6">
              {name}
            </Typography>
          </Grid>
          {activeChat.online !== undefined && (
            <Grid item xs={12} mt={-1}>
              <Typography
                color={activeChat.online ? 'primary' : 'error'}
                fontWeight="700"
                textAlign="left"
                textTransform="none"
                variant="caption"
              >
                {activeChat.online ? 'online' : 'offline'}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      {responsiveSize === 'mobile' && (
        <Tooltip title={t('pages.chat.tooltip.chatArrowBackButton')}>
          <IconButton
            onClick={closeChat}
            sx={{
              position: 'absolute',
              left: {
                xs: 8,
                sm: 24,
              },
              top: 18,
            }}
          >
            <ArrowBackIosRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
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
        userSelected={activeChat}
      />
    </Button>
  )
}

export { UserButton }
