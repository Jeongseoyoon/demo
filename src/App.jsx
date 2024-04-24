import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import GetStarted from './pages/GetStarted';
import RegisterSpaceCraft from './pages/RegisterSpaceCraft';
import ScheduleContact from './pages/ScheduleContact';
import ManageContacts from './pages/ManageContacts';
import RegisteredSpaceCraft from './pages/RegisteredSpaceCraft';
import ManageGroundStation from './pages/ManageGroundStation';
import ContactProfile from './pages/ContactProfile';
import RegisteredContactProfile from './pages/RegisteredContactProfile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/get-started" replace />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/contact-profile" element={<ContactProfile />} />
          <Route path="/register-spacecraft" element={<RegisterSpaceCraft />} />
          <Route path="/schedule-contact" element={<ScheduleContact />} />
          <Route path="/manage-contacts" element={<ManageContacts />} />
          <Route path="/registered-spacecraft" element={<RegisteredSpaceCraft />} />
          <Route path="/registered-contact-profile" element={<RegisteredContactProfile/>} />
          <Route path="/manage-ground-station" element={<ManageGroundStation />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  // NOTE: 루트 경로 (/) 에서 get-started 로 리디렉션 필요 없으면 제거할 것
};

export default App;
