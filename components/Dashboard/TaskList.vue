<template>
  <base-table :data="tableData" thead-classes="text-primary">
    <template slot-scope="{ row }">
    <td>
      <p class="title">{{row.time}} - {{ row.name }}</p>
      <p class="text-muted">{{ row.description }}</p>
    </td>
    <td class="td-actions">
      <el-tooltip content="Cancel task" effect="light" :open-delay="300" placement="top">
        <base-button type="link">
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
      tableData: [
        {
          id: 1,
          name: 'Buying Vegetables',
          description:"Lorem ipsum dolor sit amet",
          time: '08:30 PM',
          place: 'Pasar Induk',
          status:true
        },
        {
          id: 1,
          name: 'Meeting',
          time: '12:00 PM',
          description:"Lorem ipsum dolor sit amet",
          place: 'Workplace Floor 1',
          status:false
        },
      ]
    };
  }
};
</script>
<style></style>
