import "../../css/styles.css"
import GeneratePlaylistForm from "../../components/GeneratePlaylistForm/GeneratePlaylistForm";

function GeneratePlaylistPage() {
    return (
        <div className="page"  
             style={{
                backgroundImage:'url("public/Images/full-length-female-runner-listening-music-while-jogging-road-dawn.jpg")',
                paddingLeft:"40px"
            }}>
            <h3 className="container" style={{margin:"20px"}}data-test="title">Generate a Playlist</h3>
            <GeneratePlaylistForm></GeneratePlaylistForm>
        </div>
    )
}

export default GeneratePlaylistPage