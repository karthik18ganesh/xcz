<style>
.navbar-seshi {
  background-color: #404040;
}
.navbar-brand-color {
  color: #fff;
}
.publishpreview-fa-color {
  color: rgba(0, 0, 0, 0.54);
}
.publishpreview-font {
  color: #404040;
  text-align: left;
}
.font-select {
  width: 8rem !important;
}
.publishpreview-btn-palette {
  padding: 14px 24px;
  border: 0 none;
  height: 1.5rem;
}
.publishpreview-btn-palette-blue {
  background: #03a9f4 !important;
}
.publishpreview-btn-palette-black {
  background: #000 !important;
}
.publishpreview-btn-palette-dark-grey {
  background: #404040 !important;
}
.publishpreview-btn-palette-light-grey {
  background: #c4c4c433 !important;
}
.zoom-percentage-input {
  width: 80px !important;
}
.remove-padding {
  padding: 0 !important;
}
.btn-outline-primary {
  border-color: #299be4;
  color: #299be4;
}
</style>

<template>
  <div class="publishpreview h-100">
    <nav class="navbar navbar-seshi">
      <span class="navbar-brand navbar-brand-color mb-0 h1">Publish</span>
    </nav>
    <vue-pdf-app :pdf="pdfData" theme="light" :config="config" :page-scale="page - height"></vue-pdf-app>
  </div>
</template>
<style scoped src="@/css/bootstrap.min.css"></style>

<script>
import VuePdfApp from 'vue-pdf-app';
import 'vue-pdf-app/dist/icons/main.css';
export default {
  mounted() {
    //this.getbalanceSheetResponse();
  },
  components: {
    VuePdfApp,
  },
  data() {
    return {
      pdfData: this.$route.params.pdfdata,
      config: {
        toolbar: {
          toolbarViewerRight: false,
        },
      },
    };
  },
  methods: {},
};
</script>
