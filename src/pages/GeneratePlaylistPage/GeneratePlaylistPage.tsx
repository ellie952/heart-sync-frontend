import GeneratePlaylistForm from "../../components/GeneratePlaylistForm/GeneratePlaylistForm";

function GeneratePlaylistPage() {
    return (
        <div>
            <h3 style={{color:"#2521217b", margin:"20px"}}data-test="title">Generate a Playlist</h3>
            <GeneratePlaylistForm></GeneratePlaylistForm>
        </div>
    )
}

export default GeneratePlaylistPage