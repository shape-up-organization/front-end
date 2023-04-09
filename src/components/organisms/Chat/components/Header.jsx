import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded'
import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

import { Divider } from '@atoms/Divider'

import { useAuth, useChat } from '@contexts'

import api from '@api/services/friends'

import { useStyles } from './Header.styles'

const Header = () => {
  const {
    activeChat: { name, username },
    closeChat,
    responsiveSize,
  } = useChat()
  const { getJwtToken } = useAuth()

  const { t } = useTranslation()
  const { classes } = useStyles()

  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const isMenuOpen = Boolean(menuAnchorEl)

  const handleAcceptFriendshipRequest = async () => {
    try {
      const jwtToken = await getJwtToken()
      const response = await api.acceptFriendshipRequest(jwtToken, username)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseMenu = () => setMenuAnchorEl(null)

  const handleOpenMenu = event => setMenuAnchorEl(event.currentTarget)

  const handleSendFriendshipRequest = async () => {
    try {
      const jwtToken = await getJwtToken()
      const response = await api.sendFriendshipRequest(jwtToken, username)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Paper className={classes.header}>
      <Badge
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        badgeContent={
          responsiveSize === 'mobile' && (
            <Tooltip title={t('pages.chat.tooltip.chatArrowBackButton')}>
              <IconButton onClick={closeChat}>
                <ArrowBackIosRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )
        }
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          width: '100%',
          '& .MuiBadge-badge': {
            top: 36,
            left: 16,
          },
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          height="100%"
          px={4}
          py={1}
        >
          <Grid item xs={11} height="100%">
            <Stack
              alignItems="center"
              direction="row"
              height="100%"
              spacing={2}
            >
              <Tooltip title={t('pages.chat.tooltip.chatAvatarButton')}>
                <IconButton>
                  <Avatar
                    alt={t('pages.chat.alt.chatAvatarHeader', { name })}
                  />
                </IconButton>
              </Tooltip>
              <Typography
                color="link"
                fontWeight="900"
                textTransform="none"
                variant="subtitle1"
              >
                {name}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={1} height="100%">
            <Box
              alignItems="center"
              display="flex"
              height="100%"
              justifyContent="flex-end"
              width="100%"
            >
              <Tooltip title={t('pages.chat.tooltip.chatMenuButton')}>
                <IconButton onClick={handleOpenMenu}>
                  <MoreHorizRoundedIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={menuAnchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                onClose={handleCloseMenu}
                open={isMenuOpen}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem
                  onClick={handleSendFriendshipRequest}
                  sx={{ width: '100%', justifyContent: 'center', gap: 1 }}
                >
                  <PersonAddRoundedIcon />
                  <Typography variant="subtitle1">
                    {t('pages.chat.others.menuItemAddFriend')}
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={handleAcceptFriendshipRequest}
                  sx={{ width: '100%', justifyContent: 'center', gap: 1 }}
                >
                  <CheckRoundedIcon />
                  <Typography variant="subtitle1">
                    {t('pages.chat.others.menuItemAcceptFriendshipRequest')}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Badge>
    </Paper>
  )
}

export { Header }
