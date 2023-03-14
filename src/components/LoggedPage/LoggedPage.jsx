import { Button } from '@mui/material'

import { useAuth } from '@contexts'

const LoggedPage = () => {
  const { signOut } = useAuth()

  return (
    <div>
      <h1>Logged Page</h1>
      <Button onClick={signOut}>Sair</Button>
    </div>
  )
}

export { LoggedPage }
