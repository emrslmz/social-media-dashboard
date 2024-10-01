<template>
  <div class="flex justify-center items-center space-x-3 mt-4 md:mt-0">
    <div class="relative flex items-center w-2/3">
      <i class="fa-solid fa-magnifying-glass absolute left-3 text-gray-400"></i>
      <input :disabled="isDisabledInputAndButton" type="text" v-model="searchText"
             @keyup.enter="searchAction"
             :class="dashboardStore.loading ? 'cursor-not-allowed opacity-70' : ''"
             :placeholder="placeHolderInput"
             class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-64 lg:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
    </div>

    <button
        :disabled="isDisabledInputAndButton"
        :class="[dashboardStore.loading ? 'cursor-not-allowed opacity-70' : '', isSearchFromApi ? 'bg-blue-500' : 'bg-green-500']"
        @click="searchAction"
        class="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200  rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 w-1/3">
      <i class="fa-solid fa-magnifying-glass"></i>
      <span>Search</span>
    </button>
  </div>
</template>

<script setup>
import {useDashboardStore} from '~/stores/dashboard.js'
import {computed, ref} from 'vue'

const searchText = ref('');
const dashboardStore = useDashboardStore();


const props = defineProps({
  searchKey: String,
});

const isSearchOnPostsData = computed(() => {
  return props.searchKey === 'searchPostOnStore';
});

const isSearchFromApi = computed(() => {
  return props.searchKey === 'getPostFromApi';
});


const searchAction = async () => {

  if (searchText.value.length >= 1 && dashboardStore.loading === false) {
    if (isSearchOnPostsData.value) {
      await dashboardStore.setSearchTermForOnPost(searchText.value)
    } else if (isSearchFromApi.value) {
      await dashboardStore.fetchPosts({keyword: searchText.value});
    }
  } else {
    alert('The searched word must be at least 2 characters');
  }
};

const isDisabledInputAndButton = computed(() => {
  if (dashboardStore.loading) {
    return true;
  }
});

const placeHolderInput = computed(() => {
  if (isSearchOnPostsData.value) {
    return 'Search key on post data';
  } else if (isSearchFromApi.value) {
    return 'Search #hastag or keyword';
  }
  return ''
});
</script>