import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Styled from '../styles'

const UserView = () => {
  const { id } = useParams()
  const user = useSelector((state) => state.users.find((e) => e.id === id))

  console.log('rams', id)
  console.log('users', user)

  if (!user) {
    return <div>Cannot find user</div>
  }

  return (
    <Styled.SingleBlogDiv>
      <h2>{user.name}</h2>
      <p>Added blogs:</p>
      <ul>
        {user.blogs.map((ele) => (
          <li key={ele.index}>{ele.title}</li>
        ))}
      </ul>
    </Styled.SingleBlogDiv>
  )
}

export default UserView
