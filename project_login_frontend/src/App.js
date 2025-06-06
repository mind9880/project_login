import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route , useLocation } from 'react-router-dom';
import './components/Header.css'
import './components/SecondHeader.css'
import Header from './components/Header';
import SecondHeader from './components/SecondHeader';
import AboutUs from './components/AboutUs';
import Programs from './components/Programs';
import Events from './components/Events';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import CreateTeacher from './components/CreateTeacher';
import AddStudent from './components/AddStudent';
import TeacherLogin from './components/TeacherLogin';
import StudentLogin from './components/StudentLogin';
import AdminRegister from './components/AdminRegister';
import ForgotPassword from './components/ForgotPassword';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import Footer from './components/Footer';
function AppWrapper() {
  const location = useLocation();

  // List of routes where header, second header, and footer should NOT be shown
  const noHeaderFooterRoutes = [
    
  
    '/AdminDashboard',
    '/TeacherDashboard',
    '/StudentDashboard',
    '/ForgotPassword',
    '/CreateTeacher',
    '/AddStudent',
  ];

  // Check if current path is in the list
  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <SecondHeader />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/Programs" element={<Programs />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/CreateTeacher" element={<CreateTeacher />} />
        <Route path="/TeacherLogin" element={<TeacherLogin />} />
        <Route path="/AddStudent" element={<AddStudent />} />
        <Route path="/StudentLogin" element={<StudentLogin />} />
        <Route path="/AdminRegister" element={<AdminRegister />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;



