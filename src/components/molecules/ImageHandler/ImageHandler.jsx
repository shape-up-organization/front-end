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
import ThumbnailGenerator from '@uppy/thumbnail-generator'
import Webcam from '@uppy/webcam'
import '@uppy/webcam/dist/style.min.css'

import { useStyles } from './ImageHandler.styles'

const uppy = new Uppy()
  .use(ImageEditor, {
    id: 'ImageEditor',
    quality: 0.6,
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
  .use(ThumbnailGenerator, {
    thumbnailWidth: 200,
    thumbnailHeight: 200,
  })

const locales = {
  en: enLocale,
  pt: ptLocale,
}

const ImageHandler = ({
  maxNumberOfFiles,
  startupImages,
  updateFilesArray,
}) => {
  const theme = useTheme()
  const { i18n } = useTranslation()

  const { classes } = useStyles()

  useEffect(() => {
    uppy.setOptions({
      restrictions: {
        maxNumberOfFiles,
      },
      locale: locales[i18n.resolvedLanguage],
    })
    uppy.on('upload', () => updateFilesArray(uppy.getFiles()))

    if (!startupImages) return
    uppy.addFiles(
      startupImages?.map(image => ({
        name: image?.name || 'picture',
        type: image?.type,
        data: image,
      }))
    )
  }, [])

  return (
    <Fade in unmountOnExit timeout={600}>
      <Box className={classes.root} height="100%" width="100%">
        <Dashboard
          height="100%"
          plugins={[
            'ImageEditor',
            'Compressor',
            'Webcam',
            'ThumbnailGenerator',
          ]}
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
  maxNumberOfFiles: P.number,
  startupImages: P.arrayOf(P.object),
  updateFilesArray: P.func.isRequired,
}

ImageHandler.defaultProps = {
  maxNumberOfFiles: 1,
  startupImages: [],
}

export { ImageHandler }
