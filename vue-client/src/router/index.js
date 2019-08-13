import Vue from 'vue';
import Router from 'vue-router';
import auth from '@/utils/auth/auth0Service';
import authRoles from '@/utils/auth/roles';
import constants from '@/utils/constants';
import store from '@/store';

/* Layout */
import Layout from '../views/layout/Layout';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
* */
export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/warehouse/orderEntry',
    name: 'warehouse',
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    meta: {
      title: 'customerServices', icon: 'example', requiresAuth: true, roles: []
    },
    children: [{
      path: 'index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'dashboard', icon: 'example', requiresAuth: true, roles: []
      }
    }]
  },
  {
    path: '/customerServices',
    component: Layout,
    redirect: '/customerServices/customerMaster',
    name: 'customerServices',
    meta: {
      title: 'customerServices', icon: 'example', requiresAuth: true, roles: []
    },
    children: [
      {
        path: 'customerMaster',
        name: 'customerMaster',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'customerMaster', icon: 'table', requiresAuth: true, roles: [authRoles.INTERNAL, authRoles.ADMIN]
        }
      },
      {
        path: 'billingRating',
        name: 'billingRating',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'billingRating', icon: 'tree', requiresAuth: true, roles: [authRoles.INTERNAL, authRoles.ADMIN]
        }
      },
      {
        path: 'claims',
        name: 'claims',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'claims', icon: 'tree', requiresAuth: true, roles: [authRoles.INTERNAL, authRoles.ADMIN]
        }
      },
      {
        path: 'collections',
        name: 'collections',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'collections', icon: 'tree', requiresAuth: true, roles: [authRoles.INTERNAL, authRoles.ADMIN]
        }
      }
    ]
  },
  {
    path: '/warehouse',
    component: Layout,
    redirect: '/warehouse/orderEntry',
    name: 'warehouse',
    meta: {
      title: 'shipments', icon: 'Warehouse', requiresAuth: true, roles: [authRoles.INTERNAL, authRoles.SHIPPER, authRoles.ADMIN]
    },
    children: [
      {
        path: 'orderEntry',
        name: 'orderEntry',
        component: () => import('@/views/warehouse/orderEntry/index'),
        meta: {
          title: 'orderEntry',
          icon: 'Order-Entry',
          requiresAuth: true,
          roles: [authRoles.INTERNAL, authRoles.SHIPPER, authRoles.ADMIN]
        }
      },
      {
        path: 'uploadXmlFiles',
        name: 'uploadXmlFiles',
        component: () => import('@/views/warehouse/uploadXml/index'),
        meta: {
          title: 'uploadXmlFiles',
          icon: 'XML',
          requiresAuth: true,
          roles: [authRoles.INTERNAL, authRoles.SHIPPER, authRoles.ADMIN]
        }
      },
      {
        path: 'extensionRequest',
        name: 'extensionRequest',
        component: () => import('@/views/warehouse/extensionRequest/index'),
        meta: {
          title: 'extensionRequest',
          icon: 'Extension-Request',
          requiresAuth: true,
          roles: [authRoles.INTERNAL]
        }
      },
      {
        path: 'floorPlan',
        name: 'floorPlan',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'floorPlan', icon: 'tree', requiresAuth: true, roles: []
        }
      },
      {
        path: 'palletManagement',
        name: 'palletManagement',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'palletManagement', icon: 'tree', requiresAuth: true, roles: []
        }
      },
      {
        path: 'receivingExtensions',
        name: 'receivingExtensions',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'receivingExtensions', icon: 'tree', requiresAuth: true, roles: []
        }
      },
      {
        path: 'loading',
        name: 'loading',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'loading', icon: 'tree', requiresAuth: true, roles: []
        }
      }
    ]
  },
  {
    path: '/routing',
    component: Layout,
    meta: {
      title: 'routing', icon: 'form', requiresAuth: true, roles: []
    },
    children: [
      {
        path: 'index',
        name: 'routing',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'routing', icon: 'form', requiresAuth: true, roles: [authRoles.INTERNAL, authRoles.ADMIN]
        }
      }
    ]
  },
  {
    path: '/reports',
    component: Layout,
    meta: {
      title: 'reports', icon: 'form', requiresAuth: true, roles: []
    },
    children: [
      {
        path: 'index',
        name: 'reports',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'reports', icon: 'form', requiresAuth: true, roles: [authRoles.INTERNAL, authRoles.ADMIN]
        }
      }
    ]
  },
  {
    path: '/systemSetupAdmin',
    component: Layout,
    meta: {
      title: 'systemSetupAdmin', icon: 'form', requiresAuth: true, roles: []
    },
    children: [
      {
        path: 'index',
        name: 'systemSetupAdmin',
        component: () => import('@/views/dashboard/index'),
        meta: {
          title: 'systemSetupAdmin', icon: 'form', requiresAuth: true, roles: [authRoles.INTERNAL, authRoles.ADMIN]
        }
      }
    ]
  },
  {
    path: '/callback',
    name: 'callback',
    component: () => import('@/components/Callback/index')
  },
  {
    path: '/signUp*',
    name: 'signUp',
    component: () => import('@/views/signUp/SignUp')
  },
  {
    path: '/noUserConfig',
    component: Layout,
    children: [{
      path: 'index',
      name: 'noRole',
      component: () => import('@/views/noUserConfig/index'),
      meta: {
        title: 'dashboard', icon: 'example', requiresAuth: false, roles: []
      }
    }]
  },
  { path: '*', redirect: '/', hidden: true }
];

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

router.beforeEach(async (to, from, next) => {
  document.title = constants.ROUTER.PAGE_TITLE;

  const meta = to.meta || {};
  const routeRequiredRoles = meta.roles || [];
  const hasRequiredRole = routeRequiredRoles.length && routeRequiredRoles.some(role => store.getters.user.roles.includes(role));
  const requiresAuth = meta.requiresAuth || false;

  let target = to.path;
  if (!requiresAuth || ((auth.isAuthenticated()) && hasRequiredRole)) {
    if (meta.actionBefore) {
      await store.dispatch(meta.actionBefore);
    }
    return next();
  }

  if (auth.isAuthenticated() && (!store.getters.user.roles.length)) {
    return next(constants.ROUTER.PATH.NO_CONFIG_USER);
  }

  if (auth.isAuthenticated() && !hasRequiredRole) {
    target = constants.ROUTER.PATH.DASHBOARD;
  }

  auth.login({ target });
});

export default router;
