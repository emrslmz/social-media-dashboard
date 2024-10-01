<template>
  <div
      :class="props.isSidebarActive ? 'block' : 'hidden'"
      @click="closeSidebar()"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden">
  </div>
  <div
      :class="props.isSidebarActive ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0">

    <div class="flex items-center justify-center mt-8">
      <div class="flex items-center">
        <span class="mx-2 text-2xl font-semibold text-white">SM Monitoring Db</span>
      </div>
    </div>


    <nav class="mt-10">
      <nuxt-link to="/" :class="isActiveRouteClass('index')"
                 class="flex items-center px-6 py-2 mt-4">
        <i class="fa-solid fa-gauge text-xl"></i>
        <span class="mx-3">Dashboard</span>
      </nuxt-link>

      <nuxt-link to="/Graph" :class="isActiveRouteClass('Graph')"
                 class="flex items-center px-6 py-2 mt-4">
        <i class="fa-solid fa-chart-simple text-xl"></i>
        <span class="mx-3">Statistics</span>
      </nuxt-link>

      <nuxt-link to="/About" :class="isActiveRouteClass('About')"
                 class="flex items-center px-6 py-2 mt-4">
        <i class="fa-regular fa-hand text-xl"></i>
        <span class="mx-3">About</span>
      </nuxt-link>
    </nav>
  </div>
</template>

<script>
import {useDashboardStore} from "~/stores/dashboard.js";
import { useRoute } from 'vue-router';

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, {emit}) {
    const dashboardStore = useDashboardStore();

    const closeSidebar = () => {
      emit('close');
    };

    const isActiveRouteClass = (route) => {
      const currentRoute = useRoute();
      return currentRoute.name === route
          ? 'text-gray-100 bg-gray-700 bg-opacity-25'
          : 'text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100';
    };

    return {
      props,
      dashboardStore,
      closeSidebar,
      isActiveRouteClass,
    }
  },
};
</script>
