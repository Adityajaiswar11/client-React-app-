
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./pages/UserForm";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm/>} />
        <Route path="/user-display" element={<UserProfile/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
