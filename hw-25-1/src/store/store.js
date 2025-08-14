import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  emojiList: [],
};

const emojiSlice = createSlice({
  name: "emoji",
  initialState,
  reducers: {
    setEmojis(state, action) {
      state.emojiList = action.payload;
    },
    incrementVote(state, action) {
      const id = action.payload;
      const emoji = state.emojiList.find((e) => e.id === id);
      if (emoji) emoji.votes += 1;
    },
    clearVotes(state) {
      state.emojiList = state.emojiList.map((e) => ({ ...e, votes: 0 }));
    },
  },
});

export const { setEmojis, incrementVote, clearVotes } = emojiSlice.actions;

export const store = configureStore({
  reducer: emojiSlice.reducer,
});
