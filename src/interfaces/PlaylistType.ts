import { TrackType } from "./TrackType";

export interface PlaylistType{
    playlistName:string,
    description:string,
    tracksInfo: TrackType[];
}