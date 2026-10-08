import client from "./client";

class Tweet {
    async getUserTweets(userId) {
        //get all tweets details
        const res = await client.request(`/tweets/user/${userId}`);
        return res.data;
    }
    async createTweet(body) {
        // create tweet
        const res = await client.request("/tweets/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        console.log(res);
        return res.data;
    }
    async updateTweet(tweetId, body) {
        // update tweet details
        const res = await client.request(`/tweets/${tweetId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return res.data;
    }
    async deleteTweet(tweetId) {
        // delete tweet
        const res = await client.request(`/tweets/${tweetId}`, {
            method: "DELETE",
        });
        return res.data;
    }
}

const tweet = new Tweet();

export default tweet;
