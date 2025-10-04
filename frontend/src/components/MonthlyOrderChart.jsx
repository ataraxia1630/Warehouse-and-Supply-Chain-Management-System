import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyOrderChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="series1"
        stroke="#fbbf24"
        strokeWidth={2}
      />
      <Line
        type="monotone"
        dataKey="series2"
        stroke="#8b5cf6"
        strokeWidth={2}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default MonthlyOrderChart;
