import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import FilterRoundedIcon from '@mui/icons-material/FilterRounded'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'

import { Divider } from '@atoms/Divider'
import { TextArea } from '@molecules/TextArea'

import apiPosts from '@api/services/posts'

import { PostModal } from './components/PostModal'

const CardCreatePost = () => {
  const { t } = useTranslation()

  const [messageText, setMessageText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenPostModal, setIsOpenPostModal] = useState(false)

  const handleOpenPostModal = () => setIsOpenPostModal(true)
  const handleClosePostModal = () => setIsOpenPostModal(false)

  const handleCreatePost = async () => {
    if (!messageText) return
    setIsLoading(true)

    const payload = { description: messageText }

    const response = await apiPosts.createPostWithoutPhoto(payload)
    setIsLoading(false)

    if (response.status !== 201) return

    setMessageText('')
    setIsLoading(false)
    refreshFeed()
  }

  const refreshFeed = async () => {
    console.log('refreshFeed')
  }

  return (
    <>
      <Stack
        alignItems="center"
        component={Paper}
        rowGap={1}
        px={{ xs: 3, xl: 8 }}
        py={3}
        width="100%"
      >
        <Box width="100%">
          <TextArea
            handleSendMessage={handleCreatePost}
            interfaceOptions={{
              isLoading,
              textAreaProps: {
                maxRows: 7,
                inputProps: {
                  maxLength: 252,
                  spellCheck: 'false',
                },
              },
            }}
            messageState={[messageText, setMessageText]}
            texts={{
              sendButton: t('pages.feed.tooltip.sendPostButton'),
              inputPlaceholder: t('pages.feed.others.postInputPlaceholder'),
            }}
          />
        </Box>
        <Divider color="disabled" size="small" />
        <Box pt={1}>
          <Button
            color="inherit"
            onClick={handleOpenPostModal}
            size="large"
            startIcon={<FilterRoundedIcon />}
            sx={{ px: 3 }}
          >
            <Typography textTransform="none" variant="body2">
              {t('components.molecules.cardCreatePost.others.buttonOpen')}
            </Typography>
          </Button>
        </Box>
      </Stack>
      <PostModal
        handleClose={handleClosePostModal}
        open={isOpenPostModal}
        messageText={messageText}
        refreshFeed={refreshFeed}
      />
    </>
  )
}

export { CardCreatePost }
