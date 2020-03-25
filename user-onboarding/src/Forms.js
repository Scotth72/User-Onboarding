import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ReactDOM from 'react-dom';
import App from './App'


 const Forms = () => {
//     const[formState, setStateForm] = useState([
//         name: "",
//         email: "",
//         password: "",
//         terms: ""
//     ]);
// } 
return(
    <Form>
         <FormGroup>
        <Label for="name"> Name </Label>
        <Input type="text" name="name" id="name" placeholder="name" />
      </FormGroup>

      <FormGroup>
        <Label for="email"> Email </Label>
        <Input type="email" name="email" id="Email" placeholder="dev@lambda.com" />
      </FormGroup>

      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="text" name="password" id="password" placeholder="password" />
      </FormGroup> 


        
        <Label htmlFor="terms">
            <Input
                type="checkbox"
                name="terms"
                checked={true}
            />
            Terms and Conditions
        </Label>
        <Button>Submit</Button>
    </Form>
)
 }





export default Forms;