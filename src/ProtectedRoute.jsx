import { Navigate } from "react-router-dom";
import { userAtom } from "./atom";
import { useAtom } from "jotai";


const ProtectedRoute = ({children}) => {
  const [user] = useAtom(userAtom);
  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
