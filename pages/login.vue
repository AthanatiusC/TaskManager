<template>
  <div style="width:100%;height:100vh">
    <card class="center">
      <h3 class="card-title text-center">Login</h3>
      <form @submit.prevent="userLogin" class="container">
          <base-input v-model="login.username" type="username" label="Username" placeholder="Username"/>
          <base-input v-model="login.password" type="password" label="Password" placeholder="Password"/>
          <div class="text-center">
            <p class="h5"><n-link to="/register">I don't have an account!</n-link></p>
            <base-button type="primary" native-type="submit">Login</base-button>
          </div>
      </form>
    </card>
  </div>
</template>

<script>
export default {
  components: {
  },
  fetch(){
  },
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    notifyVue(message,verticalAlign, horizontalAlign,type) {
      let color = Math.floor(Math.random() * 4 + 1);
      this.$notify({
        message:
          message,
        timeout: 3000,
        icon: 'tim-icons icon-bell-55',
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: type
      });
    },
    async userLogin() {
      if(this.login.username && this.login.password){
        const response = await this.$axios.post("user/auth/",this.login ).then(
          (response)=>{
              this.$cookies.set("loggedIn",true)
              this.$cookies.set("_id",response.data.data.id)
              this.$cookies.set("token",response.data.data.token)
              this.notifyVue("Login Success","top","center","success")
              window.location.replace('/')
          }
        ).catch((err)=>{
          if(err.response){
            this.notifyVue("Incorrect username or password!","top","center","danger")
          }
        })
      }else{
        this.notifyVue("Username and password cannot be empty!","top","center","danger")
      }
    }
  }
}
</script>
<style>
.center{
  width:30%;
  top:15%;
  display:inline-block;
  margin: auto;
  padding: 10px;
}
/* .center-register{
  width:30%;
  top:10%;
  display:inline-block;
  margin: auto;
  padding: 10px;
} */
</style>