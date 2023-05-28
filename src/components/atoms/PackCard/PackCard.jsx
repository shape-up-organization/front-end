import { useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import EditRoundedIcon from '@mui/icons-material/EditRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material'

import apiQuests from '@api/services/quests'
import { useChat } from '@contexts'
import { PacksModal } from '@molecules/PacksModal'
import { CATEGORIES, CLASSIFICATIONS } from '@utils/constants/general'

const PackCard = ({
  category,
  classification,
  dayOfWeek,
  description,
  duration,
  exercises,
  id,
  mode,
  name,
  onRemoved,
  period,
  refetch,
  status,
  unlockXp,
  variant,
  xp,
}) => {
  const { t } = useTranslation()
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))
  const lessThanLarge = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const { userData } = useChat()

  const [isLoadingPack, setIsLoadingPack] = useState(false)
  const [checkedState, setCheckedState] = useState(status === 'FINISHED')
  const [extended, setExtended] = useState(false)
  const [packsModalOpen, setPacksModalOpen] = useState(false)
  const [packsModalOptions, setPacksModalOptions] = useState({})

  const categoryData = CATEGORIES[category] || {}
  const CategoryIcon = categoryData?.icon || null

  const classificationFinded = CLASSIFICATIONS.find(
    ({ value: classificationValue }) => classificationValue === classification
  ) || {
    color: 'white',
    colorText: 'black',
    value: classification,
  }

  const handleClosePacksModal = () => setPacksModalOpen(false)
  const handleOpenPacksModal = (event, options) => {
    event.stopPropagation()
    setPacksModalOptions(options)
    setPacksModalOpen(true)
  }
  const handleChangeChecked = async event => {
    event.stopPropagation()
    setIsLoadingPack(true)

    const payload = { dayOfWeek, period, trainingId: id }
    const response = await apiQuests.checkQuest(payload)
    setIsLoadingPack(false)

    if (response.status !== 200) return

    setCheckedState(current => !current)
  }
  const handleExtendPack = event => {
    event.stopPropagation()
    setExtended(current => !current)
  }
  const handleAddPack = async event => {
    event.stopPropagation()
    setIsLoadingPack(true)

    const payload = { dayOfWeek, period, trainingId: id }
    if (mode === 'edit') {
      await apiQuests.editQuest(payload)
    } else {
      await apiQuests.addQuest(payload)
    }
    await refetch()

    setIsLoadingPack(false)
    setPacksModalOpen(false)
  }
  const handleRemovePack = async event => {
    event.stopPropagation()
    setIsLoadingPack(true)

    const payload = { dayOfWeek, period, trainingId: id }
    await apiQuests.deleteQuest(payload)

    await refetch()
    setIsLoadingPack(false)
    onRemoved()
  }

  return (
    <>
      <Stack
        alignItems="center"
        bgcolor="background.default"
        borderRadius={theme => theme.shape.borderRadius}
        color="inherit"
        flexDirection="row"
        minHeight={112}
        justifyContent="center"
        rowGap={2}
        textAlign="left"
        textTransform="none"
        width="100%"
      >
        {id ? (
          <Accordion
            expanded={extended}
            onClick={handleExtendPack}
            disableGutters
            sx={{
              bgcolor: 'background.default',
              boxShadow: 'none',
              width: '100%',
            }}
            TransitionProps={{ unmountOnExit: true }}
          >
            <AccordionSummary
              component={Box}
              sx={{ bgcolor: 'background.default' }}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                columnSpacing={{ xs: 1, lg: 4 }}
                px={{ xs: 1, lg: 4 }}
              >
                <Grid item>
                  <CategoryIcon
                    color="primary"
                    sx={{ fontSize: lessThanMedium ? 32 : 48 }}
                  />
                </Grid>
                <Grid
                  item
                  xs
                  minWidth={88}
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  <Stack alignItems="center" columnGap={1} flexDirection="row">
                    <Typography
                      noWrap
                      variant={lessThanMedium ? 'subtitle2' : 'h6'}
                    >
                      {name}
                    </Typography>
                    <IconButton
                      onClick={handleExtendPack}
                      size="small"
                      sx={{ p: 0 }}
                    >
                      <KeyboardArrowDownRoundedIcon
                        fontSize="small"
                        sx={{
                          rotate: extended ? '180deg' : '360deg',
                          transition: 'rotate 0.3s ease',
                        }}
                      />
                    </IconButton>
                  </Stack>
                  <Chip
                    color={categoryData?.color || 'default'}
                    label={t(
                      `components.atoms.packCard.categories.${categoryData?.name}`
                    ).toUpperCase()}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Grid>
                <Grid item overflow="hidden" textOverflow="ellipsis">
                  {classificationFinded && (
                    <Chip
                      label={classificationFinded.value}
                      size="small"
                      sx={{
                        bgcolor: classificationFinded.color,
                        color: classificationFinded.colorText,
                        fontWeight: 500,
                      }}
                    />
                  )}
                  <Typography
                    fontWeight={700}
                    noWrap
                    textAlign="right"
                    variant={lessThanMedium ? 'subtitle1' : 'h6'}
                  >
                    {xp}
                    <Typography
                      display="inline"
                      variant={lessThanMedium ? 'caption' : 'body2'}
                    >
                      xp
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item>
                  {/* eslint-disable-next-line no-nested-ternary */}
                  {isLoadingPack ? (
                    <CircularProgress size={lessThanMedium ? 16 : 24} />
                  ) : // eslint-disable-next-line no-nested-ternary
                  variant === 'checking' ? (
                    <Checkbox
                      checked={checkedState}
                      disabled={checkedState}
                      onClick={handleChangeChecked}
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                      }}
                    />
                  ) : variant === 'edit' ? (
                    <Stack flexDirection="row">
                      <IconButton
                        onClick={e => handleOpenPacksModal(e, { mode: 'edit' })}
                      >
                        <EditRoundedIcon />
                      </IconButton>
                      <IconButton onClick={handleRemovePack}>
                        <RemoveCircleRoundedIcon color="error" />
                      </IconButton>
                    </Stack>
                  ) : (
                    !lessThanLarge && (
                      <Button
                        disabled={userData.xp < unlockXp}
                        onClick={handleAddPack}
                        size="small"
                        variant="contained"
                      >
                        <Typography
                          fontWeight={500}
                          variant={lessThanMedium ? 'caption' : 'subtitle2'}
                        >
                          {userData.xp >= unlockXp
                            ? t(
                                'components.atoms.packCard.others.buttonAllocate'
                              )
                            : t(
                                'components.atoms.packCard.others.buttonUnlock',
                                { neededXp: unlockXp - xp }
                              )}
                        </Typography>
                      </Button>
                    )
                  )}
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                bgcolor: 'background.default',
              }}
            >
              <Grid container px={2}>
                {description && (
                  <Grid item xs={12}>
                    <Typography
                      color="text.secondary"
                      fontWeight={500}
                      variant={lessThanMedium ? 'caption' : 'body2'}
                    >
                      {description}
                    </Typography>
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  lg={exercises.length > 0 ? 9 : 0}
                  display="flex"
                  flexDirection="column"
                  mt={1}
                >
                  {exercises.map(exercise => (
                    <Stack
                      key={exercise}
                      alignItems="flex-start"
                      columnGap={1}
                      flexDirection="row"
                    >
                      <Box
                        bgcolor="primary.main"
                        borderRadius="50%"
                        mt={0.9}
                        p={lessThanMedium ? 0.6 : 0.8}
                      />
                      <Typography
                        key={exercise}
                        sx={{ wordBreak: 'break-word' }}
                        variant={lessThanMedium ? 'body2' : 'body1'}
                      >
                        {exercise}
                      </Typography>
                    </Stack>
                  ))}
                </Grid>
                <Grid item xs={12} lg={exercises.length > 0 ? 3 : 12} mt={1}>
                  <Stack
                    alignItems={
                      // eslint-disable-next-line no-nested-ternary
                      lessThanLarge
                        ? 'center'
                        : exercises.length > 0
                        ? 'flex-end'
                        : 'center'
                    }
                    height="100%"
                    justifyContent="flex-end"
                  >
                    <Typography
                      fontWeight={500}
                      variant={lessThanLarge ? 'caption' : 'subtitle1'}
                    >
                      {t('components.atoms.packCard.others.estimatedDuration')}
                    </Typography>
                    <Typography
                      color="primary"
                      fontWeight={500}
                      variant={lessThanLarge ? 'subtitle1' : 'h6'}
                    >{`${duration} ${t(
                      'components.atoms.packCard.others.minutes'
                    )}`}</Typography>
                    {variant === 'default' && lessThanLarge && (
                      <Button
                        disabled={userData.xp < unlockXp}
                        fullWidth
                        onClick={handleAddPack}
                        size="small"
                        variant="contained"
                      >
                        <Typography
                          fontWeight={500}
                          variant={lessThanMedium ? 'caption' : 'subtitle2'}
                        >
                          {userData.xp >= unlockXp
                            ? t(
                                'components.atoms.packCard.others.buttonAllocate'
                              )
                            : t(
                                'components.atoms.packCard.others.buttonUnlock',
                                { neededXp: unlockXp - xp }
                              )}
                        </Typography>
                      </Button>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ) : (
          <Stack
            alignItems="center"
            height="100%"
            justifyContent="center"
            px={4}
            rowGap={1}
            width="100%"
          >
            <Typography
              align="center"
              color="text.secondary"
              fontWeight={500}
              variant="body1"
            >
              {t('components.atoms.packCard.others.noPackWasAssigned')}
            </Typography>
            <Button
              fullWidth={lessThanMedium}
              onClick={handleOpenPacksModal}
              size="small"
              variant="contained"
            >
              {t('components.atoms.packCard.others.buttonAllocate')}
            </Button>
          </Stack>
        )}
      </Stack>
      <PacksModal
        handleClose={handleClosePacksModal}
        open={packsModalOpen}
        dayOfWeek={dayOfWeek}
        period={period}
        reftech={refetch}
        {...packsModalOptions}
      />
    </>
  )
}

PackCard.propTypes = {
  category: P.oneOf([...Object.keys(CATEGORIES), '']),
  classification: P.string,
  dayOfWeek: P.string,
  description: P.string,
  duration: P.number,
  exercises: P.arrayOf(P.string),
  id: P.string,
  mode: P.string,
  name: P.string,
  onRemoved: P.func,
  period: P.string,
  refetch: P.func,
  status: P.oneOf(['FINISHED', 'PENDING', 'UNCOMPLETED']),
  unlockXp: P.number,
  variant: P.oneOf(['checking', 'default', 'edit']),
  xp: P.number,
}

PackCard.defaultProps = {
  category: '',
  classification: '',
  dayOfWeek: '',
  description: '',
  duration: 0,
  exercises: [],
  id: '',
  mode: '',
  name: '',
  onRemoved: () => {},
  period: '',
  refetch: () => {},
  status: 'PENDING',
  unlockXp: 0,
  variant: 'default',
  xp: 0,
}

export { PackCard }
