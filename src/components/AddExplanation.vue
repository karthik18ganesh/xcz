<template>
    <v-container>
        <v-dialog
        persistent
        width="800"
        v-model="explainDialog"
        >
            <template v-slot:activator="{ on, attrs }">
                <p
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                >
                <img src="../assets/explanation.png" alt="">
                </p>
            </template>
            <v-card class="mx-auto" width="800">
                <v-toolbar dense flat>
                    <h5>Explanation</h5>

                    <v-spacer></v-spacer>

                    <!-- ======================Add Explanation ======================== -->

                    <v-dialog
                    dense
                    persistent
                    v-model="addexplainDialog"
                    width="920"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <button style="color: rgba(3, 169, 244, 1);" v-on="on" v-bind="attrs" @click="newexplanation">
                                <img src="../assets/plus.png" alt="">
                                Add Explanation
                            </button>
                        </template>

                        <v-card max-width="920" class="mx-auto" flat>
                            <v-toolbar flat>
                                <h5>Explanation</h5>
                            </v-toolbar>
                                        

                            <v-divider class="blueUline"></v-divider>

                            <v-layout style="margin:20px">
                                <v-flex xs4 md4>
                                    <v-text-field
                                    v-model="title"
                                    outlined 
                                    dense
                                    placeholder="Title of the explanation"
                                    label="Title of the explanation"></v-text-field>
                                </v-flex>

                                <v-spacer></v-spacer>

                                <v-flex xs2 md2>
                                    <p>Applicability</p>
                                </v-flex>

                                <v-flex xs2 md2>
                                    <v-select outlined dense label="Current Year" v-model="applicability" :items="['Current Year','Previous Year','Both']"></v-select>
                                </v-flex>
                            </v-layout>

                            <div class="divClass">
                                <v-toolbar dense flat style="padding:1px">
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
                                        @click="isBold = !isBold"
                                        small
                                        :value="1"
                                        text
                                        >
                                        <v-icon small>mdi-format-bold</v-icon>
                                        </v-btn>

                                        <v-btn
                                        @click="isItalic = !isItalic"
                                        small
                                        :value="2"
                                        text
                                        >
                                        <v-icon small>mdi-format-italic</v-icon>
                                        </v-btn>

                                        <v-btn
                                        @click="isUnderline = !isUnderline"
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
                                        v-model="color"
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

                                    </template>
                                </v-toolbar>
                                <v-divider></v-divider>

                                <div v-bind:class="{
                                    boldStyle: isBold,
                                    italicStyle: isItalic,
                                    underlineStyle: isUnderline
                                }" >
                                    <v-textarea placeholder="Type Here" v-model="explanation" :style="{'color': color}" 
                                ></v-textarea>
                                </div>
                                
                            </div>

                            <div class="div-btn">
                                <v-btn small color="primary" style="margin-right:2%" @click="saveExplanation"> Save </v-btn>
                                <v-btn small @click="closeExplainDialog"> Cancel </v-btn>
                            </div>
                        </v-card>
                    </v-dialog>


                    <!-- ============================================================== -->

                                       
                    <button style="margin-left:5%" @click="explainDialog = false">
                        <img src="../assets/closeicon.png" width="30" height="30" alt="">
                    </button>
                </v-toolbar>

                <v-divider style="color:#03A9F4; border-bottom: solid 2px"></v-divider>

                <v-simple-table>
                    <thead style="border-bottom:1px solid; text-align:left">
                        <tr>
                            <td style="font-size: 15px; color: #03A9F4">Sl.no</td>
                            <td style="font-size: 15px; color: #03A9F4">Explanation</td>
                            <td style="text-align:left"></td>
                        </tr>
                    </thead>

                    <tbody v-for="item in explanationList" v-bind:key="item.id">
                        <tr>
                            <td style="text-align:left">{{ item.slno }} </td>
                            <td style="text-align:left"> {{ item.explanation }} </td>
                            <td style="text-align:left">
                                <button transparent @click="updateExplanation(item)"><img src="../assets/edit.png" alt=""></button>
                                <button transparent @click="deleteExplanation(item.id)"><img src="../assets/delete.png" alt=""></button>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>

export default {
    mounted(){
        this.getExplanation()
    },

    data(){
        return{
            explainDialog: false,
            addexplainDialog: false,

            isNewExplanation: false,

            title: '',
            applicability: '',
            explanation: '',
            isBold: false,
            isItalic: false,
            isUnderline: false,
            isStrike: false,
            color: 'red',

            explanationList: []
        }
    },

    methods:{
        newexplanation(){
            this.title = ''
            this.explanation = ''
            this.applicability = ''
            this.isNewExplanation = true
        },
        async getExplanation(){
            try{
                var res = await this.$apiService.get("/financial/explanation/level2?financialid=97&level1=Cash and cash equivalents&level2=Balance with banks");
                console.log("Data",res.data)
                this.explanationList = res.data.data
                this.explanationList.forEach((x,index)=>{
                x.slno=index+1;
                });
            }
            catch(error){
                console.error();
            }
        },
        async saveExplanation(){
            try{
                if(this.isNewExplanation){
                var payload= {
                "financialId": 97,
                "level1": "Cash and cash equivalents",
                "level2": "Balance with banks",
                "title": this.title,
                "applicable": this.applicability,
                "explanation": this.explanation,
                "style":{
                        "size":16,
                        "isBold":this.isBold,
                        "isItalic":this.isItalic,
                        "IsUnderline":this.isUnderline,
                        "isStrike":this.isStrike,
                        "color":"red",
                        "align":"flex-start"
                    }
                }
                var explanationResponse = await this.$apiService.post("/financial/explanation/level2", payload);
                console.log(explanationResponse)

                if(explanationResponse.status === 200){
                    this.addexplainDialog = false
                }
                else{
                    alert("No response")
                }
                this.getExplanation()
            }
            else{
                var update_payload= {
                "explationId":this.selectedRows.id,
                "level":2,
                "explanation": this.explanation,
                "style":{
                        "size":16,
                        "isBold":this.isBold,
                        "isItalic":this.isItalic,
                        "IsUnderline":this.isUnderline,
                        "isStrike":this.isStrike,
                        "color":"red",
                        "align":"flex-start"
                    }
                }
                const updateRes = await this.$apiService.put("/financial/explanation/level",update_payload)
                console.log(updateRes)
                if(updateRes.status === 200){
                    this.addexplainDialog = false
                }
                this.getExplanation()
            }
            }
            catch(error){
                console.log(error)
            }
        },
        closeExplainDialog(){
            this.addexplainDialog = false
        },
        updateExplanation(item){
            this.selectedRows = item
            this.isNewExplanation = false
            this.explanation = item.explanation
            this.title = item.title
            this.applicability = item.applicable
            this.addexplainDialog = true
        },
        async deleteExplanation(id){
            var del = await this.$apiService.delete("/financial/explanation/level?explationId="+id+"&level=2");
            console.log("Delete id = ", del, "==== id",id)
            this.explanationList.splice(id,1)
            this.getExplanation()
            //this.axios.get(del)
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam&display=swap');
.divClass{
    border: 1px solid;
    border-radius: 5px;
    margin: 30px;
    padding: 5px;
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
    border-bottom: 3px solid #03A9F4;
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
.boldStyle{
    font-weight: bold;
}
.italicStyle{
    font-style: italic;
}
.underlineStyle{
    text-decoration: underline;
}
</style>