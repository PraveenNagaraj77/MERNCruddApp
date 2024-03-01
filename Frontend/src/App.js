import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaPlusCircle } from "react-icons/fa";
import AddPost from "./Components/AddPost";
import UpdatePost from "./Components/UpdatePost";
import PostList from "./Components/PostList";
import NotFound from "./Components/NotFound";
import LoadingSpinner from "./Components/LoadingSpinner";
import { createBrowserRouter ,RouterProvider } from "react-router-dom"
import Footer from "./Components/Footer";

const router = createBrowserRouter([
  {index :true, element : <PostList/>},
  {path:"/create" , element: <AddPost/>},
  {path:"/update/:postid" , element: <UpdatePost/>},
  {path:"*" , element: <NotFound/>}
  
])


function App() {
  return<>
  <RouterProvider router ={router}/>
  <Footer/>
  </> 
  
}

export default App;
