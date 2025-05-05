import { configureStore } from '@reduxjs/toolkit'

// Reducer básico
const rootReducer = (state = {}, action) => {
  return state;
};

export default configureStore({
  reducer: rootReducer
})