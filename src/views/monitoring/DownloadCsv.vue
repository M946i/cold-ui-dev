<template>
  <div class="download-buttons">
    <button @click="downloadHostHistory">导出主机历史数据</button>
    <button @click="downloadMeterHistory">导出仪表历史数据</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    async downloadHostHistory() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8090/system/download/host_history`, {
          headers: {'token': token}
        });
        const fileName = 'host_history.csv';
        const blob = new Blob([response.data]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading host history CSV:', error);
      }
    },
    async downloadMeterHistory() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(await `http://127.0.0.1:8090/system/download/meter_history`, {
          headers: {'token': token}
        });
        const fileName = 'meter_history.csv';
        const blob = new Blob([response.data]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading meter history CSV:', error);
      }
    }
  }
};
</script>

<style scoped>
.download-buttons {
  margin-bottom: 20px;
}

.download-buttons button {
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.download-buttons button:hover {
  background-color: #45a049;
}
</style>
