export default {
  route: {
    dashboard: 'Dashboard',
    table: 'Table',
    tree: 'Tree',
    customerServices: 'Customer Services',
    customerMaster: 'Customer Master',
    billingRating: 'Billing and Rating',
    claims: 'Claims',
    collections: 'Collections',
    warehouse: 'Warehouse',
    shipments: 'Shipments',
    uploadXmlFiles: 'Upload XML Files',
    extensionRequest: 'Extension Request',
    orderEntry: 'Order Entry',
    floorPlan: 'Floor Plan',
    palletManagement: 'Pallet Management',
    receivingExtensions: 'Receiving and Extensions',
    loading: 'Loading',
    routing: 'Routing',
    reports: 'Reports',
    systemSetupAdmin: 'System Setup and Admin',
    form: 'Form',
    externalLink: 'External Link',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard'
  },
  login: {
    title: 'Login Form',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password'
  },
  dashboard: {
    name: 'Name',
    roles: 'Roles'
  },
  days: {
    mondayShort: 'Mo',
    tuesdayShort: 'Tu',
    wednesdayShort: 'We',
    thursdayShort: 'Th',
    fridayShort: 'Fr',
    saturdayShort: 'Sa',
    sundayShort: 'Su'
  },
  common: {
    actions: 'Actions',
    options: 'Options',
    unitID: 'UnitID',
    consigneeAccount: 'Consignee Account',
    consigneeName: 'Consignee Name',
    daysOfService: 'Days of Service',
    message: 'Message',
    fileName: 'File Name',
    orderNumber: 'Order Number',
    orderNumberShort: 'Order #',
    shipdate: 'Ship Date',
    shipper: 'Shipper',
    move: 'Move',
    ok: 'Ok',
    yes: 'Yes',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    totalUnitsInFile: 'Total Units In File',
    totalUnitsSuccess: 'Total Units Success',
    totalUnitsDuplicates: 'Total Units Duplicates',
    totalUnitsDiscrepancy: 'Total Units Discrepancy',
    unitsInFile: 'Units In File',
    unitsSuccess: 'Units Success',
    unitsDuplicates: 'Units Duplicates',
    unitsDiscrepancy: 'Units Discrepancy',
    errorMessage: 'Error Message',
    errorServer: 'An error has occurred and the transaction could not be processed.',
    invalid: 'Invalid',
    continue: 'Continue',
    cancel: 'Cancel',
    save: 'Save',
    closeDialogGenericMessage: 'Are you sure to close this dialog?',
    notAbleToFindRecords: 'It seems that we\'re not able to find any records. Please try different filters',
    delete: 'Delete'
  },
  uploadXmlFiles: {
    uploadShipmentTitle: 'Upload Shipment',
    explanation: 'Explanation',
    explanationText: 'This screen allows you to upload an XML file with your shipment information. To do so, just drag and drop the file into the dotted area below and wait a couple of seconds. Once the file is processed, the XML response will be displayed on this same screen. Keep in mind that just one file can be uploaded at a time.',
    yourFilesOr: 'Your Files or',
    browse: 'browse',
    dragAndDrop: 'drag & drop',
    youCanDownload: 'You can download an empty template from ',
    here: 'here',
    xmlResponse: 'XML Response',
    uploadSuccess: 'The file has been uploaded successfully.',
    errorExtension: 'The file must be xml',
    fileSizeExceed: 'The file can not exceed 5M',
    failedUnits: 'Failed Units',
    unitIds: 'Unit Ids'
  },
  noUserConfig: {
    welcome: 'Welcome',
    explanation: 'To Aelis 4. We\'re setting up your account, please check back soon...'
  },
  warehouse: {
    orderEntry: {
      accounts: {
        addConsigneeShipperRelationConfirm: 'You are about to set a relationship with the consignee selected. Are you sure you want to continue?',
        addConsigneeShipperRelationSuccess: 'You are now all set to send the shipment information for the consignee selected.',
        enterConsigneeCustomerAccount: 'Enter Consignee Name / Customer Account Number',
        shipperConsignee: 'Add Consignee',
        addConsigneeShipperRelationExplanation: 'Select the consignee that you wish to associate with your shipper',
        consigneeDontHaveDaysOfService: 'This consignee does not have days of service for the coming week'
      },
      title: 'Order Entry',
      addOrder: 'Add Order',
      wholesaler: 'Wholesaler',
      consignee: 'Consignee',
      unitOfMeasure: 'Unit of Measure',
      unitOfMeasureShort: 'UoM',
      qtyBoxes: 'Qty Boxes',
      qtyBoxesShort: 'Qty',
      measure: 'Measure',
      shipDate: 'Ship Date',
      newShipDate: 'New Ship Date',
      shipDateShort: 'SD',
      numberOfUnits: 'Number of Units',
      numberOfUnitsShort: '# of Units',
      units: 'Units',
      findUnit: 'Find by Unit Id',
      length: 'Length',
      width: 'Width',
      height: 'Height',
      product: 'Prod.',
      productLong: 'Product',
      productDescription: 'Product Description',
      poNumber: 'PO #',
      farmName: 'Farm Name',
      farmBroker: 'Farm / Broker',
      searchSection: 'Search Section',
      aelTerminal: 'AEL Terminal',
      terminal: 'Terminal',
      status: 'Status',
      owner: 'Owner',
      createdBy: 'Created By',
      finalized: 'Finalized',
      edit: 'Edit',
      delete: 'Delete',
      details: 'Details',
      print: 'Print',
      search: 'Search',
      addConsignee: 'Add Consignee',
      clear: 'Clear',
      orderNumber: 'Order Number',
      orderNumberShort: 'Order #',
      orderSummary: 'Order Summary',
      cutOffTimeRemaining: 'Time remaining to complete Data Entry for ',
      cutOffTimeEndFull: 'Data Entry for Ship Date [ship date] is Closed. Please contact support@armellini.com if you need to make changes',
      cutOffTimeEndFirst: 'Data Entry for Ship Date ',
      cutOffTimeEndLast: ' is Closed. Please contact support@armellini.com if you need to make changes',
      finalizeConfirmation: 'You are about to finalize all pending shipments. Are you sure you want to continue?',
      finalizeShipments: 'Finalize Shipments',
      printLabels: 'Print Labels',
      changeShipDate: 'Change Ship Date',
      changeShipDateShipmentsMoved: '<b> [totalShipmentsMoved] shipments</b> moved to [shipDate]',
      changeShipDateCurrentDateMovedConfirm: 'Cutoff has passed for the current ship date [shipDate]. Are you sure you want to change the date?',
      changeShipDatenewDateMovedConfirm: ' Cutoff has passed for the new ship date [shipDate]. Are you sure you want to change the date?',
      deleteConfirmation: 'You are about to delete [numberUnits] units from [shipDate]. Are you sure you want to continue?',
      unitDeleteConfirmation: 'You are about to delete unit [id] from [shipDate]. Are you sure you want to continue?',
      lastUnitDeleteConfirmation: 'You are about to delete the last unit in this order. This will also delete the order. Are you sure you want to continue?',
      unitsDetailTitle: 'Details',
      extensions: {
        titleSummary: 'Order Extensions Summary',
        requestExtension: 'Request Extension',
        cancelExtension: 'Cancel Extension',
        extend: 'Extend',
        request: 'Extension Request'
      },
      error: {
        consigneeRequired: 'The Consignee is required',
        unitOfMeasureRequired: 'The Unit of Measure is required',
        shipDateRequired: 'The Ship Date is required',
        newShipDateRequired: 'The New Ship Date is required',
        lengthRequired: 'The Length is required',
        widthRequired: 'The Width is required',
        heightRequired: 'The Height is required',
        numberUnitsRequired: 'The Number of Units is required',
        maxValueValidationError: 'The cubes per unit must be between [minValue] and [max_value].Please send valid dimensions for the unit',
        minValueValidationError: '[unit] units will be charged at [minValue] cubes since they are less than the minimum cubes allowed to be transported.'
      }
    }
  },
  extensionRequest: {
    title: 'Extension Request',
    FAQ: 'Do you have questions?',
    searchSection: 'Search Section',
    submit: 'Submit',
    aelTerminal: 'AEL Terminal',
    shipper: 'Shipper',
    orderNumber: ' Order Number',
    extensionStatus: 'Extension Status',
    receivingDate: 'Receiving Date',
    none: 'None',
    dateFormat: 'MM/DD/AA',
    extensionHash: 'Extension #',
    shipperNameAndAccount: 'Shipper Name And Account',
    shipperAccount: 'Shipper Account',
    extensionTime: 'Extension Time',
    units: 'Units',
    shipperContact: 'Shipper Contact',
    requestDate: 'Request Date',
    status: 'Status',
    options: 'Options',
    extensionDetails: 'Extension Details',
  },
  shipperComponent: {
    shipperList: 'Shipper List'
  },
  noRoleConfigured: {
    defaultMessage: 'You don`t have Role or Group Configured in Auth0, please contact the administrator.'
  },
  signUp: {
    default: 'Sign Up',
    thankYou: 'Thank You',
    explanation: 'We are processing your request...',
    explanationFragment: 'You will receive an email when it is ready.',
    placeHolders: {
      email: 'Enter your Email',
      fullName: 'Enter your Full Name',
      shipperAccountCode: 'Enter only your Shipper Account Code',
      password: 'Enter your Password',
      passwordCheck: 'Enter your Password again',
      confirm: 'Confirm your Password'
    },
    errors: {
      passwordRequired: 'The Password is required',
      passwordCheckRequired: 'Please input the password again',
      passwordDontMatch: 'Passwords don\'t match',
      passwordTooWeak: 'Password too weak, must have 8 characters (a-z), (A-Z), (0-9) and Special Characters (!@#$%ˆ&*)',
      emailRequired: 'The Email is required',
      emailValid: 'Please enter a valid email address',
      shipperAccountCode: 'The Shipper Account Code is required',
      fullName: 'The Full Name is required'
    }
  }
};
