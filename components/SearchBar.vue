<template>
  <div class="flex justify-center items-center space-x-3 pt-4 md:pt-0">
    <div class="relative flex items-center lg:w-2/3">
      <i class="fa-solid fa-magnifying-glass absolute left-3 text-gray-400"></i>
      <input :disabled="isDisabledInputAndButton" type="text"
             @keyup.enter="searchAction"
             v-model="searchValue"
             :class="dashboardStore.loading ? 'cursor-not-allowed opacity-70' : ''"
             :placeholder="placeHolderInput"
             class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-64 lg:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 h-12">
    </div>

    <button
        v-if="isSearchFromApi"
        type="button"
        :disabled="isDisabledInputAndButton"
        :class="[dashboardStore.loading ? 'cursor-not-allowed opacity-70' : '', isSearchFromApi ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600']"
        @click="searchAction"
        class="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200  rounded-lg shrink-0 sm:w-auto gap-x-2  w-1/3 h-12">
      <i class="fa-solid fa-magnifying-glass"></i>
      <span>Search</span>
    </button>
    <button
        v-else
        type="button"
        @click="clearFilter"
        class="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200  rounded-lg shrink-0 sm:w-auto gap-x-2 bg-red-500 hover:bg-red-600 lg:w-1/6 h-12">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</template>

<script setup>
import {useDashboardStore} from '~/stores/dashboard.js';
import {computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const route = useRoute();
const router = useRouter();
const dashboardStore = useDashboardStore();

const props = defineProps({
  searchKey: String,
});

const isSearchOnPostsData = computed(() => props.searchKey === 'searchPostOnStore');
const isSearchFromApi = computed(() => props.searchKey === 'getPostFromApi');

const searchAction = async () => {
  if (dashboardStore.searchText.length >= 1 && !dashboardStore.loading) {
    if (isSearchOnPostsData.value) {
      await dashboardStore.setSearchTermForOnPost(dashboardStore.searchPostTerm);
    } else if (isSearchFromApi.value) {
      await router.push({query: {...route.query, searchText: dashboardStore.searchText}});
      await dashboardStore.fetchPosts({keyword: dashboardStore.searchText});
    }
  } else {
    alert('The searched word must be at least 2 characters');
  }
};

const clearFilter = async () => {
  dashboardStore.clearAllSortSetting();
};

const searchText = computed(() => dashboardStore.searchText);
const searchPostTerm = computed(() => dashboardStore.searchPostTerm);

const searchValue = computed({
  get() {
    return isSearchFromApi.value ? searchText.value : searchPostTerm.value;
  },
  set(value) {
    if (isSearchFromApi.value) {
      dashboardStore.setSearchText(value);
    } else {
      dashboardStore.setSearchTermForOnPost(value);
    }
  },
});

const isDisabledInputAndButton = computed(() => dashboardStore.loading);

const placeHolderInput = computed(() => {
  if (isSearchOnPostsData.value) {
    return 'Search key on post data';
  } else if (isSearchFromApi.value) {
    return 'Search #hashtag or keyword';
  }
  return '';
});
</script>
