import './App.css';
import Title from "./components/title";
import SideBar from "./components/sideBar";
import MainPage from './container/mainPage';
import BorrowPage from './container/borrowPage';
import ReturnPage from './container/returnPage';
import EquipmentListPage from './container/equipmentListPage';
import EquipmentRecordPage from './container/equipmentRecordPage';
import ActivitiesRecordPage from './container/activitiesRecordPage';
import EquipmentPage from './container/equipmentPage';
import ActivityPage from './container/activityPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Title />
        <SideBar />
        <div className="container">
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/borrow" element={<BorrowPage />} />
              <Route path="/return" element={<ReturnPage />} />
              <Route path="/equipmentList" element={<EquipmentListPage />} />
              <Route path="/equipmentRecord" element={<EquipmentRecordPage />} />
              <Route path="/activitiesRecord" element={<ActivitiesRecordPage />} />
              <Route path="/equipment/:id" element={<EquipmentPage />} />
              <Route path="/activity/:id" element={<ActivityPage />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
