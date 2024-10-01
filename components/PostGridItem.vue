<template>
  <div :class="props.isFull ? 'w-full  h-[530px]' : 'w-full sm:w-[400px] xl:w-[270px]  h-[450px]'"
       class="bg-white p-4 rounded-lg my-3 mx-2 border cursor-pointer">
    <div class="flex items-center justify-between mb-4 w-full">
      <div class="flex items-center space-x-2">
        <img v-if="isValidImage(props.postData.userData.profilePicture)"
             class="object-cover w-8 h-8 rounded-full"
             :src="props.postData.userData.profilePicture" alt="profile_pic_img">
        <p v-else class="text-3xl"><i class="fa-solid fa-circle-user"></i></p>
        <div>
          <p class="text-gray-800 font-semibold"> {{
              isFull ? props.postData.userData.username : truncateText(props.postData.userData.username, 10)
            }}</p>
          <p class="text-gray-500 text-sm"> {{ formatDate(props.postData.postDetail.date) }}</p>
        </div>
      </div>
      <div class="text-gray-500 cursor-pointer">
        <button class="hover:bg-gray-50 rounded-full p-1">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>
    </div>
    <div class="mb-4">
      <p class="text-gray-700">{{
          isFull ? props.postData.postDetail.content : truncateText(props.postData.postDetail.content, 25)
        }} <span
          class="text-gray-500 cursor-pointer">see more</span></p>
    </div>
    <div class="mb-4">
      <img v-if="props.postData.postDetail.media !== null || isValidImage(props.postData.postDetail.media)"
           :src="props.postData.postDetail.media"
           alt="Post Image"
           :class="props.isFull ? 'h-[300px] object-contain': 'h-48 object-cover'"
           class="w-full rounded-md">
      <p v-else
         :class="props.isFull ? 'h-[300px]': 'h-48'"
         class="h-48 flex justify-center items-center">There is no image.</p>
    </div>
    <div class="flex items-center justify-between text-gray-500">
      <div class="flex items-center space-x-2">
        <div class="flex justify-center items-center space-x-3 gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
          <i class="fa-regular fa-heart"></i>{{ props.postData.postDetail.likes }}
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <div class="flex justify-center items-center space-x-3 gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
          <i class="fa-regular fa-comment"></i> {{ props.postData.postDetail.comments }}
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <div class="flex justify-center items-center space-x-3 gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
          <i class="fa-regular fa-share-from-square"></i> {{ props.postData.postDetail.shares }}
        </div>
      </div>
    </div>
    <hr class="mt-2 mb-2">
    <div class="font-medium text-gray-800 flex justify-center items-center space-x-2 py-2">
      <i class="fa-brands" :class="getIconClass(props.postData.source)"></i>
      <p class="text-sm font-normal text-gray-600">{{ props.postData.source }}.com</p>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    postData: {
      type: Object,
      required: true,
    },
    isFull: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
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

    return {
      props,
      getIconClass,
      truncateText,
      isValidImage
    }
  }
};
</script>