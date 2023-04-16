import { useTranslation } from 'react-i18next'

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import {
  Box,
  Grow,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

import { Photo } from '@atoms/Photo'

import notFoundWithNumber from '@assets/images/not-found-with-number.png'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <>
      <Box left={16} position="absolute" top={16}>
        <Tooltip title={t('pages.error.tooltip.arrowBackButton')}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIosRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>
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
            px={4}
          >
            {t('pages.error.others.notFoundPageMessage')}
          </Typography>
        </Grow>
        <Stack alignItems="center" maxWidth={464} px={4} width="100vw">
          <Photo
            alt={t('pages.error.alt.notFoundPageImage')}
            animationSpeed={1000}
            src={notFoundWithNumber}
            fit="contain"
            shift="top"
          />
        </Stack>
      </Stack>
    </>
  )
}

export { ErrorPage }
