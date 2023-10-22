import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AppProvider from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import Landing from "./pages/Landing";
import Mission from "./pages/Mission";
import Opportunities from "./pages/Opportunities";
import SignIn from "./pages/SignIn";
import CreateAccount from "./pages/CreateAccount";
import Confirmation from "./pages/Confirmation";
import OpportunityPage from "./pages/OpportunityPage";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import Listings from "./pages/Listings";
import ResetPassword from "./pages/ResetPassword";
import Applications from "./pages/Applications";
import ApplicationPage from "./pages/ApplicationPage";

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/getstarted" element={<CreateAccount />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route
            path="/listings"
            element={
              <ProtectedRoute>
                <Listings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/opportunities/:organizationId/:id"
            element={<OpportunityPage />}
          />
          <Route
            path="/listings/:listingId/applications"
            element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listings/:listingId/applications/:id"
            element={
              <ProtectedRoute>
                <ApplicationPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </AppProvider>
    </Router>
  );
}

export default App;
