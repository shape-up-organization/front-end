import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Button, CircularProgress, Typography } from '@mui/material'

const Options = ({ menuItems, menuItemLoading }) => {
  const { t } = useTranslation()

  return menuItems.map(
    ({ name, value: { color, icon, onClick, text, variant } }) => (
      <Button
        color={color}
        disabled={!!menuItemLoading}
        fullWidth
        key={name}
        onClick={onClick}
        startIcon={menuItemLoading === name ? null : icon()}
        sx={{ px: 2 }}
        variant={variant}
      >
        {menuItemLoading === name ? (
          <CircularProgress size={24} />
        ) : (
          <Typography
            fontWeight={700}
            textTransform="uppercase"
            variant="body2"
          >
            {t(`components.molecules.${text}`)}
          </Typography>
        )}
      </Button>
    )
  )
}

Options.propTypes = {
  menuItems: P.arrayOf(
    P.shape({
      name: P.string,
      value: P.shape({
        color: P.string,
        icon: P.func,
        onClick: P.func,
        text: P.string,
        variant: P.string,
      }),
    })
  ),
  menuItemLoading: P.string,
}

Options.defaultProps = {
  menuItems: [],
  menuItemLoading: '',
}

export { Options }
