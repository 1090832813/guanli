<template>
  <div id="ma">
    <div class="user"><user></user></div>
    <div class="money"><money></money></div>
  </div>
</template>

<script>
import user from "./user.vue";
import money from "./money.vue";
export default {
  components: {
    user,
    money,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scope>
#ma {
  width: 100%;
  height: 500px;
  display: flex;
}
.user,
.money {
  width: 45%;
  display: block;
}
.money {
  /* float:right; */
}
</style>