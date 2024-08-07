import React, {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  Dispatch,
} from "react";

interface Thumbnail {
  large: string;
  small: string;
}

interface Author {
  name: string;
  avatar?: string;
  role: string;
}

export interface Article {
  id: number;
  date: string;
  title: string;
  content: string;
  thumbnail: Thumbnail;
  author: Author;
}

interface ClickState {
  clicks: Record<number, number>;
  articles: Article[];
}

interface IncrementClickAction {
  type: "INCREMENT_CLICK";
  id: number;
}

interface SetArticlesAction {
  type: "SET_ARTICLES";
  articles: Article[];
}

type Action = IncrementClickAction | SetArticlesAction;

interface ClickContextProps {
  state: ClickState;
  dispatch: Dispatch<Action>;
}

const ClickContext = createContext<ClickContextProps | undefined>(undefined);

const clickReducer = (state: ClickState, action: Action): ClickState => {
  switch (action.type) {
    case "INCREMENT_CLICK":
      return {
        ...state,
        clicks: {
          ...state.clicks,
          [action.id]: (state.clicks[action.id] || 0) + 1,
        },
      };
    case "SET_ARTICLES":
      return {
        ...state,
        articles: action.articles,
        clicks: action.articles.reduce((acc, article) => {
          acc[article.id] = 0;
          return acc;
        }, {} as Record<number, number>),
      };
    default:
      return state;
  }
};

const ClickProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(clickReducer, {
    clicks: {},
    articles: [],
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/Data.json");
        const data = await response.json();
        const articles: Article[] = data.map((article: Article) => ({
          id: article.id,
          date: article.date,
          title: article.title,
          content: article.content,
          thumbnail: article.thumbnail,
          author: article.author,
        }));
        dispatch({ type: "SET_ARTICLES", articles });
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <ClickContext.Provider value={{ state, dispatch }}>
      {children}
    </ClickContext.Provider>
  );
};

export { ClickContext, ClickProvider };
