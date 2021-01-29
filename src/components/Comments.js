import React, {useState} from 'react';
import { Form, Button, Card, Spinner} from 'react-bootstrap';
import { Formik } from "formik";
import { Trash } from 'react-bootstrap-icons';
import * as Yup from "yup";
import Axios from 'axios';
import swal from 'sweetalert';

const formSchema = Yup.object().shape({
    comment: Yup.string().required("Campo requerido")
    .min(10,'La logitud del comentario debe tener minimo 10 caracteres')   
    .max(250,'La logitud del comentario debe tener maximo 250 caracteres')   
  })

function Comments ({artist}) {
    const [comments, setComments] = useState([])
    const token = localStorage.getItem("token")

    const handleSubmit = (values, actions) => {
        Axios({
            method:"POST",
            url: `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artist.id}/comments?access_token=${token}&comment=${values.comment}`,
          }).then(data =>{
            const newComment = {
                text: values.comment,
                id: data.data.id
            }
            setComments(prevComments =>{
                return prevComments.concat(newComment)
            } )
            actions.setSubmitting(false)
            actions.resetForm()            
          }).catch(err =>{
            swal("error", `${err}`, "error")
            actions.setSubmitting(false)
          })
    }

    const handleDelete = (id) => {
        return () => {
            Axios({
                method:"DELETE",
                url: `https://cors-anywhere.herokuapp.com/https://api.deezer.com/comment/${id}?access_token=${token}`,
            }).then(data =>{
                const newComments = comments.filter(comment => {
                    return comment.id !== id
                })
                setComments(newComments)
            }).catch(err => {
                swal("error", `${err}`, "error")
            })
        }
    }
  return (
        <Card className='card-comments'>
            <Card.Header>
                <Formik
                    initialValues={{comment: ""}}
                    validationSchema = {formSchema}
                    onSubmit = {handleSubmit}>
                        {({handleSubmit, handleChange, values, isSubmitting, touched, errors, resetForm})=>(
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Control 
                                    name="comment" 
                                    onChange={handleChange} 
                                    value={values.comment} 
                                    className={`input-comment ${touched.comment && errors.comment && "is-invalid"}`} 
                                    type="text" 
                                    placeholder="Deja tu comentario aqui" />
                                {touched.comment && errors.comment && <div className="error-message">{errors.comment}</div>}
                            </Form.Group>
                            <Button className='public-button' variant="outline-primary" type="submit">
                                {isSubmitting ? <Spinner animation="border" variant="primary" size="sm" /> : "Publicar"}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Card.Header>
            <Card.Body>
                {comments.length === 0&& <h6>Aqui se mostraran tus comentarios</h6> }
                {comments.map( (comment) =>
                    <div className='comment-content' key={comment.id}>
                        <p className="text-comment">{comment.text}</p>
                        <Button onClick={handleDelete(comment.id)} variant="outline-primary"><Trash/></Button>
                    </div>
                    )
                }
            </Card.Body>
        </Card>
  )
}

export default Comments ;