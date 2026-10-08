import client from "./client";

class Video {
    async getHomePageVideos() {
        // get all videos for home
        const res = await client.request("/videos/public");
        return res.data;
    }
    async searchVideos(query) {
        // search videos
        const res = await client.request(
            `/videos/search?query=${query}&page=1&limit=10&sortBy=views&sortType=desc`
        );
        return res.data;
    }
    async getVideos(userId) {
        // get all videos of owner
        const res = await client.request(
            `/videos/?page=1&limit=10&sortBy=views&sortType=desc&userId=${userId}`
        );
        return res.data;
    }
    async getVideoDetails(videoId) {
        //get videos details
        const res = await client.request(`/videos/${videoId}`);
        return res.data[0];
    }
    async getProtectedVideoDetails(videoId) {
        //get videos details
        const res = await client.request(`/videos/${videoId}/protected`);
        return res.data[0];
    }
    async publishVideo(data) {
        // publish video
        const res = await client.request("/videos/", {
            method: "POST",
            body: data,
        });
        return res.data;
    }
    async updateVideo(videoId, data) {
        // update video details
        const res = await client.request(`/videos/${videoId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return res.data;
    }
    async updateVideoThumbnail(videoId, data) {
        // update video thumbnail
        const res = await client.request(`/videos/${videoId}/thumbnail`, {
            method: "PATCH",
            body: data,
        });
        return res.data;
    }

    async updateView(videoId) {
        const res = await client.request(`/videos/${videoId}/views`, {
            method: "PATCH",
        });
        return res.data;
    }
    async togglePublishStatus(videoId) {
        // toggle publish status
        const res = await client.request(`/videos/${videoId}/publish-status`, {
            method: "PATCH",
        });
        return res.data;
    }
    async deleteVideo(videoId) {
        // delete video
        const res = await client.request(`/videos/${videoId}`, {
            method: "DELETE",
        });
        return res.data;
    }
}

const video = new Video();
export default video;
