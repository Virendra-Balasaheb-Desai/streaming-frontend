import client from "./client";

class Playlist {
    async createPlaylist(data) {
        //create playlist
        const res = await client.request("/playlists/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return res.data;
    }

    async getUserPlaylists(userId) {
        //get all playlist of one owner
        const res = await client.request(`/playlists/user/${userId}`);
        return res.data;
    }
    async getUserPlaylistList() {
        //get all playlist names of one owner
        const res = await client.request(`/playlists/user`);
        return res.data;
    }

    async getPlaylistById(playlistId) {
        //get playlist by id
        const res = await client.request(`/playlists/${playlistId}`);
        return res.data;
    }
    async deletePlaylist(playlistId) {
        //delete playlist
        const res = await client.request(`/playlists/${playlistId}`, {
            method: "DELETE",
        });
        return res.data;
    }
    async updatePlaylist(playlistId, data) {
        //update playlist
        const res = await client.request(`/playlists/${playlistId}`, {
            method: "PATCH",
            body: data,
        });
        return res.data;
    }
    async addVideoToPlaylist(playlistId, videoId) {
        //add video to playlist
        const res = await client.request(
            `/playlists/${playlistId}/videos/${videoId}`,
            {
                method: "POST",
            }
        );
        return res.data;
    }
    async removeVideoFromPlaylist(playlistId, videoId) {
        //remove video from playlist
        const res = await client.request(
            `/playlists/${playlistId}/videos/${videoId}`,
            {
                method: "DELETE",
            }
        );
        return res.data;
    }
}

const playlist = new Playlist();
export default playlist;
