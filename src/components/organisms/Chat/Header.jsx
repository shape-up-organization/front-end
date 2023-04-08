import { useTranslation } from 'react-i18next'

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

import { useChat } from '@contexts'

import { useStyles } from './Header.styles'

const Header = () => {
  const { t } = useTranslation()
  const { classes } = useStyles()

  const {
    activeChat: { name },
  } = useChat()

  return (
    <Paper className={classes.header}>
      <Grid
        container
        justifyContent="space-between"
        height="100%"
        px={4}
        py={1}
      >
        <Grid item xs={11} height="100%">
          <Stack alignItems="center" direction="row" height="100%" spacing={2}>
            <Tooltip title={t('pages.chat.tooltip.chatAvatarButton')}>
              <IconButton>
                <Avatar alt={t('pages.chat.alt.chatAvatarHeader', { name })} />
              </IconButton>
            </Tooltip>
            <Typography
              color="link"
              fontWeight="900"
              textTransform="none"
              variant="subtitle1"
            >
              {name}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={1} height="100%">
          <Box
            alignItems="center"
            display="flex"
            height="100%"
            justifyContent="flex-end"
            width="100%"
          >
            <IconButton>
              <MoreHorizRoundedIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export { Header }
