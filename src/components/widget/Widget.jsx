import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShopOutlinedIcon from '@mui/icons-material/ShopOutlined';
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import lang from '../../languages/index'
const Widget = ({ type, _value }) => {
  let data;

  //temporary
  const amount = _value
  const diff = 30

  switch (type) {
    case "expense":
      data = {
        title: lang.components.widget.expense,
        isMoney: true,
        link: "Ver más",
        icon: (
          <ShopOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(212, 100, 100,.3)",
              color: "rgb(221, 40, 40)",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: lang.components.widget.earning,
        isMoney: true,
        link: "Ver más",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: lang.components.widget.balance,
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "sale":
      data = {
        title: lang.components.widget.sale,
        isMoney: true,
        link: "Ver más",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "tax":
      data = {
        title: lang.components.widget.tax,
        isMoney: true,
        link: "Ver más",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "L."} {amount}
        </span>
        {/* <span className="link">{data.link}</span> */}
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
