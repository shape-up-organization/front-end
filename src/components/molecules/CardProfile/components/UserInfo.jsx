import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { Grid, IconButton, Tooltip, Typography } from '@mui/material'

import { Avatar } from '@atoms/Avatar'

import { useChat } from '@contexts'

const UserInfo = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { userData } = useChat()

  const handleGoToProfile = () => navigate(`/profile/${userData.username}`)

  return (
    <Grid
      container
      bgcolor="background.paper"
      borderRadius={theme => theme.shape.borderRadius}
      justifyContent="center"
      px={2}
      py={2}
      rowSpacing={1}
    >
      <Grid
        item
        xs={4}
        alignItems="center"
        display="center"
        justifyContent="center"
      >
        <Avatar />
      </Grid>
      <Grid item xs={7}>
        <Typography fontWeight={700} textAlign="left" variant="h6">
          {userData.name}
        </Typography>
        <Typography
          color="disabled"
          fontWeight={700}
          textAlign="left"
          variant="subtitle1"
        >
          {`@${userData.username}`}
        </Typography>
      </Grid>
      <Grid
        item
        xs={1}
        alignItems="flex-end"
        display="flex"
        justifyContent="flex-end"
      >
        <Tooltip
          title={t('components.molecules.cardProfile.tooltips.goToProfile')}
        >
          <IconButton onClick={handleGoToProfile}>
            <ArrowForwardIosRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export { UserInfo }
