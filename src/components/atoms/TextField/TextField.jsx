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
  autoFocus,
  disabled,
  endAdornment,
  error,
  forceShrink,
  label,
  mask,
  name,
  register,
  type,
}) => {
  const shrink = forceShrink
    ? {
        shrink: forceShrink,
      }
    : {}

  return (
    <FormControl
      error={!!error}
      fullWidth
      variant="outlined"
      {...(!!register && register(name))}
    >
      <InputLabel {...shrink}>{label}</InputLabel>
      <ReactInputMask disabled={disabled} mask={mask}>
        {props => (
          <OutlinedInput
            autoComplete="off"
            autoFocus={autoFocus}
            disabled={disabled}
            endAdornment={endAdornment}
            label={label}
            name={name}
            type={type}
            {...props}
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
}

TextField.propTypes = {
  autoFocus: P.bool,
  disabled: P.bool,
  endAdornment: P.node,
  error: P.string,
  forceShrink: P.bool,
  label: P.string.isRequired,
  mask: P.string,
  name: P.string,
  register: P.func,
  type: P.string,
}

TextField.defaultProps = {
  autoFocus: false,
  disabled: false,
  endAdornment: null,
  error: '',
  forceShrink: false,
  mask: null,
  name: '',
  register: null,
  type: 'text',
}

export { TextField }
