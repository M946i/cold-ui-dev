<template>
  <div class="company">
    <el-form inline class="demo-form-inline">
      <el-form-item label="ID">
        <el-input v-model="queryForm.id" placeholder="输入ID"></el-input>
      </el-form-item>
      <el-form-item label="企业名称">
        <el-input v-model="queryForm.company_name" placeholder="输入企业名称"></el-input>
      </el-form-item>
      <el-form-item label="企业编号">
        <el-input v-model="queryForm.company_number" placeholder="输入企业编号"></el-input>
      </el-form-item>
      <el-form-item label="企业管理姓名">
        <el-input v-model="queryForm.company_manager_name" placeholder="输入企业管理姓名"></el-input>
      </el-form-item>
      <el-form-item label="企业电话">
        <el-input v-model="queryForm.company_manager_phone" placeholder="输入企业电话"></el-input>
      </el-form-item>
      <el-form-item label="企业地址">
        <el-input v-model="queryForm.company_address" placeholder="输入企业地址"></el-input>
      </el-form-item>
      <el-form-item label="企业类型">
        <el-input v-model="queryForm.company_type" placeholder="输入企业类型"></el-input>
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
      添加企业
    </el-button>
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
        prop="company_name"
        label="企业名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="company_number"
        label="企业编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="company_manager_name"
        label="企业管理姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="company_manager_phone"
        label="企业电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="company_address"
        label="企业地址"
        width="180">
      </el-table-column>
      <el-table-column
        prop="company_type"
        label="企业类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="更新时间"
        width="180">
      </el-table-column>
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
        <el-form-item label="企业名称">
          <el-input v-model="form.company_name"></el-input>
        </el-form-item>
        <el-form-item label="企业编号">
          <el-input v-model="form.company_number"></el-input>
        </el-form-item>
        <el-form-item label="企业管理姓名">
          <el-input v-model="form.company_manager_name"></el-input>
        </el-form-item>
        <el-form-item label="企业电话">
          <el-input v-model="form.company_manager_phone"></el-input>
        </el-form-item>
        <el-form-item label="企业地址">
          <el-input v-model="form.company_address"></el-input>
        </el-form-item>
        <el-form-item label="企业类型">
          <el-input v-model="form.company_type"></el-input>
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
import {getCompanyList, addCompany, putCompany, delCompany} from '@/api/admin'

export default {
  data() {
    return {
      rawData:[],
      tableData: [],
      dialogVisible: false,
      form: {
        id: '',
        company_name: '',
        company_number: '',
        company_manager_name: '',
        company_manager_phone: '',
        company_address: '',
        company_type: '',
        create_time: '',
        update_time: ''
      },
      queryForm: {
        id: '',
        company_name: '',
        company_number: '',
        company_manager_name: '',
        company_manager_phone: '',
        company_address: '',
        company_type: '',
        create_time: '',
        update_time: ''
      }
    };
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 确保id是一个数字
          this.form.id = parseInt(this.form.id);

          // 确保create_time和update_time是Date对象
          this.form.create_time = new Date(this.form.create_time);
          this.form.update_time = new Date(this.form.update_time);

          let response;
          try {
            if (this.form.id) {
              response = await putCompany(this.form);
            } else {
              response = await addCompany(this.form);
            }

            if (response.data.status === 'ok') {
              this.dialogVisible = false;
              await this.getList();
            } else {
              this.$message.error(response.data.message);  // 使用API返回的消息
            }
          } catch (error) {
            console.log(error.response);  // 打印出错误响应
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
        company_name: '',
        company_number: '',
        company_manager_name: '',
        company_manager_phone: '',
        company_address: '',
        company_type: '',
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
      const response = await delCompany({company_number: row.company_number}); // 只发送企业编号
      if (response.data.status === "ok") {
        await this.getList(); // 重新获取列表
      } else {
        this.$message.error('删除失败');
      }
    },
    async handleClose(done) {
      done();
    },
    async handleSearch() {
      this.tableData = this.rawData.filter(item => {
        return (!this.queryForm.id || (item.id && item.id.toString().includes(this.queryForm.id))) &&
          (!this.queryForm.company_name || (item.company_name && item.company_name.includes(this.queryForm.company_name))) &&
          (!this.queryForm.company_number || (item.company_number && item.company_number.includes(this.queryForm.company_number))) &&
          (!this.queryForm.company_manager_name || (item.company_manager_name && item.company_manager_name.includes(this.queryForm.company_manager_name))) &&
          (!this.queryForm.company_manager_phone || (item.company_manager_phone && item.company_manager_phone.includes(this.queryForm.company_manager_phone))) &&
          (!this.queryForm.company_address || (item.company_address && item.company_address.includes(this.queryForm.company_address))) &&
          (!this.queryForm.company_type || (item.company_type && item.company_type.includes(this.queryForm.company_type))) &&
          (!this.queryForm.create_time || (item.create_time && item.create_time.includes(this.queryForm.create_time))) &&
          (!this.queryForm.update_time || (item.update_time && item.update_time.includes(this.queryForm.update_time)));
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async getList() {
      const response = await getCompanyList();
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
.company {
  padding: 20px;
}
</style>
