import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {AiOutlineMenu} from 'react-icons/ai';
import { uiActions } from '../../store/ui-slice';
import chainActions from '../../store/chain-slice';
import classes from './NavbarWrap.module.css';
import Nav from './nav';
import { Link } from 'react-router-dom';
import logo from '../../images/logo1.png';
import Cart from '../Cart/Cart';
import {BsCart2} from 'react-icons/bs'


const NavbarWrap = props => {
const dispatch=useDispatch();
const navState=useSelector(state=>state.ui.navState);
const showCart=useSelector(state=>state.ui.showCart);
const showNavHandler=()=>{
    dispatch(uiActions.setNavState(true));
};
const hideNavHandler=()=>{
    dispatch(uiActions.setNavState(false));
};
const showCartHandler=()=>{
    dispatch(uiActions.Cart());
dispatch(uiActions.setNavState(false));
};
const ConnectWallet = async()=>{
    if(typeof window!= "undefined" && typeof window.ethereum !="undefined") {
      try{
          //metamask is already installed!
          const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
          dispatch(chainActions.setConnectMessage('Connected'));
          dispatch(chainActions.setCurrentAccount(accounts[0]));
          dispatch(chainActions.setConnectWallet(true))
          console.log(accounts[0]);
         
      }
      catch(err){
          console.log(err);
      }
    }
    else{
      console.log("metamask is not installed!! please install metamask.")
    }
    }
  return (
    <div>
        {showCart && <Cart></Cart>}
         {!navState && <div className={classes.menu} >
            <AiOutlineMenu className={classes.menuButton} variant="primary" onClick={showNavHandler}/>
         <BsCart2 onClick={showCartHandler} className={classes.img} size='3rem'></BsCart2></div>}

     <Offcanvas show={navState} onHide={hideNavHandler} className={classes.Offcanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><img src={logo} className={classes.logo}></img><Link to='/' className={classes.hm}>AgroConnect</Link></Offcanvas.Title>
        </Offcanvas.Header><hr/>
        <Offcanvas.Body>
       <Nav connectWallet={ConnectWallet}></Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default NavbarWrap
