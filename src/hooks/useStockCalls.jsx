import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getSuccess,
  deleteProduct,
  getProCatBrandsSuccess,
} from "../features/stockSlice";
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
    const getCategories = () => getStockData("categories");
    const getBrands = () => getStockData("brands");
    const getProducts = () => getStockData("products");

    const getProCatBrands=async()=>{
      dispatch(fetchStart());
      try {
        const [products,categories,brands]=await Promise.all(
          [axiosWithToken.get("stock/products/")],
          [axiosWithToken.get("stock/categories/")],
          [axiosWithToken.get("stock/brands/")]
        );
        dispatch(
          getProCatBrandsSuccess(products.data, categories.data, brands.data)
        );
      } catch (error) {
        
      }
    }

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
    const deleteBrand = (id) => deleteStockData
("brands", id);
    const deleteProduct = (id) => deleteStockData("product",id)

    const postStockData = async (info,url) => {
      try {
        await axiosWithToken.post(`stock/${url}/`, info);
        toastSuccessNotify(`${url} successfuly posted`);
        getStockData(url);
      } catch (error) {
        console.log(error);
        toastErrorNotify(`${url} can not be posted`);
      }
    };
    const postFirm = (info) => postStockData(info,"firms");
    const postBrand = (info) => postStockData(info, 
"brands");

    const putStockData = async (info, url) => {
      try {
        await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
        toastSuccessNotify(`${url} successfuly updated`);
        getStockData(url);
      } catch (error) {
        console.log(error);
        toastErrorNotify(`${url} can not be updated`);
      }
    };
    const putFirm = (info) => putStockData(info, "firms");
    const putBrand = (info) => putStockData(info, "brands");


  return {
    getStockData,
    getFirms,
    getSales,
    getCategories,
    getProducts,
    getBrands,
    deleteFirm,
    deleteBrand,
    postFirm,
    postStockData,
    postBrand,
    putFirm,
    putStockData,
    putBrand,
    deleteProduct,
  };
}

export default useStockCalls