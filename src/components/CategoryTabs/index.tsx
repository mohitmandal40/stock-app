import React, { useEffect, useRef } from "react";
import classes from "./categoryTabs.module.css";

const categories: string[] = [
  "Main Market",
  "Junior Market",
  "FX Rates",
  "Fund",
];

interface CategoryTabsProps {
  currentTab: number;
  handleChangeIndex: (index: number) => void;
  setStockNameHandler: (value: React.SetStateAction<string>) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  currentTab,
  handleChangeIndex,
  setStockNameHandler,
}) => {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleChangIndexHandler = (index: number) => {
    setStockNameHandler("");
    handleChangeIndex(index);
  };

  useEffect(() => {
    if (itemRefs.current[currentTab]) {
      itemRefs.current[currentTab]!.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  }, [currentTab]);

  return (
    <div className={classes.categories}>
      {categories.map((category, index) => (
        <div
          key={index}
          ref={(el) => (itemRefs.current[index] = el)}
          className={`${classes.categoryItem} ${
            index === currentTab ? classes.active : ""
          }`}
          onClick={() => handleChangIndexHandler(index)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryTabs;
