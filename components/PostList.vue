<template>
  <table class="w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
    <tr>
      <th scope="col"
          class="px-12 py-3.5 text-sm font-normal text-center text-gray-500">
        Platform
      </th>

      <th scope="col"
          class="px-12 py-3.5 text-sm font-normal text-center text-gray-500">
        Username
      </th>

      <th scope="col"
          class="px-4 py-3.5 text-sm font-normal text-center text-gray-500">
        Detail
      </th>

      <th scope="col"
          class="px-4 py-3.5 text-sm font-normal text-center text-gray-500">
        Shared at
      </th>

      <th scope="col"
          class="px-4 py-3.5 text-sm font-normal text-center text-gray-500">
        Like, Comment, Share
      </th>

      <th scope="col" class="relative py-3.5 px-4">
        <span class="sr-only">Edit</span>
      </th>
    </tr>
    </thead>
    <tbody class="divide-y divide-gray-200" v-if="dashboardStore.filteredPosts.length">
    <tr v-for="(post, index) in dashboardStore.filteredPosts" :key="index">
      <td class="px-4 py-4 text-sm font-medium whitespace-nowrap text-left">
        <div>
          <p class="font-medium text-gray-800">
            <i class="fa-brands" :class="getIconClass(post.source)"></i>
          </p>
          <p class="text-sm font-normal text-gray-600">{{ post.source }}.com</p>
        </div>
      </td>
      <td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div
            class="px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 flex justify-start items-center">
          <img v-if="isValidImage(post.userData.profilePicture)"
               class="object-cover w-6 h-6 -mx-1 border-2 border-white rounded-full shrink-0"
               :src="post.userData.profilePicture" alt="profile_pic_img">
          <div v-else
               class="flex justify-center items-center w-6 h-6 rounded-full shrink-0 text-lg">
            <i class="fa-solid fa-circle-user"></i>
          </div>
          {{ truncateText(post.userData.username, 10) }}
        </div>
      </td>
      <td class="px-4 py-4 text-sm whitespace-nowrap">
        <div @click="togglePostDetailModal(true, post)">
          <p class="text-gray-700">{{ truncateText(post.postDetail.content, 50) }}</p>
          <p class="text-gray-500 cursor-pointer">see more</p>
        </div>
      </td>
      <td class="px-4 py-4 text-sm whitespace-nowrap">
        {{ formatDate(post.postDetail.date) }}
      </td>

      <td class="px-4 py-4 text-sm whitespace-nowrap">
        <div class="flex justify-end items-center space-x-4">
          <p>{{ post.postDetail.likes }} <i class="fa-regular fa-heart"></i></p>
          <p>{{ post.postDetail.comments }} <i class="fa-regular fa-comment"></i></p>
          <p>{{ post.postDetail.shares }} <i class="fa-regular fa-share-from-square"></i></p>
        </div>
      </td>

      <td class="px-4 py-4 text-sm whitespace-nowrap">
        <button @click="togglePostDetailModal(true, post)"
                class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </td>
    </tr>
    </tbody>
    <tbody class="divide-y divide-gray-200"
           v-else>
    <tr class="w-full">
      <td colspan="6" class="text-center text-gray-500 py-4">No data was found matching your filter.</td>
    </tr>
    </tbody>
  </table>

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
      selectedData,
      togglePostDetailModal
    }
  },
});

</script>
