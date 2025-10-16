import { useParams } from "react-router"
import PostList from "../../components/PostList/PostList"
import "../../css/styles.css"

function DashboardPage() {
    const { userId } = useParams<{ userId?: string }>();

    if (!userId) {
        return <p>Error: Missing user ID</p>;
    }

    return (
        <div className="page" 
             style={{
                paddingLeft:"40px"
                
            }}>
            <h1 data-test="title" className="container" >
                Dashboard
            </h1>
            <div>
                 <PostList userId={encodeURIComponent(userId)} />
            </div>
        </div>
    )
}

export default DashboardPage