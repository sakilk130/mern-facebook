import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { IUser } from '../interfaces/user';
import { AppState } from '../redux/store';

const PrivateRoute = () => {
  const user = useSelector((state: AppState) => state.user as IUser);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
