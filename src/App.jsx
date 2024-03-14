import BlogPage from "./blog_pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageCont from "./page_cont";
import ThemeProvider from "./context/theme_provider";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      {/* <div className="text-5xl">Hi</div> */}
      <HelmetProvider>
        <div className="w-full h-full relative overflow-auto">
          <BrowserRouter>
            <ThemeProvider>
              <Routes>
                <Route path="/" element={<BlogPage />} />
                <Route path="/page/:pageId" element={<PageCont />} />
              </Routes>
            </ThemeProvider>
          </BrowserRouter>
        </div>
      </HelmetProvider>
    </>
  );
}

export default App;
