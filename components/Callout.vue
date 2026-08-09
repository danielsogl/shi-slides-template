<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'info' | 'tip' | 'warn' | 'danger'
    title?: string
  }>(),
  { type: 'info' },
)

const META = {
  info: { color: 'var(--shi-info)', icon: 'i-carbon-information' },
  tip: { color: 'var(--shi-success)', icon: 'i-carbon-idea' },
  warn: { color: 'var(--shi-warn)', icon: 'i-carbon-warning' },
  danger: { color: 'var(--shi-danger)', icon: 'i-carbon-warning-alt' },
} as const

const meta = computed(() => META[props.type] ?? META.info)
</script>

<template>
  <div class="shi-callout" :style="{ '--shi-callout-color': meta.color }">
    <div class="shi-callout__icon" :class="meta.icon" />
    <div>
      <div v-if="title" class="shi-callout__title">{{ title }}</div>
      <div><slot /></div>
    </div>
  </div>
</template>
