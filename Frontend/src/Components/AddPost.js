import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function AddPost() {
  const navigate = useNavigate();
  const [title, SetTitle] = useState();
  const [description, SetDescription] = useState();
  const [loading, SetLoading] = useState(false);

  const onSubmitHandler = async (e) => {
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
      SetLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/createpost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        }
      );
      if (response.ok) {
        console.log(response);
        const { message } = await response.json();
        navigate("/", { state: { message } });
      }
    } catch (error) {
    } finally {
      SetLoading(false);
      SetTitle("");
      SetDescription("");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mt-3">
        <Col
          xs={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
        >
          <h1 className="display-6 text-center mb-3">Create Post</h1>

          <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                onChange={(e) => SetTitle(e.target.value)}
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
                onChange={(e) => SetDescription(e.target.value)}
              />
            </Form.Group>

            <Button variant="dark" type="button">
              <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
                Cancel
              </Link>
            </Button>

            {!loading && (
              <Button type="submit" className="mx-2">
                Create
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
  );
}

export default AddPost;
