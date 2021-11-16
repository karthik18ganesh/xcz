<template>
<v-dialog
    dense
    persistent
    v-model="addDisclosureDialog"
    width="980"
    >
    <template v-slot:activator="{ on, attrs }">
        <p style="color: rgba(3, 169, 244, 1);" v-on="on" v-bind="attrs">
        <img src="../assets/adddisclosureicon.png" alt="" width="10" height="15"><img src="../assets/adddisclosure.png" alt="" width="25" height="18">
        </p>
    </template>

                        <v-card max-width="980" class="mx-auto" flat>
                            <v-toolbar flat>
                                <h5>Disclosures</h5>
                            </v-toolbar>
                                        

                            <v-divider class="blueUline"></v-divider>

                            <v-layout style="margin:20px">
                                <v-flex xs4 md4>
                                    <v-select 
                                    outlined 
                                    dense
                                    placeholder="Title of the disclosure"
                                    label="Title of the explanation"></v-select>
                                </v-flex>
                            </v-layout>

                                <v-toolbar dense flat style="padding:1px">
                                    <button transparent><v-icon> mdi-undo</v-icon></button>
                                    <button transparent><v-icon> mdi-redo</v-icon></button>

                                    <v-divider inset vertical></v-divider>
                                    
                                    <template v-if="$vuetify.breakpoint.mdAndUp">
                                    <v-divider vertical></v-divider>

                                    <v-overflow-btn
                                        :items="dropdown_edit"
                                        editable
                                        label="Select size"
                                        hide-details
                                        class="pa-0"
                                        overflow
                                        dense
                                    ></v-overflow-btn>

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

                                    <v-select dense
                                     outlined style="margin:10px"></v-select>

                                    </template>
                                </v-toolbar>
                                <v-divider></v-divider>

                                <div class="divClass">
                                    <v-textarea placeholder="Type Here"></v-textarea>
                                </div>
                                

                            <div class="div-btn">
                                <v-btn flat small color="primary" style="margin-right:2%"> Add </v-btn>
                                <v-btn flat small @click="addDisclosureDialog = false"> Cancel </v-btn>
                            </div>
                        </v-card>
                    </v-dialog>
</template>


<script>
export default {
    data(){
        return{
            disclosureDialog: false,
            addDisclosureDialog: false
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