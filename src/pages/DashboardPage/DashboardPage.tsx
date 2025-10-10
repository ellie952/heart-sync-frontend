import { useParams } from "react-router"
import PostList from "../../components/PostList/PostList"

function DashboardPage() {
    const { userId } = useParams<{ userId?: string }>();

    if (!userId) {
        return <p>Error: Missing user ID</p>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <PostList userId={encodeURIComponent(userId)} />
        </div>
    )
}

export default DashboardPage