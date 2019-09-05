<template>
  <div>
  <shipper-list />
  <div class="app-view-container upload-container">
    <div class="app-view-title">{{ $t('uploadXmlFiles.uploadShipmentTitle') }}
      <el-popover
          placement="bottom"
          class="explanation-popover"
          :title="$t('uploadXmlFiles.explanation')"
          width="200"
          trigger="click"
          :content="$t('uploadXmlFiles.explanationText')">
          <i class="el-icon-question" slot="reference" ></i>
      </el-popover>
    </div>
    <el-collapse v-model="activeCollapsibleName" class="explanation-container">
      <el-collapse-item :title="$t('uploadXmlFiles.explanation')" name="explanation" id="explanation">
        <div>{{ $t('uploadXmlFiles.explanationText') }}</div>
      </el-collapse-item>
    </el-collapse>
    <upload-response class="upload-response"/>
  </div>
  <upload-drop/>
  </div>
</template>

<script>
import ShipperList from '@/components/ShipperList';
import UploadDrop from './UploadDrop';
import UploadResponse from './UploadResponse';

export default {
  name: 'UploadXml',
  components: { UploadDrop, UploadResponse, ShipperList },
  data() {
    return {
      activeCollapsibleName: ['explanation']
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.explanation-popover {
    display: none;
}
@media only screen and (max-width: 768px) {
  .explanation-container {
    display: none;
  }
  .explanation-popover {
    display: inline;
  }
}
</style>
