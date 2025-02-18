<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import axios from "axios";
// import users from "@/data/usersDataset.json";
// Vue Dataset, for more info and examples you can check out https://github.com/kouts/vue-dataset/tree/next
import {
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow,
} from "vue-dataset";

// Get example data

const banners = ref([]); //store banner data
const showModal = ref(false); //set visibility of the modal
const errors = ref({}); // show errors if any

// storing new banner details
const newBanners = ref({
  id: "",
  title: "",
  description: "",
  file: "",
});
const createBanners = async () => {

  if (!newBanners.value.title) {
    errors.value.title = "Title is required";
  }
  if (!newBanners.value.description) {
    errors.value.description = "Description is required";
  }

  // If there are any errors, stop further execution
  if (errors.value.title || errors.value.description) {
    return;
  }
  const formData = new FormData();
  formData.append("id", newBanners.value.id);
  formData.append("title", newBanners.value.title);
  formData.append("description", newBanners.value.description);
  if (newBanners.value.file) {
    formData.append("file", newBanners.value.file);
  }

  // Sends a post request to the API  useing POST
  try {
    const response = await axios.post("/v1/library/banners", formData, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
    //refresh the list
    getBanners();
    showModal.value = false; //close the modal
    newBanners.value = {
      //resets the form
      id: "",
      title: "",
      description: "",
      file: "",
    };
    // console.log("My response", response);
  } catch (error) {
    console.error("Error response:", error.response);
    errors.value = error.response?.data?.errorPayload?.errors || {};
  }
};

// cols array  to define the columns in the table
const cols = reactive([
  {
    name: "ID",
    field: "id",
    sort: "",
  },
  {
    name: "Title",
    field: "title",
    sort: "",
  },
  {
    name: "Description",
    field: "description",
    sort: "",
  },
  {
    name: "Image",
    field: "image_url",
    sort: "",
  },
]);

//input changes and updates newBanners.value.file
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    newBanners.value.file = file;
  }
};
// Sort by functionality
const sortBy = computed(() => {
  return cols.reduce((acc, o) => {
    if (o.sort) {
      o.sort === "asc" ? acc.push(o.field) : acc.push("-" + o.field);
    }
    return acc;
  }, []);
});

// On sort th click
// handle the column sorting when a table header is clicked
function onSort(event, i) {
  let toset;
  const sortEl = cols[i];

  if (!event.shiftKey) {
    cols.forEach((o) => {
      if (o.field !== sortEl.field) {
        o.sort = "";
      }
    });
  }
}

// this will fetch the banners from backend API

const getBanners = async () => {
  try {
    const response = await axios.get("/v1/library/banners");
    console.log("API Response", response.data);
    banners.value = response.data.dataPayload.data; // update the banners.value with response data
  } catch (error) {
    console.error("Error fetching banners:", error);
  }
};

// resets the modal when its closed
const clearModal = () => {
  newBanners.value = {
    id: "",
    title: "",
    description: "",
    file: "",
  };
  errors.value = {};
};

//when component is mounted it'll fetch the list of banners
onMounted(() => {
  getBanners();
});
</script>

<style lang="scss" scoped>
.gg-select {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(1);
  width: 22px;
  height: 22px;
}
.gg-select::after,
.gg-select::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 8px;
  height: 8px;
  left: 7px;
  transform: rotate(-45deg);
}
.gg-select::before {
  border-left: 2px solid;
  border-bottom: 2px solid;
  bottom: 4px;
  opacity: 0.3;
}
.gg-select::after {
  border-right: 2px solid;
  border-top: 2px solid;
  top: 4px;
  opacity: 0.3;
}
th.sort {
  cursor: pointer;
  user-select: none;
  &.asc {
    .gg-select::after {
      opacity: 1;
    }
  }
  &.desc {
    .gg-select::before {
      opacity: 1;
    }
  }
}

/* Modal Styles */
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
}

.modal-header,
.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
}

.close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>

<template>
  

      <div v-if="showModal" class="modal-backdrop">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add a new banner</h5>
            <button type="button" class="close" @click="showModal = false">
              <span> &times;</span>
            </button>
          </div>

          <div class="modal-body">
            <input
              v-model="newBanners.title"
              placeholder="Title"
              class="form-control mb-2"
            />
            <div v-if="errors.title" class="text-danger">
              {{ errors.title }}
            </div>
            <input
              v-model="newBanners.description"
              placeholder="Description"
              class="form-control mb-2"
            />
            <div v-if="errors.description" class="text-danger">
              {{ errors.description }}
            </div>
            <input
              placeholder="Image"
              class="form-control mb-2"
              type="file"
              @change="onFileChange($event)"
              accept="images/*"
              capture
            />
            <div class="modal-footer justify-content-center">
              <button
                @click="createBanners"
                class="bg-primary text-white px-4 py-2 rounded"
              >
                Create Banner
              </button>
            </div>
          </div>
        </div>
      </div>
    <!-- </template> -->
  <!-- </BasePageHeading> -->
  <!-- END Hero -->

  <!-- Page Content -->
  <!-- Page Content -->
<div class="content">
  <BaseBlock content-full>
    <!-- Row containing title and "Add Banner" button -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3 class="mb-0">Vue Dataset</h3>
      <button class="btn btn-primary" @click="showModal = true">Add banner</button>
    </div>

    <!-- Table for displaying banners -->
    <Dataset
      v-slot="{ ds }"
      :ds-data="banners"
      :ds-sortby="sortBy"
      :ds-search-in="['id', 'title', 'description', 'image_url']"
    >
      <!-- Row containing page count and search bar -->
      <div class="d-flex justify-content-between align-items-center  mb-2">
        <DatasetShow class="fs-sm me-3" />
        <DatasetSearch class="ms-auto w-25" ds-search-placeholder="Search..." />
      </div>

      <hr />
      <div class="row">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-striped mb-0">
              <thead>
                <tr>
                  <th
                    v-for="(th, index) in cols"
                    :key="th.field"
                    :class="['sort', th.sort]"
                    @click="onSort($event, index)"
                  >
                    {{ th.name }} <i class="gg-select float-end"></i>
                  </th>
                </tr>
              </thead>
              <DatasetItem tag="tbody" class="fs-sm">
                <template #default="{ row, rowIndex }">
                  <tr>
                    <td style="min-width: 150px">{{ row.id }}</td>
                    <td>{{ row.title }}</td>
                    <td style="min-width: 150px">{{ row.description }}</td>
                    <td>
                      <img :src="row.image_url" style="width: 40px; height: auto" />
                    </td>
                  </tr>
                </template>
              </DatasetItem>
            </table>
          </div>
        </div>
      </div>
      <div class="d-flex flex-md-row flex-column justify-content-between align-items-center">
        <DatasetInfo class="py-3 fs-sm" />
        <DatasetPager class="flex-wrap py-3 fs-sm" />
      </div>
    </Dataset>
  </BaseBlock>
</div>
``
  <!-- END Page Content -->
</template>
