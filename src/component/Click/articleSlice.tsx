import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Thumbnail {
  large: string;
  small: string;
}

interface Author {
  name: string;
  avatar?: string;
  role: string;
}

interface Article {
  id: number;
  date: string;
  title: string;
  content: string;
  thumbnail: Thumbnail;
  author: Author;
}

interface ArticlesState {
  articles: Article[];
  clicks: { [key: number]: number };
}

const initialState: ArticlesState = {
  articles: [],
  clicks: {},
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<Article[]>) {
      state.articles = action.payload;
    },
    incrementClick(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.clicks[id]) {
        state.clicks[id]++;
      } else {
        state.clicks[id] = 1;
      }
    },
  },
});

export const { setArticles, incrementClick } = articlesSlice.actions;
export default articlesSlice.reducer;
