<template>
  <div class="flex flex-col justify-center space-y-20 items-center p-5">
    <div v-if="dashboardStore.haveData" class="flex flex-col justify-center space-y-20 items-center p-5">
      <div class="flex flex-col justify-center space-y-4 items-center">
        <p class="text-2xl font-bold">Posts Over Time</p>
        <PostChart
            :labels="postCounts.postDates"
            :data="postCounts.postCounts"
            title="Number of Posts Over Time"
        />
      </div>

      <div class="flex flex-col justify-center space-y-4 items-center">
        <p class="text-2xl font-bold">Likes Over Time</p>
        <PostChart
            :labels="likeCounts.likeDates"
            :data="likeCounts.likeCounts"
            title="Total Likes Over Time"
        />
      </div>
    </div>
    <div v-else class="text-center">
      <p>You must search to see the charts.</p>

      <nuxt-link to="/dashboard" class="text-indigo-500 focus:outline-none">
        Go to Dashboard page for search
      </nuxt-link>

    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useDashboardStore} from '@/stores/dashboard';
import PostChart from '@/components/PostChart.vue';

const dashboardStore = useDashboardStore();

const postCounts = computed(() => {
  const counts = [];
  const dates = [];

  dashboardStore.posts.forEach(post => {
    const date = new Date(post.postDetail.date).toLocaleDateString();
    const index = dates.indexOf(date);

    if (index > -1) {
      counts[index]++;
    } else {
      dates.push(date);
      counts.push(1);
    }
  });

  return {
    postCounts: counts,
    postDates: dates
  };
});

// compute data for likes
const likeCounts = computed(() => {
  const counts = [];
  const likeDates = [];

  dashboardStore.posts.forEach(post => {
    const date = new Date(post.postDetail.date).toLocaleDateString();
    const index = likeDates.indexOf(date);

    if (index > -1) {
      counts[index] += post.postDetail.likes;
    } else {
      likeDates.push(date);
      counts.push(post.postDetail.likes);
    }
  });

  return {
    likeCounts: counts,
    likeDates: likeDates
  };
});
</script>