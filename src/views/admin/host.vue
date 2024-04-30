<template>
  <div class="host">
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
      <el-form-item label="主机名">
        <el-input v-model="queryForm.host_name" placeholder="输入主机名"></el-input>

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
      <el-form-item label="更新时间">
        <el-input v-model="queryForm.update_time" placeholder="输入更新时间"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" color="#ffff00" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      color="#ffff00"
      @click="handleAdd">
      添加主机
    </el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="company_number" label="企业编号" width="180"></el-table-column>
      <el-table-column prop="warehouse_number" label="库房编号" width="180"></el-table-column>
      <el-table-column prop="host_name" label="主机名" width="180"></el-table-column>
      <el-table-column prop="host_number" label="主机编号" width="180"></el-table-column>
      <el-table-column prop="host_status" label="主机状态" width="180"></el-table-column>
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
        <el-form-item label="库房编号">
          <el-input v-model="form.warehouse_number"></el-input>
        </el-form-item>
        <el-form-item label="主机名">
          <el-input v-model="form.host_name"></el-input>
        </el-form-item>
        <el-form-item label="主机编号">
          <el-input v-model="form.host_number"></el-input>

        </el-form-item>
        <el-form-item label="主机状态">
          <el-input v-model="form.host_status"></el-input>

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
import {getHostList, addHost, putHost, delHost} from '@/api/admin'

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
        host_name: '',
        host_number: '',
        host_status: '',
        create_time: '',
        update_time: ''
      },
      form: {
        id: '',
        company_number: '',
        warehouse_number: '',
        host_name: '',
        host_number: '',
        host_status: '',
        create_time: '',
        update_time: ''
      }
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let response;
          if (this.form.id) {
            response = await putHost(this.form);
          } else {
            response = await addHost(this.form);
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
    async handleAdd() {
      // 清空表单
      this.form = {
        id: '',
        company_number: '',
        warehouse_number: '',
        host_name: '',
        host_number: '',
        host_status: '',
        create_time: '',
        update_time: ''
      };
      // 打开对话框
      this.dialogVisible = true;
    },
    async handleEdit(index, row) {
      this.form = Object.assign({}, row); // 复制一份 row 到 form
      this.dialogVisible = true; // 打开对话框
    },
    async handleDelete(index, row) {
      const response = await delHost({host_number: row.host_number}); // 只发送主机编号
      if (response.data.status === "ok") {
        await this.getList(); // 重新获取列表
      } else {
        this.$message.error('删除失败');
      }
    },
    async handleClose(done) {
      done();
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async handleSearch() {
      this.tableData = this.rawData.filter(item => {
        return (!this.queryForm.id || (item.id && item.id.toString().includes(this.queryForm.id))) &&
          (!this.queryForm.company_number || (item.company_number && item.company_number.includes(this.queryForm.company_number))) &&
          (!this.queryForm.warehouse_number || (item.warehouse_number && item.warehouse_number.includes(this.queryForm.warehouse_number))) &&
          (!this.queryForm.host_name || (item.host_name && item.host_name.includes(this.queryForm.host_name))) &&
          (!this.queryForm.host_number || (item.host_number && item.host_number.includes(this.queryForm.host_number))) &&
          (!this.queryForm.host_status || (item.host_status && item.host_status.includes(this.queryForm.host_status))) &&
          (!this.queryForm.create_time || (item.create_time && item.create_time.includes(this.queryForm.create_time))) &&
          (!this.queryForm.update_time || (item.update_time && item.update_time.includes(this.queryForm.update_time)));
      });
    },
    async getList() {
      const response = await getHostList();
      this.tableData = response.data;
      this.rawData = response.data;
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style scoped>
/* 这里你可以添加你的样式 */
.host {
  padding: 20px;
}
</style>
