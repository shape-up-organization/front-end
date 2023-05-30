import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import {
  Checkbox,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'

import apiQuests from '@api/services/quests'
import { CATEGORIES, WEEK_DAYS } from '@utils/constants/general'

const Quest = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))

  const [isLoadingQuest, setIsLoadingQuest] = useState(true)
  const [quest, setQuest] = useState([])
  const [dayData, setDayData] = useState({})
  const [checkedState, setCheckedState] = useState(false)

  const categoryData = CATEGORIES[quest?.category] || {}
  const CategoryIcon = categoryData?.icon || null

  const handleChangeChecked = async event => {
    event.stopPropagation()
    setIsLoadingQuest(true)

    const payload = {
      dayOfWeek: dayData.dayOfWeek,
      period: dayData.period,
      trainingId: quest.id,
    }
    const response = await apiQuests.checkQuest(payload)
    setIsLoadingQuest(false)

    if (response.status !== 200) return

    setCheckedState(current => !current)
  }

  const getQuests = async () => {
    setIsLoadingQuest(true)

    const response = await apiQuests.getQuests()
    setIsLoadingQuest(false)

    const weekDay = WEEK_DAYS[new Date().getDay()]
    const findedWeekDay = response.data?.filter(
      item => item.dayOfWeek === weekDay
    )[0]

    const hours = new Date().getHours()
    // eslint-disable-next-line no-nested-ternary
    const period = hours < 12 ? 'morning' : hours < 18 ? 'afternoon' : 'night'
    const findedPeriod = findedWeekDay?.trainings?.filter(
      item => item.period === period
    )[0]
    setQuest(findedPeriod?.training || null)
    setDayData({
      dayOfWeek: findedWeekDay?.dayOfWeek || null,
      period: findedPeriod?.period || null,
    })
    setCheckedState(findedPeriod?.training?.status === 'FINISHED' || false)
  }

  useEffect(() => {
    getQuests()
  }, [])

  const handleGoToQuests = () => navigate('/quests')

  return (
    <Stack alignItems="center" rowGap={2} width="100%">
      <Stack alignItems="center" columnGap={1} flexDirection="row">
        <Typography variant="h6">
          {t('components.molecules.cardProfile.quest.title')}
        </Typography>
        <IconButton onClick={handleGoToQuests}>
          <ArrowForwardIosRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Stack
        alignItems="center"
        bgcolor="background.default"
        component={Paper}
        flexDirection="row"
        justifyContent="space-between"
        px={4}
        py={3}
        width="100%"
      >
        {/* eslint-disable-next-line no-nested-ternary */}
        {isLoadingQuest ? (
          <CircularProgress size={lessThanMedium ? 16 : 24} />
        ) : quest ? (
          <>
            {CategoryIcon && (
              <CategoryIcon
                color="primary"
                sx={{ fontSize: lessThanMedium ? 32 : 48 }}
              />
            )}
            <Typography
              color="primary"
              noWrap
              variant={lessThanMedium ? 'subtitle2' : 'h6'}
            >
              {quest?.name}
            </Typography>
            <Checkbox
              checked={checkedState}
              disabled={checkedState}
              onClick={handleChangeChecked}
              sx={{
                '& .MuiSvgIcon-root': { fontSize: 28 },
              }}
            />
          </>
        ) : (
          <Typography textAlign="center" width="100%">
            {t('components.molecules.cardProfile.quest.noQuest')}
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}
export { Quest }
