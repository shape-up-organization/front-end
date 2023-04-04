import PeopleIcon from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import { IconButton, Tooltip } from '@mui/material'

import { Divider } from '@atoms/Divider'

import { useChat } from '@contexts'

const ChatTypeSwitcher = () => {
  const { changeChatType, isLoading, chatType } = useChat()

  return (
    <>
      <Tooltip title="Amigos">
        <IconButton
          disabled={isLoading || chatType === null}
          onClick={() => changeChatType('friends')}
          type="button"
        >
          <PersonIcon
            color={chatType === 'friends' ? 'primary' : 'inherit'}
            fontSize="large"
          />
        </IconButton>
      </Tooltip>
      <Divider direction="vertical" />
      <Tooltip title="Squads">
        <IconButton
          disabled={isLoading || chatType === null}
          onClick={() => changeChatType('squads')}
          type="button"
        >
          <PeopleIcon
            color={chatType === 'squads' ? 'primary' : 'inherit'}
            fontSize="large"
          />
        </IconButton>
      </Tooltip>
    </>
  )
}

export { ChatTypeSwitcher }
