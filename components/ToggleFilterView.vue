<template>
  <div class="flex flex-col space-y-3 w-full pt-10">
    <div
        class="flex flex-col-reverse xl:flex-row justify-center lg:justify-end items-center gap-y-4 gap-x-3 w-full py-2">

      <div class="flex justify-end items-end space-x-3 w-full" v-if="dashboardStore.haveData">

        <div v-if="isVisibleSearchTermOnPostsInput"
             class="flex justify-center sm:justify-end items-center lg:-mx-5 -mt-4">
          <search-bar searchKey="searchPostOnStore"/>
        </div>
        <div v-else class="pt-12"></div>

        <button
            @click="toggleSearchTermOnPostInput(!isVisibleSearchTermOnPostsInput)"
            class="flex items-center justify-center text-gray-700 transition-colors duration-200 bg-white border rounded-lg hover:bg-gray-100 h-12 px-3 gap-x-2 text-xs xl:text-base w-32 lg:w-48">
          <i class="fa-solid fa-magnifying-glass-chart"></i>
          <span v-if="isVisibleSearchTermOnPostsInput">Hide input</span>
          <span v-else>Open search input</span>
        </button>

      </div>

      <div class="flex justify-between sm:justify-end items-center space-x-3 w-full xl:w-auto">
        <button
            @click="toggleLiveDataCheckbox"
            class="flex items-center justify-center transition-colors duration-200 bg-green-500 border rounded-lg h-12 px-3 gap-x-2 text-xs xl:text-base text-white w-56 z-10">
          <span class="inline-flex items-center cursor-pointer text-white">
            <input type="checkbox" class="form-checkbox h-5 w-5 text-white"
                   v-model="dashboardStore.isLiveData">
            <span class="ml-2 text-white">Live Data</span>
          </span>
        </button>

        <button
            @click="toggleIncludeSearchedItemsCheckbox"
            class="flex items-center justify-center text-gray-700 transition-colors duration-200 bg-white border rounded-lg h-12 px-3 gap-x-2 text-xs xl:text-base w-56 z-10">
          <span class="inline-flex items-center cursor-pointer">
            <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600"
                   v-model="dashboardStore.includeSearchedItems"/>
            <span class="ml-2 text-gray-700">Add searched items </span>
          </span>
        </button>

      </div>

    </div>

    <div class="flex flex-col-reverse lg:flex-row lg:justify-between items-center space-x-2 w-full">
      <div
          class="inline-flex justify-center rounded-lg bg-white border divide-x shadow-sm w-full lg:w-2/3 h-12">
        <button
            v-for="(label, index) in filters"
            :key="index"
            :class="filterActiveClass(index + 1)"
            @click="toggleFilterType(index + 1)"
            class="transition-colors duration-200 text-gray-600 hover:bg-gray-100 w-full px-5 text-xs xl:text-base">
          {{ label }} <span v-if="dashboardStore.haveData">({{ postCount(index + 1) }})</span>
        </button>
      </div>

      <div class="flex justify-center lg:justify-end space-x-2 w-full lg:w-1/3 mb-3 lg:mb-0">

        <div class="w-1/2">
          <sort-dropdown/>
        </div>
        <button
            @click="toggleListType(!dashboardStore.isListType)"
            class="flex items-center justify-center text-gray-700 transition-colors duration-200 bg-white border rounded-lg hover:bg-gray-100 h-12 px-3 gap-x-2 text-xs xl:text-base w-1/2">
          <i class="fa-solid " :class="dashboardStore.isListType ? 'fa-bars' : 'fa-table-cells'"></i>
          <span>{{ dashboardStore.isListType ? 'List view' : 'Grid view' }}</span>
        </button>
      </div>

    </div>

  </div>

  <sort-modal v-if="isVisibleSortModal" @close="toggleSortModal(false)"/>

</template>

<script>
import {defineComponent, ref} from "vue";
import SortModal from "~/components/SortModal.vue";
import {useDashboardStore} from "~/stores/dashboard.js";
import SearchTermOnPosts from "~/components/SearchTermOnPosts.vue";
import SearchBar from "~/components/SearchBar.vue";

export default defineComponent({
  components: {
    SearchTermOnPosts,
    SortModal,
    SearchBar
  },
  setup() {
    const dashboardStore = useDashboardStore();

    const isVisibleSortModal = ref(false);
    const isVisibleSearchTermOnPostModal = ref(false);
    const isVisibleSearchTermOnPostsInput = ref(false);
    const filters = ['View all', 'Twitter', 'Instagram', 'Facebook'];

    const filterActiveClass = (type) => {
      return type === dashboardStore.filterType ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-100';
    };

    const postCount = (type) => {
      if (!dashboardStore.haveData) return null;

      switch (type) {
        case 1:
          return dashboardStore.totalPostCount;
        case 2:
          return dashboardStore.twitterPostCount;
        case 3:
          return dashboardStore.instagramPostCount;
        case 4:
          return dashboardStore.facebookPostCount;
        default:
          return null;
      }
    };

    const toggleFilterType = (value) => {
      dashboardStore.changeFilterType(value);
    };

    const toggleListType = (value) => {
      dashboardStore.changeIsListType(value);
    };


    const toggleSearchTermOnPostInput = (value) => {
      isVisibleSearchTermOnPostsInput.value = value;
    };

    const toggleIncludeSearchedItemsCheckbox = () => {
      dashboardStore.toggleIncludeSearchedItems(!dashboardStore.includeSearchedItems);
    };

    const toggleSortModal = (value) => {
      isVisibleSortModal.value = value;
    };

    const toggleLiveDataCheckbox = () => {
      dashboardStore.toggleLiveData(!dashboardStore.isLiveData);
      if (dashboardStore.isLiveData === true) {
        dashboardStore.toggleIncludeSearchedItems(false);
      }
      dashboardStore.startLiveDataFetching();
    }

    return {
      dashboardStore,
      isVisibleSortModal,
      isVisibleSearchTermOnPostModal,
      isVisibleSearchTermOnPostsInput,
      filters,
      filterActiveClass,
      postCount,
      toggleFilterType,
      toggleListType,
      toggleSortModal,
      toggleSearchTermOnPostInput,
      toggleIncludeSearchedItemsCheckbox,
      toggleLiveDataCheckbox,
    };
  },
});
</script>
