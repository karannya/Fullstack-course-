/* const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.data.filter
      default:
        return state
    }
  }

  export const FilteredData = (filter) => {
	return {
		type: 'SET_FILTER',
		data: {
			filter
		}
	};
}; */
import { createSlice } from "@reduxjs/toolkit"
const filterSlice = createSlice({
    name:'filter',
    initialState:'',
    reducers:{
        FilterAdded(state , action){
            return action.payload;
        }
    }
})

export const { FilterAdded } = filterSlice.actions;

export default filterSlice.reducer;