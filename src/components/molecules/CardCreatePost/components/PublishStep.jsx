import { useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Box, Fade, Paper, Stack, useMediaQuery } from '@mui/material'

import { Photo } from '@atoms/Photo'
import { Carousel } from '@molecules/Carousel'
import { TextArea } from '@molecules/TextArea'

const PublishStep = ({ images }) => {
  const { t } = useTranslation()
  const lessThanLarge = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const [messageText, setMessageText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCreatePost = async () => {
    setIsLoading(true)

    console.log('messageText', messageText)
    console.log('images', images)

    setTimeout(() => {
      setMessageText('')
      setIsLoading(false)
    }, 1000)
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
            <Box component={Paper} height="100%" p={2}>
              <Carousel>
                {images.map(image => (
                  <Photo
                    key={image?.id}
                    alt={image?.id}
                    animationSpeed={0}
                    height="100%"
                    src={image?.data ? URL.createObjectURL(image.data) : ''}
                    style={{ objectFit: 'contain' }}
                    width="100%"
                  />
                ))}
              </Carousel>
            </Box>
          </Box>
          <Box width={lessThanLarge ? '100%' : '32%'} pb={4}>
            <Box component={Paper} p={2} pb={3}>
              <TextArea
                handleSendMessage={handleCreatePost}
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
                  sendButton: t('pages.feed.tooltip.sendPostButton'),
                  inputPlaceholder: t('pages.feed.others.postInputPlaceholder'),
                }}
              />
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Fade>
  )
}

PublishStep.propTypes = {
  images: P.arrayOf(P.object).isRequired,
}

export { PublishStep }
