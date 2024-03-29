import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded'
import { Button, Menu, MenuItem, Typography } from '@mui/material'

import { Divider } from '@atoms/Divider'
import { FriendshipOptions } from '@molecules/FriendshipOptions'

import { useNavigateSearch } from '@hooks'

const ContextMenu = ({ anchorEl, handleCloseMenu, open, userSelected }) => {
  const { username } = userSelected

  const { t } = useTranslation()
  const navigateSearch = useNavigateSearch()

  const handleGoToProfile = () => navigateSearch('/profile', { username })

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      onClose={handleCloseMenu}
      open={open}
      slotProps={{
        backdrop: {
          onClick: handleCloseMenu,
        },
      }}
      transformOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
      sx={{ rowGap: 1 }}
    >
      {userSelected.chatType === 'friends' && (
        <>
          <MenuItem
            component={Button}
            onClick={handleGoToProfile}
            startIcon={<ContactsRoundedIcon />}
            sx={{
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Typography
              fontWeight={700}
              textTransform="uppercase"
              variant="body2"
            >
              {t('pages.search.others.goToProfile')}
            </Typography>
          </MenuItem>
          <Divider color="disabled" size="small" />
        </>
      )}
      <FriendshipOptions
        postAction={handleCloseMenu}
        data={{
          ...userSelected,
          isFriend: true,
          isSquad: userSelected.chatType === 'squads',
        }}
      />
    </Menu>
  )
}

ContextMenu.propTypes = {
  anchorEl: P.shape({ current: P.any }),
  handleCloseMenu: P.func,
  open: P.bool,
  userSelected: P.shape({
    chatType: P.string.isRequired,
    firstName: P.string,
    username: P.string.isRequired,
  }).isRequired,
}

ContextMenu.defaultProps = {
  anchorEl: null,
  handleCloseMenu: () => {},
  open: false,
}

export { ContextMenu }
