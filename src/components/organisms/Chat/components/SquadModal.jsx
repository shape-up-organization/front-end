import { useEffect, useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded'
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded'
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded'
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded'
import {
  Avatar as AvatarMUI,
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { Avatar } from '@atoms/Avatar'
import { Divider } from '@atoms/Divider'
import { ImageHandler } from '@molecules/ImageHandler'
import { SimpleModal } from '@templates/Modal'

import apiSquads from '@api/services/squads'
import getSquadMock from '@mocks/squads/getSquad'

const Content = ({ squadId }) => {
  const { t } = useTranslation()
  const isLessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))
  const isLessThanSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const [openImageModal, setOpenImageModal] = useState(false)
  const [isLoadingSquad, setIsLoadingSquad] = useState(true)
  const [isLoadingMembers, setIsLoadingMembers] = useState(false)
  const [squadData, setSquadData] = useState(null)
  const [originalSquadData, setOriginalSquadData] = useState(null)

  const squadDiffersFromOriginal =
    originalSquadData?.name !== squadData?.name ||
    originalSquadData?.profilePicture !== squadData?.profilePicture

  const handleChangeSquadName = event =>
    setSquadData(current => ({ ...current, name: event.target.value }))

  const handleOpenImageHandler = () => setOpenImageModal(true)
  const handleCloseImageHandler = () => setOpenImageModal(false)

  const uploadSquadPicture = async files => {
    if (!files) return
    setSquadData(current => ({ ...current, profilePicture: files[0].data }))
    handleCloseImageHandler()
  }

  const handleUpdateSquadData = async () => {
    setIsLoadingSquad(true)

    const payload = {
      name: squadData.name,
      profilePicture: squadData.profilePicture,
    }

    const response = await apiSquads.updateSquadData(squadId, payload)
    console.log(response)
    setIsLoadingSquad(false)
  }

  const handlePromoteUser = async username => {
    setIsLoadingMembers(true)

    const response = await apiSquads.promoteUser(squadId, username)
    console.log(response)
    setIsLoadingMembers(false)

    const newMembers = squadData.members.map(member => {
      if (member.username === username) {
        return {
          ...member,
          role: 'admin',
        }
      }
      return member
    })
    setSquadData(current => ({ ...current, members: newMembers }))
  }

  const handleRemoveAdmin = async username => {
    setIsLoadingMembers(true)

    const response = await apiSquads.removeUserAdmin(squadId, username)
    console.log(response)
    setIsLoadingMembers(false)

    const newMembers = squadData.members.map(member => {
      if (member.username === username) {
        return {
          ...member,
          role: 'admin',
        }
      }
      return member
    })
    setSquadData(current => ({ ...current, members: newMembers }))
  }

  const handleRemoveUser = async username => {
    setIsLoadingMembers(true)

    const response = await apiSquads.removeUser(squadId, username)
    console.log(response)
    setIsLoadingMembers(false)

    const newMembers = squadData.members.filter(
      member => member.username !== username
    )
    setSquadData(current => ({ ...current, members: newMembers }))
  }

  const getSquadDetails = () => {
    setIsLoadingSquad(true)

    const response = apiSquads.getSquadDetails(squadId)
    console.log(response)
    setIsLoadingSquad(false)

    setSquadData(getSquadMock.data)
    setOriginalSquadData(getSquadMock.data)
  }

  useEffect(() => {
    getSquadDetails()
  }, [])

  if (isLoadingSquad) return <CircularProgress />

  return (
    <Stack alignItems="center" px={4} py={2} rowGap={2}>
      <Stack alignItems="center" columnGap={2} direction="row">
        {squadData.profilePicture ? (
          <Badge
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            badgeContent={
              <Tooltip title={t('pages.chat.squadModal.removePicture')}>
                <IconButton
                  onClick={() =>
                    setSquadData(current => ({
                      ...current,
                      profilePicture: null,
                    }))
                  }
                  size="small"
                >
                  <RemoveCircleRoundedIcon color="error" fontSize="small" />
                </IconButton>
              </Tooltip>
            }
            overlap="circular"
            sx={{
              zIndex: 3000,
            }}
          >
            <AvatarMUI
              src={
                typeof squadData.profilePicture === 'string'
                  ? squadData.profilePicture
                  : URL.createObjectURL(squadData.profilePicture)
              }
            />
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
          value={squadData.name}
        />
      </Stack>
      <Divider color="disabled" size="small" />
      <Stack
        bgcolor="background.default"
        borderRadius={theme => theme.shape.borderRadius}
        height={336}
        overflow="auto"
        px={3}
        py={1}
        width="100%"
      >
        {isLoadingMembers ? (
          <Stack
            alignItems="center"
            height="100%"
            justifyContent="center"
            width="100%"
          >
            <CircularProgress />
          </Stack>
        ) : (
          squadData.members.map((member, index) => (
            <Box key={member.username}>
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                px={1}
                py={1}
                width="100%"
              >
                <Stack
                  alignItems="center"
                  columnGap={2}
                  overflow="hidden"
                  direction="row"
                >
                  <Avatar user={member} />
                  <Typography noWrap variant="body2">
                    {member.name}
                  </Typography>
                </Stack>
                <Stack alignItems="center" direction="row">
                  <Tooltip
                    title={
                      member.role !== 'admin'
                        ? t('pages.chat.squadModal.removeMemberAdmin')
                        : t('pages.chat.squadModal.promoteMember')
                    }
                  >
                    <IconButton
                      onClick={() =>
                        member.role !== 'admin'
                          ? handlePromoteUser(member.username)
                          : handleRemoveAdmin(member.username)
                      }
                    >
                      {member.role !== 'admin' ? (
                        <KeyboardDoubleArrowDownRoundedIcon
                          color="primary"
                          fontSize="small"
                        />
                      ) : (
                        <KeyboardDoubleArrowUpRoundedIcon
                          color="primary"
                          fontSize="small"
                        />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('pages.chat.squadModal.removeMember')}>
                    <IconButton
                      onClick={() => handleRemoveUser(member.username)}
                    >
                      <RemoveCircleRoundedIcon color="error" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
              {index !== squadData.members.length - 1 && (
                <Divider color="disabled" size="small" />
              )}
            </Box>
          ))
        )}
      </Stack>
      <Button
        disabled={!squadDiffersFromOriginal}
        fullWidth
        onClick={handleUpdateSquadData}
        sx={{ maxWidth: 272, py: 1 }}
        variant="contained"
      >
        Atualizar
      </Button>
    </Stack>
  )
}

Content.propTypes = {
  squadId: P.string.isRequired,
}

const SquadModal = ({ squadId, handleClose, open }) => {
  const { t } = useTranslation()

  return (
    <SimpleModal
      Component={Content}
      componentArgs={{ squadId }}
      handleClose={handleClose}
      open={open}
      title={t('pages.chat.squadModal.modalViewTitle')}
    />
  )
}

SquadModal.propTypes = {
  squadId: P.string.isRequired,
  handleClose: P.func.isRequired,
  open: P.bool,
}

SquadModal.defaultProps = {
  open: false,
}

export { SquadModal }
