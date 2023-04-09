import { useTranslation } from 'react-i18next'

import { Photo } from '@atoms/Photo'
import { Grow, Stack, Typography } from '@mui/material'

import notFoundWithNumber from '@assets/images/not-found-with-number.png'

const ErrorPage = () => {
  const { t } = useTranslation()

  return (
    <Stack
      alignItems="center"
      height="100vh"
      justifyContent="center"
      spacing={2}
      textAlign="center"
      width="100%"
    >
      <Grow in timeout={1000} unmountOnExit>
        <Typography
          color="primary"
          fontWeight="900"
          textTransform="uppercase"
          variant="h4"
        >
          {t('pages.error.others.notFoundPageMessage')}
        </Typography>
      </Grow>
      <Stack alignItems="center" maxWidth={464} width="100vw">
        <Photo
          alt={t('pages.error.alt.notFoundPageImage')}
          animationSpeed={1000}
          src={notFoundWithNumber}
          fit="contain"
          shift="top"
        />
      </Stack>
    </Stack>
  )
}

export { ErrorPage }
