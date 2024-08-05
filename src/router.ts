import { createBrowserRouter } from "react-router-dom";
import { PageTemplate } from "./templates/PageTemplate";
import { SearchPage } from "./pages/Search";
import { BookDetailPage } from "./pages/BookDetails";
import { MyBooksPage } from "./pages/MyBooks";

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
        path: "works/:bookKeyPart",
        Component: BookDetailPage,
      },
      {
        path: "my-books",
        Component: MyBooksPage,
      },
      {
        path: "*",
        element: "Page not found",
      },
    ],
  },
]);
