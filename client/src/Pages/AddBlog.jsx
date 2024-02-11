import React , {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
    const navigate=useNavigate();
    const [input,setInput] = useState({
        title:"",
        description:"",
        category:"", 
     });
     const [file,setFile] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAllCategories = async () => {
            const res = await axios.get("https://blogapp-backend-0ja4.onrender.com/api/v1/get/categories",
            {
                headers:{
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setCategories(res.data);
        }
        fetchAllCategories();
    },[]);
   
    const handleSubmit=async (e) => {
        e.preventDefault();
        try{
            const res= await axios.post("https://blogapp-backend-0ja4.onrender.com/api/v1/add/blog",
            formData,
            {
                headers:{
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`,
                }
            });
            alert(res.data.message);
            navigate("/");
        }catch(err){
            alert(err.response.data.message);
        }
    }

    const formData = new FormData();
    formData.append("title",input.title);
    formData.append("category",input.category);
    formData.append("description",input.description);
    formData.append("thumbnail",file);

    return(
        <>
         <div className="container-shadow">
             <h2 className="text-center my-3">Add a New Blog</h2>
             <div className="col-md-12 my-3 d-flex items-center justify-content-center">
            <div className="row">
                <form onSubmit={handleSubmit}>
                 <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                <input type="text" 
                className="form-control" 
                id="exampleFormControlInput1" 
                placeholder="Blog Title" 
                name="title"
                value={input.title} 
                onChange={(e) => setInput({...input,[e.target.name] : e.target.value})}/>
                </div>

                <div className="mb-3">
                <label htmlFor="exampleFormControlInput" className="form-label">Category</label>
                <select className="form-control" 
                name="category" 
                onChange={(e) => setInput({...input,[e.target.name] : e.target.value})}>
                    <option disabled>Select Category</option>
                    {categories && categories.map((item) => {
                        return  <option key={item._id} value={item._id}>
                        {item.title}
                    </option>;
                    })}
                </select>
                </div>

                <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                <textarea className="form-control" 
                id="exampleFormControlTextarea1" 
                rows="3" 
                placeholder="Blog Description" 
                name="description"
                value={input.description} 
                onChange={(e) => setInput({...input,[e.target.name] : e.target.value})}></textarea>
                </div>

                <div className="mb-3">
                <label htmlFor="formFile" className="form-label" id="exampleFormControlInput">Thumbnail</label>
                <input className="form-control" type="file" name="thumbnail" 
                onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <div className="mb-3">
                             <button type="submit" className="btn btn-primary btn-block">Add Blog</button>
                         </div>

                </form>
                </div>
            </div>
            </div>
                          
                    </> )}

export default AddBlog;