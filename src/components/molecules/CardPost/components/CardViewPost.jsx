import { useEffect, useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import CloseRounded from '@mui/icons-material/CloseRounded'
import {
  Box,
  Grid,
  IconButton,
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
import { useVisible } from '@hooks'
import { formatLocalDate, reformatSimpleDate } from '@utils/helpers/dateTime'
import {
  charactersToLineBreaks,
  lineBreaksToCharacters,
} from '@utils/helpers/strings'

const Content = ({ handleClose, postData }) => {
  const { photos } = postData
  const { t } = useTranslation()
  const isLessThanSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const isGreaterThanMedium = useMediaQuery(theme => theme.breakpoints.up('md'))

  const [isLoadingComments, setIsLoadingComments] = useState(true)
  const [isSendingComment, setIsSendingComment] = useState(false)
  const [comments, setComments] = useState([])
  const [messageText, setMessageText] = useState('')
  const [isScrollingDown, setIsScrollingDown] = useState(true)

  const [listBottomRef, isListBottomVisible] = useVisible()

  const getComments = async () => {
    setIsLoadingComments(true)

    const response = await apiPosts.getCommentsByPostId(postData.id)

    setIsLoadingComments(false)

    setComments(
      response.data.map(comment => ({
        ...comment,
        createdAt: reformatSimpleDate(formatLocalDate(comment.createdAt)),
        commentMessage: charactersToLineBreaks(comment.commentMessage),
      }))
    )
  }

  const handleSendMessage = async () => {
    setIsSendingComment(true)

    const payload = {
      post_id: postData.id,
      comment_message: lineBreaksToCharacters(messageText),
    }

    const response = await apiPosts.sendComment(payload)
    setIsSendingComment(false)

    if (response.status === 201) {
      setMessageText('')
      await getComments()
    }
  }

  useEffect(() => {
    getComments()
  }, [])

  const handleScrollToBottom = () => {
    setIsScrollingDown(true)
    listBottomRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    setIsScrollingDown(false)
  }, [comments, isListBottomVisible])

  return (
    <Grid
      container
      minHeight={
        // eslint-disable-next-line no-nested-ternary
        isLessThanSmall ? '100vh' : isGreaterThanMedium ? '100%' : '80vh'
      }
      overflow="hidden"
    >
      <Grid
        item
        xs={12}
        position="absolute"
        m={isLessThanSmall ? 1 : 3}
        right={0}
        top={0}
      >
        <Stack direction="row" justifyContent="flex-end" width="100%">
          <IconButton onClick={handleClose}>
            <CloseRounded />
          </IconButton>
        </Stack>
      </Grid>
      {isGreaterThanMedium && (
        <Grid
          item
          xs={postData.photos.length ? 7 : 0}
          display={postData.photos.length ? 'inherit' : 'none'}
        >
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
                {photos.map(photo => (
                  <Photo
                    key={photo}
                    alt={photo}
                    animationSpeed={0}
                    src={photo}
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
      <Grid item xs={12} md={postData.photos.length ? 5 : 12}>
        <Grid
          item
          display="flex"
          justifyContent="center"
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
            <Stack height="100%" overflow="auto" mt={5}>
              {comments.length ? (
                <>
                  {comments.map(
                    ({
                      commentMessage,
                      createdAt,
                      commentId,
                      name,
                      lastName,
                      pictureProfile,
                      username,
                      xp,
                    }) => (
                      <Stack key={commentId} mb={2}>
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
                              {`${name} ${lastName}`}
                            </Typography>
                          </Stack>
                          <Typography
                            color="text.secondary"
                            fontWeight={500}
                            mr={2}
                            variant="caption"
                          >
                            {createdAt}
                          </Typography>
                        </Stack>
                        <Typography
                          fontWeight={300}
                          ml={4}
                          sx={{ wordBreak: 'break-word' }}
                          variant="body2"
                          whiteSpace="pre-wrap"
                        >
                          {commentMessage}
                        </Typography>
                      </Stack>
                    )
                  )}
                  <Box component="span" ref={listBottomRef} />
                </>
              ) : (
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
              scrollRelated={{
                handleScrollToBottom,
                isListBottomVisible,
                isScrollingDown,
              }}
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
  handleClose: P.func.isRequired,
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
    componentArgs={{ handleClose, postData }}
    dialogProps={{
      maxWidth: postData.photos.length ? 'lg' : 'sm',
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
