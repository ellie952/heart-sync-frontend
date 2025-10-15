import LoginForm from "../../components/LoginForm/LoginForm"
import "../../css/styles.css"

function LoginPage() {
    return (
        <div className="page"
            style={{
                backgroundImage:'url("/Images/landing-image.jpg")',
                justifyContent: "center", 
                alignItems: "center", 
                textAlign: "center"}}>
             <div
                style={{
                    backgroundColor: "rgba(236, 225, 225, 0.69)",
                    padding: "40px",
                    borderRadius: "10px",
                }}
            >   
                
                <h2 data-test="title" className="container">Login</h2>
                <img src="/Images/Logo.svg" style={{width:"150px", height:"150px", paddingBottom:"20px"}}></img>
                <LoginForm />
            </div>
           
        </div>
    )
}

export default LoginPage