<template>
    <v-container>
        <v-dialog
         persistent
         v-model="reclassifyDialog"
         width="900">
            <template v-slot:activator="{ on, attrs }">
                <p
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
                >
                <img src="../assets/exhange.png"><img src="../assets/reclassify.png">
                </p>
            </template>

            <v-card max-width="900" class="mx-auto">
                <v-toolbar flat dense>
                    <v-layout>
                        <v-flex xs3 md3>
                            <p></p>
                            <h5 style="font-size:18px; font-weight: bold">Balances With Bank</h5>
                        </v-flex>

                        <v-spacer></v-spacer>
                        <v-flex xs4 md4>
                            <p></p>
                            <v-checkbox label="Reclassify" v-model="reclassifyCheck"></v-checkbox>
                        </v-flex>
                    </v-layout>
                    <button transparent  @click="reclassifyDialog = false">
                        <img src="../assets/closeicon.png" height="35">
                    </button>
                </v-toolbar>
                              

                <v-divider class="blueUline"></v-divider>

                <div v-if="reclassifyCheck === true">

                <v-layout style="margin:0% 2%">
                    <v-flex xs4 md4 style="margin-right:2%">
                        <v-select
                         dense
                         outlined
                         label="Select Ledgers to classify"
                         multiple>
                        </v-select>
                    </v-flex>
                    <v-flex xs4 md4>
                        <v-select
                         dense
                         outlined
                         label="Reclassification Period">
                        </v-select>
                    </v-flex>
                </v-layout>

                <v-layout style="margin:0% 2%">
                    <v-flex xs4 md4 style="margin-right:2%">
                        <v-select
                         dense
                         outlined
                         label="Level 1 Reclassification">
                        </v-select>
                    </v-flex>

                    <v-flex xs4 md4 style="margin-right:2%">
                        <v-select
                         dense
                         outlined
                         label="Level 2 Reclassification">
                        </v-select>
                    </v-flex>

                    <v-flex xs4 md4 style="margin-right:2%">
                        <v-select
                         dense
                         outlined
                         label="Level 3 Reclassification">
                        </v-select>
                    </v-flex>

                    <v-flex xs4 md4>
                        <v-select
                         dense
                         outlined
                         label="Category">
                        </v-select>
                    </v-flex>
                </v-layout>

                <div style="text-align:center; margin-top:2%; margin-bottom:2%">
                    <v-dialog width="310" v-model="selectionDialog">
                        <template v-slot:activator="{ on ,attrs}">
                            <v-btn color="primary" v-on="on" v-bind="attrs">Reclassify</v-btn>
                        </template>

                        <v-card class="mx-auto" width="310">
                            <v-card-title>
                                <p>Selected ledgers have been classified</p>
                            </v-card-title>

                            <div style="text-align:center;padding:5%">
                                <v-btn color="primary" @click="selectionDialog = false">OK</v-btn>
                            </div>
                        </v-card>
                    </v-dialog>
                </div>

                </div>

                <v-simple-table fixed-header>
                    <thead class="thead-class">
                        <tr>
                            <th style="font-size: 14px; color: #03A9F4">List of Ledgers</th>
                            <th style="font-size: 14px; color: #03A9F4">31-03-21</th>
                            <th style="font-size: 14px; color: #03A9F4">31-03-20</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr>
                            <td></td>
                            <td class="text-left"></td>
                            <td class="text-left"></td>
                        </tr>
                    </tbody>

                    <tr style="border-top:1px solid; margin:3%">
                        <td>Total</td>
                        <td class="text-left">Final Value1</td>
                        <td class="text-left">Final Value2</td>
                    </tr>

                </v-simple-table>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            selectionDialog: false,
            reclassifyDialog: false,
            reclassifyCheck: false
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam&display=swap');

.thead-class{
    border-bottom:1px solid; 
    margin:3%;
}
.div-btn{
    text-align: right;
    padding: 10px;
    margin: 8px;
}
.blueUline{
    width:100%;
    border-top: 3px solid #1b0ab1;
    margin-bottom: 5%;
    top: 1%;
}
.inline{
    display: inline-block;
    flex: 20px;
}
h5{
    font-size: 20px;
    font-family: 'Be Vietnam';
    text-align: left;
    font-weight: bold;
}
</style>