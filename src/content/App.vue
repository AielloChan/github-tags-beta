<template>
  <li id="app">
    <ActionButton/>
  </li>
</template>

<script>
import ActionButton from '@/components/ActionButton'

export default {
  name: 'App',
  components: {
    ActionButton
  }
}
</script>

<style>
.icon {
  width: 1rem;
  height: 1rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
