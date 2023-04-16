import P from 'prop-types'

import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'

const SearchField = ({ placeholder, value, setValue }) => {
  const handleChange = event => setValue(event.target.value)

  return (
    <TextField
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color={value ? 'primary' : 'inherit'} />
          </InputAdornment>
        ),
      }}
      onChange={handleChange}
      placeholder={placeholder}
      size="small"
      value={value}
    />
  )
}

SearchField.propTypes = {
  placeholder: P.string.isRequired,
  value: P.string,
  setValue: P.func.isRequired,
}

SearchField.defaultProps = {
  value: '',
}

export { SearchField }
