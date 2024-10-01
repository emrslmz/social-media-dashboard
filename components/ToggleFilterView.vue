<template>
  <div class="flex flex-col space-y-2 mt-2">
    <div class="flex justify-end items-center w-full">
      <button
          @click="toggleCheckbox"
          class="flex items-center justify-center w-full px-2 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100 z-20">
        <label class="inline-flex items-center cursor-pointer" @click="toggleCheckbox">
          <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600"
                 v-model="dashboardStore.includeSearchedItems" :checked="dashboardStore.includeSearchedItems"
                 @change="toggleCheckbox">
          <span class="ml-2 text-gray-700">Add searched items </span>
        </label>
      </button>
    </div>

    <div class="flex flex-col 2xl:flex-row justify-between space-y-2 w-full">
      <div class="inline-flex justify-center bg-white border divide-x rounded-lg shadow-sm rtl:flex-row-reverse xl:w-1/2">
        <button
            v-for="(label, index) in filters"
            :key="index"
            :class="filterActiveClass(index + 1)"
            @click="toggleFilterType(index + 1)"
            class="px-5 py-2 text-xs font-medium transition-colors duration-200 sm:text-sm text-gray-600 hover:bg-gray-100 w-full">
          {{ label }} <span v-if="dashboardStore.haveData">({{ postCount(index + 1) }})</span>
        </button>
      </div>


      <div class="flex flex-col sm:flex-row justify-end items-center gap-x-2 space-y-2 sm:space-y-0.5 lg:space-y-0">

        <button
            v-if="dashboardStore.haveData"
            @click="toggleSearchKeyOnPostBarModal(true)"
            class="flex items-center justify-center w-full px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100">
          <i class="fa-solid fa-magnifying-glass-chart"></i>
          <span>Search within data</span>
        </button>

        <div class="flex justify-center items-center w-full space-x-2 sm:w-auto">
          <button
              @click="toggleSortModal(true)"
              class="flex items-center justify-center w-full px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100">
            <i class="fa-solid fa-arrow-up-a-z"></i>
            <span>Sort</span>
          </button>
          <button
              @click="toggleListType(!dashboardStore.isListType)"
              class="flex items-center justify-center w-full px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100">
            <i class="fa-solid " :class="dashboardStore.isListType ? 'fa-bars' : 'fa-table-cells'"></i>
            <span>{{ dashboardStore.isListType ? 'List view' : 'Grid view' }}</span>
          </button>
        </div>
      </div>

      <sort-modal v-if="isVisibleSortModal" @close="toggleSortModal(false)"/>

      <search-term-on-posts v-if="isVisibleSearchKeyOnPostBarModal"
                            @close="toggleSearchKeyOnPostBarModal(false)"/>

    </div>

  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import SortModal from "~/components/SortModal.vue";
import {useDashboardStore} from "~/stores/dashboard.js";
import SearchTermOnPosts from "~/components/SearchTermOnPosts.vue";

export default defineComponent({
  components: {
    SearchTermOnPosts,
    SortModal,
  },
  setup() {
    const dashboardStore = useDashboardStore();

    const isVisibleSortModal = ref(false);
    const isVisibleSearchKeyOnPostBarModal = ref(false);
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

    const toggleSortModal = (value) => {
      isVisibleSortModal.value = value;
    };

    const toggleSearchKeyOnPostBarModal = (value) => {
      isVisibleSearchKeyOnPostBarModal.value = value;
    };

    const toggleCheckbox = () => {
      dashboardStore.toggleIncludeSearchedItems(!dashboardStore.includeSearchedItems);
    };


    return {
      dashboardStore,
      isVisibleSortModal,
      isVisibleSearchKeyOnPostBarModal,
      filters,
      filterActiveClass,
      postCount,
      toggleFilterType,
      toggleListType,
      toggleSortModal,
      toggleSearchKeyOnPostBarModal,
      toggleCheckbox,
    };
  },
});
</script>
