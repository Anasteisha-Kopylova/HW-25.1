import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emojiList: [
    { id: 1, name: "smile", votes: 0 },
    { id: 2, name: "laughtears", votes: 0 },
    { id: 3, name: "sad", votes: 0 },
  ],
};

const emojiSlice = createSlice({
  name: "emoji",
  initialState,
  reducers: {
    incrementVote: (state, action) => {
      const emoji = state.emojiList.find((e) => e.id === action.payload);
      if (emoji) emoji.votes += 1;
    },
    clearVotes: (state) => {
      state.emojiList = state.emojiList.map((e) => ({ ...e, votes: 0 }));
    },
    setVotes: (state, action) => {
      state.emojiList = action.payload;
    },
  },
});

export const { incrementVote, clearVotes, setVotes } = emojiSlice.actions;
export default emojiSlice.reducer;
