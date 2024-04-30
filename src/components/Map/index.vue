<template>
  <div>
    <baidu-map class="map" center="佳木斯" :scroll-wheel-zoom="true" :zoom="10">
      <div>
        <bm-marker v-for="item in data" :key="item.id" :position="{lng: item.longitude, lat: item.latitude}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
          <bm-info-window :position="{lng: item.longitude, lat: item.latitude}" :show="true">
            <div>库房名称: {{ item.warehouse_name }}</div>
            <div>企业编号: {{ item.company_number }}</div>
            <div>库房地址: {{ item.warehouse_address }}</div>
            <div>库房负责人姓名字: {{ item.warehouse_manager_name }}</div>
            <div>库房负责人电话: {{ item.warehouse_manager_phone }}</div>
            <div>库房编号: {{ item.warehouse_number }}</div>
            <div>库房大小: {{ item.warehouse_size }}</div>
            <div>库房状态: {{ item.warehouse_status }}</div>
            <div>库房类型: {{ item.warehouse_type }}</div>
            <div>创建时间: {{ item.create_time }}</div>
            <div>更新时间: {{ item.update_time }}</div>
          </bm-info-window>
          <bm-label v-for="item in data" :key="item.id" :content="item.warehouse_name" :position="{lng: item.longitude, lat: item.latitude}" :labelStyle="{color: 'red', fontSize : '24px'}"/>
        </bm-marker>
      </div>
    </baidu-map>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

interface DataItem {
  id: number,
  company_number: string,
  warehouse_address: string,
  warehouse_manager_name: string,
  warehouse_manager_phone: string,
  warehouse_name: string,
  warehouse_number: string,
  warehouse_size: string,
  warehouse_status: string,
  warehouse_type: string,
  latitude: number,
  longitude: number,
  create_time: string,
  update_time: string,
}

@Component({})
export default class extends Vue {
  @Prop({required: true}) data!: DataItem[]
  // ...
  created() {
    console.log(this.data)
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 700px;
}
</style>
