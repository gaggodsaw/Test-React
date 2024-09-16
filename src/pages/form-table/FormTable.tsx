import React from "react";
import { Row, Col, Flex, Select, Button } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Styles
import "./FormTable.scss";

// Components
import FormComponent from "./components/form/Form";
import TableComponent from "./components/table/Table";

const FormTable: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    console.log("Changed language:", lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className="container-form-table">
      <Row
        gutter={[16, 16]}
        justify={"space-between"}
        style={{ margin: "0 auto", padding: "20px 2%" }}
      >
        <Col>
          <div className="topic">{t("topicFormTable")}</div>
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
      <FormComponent />
      <TableComponent />
    </div>
  );
};

export default FormTable;
