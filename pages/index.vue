<template>
  <div class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 relative h-screen">
    <div class="container px-6 py-8 mx-auto">

      <div class="sm:flex sm:items-center sm:justify-between">
        <div>
          <div class="flex items-center gap-x-3">
            <h2 class="text-3xl font-medium text-gray-800">Top Posts</h2>

          </div>

          <p class="mt-1 text-sm text-gray-500">See social media posts by typing a hashtag or word in the search
            box.</p>
        </div>

        <search-bar searchKey="getPostFromApi" v-if="dashboard.haveData"/>

      </div>

      <toggle-filter-view/>

      <div class="border border-gray-200 rounded-lg bg-white my-3">
        <div v-if="dashboard.haveData" class="min-h-[200px] max-h-1/2 overflow-y-auto">
          <post-list v-if="dashboard.isListType"/>
          <post-grid v-else/>
          <div v-if="dashboard.loading"
               class="flex flex-col justify-center items-center fixed top-0 left-0 w-full h-screen bg-white bg-opacity-60 z-50">
            <i class="fas fa-circle-notch fa-spin text-4xl"></i>
            <p class="pointer-events-auto">Searching posts...</p>
          </div>
        </div>

        <div v-else class="flex flex-col justify-center items-center w-full min-h-[200px] max-h-[600px]">
          <div v-if="dashboard.loading === true" class="flex flex-col justify-center items-center space-y-2">
            <i class="fas fa-circle-notch fa-spin text-4xl"></i>
            <p>Searching posts...</p>
          </div>
          <p v-else>
            <search-bar searchKey="getPostFromApi"/>
          </p>
        </div>

      </div>

      <post-bottom-detail v-if="dashboard.haveData"/>

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

const dashboard = useDashboardStore();
</script>