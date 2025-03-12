<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
// Grab example data
import notifications from "@/data/notifications";

const authStore = useAuthStore();

// Main store and Router
const store = useTemplateStore();
const router = useRouter();

// Reactive variables
const baseSearchTerm = ref("");

// On form search submit functionality
function onSubmitSearch() {
  router.push("/backend/pages/generic/search?" + baseSearchTerm.value);
}

// When ESCAPE key is hit close the header search section
function eventHeaderSearch(event) {
  if (event.which === 27) {
    event.preventDefault();
    store.headerSearch({ mode: "off" });
  }
}

// Attach ESCAPE key event listener
onMounted(() => {
  document.addEventListener("keydown", eventHeaderSearch);
});

// Remove keydown event listener
onUnmounted(() => {
  document.removeEventListener("keydown", eventHeaderSearch);
});

// const removeToken(){
//   console.log("removed the token");

//   localStorage.setItem('token', '');

// }

const logout = async () => {
  console.log("Logout function is being called"); // Debugging
  const authStore = useAuthStore(); // Get the auth store

  try {
    console.log("Attempting to send logout request...");
    // removeToken();
    const response = await axios.delete("/v1/auth/refresh");
    console.log("API Response:", response);

    authStore.removeToken();

    // set the token to ""
    // localStorage.setItem("token", "");
    // localStorage.clear();
    // // localStorage.removeItem("token"); // to remove the user from the local storage right way but not working

    // redirect to sign in page
    router.push("/signin"); // redirect to sign in page
    console.log("Logged out successfully");



  } catch (error) {
    if (error.response?.data?.errorPayload) {
      error.value = error.response.data.errorPayload.errors || {};
    } else {
      console.log("what error n", error);
    }
  }
};
</script>

<template>
  <!-- Header -->
  <header id="page-header">
    <slot>
      <!-- Header Content -->
      <div class="content-header">
        <slot name="content">
          <!-- Left Section -->
          <div class="d-flex align-items-center">
            <slot name="content-left">
              <!-- Toggle Sidebar -->
              <button
                type="button"
                class="btn btn-sm btn-alt-secondary me-2 d-lg-none"
                @click="store.sidebar({ mode: 'toggle' })"
              >
                <i class="fa fa-fw fa-bars"></i>
              </button>

              <!-- 
              <button
                  type="button"
                  class="btn btn-sm btn-alt-secondary mb-3 col"
                  @click="
                    () => {
                      store.sidebar({ mode: 'toggle' });
                    }
                  "
                >
                <i class= "fa fa-fw fa-arrow-left"></i>
                </button> -->

              <!-- END Toggle Sidebar -->

              <!-- Open Search Section (visible on smaller screens) -->
              <button
                type="button"
                class="btn btn-sm btn-alt-secondary d-md-none"
                @click="store.headerSearch({ mode: 'on' })"
              >
                <i class="fa fa-fw fa-search"></i>
              </button>

              <!-- END Open Search Section -->

              <!-- Search Form (visible on larger screens) -->
              <!-- <form
                class="d-none d-md-inline-block"
                @submit.prevent="onSubmitSearch"
              >
                <div class="input-group input-group-sm">
                  <input
                    type="text"
                    class="form-control form-control-alt"
                    placeholder="Search.."
                    id="page-header-search-input2"
                    name="page-header-search-input2"
                    v-model="baseSearchTerm"
                  />
                  <span class="input-group-text border-0">
                    <i class="fa fa-fw fa-search"></i>
                  </span>
                </div>
              </form> -->
              <!-- END Search Form -->
            </slot>
          </div>
          <!-- END Left Section -->

          <!-- Right Section -->
          <div class="d-flex align-items-center">
            <slot name="content-right">
              <!-- User Dropdown -->

              <!-- themes -->
              <div>
                <slot name="header-extra">
                  <!-- Dark Mode -->
                  <div class="dropdown d-inline-block mx-1">
                    <button
                      type="button"
                      class="btn btn-sm btn-alt-secondary col"
                      id="sidebar-dark-mode-dropdown"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i
                        v-if="!store.settings.darkModeActive"
                        class="far fa-fw fa-moon"
                      ></i>
                      <i
                        v-if="store.settings.darkModeActive"
                        class="fa fa-fw fa-moon"
                      ></i>
                    </button>
                    <div
                      class="dropdown-menu dropdown-menu-end smini-hide border-0"
                      aria-labelledby="sidebar-dark-mode-dropdown"
                    >
                      <button
                        @click="() => store.darkMode({ mode: 'off' })"
                        type="button"
                        class="dropdown-item d-flex align-items-center gap-2"
                        :class="{ active: !store.settings.darkMode === 'off' }"
                      >
                        <i class="far fa-sun fa-fw opacity-50"></i>
                        <span class="fs-sm fw-medium">Light</span>
                      </button>

                      <button
                        @click="() => store.darkMode({ mode: 'on' })"
                        type="button"
                        class="dropdown-item d-flex align-items-center gap-2"
                        :class="{ active: store.settings.darkMode === 'on' }"
                      >
                        <i class="far fa-moon fa-fw opacity-50"></i>
                        <span class="fs-sm fw-medium">Dark</span>
                      </button>
                      <button
                        @click="() => store.darkMode({ mode: 'system' })"
                        type="button"
                        class="dropdown-item d-flex align-items-center gap-2"
                        :class="{
                          active: store.settings.darkMode === 'system',
                        }"
                      >
                        <i class="fa fa-desktop fa-fw opacity-50"></i>
                        <span class="fs-sm fw-medium">System</span>
                      </button>
                    </div>
                  </div>
                  <!-- END Dark Mode -->

                  <!-- Options -->
                  <!-- <div class="dropdown d-inline-block ms-1">
                    <button
                      type="button"
                      class="btn btn-sm btn-alt-secondary col"
                      id="sidebar-themes-dropdown"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fa fa-fw fa-brush"></i>
                    </button>

                    <div
                      class="dropdown-menu dropdown-menu-end fs-sm smini-hide border-0"
                      aria-labelledby="sidebar-themes-dropdown"
                    > -->
                  <!-- Color Themes -->
                  <!-- <button
                        @click="store.setColorTheme({ theme: '' })"
                        type="button"
                        class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
                        :class="{ active: store.settings.colorTheme === '' }"
                      >
                        <span>Default</span>
                        <i class="fa fa-circle text-default"></i>
                      </button>
                      <button
                        @click="store.setColorTheme({ theme: 'amethyst' })"
                        type="button"
                        class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
                        :class="{
                          active: store.settings.colorTheme === 'amethyst',
                        }"
                      >
                        <span>Amethyst</span>
                        <i class="fa fa-circle text-amethyst"></i>
                      </button>
                      <button
                        @click="store.setColorTheme({ theme: 'city' })"
                        type="button"
                        class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
                        :class="{
                          active: store.settings.colorTheme === 'city',
                        }"
                      >
                        <span>City</span>
                        <i class="fa fa-circle text-city"></i>
                      </button>
                      <button
                        @click="store.setColorTheme({ theme: 'flat' })"
                        type="button"
                        class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
                        :class="{
                          active: store.settings.colorTheme === 'flat',
                        }"
                      >
                        <span>Flat</span>
                        <i class="fa fa-circle text-flat"></i>
                      </button>
                      <button
                        @click="store.setColorTheme({ theme: 'modern' })"
                        type="button"
                        class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
                        :class="{
                          active: store.settings.colorTheme === 'modern',
                        }"
                      >
                        <span>Modern</span>
                        <i class="fa fa-circle text-modern"></i>
                      </button>
                      <button
                        @click="store.setColorTheme({ theme: 'smooth' })"
                        type="button"
                        class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
                        :class="{
                          active: store.settings.colorTheme === 'smooth',
                        }"
                      >
                        <span>Smooth</span>
                        <i class="fa fa-circle text-smooth"></i>
                      </button> -->
                  <!-- END Color Themes -->

                  <!-- <template v-if="!store.settings.darkModeActive">
                        <div class="dropdown-divider"></div> -->

                  <!-- Sidebar Styles -->
                  <!-- 
                        <button
                          @click="store.sidebarStyle({ mode: 'light' })"
                          type="button"
                          class="dropdown-item fw-medium"
                          :class="{ active: !store.settings.sidebarDark }"
                        >
                          <span>Sidebar Light</span>
                        </button>
                        <button
                          @click="store.sidebarStyle({ mode: 'dark' })"
                          type="button"
                          class="dropdown-item fw-medium"
                          :class="{ active: store.settings.sidebarDark }"
                        >
                          <span>Sidebar Dark</span>
                        </button>
                        < END Sidebar Styles -->

                  <!-- <div class="dropdown-divider"></div> -->

                  <!-- Header Styles -->
                  <!-- <button
                          @click="store.headerStyle({ mode: 'light' })"
                          type="button"
                          class="dropdown-item fw-medium"
                          :class="{ active: !store.settings.headerDark }"
                        >
                          <span>Header Light</span>
                        </button>
                        <button
                          @click="store.headerStyle({ mode: 'dark' })"
                          type="button"
                          class="dropdown-item fw-medium"
                          :class="{ active: store.settings.headerDark }"
                        >
                          <span>Header Dark</span>
                        </button> -->

                  <!-- END Header Styles -->
                  <!-- </template>
                    </div>
                  </div> -->
                  <!-- END Options -->
                </slot>

                <!-- Close Sidebar, Visible only on mobile screens -->
                <button
                  type="button"
                  class="d-lg-none btn btn-sm btn-alt-secondary ms-1"
                  @click="store.sidebar({ mode: 'close' })"
                >
                  <i class="fa fa-fw fa-times"></i>
                </button>
                <!-- END Close Sidebar -->
              </div>
              <!-- END themes -->

              <!-- Notifications Dropdown -->
              <div class="dropdown d-inline-block ms-2">
                <button
                  type="button"
                  class="btn btn-sm btn-alt-secondary space-x-1"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fa fa-fw fa-bell"></i>
                  <span v-if="notifications.length > 0" class="text-primary"
                    >•</span
                  >
                </button>
                <div
                  class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 border-0 fs-sm"
                  aria-labelledby="page-header-notifications-dropdown"
                >
                  <div
                    class="p-2 bg-body-light border-bottom text-center rounded-top"
                  >
                    <h5 class="dropdown-header text-uppercase">
                      Notifications
                    </h5>
                  </div>
                  <ul class="nav-items mb-0">
                    <li
                      v-for="(notification, index) in notifications"
                      :key="`notification-${index}`"
                    >
                      <a
                        class="text-dark d-flex py-2"
                        :href="`${notification.href}`"
                      >
                        <div class="flex-shrink-0 me-2 ms-3">
                          <i :class="`${notification.icon}`"></i>
                        </div>
                        <div class="flex-grow-1 pe-2">
                          <div>
                            {{ notification.title }}
                          </div>
                          <span class="fw-medium text-muted">
                            {{ notification.time }}
                          </span>
                        </div>
                      </a>
                    </li>
                    <li v-if="!notifications.length" class="p-2">
                      <div
                        class="alert alert-light d-flex align-items-center space-x-2 mb-0"
                        role="alert"
                      >
                        <i class="fa fa-exclamation-triangle opacity-50"></i>
                        <p class="mb-0">No new ones!</p>
                      </div>
                    </li>
                  </ul>
                  <div
                    v-if="notifications.length > 0"
                    class="p-2 border-top text-center"
                  >
                    <a
                      class="d-inline-block fw-medium"
                      href="javascript:void(0)"
                    >
                      <i class="fa fa-fw fa-arrow-down me-1 opacity-50"></i>
                      Load More..
                    </a>
                  </div>
                </div>
              </div>
              <!-- END Notifications Dropdown -->

              <div class="dropdown d-inline-block ms-2">
                <button
                  type="button"
                  class="btn btn-sm btn-alt-secondary d-flex align-items-center"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    class="rounded-circle"
                    src="/assets/media/avatars/avatar10.jpg"
                    alt="Header Avatar"
                    style="width: 21px"
                  />
                  <span class="d-none d-sm-inline-block ms-2">John</span>
                  <i
                    class="fa fa-fw fa-angle-down d-none d-sm-inline-block opacity-50 ms-1 mt-1"
                  ></i>
                </button>
                <div
                  class="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0"
                  aria-labelledby="page-header-user-dropdown"
                >
                  <div
                    class="p-3 text-center bg-body-light border-bottom rounded-top"
                  >
                    <img
                      class="img-avatar img-avatar48 img-avatar-thumb"
                      src="/assets/media/avatars/avatar10.jpg"
                      alt="Header Avatar"
                    />
                    <p class="mt-2 mb-0 fw-medium">John Smith</p>
                    <p class="mb-0 text-muted fs-sm fw-medium">Web Developer</p>
                  </div>
                  <div class="p-2">
                    <a
                      class="dropdown-item d-flex align-items-center justify-content-between"
                      href="javascript:void(0)"
                    >
                      <span class="fs-sm fw-medium">Inbox</span>
                      <span class="badge rounded-pill bg-primary ms-2">3</span>
                    </a>
                    <RouterLink
                      :to="{ name: 'dashboard' }"
                      class="dropdown-item d-flex align-items-center justify-content-between"
                    >
                      <span class="fs-sm fw-medium">Profile</span>
                      <span class="badge rounded-pill bg-primary ms-2">1</span>
                    </RouterLink>
                    <a
                      class="dropdown-item d-flex align-items-center justify-content-between"
                      href="javascript:void(0)"
                    >
                      <span class="fs-sm fw-medium">Settings</span>
                    </a>
                  </div>
                  <div role="separator" class="dropdown-divider m-0"></div>
                  <div class="p-2">
                    <RouterLink
                      :to="{ name: 'dashboard' }"
                      class="dropdown-item d-flex align-items-center justify-content-between"
                    >
                      <span class="fs-sm fw-medium">Lock Account</span>
                    </RouterLink>
                    <div
                      type="button"
                      class="dropdown-item d-flex align-items-center justify-content-between"
                    >
                      <span class="fs-sm fw-medium" @click="logout"
                        >Log Out</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <!-- END User Dropdown -->
            </slot>
          </div>
          <!-- END Right Section -->
        </slot>
      </div>
      <!-- END Header Content -->

      <!-- Header Search -->
      <div
        id="page-header-search"
        class="overlay-header bg-body-extra-light"
        :class="{ show: store.settings.headerSearch }"
      >
        <div class="content-header">
          <form class="w-100" @submit.prevent="onSubmitSearch">
            <div class="input-group">
              <button
                type="button"
                class="btn btn-alt-danger"
                @click="store.headerSearch({ mode: 'off' })"
              >
                <i class="fa fa-fw fa-times-circle"></i>
              </button>
              <input
                type="text"
                class="form-control"
                placeholder="Search or hit ESC.."
                id="page-header-search-input"
                name="page-header-search-input"
                v-model="baseSearchTerm"
              />
            </div>
          </form>
        </div>
      </div>
      <!-- END Header Search -->

      <!-- Header Loader -->
      <div
        id="page-header-loader"
        class="overlay-header bg-body-extra-light"
        :class="{ show: store.settings.headerLoader }"
      >
        <div class="content-header">
          <div class="w-100 text-center">
            <i class="fa fa-fw fa-circle-notch fa-spin"></i>
          </div>
        </div>
      </div>
      <!-- END Header Loader -->
    </slot>
  </header>
  <!-- END Header -->
</template>
