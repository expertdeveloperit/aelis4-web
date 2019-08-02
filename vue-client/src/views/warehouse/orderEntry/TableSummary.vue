<template>
  <div class="height-100-p">
    <el-form :model="editForm" :rules="editFormRules" ref="editForm">
      <el-table
        :data="orderEntry.list"
        v-loading="orderEntry.loadingSearch"
        id="order-data-list"
        size="mini"
        tooltip-effect="dark"
        sortable
        class="dark-blue-table"
        :empty-text="$t('common.notAbleToFindRecords')"
        @sort-change="handleSortChange"
        stripe
      >
        <el-table-column
          prop="orderNumber"
          sortable="custom"
          :min-width="15"
          align="center"
          :label="$t('warehouse.orderEntry.orderNumberShort')"
        >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.orderNumber" placement="top">
              <span>{{ scope.row.orderNumber }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="consignee"
          sortable="custom"
          :min-width="30"
          :label="$t('warehouse.orderEntry.consignee')"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-form-item prop="consigneeAccountId">
                <autocomplete
                  :model.sync="editForm.consigneeAccountId"
                  :shipperAccountId="orderEntry.settings.shipperAccountId"
                  labelFieldLastWithDash="number"
                  popperAppendToBody
                  :url="urlConsignee"
                  labelField="name"
                  valueField="id"
                  id="row-consignee"
                  ref="row-consignee"
                />
              </el-form-item>
            </template>
            <template v-else>
              <el-tooltip
                class="item"
                effect="dark"
                :content="`${scope.row.consigneeName} - ${ scope.row.consigneeAccount }`"
                placement="top"
              >
                <span>{{ scope.row.consigneeName }} - {{ scope.row.consigneeAccount }}</span>
              </el-tooltip>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :min-width="10"
          prop="unitOfMeasure"
          :label="$t('warehouse.orderEntry.unitOfMeasureShort')"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-form-item prop="unitOfMeasureName">
                <el-select
                  v-model="editForm.unitOfMeasureName"
                  id="row-unitOfMeasureName"
                  ref="row-unitOfMeasureName"
                  size="mini"
                >
                  <el-option
                    v-for="item in unitOfMeasureOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>
            <span v-else>{{scope.row.unitOfMeasureName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :min-width="8"
          prop="numberUnits"
          :label="$t('warehouse.orderEntry.numberOfUnitsShort')"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit && scope.row.status !== finalizedId">
              <el-form-item prop="numberUnits">
                <el-input-number
                  v-model="editForm.numberUnits"
                  v-numeric-validation
                  :precision="0"
                  :min="1"
                  :max="999"
                  :maxlength="3"
                  :controls="false"
                  size="mini"
                  class="inline-input width-100p"
                  id="row-number-units"
                ></el-input-number>
              </el-form-item>
            </template>
            <span v-else>{{scope.row.numberUnits}}</span>
          </template>
        </el-table-column>
        <el-table-column :min-width="10" prop="measure" :label="$t('warehouse.orderEntry.measure')">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-form-item prop="measure">
                <el-select
                  v-model="editForm.measure"
                  id="row-measure"
                  ref="row-measure"
                  size="mini"
                >
                  <el-option
                    v-for="item in measureOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>
            <span v-else>{{scope.row.measure}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="length" :min-width="8" :label="$t('warehouse.orderEntry.length')">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-form-item prop="length">
                <el-input-number
                  v-model="editForm.length"
                  v-numeric-validation
                  :controls="false"
                  :precision="3"
                  :min="0"
                  :max="999.999"
                  size="mini"
                  class="inline-input width-100p"
                  id="row-length"
                  ref="row-length"
                ></el-input-number>
              </el-form-item>
            </template>
            <span v-else>{{scope.row.length}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="width" :min-width="8" :label="$t('warehouse.orderEntry.width')">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-form-item prop="width">
                <el-input-number
                  v-model="editForm.width"
                  v-numeric-validation
                  :controls="false"
                  :precision="3"
                  :min="0"
                  :max="999.999"
                  size="mini"
                  class="inline-input width-100p"
                  id="row-width"
                  ref="row-width"
                ></el-input-number>
              </el-form-item>
            </template>
            <span v-else>{{scope.row.width}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="height" :min-width="8" :label="$t('warehouse.orderEntry.height')">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-form-item prop="height">
                <el-input-number
                  v-model="editForm.height"
                  v-numeric-validation
                  :controls="false"
                  :precision="3"
                  :min="0"
                  :max="999.999"
                  size="mini"
                  class="inline-input width-100p"
                  id="row-height"
                  ref="row-height"
                ></el-input-number>
              </el-form-item>
            </template>
            <span v-else>{{scope.row.height}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :min-width="10"
          prop="productCode"
          :label="$t('warehouse.orderEntry.product')"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-form-item prop="productCode">
                <autocomplete
                  :model.sync="editForm.productCode"
                  :modelAdditional.sync="editForm.productDescription"
                  popperAppendToBody
                  :strict="false"
                  :url="urlProduct"
                  labelField="description"
                  labelfieldSelected="code"
                  valueField="code"
                  valueFieldAdditional="description"
                  :maxlength="5"
                  id="row-productCode"
                  ref="row-productCode"
                />
              </el-form-item>
            </template>
            <span v-else>{{scope.row.productCode}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="productDescription"
          sortable="custom"
          :min-width="20"
          :label="$t('warehouse.orderEntry.productDescription')"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-form-item prop="productDescription">
                <el-input
                  v-model="editForm.productDescription"
                  v-alphanumeric-validation
                  clearable
                  maxlength="30"
                  size="mini"
                  class="inline-input"
                  id="row-product-description"
                  ref="row-product-description"
                ></el-input>
              </el-form-item>
            </template>
            <template v-else>
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.productDescription"
                placement="top"
              >
                <span>{{ scope.row.productDescription }}</span>
              </el-tooltip>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :min-width="8"
          prop="poNumber"
          :label="$t('warehouse.orderEntry.poNumber')"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-form-item prop="poNumber">
                <el-input
                  v-model="editForm.poNumber"
                  v-alphanumeric-validation
                  clearable
                  maxlength="25"
                  size="mini"
                  class="inline-input"
                  id="row-po-number"
                  ref="row-po-number"
                ></el-input>
              </el-form-item>
            </template>
            <template v-else>
              <el-tooltip class="item" effect="dark" :content="scope.row.poNumber" placement="top">
                <span>{{ scope.row.poNumber }}</span>
              </el-tooltip>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :min-width="15"
          prop="farmName"
          :label="$t('warehouse.orderEntry.farmBroker')"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-form-item prop="poNumber">
                <el-input
                  v-model="editForm.farmName"
                  v-alphanumeric-validation
                  maxlength="25"
                  size="mini"
                  class="inline-input"
                  id="row-farm-broker"
                  ref="row-farm-broker"
                ></el-input>
              </el-form-item>
            </template>
            <template v-else>
              <el-tooltip class="item" effect="dark" :content="scope.row.farmName" placement="top">
                <span>{{ scope.row.farmName }}</span>
              </el-tooltip>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :min-width="9"
          prop="status"
          :label="$t('warehouse.orderEntry.finalized')"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status === finalizedId">
              <i class="el-icon-success green-success"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :min-width="15"
          :label="$t('common.options')"
          align="center"
          class-name="fixed-width"
        >
          <template slot-scope="scope">
            <el-tooltip
              v-if="showEditButton(scope.row.status)"
              class="item"
              effect="dark"
              :content="$t('warehouse.orderEntry.edit')"
              placement="top-start"
            >
              <i class="el-icon-edit icon-action" @click="handleEdit(scope.row)"></i>
            </el-tooltip>
            <template v-else-if="scope.row.edit">
              <el-button icon="el-icon-success" circle size="mini" @click="handleUpdate()"></el-button>
              <el-button
                icon="el-icon-circle-close"
                circle
                size="mini"
                @click="cancelEdit(scope.row)"
              ></el-button>
            </template>
            <template v-if="!scope.row.edit">
              <el-tooltip
                v-if="scope.row.status === finalizedId"
                class="item"
                effect="dark"
                :content="$t('warehouse.orderEntry.details')"
                placement="top-start"
              >
                <units-detail-dialog :unitsConsolidateId="scope.row.id" />
              </el-tooltip>
              <el-tooltip
                v-if="scope.row.status === finalizedId"
                :unitsConsolidateId="scope.row.id"
                class="item"
                effect="dark"
                :content="$t('warehouse.orderEntry.print')"
                placement="top-start"
              >
                <print-unit-consolidate-label
                  :unitsConsolidateId="scope.row.id"
                  :labelPrinted.sync="scope.row.labelPrinted"
                />
              </el-tooltip>
              <el-tooltip
                v-if="showDeleteButton(scope.row.status)"
                class="item"
                effect="dark"
                :content="$t('warehouse.orderEntry.delete')"
                placement="top-start"
              >
                <i
                  class="el-icon-delete icon-action"
                  type="primary"
                  size="mini"
                  @click="handleDelete(scope.row.id, scope.row.numberUnits, scope.row.shipDate)"
                ></i>
              </el-tooltip>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-pagination
      v-show="orderEntry.total > 0"
      @size-change="handleSearchChangeLimit"
      :page-sizes="sizes"
      :page-size="orderEntry.actualFilters.rows"
      :current-page.sync="orderEntry.actualFilters.page"
      @current-change="handleSearchChangePage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="orderEntry.total"
    ></el-pagination>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import moment from 'moment';
import { mapGetters } from 'vuex';
import constants from '@/utils/constants';
import apiConstants from '@/utils/apiConstants';
import Autocomplete from '@/components/Autocomplete';
import UnitsDetailDialog from './components/unitsDetail/UnitsDetailDialog';
import PrintUnitConsolidateLabel from './components/tableSummary/PrintUnitConsolidateLabel';

export default {
  name: 'TableSummary',
  components: { Autocomplete, UnitsDetailDialog, PrintUnitConsolidateLabel },
  computed: {
    ...mapGetters(['orderEntry'])
  },
  filters: {
    statusFilterType(id) {
      return constants.ORDER_ENTRY.ORDER_STATUS.find(
        status => status.value === id
      ).typeCss;
    }
  },
  data() {
    return {
      editForm: {
        id: null,
        shipDate: null,
        consigneeAccountId: null,
        unitOfMeasureName: null,
        measure: null,
        numberUnits: null,
        length: null,
        width: null,
        height: null,
        productCode: '',
        productDescription: '',
        poNumber: '',
        farmName: ''
      },
      editFormRules: {
        consigneeAccountId: [
          {
            required: true,
            message: this.$t('warehouse.orderEntry.error.consigneeRequired'),
            trigger: 'submit'
          }
        ],
        length: [
          {
            required: true,
            message: this.$t('warehouse.orderEntry.error.lengthRequired'),
            trigger: 'blur'
          }
        ],
        width: [
          {
            required: true,
            message: this.$t('warehouse.orderEntry.error.widthRequired'),
            trigger: 'blur'
          }
        ],
        height: [
          {
            required: true,
            message: this.$t('warehouse.orderEntry.error.heightRequired'),
            trigger: 'blur'
          }
        ]
      },
      finalizedId: constants.ORDER_ENTRY.ORDER_STATUS[2].value,
      unitOfMeasureOptions: constants.ORDER_ENTRY.UNIT_OF_MEASURE_LIST,
      measureOptions: constants.ORDER_ENTRY.MEASURE_LIST,
      urlConsignee: apiConstants.END_POINTS.ACCOUNTS.CONSIGNEE_BY_SHIPPER,
      urlProduct: apiConstants.END_POINTS.PRODUCT_SEARCH,
      sizes: constants.TABLES.DEFAULT_LIMIT_SIZES
    };
  },
  methods: {
    handleSearchChangePage(val) {
      this.$store.dispatch('orderEntry/search', { page: val });
    },
    handleSearchChangeLimit(val) {
      this.$store.dispatch('orderEntry/search', {
        rows: val,
        page: constants.TABLES.DEFAULT_PAGE
      });
    },
    handleSortChange(data) {
      let { prop } = data;
      const { order } = data;
      prop = constants.TABLES.ORDER_ENTRY.COLUMNS_MAP_SORT[prop] || prop;
      this.$store.dispatch('orderEntry/search', {
        orderField: prop,
        orderDirection: constants.TABLES.ORDER_DIRECTION[order]
      });
    },
    handleEdit(row) {
      this.$store.dispatch('orderEntry/setEditingRow', true);
      row.edit = true;
      this.editForm.id = row.id;
      this.editForm.shipDate = row.shipDate;
      this.editForm.consigneeAccountId = row.consigneeAccountId;
      this.editForm.shipperAccountId = row.shipperAccountId;
      this.editForm.unitOfMeasureName = row.unitOfMeasureName;
      this.editForm.measure = row.measure;
      this.editForm.numberUnits = row.numberUnits;
      this.editForm.length = row.length;
      this.editForm.width = row.width;
      this.editForm.height = row.height;
      this.editForm.productCode = row.productCode;
      this.editForm.productDescription = row.productDescription;
      this.editForm.poNumber = row.poNumber;
      this.editForm.farmName = row.farmName;
      this.editForm.status = row.status;
      this.$nextTick(() => {
        this.$refs['row-consignee'].setLocalModel(
          `${row.consigneeName} - ${row.consigneeAccount}`
        );
        this.$refs['row-productCode'].setLocalModel(row.productCode);
        if (this.$refs['row-consignee'].$el) {
          this.$refs['row-consignee'].$el
            .getElementsByTagName('input')[0]
            .focus();
        }
      });
    },
    async handleUpdate() {
      const minValue = this.orderEntry.settings.minCubesPerBox;
      let {
        length, height, width
      } = this.editForm;
      const { measure } = this.editForm;

      if (measure === constants.ORDER_ENTRY.MEASURE_LIST[1].value) {
        length *= constants.ORDER_ENTRY.CONST_VALUE;
        width *= constants.ORDER_ENTRY.CONST_VALUE;
        height *= constants.ORDER_ENTRY.CONST_VALUE;
      }
      const volume = length * width * height;
      if (volume <= minValue) {
        let message = this.$t('warehouse.orderEntry.error.minValueValidationError');
        message = message.replace('[unit]', this.editForm.numberUnits).replace('[minValue]', minValue);
        const confirm = await this.$confirm(message, { confirmButtonText: this.$t('OK') });
        if (confirm) { return this.getSubmitForm(); }
        return false;
      } if (volume > constants.ORDER_ENTRY.MAX_VALUE) {
        let message = this.$t('warehouse.orderEntry.error.maxValueValidationError');
        message = message.replace('[minValue]', minValue).replace('[max_value]', constants.ORDER_ENTRY.MAX_VALUE);
        this.$message.warning(message);
        return false;
      }
      return this.getSubmitForm();
    },
    clearEdit() {
      this.$store.dispatch('orderEntry/setEditingRow', false);
      this.$refs.editForm.resetFields();
      this.$refs['row-consignee'].clearLocalModel();
      this.$refs['row-productCode'].clearLocalModel();
    },
    cancelEdit(row) {
      row.edit = false;
      this.clearEdit();
    },
    handleDelete(id, numberUnits, shipDate) {
      let message = this.$t('warehouse.orderEntry.deleteConfirmation');
      message = message.replace('[numberUnits]', numberUnits);
      message = message.replace(
        '[shipDate]',
        moment(shipDate, constants.DATES.DEFAULT_BACKEND_FORMAT).format(
          constants.DATES.DEFAULT_DISPLAY_FORMAT
        )
      );
      return this.$confirm(message, {
        confirmButtonText: this.$t('common.yes')
      })
        .then(() => {
          Message.closeAll();
          const loading = this.$loadingthis.orderEntry(constants.LOADING.DEFAULT_CONFIG);
          this.$storethis.orderEntry
            .dispatch('orderEntry/deletthis.orderEntrye', id)
            .then((response) => {
              loading.close();
              this.$message.success(response.message);
              this.$store.dispatch('orderEntry/search', {});
            })
            .catch(() => {
              loading.close();
            });
        })
        .catch(() => {});
    },
    showEditButton(orderStatus) {
      const hasEditPermission = this.$can(
        this.permissions.DATA_ENTRY.EDIT_AFTER_CUTOFF_FINALIZED, orderStatus
      )
        || this.$can(
          this.permissions.DATA_ENTRY.EDIT_AFTER_CUTOFF_PENDING, orderStatus
        )
        || this.$can(
          this.permissions.DATA_ENTRY.EDIT_BEFORE_CUTOFF_FINALIZED, orderStatus
        )
        || this.$can(
          this.permissions.DATA_ENTRY.EDIT_BEFORE_CUTOFF_PENDING, orderStatus
        );
      return !this.orderEntry.isEditingRow && hasEditPermission;
    },
    showDeleteButton(orderStatus) {
      const hasDeletePermission = this.$can(
        this.permissions.DATA_ENTRY.DELETE_AFTER_CUTOFF_FINALIZED, orderStatus
      )
        || this.$can(
          this.permissions.DATA_ENTRY.DELETE_AFTER_CUTOFF_PENDING, orderStatus
        )
        || this.$can(
          this.permissions.DATA_ENTRY.DELETE_BEFORE_CUTOFF_FINALIZED, orderStatus
        )
        || this.$can(
          this.permissions.DATA_ENTRY.DELETE_BEFORE_CUTOFF_PENDING, orderStatus
        );
      return hasDeletePermission;
    },
    getSubmitForm() {
      this.$refs.editForm.validate((valid, validationsErrors) => {
        if (valid) {
          Message.closeAll();
          const loading = this.$loading(constants.LOADING.DEFAULT_CONFIG);
          this.$store
            .dispatch('orderEntry/update', {
              unitsConsolidateId: this.editForm.id,
              orderToUpdate: this.editForm
            })
            .then((response) => {
              loading.close();
              this.$message.success(response.message);
              this.clearEdit();
              this.$store.dispatch('orderEntry/search', {});
            })
            .catch(() => {
              loading.close();
            });
        } else {
          let errorMessage = '';
          Object.keys(validationsErrors).forEach((key) => {
            validationsErrors[key].forEach((validation) => {
              errorMessage += `${validation.message}. `;
            });
          });
          this.$message.warning(errorMessage);
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
