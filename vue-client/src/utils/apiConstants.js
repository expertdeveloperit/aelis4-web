const apiConstants = {
  END_POINTS: {
    PRODUCT_SEARCH: '/data-entry/products',
    ORDER_ENTRY: {
      SHIPMENTS: '/data-entry/web-form/shipments',
      FINALIZE: '/data-entry/web-form/shipments/finalize',
      DELETE_UNIT: '/data-entry/web-form/shipments/units',
      CUTOFF: '/data-entry/web-form/shipments/cutoff',
      SETTINGS: '/data-entry/web-form/shipments/settings',
      CHANGE_SHIP_DATE: '/data-entry/web-form/shipments/change-ship-date',
      PRINT_UNIT: '/data-entry/web-form/shipments/units/print-label',
      PRINT_UNIT_CONSOLIDTAE: '/data-entry/web-form/shipments/print-labels',
      PRINT_SHIPPING_MANIFEST: '/data-entry/web-form/shipments/print-shipping-manifest'
    },
    ACCOUNTS: {
      DEFAULT: '/accounts',
      CONSIGNEE_BY_TYPE: '/accounts/consignees-by-shipper-type',
      CONSIGNEE_BY_SHIPPER: '/accounts/consignees-by-shipper',
      SHIPPERS: '/accounts/shippers',
      SIGN_UP_USER_SHIPPER: '/accounts/users',
      FARM_NAME_SEARCH: '/accounts/farm-shippers'
    },
    EXTENSIONS: {
      SUBMIT: '/receiving/extensions',
      SIGN_UP_USER_SHIPPER: '/accounts/users',
      SEARCH_EXTENSIONS: '/receiving/extensions'
    },
    WAREHOUSE: {
      WAREHOUSE_CODES: '/warehouse/warehouse-codes'
    }
  }
};
export default apiConstants;
