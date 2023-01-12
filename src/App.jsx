import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BookStoreProvider } from "./context/BookStoreContext";
import Layout from "./components/Layout";
import MainPage from "./components/MainPage";
import AddBookForm from "./features/book/AddBookForm";
import RegisterForm from "./features/authenticationForms/RegisterForm";
import LoginForm from "./features/authenticationForms/LoginForm";
import CartPage from "./features/cart/CartPage";

const App = () => {
  return (
    <AuthProvider>
      <BookStoreProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="add-book" element={<AddBookForm />} />
            <Route path="register" element={<RegisterForm />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BookStoreProvider>
    </AuthProvider>
  );
};

export default App;
