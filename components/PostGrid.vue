<template>
  <div class="flex flex-wrap justify-center items-center mx-auto" v-if="dashboardStore.filteredPosts.length">
    <div v-for="(post, index) in dashboardStore.filteredPosts"
         :key="index"
         @click="togglePostDetailModal(true, post)" class="w-full sm:w-auto">
      <post-grid-item :post-data="post"/>
    </div>
  </div>
  <div v-else class="divide-y divide-gray-200">
    <p class="text-center text-gray-500 py-4">No data was found matching your filter.</p>
  </div>

  <post-detail-modal v-if="isVisiblePostDetailModal" :selected-data="selectedData"
                     @close="togglePostDetailModal(false, null)"/>
</template>

<script>
import {formatDate} from "~/utils/formatDate";
import {useDashboardStore} from "~/stores/dashboard.js";
import {defineComponent, ref} from "vue";

export default defineComponent({
  setup() {
    const dashboardStore = useDashboardStore();
    const isVisiblePostDetailModal = ref(false);
    const selectedData = ref(null);

    const togglePostDetailModal = (value, data) => {
      isVisiblePostDetailModal.value = value;
      selectedData.value = data;
    };

    return {
      dashboardStore,
      formatDate,
      isVisiblePostDetailModal,
      togglePostDetailModal,
      selectedData,
    }
  },
});

</script>
