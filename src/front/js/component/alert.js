import React from "react";
import {Alert} from "reactstrap";
import PropTypes from "prop-types";

const Alerta = (props) => {
    return (
      <Alert color={props.color}>
        {props.message}
      </Alert>
    );
}

Alerta.propTypes = {
  texto: PropTypes.string,
  color: PropTypes.string
};

export default Alerta;
