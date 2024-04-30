<template>
  <div>
    <label class="file-label host-label">
      <span class="label-text">导入主机历史数据</span>
      <input type="file" @change="handleHostHistoryUpload" accept=".csv" class="file-input">
    </label>
    <label class="file-label meter-label">
      <span class="label-text">导入仪表历史数据</span>
      <input type="file" @change="handleMeterHistoryUpload" accept=".csv" class="file-input">
    </label>
  </div>
</template>

<script>

import axios from "axios";

export default {
  methods: {
    async handleHostHistoryUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      try {
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = async (evt) => {
          const content = evt.target.result;
          const blob = new Blob([content], { type: 'text/csv;charset=UTF-8' });
          const formData = new FormData();
          formData.append('file', blob, file.name);
          const response = await axios.post(`http://127.0.0.1:8090/system/upload/host_history`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'token':localStorage.getItem('token')
            }
          });
          console.log('Host history uploaded successfully:', response.data);
        }
      } catch (error) {
        console.error('Error uploading host history:', error);
      }
    },
    async handleMeterHistoryUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      try {
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = async (evt) => {
          const content = evt.target.result;
          const blob = new Blob([content], { type: 'text/csv;charset=UTF-8' });
          const formData = new FormData();
          formData.append('file', blob, file.name);
          const response = await axios.post(`http://127.0.0.1:8090/system/upload/meter_history`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'token':localStorage.getItem('token')
            }
          });
          console.log('Meter history uploaded successfully:', response.data);
        }
      } catch (error) {
        console.error('Error uploading meter history:', error);
      }
    }
  }
};
</script>

<style scoped>
.file-label {
  display: flex;
  margin-bottom: 10px;
}

.file-input {
  display: none;
}

.label-text {
  font-size: 16px;
  color: #333;
  cursor: pointer;
}

/* 主机历史数据标签样式 */
.host-label {
  width: 130px;
  background-color: #10ef82;
  padding: 14px;
  border-radius: 24px;
}

.host-label:hover {
  background-color: #e0e0e0;
}

/* 仪表历史数据标签样式 */
.meter-label {
  width: 130px;
  background-color: #10ef82;
  padding: 14px;
  border-radius: 24px;
}

.meter-label:hover {
  background-color: #e8e8e8;
}
</style>
