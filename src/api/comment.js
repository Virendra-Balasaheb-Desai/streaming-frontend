import client from "./client";

class Comment {
    async getVideoComments(videoId, page = 1, limit = 10) {
        //get video comments
        const res = await client.request(
            `/comments/video/${videoId}?page=${page}&limit=${limit}`
        );
        return res.data;
    }
    async addComment(videoId, comment) {
        //add comment
        const res = await client.request(`/comments/video/${videoId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        });
        return res.data;
    }
    async updateComment(commentId, comment) {
        //update comment
        const res = await client.request(`/comments/comment/${commentId}`, {
            method: "PATCH",
            body: comment,
        });
        return res.data;
    }
    async deleteComment(commentId) {
        //delete comment
        const res = await client.request(`/comments/comment/${commentId}`, {
            method: "DELETE",
        });
        return res.data;
    }
}

const comment = new Comment();
export default comment;
