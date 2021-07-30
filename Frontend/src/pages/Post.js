import React from "react";
import {Card, Container, Form, Button} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Facilite les requêtes API

function Post() {
    let {id} = useParams();
    const [postObject,setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("")


    useEffect(() => {
        axios.get(`http://localhost:3001/posts/getOnePost/${id}`)
            .then((response) => {
              setPostObject(response.data);
            });
        axios.get(`http://localhost:3001/comments/${id}`)
          .then((response) => {
            setComments(response.data);
        });    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addComment = () => {
      axios.post("http://localhost:3001/comments", {
        comments: newComment, 
        PostId: id
      })


        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
          const commentToAdd = { 
            comments: newComment,
          };
          setComments([...comments, commentToAdd]);
        }
        });
    };

    return (
      <div className="postPage">
          <Container>
            <Card className="mb-3" style={{ width: "600px" }}>    
              <Card.Img variant="top" src={postObject.url} /> 
              <Card.Body>
                <Card.Title as="h6">{postObject.title}</Card.Title> 
                <Card.Text>{postObject.content}</Card.Text>
                <cite title="username">{postObject.username}</cite>
              </Card.Body>               
            </Card>
          </Container>

          <div className="Comments">
            <form className="addComment">
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" placeholder="Votre commentaire" rows={2} style={{ width: "600px" }} onChange={(event) => {setNewComment(event.target.value)}}/>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={addComment}>Ajouter</Button>  
            </form>
          </div>

          <div className="listOfComments">
            {comments.map((comment, key) => {
              return (
                <Card className="mt-3" style={{ width: "600px" }}>
                <Card.Body>
                  <Card.Title>username</Card.Title>
                  <Card.Text key={key} className="comment"> {comment.comments}</Card.Text>  
                  <Card.Link href="#">Card Link</Card.Link>
                </Card.Body>
                </Card>
              )
            })}
          </div>      
      </div>

        
        )    
}

export default Post;