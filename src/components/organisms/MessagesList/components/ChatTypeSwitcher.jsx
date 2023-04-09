import { useTranslation } from 'react-i18next'

import PeopleIcon from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import { Box, IconButton, Stack, Tooltip } from '@mui/material'

import { Divider } from '@atoms/Divider'

import { useChat } from '@contexts'

const ChatTypeSwitcher = () => {
  const { t } = useTranslation()
  const { changeChatType, isLoading, getChatType } = useChat()

  const chatType = getChatType()

  return (
    <Stack direction="row" justifyContent="center" spacing={4}>
      <Tooltip
        title={
          isLoading || chatType === null
            ? ''
            : t('pages.chat.tooltip.switchChatTypeButton.friends')
        }
      >
        <Box component="span" pb={1}>
          <IconButton
            disabled={isLoading || chatType === null}
            onClick={() => chatType !== 'friends' && changeChatType('friends')}
            type="button"
          >
            <PersonIcon
              color={chatType === 'friends' ? 'primary' : 'inherit'}
              fontSize="large"
            />
          </IconButton>
        </Box>
      </Tooltip>
      <Divider direction="vertical" />
      <Tooltip
        title={
          isLoading || chatType === null
            ? ''
            : t('pages.chat.tooltip.switchChatTypeButton.squads')
        }
      >
        <Box component="span" pb={1}>
          <IconButton
            disabled={isLoading || chatType === null}
            onClick={() => chatType !== 'squads' && changeChatType('squads')}
            type="button"
          >
            <PeopleIcon
              color={chatType === 'squads' ? 'primary' : 'inherit'}
              fontSize="large"
            />
          </IconButton>
        </Box>
      </Tooltip>
    </Stack>
  )
}

export { ChatTypeSwitcher }
