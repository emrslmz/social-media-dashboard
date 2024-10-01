<template>
  <div class="flex flex-wrap justify-center items-center mx-auto" v-if="dashboardStore.filteredPosts.length">


    <div v-for="(post, index) in dashboardStore.filteredPosts"
         :key="index"
         @click="togglePostDetailModal(true, post)">
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

    const getIconClass = (source) => {
      switch (source) {
        case 'twitter':
          return 'fa-twitter';
        case 'instagram':
          return 'fa-instagram';
        default:
          return 'fa-facebook';
      }
    };

    const truncateText = (str, maxLength) => {
      return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    };

    const isValidImage = (url) => {
      return /\.(png|jpg|jpeg|gif|bmp|webp)$/i.test(url);
    };

    const togglePostDetailModal = (value, data) => {
      isVisiblePostDetailModal.value = value;
      selectedData.value = data;
    };

    return {
      dashboardStore,
      formatDate,
      getIconClass,
      truncateText,
      isValidImage,
      isVisiblePostDetailModal,
      togglePostDetailModal,
      selectedData,
    }
  },
});

</script>
