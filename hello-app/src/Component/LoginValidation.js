function Validation(input){



    let error = {}
    const email_Pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const Password_Pattern =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
    if(input.email === ""){
    error.username = "กรุณากรอกอีเมลให้ครบถ้วน"
    }
    else{
        error.username=""
    }
    
    if(input.password === ""){
        error.password = "กรุณากรอก Password"
        }
        else{
            error.password=""
        }
        return error;
    
    }
    export default Validation;
    