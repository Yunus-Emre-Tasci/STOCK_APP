import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";

const useStockCalls = () => {
  const dispatch=useDispatch()
  const {axiosWithToken}=useAxios()

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

    const deleteStockData = async (url, id, getMethod) => {
      try {
        await axiosWithToken.delete(`stock/${url}/${id}/`);
        toastSuccessNotify(`${url} successfuly deleted`);
        getStockData(url)
      } catch (error) {
        console.log(error);
        toastErrorNotify(`${url} can not be deleted`)
      }
    };

    const deleteFirm = (id) => deleteStockData("firms",id)


  return { getStockData, getFirms, getSales, deleteFirm };
}

export default useStockCalls