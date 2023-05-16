import React from "react";

const PrivateComponent = () => {
  // Comprueba si el usuario ha iniciado sesión
  const isLoggedIn = !!localStorage.getItem("access_token");

  // Si el usuario no ha iniciado sesión, se muestra un mensaje para iniciar sesión
  if (!isLoggedIn) {
    return (
      <>
        <h1>Inicia sesión para ver este contenido</h1>
      </>
    );
  }

  // Si el usuario ha iniciado sesión, se muestra el contenido privilegiado
  return (
    <>
      <h1>Bienvenido a la vista privilegiada</h1>
      <p>Este contenido solo es visible para usuarios autenticados.</p>
    </>
  );
};

export default PrivateComponent;
