export interface PlaylistType{
    playlistName:string,
    description:string,
    tracksInfo:  Array<{
        Title: string;
        Artist: string;
        Album: string;
    }>;
}