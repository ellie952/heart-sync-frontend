import "../../css/styles.css"
import ViewPlaylist from "../../components/ViewPlaylist/ViewPlaylist"
import { useParams } from "react-router"


function ViewPlaylistPage() {

    const {playlistId} = useParams();

    return (
        <div className="page"  
             style={{
                paddingLeft:"40px"
            }}>
            <ViewPlaylist playlistId={playlistId ?? ""}></ViewPlaylist>
        </div>
    )
}

export default ViewPlaylistPage