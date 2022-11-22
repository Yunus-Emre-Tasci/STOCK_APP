import { useEffect } from "react";
import useStockCalls from "../hooks/useStockCalls";

const Home = () => {
  
  const {getFirms}=useStockCalls()
  useEffect(() => {
    getFirms()
  }, [])
  
   
  return <div>Home</div>;
};

export default Home;
