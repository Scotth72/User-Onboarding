import React, {useState, useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import * as yup from "yup";
import  axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup
        .string()
        .email("Must included a valid email")
        .required("Must include an email"),
    select: yup.string(),    
    password: yup.string().required("Name is a required field"),    
    terms: yup.boolean().oneOf(([true]),"Please agree to the Terms")    
});



const Forms = () => {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [post,setPost] = useState ([]);
    const[formState, setFormState] = useState({
        name: "",
        email: "",
        select: "",
        password: "",
        terms: ""
    });

const formSubmit = e => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data);
        console.log("success", post);
        setFormState({
          name: "",
          email: "",
          select: "",
          passwords: "",
          terms: ""
        });
      })
      .catch(err => console.log(err.response));
  };

    useEffect((valid) => {
        formSchema.isValid(formState).then((valid) => {
        setButtonDisabled(!valid);
    })
},[formState])

 

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        select: "",
        password: "",
        terms: ""

    });
    const validateChange = e => {
        yup
          .reach(formSchema, e.target.name)
          .validate(e.target.value)
          .then(valid => {
            setErrors({
              ...errors,
              [e.target.name]: ""
            });
          })
          .catch(err => {
            setErrors({
              ...errors,
              [e.target.name]: err.errors[0]
            });
          });
      };

      const inputChange = e => {
        e.persist();
        const newFormData = {
          ...formState,
          [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
    
        validateChange(e);
        setFormState(newFormData);
      };

      

return(
    <Form onSubmit={formSubmit}>
         <FormGroup>
        <Label for="name"> Name </Label>
        <Input type="text" name="name" id="name" placeholder="name" value={formState.name} onChange={inputChange}/>
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </FormGroup>

      <FormGroup>
        <Label for="email"> Email </Label>
        <Input type="email" name="email" id="Email" placeholder="dev@lambda.com" value={formState.email} onChange={inputChange}/>
        {errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}
      </FormGroup>
      <FormGroup>
        <Label for="exampleSelect">Position Title</Label>
        <Input type="select" name="select" id="exampleSelect" onChange={inputChange}>
          <option value="Full Stack Developer" >Full Stack Developer</option>
          <option value="Front-End Developer" >Front-End Developer</option>
          <option value="Javascript" >Javascript</option>
          <option value="IT Specialist" >IT Specialist</option>
          <option value="Other">Other</option>
        </Input>
      </FormGroup>
      
      <FormGroup>
        <Label for="password">Password</Label >
        <Input type="text" name="password" id="password" placeholder="password" value={formState.password} onChange={inputChange}/>
        {errors.password.length > 0 ? (<p className="error">{errors.password}</p>) : null}
      </FormGroup> 


        
        <Label htmlFor="terms" value={formState.terms} onChange={inputChange}>
            <Input
                type="checkbox"
                name="terms"
                checked={formState.terms}
                onChange={inputChange}
            />
        </Label>
        Terms and Conditions
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <Button disabled={buttonDisabled}>Submit</Button>
    </Form>
)
}





export default Forms;