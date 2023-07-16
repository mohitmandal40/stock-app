import React, { useState, useEffect } from "react";
import classes from "./stockDetails.module.css";
import { BsChevronLeft } from "react-icons/bs";
import Chart from "../../components/common/Chart";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PriceContainer from "../../components/PriceContainer";
import { LineSeriesPoint } from "react-vis";

interface StockData {
  stockSymbol: string;
  stockName: string;
  stockGraph: { x: number; y: number; ts: string }[];
  currentPrice: number;
  percentageGain: number;
  closePrice: string;
  lastTradePrice: string;
  outstanding: string;
  marketValue: string;
}

const durationOptions: { [key: string]: number } = {
  "1D": 7,
  "7D": 15,
  "1M": 30,
  "3M": 40,
  "1Y": 70,
};

const StockDetails: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [selectedDuration, setSelectedDuration] = useState<string>("1D");
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getChartDataPoints = (): LineSeriesPoint[] => {
    const durationInDays = durationOptions[selectedDuration];
    if (durationInDays) {
      return stockData?.stockGraph.slice(0, durationInDays) || [];
    } else {
      return stockData?.stockGraph || [];
    }
  };

  const handleButtonClick = (): void => {
    navigate("/stock");
  };

  const lineColor = (item: Stock) => {
    const returns =
      item.stockGraph[item.stockGraph.length - 1].y - item.stockGraph[0].y;
    return returns >= 0 ? "#47B96D" : "#D83044";
  };

  useEffect(() => {
    const fetchStockData = async (): Promise<void> => {
      try {
        const response = await axios.get<StockData>(
          `https://64b13a5b062767bc4825e1ea.mockapi.io/Investsky/stocksList/stocks/${params.symbol}`
        );
        const data = response.data;

        const lastStockGraphItem = data.stockGraph[data.stockGraph.length - 1];
        const closePrice = lastStockGraphItem.y.toFixed(2);
        const lastTradePrice = data.currentPrice.toFixed(2);
        const outstanding = (
          lastStockGraphItem.y - data.stockGraph[0].y
        ).toFixed(2);
        const marketValue = (data.currentPrice * +outstanding).toFixed(2);

        setStockData(() => ({
          ...data,
          closePrice,
          lastTradePrice,
          outstanding,
          marketValue,
        }));
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [params?.symbol]);

  return (
    <div className={classes.stockDetails}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {!Object.keys(stockData || {}).length && !loading && (
          <Link to="/stock">Wrong URL, Go to Stocks</Link>
        )}
      </div>
      <header className={classes.header}>
        {stockData?.currentPrice ? (
          <div className={classes.rightArrowIcon} onClick={handleButtonClick}>
            <BsChevronLeft />
          </div>
        ) : null}
        <div>
          <h3 className={classes.symbol}>{stockData?.stockSymbol}</h3>
          <p className={classes.stockName}>{stockData?.stockName}</p>
        </div>
      </header>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {stockData?.percentageGain ? (
              <div className={classes.currentPrice}>
                <h4 className={classes.stockPrice}>
                  ${stockData?.currentPrice.toFixed(2)}
                </h4>
                <p
                  className={classes.returns}
                  style={{ color: lineColor(stockData) }}
                >
                  {stockData?.percentageGain.toFixed(2)}%
                </p>
              </div>
            ) : null}
            <div className={classes.chartContainer}>
              <Chart height="150px" chartDataPoints={getChartDataPoints()} />
            </div>
            {stockData?.stockGraph.length ? (
              <div className={classes.duration}>
                {Object.keys(durationOptions).map((item) => (
                  <button
                    key={item}
                    className={`${classes.circleOutlineContainer} ${
                      selectedDuration === item ? classes.active : ""
                    }`}
                    onClick={() => setSelectedDuration(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
            {stockData?.closePrice && (
              <PriceContainer
                closePrice={stockData.closePrice}
                lastTradePrice={stockData.lastTradePrice}
                outstanding={stockData.outstanding}
                marketValue={stockData.marketValue}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default StockDetails;
