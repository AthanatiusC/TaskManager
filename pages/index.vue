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
    <div class="col-lg-5">
      <card type="tasks" :header-classes="{ 'text-right': isRTL }">
        <template slot="header" class="d-inline">
          <h6 class="title d-inline">Tasks (5)</h6>
          <p class="card-category d-inline">Today</p>
          <base-button type="default" style="display:inline-block;float:right;" @click="modals.taskmodal = true">Add New Task</base-button>
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
                          <base-input type="email" label="Task Name" v-model="name" placeholder="Enter Task Name"/>
                          <div class="form-row">
                            <base-input class="col-md-6">
                              <el-date-picker l-date-picker v-model="startpicker" type="datetime" placeholder="Start">
                              </el-date-picker>
                            </base-input>
                            <base-input class="col-md-6">
                              <el-date-picker l-date-picker v-model="endpicker" type="datetime" placeholder="End">
                              </el-date-picker>
                            </base-input>
                          </div>
                          <base-input type="text" label="Location" v-model="place" placeholder="1234 Main St"/>
                          <base-input label="Description">
                            <textarea class="form-control" v-model="description" id="exampleFormControlTextarea1" rows="3"></textarea>
                          </base-input>
                          <base-input>
                            <base-checkbox v-model="important">Important</base-checkbox>
                          </base-input>
                          <base-button type="primary" @click="AddTask()">Create Task</base-button>
                        </form>
                    </template>
                </card>
            </modal>
          </div>
        </template>
        <div class="table-full-width table-responsive">
          <task-list></task-list>
        </div>
      </card>
    </div>

    <!-- STRIPPED TABLE HERE -->
    <div class="col-lg-7">
      <card card-body-classes="table-full-width">
        <div >
          <h4 slot="header" class="card-title" style="display:inline-block;">Task List</h4>
        </div>
        
        <el-table :data="TaskData">
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
          ></el-table-column>
        </el-table>
      </card>
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

let bigChartData = [
  [100, 70, 90, 70, 85, 60, 75]
]
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
    LineChart,
    BarChart,
    TaskList,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Modal,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
  },
  data () {
    return {
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [{
            ...bigChartDatasetOptions,
            data: bigChartData[0]
          }],
          labels: bigChartLabels
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
      modals:{
        taskmodal:false,
      },
      name:'',
      place:'',
      startpicker: '',
      endpicker: '',
      description:'',
      important:false
    };
  },
  computed: {
    TaskData(){
      console.log(this.$cookies.get('TaskData'))
      return this.$cookies.get('TaskData')
    },
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
      let chartData = {
        datasets: [{
          ...bigChartDatasetOptions,
          data: bigChartData[index]
        }],
        labels: bigChartLabels
      };
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
    AddTask(){
      this.$cookies.parseJSON = false
      var old=this.$cookies.get("TaskData")
      // if(old==undefined){
      //   const obj = [{
      //     id: 1,
      //     name: this.name,
      //     time: this.startpicker,
      //     due:this.endpicker,
      //     place: this.place,
      //     description:this.description,
      //     important:this.important,
      //     status:true
      //   },]
      //   this.$cookies.set('TaskData', obj, {
      //     path: '/',
      //     maxAge: 60 * 60 * 24 * 7
      //   })  
      // }else{
      //   DATA.push({
      //     id: 1,
      //     name: this.name,
      //     time: this.startpicker,
      //     due:this.endpicker,
      //     place: this.place,
      //     description:this.description,
      //     important:this.important,
      //     status:true
      //   })
      //   this.$cookies.set('TaskData', old, {
      //     path: '/',
      //     maxAge: 60 * 60 * 24 * 7
      //   })  
      // }
      
    }
  },
  mounted () {
    this.initBigChart(0);
  }
}
</script>
<style></style>
