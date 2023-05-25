import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import {
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

import { Divider } from '@atoms/Divider'

import { useChat } from '@contexts'

import { CreateSquadModal } from './CreateSquadModal'

const ChatTypeSwitcher = () => {
  const { t } = useTranslation()
  const { changeChatType, isLoading, chatsData } = useChat()

  const [isSquadModalOpen, setIsSquadModalOpen] = useState(false)

  const handleCloseSquadModal = () => setIsSquadModalOpen(false)
  const handleOpenSquadModal = () => setIsSquadModalOpen(true)

  return (
    <Stack>
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
        <Divider color="disabled" direction="vertical" size="small" />
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
      {false && chatsData.type === 'squads' && (
        <Box width="100%" pb={2} pt={0} px={8}>
          <Button
            fullWidth
            onClick={handleOpenSquadModal}
            size="large"
            variant="outlined"
          >
            <Typography variant="subtitle2">
              {t('pages.chat.others.createSquadButton')}
            </Typography>
          </Button>
        </Box>
      )}
      <CreateSquadModal
        handleClose={handleCloseSquadModal}
        open={isSquadModalOpen}
      />
    </Stack>
  )
}

export { ChatTypeSwitcher }
