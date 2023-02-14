import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { IUser } from '../interfaces/user';
import { AppState } from '../redux/store';

const PublicRoute = () => {
  const user = useSelector((state: AppState) => state.user as IUser);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
