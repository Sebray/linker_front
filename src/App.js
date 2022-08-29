import {Routes, Route} from 'react-router-dom';
import './App.css'
import {NotFoundPage} from './pages/NotFoundPage';
import {LoginPage} from './pages/LoginPage'
import {SignUpPage} from './pages/SignUpPage'
import {Layout} from './components/Layout'
import {OwnAccountPage} from "./pages/OwnAccountPage";
import {UpdateAccountPage} from "./pages/UpdateAccountPage";
import {AccountPage} from "./pages/AccountPage";
import {Row} from "react-bootstrap";
import {PeoplePage} from "./pages/PeoplePage";
import {FriendsPage} from "./pages/FriendsPage";

function App() {
  return (
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<LoginPage/>}/>
            <Route path="/account" element={<OwnAccountPage/>}/>
            <Route path="/account/new" element={<SignUpPage/>}/>
            <Route path="/account/update" element={<UpdateAccountPage/>}/>
            <Route path="/account/:id" element={<AccountPage/>}/>
            <Route path="/accounts" element={<PeoplePage/>}/>
              <Route path="/friends" element={<FriendsPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>

          </Route>
        </Routes>
  );
}

export default App;