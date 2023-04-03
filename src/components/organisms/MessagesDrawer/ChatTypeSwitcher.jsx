import PeopleIcon from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import { IconButton, Tooltip } from '@mui/material'

import { Divider } from '@atoms/Divider'

const ChatTypeSwitcher = () => (
  <>
    <Tooltip title="Amigos">
      <IconButton type="button">
        <PersonIcon fontSize="large" />
      </IconButton>
    </Tooltip>
    <Divider direction="vertical" />
    <Tooltip title="Squads">
      <IconButton type="button">
        <PeopleIcon fontSize="large" />
      </IconButton>
    </Tooltip>
  </>
)

export { ChatTypeSwitcher }
