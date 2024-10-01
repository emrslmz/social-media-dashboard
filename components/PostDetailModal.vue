<template>
  <div
      class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 z-50">
    <div
        class="min-h-[70%] sm:h-4/6 w-[90%] sm:w-2/3 lg:w-4/5 xl:w-3/5 2xl:w-2/5 overflow-y-auto sm:rounded-2xl bg-white p-5 sm:p-10 rounded-lg">
      <div>
        <div class="flex justify-between px-5">
          <h2 class="text-xl font-semibold mb-2">Post Detail</h2>
          <p @click="onClose()" class="cursor-pointer">
            <i class="fa-solid fa-xmark text-2xl"></i>
          </p>
        </div>

        <div class="flex justify-center items-start w-full h-full">
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
    // selectedData for post detail
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