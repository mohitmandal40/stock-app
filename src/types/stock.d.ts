type StockDataPoint = {
  x: number;
  y: number;
};
type Stock = {
  stockSymbol: string;
  stockName: string;
  stockGraph: StockDataPoint[];
  currentPrice: number;
  percentageGain: number;
  displayChart?: StockDataPoint[] | undefined;
};
