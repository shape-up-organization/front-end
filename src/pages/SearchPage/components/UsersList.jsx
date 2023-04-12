import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Photo } from '@atoms/Photo'
import {
  Box,
  CircularProgress,
  Divider,
  Grow,
  Stack,
  Typography,
} from '@mui/material'

import notFoundGeneric from '@assets/images/not-found-generic.png'

import { UserButton } from './UserButton'

const UsersList = ({ isLoading, users }) => {
  const { t } = useTranslation()

  if (isLoading || !users.length)
    return (
      <Stack alignItems="center" justifyContent="center" pt={8} width="100%">
        {isLoading ? (
          <Box pt={2}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack alignItems="center" justifyContent="center" pt={2} spacing={2}>
            <Grow in timeout={1000} unmountOnExit>
              <Typography
                color="primary"
                fontWeight="900"
                textAlign="center"
                textTransform="uppercase"
                variant="h6"
              >
                {t('pages.chat.others.chatNotFoundMessage')}
              </Typography>
            </Grow>
            <Box maxWidth={208}>
              <Photo
                alt={t('pages.chat.alt.notFoundChatImage')}
                animationSpeed={800}
                src={notFoundGeneric}
                fit="contain"
              />
            </Box>
          </Stack>
        )}
      </Stack>
    )

  return (
    <Stack>
      {users?.map(user => (
        <Stack key={user.username}>
          <UserButton user={user} />
          <Divider />
        </Stack>
      ))}
    </Stack>
  )
}

UsersList.propTypes = {
  isLoading: P.bool,
  users: P.arrayOf(
    P.shape({
      name: P.string,
      profilePicture: P.string,
      username: P.string,
      xp: P.number,
    })
  ),
}

UsersList.defaultProps = {
  isLoading: true,
  users: [],
}

export { UsersList }
