import P from 'prop-types'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, IconButton, Tooltip, Typography } from '@mui/material'

import { useStyles } from './Header.styles'

const Header = ({ drawerOpenStates }) => {
  const [drawerOpen, setDrawerOpen] = drawerOpenStates

  const toggleDrawerOpen = () => setDrawerOpen(current => !current)

  const { classes } = useStyles()

  return (
    <Button
      className={classes.header}
      component="div"
      onClick={toggleDrawerOpen}
      tabIndex={-1}
    >
      <Typography
        color="link"
        fontWeight="900"
        textTransform="none"
        variant="subtitle1"
      >
        Mensagens
      </Typography>
      <Tooltip title={drawerOpen ? 'Esconder mensagens' : 'Mostrar mensagens'}>
        <IconButton type="button">
          {drawerOpen ? (
            <ExpandMoreIcon className={classes.icon} fontSize="small" />
          ) : (
            <ExpandLessIcon className={classes.icon} fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
    </Button>
  )
}

Header.propTypes = {
  drawerOpenStates: P.arrayOf(P.oneOfType([P.bool, P.func])).isRequired,
}

export { Header }
