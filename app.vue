<template>
  <div class="flex h-screen bg-gray-200 w-full">
    <the-sidebar :is-sidebar-active="sidebarOpen" @close="toggleSideBar(false)"/>
    <div class="flex flex-col flex-1 overflow-hidden">
      <the-header @open-sidebar="toggleSideBar(true)"/>
      <NuxtPage/>
    </div>
  </div>
</template>

<script>
import TheSidebar from "@/components/base/TheSidebar.vue";
import TheHeader from "@/components/base/TheHeader.vue";

export default {

  components: {
    TheHeader,
    TheSidebar,
  },

  data() {
    return {
      sidebarOpen: false,
    };
  },

  methods: {
    toggleSideBar(value) {
      this.sidebarOpen = value;
    }
  },
};
</script>
