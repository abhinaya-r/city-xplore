import React from "react";

const Signup = () => {
    return (
        <div class="login">    
        <form id="login" method="get" action="login.php">    
            <label><b>First Name     
            </b>    
            </label>    
            <input type="text" name="Fname" id="Fname" placeholder="First Name"/> 
            <br></br>
            <label><b>Last Name     
            </b>    
            </label>    
            <input type="text" name="Lname" id="Lname" placeholder="Last Name"/> 
            <br></br>
            <label><b>Email  
            </b>    
            </label>    
            <input type="text" name="email" id="email" placeholder="Email"/> 
            <br></br>
            <label><b>Password     
            </b>    
            </label>    
            <input type="Password" name="Pass" id="Pass" placeholder="Password"/>    
            <br></br>   
            <input type="button" name="log" id="log" value="Log In Here"/>       
            <input type="checkbox" id="check"/>    
            <span>Remember me</span>    
            <br></br>
            Forgot <a href="#">Password</a>    
        </form>     
    </div>    
        );
    }
        
export default Signup;