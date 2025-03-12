<script setup>
import { onMounted, computed } from "vue";
import { useTemplateStore } from "@/stores/template";


import BaseNavigation from "@/components/BaseNavigation.vue";

// SimpleBar, for more info and examples you can check out https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-vue
import SimpleBar from "simplebar";

// Grab menu navigation arrays
import menu from "@/data/menu";

const navigation = menu.main;

// Component properties
defineProps({
  withMiniNav: {
    type: Boolean,
    default: false,
    description: "If the sidebar is in Mini Nav Mode",
  },
});

// Main store
const store = useTemplateStore();

// Init SimpleBar (custom scrolling)
onMounted(() => {
  // new SimpleBar(document.getElementById("simplebar-sidebar"));
});


//light mode
// const toggleLightMode = () => {
//   store.darkMode({ mode: 'off' });
//   store.sidebarStyle({ mode: 'light' });

// };

const sidebarIcon = computed(() => store.settings.sidebarMini ? "fa-arrow-right" : "fa-arrow-left");

const toggleSidebar = () => {
  store.sidebarMini({ mode: 'toggle' })
};
// @click=""


</script>

<template>
  <!-- Sidebar -->
  <!--
    Sidebar Mini Mode - Display Helper classes

    Adding 'smini-hide' class to an element will make it invisible (opacity: 0) when the sidebar is in mini mode
    Adding 'smini-show' class to an element will make it visible (opacity: 1) when the sidebar is in mini mode
    If you would like to disable the transition animation, make sure to also add the 'no-transition' class to your element

    Adding 'smini-hidden' to an element will hide it when the sidebar is in mini mode
    Adding 'smini-visible' to an element will show it (display: inline-block) only when the sidebar is in mini mode
    Adding 'smini-visible-block' to an element will show it (display: block) only when the sidebar is in mini mode
  -->
  <nav
    id="sidebar"
    :class="{ 'with-mini-nav': withMiniNav }"
    aria-label="Main Navigation"
  >

    <slot>
      <!-- Side Header -->
      <div class="content-header">
        <slot name="header">
          <!-- Logo -->
          <RouterLink
            :to="{ name: 'auth-signin3' }"
            class="fw-semibold text-dual"
          >
            <span class="smini-visible">
              <i class="fa fa-circle-notch text-primary"></i>
            </span>
            <span class="smini-hide fs-5 tracking-wider">
              OneUI
              <span class="fw-normal">Vue</span>
            </span>
          </RouterLink>
          <!-- END Logo -->
        </slot>

        
      </div>
      <!-- END Side Header -->

      <!-- Sidebar Scrolling -->
      <div id="simplebar-sidebar" class="js-sidebar-scroll">
        <slot name="content">
          <!-- Side Navigation -->
          <div class="content-side">
            <BaseNavigation :nodes="navigation" />
          </div>
          <!-- END Side Navigation -->
        </slot>
      </div>
      <!-- END Sidebar Scrolling -->

      <!-- Sidebar Toggle Button -->
      <button
    type="button"
    class="btn btn-sm btn-alt-primary sidebar-toggle-btn"
    @click="toggleSidebar"

  >

<!-- set the arrow to change direction when the sidebar is collapsed -->
    <!-- <i :class="['fa fa-fw', store.sidebarMini ? 'fa-arrow-left' : 'fa-arrow-left']">
       -->
        <i :class="`fa fa-fw ${sidebarIcon}`"></i>
  </button>
  
      <!-- END Sidebar Toggle Button -->
    </slot>

  </nav>
  <!-- END Sidebar -->
</template>


<style scoped>
.sidebar-toggle-btn {
  /* position: absolute; */
  position: fixed;
  top: 5%;
  transform: translateY(-50%);
  right: -9px; /* Adjust for placement on border */
  z-index: 1001; /* Ensure it stays on top */
  /* Optional: Makes it circular; */
  border-radius: 90%; 
  padding: 5px 5px;
  /* background-color: transparent;Match sidebar background */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* Subtle shadow */
  border-color: #082542;
color:#fff;
background-color: hsla(210, 51%, 26%, 0.9);
}
.sidebar-toggle-btn:hover{
  background-color: rgba(0,0,0,0.3);
}

#sidebar.with-mini-nav .sidebar-toggle-btn {
  right: -30px; /* Adjust if the sidebar is collapsed */
}

</style>
