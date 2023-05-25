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
import { SquadModal } from './SquadModal'

const UserButton = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const navigateSearch = useNavigateSearch()
  const { activeChat, closeChat, friendsOnline, responsiveSize, userData } =
    useChat()
  const { name, username } = activeChat

  const [menuAnchorEl, setContextMenuAnchorEl] = useState(null)
  const [openSquadModal, setOpenSquadModal] = useState(false)

  // const handleOpenSquadModal = () => setOpenSquadModal(true)
  const handleCloseSquadModal = () => setOpenSquadModal(false)

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
    <>
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
            // eslint-disable-next-line no-nested-ternary
            activeChat.chatType === 'squads'
              ? null
              : searchParams.get('username') === userData.username
              ? () => {}
              : handleGoToProfile
          }
          onContextMenu={
            activeChat.chatType !== 'squads'
              ? handleOpenContextMenu
              : () => null
          }
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
            {friendsOnline[username] && (
              <Grid item xs={12} mt={-1}>
                <Typography
                  color={friendsOnline[username] ? 'primary' : 'error'}
                  fontWeight="700"
                  textAlign="left"
                  textTransform="none"
                  variant="caption"
                >
                  {friendsOnline[username] ? 'online' : 'offline'}
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
        {activeChat.chatType !== 'squads' && (
          <IconButton
            onClick={handleOpenContextMenu}
            sx={{ position: 'absolute', right: 24, top: 24 }}
          >
            <MoreHorizRoundedIcon fontSize="small" />
          </IconButton>
        )}
        <ContextMenu
          anchorEl={menuAnchorEl}
          handleCloseMenu={handleCloseContextMenu}
          open={!!menuAnchorEl}
          userSelected={activeChat}
        />
      </Button>
      <SquadModal
        squadId={activeChat.username}
        handleClose={handleCloseSquadModal}
        open={openSquadModal}
      />
    </>
  )
}

export { UserButton }
