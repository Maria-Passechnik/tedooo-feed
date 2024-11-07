import { FeedList } from "./components/FeedList/FeedList";
import classes from "./App.module.css";
import { createTheme, ThemeProvider } from "@mui/material";
import '@fontsource/dm-sans';

const theme = createTheme({
  typography: {
    fontFamily: "DM Sans, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <FeedList />;
      </div>
    </ThemeProvider>
  );
}

export default App;
