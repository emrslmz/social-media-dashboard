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


        <div class="flex flex-col justify-center items-center space-y-3 mt-4 md:mt-0">

          <p class="text-2xl text-left font-bold">Use the search button to search within posts.</p>
          <search-bar searchKey="searchPostOnStore"/>

          <div v-if="dashboardStore.searchPostTerm !== ''">
            <div v-if="dashboardStore.filteredAndSearchedPosts.length">
              <div v-for="(post, index) in dashboardStore.filteredAndSearchedPosts" :key="index">
                <post-grid-item :post-data="post"/>

              </div>
            </div>
            <div v-else>
              The word {{ dashboardStore.searchPostTerm }} you were looking for was not found in the data you filtered.
            </div>
          </div>
          <div v-else>
            Search from the data you filtered.
          </div>
        </div>

      </div>

    </div>
  </div>
</template>


<script>
import {useDashboardStore} from '~/stores/dashboard.js'
import SearchBar from "~/components/SearchBar.vue";
import PostGridItem from "~/components/PostGridItem.vue";

export default {
  components: {SearchBar, PostGridItem},
  setup(props, {emit}) {
    const dashboardStore = useDashboardStore();

    const onClose = () => {
      emit('close');
    };

    return {
      dashboardStore,
      onClose
    }
  },
};
</script>