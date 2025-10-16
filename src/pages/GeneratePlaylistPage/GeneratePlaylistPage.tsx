import "../../css/styles.css"
import GeneratePlaylistForm from "../../components/GeneratePlaylistForm/GeneratePlaylistForm";

function GeneratePlaylistPage() {
    return (
        <div className="page" >
            <h3 className="container" style={{marginLeft:"20px", marginBottom:"0px"}}data-test="title">Generate a Playlist</h3>
            <GeneratePlaylistForm></GeneratePlaylistForm>
        </div>
    )
}

export default GeneratePlaylistPage