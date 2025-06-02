import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from './components/protectedRoute.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element = {<SignUp/>}/>
         <Route path="/home" element={<ProtectedRoute> <Home />
 </ProtectedRoute>
        }
      />
      </Routes>
    </Router>
  );
};

export default App;
