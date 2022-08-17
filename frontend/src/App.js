import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './component/login/Login';
// import Claim from './component/claim/Claim';
import Dashboard from './component/dashboard/Dashboard';
import Approved from './component/approved/Approved';
// import Navbar from './component/navbar/Navbar';
// import UpperHeader from './component/upperheader/Upperheader';
// import Header from './component/header/Header';
// import LowerHeader from './component/lowerheader/LowerHeader';
import Inprogress from  './component/inprogress/Inprogress';
import './App.css';
import PrivateComponent from './component/privatecomponent/PrivateComponent';
import EditExpense from './component/editexpense/EditExpense';



function App() {
  return (


    
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route element={<PrivateComponent/>}>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/approvedClaim' element={<Approved/>}></Route>
            <Route path='/inprogress' element={<Inprogress/>}></Route>
            {/* <Route path='/editClaim/:id' element={<EditExpense/>}></Route> */}
            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
