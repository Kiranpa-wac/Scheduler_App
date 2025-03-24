import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Routers,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./Pages/HomePage";
import SignIn from "./Pages/SignIn";
import { userAtom } from "./atom";
import { useAtom } from "jotai";
import CalendarPage from "./Pages/CalendarPage";
const App = () => {
  const [user, setUser] = useAtom(userAtom);
  return (
    <Routers>
      <Routes>
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Routers>
  );
};

export default App;
