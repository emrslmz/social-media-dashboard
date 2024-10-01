<template>
  <div
      :class="props.isSidebarActive ? 'block' : 'hidden'"
      @click="closeSidebar()"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden">
  </div>
  <div
      :class="props.isSidebarActive ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gradient-to-br from-gray-800 to-gray-900 lg:translate-x-0 lg:static lg:inset-0">

    <div class="flex items-center justify-center mt-8">

      <div class="relative border-b border-white/20">
        <h6 class="block antialiased tracking-normal font-sans font-semibold leading-relaxed text-white text-xl">
          SM Monitoring Db</h6>
      </div>

    </div>
    <div class="m-4 pt-10">
      <ul class="mb-4 flex flex-col gap-1">
        <li v-for="(menu, index) in menuItems" :key="index" @click="closeSidebar()">
          <nuxt-link :to="menu.to" aria-current="page">
            <button
                :class="isActiveRouteClass(menu.routeName)"
                class="middle none font-sans font-bold center transition-all text-xs py-3 rounded-lg text-white w-full flex items-center gap-4 px-4 capitalize">
              <i :class="menu.icon" class="text-2xl"></i>
              <span class="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                {{ menu.name }}</span>
            </button>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {useDashboardStore} from "~/stores/dashboard.js";
import {useRoute} from 'vue-router';

export default {
  props: {
    // isActive for show menu
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, {emit}) {
    const dashboardStore = useDashboardStore();
    const menuItems = [
      {
        name: 'Home',
        icon: 'fa-solid fa-house-chimney',
        to: '/',
        routeName: 'index'
      },
      {
        name: 'Dashboard',
        icon: 'fa-solid fa-gauge',
        to: '/Dashboard',
        routeName: 'Dashboard'
      },
      {
        name: 'Statistics',
        icon: 'fa-solid fa-chart-simple',
        to: '/Graph',
        routeName: 'Graph'
      },
      {
        name: 'About',
        icon: 'fa-regular fa-hand',
        to: '/About',
        routeName: 'About'
      }
    ];

    const closeSidebar = () => {
      emit('close');
    };

    const isActiveRouteClass = (route) => {
      const currentRoute = useRoute();
      return currentRoute.name === route
          ? 'bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40'
          : 'hover:bg-white/10 bg-white/30';
    };

    return {
      props,
      menuItems,
      dashboardStore,
      closeSidebar,
      isActiveRouteClass,
    }
  },
};
</script>
