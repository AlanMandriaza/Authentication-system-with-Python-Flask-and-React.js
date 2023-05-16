import React, { useState } from "react";
import { Container, Row, Col, CardBody, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Alerta from "../component/alert";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BASE_URL } from "../Admin/Api";

const Formulario = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusError, setStatusError] = useState(false);
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");

  const loginHandler = (ev) => {
    ev.preventDefault();

    if (!username || !password) {
      setColor("danger");
      setMessage("Debes llenar todos los campos");
      setStatusError(true);
      return;
    }

    fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          setColor("danger");
          setMessage(data.error);
          setStatusError(true);
        } else if (data.access_token) {
          setColor("primary");
          setMessage(data.message || "Inicio de sesión exitoso");
          setStatusError(true);
          localStorage.setItem("user", username);
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          setTimeout(() => {
            navigate("/private");
          }, 2000);
        }
      })
      .catch((error) => {
        setColor("danger");
        setMessage("Error en el servidor");
        setStatusError(true);
      });
};


  return (
    <>
      <h1 className="text-center mt-5">Ingresar</h1>
      <Container className="d-grid w-50 mb-5 boderFomulario">
        {statusError && <Alerta message={message} color={color} />}
        <Row>
          <Col>
            <CardBody>
              <Form onSubmit={loginHandler}>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="exampleEmail" className="mr-sm-2">
                    Correo electrónico
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="ejemplo@ejemplo.com"
                    onChange={(ev) => setUsername(ev.target.value)}
                  />
                </FormGroup>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="examplePassword" className="mr-sm-2">
                    Contraseña
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="Contraseña"
                    onChange={(ev) => setPassword(ev.target.value)}
                  />
                </FormGroup>
                <Button type="submit" className="colorBoton">
                  Ingresar
                </Button>
                <Link className="text-center mt-5" to="/register">
                  <p>Crear cuenta</p>
                </Link>
              </Form>
            </CardBody>
          </Col>
        </Row>
        </Container>
    </>
  );
};

export default Formulario;