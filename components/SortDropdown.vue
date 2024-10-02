<template>
  <div class="relative ">
    <button
        @click="toggleSortDropdown(!isVisibleSortDropdown)"
        class="flex items-center justify-center text-gray-700 transition-colors duration-200 bg-white border rounded-lg hover:bg-gray-100 h-12 px-3 gap-x-2 text-xs xl:text-base w-full">
      <i class="fa-solid text-lg" :class="isVisibleSortDropdown ? 'fa-caret-up' : 'fa-caret-down'"></i>
      <span>Sort&Filter</span>
    </button>
    <div
        v-if="isVisibleSortDropdown"
        class="absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
      <div class="py-2 w-full" role="menu" aria-orientation="vertical">
        <div class="relative p-3">
          <p class="block mb-1">Start date</p>
          <input
              v-model="selectedStartDate"
              id="start-date"
              type="date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Select date"
              @change="saveStartDate">
        </div>

        <div class="relative p-3">
          <p class="block mb-1">End date</p>
          <input
              v-model="selectedEndDate"
              id="end-date"
              type="date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Select date"
              @change="saveEndDate">
        </div>
        <hr>
        <button
            class="flex rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer w-full z-50"
            :class="selectedCriteria === criteria.value ? 'bg-green-100' : 'hover:bg-gray-100'"
            v-for="criteria in sortingCriteria" :key="criteria.value" @click="selectCriteria(criteria.value)">
          <span class="flex items-center">
            <span class="text-gray-700">{{ criteria.label }} <i :class="criteria.icon"></i></span>
          </span>
        </button>
        <hr>
        <button
            class="flex rounded-md px-4 py-2 text-sm text-gray-700 cursor-pointer w-full z-10"
            :class="selectedDirection === direction.value ? 'bg-green-100' : 'hover:bg-gray-100'"
            v-for="direction in sortDirections" :key="direction.value" @click="selectDirection(direction.value)">
          <span class="flex items-center">
            <span class="text-gray-700">{{ direction.label }} <i :class="direction.icon"></i></span>
          </span>
        </button>
        <hr>
      </div>
    </div>
  </div>
  <div v-if="isVisibleSortDropdown" @click="toggleSortDropdown(false)" class="fixed inset-0 z-40"></div>
</template>

<script>
import {ref} from "vue";
import {useDashboardStore} from "~/stores/dashboard.js";

export default {
  setup() {
    const isVisibleSortDropdown = ref(false);

    const toggleSortDropdown = (value) => {
      isVisibleSortDropdown.value = value;
    };

    const dashboardStore = useDashboardStore();
    const selectedCriteria = ref(dashboardStore.sortCriteria);
    const selectedDirection = ref(dashboardStore.sortDirection);
    const selectedStartDate = ref(dashboardStore.sortStartDate);
    const selectedEndDate = ref(dashboardStore.sortEndDate);

    const sortingCriteria = [
      {value: 'date', label: 'Date', icon: 'fa-regular fa-clock'},
      {value: 'likes', label: 'Likes', icon: 'fa-regular fa-heart'},
      {value: 'shares', label: 'Shares', icon: 'fa-regular fa-share-from-square'},
      {value: 'comments', label: 'Comments', icon: 'fa-regular fa-comment'},
    ];

    const sortDirections = [
      {value: 'asc', label: 'Decreasing', icon: 'fa-solid fa-arrow-down-short-wide'},
      {value: 'desc', label: 'Increasing', icon: 'fa-solid fa-arrow-down-wide-short'},
    ];

    const selectCriteria = (value) => {
      selectedCriteria.value = value;
      saveSort();
    };

    const selectDirection = (value) => {
      selectedDirection.value = value;
      saveSort();
    };


    const saveSort = () => {
      dashboardStore.updateSortCriteria(selectedCriteria.value, selectedDirection.value);
      dashboardStore.setStartDate(selectedStartDate.value);
      dashboardStore.setEndDate(selectedEndDate.value);
    };


    const onClearAllSort = () => {
      dashboardStore.clearAllSortSetting();
      selectedCriteria.value = dashboardStore.sortCriteria;
      selectedDirection.value = dashboardStore.sortDirection;
      selectedStartDate.value = '';
      selectedEndDate.value = '';
    };

    const saveStartDate = () => {
      dashboardStore.setStartDate(selectedStartDate.value);
    };

    const saveEndDate = () => {
      dashboardStore.setEndDate(selectedEndDate.value);
    };

    return {
      isVisibleSortDropdown,
      sortDirections,
      sortingCriteria,
      toggleSortDropdown,
      selectedCriteria,
      selectedDirection,
      saveSort,
      selectedStartDate,
      selectedEndDate,
      onClearAllSort,
      selectCriteria,
      selectDirection,
      saveStartDate,
      saveEndDate,
    };
  }
};
</script>