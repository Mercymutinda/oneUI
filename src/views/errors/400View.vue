<script setup></script>

<template>
  <!-- Page Content -->
  <div class="hero">
    <div class="hero-inner text-center">
      <div class="bg-body-extra-light">
        <div class="content content-full overflow-hidden">
          <div class="py-4">
            <!-- Error Header -->
            <h1 class="display-1 fw-bolder text-default">400</h1>
            <h2 class="h4 fw-normal text-muted mb-5">
              We are sorry but your request contains bad syntax and cannot be
              fulfilled..
            </h2>
            <!-- END Error Header -->

            <!-- Search Form -->
            <form @submit.prevent>
              <div class="row justify-content-center mb-4">
                <div class="col-sm-6 col-xl-3">
                  <div class="input-group input-group-lg">
                    <input
                      class="form-control form-control-alt"
                      type="text"
                      placeholder="Search application.."
                    />
                    <button type="submit" class="btn btn-dark">
                      <i class="fa fa-search opacity-75"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <!-- END Search Form -->
          </div>
        </div>
      </div>
      <div class="content content-full text-muted fs-sm fw-medium">
        <!-- Error Footer -->
        <p class="mb-1">Would you like to let us know about it?</p>
        <a class="link-fx" href="javascript:void(0)">Report it</a> or
        <RouterLink :to="{ name: '' }" class="link-fx"
          >Go Back to Dashboard</RouterLink
        >
        <!-- END Error Footer -->
      </div>
    </div>
  </div>
  <!-- END Page Content -->
</template>
