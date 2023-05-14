import { Box, Button, Stack, Typography } from '@mui/material'

import { Avatar } from '@atoms/Avatar'
import { Divider } from '@atoms/Divider'

import { useNavigateSearch } from '@hooks'

const List = ({ rankedUsers }) => {
  const navigateSearch = useNavigateSearch()

  const handleGoToProfile = username => navigateSearch('/profile', { username })

  return rankedUsers.map((user, index) => (
    <Button
      key={user.username}
      component={Box}
      display="flex"
      disableRipple
      flexDirection="column"
      fullWidth
      sx={{ p: 0 }}
    >
      <Stack
        alignItems="center"
        component={Button}
        direction="row"
        fullWidth
        justifyContent="flex-start"
        onClick={() => handleGoToProfile(user.username)}
        px={2}
        columnGap={2}
        textAlign="left"
        textTransform="none"
      >
        <Typography fontWeight={700}>{index + 4}</Typography>
        <Avatar user={user} />
        <Stack>
          <Typography color="text.primary" fontWeight={500} variant="body2">
            {user.name}
          </Typography>
          <Typography
            color="disabled"
            fontWeight={700}
            variant="caption"
          >{`@${user.username}`}</Typography>
        </Stack>
      </Stack>
      {index !== rankedUsers.length - 1 && (
        <Box width="100%">
          <Divider color="disabled" size="small" />
        </Box>
      )}
    </Button>
  ))
}

export { List }
