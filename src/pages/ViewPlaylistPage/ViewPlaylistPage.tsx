import "../../css/styles.css"
import ViewPlaylist from "../../components/ViewPlaylist/ViewPlaylist"
import { useParams } from "react-router"


function ViewPlaylistPage() {

    const {playlistId} = useParams();

    return (
        <div className="page"  
             style={{
                backgroundImage:'url("/Images/full-length-female-runner-listening-music-while-jogging-road-dawn.jpg")',
                paddingLeft:"40px"
            }}>
            <ViewPlaylist playlistId={playlistId ?? ""}></ViewPlaylist>
        </div>
    )
}

export default ViewPlaylistPage