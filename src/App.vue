<script setup>
import AppFooter from './components/AppFooter.vue';
import AppTopBar from './components/AppTopBar.vue';
</script>

<template>
  <div
    class="bg-surface-50 dark:bg-surface-950 min-h-screen p-2 flex flex-col gap-6"
  >
    <AppTopBar />
    <div class="flex flex-col w-full max-w-7xl mx-auto gap-6 flex-1">
      <div class="grid grid-cols-1 gap-6">
        <RouterView />
      </div>
    </div>
    <AppFooter />
  </div>
</template>
