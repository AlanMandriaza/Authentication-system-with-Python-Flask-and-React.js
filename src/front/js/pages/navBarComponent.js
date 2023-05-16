import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const NavBarComponent = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('user'); // Aquí asumimos que has almacenado el email del usuario en el local storage
  const isLoggedIn = !!userEmail; // Verificar si hay un usuario logeado

  const handleLogout = () => {
    // Aquí deberías implementar el proceso de cierre de sesión
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };

  const handlePrivateView = () => {
    // Aquí deberías implementar la lógica para navegar a la vista privilegiada
    navigate('/private');
  };

  const handleLogin = () => {
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"></NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink>{isLoggedIn ? `Email: ${userEmail}` : ''}</NavLink>
          </NavItem>
        </Nav>
        {isLoggedIn ? (
          <>
            <Button color="danger" onClick={handleLogout}>Cerrar Sesión</Button>
          </>
        ) : (
          <Button color="primary" onClick={handleLogin}>Iniciar Sesión</Button>
        )}
      </Navbar>
    </div>
  );
};

export default NavBarComponent;
