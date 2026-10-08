import client from "./client";

class Dashboard {
    async getChannelStats(userId) {
        //get channel stats
        const res = await client.request(`/dashboards/channel/stats/${userId}`);
        return res.data;
    }
    async getChannelVideos(userId) {
        //get channel videos
        const res = await client.request(
            `/dashboards/channel/videos/${userId}`
        );
        return res.data;
    }
}

const dashboard = new Dashboard();
export default dashboard;
