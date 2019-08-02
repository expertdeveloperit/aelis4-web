import authPermissions from '@/utils/auth/permissions';
import store from '@/store';

const CUTOFF_BEFORE_STR = 'before';
const CUTOFF_AFTER_STR = 'after';

/** *
*  This Mixin will evaluate the permission against the user role,
*  and if the permission was configure to validate cutoff and status, that values will be take in count.
*  The Permission has the following configuration
    "PERMISSION": {
        "name": "namePermission:module", <- This is the name of the permission configured on auth0
        "cutOffValidation": [null | "before" | "after"], <- Indicates if apply when cutoff is closed of before. Let Null if is not neccessary the validation.
        "applyOnOrderStatus": [null, 0, 1] <- Indicates in that status applies. (0: pending, 1: Finalized). Let Null if is not neccessary the validation.
    }
** */

/*
* Helper Method to get if the permission applies with the current cutoff .
*/
const isValidCutOffPermission = (permission) => {
  if (permission.cutOffValidation === CUTOFF_BEFORE_STR && !store.getters.orderEntry.cutoff.isClosed) {
    return true;
  }
  if (permission.cutOffValidation === CUTOFF_AFTER_STR && store.getters.orderEntry.cutoff.isClosed) {
    return true;
  }
  return false;
};

/*
* Helper Method to get if the permission applies with the current order status .
*/
const isValidStatusPermission = (permission, orderStatus) => orderStatus === permission.applyOnOrderStatus;

export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          permissions: authPermissions
        };
      },
      methods: {
        $can(permission, orderStatus) {
          /* Step 0: validate permission not null */
          if (!permission) {
            return false;
          }

          /* Step 1: Verify if user has the required permission */
          let hasCutoffPermission = true; // BY DEFAULT TRUE if cutOffValidation is null;
          let hasStatusPermission = true; // BY DEFAULT TRUE if applyOnOrderStatus is null;
          if (!store.getters.user.permissions.includes(permission.name)) {
            return false;
          }

          /* Step 2: Verify if the permission has cutOffValidation, if case must be validate if cutoff is after or before.
          Let Null if is not neccessary the validation. */
          if (permission.cutOffValidation != null) {
            hasCutoffPermission = isValidCutOffPermission(permission);
          }

          /* Step 3: Verify if the permission has applyOnOrderStatus, if case must be validate if orderStatus the same.
          Let Null if is not neccessary the validation. */
          if (permission.applyOnOrderStatus != null) {
            hasStatusPermission = isValidStatusPermission(permission, orderStatus);
          }

          return hasCutoffPermission && hasStatusPermission;
        }
      }
    });
  }
};
