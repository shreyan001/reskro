import { AppBar as MuiAppBar, Typography, styled, Box, Button } from '@mui/material'

type AppBarProps = {
  isLoggedIn: boolean
  onLogin: () => void
  onLogout: () => void
}

const AppBar = ({ isLoggedIn, onLogin, onLogout }: AppBarProps) => {
  return (
    <nav className="navbar">
      <div className="logo">
          <img src="/logo.png" alt="reskro logo" />
          <h1>reskro</h1>
        </div>
   
     

      <div>
        {isLoggedIn ? (
          <button className="btn1" onClick={()=>onLogout}>
            Log Out
          </button>
        ) : (
          <button className="btn1" onClick={onLogin}>
            Login
          </button>
        )}
      </div>
    </nav>
  )
        };

export default AppBar
