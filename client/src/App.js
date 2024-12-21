
import './App.css';
// import Header from './components/Header';
import Login from './components/Login.js';
import PageNotFound from './components/PageNotFound';
import Register from './components/Register';
// import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import {Routes, Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Dashboard from './components/user/Dashboard.js';
import Profile from './pages/Profile';
import PrivateRoutes from './components/PrivateRoutes.js';
import NewPost from './components/NewPost.js';
import UpdatePost from './pages/UpdatePost';
import CategoryCRUD from './pages/CategoryCRUD';
import Shots from './pages/Shots';
import OtherProfile from './pages/OtherProfile';
import Settings from './pages/Settings';
function App() {
  return (
    <   ><Toaster/>
    
    <Routes>
      
      <Route path ='/' element={<LandingPage/>}/>
      <Route path ='/login' element={<Login/>}/>

      <Route path ='/dashboard' element={<PrivateRoutes/>}>
      <Route path='' element={<Dashboard/>}>

      </Route>
      </Route>

      
      <Route path ='/register' element={<Register/>}/>
      <Route path ='*' element={<PageNotFound/>}/> 
      <Route path ='/profile' element= {<PrivateRoutes/>}>
        <Route path ='' element ={<Profile/>}/>
        
      </Route>
      <Route path = 'categorycrud'element={<CategoryCRUD/>}/>
      <Route path='/new-post' element={<NewPost/>}/>
      <Route path ='/update-post/:id' element={<UpdatePost/>}/>
      <Route path ='/shots/:id' element={<Shots/>}/>
      <Route path ='/watch-profile/:id' element ={<OtherProfile/>}/>
      <Route path ='settings'element={<Settings/>}/>
    </Routes>
    </> 
  );
}

export default App;
