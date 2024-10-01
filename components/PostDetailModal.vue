<template>
  <div
      class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 z-50">
    <div
        class="h-full sm:h-5/6 w-full sm:w-2/3 md:w-3/5 lg:w-2/4 sm:rounded-2xl bg-white py-5">
      <div class="h-full w-full overflow-y-auto px-5">
        <div class="flex justify-between px-5">
          <h2 class="text-xl font-semibold mb-2">Post Detail</h2>
          <p @click="onClose()" class="cursor-pointer">
            <i class="fa-solid fa-xmark text-2xl"></i>
          </p>
        </div>

        <div class="flex flex-col justify-start items-start space-y-4 p-4 w-full">
          <post-grid-item :post-data="props.selectedData" :is-full="true"/>
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