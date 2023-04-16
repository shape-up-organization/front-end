import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'

import dailyChallengesMock from '@mocks/quests/getDailyChallenges'

const Quest = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [challenges, setChallenges] = useState([])

  useEffect(() => {
    setChallenges(dailyChallengesMock.data)
  }, [])

  const handleChangeStatus = id =>
    setChallenges(
      challenges.map(challenge => {
        if (challenge.id === id) {
          return {
            ...challenge,
            status: !challenge.status,
          }
        }
        return challenge
      })
    )

  const handleGoToQuests = () => navigate('/quests')

  return (
    <Grid container rowSpacing={1}>
      <Grid
        item
        xs={12}
        alignItems="center"
        display="flex"
        gap={1}
        justifyContent="center"
      >
        <Typography variant="h6">
          {t('components.molecules.cardProfile.quest.title')}
        </Typography>
        <IconButton onClick={handleGoToQuests}>
          <ArrowForwardIosRoundedIcon fontSize="small" />
        </IconButton>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Grid item xs={8} display="flex">
          <FormGroup>
            {challenges.map(challenge => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={challenge.status}
                    onClick={() => handleChangeStatus(challenge.id)}
                  />
                }
                key={challenge.id}
                label={challenge.description}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  )
}
export { Quest }
