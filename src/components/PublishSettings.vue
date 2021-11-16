<style>
#publishsetting {
  margin-top: 10px;
}
#myBtn {
  margin-left: -138px;
}
#searchtab {
  margin-left: -70px;
}
#subheading {
  margin-left: -63px;
}
#headcolor {
  color: #299be4;
}
#btnid {
  margin-left: 10px;
}
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 70px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: scroll !important; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

/* The Close Button */
.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-body {
  padding: 2px 16px;
}

.modal-footer {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}
.valueclass {
  margin-left: -120px;
}
</style>
<template>
  <div class="publishsettings">
    <div class="container-fluid" id="publishsetting">
      <div class="row">
        <div class="col-md-4">
          <h5 id="myBtn">Color Themes <i class="fa fa-angle-down"></i></h5>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-4" id="searchtab">
          <div class="input-group">
            <input class="form-control py-2 border-right-0 border" name="message" @input="frontEndSearch($event)" type="text" placeholder="Search for Template" id="example-search-input" />
            <span class="input-group-append">
              <div class="input-group-text bg-transparent"><i class="fa fa-search"></i></div>
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3" v-for="imgdata in imgdata" :key="imgdata.id">
          <router-link :to="{ name: 'publishpreview', params: { template_id: imgdata.id } }"><img @click="setTemplateid(imgdata.id)" :src="require('@/assets/master/' + imgdata.imagename)"/></router-link>
          <div>
            <p id="subheading">{{ imgdata.templete_name }}</p>
            <img class="valueclass" src="../assets/master/people_24px_outlined.svg" /> 245
          </div>
        </div>
      </div>
    </div>
    <!-- The Modal -->
    <div class="container-fluid">
      <div id="myModal" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
          <div class="modal-body">
            <span class="close">&times;</span>
            <div class="row">
              <div class="col-md-5">
                <h2 id="headcolor"><b>Crystal Blue</b></h2>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <img src="../assets/master/Balance sheet _Notes design-14balacesheetsample.png" />
                <p id="subheading">Balancesheet Sample</p>
              </div>
              <div class="col-md-4">
                <img src="../assets/master/Notes-15 1notessample.png" />
                <p id="subheading">Notes Sample</p>
              </div>
              <div class="col-md-4">
                <img src="../assets/master/Board Report-03reportsample.png" />
                <p id="subheading">Report Sample</p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-5"></div>
              <div class="col-md-7">
                <a href="#" class="btn btn-outline-primary float-right" id="btnid">Cancel</a>
                <a href="#" class="btn btn-info float-right">Apply</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped src="@/css/bootstrap.min.css"></style>
<script>
// import axios from "axios";
import imagejson from '../assets/json/image_json.json';
export default {
  data: function() {
    return {
      imgdata: imagejson.data,
      form: { message: '' },
      message: '',
      template_id: '',
      allimgdata: imagejson.data,
    };
  },
  methods: {
    setTemplateid(id) {
      this.template_id = id;
    },
    frontEndSearch(event) {
      this.message = event.target.value;
      const currentView = [...this.allimgdata];
      this.imgdata = currentView.filter((element) => element.templete_name.includes(this.message));
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
    console.log(this.imgdata);
  },
  mounted() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById('myBtn');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // When the user clicks the button, open the modal
    btn.onclick = function() {
      modal.style.display = 'block';
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  },
};
</script>
