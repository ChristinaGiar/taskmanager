import React, { useContext } from 'react'
import { useRouteLoaderData, Form } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
import AuthContext from '../store/auth-context'

const User = ({ color }) => {
  const token = useRouteLoaderData('root')
  const crx = useContext(AuthContext)
  return (
    <>
      <div className='user-dropdown'>
        <Dropdown>
          <Dropdown.Toggle id='user-dropdown'>
            <i
              className='fa-solid fa-user'
              style={{ color: `${crx?.themeColor?.code}` }}
            ></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* {!token && 
                            <Link to="/auth?mode=login" className="user-link">
                                Login
                            </Link>}
                        {!token && 
                            <Link to="/auth?mode=signup" className="user-link">
                                Sign up
                            </Link>} */}
            {token && token !== 'EXPIRED' && (
              <Form action='/logout' method='post'>
                <button className='user-link'>Logout</button>
              </Form>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  )
}

export default User
