import React from "react";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../Admin/Api";
import {
  Container,
  Row,
  Col,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Alerta from "../component/alert";
import "../../styles/formularioRegister.css";

const FormularioRegister = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [statusError, setStatusError] = React.useState(false);
  const [color, setColor] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleRegister = (ev) => {
    ev.preventDefault();

    if (!email || !password) {
      setColor("danger");
      setMessage("Debes llenar todos los campos");
      setStatusError(true);
      return;
    }

    fetch(`${BASE_URL}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User created successfully") {
          setColor("success");
          setMessage("Usuario creado exitosamente");
          setStatusError(true);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setColor("danger");
          setMessage("No se pudo crear el usuario");
          setStatusError(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1 className="text-center mt-5">Crear cuenta</h1>
      <Container className="d-grid w-50 mb-5 boderFomulario">
        {statusError && <Alerta color={color} message={message} />}
        <Row>
          <Col>
            <CardBody>
              <Form onSubmit={handleRegister}>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="email" className="mr-sm-2">
                    Correo electrónico
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder=""
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </FormGroup>
                <FormGroup className="pb-2 mr-sm-2 mb-sm-0">
                  <Label for="password" className="mr-sm-2">
                    Contraseña
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder=""
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                  />
                </FormGroup>
                <Button type="submit" className="colorBoton mt-3">
                  Crear
                </Button>
              </Form>
            </CardBody>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormularioRegister;
