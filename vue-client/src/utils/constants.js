const constants = {
  API: {
    AUTOCOMPLETE: {
      LIMIT: 20
    }
  },
  ROUTER: {
    PAGE_TITLE: 'Aelis 4',
    PATH: {
      DASHBOARD: '/dashboard',
      CALLBACK: '/callback',
      NO_CONFIG_USER: '/noUserConfig/index',
    }
  },
  KEY_CODE: {
    ENTER: 13,
    TAB: 9,
    BACKSPACE: 8,
    CONTROL_KEYS: [8, 9, 13, 32, 35, 36, 37, 38, 39, 46],
    CONTROL_KEYS_NO_BACKSPACE: [9, 13, 35, 36, 37, 38, 39, 46],
    ALLOWED_ADDITIONAL_KEY: [45, 95],
    FORBIDEN: [229, 222]
  },
  ORDER_ENTRY: {
    UNIT_OF_MEASURE_LIST: [
      {
        value: 'Box',
        label: 'Box'
      },
      {
        value: 'Pallet',
        label: 'Pallet'
      }, {
        value: 'Bin',
        label: 'Bin'
      }],
    MEASURE_LIST: [{
      value: 'Inch',
      label: 'Inch'
    }, {
      value: 'CM',
      label: 'CM'
    }],
    ORDER_STATUS: [{
      value: null,
      label: 'All'
    }, {
      value: 0,
      label: 'Pending',
      typeCss: 'warning'
    }, {
      value: 1,
      label: 'Finalized',
      typeCss: 'success'
    }],
    CREATED_BY_OPTIONS: [{
      value: null,
      label: 'Everyone'
    }, {
      value: 1,
      label: 'Me'
    }],
    CONST_VALUE: 0.393701,
    MAX_VALUE: 106.6667
  },
  TABLES: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    DEFAULT_LIMIT_MINI: 10,
    DEFAULT_LIMIT_SIZES: [20, 50, 100],
    ORDER_ENTRY: {
      DEFAULT_SORT_COLUMN: 'orderNumber',
      DEFAULT_SORT_ORDER: 'desc',
      COLUMNS_MAP_SORT: {
        consignee: 'consigneeName'
      }
    },
    ORDER_DIRECTION: {
      descending: 'desc',
      ascending: 'asc',
    }
  },
  LOADING: {
    DEFAULT_CONFIG: {
      lock: true,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.5)'
    },
    FINALIZE_CONFIG: {
      lock: true,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.5)',
      text: 'Orders are being finalized. Please wait'
    },
    PRINT_CONFIG: {
      lock: true,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.5)',
      text: 'Labels are being printed. Please wait'
    },
    CHANGE_SHIPDATE_CONFIG: {
      lock: true,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.5)',
      text: 'Changing ship date, Please wait'
    }
  },
  MESSAGES: {
    LONG_DURATION: 60000
  },
  DATES: {
    DEFAULT_DISPLAY_FORMAT: 'MM/DD/YYYY',
    DEFAULT_DISPLAY_FORMAT_SHORT: 'MM/DD/YY',
    DEFAULT_BACKEND_FORMAT: 'YYYY-MM-DD'
  },
  HTTP_STATUS: {
    PRECONDITION_FAILED: 412,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403
  },
  HTTP_MESSAGES: {
    INVALID_TOKEN: 'Invalid Token'
  },
  SETTINGS: {
    shipDateFutureDays: 'shipDateFutureDays'
  }
};
export default constants;
