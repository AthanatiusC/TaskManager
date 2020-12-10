<template>
  <base-table :data="data" thead-classes="text-primary">
    <!-- <template v-if="$moment(row.time).isAfter($moment())" slot-scope="{ row }"> -->
    <template  slot-scope="{ row }">
      <td>
        <p class="title">{{ row.name }}</p>
        <h5 style="color:#fd5d93" v-if="$moment(row.time).isBefore($moment())">Late : {{$moment(row.time).fromNow()}}</h5>
        <h5 v-if="$moment(row.time).isAfter($moment())">due {{$moment(row.time).fromNow()}}</h5>
        <p class="text-muted">{{ row.description }}</p>
      </td>
      <td class="td-actions">
        <el-tooltip content="Delete task" effect="light" :open-delay="300" placement="top">
          <base-button type="link" @click="DeleteTask(row.id)">
            <i class="tim-icons icon-trash-simple"></i>
          </base-button>
        </el-tooltip>
      </td>
      <td class="td-actions">
        <el-tooltip content="Edit task" effect="light" :open-delay="300" placement="top">
          <base-button type="link" @click="modals.taskmodal = true;GetItem(row.id,row.name,row.time,row.place,row.description)">
            <i class="tim-icons icon-pencil"></i>
          </base-button>
        </el-tooltip>
      </td>
      <td class="td-actions">
        <el-tooltip content="Complete task" effect="light" :open-delay="300" placement="top">
          <base-button type="link" @click="CompleteTask(row.id,row.name,row.time,row.place,row.description)">
            <i class="tim-icons icon-check-2"></i>
          </base-button>
        </el-tooltip>
      </td>
      <div>
        <modal :show.sync="modals.taskmodal" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm">
            <card type="secondary"
                  header-classes="bg-white pb-5"
                  body-classes="px-lg-5 py-lg-5"
                  class="border-0 mb-0">
                <template>
                    <div class="text-center text-muted mb-4">
                        <big>Update Task</big>
                    </div>
                    <form role="form">
                      <base-input type="email" label="Task Name" v-model="task.name" placeholder="Enter Task Name"/>
                      <base-input>
                        <el-date-picker l-date-picker v-model="task.time" type="datetime" placeholder="Due time">
                        </el-date-picker>
                      </base-input>
                      <base-input type="text" label="Location" v-model="task.place" placeholder="1234 Main St"/>
                      <base-input label="Description">
                        <textarea class="form-control" v-model="task.description" rows="3"></textarea>
                      </base-input>
                      <!-- <base-input>
                        <base-checkbox v-model="important">Important</base-checkbox>
                      </base-input> -->
                      <base-button type="primary" @click="UpdateTask(row.id)">Update</base-button>
                    </form>
                </template>
            </card>
        </modal>
      </div>
    </template>
  </base-table>
</template>
<script>
import { BaseTable } from '@/components';
import { dashboard } from '@/pages/index';
import { Modal } from '@/components'
import {DatePicker, TimeSelect} from 'element-ui'


export default {
  parent:dashboard,
  props:{
    data:null,
    refresh:Function
  },
  components: {
    BaseTable,
    Modal,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
  },
  data() {
    return {
      currentTime:undefined,
      modals:{
        taskmodal:false,
      },
      task:{
        userid:this.$cookies.get("_id"),
        name:'',
        place:'',
        time: null,
        description:'',
        status:false
      },
    };
  },
  methods:{
    async DeleteTask(id){
      const data = await this.$axios.$get("/task/delete/"+id+"/")
      if(data.status){
        this.modals.taskmodal = false
        this.$notify({
          message:data.message,
          timeout: 3000,
          icon: 'tim-icons icon-bell-55',
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success"
        });
        this.refresh()
      }
    },
    async CompleteTask(id,name,time,place,description){
      const data = await this.$axios.$post("/task/update/",{"id":id,userid:this.$cookies.get("_id"),"name":name,"time":time,"place":place,"description":description,status:true})
      if(data.status){
        this.modals.taskmodal = false
        this.$notify({
          message:data.message,
          timeout: 3000,
          icon: 'tim-icons icon-bell-55',
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success"
        });
        this.refresh()
      }
    },
    async UpdateTask(id){
      const data = await this.$axios.$post("/task/update/",
      {
        "id":id,
        userid:this.$cookies.get("_id"),
        "name":this.task.name,
        "time":this.task.time,
        "place":this.task.place,
        "description":this.task.description,
        status:false})
      if(data.status){
        this.modals.taskmodal = false
        this.$notify({
          message:data.message,
          timeout: 3000,
          icon: 'tim-icons icon-bell-55',
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success"
        });
        this.refresh()
      }
    },
    async GetItem(id,name,time,place,description){
      this.task.userid=this.$cookies.get(id)
      this.task.name=name
      this.task.place=place
      this.task.time= time
      this.task.description=description
      this.task.status=status
    },
  }
};
</script>
<style></style>
