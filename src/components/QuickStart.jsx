import { Card, Timeline, Typography } from "antd";
import React, { } from "react";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import LogoImage from "./logo.png";
import styled, { keyframes } from "styled-components";
import { pulse } from "react-animations";
import { bounceInRight } from "react-animations";

const PulseAnimation = keyframes`${pulse}`;
const PulseDiv = styled.div`
  animation: infinite 1s ${PulseAnimation};
`;

const BounceInRightAnimation = keyframes`${bounceInRight}`;
const BounceInRightDiv = styled.div`
  animation: 3s ${BounceInRightAnimation};
`;

const { Text } = Typography;

const styles = {
  title: {
    fontSize: "30px",
    fontWeight: "700",
  },
  text: {
    fontSize: "18px",
  },
  steps: {
    fontSize: "25px",
    fontWeight: "500",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  timeline: {
    marginBottom: "-45px",
  },
};

export default function QuickStart({ isServerInfo }) {


  return (
    <div>
      <div style={{ display: "flex", gap: "10px" }}>

        <PulseDiv>
          <img width="360"
            height="360"
            src={LogoImage} alt="Death Wallet" />
        </PulseDiv>

        <BounceInRightDiv>
          <Card
            style={styles.card}
            title={
              <>
                💀 <Text style={styles.title} strong type="danger" >Welcome to Death Wallet
                </Text> 💀
              </>
            }
          >
            <Timeline mode="center" style={styles.timeline}>
              <Timeline.Item dot="🔏">
                <Text type="success" style={styles.steps}>
                  Secure assests in 3 Steps:
                </Text>
              </Timeline.Item>

              <Timeline.Item dot="🧰">
                <Text mark style={styles.text}>
                  Enter Nominee Address
                </Text>
              </Timeline.Item>

              <Timeline.Item dot="📄">
                <Text mark style={styles.text}>
                  Choose Assests to secure
                </Text>
              </Timeline.Item>

              <Timeline.Item dot="🚀">
                <Text mark style={styles.text}>
                  Select Inactive Time & Register
                </Text>
              </Timeline.Item>

              <Timeline.Item dot="">
                <Link to="/contract">
                  <div className="d-grid gap-2">
                    <Button variant="success" size="lg">
                      <Text strong type="success" style={styles.steps}>
                        Register Now
                      </Text>
                    </Button>
                  </div>
                </Link>
              </Timeline.Item>
            </Timeline>

          </Card>
        </BounceInRightDiv>






      </div>
    </div >
  );
}
