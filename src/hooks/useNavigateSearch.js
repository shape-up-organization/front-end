import { createSearchParams, useNavigate } from 'react-router-dom'

const useNavigateSearch = () => {
  const navigate = useNavigate()
  return (pathname, params) =>
    navigate({ pathname, search: `?${createSearchParams(params)}` })
}

export { useNavigateSearch }
