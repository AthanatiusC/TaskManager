<template>
  <base-table :data="tableData" thead-classes="text-primary">
    <!-- <template v-if="$moment(row.time).isAfter($moment())" slot-scope="{ row }"> -->
    <template  slot-scope="{ row }">
    <td>
      <p class="title">{{ row.name }}</p>
      <b><h5>{{$moment(row.time).fromNow()}}</h5></b>
      <p class="text-muted">{{ row.description }}</p>
    </td>
    <td class="td-actions">
      <el-tooltip content="Cancel task" effect="light" :open-delay="300" placement="top">
        <base-button type="link" @click="DeleteTask(row.id)">
          <i class="tim-icons icon-simple-remove"></i>
        </base-button>
      </el-tooltip>
    </td>
    <td class="td-actions">
      <el-tooltip content="Edit task" effect="light" :open-delay="300" placement="top">
        <base-button type="link">
          <i class="tim-icons icon-pencil"></i>
        </base-button>
      </el-tooltip>
    </td>
    <td class="td-actions">
      <el-tooltip content="Complete task" effect="light" :open-delay="300" placement="top">
        <base-button type="link">
          <i class="tim-icons icon-check-2"></i>
        </base-button>
      </el-tooltip>
    </td>
    

    </template>
  </base-table>
</template>
<script>
import { BaseTable } from '@/components';
export default {
  components: {
    BaseTable
  },
  data() {
    return {
      tableData:[],
      currentTime:undefined,
    };
  },
  async fetch(){
    const data = await this.$axios.$get("/task/personal/5fc3dd87caf4ad4491cafe2f")
    data.data.forEach(item => {
      if(!item.status){
        this.tableData.push(item)
      }
      this.tableData.sort((a,b)=>{
        b.time - a.time
      })
    });
  },
  methods:{
    async DeleteTask(id){
      const data = await this.$axios.$get("/task/delete/"+id)
    }
  }
};
</script>
<style></style>
