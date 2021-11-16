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
    <div class="container-fluid remove-padding border-bottom border-dark">
      <div class="d-flex justify-content-start">
        <div class="p-2 d-flex align-self-center">
          <i class="fa fa-plus publishpreview-fa-color"></i>
        </div>
        <div class="p-2 d-flex justify-content-start align-self-center mb-1">
          <div class="px-2">
            <img src="../assets/master/redo_24pxredo_back.svg" />
          </div>
          <div class="pl-1">
            <img src="../assets/master/redo_24pxredo_forward.svg" />
          </div>
        </div>
        <div class="p-2 d-flex flex-column align-items-stretch">
          <div class="p-1 publishpreview-font">
            <span>Font Family</span>
          </div>
          <div class="p-1 d-flex justify-content-start">
            <div class="">
              <select name="font-name" @change="getbalanceSheetResponse" v-model="fontSelected" class="form-control form-control-sm font-select">
                <option value="Courier" selected="selected">Courier</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times">Times</option>
              </select>
            </div>
          </div>
        </div>
        <div class="p-2 mb-1 d-flex flex-column align-self-end">
          <div class="d-flex">
            <div class="d-flex justify-content-start">
              <div class="p-2">
                <i class="fa fa-plus publishpreview-fa-color"></i>
              </div>
              <div class="p-2">
                <select class="form-control form-control-sm">
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                </select>
              </div>
              <div class="p-2">
                <i class="fa fa-minus publishpreview-fa-color"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="p-2">
          <div class="mt-2"><img src="../assets/master/LineStroke.svg" /></div>
        </div>
        <div class="p-2 d-flex flex-column align-items-stretch">
          <div class="p-1 publishpreview-font">
            <span>Color Pallet</span>
            <span class="ml-2"><i class="fa fa-angle-down"></i></span>
          </div>
          <div class="p-1 d-flex justify-content-start">
            <div class="p-1">
              <button type="button" @click="setHeaderColor('43acf7')" class="btn publishpreview-btn-palette publishpreview-btn-palette-blue"></button>
            </div>
            <div class="p-1">
              <button type="button" @click="setHeaderColor('5e4f4f')" class="btn publishpreview-btn-palette publishpreview-btn-palette-black"></button>
            </div>
            <div class="p-1">
              <button type="button" @click="setHeaderColor('bab7b7')" class="btn publishpreview-btn-palette publishpreview-btn-palette-dark-grey"></button>
            </div>
            <div class="p-1">
              <button type="button" @click="setHeaderColor('ffffff')" class="btn publishpreview-btn-palette publishpreview-btn-palette-light-grey"></button>
            </div>
          </div>
        </div>
        <div class="p-2">
          <div class="mt-2"><img src="../assets/master/LineStroke.svg" /></div>
        </div>
        <div class="p-2">
          <div class="mt-2">
            <img src="../assets/master/Group 554grp.png" />
          </div>
        </div>
        <div class="p-2 d-flex">
          <div class="mt-2 d-flex align-self-center">
            <i class="fa fa-angle-down"></i>
          </div>
        </div>
        <div class="p-2">
          <div class="mt-2"><img src="../assets/master/LineStroke.svg" /></div>
        </div>
        <div class="p-2 mb-1 d-flex flex-column align-self-end">
          <div class="d-flex">
            <div class="d-flex justify-content-start">
              <div class="p-2">
                <i class="fa fa-plus publishpreview-fa-color"></i>
              </div>
              <div class="p-2 zoom-percentage-input">
                <input type="text" readonly class="form-control form-control-sm" value="200 %" />
              </div>
              <div class="p-2">
                <i class="fa fa-minus publishpreview-fa-color"></i>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top:2rem" class="ml-auto mr-5">
          <div><a href="#" @click="firePopupforFileName" class=" btn btn-outline-primary">Save</a></div>
        </div>
      </div>
    </div>
    <vue-pdf-app :pdf="pdfData" theme="light" :config="config" :page-scale="page - height"></vue-pdf-app>
  </div>
</template>
<style scoped src="@/css/bootstrap.min.css"></style>

<script>
import VuePdfApp from 'vue-pdf-app';
import 'vue-pdf-app/dist/icons/main.css';
import Swal from 'sweetalert2';
export default {
  mounted() {
    this.getbalanceSheetResponse();
  },
  components: {
    VuePdfApp,
  },
  data() {
    return {
      disclosureDialog: false,
      addDisclosureDialog: false,
      pdfData: '',
      fontSelected: 'Courier',
      headerColor: '',
      title: '',
      template_id: this.$route.params.template_id,
      pdffilename: '',
      config: {
        toolbar: {
          toolbarViewerRight: false,
        },
      },
    };
  },

  methods: {
    async getbalanceSheetResponse() {
      try {
        this.headerColor = this.headerColor || '03a9f4';
        console.log(this.headerColor);
        var balanceSheetResponse = await this.$apiService.get(`/publish/balancesheet-notes-data?fontSelected=${this.fontSelected}&headerColor=${this.headerColor}`);
        this.pdfData = balanceSheetResponse.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    setHeaderColor(color) {
      this.headerColor = color;
      this.getbalanceSheetResponse();
    },
    proceedToFinaldocuments() {
      this.$router.push({ name: 'finaldocument' });
    },
    async firePopupforFileName() {
      const pdfvalue = await Swal.fire({
        title: 'Enter a Name for the PDF',
        input: 'text',
        inputLabel: 'PDF Name',
        inputValue: this.pdffilename,
        showCancelButton: true,
        inputValidator: async (value) => {
          if (!value) {
            return 'PDF Name cannot be empty!';
          }
        },
      });
      this.pdffilename = pdfvalue.value;
      if (pdfvalue.isConfirmed) {
        const userDetails = JSON.parse(sessionStorage.getItem('userData'));
        const reportid = sessionStorage.getItem('reportId');
        const savePDFDocument = await this.$apiService.post(`http://localhost:8080/publish/finaldocuments`, { report_id: reportid, template_id: this.template_id, reportname: this.pdffilename + '.pdf', reportdata: this.pdfData, financialyear: '2018-2019', approver: userDetails.username });
        if (savePDFDocument.data.status == 'success') {
          const success = await Swal.fire({
            title: 'Document has been saved to Final Documents',
            icon: 'success',
          });
          if (success.isConfirmed) {
            this.proceedToFinaldocuments();
          }
        }
      }
    },
  },
};
</script>
