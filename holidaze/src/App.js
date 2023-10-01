import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/nav/navbar';
import Footer from './components/footer/footer';
import Home from './pages/home';
import VenuePage from './pages/venue';
import Login from './pages/login';
import Register from './pages/register';
import SuccessPage from './pages/success/success-page';
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/profile';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/venue/:id" element={<VenuePage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
