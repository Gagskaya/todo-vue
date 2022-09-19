<template>
  <div :class="$style.container">
    <div :class="$style.main">
      <sidebar />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from './components/MainSidebar.vue';

export default {
  components: { Sidebar },
};
</script>

<style lang="scss" module>
body {
  font-family: 'Roboto', sans-serif;
  font-weight: normal;
}
* {
  outline: none;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
h3 {
  font-weight: normal;
}
.container {
  width: 1140px;
  margin: 0 auto;
}
.main {
  width: 750px;
  height: 750px;
  display: flex;
}
</style>
