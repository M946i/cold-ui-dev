<template>
  <div class="host-history">
    <!-- 添加查询表单 -->
    <el-form inline class="demo-form-inline">
      <el-form-item label="ID">
        <el-input v-model="queryForm.id" placeholder="输入ID"></el-input>
      </el-form-item>
      <el-form-item label="主机ID">
        <el-input v-model="queryForm.host_id" placeholder="输入主机ID"></el-input>
      </el-form-item>
      <el-form-item label="企业编号">
        <el-input v-model="queryForm.company_number" placeholder="输入企业编号"></el-input>
      </el-form-item>
      <el-form-item label="库房编号">
        <el-input v-model="queryForm.warehouse_number" placeholder="输入库房编号"></el-input>
      </el-form-item>
      <el-form-item label="主机名称">
        <el-input v-model="queryForm.host_name" placeholder="输入主机名称"></el-input>
      </el-form-item>
      <el-form-item label="主机编号">
        <el-input v-model="queryForm.host_number" placeholder="输入主机编号"></el-input>
      </el-form-item>
      <el-form-item label="主机状态">
        <el-input v-model="queryForm.host_status" placeholder="输入主机状态"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="queryForm.create_time" placeholder="输入创建时间"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" color="#ffff00" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="host_id"
        label="主机ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="company_number"
        label="企业编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="warehouse_number"
        label="库房编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="host_name"
        label="主机名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="host_number"
        label="主机编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="host_status"
        label="主机状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template v-slot="{ row }">
          <el-button type="text" size="small" @click="showTempChart(row.host_number)">查看温度变化</el-button>
          <el-button type="text" size="small" @click="showHumidityChart(row.host_number)">查看湿度变化</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="温度折线图"
      :visible.sync="tempDialogVisible"
      width="70%">
      <TempChart :chartData="tempChartData" :currentHostNumber="currentHostNumber"/>
    </el-dialog>

    <el-dialog
      title="湿度折线图"
      :visible.sync="humidityDialogVisible"
      width="70%">
      <HumidityChart :chartData="humidityChartData" :currentHostNumber="currentHostNumber"/>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import TempChart from './TempChart.vue';
import HumidityChart from './HumidityChart.vue';

export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),  // 使用一个工厂函数返回默认值
    },
    // 其他的props...
  },
  data() {

    return {
      tableData: [],
      dialogVisible: false,
      form: {
        id: '',
        host_id: '',
        company_number: '',
        warehouse_number: '',
        host_name: '',
        host_number: '',
        host_status: '',
        create_time: ''
      },
      currentHostNumber:null,
      // 增加查询表单的数据
      queryForm: {
        id: '',
        host_id: '',
        company_number: '',
        warehouse_number: '',
        host_name: '',
        host_number: '',
        host_status: '',
        create_time: ''
      },
      tempDialogVisible: false,
      humidityDialogVisible: false,
      tempChartData: [],
      humidityChartData: [],
    };
  },

    components: {
      TempChart,
      HumidityChart,

  },
  methods: {
    async getList() {
      const response = await axios.get('http://127.0.0.1:8090/system/getHostHistoryLastDay',{
        headers:{
          'token':localStorage.getItem('token')
        }
      });
      this.tableData = response.data;
      this.rawData = response.data;
    },
    formatTime(timeStr) {
      const date = new Date(timeStr);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
    async showTempChart(hostNumber) {
      this.currentHostNumber = hostNumber;
      const response = await axios.get('http://127.0.0.1:8090/system/getMeterHistoryByHostNumber?host_number='+hostNumber,{
        headers:{
          'token':localStorage.getItem('token')
        }
      });
      this.tempChartData = response.data.map(item => ({
        time: this.formatTime(item.create_time),
        min: item.min_temperature,
        max: item.max_temperature,
        current: item.current_temperature,
      }));
      this.tempDialogVisible = true;
    },

    async showHumidityChart(hostNumber) {
      this.currentHostNumber = hostNumber;
      const response = await axios.get('http://127.0.0.1:8090/system/getMeterHistoryByHostNumber?host_number='+hostNumber,{headers:{
          'token':localStorage.getItem('token')
        }});
      this.humidityChartData = response.data.map(item => ({
        time: this.formatTime(item.create_time),
        min: item.min_humidity,
        max: item.max_humidity,
        current: item.current_humidity,
      }));
      this.humidityDialogVisible = true;
    },
    // 添加查询方法
    async handleSearch() {
      this.tableData = this.rawData.filter(item => {
        return (!this.queryForm.id || item.id.toString().includes(this.queryForm.id)) &&
          (!this.queryForm.host_id || item.host_id.toString().includes(this.queryForm.host_id)) &&
          (!this.queryForm.company_number || item.company_number.includes(this.queryForm.company_number)) &&
          (!this.queryForm.warehouse_number || item.warehouse_number.includes(this.queryForm.warehouse_number)) &&
          (!this.queryForm.host_name || item.host_name.includes(this.queryForm.host_name)) &&
          (!this.queryForm.host_number || item.host_number.includes(this.queryForm.host_number)) &&
          (!this.queryForm.host_status || item.host_status.includes(this.queryForm.host_status)) &&
          (!this.queryForm.create_time || item.create_time.includes(this.queryForm.create_time));
      });

    },
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped>
/* 这里你可以添加你的样式 */
.host-history {
  padding: 20px;
}
</style>
