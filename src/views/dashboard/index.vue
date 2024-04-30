<template>
  <div class="dashboard-container">
    <div class="topInfo">
      <div class="userInfo">
        <div>
          <div>上次登录ip：{{ userInfo[`上次登录ip`] }}</div>
          <div class="time">上次登录时间:{{ userInfo[`上次登录时间`] }}</div>
        </div>
      </div>
      <div class="total">
        <div class="label">
          <div class="num">{{ totalData.companyTotal }}</div>
          <div>企业数</div>
        </div>
        <div class="label">
          <div class="num">{{ totalData.warehouseTotal }}</div>
          <div>库房数</div>
        </div>
        <div class="label">
          <div class="num">{{ totalData.hostTotal }}</div>
          <div>主机数</div>
        </div>
        <div class="label">
          <div class="num">{{ totalData.meterTotal }}</div>
          <div>仪表数</div>
        </div>
      </div>
    </div>
    <div class="dashboard-cont">
      <div class="title">
        <div>监控地图</div>

      </div>
      <div class="content" style="height: 700px">
        <BaiduMap v-if="mapData" :data="mapData"></BaiduMap>
      </div>
    </div>

    <div class="disFlex">
      <div class="cont">
        <div class="title">设备停用趋势</div>
        <div class="content">
          <charts2/>
        </div>
      </div>
    </div>

    <div class="disFlex">
      <div class="cont">
        <div class="title">设备状态分布</div>
        <div class="content">
          <charts1/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {UserModule} from '@/store/modules/user'
import BaiduMap from '@/components/Map/index.vue'
import {getUserInfo} from "@/api/users";
import axios from "axios";
import Charts1 from "@/views/dashboard/charts1.vue";
import Charts2 from "@/views/dashboard/charts2.vue";


@Component({
  name: 'Dashboard',
  methods: {
    getUserInfo,
  },
  components: {
    Charts2,
    Charts1,
    BaiduMap,
  }
})

export default class Userinfo extends Vue {
  totalData = {
    companyTotal: '',
    warehouseTotal: '',
    hostTotal: '',
    meterTotal: '',
  }
  mapData = []
// 将data属性转换为实例属性
  userInfo = null

  // 计算属性
  get name() {
    return UserModule.username
  }

  get login_time() {
    return UserModule.login_time
  }


  // 生命周期钩子
  async mounted() {
    try {
      const userInfoResponse = await axios.get(`http://127.0.0.1:8090/user/userinfo`, {
        headers: {
          "Content-Type": "application/json;",
          'token': localStorage.getItem('token')
        },
      });
      this.userInfo = userInfoResponse.data;
    } catch (error) {
      console.error('Failed to fetch user info', error);
    }
    try {
      const totalResponse1 = await axios.get(`http://127.0.0.1:8090/system/getAllCompany`, {headers:{
          "Content-Type": "application/json;",
          'token':localStorage.getItem('token')
        },});
      this.totalData.companyTotal = totalResponse1.data.length;
      const totalResponse2 = await axios.get(`http://127.0.0.1:8090/system/getAllWarehouse`, {headers:{
          "Content-Type": "application/json;",
          'token':localStorage.getItem('token')
        },});
      this.totalData.warehouseTotal = totalResponse2.data.length;
      const totalResponse3 = await axios.get(`http://127.0.0.1:8090/system/getAllHost`, {headers:{
          "Content-Type": "application/json;",
          'token':localStorage.getItem('token')
        },});
      this.totalData.hostTotal = totalResponse3.data.length;
      const totalResponse4 = await axios.get(`http://127.0.0.1:8090/system/getAllMeter`, {headers:{
          "Content-Type": "application/json;",
          'token':localStorage.getItem('token')
        },});
      this.totalData.meterTotal = totalResponse4.data.length;
    } catch (error) {
      console.error('Failed to fetch total data', error)
    }
  }

  private async getMapData() {
    const {data} = await axios.get(`http://127.0.0.1:8090/system/getAllWarehouse`, {headers:{
        "Content-Type": "application/json;",
        'token':localStorage.getItem('token')
      },})
    this.mapData = data
    console.log(this.mapData)
  }


  created() {
    this.getMapData()
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  .topInfo {
    margin: 0 15px;
    padding: 15px;
    background: #fff;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;

    .userInfo {
      display: flex;
      justify-content: space-between;
      line-height: 25px;
      color: #333333;

      .icon {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 100%;
      }

      .time {
        font-size: 12px;
        color: #999;
      }
    }

    .total {
      display: flex;
      font-size: 12px;
      position: relative;
      right: -21px;
      color: #999;

      .label {
        text-align: center;
        padding: 0 40px;
        margin: 5px 0;
        border-right: solid 1px #e7e7e7;
        line-height: 1.5;

        .num {
          font-size: 18px;
          color: #5d8bf3;
        }
      }

      .label:last-child {
        border: none;
      }
    }
  }

  .dashboard-cont, .cont {
    background: #fff;
    border-radius: 5px;
    margin: 15px;
    padding: 15px;

    .title {
      margin-bottom: 15px;
      position: relative;
      display: flex;
      justify-content: space-between;
      color: #186bd0;
      font-size: 14px;

      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 18px;
        left: 0;
        width: 28px;
        height: 2px;
        background: #fd8888;
      }

      .info {
        position: relative;
        /*right: 28px;*/
        color: #999;
        display: flex;
        text-align: center;
        font-size: 12px;
        line-height: 1.5;

        .lab {
          padding: 0 20px;
        }

        .num {
          font-size: 16px;
          color: #333;
        }
      }
    }

    .content {
      width: 100%;
      height: 700px;

      .list {
        display: flex;
        border-bottom: solid 1px #f2f3f5;
        font-size: 14px;
        padding: 10px 0;
        color: #333;
        line-height: 1.5;

        img {
          width: 38px;
          height: 38px;
          border-radius: 100%;
          margin-right: 10px;
        }

        .time {
          font-size: 12px;
          color: #999;
        }

        &:last-child {
          border: none;
        }
      }
    }

    .baudumap {
      width: 100%;
      height: 400px;
    }
  }

  .disFlex {
    margin: 15px;
    display: flex;
    justify-content: space-between;

    .cont {
      background: #fff;
      border-radius: 5px;
      flex: 1;
      margin: 0;
      padding: 15px;
      height: 400px;
      min-height: 200px;
    }

    .cont:last-child {
      margin-left: 15px;
    }
  }
}
</style>
