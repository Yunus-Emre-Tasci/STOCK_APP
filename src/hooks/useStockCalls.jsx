import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
import {axiosWithToken} from "../service/axiosInstance"

const useStockCalls = () => {
  const dispatch=useDispatch()

    const getStockData = async (url) => {
      dispatch(fetchStart());
      try {
        const { data } = await axiosWithToken.get(`stock/${url}/`);
        console.log(data);
        dispatch(getSuccess({ data, url }));
      } catch (error) {
        dispatch(fetchFail());
        console.log(error);
      }
    };

    const getFirms = () => getStockData("firms")
    const getSales = () => getStockData("sales")


  return { getFirms, getSales };
}

export default useStockCalls