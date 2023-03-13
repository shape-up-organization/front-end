import { Box } from '@mui/material'

import { Photo } from '@components/Photo'

import notFoundImageEn from '@assets/images/page-not-found-en.png'
import notFoundImagePt from '@assets/images/page-not-found-pt.png'

const ErrorPage = () => {
  const locale = 'pt'

  const notFoundImage = {
    en: notFoundImageEn,
    pt: notFoundImagePt,
  }

  return (
    <Box
      alignItems="center"
      display="flex"
      backgroundColor="background.default"
      justifyContent="center"
      height="100vh"
    >
      <Photo
        alt="Mulher com uma lupa com erro de página não encontrada ao fundo"
        animationSpeed={1500}
        src={notFoundImage[locale]}
        fit="contain"
        shift="bottom"
      />
    </Box>
  )
}

export { ErrorPage }
