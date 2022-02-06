import { useMoralis, useERC20Balances, } from "react-moralis";
import { Skeleton, Table } from "antd";
import { getEllipsisTxt } from "../helpers/formatters";
import React, { useState } from 'react';
function ERC20Balance(props) {
  const { data: assets } = useERC20Balances(props);
  const { Moralis } = useMoralis();
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    console.log(!isChecked);
    setIsChecked(!isChecked);
  };
  const columns = [
    {
      title: "Select",
      dataIndex: "logo",
      key: "logo",
      render: (logo) => (
        <input
          type="checkbox"
          id="tnc"
          name="tnc"
          value="tnc"
          checked={isChecked}
          onChange={handleOnChange}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => name,
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol) => symbol,
    },

    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value, item) =>
        parseFloat(Moralis?.Units?.FromWei(value, item.decimals)).toFixed(4),
    }
  ];
  // if (assets) {
  //   assets.forEach(d => console.log("Hello "+d.balance));
  // }


  return (
    <div style={{ width: "40vw", padding: "15px" }}>
      <h1>💰 Your Crypto Tokens and Balances 💰</h1>
      <Skeleton loading={!assets}>
        <Table
          dataSource={assets}
          columns={columns}
          rowKey={(record) => {
            return record.token_address;
          }}
          pagination={false}
        />
      </Skeleton>
    </div>
  );
}
export default ERC20Balance;
