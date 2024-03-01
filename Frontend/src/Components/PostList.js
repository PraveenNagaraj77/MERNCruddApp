import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsPlusCircleFill } from "react-icons/bs";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { Link , Navigate, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
// import { AiOutlinedirt } from "react-icons/ai";
import ToastNotification from "./ToastNotification";
import { isMobile } from 'react-device-detect';
import './CSS/PostList.css'

const PostList = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const[show,setShow] = useState(false)
  const[isError,setIsError] = useState(false)
  const[message,setMessage] = useState("")

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/posts");
      const data = await response.json();
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id) => {
    const confirmation = window.confirm("Are you sure? You want to Delete");
    console.log(confirmation);
    if (!confirmation) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/deletepost/${id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setShow(true);
        setIsError(false)
        const {message} = await response.json();
        setMessage(message);
        await getPosts()
      }else{
        const errorResponse = await response.json()
        throw new Error(errorResponse.message)
      }
    } catch (error) {
      setIsError(true)
      setMessage(error.message)
      setShow(true)
      console.log(error.message);
    } finally {
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(()=>{
    if(location.state && location.state.message){
      setMessage(location.state.message)
      setShow(true)
    }
    navigate("/",{replace:true})
  },[location.state])

  return (
    <>
    {show && <ToastNotification text={message}
    show={show} setShow={setShow} isError={isError}
    />}
      <Container className="mt-5">



      <Button 
  size="lg" 
  variant="success"
  className={isMobile ? "mobile-button" : ""}
>
  <Link
    to={"/create"}
    style={{ textDecoration: "none", color: "white" }}
  >
    CreatePost <BsPlusCircleFill />
  </Link>
</Button>


        {/* <Button size="lg" variant="success">
          <Link
            to={"/create"}
            style={{ textDecoration: "none", color: "white" }}
          >
            CreatePost <BsPlusCircleFill></BsPlusCircleFill>
          </Link>
        </Button> */}

        <Row className="mt-3" xs={1} sm={2} md={3}>
          {isLoading && <LoadingSpinner />}
          {!isLoading && posts.length>0 &&
            posts.map((post) => (
              <Col key={post._id}>
                <Card className="mb-2">
                  <Card.Body>
                    <Row className="mb-2">
                      <Col xs={8} md={7} lg={8}>
                        <Card.Title>{post.title}</Card.Title>
                      </Col>
                      <Col>
                        <Link to={`/update/${post._id}`}>
                          <AiOutlineEdit
                            className="text-primary"
                            role="button"
                          />
                        </Link>
                      </Col>
                      <Col>
                        <AiFillDelete
                          className="text-danger"
                          role="button"
                          onClick={() => deletePost(post._id)}
                        />
                      </Col>
                    </Row>
                    <Card.Text>{post.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            {!isLoading && posts.length === 0 && (
              <Col className="text-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <h3 className="display-6">No Post To Display</h3>
            </Col>
            )}
        </Row>
      </Container>
    </>
  );
};

export default PostList;
