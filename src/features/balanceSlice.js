// import { createSlice } from "@reduxjs/toolkit";

// // appApi
// import appApi from "../services/appApi";

// const initialState = [];

// export const balanceSlice = createSlice({
//     name: "balance",
//     initialState,
//     reducers: {
//         updateBalance: (_,action) => {
//             return action.payload;
//         },
//     },
//     extraReducers: (builder) => {
        
//         builder.addMatcher(appApi.endpoints.updateBalance.matchFulfilled, (_, { payload }) => payload);
        
//     },
// });

// export const { updateBalance } = balanceSlice.actions;
// export default balanceSlice.reducer;
