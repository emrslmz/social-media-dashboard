<template>
  <canvas ref="chartCanvas" width="600" height="300"></canvas>
</template>

<script setup>
import { ref, watch, onMounted, defineProps } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps({
  labels: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const chartCanvas = ref(null);
let chartInstance = null;

onMounted(() => {
  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: props.labels,
      datasets: [
        {
          label: props.title,
          data: props.data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        },
        title: {
          display: true,
          text: props.title
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Count'
          }
        }
      }
    }
  });
});

watch([() => props.labels, () => props.data], () => {
  chartInstance.data.labels = props.labels;
  chartInstance.data.datasets[0].data = props.data;
  chartInstance.update();
});

</script>
