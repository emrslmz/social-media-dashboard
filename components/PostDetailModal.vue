<template>
  <div
      class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 z-50">
    <div
        class="h-full sm:h-5/6 w-full sm:w-2/3 md:w-3/5 lg:w-2/4 sm:rounded-2xl bg-white py-5">
      <div class="h-full w-full overflow-y-auto px-5">
        <div class="flex justify-end px-5">
          <p @click="onClose()" class="cursor-pointer">
            <i class="fa-solid fa-xmark text-2xl"></i>
          </p>
        </div>

        <div class="flex flex-col justify-start items-start space-y-4 p-4 w-full">
          <h2 class="text-xl font-semibold mb-2">Post Detail</h2>

          <div class="w-full border rounded-lg p-5">
            <div class="flex flex-col space-y-2">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-2">
                  <img v-if="isValidImage(props.selectedData.userData.profilePicture)"
                       class="object-cover w-12 h-12 rounded-full"
                       :src="props.selectedData.userData.profilePicture" alt="profile_pic_img">
                  <p v-else class="text-3xl"><i class="fa-solid fa-circle-user"></i></p>
                  <div>
                    <p class="text-gray-800 font-semibold"> {{ props.selectedData.userData.username }}</p>
                    <p class="text-gray-500 text-sm"> {{ formatDate(props.selectedData.postDetail.date) }}</p>
                  </div>
                </div>
              </div>
              <div class="mb-4">
                <p class="text-gray-700">{{ props.selectedData.postDetail.content }}</p>
              </div>
            </div>

            <div class="mb-4">
              <img
                  v-if="props.selectedData.postDetail.media !== null || isValidImage(props.selectedData.postDetail.media)"
                  :src="props.selectedData.postDetail.media"
                  alt="Post Image"
                  class="w-full h-[300px] object-contain rounded-md">
              <p v-else class="h-[300px] flex justify-center items-center">There is no image.</p>
            </div>
            <div class="flex items-center justify-between text-gray-500">
              <div class="flex items-center space-x-2">
                <div class="flex justify-center items-center space-x-3 gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <i class="fa-regular fa-heart"></i>{{ props.selectedData.postDetail.likes }}
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="flex justify-center items-center space-x-3 gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <i class="fa-regular fa-comment"></i> {{ props.selectedData.postDetail.comments }}
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="flex justify-center items-center space-x-3 gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <i class="fa-regular fa-share-from-square"></i> {{ props.selectedData.postDetail.shares }}
                </div>
              </div>
            </div>
            <hr class="mt-2 mb-2">
            <div class="font-medium text-gray-800 flex justify-center items-center space-x-2">
              <i class="fa-brands" :class="getIconClass(props.selectedData.source)"></i>
              <p class="text-sm font-normal text-gray-600">{{ props.selectedData.source }}.com</p>
            </div>
            <hr class="mt-2 mb-2">

          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import {formatDate} from "~/utils/formatDate.js";

export default {
  props: {
    selectedData: {
      type: Object,
      required: true,
    }
  },
  setup(props, {emit}) {

    const isValidImage = (url) => {
      return /\.(png|jpg|jpeg|gif|bmp|webp)$/i.test(url);
    };

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

    const onClose = () => {
      emit('close');
    };

    return {
      isValidImage,
      getIconClass,
      formatDate,
      onClose,
      props,

    };
  },
};
</script>