export const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
};

export const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date; // milliseconds
    const diffMins = Math.round(diffMs / 60000); // minutes
    const diffHours = Math.round(diffMs / 3600000); // hours
    const diffDays = Math.round(diffMs / 86400000); // days
    const diffMonths = Math.round(diffMs / 2592000000); // months
    const diffYears = Math.round(diffMs / 31536000000); // years

    if (diffMins < 1) return "just now";
    if (diffMins < 60)
        return diffMins + (diffMins === 1 ? " minute ago" : " minutes ago");
    if (diffHours < 24)
        return diffHours + (diffHours === 1 ? " hour ago" : " hours ago");
    if (diffDays < 30)
        return diffDays + (diffDays === 1 ? " day ago" : " days ago");
    if (diffMonths < 12)
        return diffMonths + (diffMonths === 1 ? " month ago" : " months ago");
    return diffYears + (diffYears === 1 ? " year ago" : " years ago");
};

export const formatDuration = (duration) => {
    //show in minutes:seconds (if hours are more than 0 then show in hours:minutes:seconds)
    if (duration) {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        if (hours > 0) {
            return (
                hours.toString().padStart(2, "0") +
                ":" +
                minutes.toString().padStart(2, "0") +
                ":" +
                seconds.toString().padStart(2, "0")
            );
        } else {
            return (
                minutes.toString().padStart(2, "0") +
                ":" +
                seconds.toString().padStart(2, "0")
            );
        }
    } else {
        return "00:00";
    }
};

export const formatSize = (size) => {
    const sizeInMB = size / (1024 * 1024);
    return `${sizeInMB.toFixed(2)} MB`;
};
