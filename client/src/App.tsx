import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreatePostModal from './components/create-post-modal';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import Reset from './pages/reset';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      {/* <CreatePostModal /> */}
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/reset" element={<Reset />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
