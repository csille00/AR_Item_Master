import './App.css'
import Authentication from "./Components/auth.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient();

  return (

    <QueryClientProvider client={queryClient}>
        <>
          <div>
            <Authentication/>
          </div>
        </>
    </QueryClientProvider>
  )
}

export default App
