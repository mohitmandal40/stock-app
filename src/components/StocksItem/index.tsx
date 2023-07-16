import classes from "./stocksItem.module.css";
import Chart from "../common/Chart";
import { formatUSDollar } from "../../utils/helper";

type StocksItemProp = {
  stock: Stock;
};

const StocksItem: React.FC<StocksItemProp> = ({ stock }) => {
  const lineColor = (item: Stock) => {
    const returns =
      item.stockGraph[item.stockGraph.length - 1].y - item.stockGraph[0].y;

    return returns >= 0 ? "#47B96D" : "#D83044";
  };
  return (
    <li className={classes.stockItem}>
      <div className={classes.stockTextContainer}>
        <div className={classes.stockSymbol}>{stock.stockSymbol}</div>
        <div className={classes.stockName}> {stock.stockName}</div>
      </div>
      <div className={classes.stockChart}>
        <Chart
          height="20px"
          chartDataPoints={stock.displayChart}
          fillColor={lineColor(stock)}
        />
      </div>
      <div>
        <div className={classes.stockCurrentPrice}>
          ${formatUSDollar(stock.currentPrice)}
        </div>
        <div
          className={classes.percentageGain}
          style={{ color: lineColor(stock) }}
        >
          {stock.percentageGain.toFixed(2)}%
        </div>
      </div>
    </li>
  );
};

export default StocksItem;
