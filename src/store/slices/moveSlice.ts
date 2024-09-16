import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface MoveState {
  shapeType: string[];
  isReverse: boolean;
}

const initialState: MoveState = {
  shapeType: [
    "circle",
    "square",
    "rectangle",
    "parallelogram",
    "trapezoid",
    "ellipse",
  ],
  isReverse: false,
};

const moveSlice = createSlice({
  name: "move",
  initialState,
  reducers: {
    moveShape: (state, action: PayloadAction<string>) => {
      if (action.payload == "prev") {
        const firstElement = state.shapeType.shift();
        if (firstElement !== undefined) {
          state.shapeType.push(firstElement);
        }
      } else if (action.payload == "next") {
        const lastElement = state.shapeType.pop();
        if (lastElement !== undefined) {
          state.shapeType.unshift(lastElement);
        }
      }
    },
    movePosition: (state) => {
      const row1 = state.shapeType.slice(0, 3);
      const row2 = state.shapeType.slice(3, 6);
      state.shapeType = [...row2, ...row1];
      state.isReverse = !state.isReverse;
    },
    randomPosition: (state, action: PayloadAction<string>) => {
      const type = action.payload;
      const index = state.shapeType.indexOf(type);
      state.shapeType.splice(index, 1);
      const random = Math.floor(Math.random() * 6) + 1;
      state.shapeType.splice(random, 0, type);
    },
  },
});

export const { moveShape, movePosition, randomPosition } = moveSlice.actions;

export const selectShapeType = (state: RootState) => state.move.shapeType;
export const selectIsReverse = (state: RootState) => state.move.isReverse;

export default moveSlice.reducer;
