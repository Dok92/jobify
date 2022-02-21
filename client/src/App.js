import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Error, Landing, Register, ProtectedRoute } from "./pages";
import { AllJobs, Profile, SharedLayout, Stats, AddJob } from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to='/'>Dashboard</Link>
        <Link to='/register'>Register</Link>
        <Link to='/landing'>Landing</Link>
      </nav>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/*' element={<Error />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
