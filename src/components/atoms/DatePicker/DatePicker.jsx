import P from 'prop-types'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Box, FormHelperText, Grow, Typography } from '@mui/material'
import { DatePicker as DatePickerMUI } from '@mui/x-date-pickers'

import { masks } from '@utils/constants/masks'

const DatePicker = ({ autoFocus, control, errors, label, name }) => {
  const { i18n } = useTranslation()

  const hasErrors = !!errors[name] && !!errors[name][name]
  const errorMessage = hasErrors ? errors[name][name].message : ''

  return (
    <Box>
      <Controller
        control={control}
        defaultValue={null}
        name={name}
        rules={{
          required: true,
        }}
        render={({ field: { ref, ...field } }) => {
          const getErrorColor = cssRule =>
            hasErrors && {
              [cssRule]: theme => {
                const color = theme.palette.error.main
                return `${color}`
              },
            }

          return (
            <DatePickerMUI
              format={masks.DATES[i18n.resolvedLanguage]}
              inputRef={ref}
              autoFocus={autoFocus}
              label={label}
              maxDate={new Date()}
              sx={{
                width: '100%',

                '& .MuiButtonBase-root': {
                  marginRight: 0,
                },
                '& .MuiInputLabel-root': {
                  ...getErrorColor('color'),
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  ...getErrorColor('borderColor'),
                },
              }}
              {...field}
            />
          )
        }}
      />
      <FormHelperText component="span">
        <Grow in={hasErrors} unmountOnExit>
          <Typography
            color="error"
            component="p"
            fontWeight={500}
            gutterBottom
            sx={{ padding: theme => theme.spacing(1, 2) }}
            variant="caption"
          >
            {hasErrors && errorMessage}
          </Typography>
        </Grow>
      </FormHelperText>
    </Box>
  )
}

DatePicker.propTypes = {
  autoFocus: P.bool,
  control: P.object.isRequired,
  errors: P.object.isRequired,
  label: P.string.isRequired,
  name: P.string.isRequired,
}

DatePicker.defaultProps = {
  autoFocus: false,
}

export { DatePicker }
