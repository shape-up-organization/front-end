import { useEffect } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Box, Fade, useTheme } from '@mui/material'

import Uppy from '@uppy/core'
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'
import ImageEditor from '@uppy/image-editor'
import '@uppy/image-editor/dist/style.min.css'
import enLocale from '@uppy/locales/lib/en_US'
import ptLocale from '@uppy/locales/lib/pt_BR'
import { Dashboard } from '@uppy/react'
import Webcam from '@uppy/webcam'
import '@uppy/webcam/dist/style.min.css'

import { useStyles } from './ImageHandler.styles'

const uppy = new Uppy()
  .use(ImageEditor, {
    id: 'ImageEditor',
    cropperOptions: {
      background: false,
      responsive: true,
      viewMode: 1,
    },
    actions: {
      cropSquare: false,
      cropWidescreen: false,
      cropWidescreenVertical: false,
      flip: true,
      granularRotate: false,
      revert: false,
      rotate: true,
      zoomIn: false,
      zoomOut: false,
    },
  })
  .use(Webcam, {
    preferredImageMimeType: 'image/png',
    modes: ['picture'],
    mobileNativeCamera: true,
  })

const locales = {
  en: enLocale,
  pt: ptLocale,
}

const ImageHandler = ({ updateFilesArray }) => {
  const theme = useTheme()
  const { i18n } = useTranslation()

  const { classes } = useStyles()

  useEffect(() => {
    uppy.setOptions({
      locale: locales[i18n.resolvedLanguage],
    })
    uppy.on('upload', () => updateFilesArray(uppy.getFiles()))
  }, [])

  return (
    <Fade in unmountOnExit timeout={600}>
      <Box className={classes.root} height="100%" width="100%">
        <Dashboard
          height="100%"
          plugins={['ImageEditor', 'Webcam']}
          proudlyDisplayPoweredByUppy={false}
          theme={theme.palette.mode}
          uppy={uppy}
          width="100%"
        />
      </Box>
    </Fade>
  )
}

ImageHandler.propTypes = {
  updateFilesArray: P.func.isRequired,
}

export { ImageHandler }
