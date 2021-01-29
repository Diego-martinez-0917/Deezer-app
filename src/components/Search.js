import React from 'react';
import { Form, Button} from 'react-bootstrap';
import {Formik} from "formik";
import * as Yup from "yup";
import { Search } from 'react-bootstrap-icons';
import Axios from 'axios';
import swal from 'sweetalert'


const formSchema = Yup.object().shape({
    artist: Yup.string().required("Campo requerido").min(3,'Se requiere mas de 3 caracteres')   
  })


function SearchForm ({setArtist}) {
  
    const handleSubmit = (values, actions) => {
      actions.setSubmitting(true)
        Axios({
            method:"GET",
            url: `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/artist/?q=${values.artist}`,
          }).then(data =>{
            setArtist(data.data.data[0])            
            actions.setSubmitting(false)
            actions.resetForm()
          }).catch(err =>{
            swal("error", `${err.message}`, "error")
            actions.setSubmitting(false)
          })     
    }
  return (
        <Formik
            className="mt-5"
            initialValues={{artist: ""}}
            validationSchema = {formSchema}
            onSubmit = {handleSubmit}>
                {({handleSubmit, handleChange, values,touched, errors,resetForm})=>(
                <Form className='form-content' onSubmit={handleSubmit}>
                  <Form.Label>Buscar artista</Form.Label>
                    <div className='input-buttom'>
                        <Form.Group>                            
                            <Form.Control 
                              name="artist" 
                              onChange={handleChange} 
                              value={values.artist} 
                              className={touched.artist && errors.artist &&"is-invalid"} 
                              type="text" 
                              placeholder="Nombre de tu artista"/>
                            {touched.artist && errors.artist ? (
                                        <div className="error-message">{errors.artist}</div>
                                    ): null}
                        </Form.Group>
                        <Button className='bt-search' variant="outline-primary" size="md" type="submit">
                             <Search/>
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
  )
}

export default SearchForm ;