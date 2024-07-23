import { createBrowserRouter } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import { BookDetailPage } from "./pages/BookDetailsPage";
import { MyBooksPage } from "./pages/MyBooksPage";
import { PageTemplate } from "./templates/PageTemplate";

export const router = createBrowserRouter([
  {
    path: "/*",
    Component: PageTemplate,
    children: [
      {
        index: true,
        Component: SearchPage,
      },
      {
        path: ":bookKey",
        Component: BookDetailPage,
      },
      {
        path: "my-books",
        Component: MyBooksPage,
      },
    ],
  },
]);
