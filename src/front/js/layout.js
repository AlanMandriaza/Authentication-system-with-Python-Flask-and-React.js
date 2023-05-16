import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Formulario from "./pages/formulario";
import FormularioRegister from "./pages/formularioRegister";
import injectContext from "./store/appContext";
import ScrollToTop from "./component/scrollToTop";
import PrivateComponent from "./pages/privatecomponent";
import NavBarComponent from "./pages/navBarComponent";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <NavBarComponent />
          <Routes>
            <Route path="/login" element={<Formulario />} />
            <Route path="/register" element={<FormularioRegister />} />
            <Route path="/private" element={<PrivateComponent />} />
            <Route path="*" element={<h1>Not found!</h1>} /> // Manejo de ruta no encontrada
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
