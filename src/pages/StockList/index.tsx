import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineBell } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import SwipeableViews from "react-swipeable-views";

import classes from "./stockList.module.css";

import StocksItem from "../../components/StocksItem";

// import { generateRandomNumber } from "../../utils/helper";
import { thirdItem, fourthItem } from "../../utils/data";
import CategoryTabs from "../../components/CategoryTabs";

// const updatedStocks = mockStocks.map((stock) => {
//   const stockGraph = [];

//   let currentDate = new Date();
//   for (let i = 1; i <= 50; i++) {
//     const timestamp = currentDate.toISOString();
//     stockGraph.push({ x: i, y: generateRandomNumber(), ts: timestamp });
//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   const firstY = stockGraph[0].y;
//   const lastY = stockGraph[stockGraph.length - 1].y;
//   const percentageGain = ((lastY - firstY) / firstY) * 100;
//   const formattedPercentageGain =
//     percentageGain < 0 ? -Math.abs(percentageGain) : +percentageGain;
//   return {
//     ...stock,
//     stockGraph,
//     currentPrice: lastY,
//     percentageGain: formattedPercentageGain,
//   };
// });

const StockList = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [stockName, setStockName] = useState("");
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);

  const stockHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStockName(e.target.value);

    let stockArr: Stock[] = [];

    if (currentTab === 0) stockArr = stocks;
    if (currentTab === 1) stockArr = fourthItem;
    if (currentTab === 2) stockArr = thirdItem;
    if (currentTab === 3) stockArr = fourthItem;

    const searchTerm = e.target.value.trim().toLowerCase();
    const filteredStocks = stockArr.filter(
      (stock) =>
        stock.stockSymbol.toLowerCase().includes(searchTerm) ||
        stock.stockName.toLowerCase().includes(searchTerm)
    );
    setFilteredStocks(filteredStocks);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios(
          "https://64b13a5b062767bc4825e1ea.mockapi.io/Investsky/stocksList/stocks"
        );
        const data = response.data.slice(0, 6);
        const updatedStocks = data.map((stock: Stock) => {
          const reducedStockGraph = stock.stockGraph.slice(-10);
          return {
            ...stock,
            displayChart: reducedStockGraph,
          };
        });
        setStocks(updatedStocks);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangeIndex = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <div className={classes.stocksContainer}>
      <div className={classes.headerContainer}>
        <header className={classes.stockHeader}>
          <img
            src="https://media.licdn.com/dms/image/D4D0BAQFKUBUMdNRxmQ/company-logo_200_200/0/1663682971053?e=1697673600&v=beta&t=whWzG-TS0OWVaYSjWsXAuMXw8Fjg9_xsSO_5RzN0Yns"
            alt="investskyIcon"
            width={20}
          />
          <AiOutlineBell fill="#fff" size={23} />
        </header>
        <div className={classes.searchContainer}>
          <h3 className={classes.marketHeading}>Markets</h3>
          <div className={classes.inputContainer}>
            <div className={classes.searchIcon}>
              <BiSearch size={20} />
            </div>
            <input
              type="text"
              className={classes.searchBox}
              placeholder="Search markets"
              onChange={stockHandler}
              value={stockName}
            />
          </div>
          <CategoryTabs
            currentTab={currentTab}
            handleChangeIndex={handleChangeIndex}
            setStockNameHandler={setStockName}
          />
        </div>
      </div>

      <SwipeableViews index={currentTab} onChangeIndex={handleChangeIndex}>
        <ul className={classes.stocksList}>
          {isLoading ? (
            <div className={classes.loader}>Loading...</div>
          ) : (
            <>
              {(stockName ? filteredStocks : stocks).map((stock) => (
                <Link
                  to={`/stock/${stock.stockSymbol}`}
                  key={stock.stockSymbol}
                >
                  <StocksItem stock={stock} />
                </Link>
              ))}
            </>
          )}
        </ul>
        <ul className={classes.stocksList}>
          <>
            {(stockName ? filteredStocks : fourthItem).map((stock) => (
              <Link to={`/stock/${stock.stockSymbol}`} key={stock.stockSymbol}>
                <StocksItem stock={stock} />
              </Link>
            ))}
          </>
        </ul>
        <ul className={classes.stocksList}>
          <>
            {(stockName ? filteredStocks : thirdItem).map((stock) => (
              <Link to={`/stock/${stock.stockSymbol}`} key={stock.stockSymbol}>
                <StocksItem stock={stock} />
              </Link>
            ))}
          </>
        </ul>
        <ul className={classes.stocksList}>
          <>
            {(stockName ? filteredStocks : fourthItem).map((stock) => (
              <Link to={`/stock/${stock.stockSymbol}`} key={stock.stockSymbol}>
                <StocksItem stock={stock} />
              </Link>
            ))}
          </>
        </ul>
      </SwipeableViews>
    </div>
  );
};

export default StockList;

// 2 -> classplus, mercedes,
