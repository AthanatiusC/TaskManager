<template>
  <div class="row">
    <!-- Big Chart -->
    <div class="col-12">
      <card type="chart">
        <template slot="header">
          <div class="row">
            <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
              <h5 class="card-category">Total Task Done</h5>
              <h2 class="card-title">Performance This Week</h2>
            </div>
          </div>
        </template>
        <div class="chart-area">
          <line-chart
            style="height: 100%"
            ref="bigChart"
            :chart-data="bigLineChart.chartData"
            :gradient-colors="bigLineChart.gradientColors"
            :gradient-stops="bigLineChart.gradientStops"
            :extra-options="bigLineChart.extraOptions"
          >
          </line-chart>
        </div>
      </card>
    </div>
    <!-- TASK HERE -->
    <div class="col-lg-5" v-if="incompleteData">
      <card type="tasks" :header-classes="{ 'text-right': isRTL }">
        <template slot="header" class="d-inline">
          <h6 class="title d-inline">Current Tasks ({{incompleteData.length}})</h6>
          <p class="card-category d-inline">This Week</p>
          <base-button type="default" style="display:inline-block;float:right;" @click="modals.taskmodal = true">Add New Task</base-button>
        </template>
        <div class="table-full-width table-responsive">
          <task-list :data="incompleteData" :refresh="Refresh"></task-list>
        </div>
      </card>
    </div>

    <!-- STRIPPED TABLE HERE -->
    <div class="col-lg-7" v-if="completedData">
      <card card-body-classes="table-full-width">
        <div >
          <h4 slot="header" class="card-title" style="display:inline-block;">Completed Task</h4>
        </div>
        
        <el-table :data="completedData">
          <el-table-column
            min-width="150"
            sortable
            label="Name"
            property="name"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Time"
            property="time"
            :formatter="timeFormat"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Location"
            property="place"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            align="right"
            header-align="right"
            label="Status"
            property="status"
            :formatter="statusFormat"
          ></el-table-column>
          <el-table-column
            min-width="150"
            sortable
            label="Desc"
            property="description"
          ></el-table-column>
        </el-table>
        <!-- <template>
          <base-pagination type="success" :page-count="10" v-model="defaultPagination"></base-pagination>
        </template> -->
      </card>
    </div>
    <!-- MODAL -->
    <div>
      <modal :show.sync="modals.taskmodal" body-classes="p-0" modal-classes="modal-dialog-centered modal-sm">
          <card type="secondary"
                header-classes="bg-white pb-5"
                body-classes="px-lg-5 py-lg-5"
                class="border-0 mb-0">
              <template>
                  <div class="text-center text-muted mb-4">
                      <big>Create New Task</big>
                  </div>
                  <form role="form">
                    <base-input type="email" label="Task Name" v-model="task.name" placeholder="Enter Task Name"/>
                    <base-input>
                      <el-date-picker l-date-picker v-model="task.time" type="datetime" placeholder="Due time">
                      </el-date-picker>
                    </base-input>
                    <base-input type="text" label="Location" v-model="task.place" placeholder="1234 Main St"/>
                    <base-input label="Description">
                      <textarea class="form-control" v-model="task.description" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </base-input>
                    <!-- <base-input>
                      <base-checkbox v-model="important">Important</base-checkbox>
                    </base-input> -->
                    <base-button type="primary" @click="AddTask()">Create Task</base-button>
                  </form>
              </template>
          </card>
      </modal>
    </div>
  </div>
</template>
<script>
import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import TaskList from '@/components/Dashboard/TaskList';
import config from '@/config';
import {Modal} from '@/components'
import { Table, TableColumn } from 'element-ui';
import {DatePicker, TimeSelect} from 'element-ui'
import {BasePagination} from '@/components'

import TaskListVue from '~/components/Dashboard/TaskList.vue';

// let bigChartData = [
//   [this.completedData.length, 70, 90, 70, 85, 60, 75]
// ]
let bigChartLabels = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
let bigChartDatasetOptions = {
  fill: true,
  borderColor: config.colors.primary,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  pointBackgroundColor: config.colors.primary,
  pointBorderColor: 'rgba(255,255,255,0)',
  pointHoverBackgroundColor: config.colors.primary,
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
}

export default {
  name: 'dashboard',
  components: {
    BasePagination,
    LineChart,
    BarChart,
    TaskList,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Modal,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
  },data () {
    return {
      modals:{
        taskmodal:false,
      },
      taskData:undefined,
      completedData:[],
      incompleteData:[],
      task:{
        userid:this.$cookies.get("_id"),
        name:'',
        place:'',
        time: null,
        description:'',
        status:false
      },
      important:false,
      defaultPagination: 1,
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [{
            ...bigChartDatasetOptions,
          }],
          labels: bigChartLabels
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
    };
  },
  async fetch(){
    var id = this.$cookies.get("_id")
    var token = this.$cookies.get("token")
    this.$axios.setHeader("auth_key",token)
    this.$axios.setHeader("user_id",id)
    const data = await this.$axios.$get("/task/personal/"+id+"/").then((data)=>{
      this.taskData = data.data
      data.data.forEach(item => {
        if(item.status==true){
          this.completedData.push(item)
        }else{
          this.incompleteData.push(item)
        }
      });
      this.incompleteData.sort((a,b)=>{
        return new Date(b.time) - new Date(a.time);
      })
      this.completedData.sort((a,b)=>{
        return new Date(b.time) - new Date(a.time);
      })
    })
    
    // var groups = this.completedData.groupBy(this.completedData,function(d){
    //     console.log(moment(d.data_emissione).day())
    // });
  },
  computed: {
    enableRTL () {
      return this.$route.query.enableRTL;
    },
    isRTL () {
      return this.$rtl.isRTL;
    },  
    bigLineChartCategories () {
      return [{ name: 'Accounts', icon: 'tim-icons icon-single-02' }, {
        name: 'Purchases',
        icon: 'tim-icons icon-gift-2'
      }, { name: 'Sessions', icon: 'tim-icons icon-tap-02' }];
    }
  },
  methods: {
    initBigChart (index) {
      this.completedData.forEach(item => {
        console.log(this.$moment(item.time,"YYYY-MM-DD").format("MMM"))        
      });
      let chartData = {
        datasets: [{
          ...bigChartDatasetOptions,
          data: [1,3,3,2,1,0,4]
        }],
        labels: bigChartLabels
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },Refresh(){
      this.incompleteData.splice(0)
      this.completedData.splice(0)
      this.$fetch()
      // console.log("Refresh called")
    },async AddTask(){
      const res = await this.$axios.$post("task/",this.task)
      if(res.status){
        this.modals.taskmodal = false
        this.$notify({
          message:res.message,
          timeout: 3000,
          icon: 'tim-icons icon-bell-55',
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success"
        });
        this.Refresh()
      }
    },
    timeFormat(row,column){
      return this.$moment(row[column.property]).format("YYYY MMM DD")
    },
    statusFormat(row,column){
      if(row[column.property]){
        return "Completed"
      }
      return "Cancelled"
    }
  },
  mounted () {
    this.initBigChart(0);
  }
}
</script>
<style></style>
