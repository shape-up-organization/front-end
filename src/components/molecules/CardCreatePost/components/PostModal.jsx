import { useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import CloseRounded from '@mui/icons-material/CloseRounded'
import {
  Dialog,
  Fade,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { ImageHandler } from '@molecules/ImageHandler'

import { PublishStep } from './PublishStep'

const firstStep = 1

const PostModal = ({ handleClose, open }) => {
  const { t } = useTranslation()
  const lessThanSmall = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const [postStep, setPostStep] = useState(1)
  const [imagesFiles, setImagesFiles] = useState([])

  const backStep = () =>
    setPostStep(current => (current === firstStep ? firstStep : current - 1))

  const updateFilesArray = files => {
    setImagesFiles(files)
    setPostStep(2)
  }

  const postStepElements = {
    1: () => <ImageHandler updateFilesArray={updateFilesArray} />,
    2: () => <PublishStep backStep={backStep} images={imagesFiles} />,
  }

  return (
    <Dialog
      fullScreen={lessThanSmall}
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      overflow="hidden"
      PaperProps={{
        sx: {
          overflow: 'hidden',
        },
      }}
    >
      <Fade in>
        <Stack
          component={Paper}
          height={lessThanSmall ? '100vh' : '80vh'}
          alignItems="center"
          width={lessThanSmall ? '100vw' : '80vw'}
        >
          <Stack
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={2}
          >
            <Typography color="primary" fontWeight={500} variant="h5">
              {t('components.molecules.cardCreatePost.others.modalTitle')}
            </Typography>
            <Tooltip
              title={t(
                'components.molecules.cardCreatePost.tooltips.closeModal'
              )}
            >
              <IconButton onClick={handleClose}>
                <CloseRounded />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack
            alignItems="center"
            bgcolor="background.default"
            borderRadius={theme => theme.shape.borderRadius}
            height="80%"
            justifyContent="center"
            width="96%"
          >
            {postStepElements[postStep]() || firstStep}
          </Stack>
          {postStep > 1 && (
            <Fade in unmountOnExit>
              <Stack
                direction="row"
                height="10%"
                justifyContent="flex-start"
                px={{ xs: 1, md: 4 }}
                width="100%"
              >
                <Stack justifyContent="center">
                  <Tooltip
                    title={t(
                      'components.molecules.cardCreatePost.tooltips.backStep'
                    )}
                  >
                    <IconButton onClick={backStep}>
                      <ArrowBackIosRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </Fade>
          )}
        </Stack>
      </Fade>
    </Dialog>
  )
}

PostModal.propTypes = {
  open: P.bool,
  handleClose: P.func.isRequired,
}

PostModal.defaultProps = {
  open: false,
}

export { PostModal }
