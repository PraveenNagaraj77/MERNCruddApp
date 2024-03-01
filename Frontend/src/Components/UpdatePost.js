import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link, useParams, useNavigate } from "react-router-dom";
import ToastNotification from "./ToastNotification";

const UpdatePost = ({ id }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title) {
      alert("Please Enter Title");
      return;
    }
    if (!description) {
      alert("Please Enter Description");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/updatepost/${params.postid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        }
      );
      console.log(response);
      if (response.ok) {
        setTitle("");
        setDescription("");
        setIsError(false);
        navigate("/", { state: { message: "Post Updated Successfully" } });
      }else{
        const errResponse = await response.json()
        throw new Error(errResponse.message)
      }
    } catch (error) {
      setShow(true);
      setIsError(true);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getSinglePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/post/${params.postid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const { post } = data;
      setTitle(post.title);
      setDescription(post.description);
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    getSinglePost();
  }, []);
  return (
    <>
      {show && (
        <ToastNotification
          text={message}
          show={show}
          setShow={setShow}
          isError={isError}
        />
      )}
      <Container className="mt-5">
        <Row className="mt-3">
          <Col
            xs={{ span: 10, offset: 1 }}
            md={{ span: 8, offset: 2 }}
            lg={{ span: 6, offset: 3 }}
          >
            <h1 className="display-6 text-center mb-3">Update Post</h1>

            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="Enter title"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter description"
                  rows={3}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Form.Group>

              <Button variant="dark" type="button">
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Cancel
                </Link>
              </Button>

              {!loading && (
                <Button type="submit" className="mx-2">
                  Update
                </Button>
              )}

              {loading && (
                <Button variant="primary" className="mx-2" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdatePost;