import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

const DEFAULT_COLORS = [
  "#8884D8", // Purple
  "#FF8042", // Orange
  "#FFBB28", // Yellow
  "#82CA9D", // Light Green
  "#A28FD0", // Lavender
  "#E08283", // Salmon
  "#3498DB", // Blue
  "#E74C3C", // Red
  "#F39C12", // Dark Orange
];

const MAJORITY_COLOR = "#00C49F";
const EMPTY_STATE_MESSAGE = "No votes to display";

export default function VotingPie({
  votes = [],
  reveal = false,
  className = "",
}) {
  const { data, mostVotedPoint, totalVotes, hasVotes } = useMemo(() => {
    const counts = votes.reduce((acc, vote) => {
      acc[vote] = (acc[vote] || 0) + 1;
      return acc;
    }, {});

    // Format data for the chart
    const chartData = Object.entries(counts).map(([value, count]) => ({
      name: value,
      value: count,
      percentage: 0,
    }));

    const totalVotes = votes.length;

    // Calculate percentages
    chartData.forEach((item) => {
      item.percentage = Math.round((item.value / totalVotes) * 100);
    });

    // Find the most voted point
    let mostVoted = { name: "", value: 0 };
    if (chartData.length > 0) {
      mostVoted = chartData.reduce(
        (max, item) => (item.value > max.value ? item : max),
        chartData[0]
      );
    }

    return {
      data: chartData,
      mostVotedPoint: mostVoted.name,
      totalVotes,
      hasVotes: chartData.length > 0,
    };
  }, [votes]);

  // Don't render if not revealed or no data
  if (!reveal || !hasVotes) {
    return null;
  }

  return (
    <div
      className={`voting-pie-container ${className}`}
      data-testid="voting-pie"
    >
      <div className="most-voted-display">
        <h2>Most Voted: {mostVotedPoint}</h2>
        <p>
          {totalVotes} total vote{totalVotes !== 1 ? "s" : ""}
        </p>
      </div>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={30}
              label={({ name, percentage }) => `${name}: ${percentage}%`}
              paddingAngle={2}
            >
              {data.map((entry, index) => {
                const isMajority = entry.name === mostVotedPoint;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      isMajority
                        ? MAJORITY_COLOR
                        : DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                    }
                    stroke="#fff"
                    strokeWidth={1}
                  />
                );
              })}
              <Label
                value={mostVotedPoint}
                position="center"
                style={{ fontSize: "24px", fontWeight: "bold" }}
              />
            </Pie>
            <Tooltip
              formatter={(value, name) => [
                `${value} vote${value !== 1 ? "s" : ""} (${
                  data.find((d) => d.name === name)?.percentage
                }%)`,
                `Point: ${name}`,
              ]}
            />
            <Legend verticalAlign="bottom" layout="horizontal" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
