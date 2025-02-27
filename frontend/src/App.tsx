import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";

export default function App() {
 const {isLoggedIn}=useAppContext()
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search/>
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <Login />
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

        {
          isLoggedIn && (
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
          )
        }
          {
          isLoggedIn && (
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels/>
                </Layout>
              }
            />
          )
        }
          {
          isLoggedIn && (
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                 <EditHotel/>
                </Layout>
              }
            />
          )
        }
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}
