import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

/** import components */
import Main from './components/Main';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { CheckUserExist } from './helper/helper';
import Layout from './components/Layout';
import Signin from './components/Signin';
import Register from './components/Register';



/** react routes */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />

      },
      {
        path: '/quiz',
        element: <CheckUserExist><Quiz /></CheckUserExist>
      },
      {
        path: '/result',
        element: <CheckUserExist><Result /></CheckUserExist>
      },
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path: '/register',
        element: <Register />
      },


    ]
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;