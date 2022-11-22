import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FirmCard from "../components/FirmCard";
import useStockCalls from "../hooks/useStockCalls";



const Firms = () => {

  const { getFirms } = useStockCalls();
  const {firms}=useSelector((state)=>state.stock)
  // const dispatch=useDispatch()
  // const {token}=useSelector((state)=>state.auth)
  // const BASE_URL = "https://14151.fullstack.clarusway.com/";
  // const getFirms=async()=>{
    // const url="firms"
    // dispatch(fetchStart())
    //  try {
      // // const { data } = await axios.get(`${BASE_URL}stock/firms/`,{headers:{Authorization:`Token ${token}`}});
      // console.log(data);
      // dispatch(getSuccess({data,url}))
    //  } catch (error) {
      // dispatch(fetchFail())
      //  console.log(error);
    //  }
  // }

  useEffect(() => {
    getFirms()
  }, [])
  
  
  return (
    <Box>
      <Typography variant="h4" color="error" mb={4}>
        Firms
      </Typography>
      <Button variant="contained">New Firm</Button>

      {firms?.length > 0 && (
        <Grid container justifyContent="center" gap={3}>
          {firms?.map((firm) => (
            <Grid item>
              <FirmCard key={firm.id} firm={firm}/>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Firms;
