import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

type VotesChartProps = {
  data: {
    name: string;
    value: number;
  }[];
} & Omit<React.ComponentProps<typeof ResponsiveContainer>, "children">;

const colors = ["#9ECE9A", "#74A57F", "#077187", "#8CABBE"];

export const VotesChart = ({ data, ...props }: VotesChartProps) => {
  return (
    <ResponsiveContainer width={"100%"} height={400} {...props}>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          data={data}
          cx={"50%"}
          cy={"50%"}
          strokeWidth={2}
          outerRadius={120}
          fill="#8884d8"
          labelLine={false}
          label={CustomizedLabel}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

const CustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  payload,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central">
      {percent > 0 &&
        ((payload.name as string).length > 5
          ? payload.name.slice(0, 5) + "..."
          : payload.name)}
    </text>
  );
};
