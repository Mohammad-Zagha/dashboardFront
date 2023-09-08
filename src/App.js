import { ColorModeContext,UseMode } from "./theme";
import {  CssBaseline,ThemeProvider } from "@mui/material";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import  { AuthContextProvider } from "./context/AuthContext";
import Router from "./Router";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
axios.defaults.withCredentials = true;



function App() {


  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  })
  const [theme,colorMode]= UseMode();
 
  return (

    <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline/>
              <BrowserRouter>
           
                <Router/>
                </BrowserRouter>
            </ThemeProvider>
           </ColorModeContext.Provider>
    </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
