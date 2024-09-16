import React, { useEffect } from "react";
import Flag from "react-world-flags";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
} from "antd";

// Store
import { useAppDispatch } from "../../../../store/store";
import {
  addData,
  resetForm,
  selectDataList,
  selectEditIndex,
  setEditIndex,
  updateData,
} from "../../../../store/slices/dataSlice";

// Style
import "./Form.scss";

interface FormComponentProps {
  onUpdate: (params: any) => void;
  onSave: (params: any) => void;
}

const FormComponent: React.FC = ({}) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  const editIndex = useSelector(selectEditIndex);
  const dataList = useSelector(selectDataList);

  useEffect(() => {
    if (editIndex != null && dataList[editIndex] != undefined) {
      const {
        uuid,
        title,
        firstname,
        lastname,
        birthday,
        nationality,
        citizenID,
        gender,
        phoneFormat,
        phoneNumber,
        passport,
        expectedSalary,
      } = dataList[editIndex];
      const data = {
        uuid: uuid,
        title: title,
        firstname: firstname,
        lastname: lastname,
        birthday: birthday && moment(birthday),
        nationality: nationality,
        citizenID1: citizenID && citizenID.substring(0, 1),
        citizenID2: citizenID && citizenID.substring(1, 5),
        citizenID3: citizenID && citizenID.substring(5, 10),
        citizenID4: citizenID && citizenID.substring(10, 12),
        citizenID5: citizenID && citizenID.substring(12, 13),
        gender: gender,
        phoneFormat: phoneFormat,
        phoneNumber: phoneNumber,
        passport: passport,
        expectedSalary: expectedSalary,
      };
      form.setFieldsValue(data);
    } else {
      form.resetFields();
    }
  }, [editIndex, form]);

  const onReset = () => {
    dispatch(resetForm());
  };

  const onFinish = (values: any) => {
    const formattedDate = values.birthday
      ? values.birthday.format("YYYY-MM-DD")
      : "";
    const data: any = {
      uuid: values.uuid ? values.uuid : uuidv4(),
      title: values.title,
      firstname: values.firstname,
      lastname: values.lastname,
      birthday: formattedDate,
      nationality: values.nationality,
      citizenID:
        values.citizenID1 +
        values.citizenID2 +
        values.citizenID3 +
        values.citizenID4 +
        values.citizenID5,
      gender: values.gender,
      phoneFormat: values.phoneFormat,
      phoneNumber: values.phoneNumber,
      passport: values.passport,
      expectedSalary: values.expectedSalary,
    };
    console.log(data);
    if (editIndex != null) {
      dispatch(updateData({ index: editIndex, value: data }));
      dispatch(setEditIndex(null)); // Reset edit index after update
    } else {
      dispatch(addData(data));
    }
    Modal.success({
      title: t("saveSuccess"),
      okText: t("ok"),
      okCancel: false,
      onOk() {
        form.resetFields();
      },
    });
  };

  return (
    <div className="container-form">
      <Form form={form} labelAlign="left" labelWrap onFinish={onFinish}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Form.Item
              name="title"
              label={t("title")}
              rules={[{ required: true, message: t("msTitle") }]}
            >
              <Select placeholder="Title">
                <Select.Option value="mr">{t("titleList.mr")}</Select.Option>
                <Select.Option value="mrs">{t("titleList.mrs")}</Select.Option>
                <Select.Option value="ms">{t("titleList.ms")}</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={9}>
            <Form.Item
              name="firstname"
              label={t("firstname")}
              rules={[{ required: true, message: t("msFirstname") }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={9}>
            <Form.Item
              name="lastname"
              label={t("lastname")}
              rules={[{ required: true, message: t("msLastname") }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={7}>
            <Form.Item
              name="birthday"
              label={t("birthday")}
              rules={[{ required: true, message: t("msBirthday") }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                placeholder={t("placeBirthday")}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item
              name="nationality"
              label={t("nationality")}
              rules={[{ required: true, message: t("msNationality") }]}
            >
              <Select placeholder={t("placeNationality")}>
                <Select.Option value="thai">
                  {t("nationalityList.thai")}
                </Select.Option>
                <Select.Option value="france">
                  {t("nationalityList.france")}
                </Select.Option>
                <Select.Option value="american">
                  {t("nationalityList.american")}
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={19}>
            <Row gutter={[16, 16]}>
              <Col span={4}>
                <Form.Item name="citizenID1" label={t("citizenID")}>
                  <Input style={{ textAlign: "center" }} maxLength={1} />
                </Form.Item>
              </Col>

              <Col span={1}>
                <div className="divider">
                  <Divider
                    orientation="center"
                    style={{ margin: 0, borderWidth: 3, borderColor: "black" }}
                  ></Divider>
                </div>
              </Col>

              <Col span={5}>
                <Form.Item name="citizenID2">
                  <Input style={{ textAlign: "center" }} maxLength={4} />
                </Form.Item>
              </Col>

              <Col span={1}>
                <div className="divider">
                  <Divider
                    orientation="center"
                    style={{ margin: 0, borderWidth: 3, borderColor: "black" }}
                  ></Divider>
                </div>
              </Col>

              <Col span={6}>
                <Form.Item name="citizenID3">
                  <Input style={{ textAlign: "center" }} maxLength={5} />
                </Form.Item>
              </Col>

              <Col span={1}>
                <div className="divider">
                  <Divider
                    orientation="center"
                    style={{ margin: 0, borderWidth: 3, borderColor: "black" }}
                  ></Divider>
                </div>
              </Col>

              <Col span={3}>
                <Form.Item name="citizenID4">
                  <Input style={{ textAlign: "center" }} maxLength={2} />
                </Form.Item>
              </Col>

              <Col span={1}>
                <div className="divider">
                  <Divider
                    orientation="center"
                    style={{ margin: 0, borderWidth: 3, borderColor: "black" }}
                  ></Divider>
                </div>
              </Col>

              <Col span={2}>
                <Form.Item name="citizenID5">
                  <Input style={{ textAlign: "center" }} maxLength={1} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Form.Item
              name="gender"
              label={t("gender")}
              rules={[{ required: true, message: t("msGender") }]}
            >
              <Radio.Group>
                <Radio value="male"> {t("genderList.male")} </Radio>
                <Radio value="female"> {t("genderList.female")} </Radio>
                <Radio value="unsex"> {t("genderList.unsex")} </Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Row gutter={[16, 16]}>
              <Col span={7}>
                <Form.Item
                  name="phoneFormat"
                  label={t("phone")}
                  rules={[{ required: true, message: t("msPhoneFormat") }]}
                >
                  <Select>
                    <Select.Option value="+66">
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <Flag
                          code="TH"
                          alt="Thai Flag"
                          style={{ width: "18px", height: "18px" }}
                        />
                        +66
                      </div>
                    </Select.Option>
                    <Select.Option value="+1">
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <Flag
                          code="US"
                          alt="American Flag"
                          style={{ width: "18px", height: "18px" }}
                        />
                        +1
                      </div>
                    </Select.Option>
                    <Select.Option value="+33">
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <Flag
                          code="FR"
                          alt="France Flag"
                          style={{ width: "18px", height: "18px" }}
                        />
                        +33
                      </div>
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={1}>
                <div className="divider">
                  <Divider
                    orientation="center"
                    style={{ margin: 0, borderWidth: 3, borderColor: "black" }}
                  ></Divider>
                </div>
              </Col>

              <Col span={10}>
                <Form.Item
                  name="phoneNumber"
                  rules={[{ required: true, message: t("msPhoneNumber") }]}
                >
                  <Input maxLength={10} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={9}>
            <Form.Item name="passport" label={t("passport")}>
              <Input maxLength={9} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={9}>
            <Form.Item
              name="expectedSalary"
              label={t("expectedSalary")}
              rules={[{ required: true, message: t("msExpectedSalary") }]}
            >
              <Input maxLength={9} />
            </Form.Item>
          </Col>

          <Col span={2} offset={7}>
            <Form.Item>
              <Button htmlType="reset" onClick={onReset}>
                {t("reset")}
              </Button>
            </Form.Item>
          </Col>
          <Col span={2} offset={1}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t("submit")}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormComponent;
