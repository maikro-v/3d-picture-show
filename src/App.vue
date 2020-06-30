<template>
  <div id="app">
    <v-audio :src="require('@/assets/audio/mp3.mp3')" autoplay preload loop />
    <router-view />
  </div>
</template>

<script>
import vAudio from '@/components/v-audio'
export default {
  components: { vAudio }
}
</script>
