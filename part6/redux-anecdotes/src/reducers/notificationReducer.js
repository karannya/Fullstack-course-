
import { createSlice } from "@reduxjs/toolkit"
const initialState= ''
const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        NotificationAdded(state , action){
            return action.payload;
        },
        NotificationRemoved(state , action){
            return initialState;
        }
    }
})
export const { NotificationAdded,NotificationRemoved } = notificationSlice.actions;

export const createNotification = (message) => {
    return (dispatch) => {
        clearTimeout(null)
      dispatch(NotificationAdded(message));
      setTimeout(() => {
        dispatch(NotificationRemoved(null))
      }, 5000)
    }; 
  };
 /*  export const deleteNotification = (delay) => {
    return  (dispatch) => {
        setTimeout(() => dispatch(NotificationAdded(null)), delay )
    }; 
  }; */
  export default notificationSlice.reducer;