import { useRef, useState } from 'react'

import emojisData from '@emoji-mart/data'
import EmojiPicker from '@emoji-mart/react'
import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import SendIcon from '@mui/icons-material/Send'
import {
  Badge,
  CircularProgress,
  Fade,
  Grid,
  IconButton,
  Popover,
  Stack,
  TextField,
  Tooltip,
  Typography,
  Zoom,
  useTheme,
} from '@mui/material'

const TextArea = ({
  handleSendMessage,
  interfaceOptions,
  messageState,
  scrollRelated,
  texts,
}) => {
  const [messageText, setMessageText] = messageState
  const { alwaysShowBottom, isLoading, textAreaProps } = interfaceOptions

  const { t, i18n } = useTranslation()
  const theme = useTheme()

  const [showBottomOptions, setShowBottomOptions] = useState(false)
  const [emojiPickerAnchorEl, setEmojiPickerAnchorEl] = useState(null)
  const emojiButtonRef = useRef(null)
  const inputRef = useRef(null)
  const bottomVisibility =
    showBottomOptions ||
    !!emojiPickerAnchorEl ||
    messageText ||
    alwaysShowBottom
  const maxCharsLength = textAreaProps?.inputProps?.maxLength

  const handleChangeMessageText = ({ target: { value } }) => {
    if (value.length >= maxCharsLength) {
      setMessageText(value.slice(0, maxCharsLength))
      return
    }
    setMessageText(value)
  }

  const handleCloseEmojiPicker = () => setEmojiPickerAnchorEl(null)
  const handleOpenEmojiPicker = event =>
    setEmojiPickerAnchorEl(event.currentTarget)

  const handleSelectEmoji = emoji => {
    setMessageText(messageText + emoji.native)
    handleCloseEmojiPicker()
    inputRef.current.firstChild.focus()
  }

  const showBottom = () => setShowBottomOptions(true)
  const hideBottom = () => setShowBottomOptions(false)

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (event.shiftKey) {
        if (messageText?.length >= maxCharsLength) return
        setMessageText(`${messageText}\n`)
        return
      }

      if (event.ctrlKey) {
        emojiButtonRef.current.click()
        return
      }

      if (!isLoading) handleSendMessage()
    }
  }

  return (
    <Grid
      container
      alignItems="center"
      rowGap={0}
      sx={{
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.standard,
        }),
        [theme.breakpoints.down('md')]: {
          bottom: 0,
          position: 'sticky',
        },
      }}
    >
      <Grid item xs={12}>
        <Badge
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          badgeContent={
            scrollRelated && (
              <Zoom
                in={
                  !scrollRelated.isListBottomVisible &&
                  !scrollRelated.isScrollingDown
                }
                easing="ease-out"
              >
                <Tooltip
                  placement="top-start"
                  title={t(
                    'components.molecules.textArea.tooltips.scrollToBottom'
                  )}
                  sx={{
                    bgcolor: 'background.default',
                    mt: 1,
                    ml: 1,
                    zIndex: 1200,
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={scrollRelated.handleScrollToBottom}
                    type="button"
                  >
                    <ArrowDownwardRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Zoom>
            )
          }
          sx={{ width: '100%' }}
        >
          <TextField
            disabled={isLoading}
            fullWidth
            inputRef={inputRef}
            multiline
            onBlur={hideBottom}
            onChange={handleChangeMessageText}
            onFocus={showBottom}
            onKeyPress={handleKeyPress}
            placeholder={texts.inputPlaceholder}
            value={messageText}
            variant="outlined"
            sx={{
              mb: 1,
            }}
            {...textAreaProps}
          />
        </Badge>
      </Grid>
      <Fade in={!!bottomVisibility}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs>
              <Tooltip
                placement="bottom-start"
                title={t(
                  'components.molecules.textArea.tooltips.emojiPickerButton'
                )}
              >
                <IconButton
                  color="primary"
                  disabled={isLoading}
                  onClick={handleOpenEmojiPicker}
                  ref={emojiButtonRef}
                >
                  <EmojiEmotionsIcon />
                </IconButton>
              </Tooltip>
              <Popover
                anchorEl={emojiPickerAnchorEl}
                onClose={handleCloseEmojiPicker}
                open={!!emojiPickerAnchorEl}
              >
                <EmojiPicker
                  data={emojisData}
                  locale={i18n.resolvedLanguage}
                  maxFrequentRows={2}
                  onEmojiSelect={handleSelectEmoji}
                  perLine={7}
                  previewPosition="none"
                  theme={theme.palette.mode}
                />
              </Popover>
            </Grid>
            {!!textAreaProps?.inputProps?.maxLength && (
              <Grid
                item
                alignItems="center"
                display="flex"
                justifyContent="flex-end"
              >
                <Typography
                  color={
                    messageText.length >= maxCharsLength ? 'error' : 'inherit'
                  }
                  fontWeight={messageText.length >= maxCharsLength ? 500 : 400}
                  variant="body2"
                >
                  {`${messageText.length}/${textAreaProps.inputProps.maxLength}`}
                </Typography>
              </Grid>
            )}
            {handleSendMessage && (
              <Grid item display="flex" justifyContent="flex-end" ml={2}>
                {isLoading ? (
                  <Stack justifyContent="center" pr={1}>
                    <CircularProgress size={20} />
                  </Stack>
                ) : (
                  <Tooltip placement="top-end" title={texts.sendButton}>
                    <span>
                      <IconButton
                        color="primary"
                        disabled={!messageText.trim()}
                        onClick={handleSendMessage}
                      >
                        <SendIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Fade>
    </Grid>
  )
}

TextArea.propTypes = {
  handleSendMessage: P.func,
  interfaceOptions: P.shape({
    alwaysShowBottom: P.bool,
    isLoading: P.bool,
    textAreaProps: P.object,
  }),
  isLoading: P.bool,
  messageState: P.arrayOf(P.any),
  scrollRelated: P.shape({
    handleScrollToBottom: P.func,
    isListBottomVisible: P.bool,
    isScrollingDown: P.bool,
  }),
  texts: P.shape({
    inputPlaceholder: P.string,
    sendButton: P.string,
  }).isRequired,
}

TextArea.defaultProps = {
  handleSendMessage: null,
  interfaceOptions: {
    alwaysShowBottom: false,
    isLoading: false,
    textAreaProps: {},
  },
  isLoading: false,
  messageState: [null, () => {}],
  scrollRelated: {
    handleScrollToBottom: () => {},
    isListBottomVisible: true,
    isScrollingDown: false,
  },
}

export { TextArea }
