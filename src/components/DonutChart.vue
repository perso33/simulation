<template>
  <div class="card">
    <h3 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{{ title }}</h3>
    <div class="relative h-64">
      <Doughnut
        :data="chartData"
        :options="chartOptions"
        class="max-h-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  title: string
  data: Array<{ label: string; value: number; color: string }>
}

const props = defineProps<Props>()

const chartData = computed(() => ({
  labels: props.data.map(d => d.label),
  datasets: [
    {
      data: props.data.map(d => d.value),
      backgroundColor: props.data.map(d => d.color),
      borderWidth: 2,
      borderColor: '#ffffff'
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 20,
        usePointStyle: true
      }
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const label = context.label || ''
          const value = context.raw || 0
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = ((value / total) * 100).toFixed(1)
          return `${label}: ${value} (${percentage}%)`
        }
      }
    }
  }
}
</script>
