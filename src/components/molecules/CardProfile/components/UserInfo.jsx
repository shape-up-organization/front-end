import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import { Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material'

import { Avatar } from '@atoms/Avatar'

import { useChat } from '@contexts'
import { useNavigateSearch } from '@hooks'

const UserInfo = ({ closeCard }) => {
  const { t } = useTranslation()
  const navigateSearch = useNavigateSearch()
  const { userData } = useChat()

  const handleGoToProfile = () => {
    navigateSearch('/profile', { username: userData.username })
    if (closeCard) closeCard()
  }

  return (
    <Grid
      container
      bgcolor="background.default"
      borderRadius={theme => theme.shape.borderRadius}
      component={Paper}
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
        <Avatar currentUser />
      </Grid>
      <Grid item xs={7}>
        <Typography fontWeight={700} textAlign="left" variant="h6">
          {userData.name} {userData.lastName}
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
          sx={{ mb: '-5px' }}
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

UserInfo.propTypes = {
  closeCard: P.func,
}

UserInfo.defaultProps = {
  closeCard: null,
}

export { UserInfo }
