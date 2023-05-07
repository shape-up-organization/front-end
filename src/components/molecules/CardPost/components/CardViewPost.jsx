import { useEffect, useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { Avatar } from '@atoms/Avatar'
import { Photo } from '@atoms/Photo'
import { Carousel } from '@molecules/Carousel'
import { TextArea } from '@molecules/TextArea'
import { SimpleModal } from '@templates/Modal'

import apiPosts from '@api/services/posts'
import getCommentsByPostIdMock from '@mocks/posts/getCommentsByPostId'
import { formatLocalDate, reformatSimpleDate } from '@utils/helpers/dateTime'

const Content = ({ postData }) => {
  const { photos } = postData
  const { t } = useTranslation()
  const isLessThanSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const isGreaterThanMedium = useMediaQuery(theme => theme.breakpoints.up('md'))

  const [isLoadingComments, setIsLoadingComments] = useState(true)
  const [isSendingComment, setIsSendingComment] = useState(false)
  const [comments, setComments] = useState([])
  const [messageText, setMessageText] = useState('')

  const handleSendMessage = async () => {
    setIsSendingComment(true)

    const response = await apiPosts.sendComment(postData.id, messageText)
    setIsLoadingComments(false)

    if (response.status === 201) {
      getComments()
    }
  }

  const getComments = async () => {
    setIsLoadingComments(true)

    const response = await apiPosts.getCommentsByPostId(postData.id)
    console.log(response)
    setIsLoadingComments(false)

    setComments(getCommentsByPostIdMock.data)
  }

  useEffect(() => {
    getComments()
  }, [])

  return (
    <Grid container height="100%">
      {isGreaterThanMedium && (
        <Grid item xs={7}>
          <Grid
            item
            display="flex"
            height="100%"
            justifyContent="center"
            padding={{
              xs: 0,
              sm: 2,
            }}
            maxHeight={isLessThanSmall ? 320 : 640}
            width="100%"
          >
            <Box component={Paper} height="100%" p={2} width="100%">
              <Carousel>
                {photos.map(({ alt, src }) => (
                  <Photo
                    key={alt}
                    alt={alt}
                    animationSpeed={0}
                    src={src}
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                ))}
              </Carousel>
            </Box>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} md={5}>
        <Grid
          item
          display="flex"
          justifyContent="center"
          minHeight={
            // eslint-disable-next-line no-nested-ternary
            isLessThanSmall ? '100vh' : isGreaterThanMedium ? '100%' : '80vh'
          }
          padding={{
            xs: 0,
            sm: 2,
          }}
          width="100%"
        >
          <Stack
            component={Paper}
            height={isLessThanSmall ? '100vh' : 608}
            justifyContent="space-between"
            p={2}
            rowGap={1}
            width="100%"
          >
            <Stack height="100%" overflow="auto">
              {isLoadingComments ? (
                <CircularProgress />
              ) : (
                (comments.length &&
                  comments?.map(
                    ({
                      body,
                      date,
                      id,
                      name,
                      pictureProfile,
                      username,
                      xp,
                    }) => (
                      <Stack key={id} mb={2}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          width="100%"
                        >
                          <Stack columnGap={1} direction="row">
                            <Avatar
                              avatarSize="mini"
                              user={{ pictureProfile, username, xp }}
                            />
                            <Typography fontWeight={600} variant="body2">
                              {name}
                            </Typography>
                          </Stack>
                          <Typography
                            color="text.secondary"
                            fontWeight={500}
                            variant="caption"
                          >
                            {reformatSimpleDate(formatLocalDate(date))}
                          </Typography>
                        </Stack>
                        <Typography fontWeight={300} ml={4} variant="body2">
                          {body}
                        </Typography>
                      </Stack>
                    )
                  )) || (
                  <Stack
                    alignContent="center"
                    height="100%"
                    justifyContent="center"
                    width="100%"
                  >
                    <Typography
                      color="text.secondary"
                      fontWeight={500}
                      textAlign="center"
                      variant="caption"
                    >
                      {t('pages.feed.others.noComments')}
                    </Typography>
                  </Stack>
                )
              )}
            </Stack>
            <TextArea
              handleSendMessage={handleSendMessage}
              interfaceOptions={{
                alwaysShowBottom: true,
                isLoading: isLoadingComments || isSendingComment,
                textAreaProps: {
                  maxRows: 3,
                },
              }}
              messageState={[messageText, setMessageText]}
              texts={{
                sendButton: t('pages.feed.others.sendCommentButton'),
                inputPlaceholder: t(
                  'pages.feed.others.commentInputPlaceholder'
                ),
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  )
}

Content.propTypes = {
  postData: P.shape({
    id: P.string.isRequired,
    photos: P.arrayOf(
      P.shape({
        alt: P.string.isRequired,
        src: P.string.isRequired,
      })
    ),
  }).isRequired,
}

const CardViewPost = ({ handleClose, open, postData }) => (
  <SimpleModal
    Component={Content}
    componentArgs={{ postData }}
    dialogProps={{
      maxWidth: 'lg',
    }}
    handleClose={handleClose}
    open={open}
  />
)

CardViewPost.propTypes = {
  handleClose: P.func.isRequired,
  open: P.bool,
  postData: P.object.isRequired,
}

CardViewPost.defaultProps = {
  open: false,
}

export { CardViewPost }
