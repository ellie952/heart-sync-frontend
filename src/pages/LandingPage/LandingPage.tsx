import "../../css/styles.css"

function LandingPage() {
    return (
        <div className="page" 
            style={{
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
                <h1 style={{ fontSize: "3rem", marginBottom: "20px" }} data-test="title">
                    HeartSync
                </h1>
                <img src="/Images/Logo.svg" style={{width:"200px", height:"200px"}}></img>
                <p style={{ fontSize: "1.2rem", marginTop:"20px" }} data-test="description">
                    A playlist-building platform with a physical-activity focus.
                </p>
            </div>
        </div>
    );
}


export default LandingPage