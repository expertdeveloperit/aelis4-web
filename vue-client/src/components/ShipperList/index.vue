<template>
  <div class="shipper-container">
    <div class="shipper-group">
      <transition name="slide">
        <div class="shipper-list" v-if="show">
          <div class="title">{{ $t('shipperComponent.shipperList') }}</div>
          <div class="search-shippers-div">
            <el-input
              v-model="searchText"
              v-alphanumeric-validation
              maxlength="50"
              clearable
              @change="search"
              class="inline-input"
              size="mini"
              suffix-icon="el-icon-search"
              id="search-shipper-list"
              ref="search-shipper-list"
            ></el-input>
          </div>
          <div
            class="list"
            infinite-scroll-immediate
            infinite-scroll-distance="100"
            v-infinite-scroll="search"
            infinite-scroll-disabled="disabled"
          >
            <div v-bind:key="shipper.id" v-for="shipper in shippers.list" class="list-item">
              <span class="span-name">{{ shipper.name }} - {{ shipper.number }}</span>
              <span class="span-check">
                <el-radio
                  v-model="user.shipperAccountNumber"
                  :label="shipper.number"
                  @change="change(shipper)"
                >&nbsp;</el-radio>
              </span>
            </div>
          </div>
          <p class="loading-shippers" v-if="shippers.loading">
            <img src="@/assets/svg/loading.svg" alt="loading" />
          </p>
          <p class="scroll-ellipsis" v-if="!noMore && !shippers.loading">...</p>
        </div>
      </transition>
      <div class="shipper-selected">
        <span class="shipper-label">{{ user.shipperAccountLabel }}</span>
        <span class="shipper-change">
          <el-button
            icon="fa fa-random"
            size="mini"
            circle
            @click="openList"
            v-if="shippers.multipleShippers && user.shipperAccountNumber"
          ></el-button>
        </span>
      </div>
    </div>
    <div class="shipper-container-overlay" v-if="show"></div>
  </div>
</template>

<script>
import { Loading } from 'element-ui';
import { mapGetters } from 'vuex';
import constants from '@/utils/constants';

export default {
  name: 'shipperList',
  props: {
    /* The vuex string array actions to be called when select, this actions will be called in the order position in waterfall mode. */
    actionStrSelectChained: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      show: false,
      searchText: ''
    };
  },
  computed: {
    ...mapGetters([
      'shippers',
      'user',
      'orderEntry',
      // 'extensionRequest'
    ]),
    noMore() {
      return this.shippers.list.length >= this.shippers.totalRows;
    },
    disabled() {
      return this.shippers.loading || this.noMore;
    }
  },
  methods: {
    search(resetSearch) {
      // If sarch text is changed or reset search is mandatory we call to resetShipperList
      if ((this.searchText !== this.shippers.filters.search) || resetSearch) {
        this.$store.dispatch('account/resetShipperList');
      }
      return this.$store.dispatch('account/getShipperListScroll', this.searchText);
    },
    async change(shipperSelected) {
      this.$store.dispatch('setUserShipperAccount', shipperSelected);
      const loading = Loading.service(constants.LOADING.DEFAULT_CONFIG);
      await this.callSelectAction();
      loading.close();
      this.show = false;
    },
    openList() {
      this.show = !this.show;
      // Its necessary nextTick because we need to wait the component render.
      if (this.show) {
        this.$nextTick(() => {
          this.$refs['search-shipper-list'].focus();
        });
      }
    },
    async callSelectAction() {
      if (this.actionStrSelectChained) {
        for (const action of this.actionStrSelectChained) {
          if (action === 'orderEntry/getSettings') {
            const res = await this.$store.dispatch(action);
            this.orderEntry.settings.minCubesPerBox = res.__ob__.value.minCubesPerBox;
            // this.orderEntry.settings.minCubesPerBox = res.__ob__.value.minCubesPerBox ? res.__ob__.value : '0.9461';
          } else {
            await this.$store.dispatch(action);
          }
        }
      }
    }
  },
  async mounted() {
    const resetSearch = true;
    if (this.user.shipperAccountNumber) {
      this.callSelectAction();
      // Call reset search but without loading because the shippers is already selected, and no need await.
      this.search(resetSearch);
    } else {
      const loading = Loading.service(constants.LOADING.DEFAULT_CONFIG);
      await this.search(resetSearch);
      this.show = this.shippers.list && this.shippers.list.length > 1;

      // SHIPPERS Users Normal Flow: If the list of shippers only returns 1, then we select it by default.
      if (this.shippers.list && this.shippers.list.length === 1) {
        this.change(this.shippers.list[0]);
      }
      loading.close();
    }

    // Its necessary nextTick because we need to wait the component render.
    if (this.show) {
      this.$nextTick(() => {
        this.$refs['search-shipper-list'].focus();
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
    .shipper-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
        .shipper-group {
            position: fixed;
            width: 600px;
            z-index: 1000;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
            .shipper-selected {
                text-align: center;
                width: 300px;
                color: #43425D;
                font-size: 10px;
                font-weight: bold;
                position: relative;
                border-radius: 5px;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-content: center;
                .is-circle {
                    padding: 1px 2px 2px 2px;
                    background-color: #43425D;
                    color: white;
                    margin-left: 7px;
                }
                i {
                    font-size: 9px;
                    cursor: pointer;
                    padding: 1px 1px 0px 1px;
                }
                &:before {
                    content: "";
                    position: absolute;
                    background-color: #cdd7df;
                    top: -4%;
                    bottom: -11%; left: -3%; right: -3%;
                    border-radius: 5px;
                    z-index: -1;
                    height: 35px;
                    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.16);
                    transform: perspective(10em) rotateX(-30deg);
                }
                .shipper-label {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 260px;
                    display: inline-block;
                    margin-top: 9px;
                }
                .shipper-change {
                    margin-top: 7px;
                }
            }
            .shipper-list {
                width: 400px;
                height: 440px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.16);
                .title {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-content: center;
                    height: 60px;
                    background-color: #00335B;
                    color: white;
                    font-size: 18px;
                }
                .search-shippers-div {
                    padding: 20px 40px 10px 40px;
                }
                .list {
                    background-color: white;
                    color: #00335B;
                    height: 280px;
                    overflow: auto;
                    font-size: 12px;
                    .list-item {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 35px;
                        border-bottom: solid 1px #dbd9d9;
                        margin: 0px 25px;
                        .span-name {
                            width: 90%;
                            text-align: right;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            padding: 0px 20px;
                        }
                        .span-check {
                            width: 10%;
                            text-align: left;
                        }
                    }
                }
                .loading-shippers {
                    text-align: center;
                    margin-top: 0px;
                    img {
                        width: 40px;
                    }
                }
                .scroll-ellipsis {
                    text-align: center;
                    margin-top: 0px;
                }
            }
        }
    }
    .shipper-container-overlay {
        min-height: calc(100vh - 50px);
        width: 100%;
        position: fixed;
        overflow: hidden;
        background-color: #d3d2d2;
        opacity: 0.5;
        z-index: 2;
    }
</style>
