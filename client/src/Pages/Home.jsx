import React , {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {

  const [blogs,setBlogs] = useState([]);

  useEffect(()=>{
    const fetchAllBlogs= async() => {
      const res=await axios.get("https://blogapp-backend-0ja4.onrender.com/api/v1/get/allblogs",
      {
        headers:{
            "Authorization" : `Bearer ${localStorage.getItem("token")}`,
        }
    });
    setBlogs(res.data);
    }
    fetchAllBlogs();
  },[])
  return(
    <>
      <main className="my-5">
        <div className="container shadow-lg">
          <section className="text-center">
            <h2 className="mb-5 my-3">
              <strong>Latest Posts</strong>
            </h2>
            <div className="row">
              {blogs && blogs.length > 0 ? 
              blogs.map((item, index) => {
                return(
                  <div className="col-lg-4 col-md-12 mb-4" key={index}>
                <div className="card">
                  <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img src={`https://blogapp-backend-0ja4.onrender.com/${item.thumbnail}`} className="img-fluid"/>
                    <a href="#">
                      <div className="mask" style={{backgroundColor:"rgba(251,251,251,0.15)"}}></div>
                    </a>
                  </div>
                  <div className="card-bod y">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <Link to={`/blog/${item._id}`} className="btn btn-primary">Read More</Link>
                  </div>
                </div>
              </div>
                )
              })
              
              : <h2>Loading</h2>}
              
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default Home;