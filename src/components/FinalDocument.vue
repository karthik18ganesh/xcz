<style>
body {
  color: #566787;
  background: #f5f5f5;
  font-family: 'Varela Round', sans-serif;
  font-size: 13px;
}
.table-responsive {
  margin: 30px 0;
}
div.swal2-icon-content {
  display: none !important;
}
.table-wrapper {
  min-width: 1000px;
  background: #fff;
  padding: 20px 25px;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.table-title {
  padding-bottom: 15px;
  /* background: #299be4; */
  color: #fff;
  padding: 16px 30px;
  margin: -20px -25px 10px;
  border-radius: 3px 3px 0 0;
}
.table-title h2 {
  margin: 5px 0 0;
  font-size: 24px;
  color: #299be4;
}
.table-title .btn {
  float: right;
  font-size: 13px;
  border-radius: 2px;
  margin-left: 10px;
}
.btn-outline-primary {
  border-color: #299be4;
  color: #299be4;
}
.btn-info {
  background: #299be4;
}
.table thead th {
  text-align: center;
}
.fa-file-pdf-o {
  color: red;
}
thead {
  background: #bfb7b7;
}
.table-bordered td,
.table-bordered th {
  border: 0px solid #dee2e6 !important;
}
.navbar-seshi {
  background-color: #404040;
}
.navbar-brand-color {
  color: #fff;
}
.reportname {
  text-decoration: underline;
}
</style>
<template>
  <div class="finaldocument">
    <nav class="navbar navbar-seshi">
      <span class="navbar-brand navbar-brand-color mb-0 h1">Publish</span>
    </nav>
    <div class="container-fluid">
      <div class="table-responsive">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="row">
              <div class="col-sm-5">
                <h2><b>Final Document</b></h2>
              </div>
              <div class="col-sm-7">
                <router-link :to="{ name: 'publishpreviewonly', params: { pdfdata: pdfdata } }">
                  <button href="#" :disabled="checkedReportIds.length > 1 || checkedReportIds.length == 0" class="btn btn-outline-primary">Preview</button>
                </router-link>
                <a href="#" @click="downloadselectedPDF" class="btn btn-info">Download</a>
              </div>
            </div>
          </div>
          <table class="table table-bordered dt-responsive table-striped">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" id="masterCheck" value="checkUncheckAll" @click="checkUncheckAll($event)" />
                </th>
                <th>Name of the Document</th>
                <th>Financial Year</th>
                <th>Approver</th>
                <th>Date of Publish</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="finalDocsList in finalDocsList" :key="finalDocsList.id">
                <td><input type="checkbox" name="singlecheckbox" :value="finalDocsList.id" v-model="checkedReportIds" :id="finalDocsList.id" @click="check($event)" /></td>
                <td class="reportname">
                  <a>{{ finalDocsList.reportname }}</a>
                </td>
                <td>{{ finalDocsList.financialyear }}</td>
                <td>{{ finalDocsList.approver }}</td>
                <td>{{ finalDocsList.createddate.split('T')[0] }}</td>
                <td><a href="">Send Mail</a></td>
                <td>
                  <button @click="deletepdfdata(finalDocsList.id)"><i style="font-size:22px" class="fa fa-trash" aria-hidden="true"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped src="@/css/bootstrap.min.css"></style>
<script>
//import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';
export default {
  data: function() {
    return {
      finalDocsList: [],
      checkedReportIds: [],
      pdfdata: '',
    };
  },
  methods: {
    downloadselectedPDF() {
      if (this.checkedReportIds.length == 0) {
        return 'cannot download any pdf';
      }
      this.checkedReportIds.forEach((reportid) => {
        const pdfdata = this.finalDocsList.filter((ele) => {
          return ele.id == reportid;
        });
        var a = document.createElement('a');
        a.href = pdfdata[0].reportdata;
        a.download = pdfdata[0].reportname;
        a.click();
      });
    },
    check: function(e) {
      if (e.target.checked) {
        if (this.checkedReportIds.indexOf(e.target.value) === -1) {
          this.checkedReportIds.push(e.target.value);
          if (this.checkedReportIds.length == 1) {
            const currentchecked = this.finalDocsList.filter((ele) => ele.id == e.target.value);
            console.log(currentchecked);
            this.pdfdata = currentchecked[0].reportdata;
          }
        }
      } else {
        const index = this.checkedReportIds.indexOf(e.target.value);
        if (index > -1) {
          this.checkedReportIds.splice(index, 1);
        }
      }
    },
    checkUncheckAll: function(e) {
      if (e.target.checked) {
        const singleCheckBoxes = document.querySelectorAll('input[name=singlecheckbox]');
        console.log(singleCheckBoxes);
        this.checkedReportIds = [];
        singleCheckBoxes.forEach((element) => {
          element.checked = true;
          this.checkedReportIds.push(element._value.toString());
        });
      } else {
        this.checkedReportIds = [];
        const singleCheckBoxes = document.querySelectorAll('input[name=singlecheckbox]');
        singleCheckBoxes.forEach((element) => (element.checked = false));
      }
    },
    deletepdfdata: async function(currentid) {
      const pdfvalue = await Swal.fire({
        title: 'Warning',
        text: 'Do you wish to delete the file?',
        icon: 'warning',
        showCancelButton: true,
      });
      if (pdfvalue.isConfirmed) {
        const reportid = sessionStorage.getItem('reportId');
        var deleteResponse = await this.$apiService.delete(`/publish/finaldocuments`, { data: { report_id: reportid, id: currentid } });
        console.log(deleteResponse.data.status);
        if (deleteResponse.data.status == 'success') {
          await Swal.fire({
            title: 'Success',
            text: 'File Deleted Successfully.',
            icon: 'success',
          });
          this.finalDocsList = this.finalDocsList.filter((element) => element.id != currentid);
          this.checkedReportIds = this.checkedReportIds.filter((element) => element != currentid);
        }
      }
    },
  },
  created() {
    //  axios
    // .get('@/json/image_json.json')
    // .then(response => {
    //   this.actruless = response.data
    // })
    // .catch(function (error) {
    //   console.log(error);
    // })
  },
  async mounted() {
    const reportid = sessionStorage.getItem('reportId');
    const savePDFDocument = await this.$apiService.get(`/publish/finaldocuments?report_id=${reportid}`);
    console.log(savePDFDocument);
    this.finalDocsList = savePDFDocument.data.data;
    console.log(this.finalDocsList);
  },
};
</script>
