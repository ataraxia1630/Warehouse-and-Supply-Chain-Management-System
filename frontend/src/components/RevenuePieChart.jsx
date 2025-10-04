import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";

const RevenuePieChart = ({ data }) => (
  <>
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>

    <Box mt={2}>
      {data.map((region, i) => (
        <Box key={i} display="flex" alignItems="center" mb={1}>
          <Box
            width={12}
            height={12}
            borderRadius="50%"
            bgcolor={region.color}
            mr={1}
          />
          <Typography variant="body2">
            {region.name} - {region.value}%
          </Typography>
        </Box>
      ))}
    </Box>
  </>
);

export default RevenuePieChart;
