<template>
  <div class="meter">
    <el-form inline class="demo-form-inline">
      <el-form-item label="ID">
        <el-input v-model="queryForm.id" placeholder="输入ID"></el-input>
      </el-form-item>
      <el-form-item label="企业编号">
        <el-input v-model="queryForm.company_number" placeholder="输入企业编号"></el-input>
      </el-form-item>
      <el-form-item label="库房编号">
        <el-input v-model="queryForm.warehouse_number" placeholder="输入库房编号"></el-input>
      </el-form-item>
      <el-form-item label="主机编号">
        <el-input v-model="queryForm.host_number" placeholder="输入主机编号"></el-input>
      </el-form-item>
      <el-form-item label="仪表编号">
        <el-input v-model="queryForm.meter_number" placeholder="输入仪表编号"></el-input>
      </el-form-item>
      <el-form-item label="温度下限">
        <el-input v-model="queryForm.min_temperature" placeholder="输入温度下限"></el-input>
      </el-form-item>
      <el-form-item label="温度上限">
        <el-input v-model="queryForm.max_temperature" placeholder="输入温度上限"></el-input>
      </el-form-item>
      <el-form-item label="湿度下限">
        <el-input v-model="queryForm.min_humidity" placeholder="输入湿度下限"></el-input>
      </el-form-item>
      <el-form-item label="湿度上限">
        <el-input v-model="queryForm.max_humidity" placeholder="输入湿度上限"></el-input>
      </el-form-item>
      <el-form-item label="仪表状态">
        <el-input v-model="queryForm.meter_status" placeholder="输入仪表状态"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="queryForm.create_time" placeholder="输入创建时间"></el-input>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-input v-model="queryForm.update_time" placeholder="输入更新时间"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" color="#ffff00" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" color="#ffff00" @click="handleAdd">添加仪表</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="company_number" label="企业编号" width="180"></el-table-column>
      <el-table-column prop="warehouse_number" label="库房编号" width="180"></el-table-column>
      <el-table-column prop="host_number" label="主机编号" width="180"></el-table-column>
      <el-table-column prop="meter_number" label="仪表编号" width="180"></el-table-column>
      <el-table-column prop="min_temperature" label="温度下限" width="180"></el-table-column>
      <el-table-column prop="max_temperature" label="温度上限" width="180"></el-table-column>
      <el-table-column prop="min_humidity" label="湿度下限" width="180"></el-table-column>
      <el-table-column prop="max_humidity" label="湿度上限" width="180"></el-table-column>
      <el-table-column prop="meter_status" label="仪表状态" width="180"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="ID">
          <el-input v-model="form.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="企业编号">
          <el-input v-model="form.company_number"></el-input>
        </el-form-item>
        <el-form-item label="库房编号">
          <el-input v-model="form.warehouse_number"></el-input>
        </el-form-item>
        <el-form-item label="主机编号">
          <el-input v-model="form.host_number"></el-input>
        </el-form-item>
        <el-form-item label="仪表编号">
          <el-input v-model="form.meter_number"></el-input>
        </el-form-item>
        <el-form-item label="温度下限">
          <el-input v-model="form.min_temperature"></el-input>
        </el-form-item>
        <el-form-item label="温度上限">
          <el-input v-model="form.max_temperature"></el-input>
        </el-form-item>
        <el-form-item label="湿度下限">
          <el-input v-model="form.min_humidity"></el-input>
        </el-form-item>
        <el-form-item label="湿度上限">
          <el-input v-model="form.max_humidity"></el-input>
        </el-form-item>
        <el-form-item label="仪表状态">
          <el-input v-model="form.meter_status"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.create_time" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="form.update_time" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {getMeterList, addMeter, putMeter, delMeter} from '@/api/admin'

export default {
  data() {
    return {
      rawData: [],
      tableData: [],
      dialogVisible: false,
      queryForm: {
        id: '',
        company_number: '',
        warehouse_number: '',
        host_number: '',
        meter_number: '',
        min_temperature: '',
        max_temperature: '',
        min_humidity: '',
        max_humidity: '',
        meter_status: '',
        create_time: '',
        update_time: ''
      },
      form: {
        id: '',
        company_number: '',
        warehouse_number: '',
        host_number: '',
        meter_number: '',
        min_temperature: '',
        max_temperature: '',
        min_humidity: '',
        max_humidity: '',
        meter_status: '',
        create_time: '',
        update_time: ''
      }
    };
  },
  methods: {

    handleAdd() {
      this.form = {
        id: '',
        company_number: '',
        warehouse_number: '',
        host_number: '',
        meter_number: '',
        min_temperature: '',
        max_temperature: '',
        min_humidity: '',
        max_humidity: '',
        meter_status: '',
        create_time: '',
        update_time: ''
      };
      this.dialogVisible = true;
    },

    async handleEdit(index, row) {
      this.form = Object.assign({}, row);
      this.dialogVisible = true;
    },
    async handleDelete(index, row) {
      const response = await delMeter({meter_number: row.meter_number}); // 只发送仪表ID
      if (response.data.status === "ok") {
        await this.getList(); // 重新获取列表
      } else {
        this.$message.error('删除失败');
      }
    },
    handleClose(done) {
      done();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let response;
          if (this.form.id) {
            response = await putMeter(this.form);
          } else {
            response = await addMeter(this.form);
          }
          if (response.data.status === 'ok') {
            this.dialogVisible = false;
            await this.getList();
          } else {
            this.$message.error(response.data.message); // 使用API返回的消息
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async handleSearch() {
      this.tableData = this.rawData.filter(item => {
        return (!this.queryForm.id || (item.id && item.id.toString().includes(this.queryForm.id))) &&
          (!this.queryForm.company_number || (item.company_number && item.company_number.toString().includes(this.queryForm.company_number))) &&
          (!this.queryForm.warehouse_number || (item.warehouse_number && item.warehouse_number.toString().includes(this.queryForm.warehouse_number))) &&
          (!this.queryForm.host_number || (item.host_number && item.host_number.toString().includes(this.queryForm.host_number))) &&
          (!this.queryForm.meter_number || (item.meter_number && item.meter_number.toString().includes(this.queryForm.meter_number))) &&
          (!this.queryForm.min_temperature || (item.min_temperature && item.min_temperature.toString().includes(this.queryForm.min_temperature))) &&
          (!this.queryForm.max_temperature || (item.max_temperature && item.max_temperature.toString().includes(this.queryForm.max_temperature))) &&
          (!this.queryForm.min_humidity || (item.min_humidity && item.min_humidity.toString().includes(this.queryForm.min_humidity))) &&
          (!this.queryForm.max_humidity || (item.max_humidity && item.max_humidity.toString().includes(this.queryForm.max_humidity))) &&
          (!this.queryForm.meter_status || (item.meter_status && item.meter_status.toString().includes(this.queryForm.meter_status))) &&
          (!this.queryForm.create_time || (item.create_time && item.create_time.toString().includes(this.queryForm.create_time))) &&
          (!this.queryForm.update_time || (item.update_time && item.update_time.toString().includes(this.queryForm.update_time)))
      });
    },
    async getList() {
      const response = await getMeterList();
      this.tableData = response.data;
      this.rawData = response.data;
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style>
.meter {
  padding: 20px;
}
</style>
