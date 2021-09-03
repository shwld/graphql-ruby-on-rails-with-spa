import { useCurrentUserQuery } from '@/graphql/generated'

export const useCurrentUser = () => {
  const { data, loading } = useCurrentUserQuery()
  const currentUser = data?.currentUser

  return { currentUser, loading }
}
