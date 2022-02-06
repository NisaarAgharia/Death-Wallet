import { Button, } from "antd";
import Address from "../Address/Address";
import Blockie from "../Blockie";
import { Card } from "antd";
import { useMoralis, } from "react-moralis";
import React, { useState } from 'react';
import { Row, Col, Divider } from 'antd';
export default function Wallet() {
  const { deadAcc, setdeadAcc } = useState();
  const { Moralis, account } = useMoralis();
  const [loadingToken, setIsTokenComplete] = useState(false);

  const styles = {
    title: {
      fontSize: "30px",
      fontWeight: "600",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "5px",
    },
    card: {
      boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
      border: "1px solid #e7eaf3",
      borderRadius: "1rem",
      width: "450px",
      fontSize: "16px",
      fontWeight: "500",
    },
  };

  const saveAddress = async () => {
    setIsTokenComplete(true);
    const collection = Moralis.Object.extend("UserNomineeDetails");
    const query = new Moralis.Query(collection);
    query.equalTo("status", "DEAD");
    const results = await query.find();


    console.log(JSON.stringify(results));
    for (let i = 0; i < results.length; i++) {
      const deadObject = results[i];
      console.log("deadObject +++++++++++ " + JSON.stringify(deadObject));
      const options = { chain: 'rinkeby', address: deadObject.get("curretAddress") }
      const balances = await Moralis.Web3API.account.getTokenBalances(options);
      console.log("Token Balances " + JSON.stringify(balances));

      for (let j = 0; j < balances.length; j++) {
        console.log("Inside Token Balances ", JSON.stringify(deadObject));
        const deadBalances = balances[j];
        console.log("Inside deadBalances Balances ", JSON.stringify(deadBalances));
        WriteTokenContract(deadBalances, deadObject);
      }
      setIsTokenComplete(false);
    }

  }

  const ABI_erc20 = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    }
  ];
  const WriteTokenContract = async (asset, deadObject) => {
    const Writeoptions = {
      chain: "rinkeby",
      contractAddress: "", //SHIT coin address
      functionName: "transferFrom",
      abi: ABI_erc20,
      params: { _from: "", _to: "", _value: "" }
    };
    const params = { _from: deadObject.get("curretAddress"), _to: deadObject.get("nomineeAddress"), _value: asset.balance };
    Writeoptions.abi = ABI_erc20;
    Writeoptions.contractAddress = asset.token_address;
    Writeoptions.functionName = "transferFrom";
    // params._spender = "0x74e8a6aC664CFAB893e765280208bdb9b0230949";
    // params._value = asset.balance; // Death Wallet Address
    Writeoptions.params = params;
    console.log("Write Options params ----------------- " + JSON.stringify(Writeoptions));
    //calling the contract

    const reciept = await Moralis.executeFunction(Writeoptions);
    const awaitcConfirmation = await reciept.wait();
    console.log("Transaction - " + reciept);
    console.log("confirmation - " + awaitcConfirmation);
    return reciept;
  }


  return (
    <Card
      style={styles.card}
      title={
        <div style={styles.header}>
          <Blockie scale={5} avatar currentWallet style />
          <Address size="6" copyable />
        </div>
      }
    >
      <Row gutter={[8, 48]} justify="center" align="middle"  >
        <Col span={12}>
          <Button loading={loadingToken} size="large" shape="Circle" type="primary" onClick={saveAddress}>Run Death Wallet</Button>
        </Col>
      </Row>

    </Card>
  );


}
