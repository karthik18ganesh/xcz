<template>
    <div class="bckgrnd-img">
    <v-container class="container-center">
        <v-card-title class="text-h5 white lighten " style="padding:16px 16px 8px 17px;">
            <div>
                <h5 style="float:left">Import Financials</h5>
            </div>
        </v-card-title>
        <v-divider class="blueUline"></v-divider>

        <v-card-text style="margin-top:5%;">
            <v-form v-model="valid" 
                ref="addform" 
                lazy-validation>

        <v-layout>
            <v-flex xs12>
                <v-select
                    :rules="[v => !!v || 'Organization name is required']"
                    item-text="name"
                    item-value="name"
                    label="Name of the Entity"
                    dense
                    outlined
                    required         
                ></v-select>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex xs12>
                <br/>
                <v-select
                    :rules="[v => !!v || 'Organization type is required']"
                    item-text="company_type"
                    item-value="company_type"
                    label="Type of the organization"
                    dense
                    outlined
                    required          
                ></v-select>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex xs6 md6>
                <br/>
                <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field autocomplete="off" 
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        :rules="[v => !!v || 'From date is required']"
                        label="Period From"
                        outlined
                        dense
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        no-title
                        @input="menu1 = false"
                    ></v-date-picker>
                </v-menu>
            </v-flex>

            <v-flex xs1>
                <br/>
            </v-flex>

            <v-flex xs6 md6>
                <br />
                <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field autocomplete="off" 
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        :rules="[v => !!v || 'From date is required']"
                        label="Period To"
                        outlined
                        dense
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        no-title
                        @input="menu2 = false"
                    ></v-date-picker>
                </v-menu>
            </v-flex>
        </v-layout>

        <v-layout>
            <v-flex xs6 md6>
                <br />
                <v-select
                    :rules="[v => !!v || 'user is required']"
                    item-text="username"
                    item-value="id"
                    label="Assign users"
                    multiple
                    outlined
                    dense
                    required>
                </v-select>
            </v-flex>

            <v-flex xs1>
                <span></span>
            </v-flex>

            <v-flex xs6 md6>
                <br />
                <v-menu
                    v-model="menu3"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="auto"
                    min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field autocomplete="off" 
                        persistent-hint
                        append-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        format="MM-dd-yyyy"
                        :rules="[v => !!v || 'Due date is required']"
                        label="Due Date"
                        outlined
                        dense
                    ></v-text-field>
                </template>
                    <v-date-picker
                        no-title
                        format="MM-dd-yyyy"
                        @input="menu3 = false"
                    ></v-date-picker>
                </v-menu>
            </v-flex>
        </v-layout>

        <div>
            <v-layout>
                <v-flex xs6 md6 style="max-width:47%">
                    <br />
                    <v-select
                        item-text="name"
                        item-value="id"
                        :rules="[v => !!v || 'Company type is required']"
                        label="Type of company"
                        dense
                        outlined
                        required          
                    ></v-select>
                </v-flex>
            </v-layout>
        </div>

        <v-layout>
            <v-flex xs6 md6 style="max-width:47%">
                <br />
                <v-select
                    :rules="[v => !!v || 'Priority is required']"
                    item-text="name"
                    item-value="id"
                    label="Priority"
                    dense
                    outlined
                    required>
                </v-select>
            </v-flex>
        </v-layout>

        <v-card-actions class="vertical-center">
            <button @click="handleAddCancel" class="back-font"> <v-icon style="color: #0000008A;margin-right:7px">fas fa-long-arrow-alt-left</v-icon>  Back </button>
            <v-spacer></v-spacer>
            <v-btn
                class="ma-2"
                color="primary"
                @click="handleAddSubmit"
            >
                Create
            </v-btn>
            <v-btn
                class="ma-2"
                outlined
                color="indigo"
                @click="handleAddCancel"
            >
                Cancel
            </v-btn>
        </v-card-actions>
        </v-form>
        </v-card-text>
    </v-container>
</div>
</template>

<script>
export default {
    name: 'ImportDetails1',
    components:{

    },
    data(){
        return{

        }
    },
    methods:{
        handleAddCancel(){
            this.$router.back()
        },
    }
}
</script>

<style scoped>
.blueUline{
    text-align:left;
    width:23%;
    padding:0px;
    margin-left:16px;
    border-top: 4px solid #03a9f4;
}
.bckgrnd-img{
    background-image: url('../assets/importimg1.png');
    background-color: #000;
    background-position: right bottom;
    background-repeat: no-repeat;
} 
.vertical-center {
    text-align: right;
    justify-content: right;
}
.container-center{
    margin-top: 5vh;
    width: 700px;
    justify-content: left;
    text-align: left;
    margin-left:5%;
}
.text-yellow{
    color:yellow;
}
.text-red{
    color:red;
}
.text-grey{
    color:gray;
}
.text-green{
    color:green;
}
span{
    font-size: 14px;
    font: bold;
    letter-spacing: 2px;
    margin-left: 12px;
}
.back-font{
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 26px;
letter-spacing: 0em;
text-align: left;
}
</style>