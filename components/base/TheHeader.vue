<template>
  <div class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600">
    <div class="flex items-center">
      <button @click="openSidebarAction()" class="text-gray-500 focus:outline-none lg:hidden">
        <i class="fa-solid fa-bars text-xl"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',

  emits: ['openSidebar'],

  methods: {

    openSidebarAction() {
      this.$emit('openSidebar');
    },

  },
};
</script>
