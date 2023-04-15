import emojisData from '@emoji-mart/data'
import EmojiPicker from '@emoji-mart/react'
import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import SendIcon from '@mui/icons-material/Send'
import {
  Badge,
  Grid,
  IconButton,
  Popover,
  TextField,
  Tooltip,
  Zoom,
} from '@mui/material'

const Footer = ({
  emojiButtonRef,
  emojiPickerAnchorEl,
  emojiPickerOpen,
  handleChangeMessageText,
  handleCloseEmojiPicker,
  handleKeyPress,
  handleOpenEmojiPicker,
  handleSelectEmoji,
  handleSendMessage,
  handleScrollToBottom,
  isListBottomVisible,
  isScrollingDown,
  messageText,
}) => {
  const { t } = useTranslation()

  return (
    <Grid container alignItems="center" height="20%" rowGap={0}>
      <Grid item xs={12}>
        <Badge
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          badgeContent={
            <Zoom
              in={!isListBottomVisible && !isScrollingDown}
              easing="ease-out"
            >
              <Tooltip
                placement="top-start"
                title={t('pages.chat.tooltip.scrollToBottom')}
                sx={{
                  bgcolor: 'background.default',
                  mt: 1,
                  ml: 1,
                  zIndex: 1200,
                }}
              >
                <IconButton
                  color="primary"
                  onClick={handleScrollToBottom}
                  type="button"
                >
                  <ArrowDownwardRoundedIcon />
                </IconButton>
              </Tooltip>
            </Zoom>
          }
          sx={{ width: '100%' }}
        >
          <TextField
            fullWidth
            onChange={handleChangeMessageText}
            onKeyPress={handleKeyPress}
            maxRows={3}
            multiline
            placeholder={t('pages.chat.others.messageInputPlaceholder')}
            value={messageText}
            variant="outlined"
          />
        </Badge>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={2}>
            <Tooltip
              placement="bottom-start"
              title={t('pages.chat.tooltip.emojiPickerButton')}
            >
              <IconButton
                color="primary"
                onClick={handleOpenEmojiPicker}
                ref={emojiButtonRef}
              >
                <EmojiEmotionsIcon />
              </IconButton>
            </Tooltip>
            <Popover
              anchorEl={emojiPickerAnchorEl}
              onClose={handleCloseEmojiPicker}
              open={emojiPickerOpen}
            >
              <EmojiPicker
                data={emojisData}
                onEmojiSelect={handleSelectEmoji}
              />
            </Popover>
          </Grid>
          <Grid item xs={10} display="flex" justifyContent="flex-end">
            <Tooltip
              placement="top-end"
              title={t('pages.chat.tooltip.sendMessageButton')}
            >
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

Footer.propTypes = {
  emojiButtonRef: P.shape({ current: P.any }).isRequired,
  emojiPickerAnchorEl: P.shape({ current: P.any }),
  emojiPickerOpen: P.bool.isRequired,
  handleChangeMessageText: P.func.isRequired,
  handleCloseEmojiPicker: P.func.isRequired,
  handleKeyPress: P.func.isRequired,
  handleOpenEmojiPicker: P.func.isRequired,
  handleSelectEmoji: P.func.isRequired,
  handleSendMessage: P.func.isRequired,
  handleScrollToBottom: P.func.isRequired,
  isListBottomVisible: P.bool.isRequired,
  isScrollingDown: P.bool.isRequired,
  messageText: P.string.isRequired,
}

Footer.defaultProps = {
  emojiPickerAnchorEl: null,
}

export { Footer }
