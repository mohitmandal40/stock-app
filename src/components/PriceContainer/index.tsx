import React from "react";
import classes from "./priceContainer.module.css";
import { formatUSDollar } from "../../utils/helper";

type PriceContainerProps = {
  closePrice: string;
  lastTradePrice: string;
  outstanding: string;
  marketValue: string;
};

const PriceContainer: React.FC<PriceContainerProps> = ({
  closePrice,
  lastTradePrice,
  outstanding,
  marketValue,
}) => {
  return (
    <div className={classes.priceDetailContainer}>
      <div className={classes.priceDetailSection}>
        <div className={classes.priceDetailItem}>
          <p className={classes.priceDetailItemHeading}>Close Price</p>
          <p className={classes.priceDetailAmount}>
            {formatUSDollar(+closePrice)}
          </p>
        </div>
        <div className={classes.priceDetailItem}>
          <p className={classes.priceDetailItemHeading}>Last Trade Price</p>
          <p className={classes.priceDetailAmount}>
            {formatUSDollar(+lastTradePrice)}
          </p>
        </div>
        <div className={classes.priceDetailItem}>
          <p className={classes.priceDetailItemHeading}>Outstanding</p>
          <p className={classes.priceDetailAmount}>
            {formatUSDollar(+outstanding)}
          </p>
        </div>
        <div className={classes.priceDetailItem}>
          <p className={classes.priceDetailItemHeading}>Market Value</p>
          <p className={classes.priceDetailAmount}>
            ${formatUSDollar(+marketValue)}
          </p>
        </div>
      </div>
      <button className={classes.portfolioButton}>Add to Portfolio</button>
    </div>
  );
};

export default PriceContainer;
