import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppContext } from "./contexts/AppContext";
import "./index.css";
import Layout from "./layouts/Layout";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import Register from "./pages/Register";
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
              <div>This is the home page.</div>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <div>This is the Search page.</div>
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
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
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
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
