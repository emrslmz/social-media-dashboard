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
        searchText: '',

        isRecentPostSetting: false,

        searchPostTerm: '',

        isLiveData: false,
        countdown: 10,
        defaultCountdown: 10,

        includeSearchedItems: false,
        sortCriteria: 'date',
        sortDirection: 'asc',

        sortStartDate: null,
        sortEndDate: null,
    }),
    actions: {
        async getTwitterPosts(params) {
            return await new DashboardServices().getTwitterPosts(params);
        },

        async getFacebookPosts(params) {
            return await new DashboardServices().getFacebookPosts(params);
        },

        // %% instagram api request expired

        // async getInstagramPosts(params) {
        //     return await new DashboardServices().getInstagramPosts(params);
        // },

        async fetchPosts(params) {
            this.loading = true;
            const convertParams = {keyword: params.keyword, recent: this.isRecentPostSetting}
            const [twitterPosts, facebookPosts] = await Promise.all([
                this.getTwitterPosts(convertParams),
                this.getFacebookPosts(convertParams),
            ]);

            const newTwitterPosts = this.mapTwitterPosts(twitterPosts.results);
            const newFacebookPosts = this.mapFacebookPosts(facebookPosts.results);
            const newPosts = [...newTwitterPosts, ...newFacebookPosts]

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

        async startLiveDataFetching() {
            this.countdown = this.defaultCountdown;

            if (this.isLiveData && this.searchText) {
                const params = {keyword: this.searchText};

                const countdownTimer = setInterval(() => {
                    this.countdown -= 1;
                    if (this.countdown <= 0) {
                        this.fetchPosts(params);
                        this.countdown = this.defaultCountdown;
                    }
                }, 1000);


                this.cleanupTimers = () => {
                    clearInterval(countdownTimer);
                };
            } else {
                this.cleanupTimers && this.cleanupTimers();
            }
        },


        mapTwitterPosts(posts) {
            return posts.map(post => ({
                postDetail: {
                    date: post.creation_date,
                    content: post.text,
                    media: post.media_url !== [] ? post.media_url[0] : null,
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

        // %% instagram api request expired

        // mapInstagramPosts(posts) {
        //     return posts.media.map(post => ({
        //         postDetail: {
        //             date: new Date(post.timestamp * 1000),
        //             content: post.message,
        //             media: post.video_subtitles_uri ? post.video_subtitles_uri : null,
        //             likes: post.like_count,
        //             shares: post.reshare_count,
        //             comments: post.comment_count,
        //         },
        //         userData: {
        //             userId: post.user.id,
        //             username: post.user.username,
        //             profilePicture: post.user.profile_pic_url ? post.author.profile_pic_url : null,
        //             profileUrl: post.user.url ? post.user.url : null,
        //         },
        //         source: 'facebook',
        //         count: this.instagramPostCount,
        //     })) || [];
        // },

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

        toggleLiveData(value) {
            this.isLiveData = value;
        },

        setSearchTermForOnPost(term) {
            this.searchPostTerm = term
        },

        setStartDate(date) {
            if (date && this.isValidDate(date)) {
                this.sortStartDate = new Date(date).toISOString().split('T')[0];
            } else {
                this.sortStartDate = null;
            }
        },

        setEndDate(date) {
            if (date && this.isValidDate(date)) {
                this.sortEndDate = new Date(date).toISOString().split('T')[0];
            } else {
                this.sortEndDate = null;
            }
        },

        isValidDate(date) {
            const parsedDate = new Date(date);
            return !isNaN(parsedDate.getTime());
        },

        setSearchText(value) {
            this.searchText = value;
        },

        setRecentPostSetting(value) {
            this.isRecentPostSetting = value;
        },

        clearAllSortSetting() {
            this.filterType = 1;
            this.searchPostTerm = '';
            this.sortCriteria = 'date';
            this.sortDirection = 'asc';
            this.sortStartDate = null;
            this.sortEndDate = null;
        },
    },

    getters: {
        haveData: (state) => {
            return state.posts && state.posts.length > 0;
        },

        filteredPosts: (state) => {
            if (!state.posts) {
                return [];
            }

            const filteredData = state.posts.filter((post) => {
                switch (state.filterType) {
                    case 1:
                        return true; // all data
                    case 2:
                        return post.source === 'twitter'; // only Twitter
                    case 3:
                        return post.source === 'instagram'; // only Instagram
                    case 4:
                        return post.source === 'facebook'; // only Facebook
                    default:
                        return true;
                }
            }).filter(post => {
                const postDate = new Date(post.postDetail.date);
                const startDate = state.sortStartDate ? new Date(state.sortStartDate) : null;
                const endDate = state.sortEndDate ? new Date(state.sortEndDate) : null;

                // filter for date
                if (startDate && endDate) {
                    return postDate >= startDate && postDate <= endDate;
                } else if (startDate) {
                    return postDate >= startDate;
                } else if (endDate) {
                    return postDate <= endDate;
                }
                return true;
            });

            // filter for term
            if (state.searchPostTerm) {
                return filteredData.filter(post =>
                    post.postDetail.content.toLowerCase().includes(state.searchPostTerm.toLowerCase())
                ).map(post => ({
                    postDetail: post.postDetail,
                    userData: post.userData,
                    source: post.source,
                    count: post.count,
                }));
            }

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

        remainingTime: (state) => state.countdown,

    }
})