<template>
  <div class="flex items-center justify-between px-6 bg-white border-b-4 border-indigo-600 min-h-16">
    <div class="flex items-center">
      <button @click="openSidebarAction()" class="text-gray-500 focus:outline-none lg:hidden">
        <i class="fa-solid fa-bars text-xl"></i>
      </button>

      <nuxt-link v-if="dashboardStore.haveData && $route.path !== '/Graph'" to="/Graph"
                 class="text-xs text-indigo-500 focus:outline-none px-5">
        <i class="fa-solid fa-circle"></i> Stats ready! Click to review. Go to Graph.
      </nuxt-link>

      <a v-if="dashboardStore.isLiveData"
         class="text-xs text-green-500 focus:outline-none px-5">
        <i class="fa-solid fa-circle"></i> Live monitoring active. Updates every 60s.
      </a>


    </div>
  </div>
</template>

<script>
import {useDashboardStore} from "~/stores/dashboard.js";

export default {
  emits: ['close'],
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
