import React, { useState } from "react";
import "react-vis/dist/style.css";
import {
  LineSeries,
  Crosshair,
  MarkSeries,
  FlexibleXYPlot,
  LineSeriesPoint,
} from "react-vis";

import classes from "./chart.module.css";

interface ChartProps {
  height: string;
  chartDataPoints: StockDataPoint[] | undefined;
  fillColor?: string;
}

const Chart: React.FC<ChartProps> = ({
  height,
  chartDataPoints,
  fillColor = "black",
}) => {
  const [crosshairValues, setCrosshairValues] = useState<LineSeriesPoint[]>([]);

  const markStyle = {
    fill: fillColor,
  };

  const formatMonth = (timestamp: number): string => {
    const date = new Date(timestamp);
    const month = date.toLocaleString("default", { month: "short" });
    return month;
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const month = formatMonth(timestamp);
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const handleMouseLeave = (): void => {
    setCrosshairValues([]);
  };

  const handleNearestX = (value: LineSeriesPoint): void => {
    setCrosshairValues([value]);
  };

  return (
    <div className={classes.chartContainer} style={{ height: height }}>
      <FlexibleXYPlot
        onMouseLeave={handleMouseLeave}
        margin={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <LineSeries
          data={chartDataPoints}
          color={fillColor}
          onNearestX={handleNearestX}
        />
        <Crosshair
          values={crosshairValues}
          style={{
            title: {
              zIndex: 10,
            },
            line: {
              width: "0px",
              transform: "translateX(-0.5px)",
              borderRight: "dashed 1px #b9c1c8",
              background: "none",
            },
          }}
        >
          <div className={classes.crossHair}>
            {crosshairValues.map((value, index) => (
              <div key={index}>
                <div
                  style={{ fontWeight: "bold", fontSize: "0.8rem" }}
                >{`$${value.y}`}</div>
                <div>{formatDate(value.x)}</div>
              </div>
            ))}
          </div>
        </Crosshair>
        <MarkSeries data={crosshairValues} style={markStyle} />
      </FlexibleXYPlot>
    </div>
  );
};

export default Chart;
