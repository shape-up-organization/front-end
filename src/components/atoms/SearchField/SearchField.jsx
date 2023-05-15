import P from 'prop-types'

import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'

const SearchField = ({ inputProps, placeholder, setValue, value }) => {
  const handleChange = event => setValue(event.target.value)

  return (
    <TextField
      fullWidth
      InputProps={{
        ...inputProps,
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
  inputProps: P.object,
  placeholder: P.string.isRequired,
  setValue: P.func.isRequired,
  value: P.string,
}

SearchField.defaultProps = {
  inputProps: {},
  value: '',
}

export { SearchField }
