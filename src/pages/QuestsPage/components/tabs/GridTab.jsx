import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import AddIcon from '@mui/icons-material/Add'
import {
  Badge,
  CircularProgress,
  Fab,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { AnimatedWrapper } from '@layouts/AnimatedWrapper'

import apiQuests from '@api/services/quests'
import { Divider } from '@atoms/Divider'
import { SimpleModal } from '@templates/Modal'

import { PackCard } from '@atoms/PackCard'
import {
  CATEGORIES,
  CLASSIFICATIONS,
  WEEK_DAYS,
} from '@utils/constants/general'

const GridTab = () => {
  const { t } = useTranslation()
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))

  const [isLoadingQuests, setIsLoadingQuests] = useState(true)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [questToEdit, setQuestToEdit] = useState({})
  const [quests, setQuests] = useState([])

  const handleCloseEditModal = () => setOpenEditModal(false)
  const handleEditQuest = periodQuest => {
    setQuestToEdit(periodQuest)
    setOpenEditModal(true)
  }

  const getQuests = async () => {
    setIsLoadingQuests(true)

    const response = await apiQuests.getQuests()
    setIsLoadingQuests(false)

    const grade = {}
    WEEK_DAYS.forEach(weekDay => {
      grade[weekDay] = {
        morning: null,
        afternoon: null,
        night: null,
      }
    })
    response.data.forEach(weekDay => {
      weekDay?.trainings.forEach(quest => {
        grade[weekDay?.dayOfWeek][quest?.period] = {
          ...quest.training,
        }
      })
    })

    setQuests(grade)
  }

  useEffect(() => {
    getQuests()
  }, [])

  return (
    <>
      <AnimatedWrapper>
        <Typography
          color="primary"
          fontWeight={500}
          textAlign={lessThanMedium ? 'center' : 'left'}
          variant={lessThanMedium ? 'h6' : 'h4'}
        >
          {t('pages.quests.grid.title')}
        </Typography>
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          gap={2}
          justifyContent="space-between"
        >
          {isLoadingQuests ? (
            <CircularProgress size={32} />
          ) : (
            Object.keys(quests).map(weekDay => {
              const dailyQuests = quests[weekDay]
              return (
                <Stack
                  key={weekDay}
                  bgcolor="background.default"
                  borderRadius={theme => theme.shape.borderRadius}
                  flex={1}
                  minWidth={144}
                  px={4}
                  py={2}
                >
                  <Typography
                    textAlign="center"
                    textTransform="uppercase"
                    variant="h6"
                  >
                    {t(`pages.quests.weekDays.${weekDay}`)}
                  </Typography>
                  <Stack>
                    {Object.keys(dailyQuests).map((dayTime, index) => {
                      const periodQuest = dailyQuests[dayTime]
                      const CategoryIcon =
                        CATEGORIES[periodQuest?.category]?.icon || AddIcon
                      return (
                        <Stack
                          key={dayTime}
                          alignItems="center"
                          mb={2}
                          mt={index === 0 ? 2 : 0}
                          rowGap={2}
                        >
                          <Typography
                            color="text.disabled"
                            fontWeight={500}
                            textAlign="center"
                            variant="subtitle2"
                          >
                            {t(`pages.quests.dayTimes.${dayTime}`)}
                          </Typography>
                          <Badge
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                            badgeContent=" "
                            color={
                              // eslint-disable-next-line no-nested-ternary
                              periodQuest?.status === 'FINISHED'
                                ? 'primary'
                                : periodQuest?.status === 'UNCOMPLETED'
                                ? 'error'
                                : 'warning'
                            }
                            overlap="rectangular"
                            sx={{
                              '& .MuiBadge-badge': {
                                borderColor: 'background.default',
                                borderStyle: 'solid',
                                borderWidth: lessThanMedium ? 2 : 4,
                                right: lessThanMedium ? 54 : 28,
                                zIndex: theme => theme.zIndex.fab,
                              },
                            }}
                            variant="standard"
                          >
                            <Fab
                              onClick={() =>
                                handleEditQuest({
                                  ...periodQuest,
                                  dayOfWeek: weekDay,
                                  period: dayTime,
                                })
                              }
                              sx={{
                                background:
                                  CLASSIFICATIONS.find(
                                    classification =>
                                      classification.value ===
                                      periodQuest?.classification
                                  )?.color || 'primary.contrastText',
                                borderRadius: '10%',
                                ...(lessThanMedium && {
                                  height: 112,
                                  width: 112,
                                }),
                              }}
                            >
                              <CategoryIcon
                                sx={{
                                  color:
                                    CLASSIFICATIONS.find(
                                      classification =>
                                        classification.value ===
                                        periodQuest?.classification
                                    )?.colorText || 'primary.contrastText',
                                }}
                              />
                            </Fab>
                          </Badge>
                          {index < Object.keys(dailyQuests).length - 1 && (
                            <Divider color="disabled" size="small" />
                          )}
                        </Stack>
                      )
                    })}
                    <Stack mt={2}>
                      <Typography textAlign="center" variant="h6">
                        XP
                      </Typography>
                      <Typography
                        fontWeight={600}
                        textAlign="center"
                        variant="h5"
                      >
                        {Object.keys(dailyQuests).reduce(
                          (acc, dayTime) =>
                            acc + (dailyQuests[dayTime]?.xp || 0),
                          0
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              )
            })
          )}
        </Stack>
      </AnimatedWrapper>
      <SimpleModal
        Component={() => (
          <PackCard
            {...questToEdit}
            onRemoved={handleCloseEditModal}
            refetch={getQuests}
            variant="edit"
          />
        )}
        dialogProps={{
          sx: {
            '& .MuiDialogContent-root': {
              bgcolor: 'background.paper',
              p: '32px !important',
            },
          },
          maxWidth: 'md',
        }}
        handleClose={handleCloseEditModal}
        open={openEditModal}
        title={t('pages.quests.grid.others.editModalTitle')}
      />
    </>
  )
}

export { GridTab }
