import { Provider } from "react-redux";
import store from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <Provider store={store}>
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </Provider>
  );
}

export default App;
