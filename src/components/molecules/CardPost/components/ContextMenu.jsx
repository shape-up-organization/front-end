import P from 'prop-types'

import { Menu } from '@mui/material'

import { FriendshipOptions } from '@molecules/FriendshipOptions'

const ContextMenu = ({ anchorEl, handleCloseMenu, open, selected }) => (
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
    <FriendshipOptions isPost postAction={handleCloseMenu} data={selected} />
  </Menu>
)

ContextMenu.propTypes = {
  anchorEl: P.shape({ current: P.any }),
  handleCloseMenu: P.func,
  open: P.bool,
  selected: P.object.isRequired,
}

ContextMenu.defaultProps = {
  anchorEl: null,
  handleCloseMenu: () => {},
  open: false,
}

export { ContextMenu }
