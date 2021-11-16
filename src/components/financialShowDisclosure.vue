<template>
    <v-container>
        <v-dialog
        persistent
        width="800"
        v-model="disclosureDialog"
        >
            <template v-slot:activator="{ on, attrs }">
                <p
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                >
                <img src="../assets/showdisclosure.png" width="48" height="25">
                </p>
            </template>
            <v-card class="mx-auto" width="800">
                <v-toolbar dense flat>
                    <h5>Disclosure</h5>

                    <v-spacer></v-spacer>

                    <!-- ======================Add Explanation ======================== -->

                    <v-dialog
                    dense
                    persistent
                    v-model="addDisclosureDialog"
                    width="960"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <button style="color: rgba(3, 169, 244, 1);" v-on="on" v-bind="attrs" @click="newdisclosure">
                                <img src="../assets/plus.png" alt="">
                                Add Disclosure
                            </button>
                        </template>

                        <v-card max-width="960">
                            <v-toolbar flat>
                                <h5>Disclosures</h5>
                            </v-toolbar>
                                        

                            <v-divider class="blueUline"></v-divider>

                            <v-layout style="margin:20px">
                                <v-flex xs4 md4>
                                    <v-text-field
                                    outlined 
                                    dense
                                    placeholder="Title of the disclosure"
                                    label="Title of the explanation"
                                    v-model="title"></v-text-field>
                                </v-flex>
                            </v-layout>

                                <v-toolbar dense flat>
                                    <button transparent><v-icon> mdi-undo</v-icon></button>
                                    <button transparent><v-icon> mdi-redo</v-icon></button>

                                    <v-divider inset vertical></v-divider>
                                    
                                    <template v-if="$vuetify.breakpoint.mdAndUp">
                                    <v-divider vertical></v-divider>

                                    <v-select
                                        rounded
                                        :items="dropdown_edit"
                                        editable
                                        label="size"
                                        hide-details
                                        overflow
                                        dense
                                        outlined
                                        style="margin-left:2%; margin-right:2%"
                                    ></v-select>

                                    <v-divider vertical></v-divider>

                                    <v-spacer></v-spacer>

                                    <v-btn-toggle
                                        v-model="toggle_multiple"
                                        color="primary"
                                        dense
                                        group
                                        multiple
                                    >
                                        <v-btn
                                        small
                                        :value="1"
                                        text
                                        >
                                        <v-icon small>mdi-format-bold</v-icon>
                                        </v-btn>

                                        <v-btn
                                        small
                                        :value="2"
                                        text
                                        >
                                        <v-icon small>mdi-format-italic</v-icon>
                                        </v-btn>

                                        <v-btn
                                        small
                                        :value="3"
                                        text
                                        >
                                        <v-icon small>mdi-format-underline</v-icon>
                                        </v-btn>

                                        <v-btn 
                                        small
                                        :value="4"
                                        text>
                                        <img src="../assets/abcStrike.png" alt="">
                                        </v-btn>

                                        <v-btn 
                                        small
                                        :value="5"
                                        text>
                                        <img src="../assets/textformat.png" alt="">
                                        </v-btn>
                                    </v-btn-toggle>

                                    <v-divider vertical></v-divider>

                                    <v-btn-toggle
                                        v-model="toggle_exclusive"
                                        color="primary"
                                        dense
                                        group
                                    >
                                        <v-btn
                                        :value="1"
                                        text
                                        >
                                        <v-icon small>mdi-format-align-left</v-icon>
                                        </v-btn>

                                        <v-btn
                                        :value="2"
                                        text
                                        >
                                        <v-icon small>mdi-format-align-center</v-icon>
                                        </v-btn>

                                        <v-btn
                                        :value="3"
                                        text
                                        >
                                        <v-icon small>mdi-format-align-right</v-icon>
                                        </v-btn>

                                        <v-btn
                                        :value="4"
                                        text
                                        >
                                        <v-icon small>mdi-format-align-justify</v-icon>
                                        </v-btn>
                                    </v-btn-toggle>

                                    <v-divider vertical></v-divider>

                                    <v-btn-toggle
                                        v-model="toggle_exclusive"
                                        color="primary"
                                        dense
                                        group
                                    >
                                        <v-btn
                                        :value="1"
                                        text
                                        >
                                        <v-icon small> fas fa-list </v-icon>
                                        </v-btn>

                                        <v-btn
                                        :value="2"
                                        text
                                        >
                                        <v-icon small> fas fa-list-ol </v-icon>
                                        </v-btn>
                                    </v-btn-toggle>

                                    <v-divider vertical></v-divider>

                                    <v-btn-toggle
                                        v-model="toggle_exclusive"
                                        color="primary"
                                        dense
                                        group
                                    >
                                        <v-btn
                                        :value="1"
                                        text
                                        >
                                        <img src="../assets/borderinner.png" alt=""><v-icon small>mdi-chevron-down</v-icon>
                                        </v-btn>
                                    </v-btn-toggle>

                                    <v-divider vertical></v-divider>

                                    <p></p>

                                    <v-select dense
                                     outlined style="margin:10px; margin-top:4%"></v-select>

                                    </template>
                                </v-toolbar>
                                <v-divider></v-divider>

                                <div class="divClass">
                                    <v-textarea placeholder="Type Here" v-model="disclosure"></v-textarea>
                                </div>
                                

                            <div class="div-btn">
                                <v-btn small color="primary" style="margin-right:2%" @click="saveDisclosure"> Add </v-btn>
                                <v-btn small @click="addDisclosureDialog = false"> Cancel </v-btn>
                            </div>
                        </v-card>
                    </v-dialog>


                    <!-- ============================================================== -->

                                       
                    <button style="margin-left:5%" @click="disclosureDialog = false">
                        <img src="../assets/closeicon.png" width="30" height="30" alt="">
                    </button>
                </v-toolbar>

                <v-divider></v-divider>

                <v-simple-table>

                    <tbody v-for="item in disclosureList" v-bind:key="item.id">
                        <tr>
                            <td style="text-align:left"> {{ item.title }} </td>
                            <td style="text-align:left">
                                <button transparent @click="editDisclosure(item)"><img src="../assets/edit.png" alt=""></button>
                                <button transparent @click="deleteDisclosure(item.id)"><img src="../assets/delete.png" alt=""></button>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
//import AddDisclosure from './AddDisclosure.vue'

export default {
    
    components:{
        //AddDisclosure
    },

    mounted() {
        this.getDisclosures()
    },

    data(){
        return{
            disclosureDialog: false,
            addDisclosureDialog: false,
            
            isNewDisclosure: false,

            title: '',
            disclosure: '',
            isBold: false,
            isItalic: false,
            isUnderline: false,
            isStrike: false,

            disclosureList: [],
            
        }
    },
    methods:{
        newdisclosure(){
            this.title = ''
            this.disclosure = ''
            this.isNewDisclosure = true
        },
        async getDisclosures(){
            try{
                var res = await this.$apiService.get("/financial/disclosure?financialid=97&level1=Cash and cash equivalents");
                console.log("Data",res.data)
                this.disclosureList = res.data.data
                this.disclosureList.forEach((x,index)=>{
                x.slno=index+1;
                });
            }
            catch(error){
                console.error();
            }
        },

        async saveDisclosure(){
            try{
                if(this.isNewDisclosure){
                    var payload = {
                        "financialId":97,
                        "level1":"Cash and cash equivalents",
                        "title": this.title,
                        "disclosure": this.disclosure
                    }
                    var disclosureResponse = await this.$apiService.post("/financial/disclosure", payload);

                    if(disclosureResponse.status === 200){
                        this.addDisclosureDialog = false
                    }
                    else{
                        alert("No response")
                    }
                    this.getDisclosures()
                }
                else{
                    var update_payload = {
                        "disclosureId":this.selectedRows.id,
                        "title":this.title,
                        "disclosure":this.disclosure
                    }
                    const updateRes = await this.$apiService.put("/financial/disclosure",update_payload)
                    console.log(updateRes)
                    if(updateRes.status === 200){
                        this.addDisclosureDialog = false
                    }
                    this.getDisclosures()
                }
            }
            catch(error){
                console.log(error)
            }
        },
        async deleteDisclosure(id){
            var del = await this.$apiService.delete("/financial/disclosure?disclosureId="+id);
            console.log(del)
            this.disclosureList.splice(id,1)
            this.getDisclosures()
            //this.axios.get(del)
        },
        async editDisclosure(item){
            this.selectedRows = item
            this.title = item.title
            this.disclosure = item.disclosure
            this.addDisclosureDialog = true
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam&display=swap');
.divClass{
    margin: 30px;
    padding: 2px;
}
.div-btn{
    text-align: right;
    padding: 10px;
    margin: 5px;
    padding-bottom: 3%;
    padding-right: 2%;
    right: 10vh;
}
.blueUline{
    width:100%;
    border-bottom: 3px solid rgba(3, 169, 244, 1);
    padding-top: 1px;
}
.inline{
    display: inline-block;
    flex: 20px;
}
button{
    padding: 5px;
}
h5{
    padding-top: 3%;
    padding-left: 2%;

}
</style>