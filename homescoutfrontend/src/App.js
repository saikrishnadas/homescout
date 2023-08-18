import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './Login';
import RegisterPage from './Register';
import HomePage from './HomePage';
import Properties from './Properties';
import Detail from './Detail';
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import Projects from './Projects';
import RequireAuth from './features/auth/RequireAuth';
import Layout from "./components/Layout"
import Pro from './components/Pro';
import { useDispatch } from 'react-redux';
import { setCredentials } from './features/auth/authSlice';

function Test() {
  return (
    <div>
      Test Page
    </div>
  )
}

function App() {
  const queryClient = new QueryClient();
  const dispatch = useDispatch();
  const storedToken = localStorage.getItem("accessToken");
  const storedUser = localStorage.getItem("user");
  if (storedToken) {

    dispatch(setCredentials({ user: storedUser, accessToken: storedToken }));
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Properties />} >

          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="pro" element={<Pro />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<Detail />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="home" element={<HomePage />} />
          </Route>
        </Route>
      </Routes>

      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider >

  );
}

export default App;
