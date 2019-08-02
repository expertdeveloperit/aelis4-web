<template>
  <div v-if="isVisible()" class="menu-wrapper">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
    >
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
          <item
            v-if="onlyOneChild.meta"
            :icon="onlyOneChild.meta.icon||item.meta.icon"
            :title="$t('route.' + onlyOneChild.meta.title)"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="$t('route.' + item.meta.title)" />
      </template>

      <template v-for="child in children">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
        <app-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <item
              v-if="child.meta"
              :icon="child.meta.icon"
              :title="$t('route.' + child.meta.title)"
            />
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import validator from 'validator';
import path from 'path';
import Item from './Item';
import AppLink from './Link';

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    children() {
      return this.item.children.filter(child => this.hasRoles(child));
    }
  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  methods: {
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        }
        // Temp set(will be used if only has one showing child)
        this.onlyOneChild = item;
        return true;
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath;
      }
      return path.resolve(this.basePath, routePath);
    },
    isExternalLink(routePath) {
      return validator.isURL(routePath);
    },
    hasRoles(item) {
      const routeRequiredRoles = (item.meta || {}).roles || [];
      return routeRequiredRoles.length && routeRequiredRoles.some(role => this.user.roles.includes(role));
    },
    isVisible() {
      return (!this.item.hidden && this.item.children)
        && this.hasRoles(this.item);
    }
  }
};
</script>
