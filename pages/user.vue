<template>
  <div class="row">
    <div class="col-md-8"><edit-profile-form :userdata="user" :refresh="Refresh"></edit-profile-form></div>
    <div class="col-md-4"><user-card :userdata="user"> </user-card></div>
  </div>
</template>
<script>
import EditProfileForm from '../components/UserProfile/EditProfileForm.vue';
import UserCard from '../components/UserProfile/UserCard.vue';

export default {
  name: 'user',
  components: {
    EditProfileForm,
    UserCard
  },
  data(){
    return{
      user: null
    }
  },
  async fetch(){
    var id = this.$cookies.get("_id")
    var token = this.$cookies.get("token")
    this.$axios.setHeader("auth_key",token)
    this.$axios.setHeader("user_id",id)
    const data = await this.$axios.$get("/user/"+id)
    // console.log(data.data)
    this.user = data.data
  },
  methods:{
    Refresh(){
      this.user = null
      this.$fetch()
    },
  }
};
</script>
<style></style>
