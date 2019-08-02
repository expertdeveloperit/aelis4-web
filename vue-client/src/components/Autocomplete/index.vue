<template>
  <span>
    <el-autocomplete
        @clear="clearAll"
        @keyup.native="clearParentModel"
        v-alphanumeric-validation
        v-model="localModel"
        clearable
        size="mini"
        :placeholder="placeholder"
        :fetch-suggestions="querySearchAsync"
        :highlight-first-item="true"
        @select="handleSelect"
        :trigger-on-focus="false"
        :style="styles"
        :class="classCss || 'width-100p'"
        :maxlength="maxlength"
        :popper-append-to-body="popperAppendToBody"
        popper-class="autocomplete-popper"
        >
    </el-autocomplete>
  </span>
</template>

<script>
import constants from '@/utils/constants';
import autocompleteApiService from '@/api/autocompleteService';

export default {
  name: 'Autocomplete',
  data() {
    return {
      localModel: null
    };
  },
  props: {
    /* The model of parent that must be updated when user select option. */
    model: {
      default: null
    },
    /* Additional model of parent that must be updated when user select option with other value of item selected. */
    modelAdditional: {
      default: null
    },
    /* End Point Url to search data. */
    url: {
      type: String,
      default: null
    },
    /* Current ShipperAccountId. */
    shipperAccountId: {
      type: Number,
      default: null
    },
    maxlength: {
      type: Number,
      default: 100
    },
    /* If the autocomplete item must be selected to change the parent model. */
    strict: {
      type: Boolean,
      default: true
    },
    /* The attribute name of item that must be show in the options of autocomplete. */
    labelField: {
      type: String,
      default: null
    },
    /* The attribute name of item that must be show in the options of autocomplete concatenated with dash after labelField. */
    labelFieldLastWithDash: {
      type: String,
      default: null
    },
    /* Optional: If the value that we need to show is diferent to labelField. */
    labelfieldSelected: {
      type: String,
      default: null
    },
    /* The attribute name of item that must be updated the model. */
    valueField: {
      type: String,
      default: null
    },
    /* The attribute name of item that must be updated the modelAdditional. */
    valueFieldAdditional: {
      type: String,
      default: null
    },
    styles: {
      type: String,
      default: null
    },
    classCss: {
      type: String,
      default: null
    },
    /* The function of parent that must be executed on key enter. */
    enterKeyAction: {
      type: Function,
      default: null
    },
    /* The function of parent that must be executed on select. */
    selectAction: {
      type: Function,
      default: null
    },
    /* The function of parent that must be executed on clear. */
    clearAction: {
      type: Function,
      default: null
    },
    /* Attribute that indicates if the popper must be append to body. */
    popperAppendToBody: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  watch: {
    localModel() {
      // If strict is false then it must be update the parent model.
      if (!this.strict) {
        this.$emit('update:model', this.localModel);
      }
    }
  },
  methods: {
    querySearchAsync(queryString, cb) {
      if (queryString && queryString.length >= 2 && queryString.trim()) {
        return autocompleteApiService.getList(this.url, queryString.trim(), this.shipperAccountId).then((response) => {
          if (response && response.data && response.data.length > 0) {
            response.data.forEach((element) => {
              // The value field its necessary by native component to show in the input.
              element.value = element[this.labelField];
              element.value += element[this.labelFieldLastWithDash] ? (` - ${element[this.labelFieldLastWithDash]}`) : '';
            });
            cb(response.data);
          } else {
            cb([]);
          }
        });
      }
      return false;
    },
    handleSelect(item) {
      this.$emit('update:model', item[this.valueField]);
      if (this.labelfieldSelected) {
        this.localModel = item[this.labelfieldSelected];
      }
      if (this.valueFieldAdditional) {
        this.$emit('update:modelAdditional', item[this.valueFieldAdditional]);
      }

      // Excecute parent select action.
      if (this.selectAction) {
        this.selectAction(item);
      }
    },
    clearAll() {
      this.$emit('update:model', null);
      // Excecute parent clearAction action.
      if (this.clearAction) {
        this.clearAction();
      }
    },
    clearParentModel(event) {
      // tab, enter, end, home, left, right
      const isControlKey = constants.KEY_CODE.CONTROL_KEYS_NO_BACKSPACE.find(key => key === event.keyCode);

      if (!isControlKey && this.model && this.strict) {
        this.$emit('update:model', null);
      }

      if (constants.KEY_CODE.ENTER === event.keyCode && this.enterKeyAction) {
        this.enterKeyAction();
      }
    },
    clearLocalModel() {
      this.localModel = null;
    },
    setLocalModel(val) {
      this.localModel = val;
    },
    getLocalModel() {
      return this.localModel;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.autocomplete-popper {
    min-width: 30%;
}
</style>
