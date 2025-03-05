import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout, Login } from './components/index.js'
import Home from './components/pages/Home'
import AddPost from "./components/pages/AddPost";
import Signup from './components/pages/Signup'
import EditPost from "./components/pages/EditPost";
import Post from "./components/pages/Post";
import AllPosts from "./components/pages/AllPosts";
import Categories from './components/pages/Categories.jsx'
import CategoryPage from './components/pages/CategoryPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/posts/:slug",
        element: <Post />,
      },
      {
        path: "/Categories",
        element: (
          <AuthLayout authentication>
            {" "}
            <Categories />
          </AuthLayout>
        ),
      },
      {
        path: "/categories/:categoryTitle",
        element: <CategoryPage />,
      }
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)


