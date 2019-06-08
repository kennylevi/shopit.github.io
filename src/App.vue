<template>
  <div id="app">
    <Header/>
    <main>
      <!-- <router-view></router-view> -->
    </main>
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";

export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
  @import "./style";
</style>
