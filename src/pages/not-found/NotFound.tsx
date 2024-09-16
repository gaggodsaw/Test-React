import React from "react";
import { Button, Flex, Row, Select } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Style
import "./NotFound.scss";

const NotFound: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    console.log("Changed language:", lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className="container-not-found">
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
      <Flex justify="center" align="center" style={{ margin: "auto" }} vertical>
        <h1>{t("404")}</h1>
        <Button>
          <Link to="/">{t("home")}</Link>
        </Button>
      </Flex>
    </div>
  );
};

export default NotFound;
