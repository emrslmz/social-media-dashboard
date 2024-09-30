<template>
  <div class="flex flex-wrap justify-center items-center mx-auto" v-if="dashboardStore.filteredPosts">
    <div class="bg-white p-4 rounded-lg h-[430px] w-full sm:w-[400px] xl:w-[270px] my-3 mx-2 border"
         v-for="(post, index) in dashboardStore.filteredPosts"
         :key="index"
         @click="togglePostDetailModal(true, post)">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <img v-if="isValidImage(post.userData.profilePicture)"
               class="object-cover w-8 h-8 rounded-full"
               :src="post.userData.profilePicture" alt="profile_pic_img">
          <p v-else class="text-3xl"><i class="fa-solid fa-circle-user"></i></p>
          <div>
            <p class="text-gray-800 font-semibold"> {{ truncateText(post.userData.username, 10) }}</p>
            <p class="text-gray-500 text-sm"> {{ formatDate(post.postDetail.date) }}</p>
          </div>
        </div>
        <div class="text-gray-500 cursor-pointer">
          <button class="hover:bg-gray-50 rounded-full p-1">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>
      <!--      componentlere ayır, mdal ekleeeeeeee-->
      <div class="mb-4">
        <p class="text-gray-700">{{ truncateText(post.postDetail.content, 30) }} <span
            class="text-gray-500 cursor-pointer">see more</span></p>
      </div>
      <div class="mb-4">
        <img v-if="post.postDetail.media !== null && isValidImage(post.postDetail.media)" :src="post.postDetail.media" alt="Post Image"
             class="w-full h-48 object-cover rounded-md">
        <p v-else class="h-48 flex justify-center items-center">There is no image.</p>
      </div>
      <div class="flex items-center justify-between text-gray-500">
        <div class="flex items-center space-x-2">
          <div class="flex justify-center items-center space-x-3 gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
            <i class="fa-regular fa-heart"></i>{{ post.postDetail.likes }}
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="flex justify-center items-center space-x-3 gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
            <i class="fa-regular fa-comment"></i> {{ post.postDetail.comments }}
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="flex justify-center items-center space-x-3 gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
            <i class="fa-regular fa-share-from-square"></i> {{ post.postDetail.shares }}
          </div>
        </div>
      </div>
      <hr class="mt-2 mb-2">
      <div class="font-medium text-gray-800 flex justify-center items-center space-x-2">
        <i class="fa-brands" :class="getIconClass(post.source)"></i>
        <p class="text-sm font-normal text-gray-600">{{ post.source }}.com</p>
      </div>
      <hr class="mt-2 mb-2">
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
