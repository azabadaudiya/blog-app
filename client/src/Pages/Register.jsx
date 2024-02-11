import React , {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate=useNavigate();
    const [input,setInput] = useState({
        username:"",
        email:"",
        password:"",
    });

    const handleSubmit =async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("https://blogapp-backend-0ja4.onrender.com/api/v1/user/register",input);
            alert(res.data.message);
            navigate("/login");
        }catch(err){
            alert(err.response.data.message);
        }
    }
  return(
   <>
    <div className="container-shadow">
        <h2 className="text-center my-3">Sign Up Here</h2>
        <div className="col-md-12 my-3 d-flex items-center justify-content-center">
            <div className="row">
                <form onSubmit={handleSubmit}> 
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Enter Name" 
                    name="username" 
                    value={input.username} 
                    onChange={(e) => setInput({...input,[e.target.name] : e.target.value})}/>
                    </div>
                
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                        <input type="text" 
                        className="form-control" 
                        placeholder="Enter Email" 
                        name="email"
                        value={input.email} 
                        onChange={(e) => setInput({...input,[e.target.name] : e.target.value})}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                        <input type="password" 
                        className="form-control" 
                        placeholder="Enter Password" 
                        name="password"
                        value={input.password} 
                        onChange={(e) => setInput({...input,[e.target.name] : e.target.value})}/>
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
   </>
  )
}

export default Register;