import { useTranslation } from 'react-i18next'

import { Photo } from '@atoms/Photo'
import { Box } from '@mui/material'

import notFoundImageEn from '@assets/images/page-not-found-en.png'
import notFoundImagePt from '@assets/images/page-not-found-pt.png'

const notFoundImage = {
  en: notFoundImageEn,
  pt: notFoundImagePt,
}

const ErrorPage = () => {
  const {
    t,
    i18n: { resolvedLanguage },
  } = useTranslation()

  return (
    <Box
      alignItems="center"
      display="flex"
      backgroundColor="background.default"
      justifyContent="center"
      height="100vh"
    >
      <Photo
        alt={t('pages.error.alt.notFoundPageImage')}
        animationSpeed={1500}
        src={notFoundImage[resolvedLanguage]}
        fit="contain"
        shift="bottom"
      />
    </Box>
  )
}

export { ErrorPage }
