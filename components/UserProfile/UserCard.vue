<template>
  <card class="card-user" v-if="userdata">
    <p class="card-text"></p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="javascript:void(0)">
        <img class="avatar" src="http://demos.creative-tim.com/nuxt-black-dashboard-pro/img/icon-nuxt.svg" alt="..." />
        <!-- <i class="avatar tim-icons icon-single-02"></i> -->
        <h5 class="title">{{userdata.firstname}} {{userdata.lastname}}</h5>
      </a>
      <p class="description">{{userdata.occupation}}</p>
    </div>
    <p></p>
    <div class="card-description text-center">
      {{userdata.about}}
    </div>
  </card>
</template>
<script>
export default {
  props:{
    userdata: Object,
  },
  mounted(){
  }
};
</script>
<style></style>
