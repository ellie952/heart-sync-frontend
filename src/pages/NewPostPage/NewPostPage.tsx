import NewPostForm from "../../components/NewPostForm/NewPostForm"
import "../../css/styles.css"

function NewPostPage() {
    return (
        <div className="page"
            style={{
                    backgroundImage:'url("public/Images/medium-shot-women-with-yoga-mats.jpg")',
                    paddingLeft:"40px"
                }}>
            <h3 className="container" style={{margin:"20px"}}>Create a new post</h3>
            <NewPostForm></NewPostForm>
        </div>
    )
}

export default NewPostPage