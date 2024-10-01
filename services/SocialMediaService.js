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
            section: 'top',
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

        const data = await response.json();
        console.log(data)
        return data;
    }

    async getInstagramPosts(params) {
        const queryString = this.createQueryString({
            keyword: params.keyword || '',
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
        const data = await response.json();
        console.log(data)

        return data;
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

        const data = await response.json();
        console.log(data)
        return data;
    }
}
