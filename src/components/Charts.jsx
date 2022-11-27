import { Card, Grid, Typography } from "@mui/material";
import { LineChart } from "@tremor/react";
import { useSelector } from "react-redux";

const Charts = () => {
  const {sales,purchases}=useSelector((state)=>state.stock)

  const dataFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()}%`;

  const salesData = sales?.map((sale) => ({
    date: sale.createds,
    sales: sale.price_total,
  }));

  return (
    <Grid container>
      <Grid item>
        <Card>
          <Typography>Daily Sales (USD)</Typography>
          <LineChart
            data={chartdata}
            dataKey="year"
            categories={["Population growth rate"]}
            colors={["blue"]}
            valueFormatter={dataFormatter}
            marginTop="mt-6"
            yAxisWidth="w-10"
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Charts;
