import { ToastProgrammatic as Toast } from "buefy";

const SUCCESS = ({
  message = "Operación realizada Correctamente",
  type = "is-info",
  duration = 2000,
  position = "is-bottom",
} = {}) => {
  Toast.open({
    message,
    type,
    duration,
    position,
  });
};

const ERROR = ({
  message = "Operación Fallida!",
  type = "is-danger",
  duration = 2000,
  position = "is-bottom",
} = {}) => {
  Toast.open({
    message,
    type,
    duration,
    position,
  });
};

const SERVER_ERROR = ({
  message = "Ocurrió un problema en el Servidor",
  type = "is-danger",
  duration = 3000,
  position = "is-bottom",
  queue = true,
} = {}) => {
  Toast.open({
    message,
    type,
    duration,
    position,
    queue,
  });
};


export { SUCCESS, SERVER_ERROR, ERROR};