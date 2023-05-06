import { useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded'
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded'
import {
  Avatar as AvatarMUI,
  Badge,
  Box,
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { Avatar } from '@atoms/Avatar'
import { Divider } from '@atoms/Divider'
import { useChat } from '@contexts'
import { ImageHandler } from '@molecules/ImageHandler'
import { SimpleModal } from '@templates/Modal'

const Content = () => {
  const { t } = useTranslation()
  const isLessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))
  const isLessThanSm = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const {
    chatsData: { friends },
  } = useChat()

  const [squadName, setSquadName] = useState('')
  const [friendsAdded, setFriendsAdded] = useState([])
  const [openImageModal, setOpenImageModal] = useState(false)
  const [squadPicture, setSquadPicture] = useState(null)

  const handleChangeSquadName = event => setSquadName(event.target.value)
  const handleToggleFriend = username => {
    if (friendsAdded.includes(username)) {
      setFriendsAdded(current => current.filter(friend => friend !== username))
      return
    }

    setFriendsAdded(current => [...current, username])
  }

  const handleOpenImageHandler = () => setOpenImageModal(true)
  const handleCloseImageHandler = () => setOpenImageModal(false)

  const uploadSquadPicture = async files => {
    if (!files) return
    setSquadPicture(files[0].data)
    handleCloseImageHandler()
  }

  const handleCreateSquad = () => {
    if (!squadName) return

    const payload = {
      squadName,
      picture: squadPicture,
      users: friendsAdded,
    }

    // TODO: Implement create squad api
    console.log(payload)
  }

  return (
    <Stack alignItems="center" px={4} py={2} rowGap={2}>
      <Stack alignItems="center" columnGap={2} direction="row">
        {squadPicture ? (
          <Badge
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            badgeContent={
              <Tooltip title={t('pages.chat.squadModal.removePicture')}>
                <IconButton onClick={() => setSquadPicture(null)} size="small">
                  <RemoveCircleRoundedIcon color="error" fontSize="small" />
                </IconButton>
              </Tooltip>
            }
            overlap="circular"
            sx={{
              zIndex: 3000,
            }}
          >
            <AvatarMUI src={URL.createObjectURL(squadPicture)} />
          </Badge>
        ) : (
          <Tooltip label={t('pages.chat.squadModal.addPicture')}>
            <IconButton onClick={handleOpenImageHandler}>
              <AddAPhotoRoundedIcon />
            </IconButton>
          </Tooltip>
        )}
        <Dialog
          open={openImageModal}
          onClose={handleCloseImageHandler}
          fullScreen={isLessThanSm}
        >
          <Box
            height="100vh"
            maxHeight={isLessThanSm ? '100vh' : 300}
            width={isLessThanSm ? '100vw' : 512}
          >
            <ImageHandler updateFilesArray={uploadSquadPicture} />
          </Box>
        </Dialog>
        <TextField
          fullWidth
          label={t('pages.chat.squadModal.squadNamePlaceholder')}
          onChange={handleChangeSquadName}
          size={isLessThanMedium ? 'small' : 'medium'}
          value={squadName}
        />
      </Stack>
      <Divider />
      <Stack
        bgcolor="background.default"
        borderRadius={theme => theme.shape.borderRadius}
        height={336}
        overflow="auto"
        px={3}
        py={1}
        width="100%"
      >
        {friends.map((friend, index) => (
          <Box key={friend.username}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handleToggleFriend(friend.username)}
                  size="small"
                />
              }
              label={
                <Stack
                  alignItems="center"
                  columnGap={2}
                  direction="row"
                  px={1}
                  width="100%"
                >
                  <Avatar user={friend} />
                  <Typography variant="body2">{friend.name}</Typography>
                </Stack>
              }
              sx={{ px: 2, py: 1, width: '100%' }}
            />
            {index !== friends.length - 1 && <Divider />}
          </Box>
        ))}
      </Stack>
      <Button
        disabled={!squadName}
        fullWidth
        sx={{ maxWidth: 272, py: 1 }}
        onClick={handleCreateSquad}
        variant="contained"
      >
        {t('pages.chat.squadModal.createButton')}
      </Button>
    </Stack>
  )
}

const SquadModal = ({ handleClose, open }) => {
  const { t } = useTranslation()

  return (
    <SimpleModal
      Component={Content}
      handleClose={handleClose}
      open={open}
      title={t('pages.chat.squadModal.modalTitle')}
    />
  )
}

SquadModal.propTypes = {
  handleClose: P.func.isRequired,
  open: P.bool,
}

SquadModal.defaultProps = {
  open: false,
}

export { SquadModal }
