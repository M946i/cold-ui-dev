<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <!--<breadcrumb-->
    <!--id="breadcrumb-container"-->
    <!--class="breadcrumb-container"-->
    <!--/>-->
    <div class="position">佳木斯 <i class="icon">&#xe604;</i></div>
    <div class="right-menu">
      <div class="avatar-container right-menu-item hover-effect">
        <div class="avatar-wrapper">
          <span class="out" @click="logout">退出登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {AppModule} from '@/store/modules/app'
import {UserModule} from '@/store/modules/user'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import axios from "axios";

@Component({
  name: 'Navbar',
  components: {
    Breadcrumb,
    Hamburger
  }
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar
  }

  get device() {
    return AppModule.device.toString()
  }

  private toggleSideBar() {
    AppModule.ToggleSideBar(false)
  }

  private userInfo() {
    const userInfo = UserModule.GetUserInfo()
  }

  created() {
    this.userInfo()
  }

  private async logout() {
    const response = await axios.post(
      'http://127.0.0.1:8090/user/logout',
      {},
      {
        headers: {
          'token': localStorage.getItem('token')
        }
      }
    );
    localStorage.removeItem('token')
    await this.$router.push({
      path:  '/login',
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
  color: #fff;

  .position {
    display: inline-block;
    width: 200px;
    padding: 15px 0 0 15px;
    color: #27c7d8;
    font-weight: bold;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        color: #fff;

        .topLab {
          padding: 0 15px;
          font-size: 14px;

          .icon {
            font-size: 14px;
          }
        }

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 30px;
          margin-left: 20px;
          margin-right: 10px;
          margin-top: 10px;
        }

        .avatar-company {
          margin-top: 5px;
          line-height: 40px;
          font-size: 14px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
