export function generateRandomNumber(): number {
  const randomNum: number = Math.floor(Math.random() * 9000) + 1000;
  const randomDecimal: number = parseFloat((Math.random() * 100).toFixed(2));
  return parseFloat(`${randomNum}.${randomDecimal}`);
}

export function formatUSDollar(number: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(number);
}
