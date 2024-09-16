import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DataProps } from "../../interfaces/DataProps";

interface DataState {
  dataList: DataProps[];
  showList: DataProps[];
  editIndex: number | null;
  selectedIds: string[];
  pageSize: number;
  pageIndex: number;
}

// Load initial state from localStorage
const loadInitialState = (): DataState => {
  const savedDataList = localStorage.getItem("dataList");
  return {
    dataList: savedDataList ? JSON.parse(savedDataList) : [],
    showList: savedDataList ? JSON.parse(savedDataList).slice(0, 10) : [],
    editIndex: null,
    selectedIds: [],
    pageSize: 10,
    pageIndex: 1,
  };
};

const initialState: DataState = loadInitialState();

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<DataProps>) => {
      state.dataList.push(action.payload);
      saveStateToLocalStorage(state.dataList);
      state.showList = state.dataList.slice(0, state.pageSize);
    },
    removeData: (state, action: PayloadAction<string>) => {
      const index = state.dataList.findIndex((i) => i.uuid === action.payload);
      state.dataList.splice(index, 1);
      saveStateToLocalStorage(state.dataList);
      state.showList = state.dataList.slice(0, state.pageSize);
      if (state.selectedIds.includes(action.payload)) {
        state.selectedIds = state.selectedIds.filter(
          (i) => i !== action.payload
        );
      }
    },
    removeSelectedData: (state) => {
      state.dataList = state.dataList.filter(
        (data, index) => !state.selectedIds.includes(data.uuid)
      );
      saveStateToLocalStorage(state.dataList);
      state.selectedIds = [];
      state.showList = state.dataList.slice(0, state.pageSize);
    },
    setEditIndex: (state, action: PayloadAction<number | null>) => {
      state.editIndex = action.payload;
    },
    updateData: (
      state,
      action: PayloadAction<{ index: number; value: DataProps }>
    ) => {
      state.dataList[action.payload.index] = action.payload.value;
      saveStateToLocalStorage(state.dataList);
      state.showList = state.dataList.slice(0, state.pageSize);
    },
    resetForm: (state) => {
      state.editIndex = null;
    },
    toggleSelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedIds.findIndex((i) => i === action.payload);
      if (index >= 0) {
        state.selectedIds.splice(index, 1);
      } else {
        state.selectedIds.push(action.payload);
      }
    },
    selectAll: (state) => {
      state.selectedIds = state.dataList.map((data) => data.uuid);
    },
    deselectAll: (state) => {
      state.selectedIds = [];
    },
    selectShowListAll: (state) => {
      state.selectedIds = state.showList.map((data) => data.uuid);
    },
    deselectShowListAll: (state) => {
      state.selectedIds = [];
    },
    setPageIndex: (state, action: PayloadAction<number>) => {
      state.selectedIds = [];
      state.pageIndex = action.payload;
      state.showList = state.dataList.slice(
        (state.pageIndex - 1) * state.pageSize,
        state.pageIndex * state.pageSize
      );
    },
  },
});

const saveStateToLocalStorage = (dataList: DataProps[]) => {
  localStorage.setItem("dataList", JSON.stringify(dataList));
};

export const {
  addData,
  removeData,
  removeSelectedData,
  setEditIndex,
  updateData,
  resetForm,
  toggleSelection,
  selectAll,
  deselectAll,
  selectShowListAll,
  deselectShowListAll,
  setPageIndex,
} = dataSlice.actions;

export const selectDataList = (state: RootState) => state.data.dataList;
export const selectShowList = (state: RootState) => state.data.showList;
export const selectEditIndex = (state: RootState) => state.data.editIndex;
export const selectSelectedIds = (state: RootState) => state.data.selectedIds;
export const selectPageSize = (state: RootState) => state.data.pageSize;
export const selectPageIndex = (state: RootState) => state.data.pageIndex;

export default dataSlice.reducer;
