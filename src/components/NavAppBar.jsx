import {useState,Fragment,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';

import ListAltIcon from '@mui/icons-material/ListAlt';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../assets/Logo.jpg"
import { NavLink } from "react-router-dom"

import ComparatorDrawerInfo from './ComparatorDrawerInfo';

const pages = [{name:'Home',url:'/'}, {name: 'Employes of OGMA' , url: '/list'}];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [state, setState] = useState({
    right: false,
  });

  

  function setComparationList(){
    setComparatorList(JSON.parse(localStorage.getItem("compareList")));

  }

  useEffect(() => {
    
    setComparationList();

    

  }, []);



  

const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [comparatorList, setComparatorList] = useState([]);

  

const list = (anchor) => (
    <ComparatorDrawerInfo anchor={anchor} toggleDrawer={toggleDrawer} comparatorList={comparatorList}/>
  );


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>         
        

          
          <nav id="navBar">
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
            {pages.map((page) => (
                <NavLink key={page} to={page.url} sx={{ my: 2, color: 'white', display: 'block', mr:10 }}>{page.name}</NavLink>
            ))}
            

          </Box>

          

          </nav>
            
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;


//<Badge badgeContent={JSON.parse(localStorage.getItem("compareList")).length} color="primary">