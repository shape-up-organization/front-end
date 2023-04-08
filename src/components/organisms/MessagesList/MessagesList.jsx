import { useEffect } from 'react'

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

import { useChat } from '@contexts'
import { useVisible } from '@hooks'

import { ChatTypeSwitcher } from './components/ChatTypeSwitcher'
import { ChatsList } from './components/ChatsList'
import { SearchField } from './components/SearchField'

const MessagesList = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const { chatsList, loadData } = useChat()
  const [headerRef, isHeaderVisible] = useVisible()

  useEffect(() => {
    loadData()
  }, [])

  const handleScrollToTop = () =>
    headerRef.current.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <Zoom in={!isHeaderVisible && chatsList?.length > 0}>
        <Tooltip
          sx={{
            bgcolor: 'background.default',
            mt: 1,
            ml: 1,
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
      <Grid container px={4}>
        <Grid item xs={12} ref={headerRef}>
          <Stack spacing={2}>
            <Typography pt={2} textAlign="center" variant="h5">
              {t('pages.chat.others.messageListTitle')}
            </Typography>
            <SearchField />
            <Box>
              <ChatTypeSwitcher />
              <Divider />
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
