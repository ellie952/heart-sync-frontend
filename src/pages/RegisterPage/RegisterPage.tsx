import RegisterForm from "../../components/RegisterForm/RegisterForm"
import "../../css/styles.css"

function RegisterPage() {
    return (
        <div className="page"
              style={{
                justifyContent: "center", 
                alignItems: "center", 
                textAlign: "center"}}
            >
             <div
                style={{
                    backgroundColor: "rgba(236, 225, 225, 0.69)",
                    padding: "40px",
                    borderRadius: "10px",
                }}
            >   
                
                <h2 data-test="title" className="container">Register</h2>
                <img src="/Images/Logo.svg" style={{width:"150px", height:"150px", paddingBottom:"20px"}}></img>
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage