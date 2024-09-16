import { Row, Flex, Select, Space } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Styles
import "./Home.scss";

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    console.log("Changed language:", lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className="container-home">
      <Row justify="end" style={{ padding: "20px 2%" }}>
        <Select
          onChange={changeLanguage}
          value={i18n.language}
          style={{ width: 100 }}
        >
          <Select.Option value="en">EN</Select.Option>
          <Select.Option value="th">TH</Select.Option>
        </Select>
      </Row>
      <Flex justify="center" align="center" gap={30} style={{ margin: "auto" }}>
        <div className="card">
          <Link to="/layout-style">
            <Flex vertical gap={30} style={{ padding: "25px" }}>
              <Space className="title">{t("test1")}</Space>
              <Space className="subTitle">{t("topicLayoutStyle")}</Space>
            </Flex>
          </Link>
        </div>
        <div className="card">
          <Link to="/connect-api">
            <Flex vertical gap={30} style={{ padding: "25px" }}>
              <Space className="title">{t("test2")}</Space>
              <Space className="subTitle">{t("topicConnectAPI")}</Space>
            </Flex>
          </Link>
        </div>
        <div className="card">
          <Link to="/form-table">
            <Flex vertical gap={30} style={{ padding: "25px" }}>
              <Space className="title">{t("test3")}</Space>
              <Space className="subTitle">{t("topicFormTable")}</Space>
            </Flex>
          </Link>
        </div>
      </Flex>
    </div>
  );
};

export default Home;
