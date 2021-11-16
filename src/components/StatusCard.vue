<template>
    <v-container>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Selection
        </button>

        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" 
            aria-labelledby="staticBackdropLabel" aria-hidden="true" style="align-contents: center">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="staticBackdropLabel">Selection</h4>
                <v-divider class="divider-size" inset vertical></v-divider>
                <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate 
                    the visual form of a document or a typeface without relying on meaningful content.</p>
            </div>
            
            <div class="v-card-class">
                <v-layout class="v-layout-align">
                    <v-flex xs3>
                        <button>
                            <v-card class="mx-auto" max-width="100">
                                <v-icon class="icon-align" small color="success">fa-check-circle</v-icon>
                                <v-card-text>
                                    <v-icon large>fas fa-city</v-icon>
                                </v-card-text>
                            </v-card>
                            Entity Profile
                        </button>
                    </v-flex>

                    <v-flex xs3> 
                        <button>
                            <v-card class="mx-auto">
                                <v-icon class="icon-align" small color="success">fa-check-circle</v-icon>
                                <v-card-title>
                                    <img src="../assets/master/financial.png" height="50px" width="85px">
                                </v-card-title>
                            </v-card>
                            Financial Details
                        </button>
                    </v-flex>

                    <v-flex xs3>
                        <button> 
                            <v-card class="mx-auto" max-width="100">
                                <v-icon class="icon-align" small color="success">fa-check-circle</v-icon>
                                <v-card-text>
                                    <img src="../assets/master/proprietor.png" height="50px" width="85px">
                                </v-card-text>
                            </v-card>
                            Proprietor
                        </button>
                    </v-flex>

                    <v-flex xs3>
                        <button> 
                            <v-card class="mx-auto" max-width="100">
                                <v-icon class="icon-align" small color="success">fa-check-circle</v-icon>
                                <v-card-text>
                                    <img src="../assets/master/securites.png" height="50px" width="85px">
                                </v-card-text>
                            </v-card>
                            Securities
                        </button>
                    </v-flex>
                </v-layout>

                <v-layout class="v-layout-align">
                    <v-flex xs3>
                        <button>
                            <v-card class="mx-auto" max-width="100">
                                <v-icon class="icon-align" small color="success">fa-check-circle</v-icon>
                                <v-card-text>
                                    <img src="../assets/master/stakeholder.png" height="50px" width="85px">
                                </v-card-text>
                            </v-card>
                            Stakeholder
                        </button>
                    </v-flex>

                    <v-flex xs3> 
                        <button>
                            <v-card class="mx-auto" max-width="100">
                                <v-icon class="icon-align" small color="success">fa-check-circle</v-icon>
                                <v-card-text>
                                    <img src="../assets/master/auditor.png" height="50px" width="85px">
                                </v-card-text>
                            </v-card>
                            Auditor Details
                        </button>
                    </v-flex>

                    <v-flex xs3> 
                        <button>
                            <v-card class="mx-auto" max-width="100">
                                <v-icon class="icon-align" small color="success">fa-check-circle</v-icon>
                                <v-card-text>
                                    <img src="../assets/master/investment.png" height="50px" width="85px" >
                                </v-card-text>
                            </v-card>
                            Investment Details
                        </button>
                    </v-flex>

                    <v-flex xs3> 
                        <button>
                            <v-card class="mx-auto" max-width="100">
                                <v-icon class="icon-align" small color="success">fa-check-circle</v-icon>
                                <v-card-text>
                                    <img src="../assets/master/fixedasset.png" height="50px" width="85px" >
                                </v-card-text>
                            </v-card>
                            Fixed assets register
                        </button>
                    </v-flex>
                </v-layout>
            </div>
            <div class="btn-align">
                <v-btn class="ma-2" color="primary">Finish</v-btn>
                <v-btn class="ma-2" outlined color="indigo" data-bs-dismiss="modal">Cancel</v-btn>
            </div>
            </div>
        </div>
        </div>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
        }
    }
}
</script>

<style scoped>
.divider-size{
    border-right: 2px solid grey;
    height: 60px;
    margin-left: 2%;
    margin-right: 2%;
}
.blueUline{
    width:100%;
    border-top: 3px solid #03a9f4;
}
.v-card-class{
    margin: 5%;
}
.v-layout-align{
    margin-bottom: 5%;
    font-family: Georgia, 'Times New Roman', Times, serif;
}
.btn-align{
    text-align: right;
    margin-right: 45px;
    padding: 1%;
}
</style>