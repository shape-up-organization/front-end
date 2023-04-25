import { useTranslation } from 'react-i18next'

import { Grid, Paper, Typography } from '@mui/material'

import { ProgressBar } from '@atoms/ProgressBar'

import { useChat } from '@contexts'
import {
  getLevel,
  getNextLevel,
  getProgress,
  getXpToNextLevel,
} from '@utils/constants/levels'

const Experience = () => {
  const { userData } = useChat()

  const { t } = useTranslation()

  const currentLevel = getLevel(userData.xp)
  const nextLevel = getNextLevel(currentLevel)
  const progress = getProgress(userData.xp)
  const xpToNextLevel = getXpToNextLevel(userData.xp)

  return (
    <Grid
      container
      bgcolor="background.default"
      borderRadius={theme => theme.shape.borderRadius}
      component={Paper}
      justifyContent="center"
      px={4}
      py={2}
      rowSpacing={1}
    >
      <Grid container item xs={12}>
        <Grid item xs={8}>
          <Typography variant="body2">
            {t('components.molecules.cardProfile.xpCard.currentXp', {
              xp: userData.xp,
            })}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography fontWeight={600} textAlign="right" variant="body2">
            {`${progress}%`}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} justifyContent="center">
        <ProgressBar progress={progress} />
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Grid item xs={4}>
          <Typography
            fontWeight={700}
            textTransform="uppercase"
            variant="body2"
          >
            {t('components.molecules.cardProfile.xpCard.currentLevel', {
              level: getLevel(userData.xp),
            })}
          </Typography>
        </Grid>
        <Grid item xs={8} display="flex" justifyContent="flex-end">
          <Typography variant="body2">
            <strong>{xpToNextLevel} XP</strong>{' '}
            {t('components.molecules.cardProfile.xpCard.nextLevel')}{' '}
            <strong>{nextLevel}</strong>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export { Experience }
