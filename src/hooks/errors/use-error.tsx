import { HttpException } from "../../services/networking/types/http-exception";

export default function useError() {
  const showError = (error: HttpException) => {
    console.error(error);
  };

  return {
    showError,
  };
}
