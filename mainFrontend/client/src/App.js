import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Custumer from './Component/Custumer';
// import { useSelector } from 'react-redux';
import Profile from './FarmerComp/Profile/Profile';
import Root from './Root';
import AddItem from './FarmerComp/AddProduct/AddItem';
import ErrorPage from './pages/Error';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AuthenticationPage,{action as authAction} from './pages/Authentication';
import { fetchAvailableProducts } from './store/products-action';
import CustumerProfile from './Component/Layout/Custumer-Profile';
import Purchase from './Component/Layout/Purchase';
import Metamask from './FarmerComp/AddProduct/Metamask';
import { tokenLoader,checkAuthLoader } from './util/auth';
import { action as logoutAction } from './pages/Logout';
import MainPage from './FarmerComp/Farmers_Corner/mainPage';


// import { uiActions } from './store/ui-slice';

const router=createBrowserRouter([
  {path:'/',
element:<Root />,
errorElement:<ErrorPage/>,
id:'root',
loader:tokenLoader,
children:[
  {index:true,element:<Custumer />},
  {path:'farmer',element:<Profile />,loader:checkAuthLoader},
  {path:'corner',element:<MainPage />},
  {path:'farmer/metamask',element:<Metamask />,loader:checkAuthLoader},
  {path:'farmer/addItem',element:<AddItem />,loader:checkAuthLoader},
  {path:'profile',element:<CustumerProfile />,loader:checkAuthLoader},
  {path:'purchase',element:<Purchase />,loader:checkAuthLoader},
]},
{path:'auth',element:<AuthenticationPage/>,action:authAction},
{path:'logout',action:logoutAction}
]);
function App() {

const dispatch=useDispatch();
useEffect(()=>{
    dispatch(fetchAvailableProducts());
  },[dispatch]);
return <RouterProvider router={router} />;
}

export default App;
