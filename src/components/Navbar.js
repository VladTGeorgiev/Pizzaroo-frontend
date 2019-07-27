    
import React from 'react'
import UserForm from './UserForm'

const Navbar = ({ user, signUp, logIn, logOut }) => {
    return (
        <nav>
            {
                user ? <div><button onClick={logOut}>Log out</button></div> :
                    <>
                        <UserForm submit={signUp} header={'Sign up'} />
                        <p style={{display: 'flex', justifyContent: 'center'}}>or</p>
                        <UserForm submit={logIn} header={'Log in'} />
                    </>
            }
        </nav>
    )
}

export default Navbar