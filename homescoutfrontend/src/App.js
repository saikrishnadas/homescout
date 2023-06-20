import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './utils/PrivateRoute';
import LoginPage from './Login';
import RegisterPage from './Register';
import HomePage from './HomePage';
import Properties from './Properties';
import Detail from './Detail';
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import Projects from './Projects';

function Test() {
  return (
    <div>
      Test Page
    </div>
  )
}



function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<Detail />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
          </Routes>

        </Router>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>

  );
}

export default App;
