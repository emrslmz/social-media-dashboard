<template>
  <div
      class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="h-screen sm:h-3/6 w-full sm:w-2/3 md:w-3/5 lg:w-2/4 overflow-y-auto sm:rounded-2xl bg-white py-5 px-10">
      <div class="flex justify-end">
        <p @click="onClose()" class="cursor-pointer">
          <i class="fa-solid fa-xmark text-2xl"></i>
        </p>
      </div>

      <div class="flex flex-col justify-start items-start space-y-4 p-4 w-full">
        <h2 class="text-xl font-semibold mb-2">Sorting Criteria</h2>

        <div class="flex flex-col space-y-2">
          <label class="flex items-center">
            <input type="radio" value="date" v-model="selectedCriteria" class="mr-2 text-blue-600"/>
            <span class="text-gray-700">Date <i class="fa-regular fa-clock"></i></span>
          </label>
          <label class="flex items-center">
            <input type="radio" value="likes" v-model="selectedCriteria" class="mr-2 text-blue-600"/>
            <span class="text-gray-700">Likes <i class="fa-regular fa-heart"></i></span>
          </label>
          <label class="flex items-center">
            <input type="radio" value="shares" v-model="selectedCriteria" class="mr-2 text-blue-600"/>
            <span class="text-gray-700">Shares <i class="fa-regular fa-share-from-square"></i></span>
          </label>
          <label class="flex items-center">
            <input type="radio" value="comments" v-model="selectedCriteria" class="mr-2 text-blue-600"/>
            <span class="text-gray-700">Comments <i class="fa-regular fa-comment"></i></span>
          </label>
        </div>

        <h3 class="text-md font-semibold mt-4">Sort Direction</h3>
        <div class="flex flex-col space-y-2">
          <label class="flex items-center">
            <input type="radio" value="asc" v-model="selectedDirection" class="mr-2 text-blue-600"/>
            <span class="text-gray-700">From decreasing to increasing <i class="fa-solid fa-arrow-down-short-wide"></i></span>
          </label>
          <label class="flex items-center">
            <input type="radio" value="desc" v-model="selectedDirection" class="mr-2 text-blue-600"/>
            <span class="text-gray-700">From increasing to decreasing <i class="fa-solid fa-arrow-down-wide-short"></i></span>
          </label>
        </div>

        <div class="flex justify-end items-center space-x-3 w-full">
          <button
              @click="onClose"
              class="flex items-center justify-center w-full px-12 py-2 text-sm text-gray-700 transition-colors duration-200 bg-gray-100 border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-200">
            <i class="fa-solid fa-xmark"></i>
            <span>Cancel</span>
          </button>
          <button
              @click="saveSort"
              class="flex items-center justify-center w-full px-12 py-2 text-sm text-gray-700 transition-colors duration-200 bg-gray-100 border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-200">
            <i class="fa-regular fa-floppy-disk"></i>
            <span>Save</span>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import {useDashboardStore} from '@/stores/dashboard';

export default {
  setup(props, {emit}) {
    const dashboardStore = useDashboardStore();
    const selectedCriteria = ref(dashboardStore.sortCriteria);
    const selectedDirection = ref(dashboardStore.sortDirection);

    const saveSort = () => {
      dashboardStore.updateSortCriteria(selectedCriteria.value, selectedDirection.value);
      onClose();
    };

    const onClose = () => {
      emit('close');
    };

    return {
      selectedCriteria,
      selectedDirection,
      saveSort,
      onClose,
    };
  },
};
</script>