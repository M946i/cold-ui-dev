<template>
  <div class="warehouse">
    <el-form inline class="demo-form-inline">
      <el-form-item label="ID">
        <el-input v-model="queryForm.id" placeholder="输入ID"></el-input>
      </el-form-item>
      <el-form-item label="企业编号">
        <el-input v-model="queryForm.company_number" placeholder="输入企业编号"></el-input>
      </el-form-item>
      <el-form-item label="库房名">
        <el-input v-model="queryForm.warehouse_name" placeholder="输入库房名"></el-input>
        </el-form-item>
      <el-form-item label="库房编号">
        <el-input v-model="queryForm.warehouse_number" placeholder="输入库房编号"></el-input>
        </el-form-item>
      <el-form-item label="库房负责人姓名">
        <el-input v-model="queryForm.warehouse_manager_name" placeholder="输入库房负责人姓名"></el-input>
        </el-form-item>
      <el-form-item label="库房负责人电话">
        <el-input v-model="queryForm.warehouse_manager_phone" placeholder="输入库房负责人电话"></el-input>
        </el-form-item>
      <el-form-item label="库房大小">
        <el-input v-model="queryForm.warehouse_size" placeholder="输入库房大小"></el-input>
        </el-form-item>
      <el-form-item label="库房地址">
        <el-input v-model="queryForm.warehouse_address" placeholder="输入库房地址"></el-input>
        </el-form-item>
      <el-form-item label="库房类型">
        <el-input v-model="queryForm.warehouse_type" placeholder="输入库房类型"></el-input>
        </el-form-item>
      <el-form-item label="库房状态">
        <el-input v-model="queryForm.warehouse_status" placeholder="输入库房状态"></el-input>
        </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="queryForm.latitude" placeholder="输入纬度"></el-input>
        </el-form-item>
      <el-form-item label="经度">
        <el-input v-model="queryForm.longitude" placeholder="输入经度"></el-input>
        </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="queryForm.create_time" placeholder="输入创建时间"></el-input>
        </el-form-item>
      <el-form-item label="更新时间">
        <el-input v-model="queryForm.update_time" placeholder="输入更新时间"></el-input>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" color="#ffff00" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      color="#ffff00"
      @click="handleAdd">
      添加库房
    </el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="company_number" label="企业编号" width="180"></el-table-column>
      <el-table-column prop="warehouse_name" label="库房名" width="180"></el-table-column>
      <el-table-column prop="warehouse_number" label="库房编号" width="180"></el-table-column>
      <el-table-column prop="warehouse_manager_name" label="库房负责人姓名" width="180"></el-table-column>
      <el-table-column prop="warehouse_manager_phone" label="库房负责人电话" width="180"></el-table-column>
      <el-table-column prop="warehouse_size" label="库房大小" width="180"></el-table-column>
      <el-table-column prop="warehouse_address" label="库房地址" width="180"></el-table-column>
      <el-table-column prop="warehouse_type" label="库房类型" width="180"></el-table-column>
      <el-table-column prop="warehouse_status" label="库房状态" width="180"></el-table-column>
      <el-table-column prop="latitude" label="纬度" width="180"></el-table-column>
      <el-table-column prop="longitude" label="经度" width="180"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="180"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" width="180"></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.$index, scope.row)"
            type="text"
            size="small">
            编辑
          </el-button>
          <el-button
            @click="handleDelete(scope.$index, scope.row)"
            type="text"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="ID">
          <el-input v-model="form.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="企业编号">
          <el-input v-model="form.company_number"></el-input>
        </el-form-item>
        <el-form-item label="库房名">
          <el-input v-model="form.warehouse_name"></el-input>
        </el-form-item>
        <el-form-item label="库房编号">
          <el-input v-model="form.warehouse_number"></el-input>
        </el-form-item>
        <el-form-item label="库房负责人姓名">
          <el-input v-model="form.warehouse_manager_name"></el-input>
        </el-form-item>
        <el-form-item label="库房负责人电话">
          <el-input v-model="form.warehouse_manager_phone"></el-input>
        </el-form-item>
        <el-form-item label="库房大小">
          <el-input v-model="form.warehouse_size"></el-input>
        </el-form-item>
        <el-form-item label="库房地址">
          <el-input v-model="form.warehouse_address"></el-input>
        </el-form-item>
        <el-form-item label="库房类型">
          <el-input v-model="form.warehouse_type"></el-input>
        </el-form-item>
        <el-form-item label="库房状态">
          <el-input v-model="form.warehouse_status"></el-input>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="form.latitude"></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-input v-model="form.longitude"></el-input>
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
import { getWarehouseList, addWarehouse, putWarehouse, delWarehouse } from '@/api/admin'

export default {
  data() {
    return {
      rawData:[],
      tableData: [],
      dialogVisible: false,
      queryForm:{
        id: '',
        company_number: '',
        warehouse_name: '',
        warehouse_number: '',
        warehouse_manager_name: '',
        warehouse_manager_phone: '',
        warehouse_size: '',
        warehouse_address: '',
        warehouse_type: '',
        warehouse_status: '',
        latitude: '',
        longitude: '',
        create_time: '',
        update_time: ''
      },
      form: {
        id: '',
        company_number: '',
        warehouse_name: '',
        warehouse_number: '',
        warehouse_manager_name: '',
        warehouse_manager_phone: '',
        warehouse_size: '',
        warehouse_address: '',
        warehouse_type: '',
        warehouse_status: '',
        latitude: '',
        longitude: '',
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
        warehouse_name: '',
        warehouse_number: '',
        warehouse_manager_name: '',
        warehouse_manager_phone: '',
        warehouse_size: '',
        warehouse_address: '',
        warehouse_type: '',
        warehouse_status: '',
        latitude: '',
        longitude: '',
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
      const response = await delWarehouse({warehouse_number: row.warehouse_number}); // 只发送库房ID
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
            response = await putWarehouse(this.form);
          } else {
            response = await addWarehouse(this.form);
          }
          if (response.data.status === 'ok') {
            this.dialogVisible = false;
            await this.getList();
          } else {
            this.$message.error(response.data.message); // 使用API返回的消息
          }
          console.log(this.form.latitude, this.form.longitude);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async handlerSearch() {
      this.tableData = this.rawData.filter(item => {
        return (!this.queryForm.id || (item.id && item.id.toString().includes(this.queryForm.id))) &&
          (!this.queryForm.company_number || (item.company_number && item.company_number.toString().includes(this.queryForm.company_number)))&&

          (!this.queryForm.warehouse_name || (item.warehouse_name && item.warehouse_name.toString().includes(this.queryForm.warehouse_name))) &&

          (!this.queryForm.warehouse_number || (item.warehouse_number && item.warehouse_number.toString().includes(this.queryForm.warehouse_number))) &&

          (!this.queryForm.warehouse_manager_name || (item.warehouse_manager_name && item.warehouse_manager_name.toString().includes(this.queryForm.warehouse_manager_name))) &&

          (!this.queryForm.warehouse_manager_phone || (item.warehouse_manager_phone && item.warehouse_manager_phone.toString().includes(this.queryForm.warehouse_manager_phone))) &&

          (!this.queryForm.warehouse_size || (item.warehouse_size && item.warehouse_size.toString().includes(this.queryForm.warehouse_size))) &&

          (!this.queryForm.warehouse_address || (item.warehouse_address && item.warehouse_address.toString().includes(this.queryForm.warehouse_address))) &&

          (!this.queryForm.warehouse_type || (item.warehouse_type && item.warehouse_type.toString().includes(this.queryForm.warehouse_type))) &&

          (!this.queryForm.warehouse_status || (item.warehouse_status && item.warehouse_status.toString().includes(this.queryForm.warehouse_status))) &&

          (!this.queryForm.latitude || (item.latitude && item.latitude.toString().includes(this.queryForm.latitude))) &&

          (!this.queryForm.longitude || (item.longitude && item.longitude.toString().includes(this.queryForm.longitude))) &&

          (!this.queryForm.create_time || (item.create_time && item.create_time.toString().includes(this.queryForm.create_time))) &&

          (!this.queryForm.update_time || (item.update_time && item.update_time.toString().includes(this.queryForm.update_time)));
      });
    },
    async getList() {
      const response = await getWarehouseList();
      this.tableData = response.data;
      this.rawData = response.data;
    }
  },
  created() {
    this.getList();
  }
}
</script>
<style scoped>/* 在这里添加你的样式 */
.warehouse {
  padding: 20px;
}
</style>
