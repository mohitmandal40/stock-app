import React from "react";
import { BsArrowDownUp } from "react-icons/bs";
import { BiPieChartAlt } from "react-icons/bi";

import classes from "./footer.module.css";
import { Link, useLocation } from "react-router-dom";
import { IconType } from "react-icons";

interface FooterIcon {
  icon: IconType;
  text: string;
  pattern: RegExp;
  url: string;
}

const footerIconList: FooterIcon[] = [
  {
    icon: BiPieChartAlt,
    text: "Portfolio",
    pattern: /^\/stock\/.+$/,
    url: "/stock/DJIA",
  },
  {
    icon: BsArrowDownUp,
    text: "Markets",
    pattern: /^\/stock(\/)?$/,
    url: "/stock",
  },
  { icon: BiPieChartAlt, text: "News", pattern: /^\/news(\/)?$/, url: "/news" },
];

const Footer: React.FC = () => {
  const RenderIcon: React.FC<{ Icon: IconType; fill: string }> = ({
    Icon,
    fill,
  }) => {
    return <Icon size={20} fill={fill} />;
  };

  const location = useLocation();
  return (
    <footer className={classes.footer}>
      {footerIconList.map((item) => (
        <Link to={item.url} key={item.text}>
          <div className={classes.footerButton} key={item.text}>
            <RenderIcon
              Icon={item.icon}
              fill={
                item.pattern.test(location.pathname) ? "#2c53f5" : "#000000"
              }
            />
            <span
              className={classes.footerButtonText}
              style={{
                color: item.pattern.test(location.pathname)
                  ? "#2c53f5"
                  : "#000000",
              }}
            >
              {item.text}
            </span>
          </div>
        </Link>
      ))}
    </footer>
  );
};
export default Footer;
