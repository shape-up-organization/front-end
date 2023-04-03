import mockedFriends from '@mocks/users/friends/get'

import { Avatar, Button, Typography } from '@mui/material'

import { AutocompleteSearch } from '@atoms/AutocompleteSearch'

const AutocompleteSearchMessages = () => {
  const options = mockedFriends.data.friends
    .map(option => {
      const firstLetter = option.name[0].toUpperCase()
      return {
        firstLetter,
        ...option,
      }
    })
    .sort((a, b) => b.firstLetter.localeCompare(a.firstLetter))

  return (
    <AutocompleteSearch
      getOptionLabel={option => option.name}
      groupBy={option => option.firstLetter}
      options={options}
      placeholder="Procure por amigos"
      renderOption={(_, option) => (
        <Button
          fullWidth
          sx={{
            alignItems: 'center',
            display: 'flex',
            gap: 2,
            justifyContent: 'left',
            pl: 4,
            py: 1,
          }}
        >
          <Avatar alt={option.name} />
          <Typography
            color="text.primary"
            fontWeight="400"
            noWrap
            textTransform="none"
            variant="subtitle1"
          >
            {option.name}
          </Typography>
        </Button>
      )}
    />
  )
}

export { AutocompleteSearchMessages }
