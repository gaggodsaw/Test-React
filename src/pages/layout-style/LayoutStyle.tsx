import React from "react";
import { Row, Col, Flex, Select, Button, Divider } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Store
import { useAppDispatch } from "../../store/store";
import {
  movePosition,
  moveShape,
  randomPosition,
  selectIsReverse,
  selectShapeType,
} from "../../store/slices/moveSlice";

// Styles
import "./LayoutStyle.scss";

const LayoutStyle: React.FC = () => {
  const dispatch = useAppDispatch();
  const shapType = useSelector(selectShapeType);
  const isReverse = useSelector(selectIsReverse);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    console.log("Changed language:", lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className="container-layout-style">
      <Row
        gutter={[16, 16]}
        justify={"space-between"}
        style={{ margin: "0 auto", padding: "20px 2%" }}
      >
        <Col>
          <div className="topic">{t("topicLayoutStyle")}</div>
        </Col>
        <Col>
          <Flex gap="small" vertical>
            <Select
              onChange={changeLanguage}
              value={i18n.language}
              style={{ width: 100 }}
            >
              <Select.Option value="en">EN</Select.Option>
              <Select.Option value="th">TH</Select.Option>
            </Select>
            <Button>
              <Link to="/">{t("home")}</Link>
            </Button>
          </Flex>
        </Col>
      </Row>

      <Row
        className="container-control"
        gutter={[20, 20]}
        justify={"center"}
        style={{ width: "100%" }}
      >
        <Col span={4}>
          <div
            className="card-control"
            onClick={() => dispatch(moveShape("prev"))}
          >
            <div style={{ padding: "20px" }}>
              <div className="triangle-left"></div>
            </div>
            <div className="text-on-position">{t("moveShape")}</div>
          </div>
        </Col>
        <Col span={8}>
          <div
            className="card-control"
            onClick={() => dispatch(movePosition())}
          >
            <Row style={{ width: "100%" }}>
              <Col span={12}>
                <Flex style={{ padding: "20px" }} justify="center">
                  <div className="triangle-up"></div>
                </Flex>
              </Col>
              <Col span={12}>
                <Flex style={{ padding: "20px" }} justify="center">
                  <div className="triangle-down"></div>
                </Flex>
              </Col>
            </Row>
            <div className="text-on-position">{t("movePosition")}</div>
          </div>
        </Col>
        <Col span={4}>
          <div
            className="card-control"
            onClick={() => dispatch(moveShape("next"))}
          >
            <div style={{ padding: "20px" }}>
              <div className="triangle-right"></div>
            </div>
            <div className="text-on-position">{t("moveShape")}</div>
          </div>
        </Col>
        <Col span={16}>
          <Divider
            orientation="center"
            style={{ margin: "20px 0", borderWidth: 2, borderColor: "gray" }}
          ></Divider>
        </Col>
      </Row>

      <Row className="container-shape" gutter={[20, 20]}>
        {shapType.map((type, index) => {
          if (index >= 0 && index <= 2) {
            return (
              <Col span={4} offset={index == 0 ? (isReverse ? 6 : 8) : 0}>
                <div
                  className="card-shape"
                  onClick={() => dispatch(randomPosition(type))}
                >
                  <div style={{ padding: "20px" }}>
                    <div className={type}></div>
                  </div>
                </div>
              </Col>
            );
          } else {
            return (
              <Col span={4} offset={index == 3 ? (isReverse ? 8 : 6) : 0}>
                <div
                  className="card-shape"
                  onClick={() => dispatch(randomPosition(type))}
                >
                  <div style={{ padding: "20px" }}>
                    <div className={type}></div>
                  </div>
                </div>
              </Col>
            );
          }
        })}
      </Row>
    </div>
  );
};

export default LayoutStyle;
