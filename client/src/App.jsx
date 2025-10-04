import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Navbar } from "./Components/Navbar";
import { Error } from "./pages/Error";
import { AdminLayout } from "./Components/layouts/admin_Layout";
import { AdminContacts } from "./pages/Admin_Contacts";
import { AdminUsers } from "./pages/Admin_Users";
import { UpdateUser } from "./pages/Admin_Updatate";
import {UpdateContact} from "./pages/Admin_C_Update";
import { ErrorBoundary } from "./Components/ErrorBoundary";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers/>}/>
          <Route path="/admin/users/:id/edit" element={<UpdateUser/>} />
          <Route path="contacts" element={<AdminContacts/>}/>
          <Route path="/admin/contacts/:id/edit" element={  <ErrorBoundary>
        <UpdateContact />
      </ErrorBoundary>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
