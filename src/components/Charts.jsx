import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import { LineChart } from "@tremor/react";
import { useSelector } from "react-redux";

const Charts = () => {
  const { sales, purchases } = useSelector((state) => state.stock);

  const dataFormatter = (number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`;

  const salesData = sales?.map((item) => ({
    date: item.createds,
    sales: Number(item.price_total),
  }));

  const purchasesData = purchases?.map((item) => ({
    date: item.createds,
    purchases: Number(item.price_total),
  }));

  return (
    <Grid container justifyContent="center" spacing={2} mt={3}>
      <Grid item sm={12} md={6}>
        <Card sx={{ p: 3 }}>
          <Typography>Daily Sales (USD)</Typography>
          <LineChart
            data={salesData}
            dataKey="date"
            categories={["sales"]}
            colors={["blue"]}
            valueFormatter={dataFormatter}
            marginTop="mt-6"
          />
        </Card>
      </Grid>
      <Grid item sm={12} md={6}>
        <Card sx={{ p: 3 }}>
          <Typography>Daily Purchases (USD)</Typography>
          <LineChart
            data={purchasesData}
            dataKey="date"
            categories={["purchases"]}
            colors={["red"]}
            valueFormatter={dataFormatter}
            marginTop="mt-6"
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Charts;
