import { useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Box, Button, Fade, Paper, Stack, useMediaQuery } from '@mui/material'

import { Photo } from '@atoms/Photo'
import { Carousel } from '@molecules/Carousel'
import { TextArea } from '@molecules/TextArea'

import apiPosts from '@api/services/posts'

const PublishStep = ({
  images,
  handleClose,
  messageText: messageTextFromStart,
  refreshFeed,
}) => {
  const { t } = useTranslation()
  const lessThanLarge = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const [messageText, setMessageText] = useState(messageTextFromStart || '')
  const [isLoading, setIsLoading] = useState(false)

  const handleCreatePost = async () => {
    setIsLoading(true)

    const payload = new FormData()
    if (messageText) payload.append('description', messageText)
    images.forEach(image => payload.append('file', image.data))

    const response = await apiPosts.createPost(payload)

    if (response.status !== 200) return

    setMessageText('')
    setIsLoading(false)
    refreshFeed()
    handleClose()
  }

  return (
    <Fade in unmountOnExit timeout={800}>
      <Stack height="100%" width="100%" overflow="auto">
        <Stack
          direction={lessThanLarge ? 'column' : 'row'}
          height="90%"
          gap={4}
          p={4}
          width="100%"
        >
          <Box
            height="100%"
            minHeight="56vh"
            width={lessThanLarge ? '100%' : '68%'}
          >
            <Box component={Paper} height="100%" p={2} width="100%">
              <Carousel autoPlay>
                {images.map(image => (
                  <Photo
                    key={image?.id}
                    alt={image?.id}
                    animationSpeed={0}
                    src={image?.data ? URL.createObjectURL(image.data) : ''}
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                ))}
              </Carousel>
            </Box>
          </Box>
          <Box gap={20} pb={4} width={lessThanLarge ? '100%' : '32%'}>
            <Box component={Paper} p={2} pb={3}>
              <TextArea
                interfaceOptions={{
                  alwaysShowBottom: true,
                  isLoading,
                  textAreaProps: {
                    rows: 10,

                    inputProps: {
                      maxLength: 252,
                      spellCheck: 'false',
                    },
                  },
                }}
                messageState={[messageText, setMessageText]}
                texts={{
                  inputPlaceholder: t('pages.feed.others.postInputPlaceholder'),
                }}
              />
              <Button
                disabled={isLoading}
                fullWidth
                onClick={handleCreatePost}
                sx={{ mt: 4 }}
                variant="contained"
              >
                CRIAR
              </Button>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Fade>
  )
}

PublishStep.propTypes = {
  images: P.arrayOf(P.object).isRequired,
  handleClose: P.func.isRequired,
  messageText: P.string,
  refreshFeed: P.func.isRequired,
}

PublishStep.defaultProps = {
  messageText: '',
}

export { PublishStep }
