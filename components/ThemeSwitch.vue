<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'light'
  },
  set () {
    colorMode.preference = colorMode.value === 'light' ? 'light' : 'light'
  }
})
</script>
<template>
  <ClientOnly>
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>