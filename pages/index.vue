<template>
  <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 relative">
    <div class="p-5 mx-auto h-full">
      <div class="flex flex-col">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div>
            <div class="flex items-center gap-x-3">
              <h2 class="text-3xl font-medium text-gray-800">Top Posts</h2>

            </div>

            <p class="mt-1 text-xs text-gray-500">See their posts by typing a hashtag into the search</p>
          </div>

          <search-bar searchKey="getPostFromApi" v-if="dashboardStore.haveData"/>
        </div>

        <toggle-filter-view/>
      </div>

      <div>
        <div class="border border-gray-200 rounded-lg bg-white my-3">
          <div v-if="dashboardStore.haveData" class="min-h-[100px] max-h-[500px] overflow-y-auto">
            <post-list v-if="dashboardStore.isListType"/>
            <post-grid v-else/>
            <div v-if="dashboardStore.loading"
                 class="flex flex-col justify-center items-center fixed top-0 left-0 w-full h-screen bg-white bg-opacity-60 z-50">
              <i class="fas fa-circle-notch fa-spin text-4xl"></i>
              <p class="pointer-events-auto">Searching posts...</p>
            </div>
          </div>

          <div v-else class="flex flex-col justify-center items-center w-full min-h-[200px] max-h-[600px]">
            <div v-if="dashboardStore.loading === true" class="flex flex-col justify-center items-center space-y-2">
              <i class="fas fa-circle-notch fa-spin text-4xl"></i>
              <p>Searching posts...</p>
            </div>
            <p v-else>
              <search-bar searchKey="getPostFromApi"/>
            </p>
          </div>

        </div>

        <post-bottom-detail v-if="dashboardStore.haveData"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import SearchBar from "~/components/SearchBar.vue";
import {useDashboardStore} from "~/stores/dashboard.js";
import PostList from "~/components/PostList.vue";
import PostGrid from "~/components/PostGrid.vue";
import ToggleFilterView from "~/components/ToggleFilterView.vue";
import PostBottomDetail from "~/components/PostBottomDetail.vue";

const dashboardStore = useDashboardStore();
</script>