import React, { useMemo, useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import { Award, Trophy, Code, Dog } from "lucide-react";
import "./VotingPie.css";

// Color constants
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

const MAJORITY_COLOR = "#4AD295"; // Darker green for most voted

export default function VotingPie({
  votes = [],
  reveal = false,
  className = "",
}) {
  // State for tracking animation
  const [isAnimating, setIsAnimating] = useState(false);

  const { data, mostVotedPoint, totalVotes, hasVotes, hasConsensus } =
    useMemo(() => {
      // Count the votes
      const counts = votes.reduce((acc, vote) => {
        acc[vote] = (acc[vote] || 0) + 1;
        return acc;
      }, {});

      // Check for consensus - only one type of vote (even if only one user)
      const isConsensus = Object.keys(counts).length === 1;

      console.log("Votes:", votes);
      console.log("Is consensus:", isConsensus);
      console.log("Vote counts:", counts);

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
        hasConsensus: isConsensus,
      };
    }, [votes]);

  // Simple confetti animation
  const ConfettiEffect = () => {
    return (
      <div className="confetti-container">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10px`,
              backgroundColor: ["#4AD295", "#35B87F", "#45CC8F"][i % 3],
            }}
          />
        ))}
      </div>
    );
  };

  // Trigger animation when consensus is revealed
  useEffect(() => {
    if (hasConsensus && reveal) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [hasConsensus, reveal]);

  // Show sealed/locked state if not revealed yet
  if (!reveal && hasVotes) {
    return (
      <div
        className={`voting-pie-container sealed ${className}`}
        data-testid="voting-pie-sealed"
      >
        <div className="voting-pie-content">
          <div className="sealed-overlay">
            <div className="lock-icon">🔒</div>
            <h3>Votes are sealed</h3>
            <p>Waiting for reveal...</p>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if no data
  if (!hasVotes) {
    return null;
  }

  // Choose icon based on consensus
  const renderIcon = () => {
    if (hasConsensus) {
      return <Trophy size={24} className="result-icon" />;
    } else {
      // Alternate between dog and code icons
      return mostVotedPoint % 2 === 0 ? (
        <Dog size={24} className="result-icon" />
      ) : (
        <Code size={24} className="result-icon" />
      );
    }
  };

  return (
    <div
      className={`voting-pie-container ${
        hasConsensus ? "consensus" : ""
      } ${className}`}
      data-testid="voting-pie"
    >
      <div className="voting-pie-content">
        {/* Confetti effect */}
        {isAnimating && hasConsensus && <ConfettiEffect />}

        <div
          className={`most-voted-display ${hasConsensus ? "consensus" : ""}`}
        >
          {hasConsensus ? (
            <>
              <div className="consensus-badge">
                <Trophy size={24} />
                <span>{totalVotes > 1 ? "CONSENSUS!" : "PERFECT CHOICE!"}</span>
                <Trophy size={24} />
              </div>
              <h2>
                {totalVotes > 1
                  ? `Everyone voted: ${mostVotedPoint}! 🏆`
                  : `${mostVotedPoint}! 🏆`}
              </h2>
              <p>
                {totalVotes > 1
                  ? `Perfect agreement with ${totalVotes} votes`
                  : `Single vote is in!`}
              </p>
            </>
          ) : (
            <>
              <h2>
                Most Voted: {mostVotedPoint} {renderIcon()}
              </h2>
              <p>
                {totalVotes} total vote{totalVotes !== 1 ? "s" : ""}
              </p>
            </>
          )}
        </div>

        <div
          className={`pie-chart-container ${
            hasConsensus ? "consensus-glow" : ""
          }`}
          style={{ width: "100%", height: 300 }}
        >
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={hasConsensus ? 110 : 100}
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
                      strokeWidth={hasConsensus ? 2 : 1}
                    />
                  );
                })}
                <Label
                  value={mostVotedPoint}
                  position="center"
                  style={{
                    fontSize: hasConsensus ? "32px" : "24px",
                    fontWeight: "bold",
                    fill: hasConsensus ? "#4AD295" : "#333",
                  }}
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

        {hasConsensus && (
          <div className="consensus-message">
            <Trophy size={20} color="#4AD295" />
            <span>Moving forward with point value: {mostVotedPoint}</span>
          </div>
        )}
      </div>
    </div>
  );
}
