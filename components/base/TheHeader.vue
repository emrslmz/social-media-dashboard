<template>
  <div class="flex items-center justify-between px-6 bg-white border-b-4 border-indigo-600 min-h-16">
    <div class="flex items-center">
      <button @click="openSidebarAction()" class="text-gray-500 focus:outline-none lg:hidden">
        <i class="fa-solid fa-bars text-xl"></i>
      </button>

      <nuxt-link v-if="dashboardStore.haveData" to="/Graph"  class="text-indigo-500 focus:outline-none">
        Statistics are ready! Click to review. Go to Graph page.
      </nuxt-link>

    </div>
  </div>
</template>

<script>
import {useDashboardStore} from "~/stores/dashboard.js";

export default {
  setup(props, {emit}) {
    const dashboardStore = useDashboardStore();

    const openSidebarAction = () => {
      emit('openSidebar');
    };


    return {
      props,
      dashboardStore,
      openSidebarAction,
    }
  },
};
</script>
