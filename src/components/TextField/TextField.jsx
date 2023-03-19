import P from 'prop-types'

import {
  FormControl,
  FormHelperText,
  Grow,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'
import ReactInputMask from 'react-input-mask'

const TextField = ({
  endAdornment,
  error,
  label,
  mask,
  name,
  register,
  type,
}) => (
  <FormControl
    error={!!error}
    fullWidth
    variant="outlined"
    {...(!!register && register(name))}
  >
    <InputLabel>{label}</InputLabel>
    <ReactInputMask mask={mask}>
      {() => (
        <OutlinedInput
          autoComplete="off"
          endAdornment={endAdornment}
          label={label}
          name={name}
          type={type}
        />
      )}
    </ReactInputMask>

    <FormHelperText component="span">
      <Grow in={!!error} unmountOnExit>
        <Typography
          color="error"
          component="p"
          fontWeight={500}
          gutterBottom
          variant="caption"
        >
          {error}
        </Typography>
      </Grow>
    </FormHelperText>
  </FormControl>
)

TextField.propTypes = {
  endAdornment: P.node,
  error: P.string,
  label: P.string.isRequired,
  mask: P.string,
  name: P.string.isRequired,
  register: P.func,
  type: P.string,
}

TextField.defaultProps = {
  endAdornment: null,
  error: '',
  mask: null,
  register: null,
  type: 'text',
}

export { TextField }
