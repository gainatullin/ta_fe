import { createSlice } from '@reduxjs/toolkit';

type TModalState = {
  data: {
    type: string;
    name: string;
    values?: any;
  } | null;
};

const initialState: TModalState = {
  data: null,
};

export const ModalSLice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.data = action.payload;
    },
    closeModal: state => {
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = ModalSLice.actions;

export default ModalSLice.reducer;
