<template>
  <header-view :has_item="true" has_back :back_background="false" />
  <view
    :style="{
      paddingTop: `${top + height}px`,
    }"
  >
    <view class="br_wrap">
      <!-- 商店名称 -->
      <view class="br_sname">
        <view style="margin-right: 50rpx"> 商店名称 </view>
        <input v-model="sname" placeholder="请输入商店名称" />
      </view>
      <!-- 商店类型 -->
      <view class="br_stype">
        <view style="margin-right: 50rpx"> 商店类型 </view>
        <uni-data-select
          v-model="stype"
          :localdata="strange"
          :clear="false"
          placeholder="请选择"
          style="width: 300rpx"
        />
      </view>
      <!-- 经营资质 -->
      <view class="br_license">
        <view>经营资质照片</view>
        <view style="color: #a9a9a9; font-size: 23rpx; padding: 20rpx 0"
          >(门脸照片、店内照片、营业执照、食品经营许可证等)</view
        >
        <uni-file-picker
          fileMediatype="image"
          mode="grid"
          file-extname="png,jpg"
          :auto-upload="false"
          :image-styles="imageStyles"
          @select="licenseUpdate"
          @delete="licensePicDel"
          v-model="licenseVal"
        />
      </view>
      <!-- 身份证 -->
      <view class="br_identity">
        <view>身份证照片</view>
        <view style="color: #a9a9a9; font-size: 23rpx; padding: 15rpx 0"
          >(开店人身份证正反照片、开店人手持身份证正面照片)</view
        >
        <uni-file-picker
          fileMediatype="image"
          mode="grid"
          file-extname="png,jpg"
          :auto-upload="false"
          :image-styles="imageStyles"
          @select="identityUpdate"
          @delete="identityPicDel"
          v-model="identityVal"
        />
      </view>
    </view>
    <!-- 提交 -->
    <view class="br_submit" @click="submit">提交申请</view>
  </view>
</template>
<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";
import { YFetch } from "@/includes/YFetch";
import { ref } from "vue";
import { UploadImageByPath } from "@/subs/includes/UploadImage";
const { height, top } = uni.getMenuButtonBoundingClientRect();

const strange = [
  { value: "hotel", text: "hotel" },
  { value: "other", text: "other" },
];

let licenseVal = ref(
  <
    Array<{
      name: string;
      extname: string;
      url: string;
      uuid: number;
    }>
  >[]
);
let identityVal = ref(
  <
    Array<{
      name: string;
      extname: string;
      url: string;
      uuid: number;
    }>
  >[]
);

const sname = ref();
const stype = ref();

const imageStyles = {
  width: 86,
  height: 86,
};

const licensePicDel = (e: { tempFile: { uuid: any } }) => {
  const del = licenseVal.value.findIndex((val) => val.uuid == e.tempFile.uuid);
  licenseVal.value = licenseVal.value.splice(del, 1);
};

const identityPicDel = (e: { tempFile: { uuid: any } }) => {
  const del = identityVal.value.findIndex((val) => val.uuid == e.tempFile.uuid);
  identityVal.value = identityVal.value.splice(del, 1);
};

const licenseUpdate = (e: any) => {
  if (e.tempFiles[0].size > 420041) {
    licensePicDel({ tempFile: e.tempFiles[0].uuid });
    return;
  }
  licenseVal.value.push({
    name: e.tempFiles[0].name,
    extname: e.tempFiles[0].extname,
    url: e.tempFiles[0].url,
    uuid: e.tempFiles[0].uuid,
  });
};

const identityUpdate = (e: any) => {
  if (e.tempFiles[0].size > 420041) {
    identityPicDel({ tempFile: e.tempFiles[0].uuid });
    return;
  }
  identityVal.value.push({
    name: e.tempFiles[0].name,
    extname: e.tempFiles[0].extname,
    url: e.tempFiles[0].url,
    uuid: e.tempFiles[0].uuid,
  });
};

const submit = async () => {
  let storePersonalQuaPho: Array<string>[] = [];
  let storeQuaPho: Array<string>[] = [];
  identityVal.value.map(async (el) => {
    const { data } = await UploadImageByPath(el.url);
    storePersonalQuaPho.push(data);
  });
  licenseVal.value.map(async (el) => {
    const { data } = await UploadImageByPath(el.url);
    storeQuaPho.push(data);
  });
  setTimeout(async () => {
    await YFetch(
      "/store",
      "POST",
      {
        createTime: "",
        isDelete: 0,
        score: 0,
        selectValue: 0,
        spho: "...",
        storeAdaptTime: "",
        storeId: 0,
        storeIntroduce: "",
        storeMainFee: 0,
        storeName: sname.value,
        storePersonalQuaPho: storePersonalQuaPho,
        storePhone: "",
        storeQuaPho: storeQuaPho,
        storeSpecialPoint: "",
        storeStandFee: "",
        storeStatus: 0,
        storeTips: "",
        storeTitle: "",
        storeType: stype.value,
        uid: 0,
        updateTime: "",
      },
      {
        cookie: uni.getStorageSync("JSESSIONID"),
      }
    ).then((res) => {
      console.log(res);
    });
  }, 2000);
};
</script>
<style scoped>
.br_wrap {
  margin: 20rpx 25rpx;
  border-radius: 20rpx;
  box-shadow: 0 0 20rpx rgba(190, 190, 190, 0.541);
}
.br_sname,
.br_stype,
.br_license,
.br_identity {
  padding: 30rpx 50rpx;
  border-bottom: 1rpx solid rgba(211, 211, 211, 0.281);
  display: flex;
  align-items: center;
}
.br_sname {
  height: 60rpx;
}
.br_stype {
  height: 60rpx;
}
.br_license,
.br_identity {
  flex-direction: column;
  align-items: flex-start;
}
.br_identity {
}
.br_submit {
  background-color: #47a3ff;
  width: 80vw;
  height: 80rpx;
  border-radius: 22rpx;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 35rpx;
  margin: 0 auto;
}
</style>
