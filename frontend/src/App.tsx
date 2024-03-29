import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppContext } from "./contexts/AppContext";
import "./index.css";
import Layout from "./layouts/Layout";
import AddHotel from "./pages/AddHotel";
import Booking from "./pages/Booking";
import EditHotel from "./pages/EditHotel";
import Home from "./pages/Home";
import HotelDetail from "./pages/HotelDetail";
import MyBookings from "./pages/MyBookings";
import MyHotels from "./pages/MyHotels";
import Register from "./pages/Register";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <HotelDetail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
