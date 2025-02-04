import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import CartPage from "./Pages/CartPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import Login from "./Pages/Login.jsx";
import ProductEntryPage from "./Pages/ProductEntryPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import Signup from "./Pages/Signup.jsx";
import SinglePageProduct from "./Pages/SingleProductPage.jsx";
import UpdateForm from "./Pages/updateForm.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productentry" element={<ProductEntryPage />} />
        <Route path="/update" element={<UpdateForm />} />
        <Route path="/productdetails" element={<SinglePageProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
