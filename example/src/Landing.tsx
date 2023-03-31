import React from 'react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './landing.css'


const reskro = () => {
 
  const navigate = useNavigate();
  return (
    <div className="container">
     <ToastContainer />
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="reskro logo" />
          <h1>reskro</h1>
        </div>
      <button className='btn1'>access Safe</button>  
      </nav>
      <div className="hero">
     <div className='text-holder'>
        <h2 className='my-4'>Showcase Your Cross-Chain Contributions</h2>
        <p className='my-2'>Are you a blockchain developer, community contributor, or avid blockchain enthusiast? reskro is the perfect way to showcase your cross-chain contributions and build your reputation in the decentralized ecosystem.</p>
        <div className="hero-buttons">
          <button onClick={()=>{navigate('/create')}}
           className="btn1">Get Started</button>
        <a href='https://github.com/shreyan001/chainfolio' target='_blank'> <button className="btn1 mx-4">Learn More</button></a> 
          </div>
         </div><img className='rounded'  src="/landing.png" alt="reskro" />
      </div>
    </div>
  );
};

export default reskro;
