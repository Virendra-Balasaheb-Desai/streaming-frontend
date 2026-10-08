import client from "./client";

class User {
    async login(body) {
        const res = await client.request("/users/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    }
    async register(body) {
        const res = await client.request("/users/register", {
            method: "POST",
            body: body,
        });
        return res.data;
    }
    async logout() {
        const res = await client.request("/users/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    }

    async getCurrentUser() {
        const res = await client.request("/users/get-user");
        console.log("current user data : ", res.data);
        return res.data;
    }

    async getUserChannelDetails(channelId) {
        const res = await client.request(`/users/channel/${channelId}`);
        return res.data;
    }

    async getUserChannelDetailsProtected(channelId) {
        const res = await client.request(
            `/users/channel/protected/${channelId}`
        );
        return res.data;
    }

    //new
    async updateChannelDetails(channelId, body) {
        const res = await client.request(`/users/channel/${channelId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return res.data;
    }

    async getUserWatchHistory() {
        const res = await client.request("/users/watch-history");
        return res.data;
    }

    async addVideoToWatchHistory(body) {
        const res = await client.request("/users/watch-history", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return res.data;
    }

    async updateAccount(body) {
        const res = await client.request("/users/update-details", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        return res.data;
    }

    async updateAvatar(body) {
        const res = await client.request("/users/update-avatar", {
            method: "PATCH",
            body: body,
        });
        return res.data;
    }

    async updateCoverImage(body) {
        const res = await client.request("/users/update-cover", {
            method: "PATCH",
            body: body,
        });
        return res.data;
    }

    async changePassword(body) {
        const res = await client.request("/users/change-password", {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    }

    async deleteUser() {
        const res = await client.request("/users/delete", {
            method: "DELETE",
        });
        return res.data;
    }
}

const user = new User();
export default user;
