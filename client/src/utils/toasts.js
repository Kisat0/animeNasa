import { toast } from "react-toastify";

const options = {
  autoClose: 5000,
  className: "",
  theme: "colored",
};

export const toastSuccess = (message) => {
  toast.success(message, options);
};

export const toastWarning = (message) => {
  toast.warning(message, options);
};

export const toastFail = (message) => {
  toast.error(message, options);
};

export const toastInfo = (message) => {
  toast.info(message, options);
};
