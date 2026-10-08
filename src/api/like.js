import client from "./client";

class Like {
    async toggleLikeVideo(videoId) {
        //toggle like video
        const res = await client.request(`/likes/video/${videoId}`, {
            method: "PATCH",
        });
        return res.data;
    }
    async getVideoLikes(videoId) {
        //get video likes
        const res = await client.request(`/likes/video/${videoId}`);
        return res.data;
    }
    async toggleLikeComment(commentId) {
        //toggle like comment
        const res = await client.request(`/likes/comment/${commentId}`, {
            method: "PATCH",
        });
        return res.data;
    }
    async toggleLikeTweet(tweetId) {
        //toggle like tweet
        const res = await client.request(`/likes/tweet/${tweetId}`, {
            method: "PATCH",
        });
        return res.data;
    }
}

const like = new Like();
export default like;
