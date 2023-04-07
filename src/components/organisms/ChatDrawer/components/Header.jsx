import P from 'prop-types'

import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material'

import { useChat } from '@contexts'

import { useStyles } from './Header.styles'

const Header = ({ drawerOpenStates, chatData }) => {
  const [, setDrawerOpen] = drawerOpenStates

  const { removeChat } = useChat()

  const { classes } = useStyles({
    haveUnreadMessages: !!chatData.unreadMessages,
  })

  const toggleDrawerOpen = () => setDrawerOpen(current => !current)

  return (
    <Button
      className={classes.header}
      component="div"
      onClick={toggleDrawerOpen}
      tabIndex={-1}
    >
      <Grid container px={2} justifyContent="space-between">
        <Grid item xs={1}>
          <Tooltip title={`${chatData.name} picture photo`}>
            <Avatar alt={`${chatData.name} picture photo`} />
          </Tooltip>
        </Grid>
        <Grid item xs={6} alignItems="center" display="flex" textAlign="left">
          <Typography
            color="link"
            fontWeight="900"
            textTransform="none"
            variant="subtitle1"
          >
            {chatData.name}
          </Typography>
        </Grid>
        <Grid item xs={3} display="flex" justifyContent="end">
          <Tooltip title="Fechar chat">
            <IconButton
              type="button"
              onClick={() => removeChat(chatData.username)}
            >
              <CloseRoundedIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Button>
  )
}

Header.propTypes = {
  drawerOpenStates: P.arrayOf(P.oneOfType([P.bool, P.func])).isRequired,
  chatData: P.object.isRequired,
}

export { Header }
