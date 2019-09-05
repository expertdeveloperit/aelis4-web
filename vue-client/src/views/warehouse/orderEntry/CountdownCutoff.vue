<template>
    <el-col :span="7">
        <div class="count-down-container">
            <countdown :time="orderEntry.cutoff.limitDateMillis" :interval="100" @end="end" @start="start">
                <template slot-scope="props">
                    <div :class="{ 'count-down-piece': orderEntry.filtersOpen.length, 'count-down-piece-mini': !orderEntry.filtersOpen.length }" v-if="props.days">
                        <div  class="count-down-number" id="count-down-days">{{ props.days }}</div>
                        <div  class="count-down-label">{{ $t('common.days') }}</div>
                    </div>
                    <div :class="{ 'count-down-piece': orderEntry.filtersOpen.length, 'count-down-piece-mini': !orderEntry.filtersOpen.length }">
                        <div class="count-down-number" id="count-down-hours">{{ props.hours }}</div>
                        <div class="count-down-label">{{ $t('common.hours') }}</div>
                    </div>
                    <div :class="{ 'count-down-piece': orderEntry.filtersOpen.length, 'count-down-piece-mini': !orderEntry.filtersOpen.length }">
                        <div class="count-down-number" id="count-down-minutes">{{ props.minutes }}</div>
                        <div class="count-down-label">{{ $t('common.minutes') }}</div>
                    </div>
                    <div :class="{ 'count-down-piece': orderEntry.filtersOpen.length, 'count-down-piece-mini': !orderEntry.filtersOpen.length }">
                        <div class="count-down-number" id="count-down-seconds">{{ props.seconds }}</div>
                        <div class="count-down-label">{{ $t('common.seconds') }}</div>
                    </div>
                </template>
            </countdown>
            <div class="count-down-message" v-if="orderEntry.filtersOpen.length && !showEndMessage">
                <span> {{ $t('warehouse.orderEntry.cutOffTimeRemaining') }} </span> <span class="red-armellini"> {{ orderEntry.actualFilters.shipDate | moment("MM/DD/YYYY") }}</span>
            </div>
            <div class="count-down-message" v-if="orderEntry.filtersOpen.length && showEndMessage">
                <span> {{ $t('warehouse.orderEntry.cutOffTimeEndFirst') }} </span> <span class="red-armellini"> {{ orderEntry.actualFilters.shipDate | moment("MM/DD/YYYY") }}</span>
                <span> {{ $t('warehouse.orderEntry.cutOffTimeEndLast') }} </span>
            </div>
        </div>
    </el-col>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SearchFilters',
  computed: {
    ...mapGetters([
      'orderEntry'
    ])
  },
  data() {
    return {
      showEndMessage: false
    };
  },
  methods: {
    end() {
      this.showEndMessage = true;
      this.$store.dispatch('orderEntry/setCutoffClosed', true);
    },
    start() {
      this.showEndMessage = false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.count-down-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d9dadc;
    position: relative;
    color: #43425D;
    span:first-child {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .count-down-piece {
        margin: 0 5px;
        display: inline-block;
        background-color: #F1F3F6;
        min-width: 50px;
        text-align: center;
        border-radius: 10px;
        box-shadow: 3px 3px 4px #C9CBCF;
        &-mini {
            margin: 0 5px;
            display: inline-block;
            background-color: #F1F3F6;
            min-width: 50px;
            text-align: center;
            border-radius: 10px;
            box-shadow: 3px 3px 4px #C9CBCF;
            .count-down-number {
                font-size: 20px;
                margin-top: 2px;
                font-weight: 700;
            }
            .count-down-label {
                margin-bottom: 3px;
                font-size: 8px;
            }
        }
        .count-down-number {
            font-size: 30px;
            margin-top: 5px;
            font-weight: 700;
        }
        .count-down-label {
            font-size: 10px;
            margin-bottom: 5px;
        }
    }
    .count-down-message {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
        font-size: 10px;
        padding-right: 5%;
        padding-left: 5%;
    }
}
</style>
