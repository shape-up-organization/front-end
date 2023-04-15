import P from 'prop-types'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

const AutocompleteSearch = ({
  options,
  placeholder,
  textFieldParams,
  ...rest
}) => (
  <Autocomplete
    fullWidth
    options={options}
    renderInput={params => (
      <TextField placeholder={placeholder} {...textFieldParams} {...params} />
    )}
    {...rest}
  />
)

AutocompleteSearch.propTypes = {
  options: P.arrayOf(P.object).isRequired,
  placeholder: P.string,
  textFieldParams: P.object,
}

AutocompleteSearch.defaultProps = {
  placeholder: '',
  textFieldParams: {},
}

export { AutocompleteSearch }
