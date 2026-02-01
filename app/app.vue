<template>
  <div class="app-root">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  meta: [
    { name: 'theme-color', content: '#0f0f12' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
  ],
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  background: #0f0f12;
  -webkit-tap-highlight-color: transparent;
}
.app-root {
  min-height: 100vh;
  min-height: 100dvh;
  background: #0f0f12;
}
</style>
