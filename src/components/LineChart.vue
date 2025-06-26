<template>
  <div class="card">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{{ title }}</h3>
    <div class="relative h-64">
      <Line
        :data="chartData"
        :options="chartOptions"
        class="max-h-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface Props {
  title: string
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    color: string
  }>
}

const props = defineProps<Props>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map(dataset => ({
    label: dataset.label,
    data: dataset.data,
    borderColor: dataset.color,
    backgroundColor: dataset.color + '20',
    borderWidth: 2,
    fill: true,
    tension: 0.4
  }))
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    }
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false
  }
}
</script>
