import { useTranslation } from 'react-i18next'

import { Divider } from '@atoms/Divider'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Zoom,
  useTheme,
} from '@mui/material'

import { useVisible } from '@hooks'

import { ChatTypeSwitcher } from './components/ChatTypeSwitcher'
import { ChatsList } from './components/ChatsList'
import { SearchField } from './components/SearchField'

const MessagesList = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const [headerRef, isHeaderVisible] = useVisible()

  const handleScrollToTop = () =>
    headerRef.current.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <Zoom in={!isHeaderVisible}>
        <Tooltip
          sx={{
            bgcolor: 'background.default',
            ml: 1,
            mt: 1,
            position: 'absolute',
            zIndex: theme.zIndex.appBar,
          }}
          title={t('pages.chat.tooltip.scrollToTop')}
        >
          <IconButton color="primary" onClick={handleScrollToTop} type="button">
            <ArrowUpwardRoundedIcon />
          </IconButton>
        </Tooltip>
      </Zoom>
      <Grid container px={{ xs: 1, lg: 3, xl: 8 }}>
        <Grid item xs={12} ref={headerRef}>
          <Stack spacing={2}>
            <Typography pt={2} textAlign="center" variant="h5">
              {t('pages.chat.others.messageListTitle')}
            </Typography>
            <Box px={{ xs: 2, sm: 8, md: 4, lg: 8 }} width="100%">
              <SearchField />
            </Box>
            <Box>
              <ChatTypeSwitcher />
              <Divider color="disabled" size="small" />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ChatsList />
        </Grid>
      </Grid>
    </>
  )
}

export { MessagesList }
