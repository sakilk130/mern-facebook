import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreatePostModal from './components/create-post-modal';
import { IUser } from './interfaces/user';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import Reset from './pages/reset';
import { AppState } from './redux/store';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { user } = useSelector((state: AppState) => state.user as IUser);

  return (
    <BrowserRouter>
      {showModal && user && (
        <CreatePostModal setShowModal={setShowModal} showModal={showModal} />
      )}
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/reset" element={<Reset />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home setShowModal={setShowModal} />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
