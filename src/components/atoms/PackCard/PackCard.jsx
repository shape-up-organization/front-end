import { useState } from 'react'

import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
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
import { CATEGORIES } from '@utils/constants/general'

const PackCard = ({
  category,
  checked,
  classification,
  description,
  duration,
  exercises,
  id,
  name,
  variant,
  xp,
}) => {
  const { t } = useTranslation()
  const lessThanMedium = useMediaQuery(theme => theme.breakpoints.down('md'))
  const lessThanLarge = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const [isLoadingPack, setIsLoadingPack] = useState(false)
  const [checkedState, setCheckedState] = useState(checked)
  const [extended, setExtended] = useState(false)

  const categoryData = CATEGORIES[category] || {}
  const CategoryIcon = categoryData?.icon || null

  const handleAddActivity = event => {
    event.stopPropagation()
    alert('add activity')
  }
  const handleChangeChecked = async event => {
    event.stopPropagation()
    setIsLoadingPack(true)

    const payload = { id }

    const response = await apiQuests.checkQuest(payload)
    setIsLoadingPack(false)

    if (response.status !== 200) return

    setCheckedState(current => !current)
    alert('checked')
  }
  const handleExtendPack = event => {
    event.stopPropagation()
    setExtended(current => !current)
  }

  return (
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
    >
      {/* eslint-disable-next-line no-nested-ternary */}
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
              <Grid item xs overflow="hidden" textOverflow="ellipsis">
                <Stack alignItems="center" flexDirection="row">
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
                  )}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Grid>
              <Grid item overflow="hidden" textOverflow="ellipsis">
                <Typography
                  fontWeight={500}
                  noWrap
                  textAlign="right"
                  variant={lessThanMedium ? 'subtitle2' : 'subtitle1'}
                >
                  {t(
                    `components.atoms.packCard.classifications.${classification.toLowerCase()}`
                  ).toUpperCase()}
                </Typography>
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
                ) : variant === 'checking' ? (
                  <Checkbox
                    checked={checkedState}
                    disabled={checkedState}
                    onClick={handleChangeChecked}
                    sx={{
                      '& .MuiSvgIcon-root': { fontSize: 28 },
                    }}
                  />
                ) : (
                  variant === 'default' &&
                  !lessThanLarge && (
                    <Button
                      onClick={handleAddActivity}
                      size="small"
                      variant="contained"
                    >
                      <Typography
                        fontWeight={500}
                        variant={lessThanMedium ? 'caption' : 'subtitle2'}
                      >
                        {t('components.atoms.packCard.others.buttonAllocate')}
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
                lg={9}
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
              <Grid item xs={12} lg={3} mt={1}>
                <Stack
                  alignItems={lessThanLarge ? 'center' : 'flex-end'}
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
                      fullWidth
                      onClick={handleAddActivity}
                      size="small"
                      variant="contained"
                    >
                      <Typography
                        fontWeight={500}
                        variant={lessThanMedium ? 'caption' : 'subtitle2'}
                      >
                        {t('components.atoms.packCard.others.buttonAllocate')}
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
            onClick={handleAddActivity}
            size="small"
            variant="contained"
          >
            {t('components.atoms.packCard.others.buttonAllocate')}
          </Button>
        </Stack>
      )}
    </Stack>
  )
}

PackCard.propTypes = {
  category: P.oneOf([...Object.keys(CATEGORIES), '']),
  checked: P.bool,
  classification: P.string,
  description: P.string,
  duration: P.number,
  exercises: P.arrayOf(P.string),
  id: P.string,
  name: P.string,
  variant: P.oneOf(['checking', 'default']),
  xp: P.number,
}

PackCard.defaultProps = {
  category: '',
  checked: false,
  classification: '',
  description: '',
  duration: 0,
  exercises: [],
  id: '',
  name: '',
  variant: 'default',
  xp: 0,
}

export { PackCard }
