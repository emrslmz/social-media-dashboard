import {defineStore} from 'pinia'
import DashboardServices from '@/services/SocialMediaService'

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        posts: [],
        twitterPostCount: 0,
        instagramPostCount: 0,
        facebookPostCount: 0,
        totalPostCount: 0,
        filterType: 1,
        isListType: true,
        loading: false,
        error: null,

        includeSearchedItems: false,
        sortCriteria: 'date',
        sortDirection: 'asc',
    }),
    actions: {
        async getTwitterPosts(params) {
            return await new DashboardServices().getTwitterPosts(params);
        },
        async getInstagramPosts(params) {
            return await new DashboardServices().getInstagramPosts(params);
        },

        async getFacebookPosts(params) {
            return await new DashboardServices().getFacebookPosts(params);
        },

        async fetchPosts(params) {
            this.loading = true;
            const [twitterPosts, facebookPosts] = await Promise.all([
                this.getTwitterPosts(params),
                this.getFacebookPosts(params),
            ]);

            const newTwitterPosts = this.mapTwitterPosts(twitterPosts.results);
            const newFacebookPosts = this.mapFacebookPosts(facebookPosts.results);
            const newPosts = [...newTwitterPosts, ...newFacebookPosts];

            if (this.includeSearchedItems) {
                this.posts = [...newPosts, ...this.posts];
                this.twitterPostCount += newTwitterPosts.length;
                this.facebookPostCount += newFacebookPosts.length;
            } else {
                this.posts = newPosts;
                this.twitterPostCount = newTwitterPosts.length;
                this.facebookPostCount = newFacebookPosts.length;
            }

            this.totalPostCount = this.twitterPostCount + this.facebookPostCount;
            this.loading = false;
        },

        mapTwitterPosts(posts) {
            return posts.map(post => ({
                postDetail: {
                    date: post.creation_date,
                    content: post.text,
                    media: post.media_url ? post.media_url[0] : null,
                    likes: post.favorite_count,
                    shares: post.retweet_count,
                    comments: post.reply_count,
                },
                userData: {
                    userId: post.user.user_id,
                    username: post.user.username,
                    name: post.user.name,
                    profilePicture: post.user.profile_pic_url ? post.user.profile_pic_url : null,
                    followers: post.user.follower_count,
                    verified: post.user.is_blue_verified,
                },
                source: 'twitter',
                count: this.twitterPostCount,
            })) || [];
        },
        mapFacebookPosts(posts) {
            return posts.map(post => ({
                postDetail: {
                    date: new Date(post.timestamp * 1000),
                    content: post.message,
                    media: post.image?.uri || null,
                    likes: post.reactions_count,
                    shares: post.shares ? post.shares : 0,
                    comments: post.comments_count ? post.comments_count : 0,
                },
                userData: {
                    userId: post.author.id,
                    username: post.author.name,
                    profilePicture: post.author.profile_pic_url ? post.author.profile_pic_url : null,
                    profileUrl: post.author.url,
                },
                source: 'facebook',
                count: this.facebookPostCount,
            })) || [];
        },

        async deletePosts() {
            this.loading = true;
            this.posts = [];
            this.twitterPostCount = 0;
            this.instagramPostCount = 0;
            this.facebookPostCount = 0;
            this.totalPostCount = 0;
            this.error = null;
            setTimeout(() => {
                this.loading = false;
            }, 300);
        },

        async changeFilterType(type) {
            this.filterType = type;
        },

        async changeIsListType(value) {
            this.isListType = value;
        },

        updateSortCriteria(criteria, direction) {
            this.sortCriteria = criteria;
            this.sortDirection = direction;
        },

        toggleIncludeSearchedItems(value) {
            this.includeSearchedItems = value;
        },
    },

    getters: {
        haveData: (state) => {
            return state.posts && state.posts.length > 0;
        },
        filteredPosts: (state) => {
            if (!state.posts) {
                return []; // posts null ise boş dizi döndür
            }

            const filteredData = state.posts.filter((post) => {
                switch (state.filterType) {
                    case 1:
                        return true; // Tüm veriler
                    case 2:
                        return post.source === 'twitter'; // Sadece Twitter
                    case 3:
                        return post.source === 'instagram'; // Sadece Instagram
                    case 4:
                        return post.source === 'facebook'; // Sadece Facebook
                    default:
                        return true; // Varsayılan olarak tüm veriler
                }
            });

            return filteredData.sort((a, b) => {
                const getSortValue = (post) => {
                    switch (state.sortCriteria) {
                        case 'date':
                            return new Date(post.postDetail.date);
                        case 'likes':
                            return post.postDetail.likes;
                        case 'shares':
                            return post.postDetail.shares;
                        case 'comments':
                            return post.postDetail.comments;
                        default:
                            return 0;
                    }
                };

                const valueA = getSortValue(a);
                const valueB = getSortValue(b);

                return state.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
            });
        },
    }
})