import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Result, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

function Ramper() {
  const { Text } = Typography;
  const [ramper, setRamper] = useState();
  const { Moralis, logout } = useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    if (!Moralis?.["Plugins"]?.["fiat"]) return null;
    async function initPlugin() {
      Moralis.Plugins.fiat
        .buy({}, { disableTriggers: true })
        .then((data) => setRamper(data.data));
    }
    initPlugin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Moralis.Plugins]);

  return (
    <Result
      status="success"
      title="Registeration Successfull"
      subTitle="We have registered Nominee for your crypto assets"
      extra={[
        <Link to="/quickstart">
          <div className="d-grid gap-2">
            <Button variant="success" size="lg" onClick={async () => {
              await logout();
              window.localStorage.removeItem("connectorId");
              setIsModalVisible(false);
            }}>
              <Text strong type="success">
                Go Home
              </Text>
            </Button>
          </div>
        </Link>
      ]}
    />
  );
}

export default Ramper;
