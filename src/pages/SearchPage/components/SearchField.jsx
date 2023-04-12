import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import { TextField } from '@mui/material'

const SearchField = ({ value, setValue }) => {
  const { t } = useTranslation()

  const handleChange = event => setValue(event.target.value)

  return (
    <TextField
      fullWidth
      onChange={handleChange}
      placeholder={t('pages.search.others.searchPlaceholder')}
      value={value}
    />
  )
}

SearchField.propTypes = {
  value: P.string.isRequired,
  setValue: P.func.isRequired,
}

export { SearchField }
