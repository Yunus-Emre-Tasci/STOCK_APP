import axios from "axios";
import { useSelector } from "react-redux";

// const BASE_URL = "https://14151.fullstack.clarusway.com/";
// const BASE_URL = "http://127.0.0.1:8000/";
const BASE_URL = "https://yunusemre.pythonanywhere.com/";

//* Token'siz api istekleri icin bir instance oluştur.
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  mode: "cors",
});
const useAxios = () => {
  const { token } = useSelector((state) => state.auth);

  //* Token gerektiren istekler icin bir baska instance oluştur.
  const axiosWithToken = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Token ${token}` },
    mode: "cors",
  });

  return { axiosWithToken };
};

export default useAxios;
