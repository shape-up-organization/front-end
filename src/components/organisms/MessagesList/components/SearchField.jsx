import { useTranslation } from 'react-i18next'

import { TextField } from '@mui/material'

import { useChat } from '@contexts'

const SearchField = () => {
  const { t } = useTranslation()
  const { filterChats } = useChat()

  const handleChange = ({ target: { value } }) => {
    filterChats(value)
  }

  return (
    <TextField
      fullWidth
      onChange={handleChange}
      placeholder={t('pages.chat.others.searchChatsPlaceholder')}
    />
  )
}

export { SearchField }
