
import { Outlet } from 'react-router'
import StyledNavbar from './Navbar'


const MainLayout = () => {
  return (
    <>
    <StyledNavbar/>
    <Outlet/>
    </>
  )
}

export default MainLayout 