import { toast, ToastContent, ToastOptions } from "react-toastify";

// Define types for toast methods
type ToastType = "success" | "error" | "warn" | "info";

// `msg` as string and `type` as ToastType
export const createToaster = (msg: ToastContent, type: ToastType = "error") => {
  toast[type](msg, { position: "top-center" });
};

const success: ToastType = "success";
const error: ToastType = "error";
const warn: ToastType = "warn";
const info: ToastType = "info";

const toastify = (type: ToastType = success, msg: ToastContent) => {
  const options: ToastOptions = { position: "top-center" };

  switch (type) {
    case success:
      return toast.success(msg, options);
    case error:
      return toast.error(msg, options);
    case warn:
      return toast.warn(msg, options);
    case info:
      return toast.info(msg, options);
    default:
      return toast.success(msg, options);
  }
};

export default toastify;
