import { useTranslation } from 'react-i18next'

import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import { Badge, Box, IconButton, Stack, Tooltip } from '@mui/material'

import { Divider } from '@atoms/Divider'

import { useChat } from '@contexts'

const ChatTypeSwitcher = () => {
  const { t } = useTranslation()
  const { changeChatType, isLoading, chatsData } = useChat()

  return (
    <Stack direction="row" justifyContent="center" spacing={4}>
      <Badge
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
        badgeContent={chatsData.notifications.friends}
        color="primary"
        max={99}
        overlap="circular"
      >
        <Tooltip
          title={
            isLoading || chatsData.type === null
              ? ''
              : t('pages.chat.tooltip.switchChatTypeButton.friends')
          }
        >
          <Box component="span" pb={1}>
            <IconButton
              disabled={isLoading || chatsData.type === null}
              onClick={() =>
                chatsData.type !== 'friends' && changeChatType('friends')
              }
              type="button"
            >
              <PersonRoundedIcon
                color={chatsData.type === 'friends' ? 'primary' : 'inherit'}
                fontSize="large"
              />
            </IconButton>
          </Box>
        </Tooltip>
      </Badge>
      <Divider direction="vertical" />
      <Badge
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        badgeContent={chatsData.notifications.squads}
        color="primary"
        max={99}
        overlap="circular"
      >
        <Tooltip
          title={
            isLoading || chatsData.type === null
              ? ''
              : t('pages.chat.tooltip.switchChatTypeButton.squads')
          }
        >
          <Box component="span" pb={1}>
            <IconButton
              disabled={isLoading || chatsData.type === null}
              onClick={() =>
                chatsData.type !== 'squads' && changeChatType('squads')
              }
              type="button"
            >
              <PeopleRoundedIcon
                color={chatsData.type === 'squads' ? 'primary' : 'inherit'}
                fontSize="large"
              />
            </IconButton>
          </Box>
        </Tooltip>
      </Badge>
    </Stack>
  )
}

export { ChatTypeSwitcher }
