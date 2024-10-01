export default class DashboardServices {
    constructor() {
        this.config = useRuntimeConfig().public;
    }

    createQueryString(params) {
        const query = new URLSearchParams(params).toString();
        return query ? `?${query}` : '';
    }

    async getTwitterPosts(params) {
        const queryString = this.createQueryString({
            query: params.keyword || '',
            section: 'latest',
        });

        const url = `${this.config.API_TWITTER_URL}${queryString}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.config.API_TWITTER_KEY,
                'x-rapidapi-host': this.config.API_TWITTER_HOST,
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching Twitter posts: ${response.statusText}`);
        }

        return await response.json();
    }

    async getInstagramPosts(params) {
        const queryString = this.createQueryString({
            keyword: params.keyword || '',
            recent_posts: true,
        });
        const url = `${this.config.API_INSTAGRAM_URL}${queryString}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.config.API_INSTAGRAM_KEY,
                'x-rapidapi-host': this.config.API_INSTAGRAM_HOST
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching Instagram posts: ${response.statusText}`);
        }
        return await response.json();
    }

    async getFacebookPosts(params) {
        const queryString = this.createQueryString({
            query: params.keyword || '',
        });

        const url = `${this.config.API_FACEBOOK_URL}${queryString}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': this.config.API_FACEBOOK_KEY,
                'x-rapidapi-host': this.config.API_FACEBOOK_HOST,
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching Twitter posts: ${response.statusText}`);
        }

        return await response.json();
    }
}
