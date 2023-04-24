import P from 'prop-types'
import { useTranslation } from 'react-i18next'

import { Divider, Stack, Typography } from '@mui/material'

import { useChat } from '@contexts'

import { UserButton } from './UserButton'

const UsersList = ({ isLoading, users }) => {
  const { t } = useTranslation()
  const { userData } = useChat()

  if (isLoading || users.length === 0)
    return (
      <Stack alignItems="center" justifyContent="center" py={8} width="100%">
        <Typography
          color="primary"
          fontWeight="900"
          textAlign="center"
          textTransform="uppercase"
          variant="h6"
        >
          {t('pages.search.snackbar.userNotFound')}
        </Typography>
      </Stack>
    )

  return (
    <Stack pb={4}>
      {users?.map(
        (user, index) =>
          user.username !== userData.username && (
            <Stack key={user.username}>
              <UserButton user={user} />
              {index !== users.length - 1 && <Divider />}
            </Stack>
          )
      )}
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
