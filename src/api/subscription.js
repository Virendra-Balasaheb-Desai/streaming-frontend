import client from "./client";

class Subscription {
    async getSubscribedChannels(subscriberId) {
        const res = await client.request(
            `/subscriptions/subscribe/${subscriberId}`
        );
        return res.data;
    }

    async getChannelSubscribers(channelId) {
        const res = await client.request(`/subscriptions/channel/${channelId}`);
        return res.data;
    }

    async toggleSubscription(channelId) {
        const res = await client.request(
            `/subscriptions/channel/${channelId}`,
            {
                method: "PATCH",
            }
        );
        console.log(res);
        return res.data;
    }
}

const subscription = new Subscription();

export default subscription;
