import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    title: 'Flower Arrangement',
    date: 'Dec 5, 2024 at 8:00-10:00 AM',
    assignee: 'Jane Smith',
    note: '09382049832 www.flowervendor.com',
    comments: [],
    isComplete: false,
  },
  reducers: {
    updateEventDetails: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    updateComment: (state, action) => {
      const { id, text } = action.payload;
      const comment = state.comments.find(comment => comment.id === id);
      if (comment) {
        comment.text = text;
      }
    },
    deleteComment: (state, action) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
    markComplete: (state) => {
      state.isComplete = true;
    },
  },
});

export const { updateEventDetails, addComment, updateComment, deleteComment, markComplete } = eventSlice.actions;
export default eventSlice.reducer;
