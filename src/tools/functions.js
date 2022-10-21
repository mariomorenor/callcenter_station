const messages = require("./Messages");

const HANDLE_ERROR_RESPONSE = ({response}) => {
  switch (response.status) {
    case 401:
      messages.ERROR({message:response.data.message});
      break;
    case 403:
      messages.ERROR({message:response.data.message});
      break;
    case 404:
      messages.ERROR({message:response.data.message});
      break;
    case 500:
      response.data.forEach((element) => {
        messages.SERVER_ERROR({ message: element.message });
      });
      break;
  }
};

export { HANDLE_ERROR_RESPONSE };