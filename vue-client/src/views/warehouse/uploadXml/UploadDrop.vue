<template>
  <div class="upload-drop-container" :class="{ 'upload-drop-container-mini': isMinimized, 'upload-drop-container-max': !isMinimized }">
    <div class="upload-template-info">
      <i class="el-icon-info red-armellini"></i>&nbsp;
      <span class="font-gray info-text"> {{ $t('uploadXmlFiles.youCanDownload') }} &nbsp;</span>
      <a class="red-link-bold" id="xml-upload-download-template-link" :href="templateExampleUrl" download> {{ $t('uploadXmlFiles.here') }} </a>
    </div>
    <span id="xml-loading" class="xml-loading" v-if="processing">
      <img src="@/assets/svg/loading.svg"  v-bind:class="{ 'padding-left_28': actualFileProcessed }" alt="loading"/>
    </span>
    <div class="upload-dropzone-area" @click="handleOpenSearchFile" :class="{ 'upload-dropzone-area-mini': isMinimized, 'upload-dropzone-area-max': !isMinimized }">
      <i class="collapse-drop-zone el-icon-arrow-right" id="collapse-drop-zone" v-if="actualFileProcessed" v-on:click.stop="handleMinimized" ></i>
      <el-upload
      id="upload-xml"
      class="upload-xml"
      drag
      :show-file-list="false"
      :action="url"
      :headers="headers"
      :on-success="handleSuccess"
      :on-progress="handleProgress"
      :on-error="handleError"
      :before-upload="handleBeforeUpload"
      :limit="1"
      accept=".xml"
      ref="upload"
      >
      <div class="upload-icon-container">
        <img src="@/assets/png/upload-icon.png" alt="upload-icon" class="upload-icon">
        <el-progress type="circle" :percentage="uploadProgress" :show-text="false" v-if="!isMinimized">
        </el-progress>
      </div>
      <div class="el-upload__text"> <div class="drag-and-drop-text"> {{ $t('uploadXmlFiles.dragAndDrop') }} </div> {{ $t('uploadXmlFiles.yourFilesOr') }} <em>{{ $t('uploadXmlFiles.browse') }}</em></div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import authService from '@/utils/auth/auth0Service';

export default {
  name: 'UploadDrop',
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  data() {
    return {
      isMinimized: false,
      uploadProgress: 0,
      processing: false,
      actualFileProcessed: false,
      url: '',
      templateExampleUrl: '',
      headers: {}
    };
  },
  mounted() {
    this.url = `${process.env.VUE_APP_BASE_API}/data-entry/shipment/upload`;
    this.templateExampleUrl = `${process.env.VUE_APP_BUCKET_ROOT}xml-upload-template.xml`;
    this.headers.Authorization = `Bearer ${authService.accessToken}`;
    this.headers.shipperAccountNumber = this.user.shipperAccountNumber;
  },
  methods: {
    handleSuccess(response, file) {
      this.$store.dispatch('SetUploadXmlResponse', { ...response, fileName: file.name });
      this.isMinimized = true;
      this.processing = false;
      this.actualFileProcessed = true;
      this.$refs.upload.clearFiles();
    },
    handleOpenSearchFile() {
      this.isMinimized = false;
      this.uploadProgress = 0;
    },
    handleMinimized() {
      this.isMinimized = !this.isMinimized;
    },
    handleProgress(event, file, fileList) {
      if (!this.processing) {
        this.processing = true;
      }
      this.uploadProgress = fileList[0].percentage;
    },
    handleError() {
      this.processing = false;
      this.$message.error(this.$t('common.errorServer'));
    },
    handleBeforeUpload(file) {
      const isXML = file.type === 'text/xml';
      const isLt5M = file.size / 1024 / 1024 <= 5;
      if (!isXML) {
        this.$message.error(this.$t('uploadXmlFiles.errorExtension'));
      }
      if (!isLt5M) {
        this.$message.error(this.$t('uploadXmlFiles.fileSizeExceed'));
      }
      return isXML && isLt5M;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
.upload-drop-container {
  z-index: 1;
  width: 100%;
  height: 70%;
  float: left;
  position: absolute;
  text-align: center;
  bottom: 0px;
  background-color: #374057;
  display: flex;
  justify-content: center;
  align-items: center;
  &-mini {
    height: 16%;
    -webkit-transition: height 1s; /* For Safari 3.1 to 6.0 */
    transition: height 1s;
  }
  &-max {
    height: 70%;
    -webkit-transition: height 1s; /* For Safari 3.1 to 6.0 */
    transition: height 1s;
  }
  .is-dragover {
    background-color: #f5f5f5
  }
}

.upload-template-info {
  z-index: 1;
  position: absolute;
  top: 0px;
  width: 100%;
  height: 30px;
  background-color: #CAD0D9;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding-left: 40px;
}

.xml-loading {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: rgba(255,255,255,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-dropzone-area {
  margin-top: 45px;
  display: flex;
  position: relative;
  .el-upload-dragger {
    border: 0px;
    border-radius: 0px;
    -webkit-transition: height 1s; /* For Safari 3.1 to 6.0 */
    transition: height 1s;
  }
   &-mini {
     margin-top: 35px;
     .collapse-drop-zone {
        margin-bottom: 0px;
     }
    .el-upload-dragger {
      height: 50px;
      width: 100%;
      min-width: 52vw;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-upload__text {
        color: #01355F;
        .drag-and-drop-text {
          margin-left: 10px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 10px;
          text-transform: uppercase;
          display: inline;
        }
        em {
          color: #ED1C25;
          text-decoration: underline;
        }
      }
      .upload-icon-container {
        .upload-icon {
          height: 40px;
        }
      }
    }
  }
  &-max {
     .collapse-drop-zone {
        margin-bottom: 3px;
        &:before {
          transform: rotate(90deg);
        }
     }
    .el-upload-dragger {
      height: 260px;
      width: 450px;
      .el-upload__text {
        font-size: 12px;
        color: #01355F;
        .drag-and-drop-text {
          font-size: 18px;
          font-weight: bold;
          margin-top: 10px;
          text-transform: uppercase;
        }
        em {
          color: #ED1C25;
          text-decoration: underline;
        }
      }
      .upload-icon-container {
        margin-top: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        .upload-icon {
          position: absolute;
          height: 60px;
        }
      }
    }
  }
  .collapse-drop-zone {
    background-color: white;
    padding-top: 18px;
    padding-left: 10px;
    cursor: pointer;
    -webkit-transition: height 1s; /* For Safari 3.1 to 6.0 */
    transition: height 1s;
  }
}
.padding-left_28 {
  padding-left: 28px;
}

@media only screen and (max-width: 540px) {
    .upload-dropzone-area {
      .el-upload-dragger {
        width: 340px;
      }
    }
}

@media only screen and (max-height: 540px) {
    .upload-drop-container-mini {
        position: relative;
    }
}
</style>
