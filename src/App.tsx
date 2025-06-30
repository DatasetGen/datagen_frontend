import "./index.css"
import DefaultRoutes from "./pages/defaultRoutes.tsx";
import {BrowserRouter} from "react-router";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./api/client.ts";
import {Bounce, ToastContainer} from "react-toastify";

function App() {
  return (
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  transition={Bounce}
              />
              <DefaultRoutes/>
          </QueryClientProvider>
      </BrowserRouter>
  )
}

export default App
