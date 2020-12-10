<template>
  <div style="width:100%;height:100vh">
    <card class="center">
      <h3 class="card-title text-center">Register</h3>
      <form @submit.prevent="userCreate" class="container">
        <base-input v-model="register.username" type="username" label="Username" placeholder="Username"/>
        <base-input v-model="register.password" type="password" label="Password" placeholder="Password"/>
        <div class="form-row">
            <base-input v-model="register.firstname" class="col-md-6" type="text" label="First name" placeholder="First name"/>
            <base-input v-model="register.lastname" class="col-md-6" type="text" label="Last name" placeholder="Last name"/>
        </div>
        <div class="form-row">
            <base-input v-model="register.address" class="col-md-8" type="text" label="Address" placeholder="1234 Main St"/>
            <base-input v-model="register.zip" class="col-md-4" label="Zip" placeholder="Zip"/>
        </div>
        <base-input v-model="register.occupation" label="Occupation" placeholder="Occupation"/>
        <base-input label="About me">
            <textarea v-model="register.about" class="form-control" placeholder="Tell us a bit about yourself!" rows="3"></textarea>
        </base-input>
        <div class="text-center">
            <p class="h5"><n-link to="/login">I have an account</n-link></p>
            <base-button type="primary" native-type="submit">Create Account!</base-button>
        </div>
      </form>
    </card>
  </div>
</template>

<script>
export default {
  middleware:false,
  components: {
  },
  fetch(){
  },
  data() {
    return {
      register: {
        username: '',
        password: '',
        occupation:'',
        firstname:'',
        lastname:'',
        address:'',
        zip:'',
        about:''
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
    async userCreate() {
      var reg = this.register
      if(reg.username && reg.password && reg.occupation && reg.firstname && reg.lastname && reg.address && reg.address && reg.zip && reg.about){
        const response = await this.$axios.post("/user/",this.register ).then(
            (response)=>{
                this.$cookies.set("loggedIn",true)
                this.$cookies.set("_id",response.data.data.id)
                this.$cookies.set("token",response.data.data.token)
                this.notifyVue("Register Success","top","center","success")
                window.location.replace('/')
            }
        ).catch((err)=>{
          if(err.response){
            this.notifyVue(err.response.data.message,"top","center","danger")
          }
        })
      }else{
          this.notifyVue("Please fill all the forms!","top","center","danger")
      }
    }
  }
}
</script>
<style>
/* .center-register{
  width:30%;
  top:20%;
  display:inline-block;
  margin: auto;
  padding: 10px;
} */
</style>