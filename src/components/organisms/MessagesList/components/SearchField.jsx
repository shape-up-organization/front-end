import { useTranslation } from 'react-i18next'

import { TextField } from '@mui/material'

import { useChat } from '@contexts'

const SearchField = () => {
  const { t } = useTranslation()
  const { chatsData, filterChats, isLoading } = useChat()

  const handleChange = ({ target: { value } }) => {
    filterChats(value)
  }

  const disabled =
    isLoading || (!chatsData?.friends?.length && !chatsData?.squads?.length)

  return (
    <TextField
      disabled={disabled}
      fullWidth
      size="small"
      onChange={handleChange}
      placeholder={
        disabled
          ? t('pages.chat.others.searchChatsPlaceholderDisabled')
          : t('pages.chat.others.searchChatsPlaceholder')
      }
    />
  )
}

export { SearchField }
