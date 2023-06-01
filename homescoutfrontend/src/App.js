import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './utils/PrivateRoute';
import LoginPage from './Login';
import RegisterPage from './Register';
import HomePage from './HomePage';

function Test() {
  return (
    <div>
      Test Page
    </div>
  )
}



function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
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

  );
}

export default App;
