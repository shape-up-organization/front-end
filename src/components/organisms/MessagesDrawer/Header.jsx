import P from 'prop-types'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, IconButton, Typography } from '@mui/material'

import { useStyles } from './Header.styles'

const Header = ({ expanded, handleClick }) => {
  const { classes } = useStyles()
  return (
    <Button
      className={classes.header}
      component="div"
      onClick={handleClick}
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
      <IconButton type="button">
        {expanded ? (
          <ExpandMoreIcon className={classes.icon} fontSize="small" />
        ) : (
          <ExpandLessIcon className={classes.icon} fontSize="small" />
        )}
      </IconButton>
    </Button>
  )
}

Header.propTypes = {
  expanded: P.bool,
  handleClick: P.func.isRequired,
}

Header.defaultProps = {
  expanded: false,
}
export { Header }
