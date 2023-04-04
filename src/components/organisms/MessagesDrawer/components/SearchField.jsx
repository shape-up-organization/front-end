import { TextField } from '@mui/material'

import { useChat } from '@contexts'

const SearchField = () => {
  const { filterChats } = useChat()

  const handleChange = ({ target: { value } }) => {
    filterChats(value)
  }

  return (
    <TextField
      fullWidth
      onChange={handleChange}
      placeholder="Procure por amigos"
    />
  )
}

export { SearchField }
