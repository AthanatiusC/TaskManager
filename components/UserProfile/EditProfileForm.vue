<template>
  <card v-if="userdata">
    <h5 slot="header" class="title">Edit Profile</h5>
    <form @submit.prevent="updateProfile">
      <div class="row">
        <div class="col-md-12">
          <base-input
            type="text"
            label="Username"
            placeholder="Username"
            v-model="userdata.username"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input
            type="text"
            label="First Name"
            placeholder="First Name"
            v-model="userdata.firstname"
          >
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input
            type="text"
            label="Last Name"
            placeholder="Last Name"
            v-model="userdata.lastname"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input
            type="text"
            label="Address"
            placeholder="Home Address"
            v-model="userdata.address"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <base-input
            label="Postal Code"
            placeholder="ZIP Code"
            v-model="userdata.zip"
          >
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input
            type="text"
            label="Occupation"
            placeholder="Occupation"
            v-model="userdata.occupation"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <base-input label="About Me">
            <textarea
              class="form-control"
              placeholder="About me"
              v-model="userdata.about"
            >
            </textarea>
          </base-input>
        </div>
      </div>

      <base-button native-type="submit" type="primary" class="btn-fill">
        Save
      </base-button>
    </form>
  </card>
</template>
<script>
export default {
  props:{
    userdata:Object,
    refresh:Function
  },
  data() {
    return {
    };
  },
  methods: {
    async updateProfile() {
      const data = await this.$axios.$put("/user/"+this.userdata.id,this.userdata)
      if(data.status){
        this.$notify({
          message:data.message,
          timeout: 3000,
          icon: 'tim-icons icon-bell-55',
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success"
        });
        if(this.refresh){
          this.refresh()
        }
      }
    }
  }
};
</script>
<style></style>
