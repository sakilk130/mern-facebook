import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreatePostModal from './components/create-post-modal';
import axiosInstance from './config/axios';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import Reset from './pages/reset';
import { AppState } from './redux/store';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const user = useSelector((state: AppState) => state.user);

  useEffect(() => {
    if (user) {
      console.log('first');
      const getAllPosts = async () => {
        try {
          setLoading(true);
          const { data } = await axiosInstance.get('/posts');
          setLoading(false);
          setPosts(data.data);
        } catch (error: any) {
          setLoading(false);
          setError(
            error.response.data.error ??
              error.response.data.message ??
              'Something went wrong',
          );
        }
      };
      getAllPosts();
    }
  }, [user]);

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
          <Route
            path="/"
            element={
              <Home
                setShowModal={setShowModal}
                postData={{
                  posts,
                  loading,
                  error,
                }}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
