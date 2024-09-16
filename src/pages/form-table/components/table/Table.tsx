import React from "react";
import { useAppDispatch } from "../../../../store/store";
import { Button, Checkbox, Flex, Modal, Pagination, Space, Table } from "antd";
import "./Table.scss";
import { useTranslation } from "react-i18next";
import {
  deselectAll,
  deselectShowListAll,
  removeData,
  removeSelectedData,
  selectAll,
  selectDataList,
  selectPageIndex,
  selectPageSize,
  selectSelectedIds,
  selectShowList,
  selectShowListAll,
  setEditIndex,
  setPageIndex,
  toggleSelection,
} from "../../../../store/slices/dataSlice";
import { useSelector } from "react-redux";
import { ColumnsType } from "antd/es/table";

const TableComponent: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const dataList = useSelector(selectDataList);
  const showList = useSelector(selectShowList);
  const selectedIds = useSelector(selectSelectedIds);
  const pageSize = useSelector(selectPageSize);
  const pageIndex = useSelector(selectPageIndex);

  const handleSelectAll = (e: any) => {
    if (e.target.checked) {
      dispatch(selectAll());
    } else {
      dispatch(deselectAll());
    }
  };

  const handleSelectShowListAll = (e: any) => {
    if (e.target.checked) {
      dispatch(selectShowListAll());
    } else {
      dispatch(deselectShowListAll());
    }
  };

  const handleDeleteSelected = () => {
    dispatch(removeSelectedData());
    Modal.success({
      title: t("deleteSuccess"),
      okText: t("ok"),
      okCancel: false,
    });
  };

  const handleRowSelection = (uuid: string) => {
    dispatch(toggleSelection(uuid));
  };

  const handleEdit = (index: number) => {
    dispatch(setEditIndex(index)); // Set the index of the item to edit
  };

  const handleRemove = (uuid: string) => {
    dispatch(removeData(uuid));
    Modal.success({
      title: t("deleteSuccess"),
      okText: t("ok"),
      okCancel: false,
    });
  };

  const handleChangePage = (pageIndex: number) => {
    dispatch(setPageIndex(pageIndex));
  };

  const columns: ColumnsType = [
    {
      width: 50,
      align: "center",
      title: (
        <Checkbox
          onChange={handleSelectShowListAll}
          indeterminate={
            selectedIds.length > 0 && selectedIds.length < showList.length
          }
          checked={selectedIds.length == showList.length}
        />
      ),
      key: "select",
      render: (data: any, record: any, index: number) => {
        return (
          <Checkbox
            checked={selectedIds.includes(data.key)}
            onChange={() => handleRowSelection(data.key)}
          />
        );
      },
    },
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
      sorter: {
        compare: (a: any, b: any) => a.name.localeCompare(b.name),
      },
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      key: "gender",
      sorter: {
        compare: (a: any, b: any) => a.gender.localeCompare(b.gender),
      },
    },
    {
      title: t("phone"),
      dataIndex: "phone",
      key: "phone",
      // sorter: (a: any, b: any) => a.phone - b.phone,
      sorter: {
        compare: (a: any, b: any) => a.phone.localeCompare(b.phone),
      },
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      key: "nationality",
      sorter: {
        compare: (a: any, b: any) => a.nationality.localeCompare(b.nationality),
      },
    },
    {
      title: t("manage"),
      key: "manage",
      render: (data: any, record: any, index: number) => {
        return (
          <Space size="middle">
            <a onClick={() => handleEdit(index)}>{t("edit")}</a>
            <a onClick={() => handleRemove(data.key)}>{t("delete")}</a>
          </Space>
        );
      },
    },
  ];

  let dataSource: any = showList.map((data: any, index: number) => ({
    key: data.uuid,
    name: data.firstname + " " + data.lastname,
    gender: t("genderList." + data.gender),
    phone: data.phoneFormat + "" + data.phoneNumber,
    nationality: t("nationalityList." + data.nationality),
  }));

  return (
    <div className="container-table">
      <Flex justify="start" align="center" style={{ margin: "10px auto" }}>
        <Checkbox
          onChange={handleSelectAll}
          checked={selectedIds.length == dataList.length}
        >
          {t("selectAll")}
        </Checkbox>
        <Button onClick={handleDeleteSelected}>{t("delete")}</Button>
      </Flex>
      <Flex justify="end" align="center" style={{ margin: "10px auto" }}>
        <Pagination
          current={pageIndex}
          pageSize={pageSize}
          total={dataList.length}
          prevIcon={
            <a className="css-dev-only-do-not-override-qnu6hi">{t("prev")}</a>
          }
          nextIcon={
            <a className="css-dev-only-do-not-override-qnu6hi">{t("next")}</a>
          }
          onChange={handleChangePage}
        />
      </Flex>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default TableComponent;
