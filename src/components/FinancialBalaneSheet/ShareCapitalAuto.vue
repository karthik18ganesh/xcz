<template>
    <div>
        <v-layout style="margin:1px">
            <v-flex xs4 md4 style="margin-top:1%; margin-left:1%">
                <v-breadcrumbs :items="breadcrumbsItems" large>
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>
            </v-flex>
            <v-flex>
                <div class="btn-row">
                    
                </div>
            </v-flex>
        </v-layout>

        <v-divider></v-divider>
        <div class="container-align">
            <v-layout>
                <v-flex xs9 md9>
                    <h4><u>Note 1. Share Capital</u></h4>
                </v-flex>

                <v-flex xs5 md5>
                    <v-btn color="primary" small style="margin-right:2%">Auto Fill</v-btn>
                    <v-btn small outlined style="margin-left:2%">Manual Fill</v-btn>
                </v-flex>

                <v-flex xs3 md3>
                    <h4>Amount in .......</h4>
                </v-flex>
            </v-layout>

            <v-card class="mx-auto" width="100%" style="margin-top:25px">
                <v-tabs v-model="tabs" style="margin:5px; padding:10px; text-transform: none !important;">
                <v-tabs-slider></v-tabs-slider>
                    <v-tab key="tab1">
                        <p>Authorized,Subscribed,Issued & Paid-up Capital</p>
                        <span>
                            <button transparent style="padding:3px"><v-icon small dense> far fa-comment-dots</v-icon></button>
                            <button transparent style="padding:3px">
                                <v-icon small dense> mdi-plus</v-icon>
                                <img src="../../assets/text_format.png" alt="" width="20" height="20">
                            </button>
                        </span>
                    </v-tab>

                    <v-divider vertical></v-divider>

                    <v-tab key="tab2">
                        <img src="../../assets/Vectorcolon.png" alt="">
                        <p>Reconcilation of the shares </p>
                        <span>
                            <button transparent style="padding:3px"><v-icon small dense> far fa-comment-dots</v-icon></button>
                            <button transparent style="padding:3px">
                                <v-icon small dense> mdi-plus</v-icon>
                                <img src="../../assets/text_format.png" alt="" width="20" height="20">
                            </button>
                        </span>
                    </v-tab>

                    <v-divider vertical></v-divider>

                    <v-tab key="tab3">
                        <img src="../../assets/Vectorcolon.png" alt="">
                        <p>Share held by holding company</p>
                        <span>
                            <button transparent style="padding:3px"><v-icon small dense> far fa-comment-dots</v-icon></button>
                            <button transparent style="padding:3px">
                                <v-icon small dense> mdi-plus</v-icon>
                                <img src="../../assets/text_format.png" alt="" width="20" height="20">
                            </button>
                        </span>
                    </v-tab>

                    <v-divider vertical></v-divider>

                    <v-tab key="tab4">
                        <img src="../../assets/Vectorcolon.png" alt="">
                        <p style="padding:10px">Shareholders > 5%</p>
                        <span>
                            <button transparent style="padding:3px"><v-icon small dense> far fa-comment-dots</v-icon></button>
                            <button transparent style="padding:3px">
                                <v-icon small dense> mdi-plus</v-icon>
                                <img src="../../assets/text_format.png" alt="" width="20" height="20">
                            </button>
                        </span>
                    </v-tab>

                    <v-divider vertical></v-divider>

                    <v-tab key="tab5">
                        <img src="../../assets/Vectorcolon.png" alt="">
                        <p style="padding:10px">Additional Disclosures</p>
                        <span>
                            <button transparent style="padding:3px"><v-icon small dense> far fa-comment-dots</v-icon></button>
                            <button transparent style="padding:3px">
                                <v-icon small dense> mdi-plus</v-icon>
                                <img src="../../assets/text_format.png" alt="" width="20" height="20">
                            </button>
                        </span>
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tabs">
                    <!-- ===============Tab 1====================== -->
                    <v-tab-item key="tab1">
                        <v-data-table 
                            hide-default-footer
                            :headers="headers"
                            :items="items"
                            dense>
                                <template v-slot:item="{ item }">
                                    <tr>
                                        <td>
                                            <v-layout style="margin:10px">
                                                <v-flex>
                                                    <label-edit :text="text" v-on:text-updated="textUpdated" v-on:text-updated-blur="textUpdated" v-on:text-updated-enter="textUpdated"></label-edit>
                                                </v-flex>

                                                <v-flex xs1>
                                                    <v-btn fab outlined x-small color="primary" style="margin-right:2%;margin-bottom:3%;margin-top:3%">
                                                        <v-icon dense x-small @click="add(k)">mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                                <v-flex xs1>
                                                    <v-btn fab outlined x-small color="primary" style="margin-left:2%;margin-bottom:3%;margin-top:3%">
                                                        <v-icon dense x-small @click="remove(k)">mdi-minus</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout>
                                            
                                            <v-text-field 
                                                v-model="item.particulars"
                                                outlined
                                                dense
                                                placeholder="<No of Shares> <Security Class alias> <Security Type> of <Face value> each"
                                                ></v-text-field>
                                        </td>
                                        <td>
                                            <br><br>
                                            <p></p>
                                            <v-col cols="6">
                                                40,00,000
                                            </v-col>
                                        </td>
                                        <td>
                                            <br><br>
                                            <p></p>
                                            <v-col cols="6">
                                                40,00,000
                                            </v-col>
                                        </td>
                                        <td>
                                            <button transparent style="margin-right:3%">
                                                <v-icon dense small>far fa-comment-dots</v-icon>
                                            </button>
                                            <button transparent style="margin-left:3%">
                                                <v-icon dense small>fas fa-list</v-icon>
                                            </button>
                                        </td>
                                        <td>
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>
                                            <v-layout style="margin:10px">
                                                <v-flex>
                                                    <label-edit :text="text1" v-on:text-updated="textUpdated1" v-on:text-updated-blur="textUpdated1" v-on:text-updated-enter="textUpdated1"></label-edit>
                                                </v-flex>

                                                <v-flex xs1>
                                                    <v-btn fab outlined x-small color="primary" style="margin-right:2%;margin-bottom:3%;margin-top:3%">
                                                        <v-icon dense x-small @click="add(k)">mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                                <v-flex xs1>
                                                    <v-btn fab outlined x-small color="primary" style="margin-left:2%;margin-bottom:3%;margin-top:3%">
                                                        <v-icon dense x-small @click="remove(k)">mdi-minus</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout>
                                            
                                            <v-text-field 
                                                v-model="item.particulars"
                                                outlined
                                                dense
                                                placeholder="<No of Shares> <Security Class alias> <Security Type> of <Face value> each"
                                                ></v-text-field>
                                        </td>
                                        <td>
                                            <br><br>
                                            <p></p>
                                            <v-col cols="6">
                                                40,00,000
                                            </v-col>
                                        <td>
                                            <br><br>
                                            <p></p>
                                            <v-col cols="6">
                                                40,00,000
                                            </v-col>
                                        </td>
                                        <td>
                                            <button transparent style="margin-right:3%">
                                                <v-icon dense small>far fa-comment-dots</v-icon>
                                            </button>
                                            <button transparent style="margin-left:3%">
                                                <v-icon dense small>fas fa-list</v-icon>
                                            </button>
                                        </td>
                                        <td>
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </td>
                                    </tr>
                                </template>
                                <template slot="body.append">
                                    <tr>
                                        <th style="text-align:right; color:#0398DC">Total amount</th>
                                        <th>40,00,000</th>
                                        <th>40,00,000</th>
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-tab-item>

                    <!-- ===============Tab 2====================== -->
                    <v-tab-item key="tab2">
                        <v-data-table 
                         dense
                         :headers="headers"
                         :items="items"
                         hide-default-footer
                        >
                            <template v-slot:item="{ item }">
                                <tr>
                                    <td>
                                        <v-layout style="margin:10px">
                                            <v-flex xs6>
                                                <label-edit> Equity Shares</label-edit>
                                            </v-flex>

                                            <v-flex xs1>
                                                <v-btn fab outlined x-small color="primary" style="margin-right:2%;margin-bottom:3%;margin-top:3%">
                                                    <v-icon dense x-small @click="add(k)">mdi-plus</v-icon>
                                                </v-btn>
                                            </v-flex>
                                            <v-flex xs1>
                                                <v-btn fab outlined x-small color="primary" style="margin-left:2%;margin-bottom:3%;margin-top:3%">
                                                    <v-icon dense x-small @click="remove(k)">mdi-minus</v-icon>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>

                                        <div style="margin-left:3px">
                                            <p>Opening Balance</p>

                                            <v-row>
                                                <v-col cols="2">Additions</v-col>
                                                <v-col cols="5">
                                                    <v-select
                                                    outlined
                                                    dense
                                                    placeholder="Right Issue">
                                                    </v-select> 
                                                </v-col>
                                                <v-col cols="1">
                                                    <v-btn x-small fab outlined color="primary" disabled>
                                                        <v-icon x-small dense>mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                                <v-col cols="1">
                                                    <v-btn x-small fab outlined color="primary" disabled>
                                                        <v-icon x-small dense>mdi-minus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="2">Deletions</v-col>
                                                <v-col cols="5">
                                                    <v-select
                                                    outlined
                                                    dense
                                                    placeholder="Shareholder 2">
                                                    </v-select> 
                                                </v-col>   
                                                <v-col cols="1">
                                                    <v-btn x-small fab outlined color="primary" disabled>
                                                        <v-icon x-small dense>mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                                <v-col cols="1">
                                                    <v-btn x-small fab outlined color="primary" disabled>
                                                        <v-icon x-small dense>mdi-minus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                            <p>Closing Balance</p>
                                        </div>
                                    </td>
                                    <td>
                                        <br><br>
                                        <p></p>
                                        <v-row>
                                            <v-col cols="4">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                        </v-row>
                                            
                                        <td>
                                            <br><br>
                                            <p></p>
                                            <v-row>
                                                <v-col cols="4">
                                                    <v-text-field 
                                                    v-model="item.todate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                    v-model="item.todate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="4">
                                                    <v-text-field 
                                                        v-model="item.fromdate"
                                                        outlined
                                                        dense></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                        v-model="item.fromdate"
                                                        outlined
                                                        dense></v-text-field>
                                                    </v-col>
                                            </v-row>
                                        </td>
                                        <td>
                                            <v-row>
                                                <v-col>
                                                    <button transparent style="margin-right:3%">
                                                        <v-icon dense small>far fa-comment-dots</v-icon>
                                                    </button>
                                                    <button transparent style="margin-left:3%">
                                                        <v-icon dense small>fas fa-list</v-icon>
                                                    </button>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col>
                                                    <button transparent style="margin-right:3%">
                                                        <v-icon dense small>far fa-comment-dots</v-icon>
                                                    </button>
                                                    <button transparent style="margin-left:3%">
                                                        <v-icon dense small>fas fa-list</v-icon>
                                                    </button>
                                                </v-col>
                                            </v-row>
                                        </td>

                                        <td>
                                            <v-row>
                                                <v-col>
                                                    <button transparent><v-icon>mdi-dots-vertical</v-icon></button>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col>
                                                    <button transparent><v-icon>mdi-dots-vertical</v-icon></button>
                                                </v-col>
                                            </v-row>
                                        </td>
                                    </tr>

                                    <tr>
                                    <td>
                                        <v-layout style="margin:10px">
                                            <v-flex xs6>
                                                <img src="../../assets/Vectorcolon.png" alt="">
                                                <label-edit> Preference Shares</label-edit>
                                            </v-flex>

                                            <v-flex xs1>
                                                <v-btn fab outlined x-small color="primary" style="margin-right:2%;margin-bottom:3%;margin-top:3%">
                                                    <v-icon dense x-small @click="add(k)">mdi-plus</v-icon>
                                                </v-btn>
                                            </v-flex>
                                            <v-flex xs1>
                                                <v-btn fab outlined x-small color="primary" style="margin-left:2%;margin-bottom:3%;margin-top:3%">
                                                    <v-icon dense x-small @click="remove(k)">mdi-minus</v-icon>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>

                                        <v-row>
                                            <v-col cols="8">
                                                <v-text-field
                                                outlined
                                                dense
                                                placeholder="Shareholder 1">
                                                </v-text-field> 
                                            </v-col>
                                            <v-col cols="1">
                                                <v-btn x-small fab outlined color="primary" disabled>
                                                    <v-icon x-small dense>mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="1">
                                                <v-btn x-small fab outlined color="primary" disabled>
                                                    <v-icon x-small dense>mdi-minus</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="8">
                                                <v-text-field
                                                outlined
                                                dense
                                                placeholder="Shareholder 2">
                                                </v-text-field> 
                                            </v-col>   
                                            <v-col cols="1">
                                                <v-btn x-small fab outlined color="primary" disabled>
                                                    <v-icon x-small dense>mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="1">
                                                <v-btn x-small fab outlined color="primary" disabled>
                                                    <v-icon x-small dense>mdi-minus</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </td>
                                    <td>
                                        <br><br>
                                        <p></p>
                                        <v-row>
                                            <v-col cols="4">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                        </v-row>
                                            
                                        <td>
                                            <br><br>
                                            <p></p>
                                            <v-row>
                                                <v-col cols="4">
                                                    <v-text-field 
                                                    v-model="item.todate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                    v-model="item.todate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="4">
                                                    <v-text-field 
                                                        v-model="item.fromdate"
                                                        outlined
                                                        dense></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                        v-model="item.fromdate"
                                                        outlined
                                                        dense></v-text-field>
                                                    </v-col>
                                            </v-row>
                                        </td>
                                        <td>
                                            <v-row>
                                                <v-col>
                                                    <button transparent style="margin-right:3%">
                                                        <v-icon dense small>far fa-comment-dots</v-icon>
                                                    </button>
                                                    <button transparent style="margin-left:3%">
                                                        <v-icon dense small>fas fa-list</v-icon>
                                                    </button>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col>
                                                    <button transparent style="margin-right:3%">
                                                        <v-icon dense small>far fa-comment-dots</v-icon>
                                                    </button>
                                                    <button transparent style="margin-left:3%">
                                                        <v-icon dense small>fas fa-list</v-icon>
                                                    </button>
                                                </v-col>
                                            </v-row>
                                        </td>

                                        <td>
                                            <v-row>
                                                <v-col>
                                                    <button transparent><v-icon>mdi-dots-vertical</v-icon></button>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col>
                                                    <button transparent><v-icon>mdi-dots-vertical</v-icon></button>
                                                </v-col>
                                            </v-row>
                                        </td>
                                    </tr>
                            </template>
                        </v-data-table>
                    </v-tab-item>
                    <!-- ===============Tab 3====================== -->
                    <v-tab-item key="tab3">
                        <v-layout>
                            <v-flex xs7 md7 style="margin-left:2%;margin-right:1%">
                                <p></p>
                                <p>Does the Company has Shares held by Holding, its subsidiary or any other associates</p>
                            </v-flex>
                            <v-flex xs1 md1>
                                <v-switch dense color="success"></v-switch>
                            </v-flex>
                        </v-layout>
                        <v-divider></v-divider>
                        <v-data-table 
                            hide-default-footer
                            :headers="headers"
                            :items="items"
                            dense>
                                <template v-slot:item="{ item }">
                                    <tr>
                                        <td>
                                            <v-layout style="margin:10px">
                                                <v-flex>
                                                    <label-edit :text="text" v-on:text-updated="textUpdated" v-on:text-updated-blur="textUpdated" v-on:text-updated-enter="textUpdated"></label-edit>
                                                </v-flex>

                                                <v-flex xs1>
                                                    <v-btn fab outlined x-small color="primary" style="margin-right:2%;margin-bottom:3%;margin-top:3%">
                                                        <v-icon dense x-small @click="add(k)">mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                                <v-flex xs1>
                                                    <v-btn fab outlined x-small color="primary" style="margin-left:2%;margin-bottom:3%;margin-top:3%">
                                                        <v-icon dense x-small @click="remove(k)">mdi-minus</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout>
                                            
                                            <v-text-field 
                                                v-model="item.particulars"
                                                outlined
                                                dense
                                                placeholder="<No of Shares> <Security Class alias> <Security Type> of <Face value> each"
                                                ></v-text-field>
                                        </td>
                                        <td>
                                            <br><br>
                                            <p></p>
                                            <v-row>
                                                <v-col cols="4">
                                                    <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                            </v-row>
                                            </td>
                                        <td>
                                            <br><br>
                                            <p></p>
                                            <v-row>
                                                <v-col cols="4">
                                                    <v-text-field 
                                                    v-model="item.todate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                    v-model="item.todate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </td>
                                        <td>
                                            <button transparent style="margin-right:3%">
                                                <v-icon dense small>far fa-comment-dots</v-icon>
                                            </button>
                                            <button transparent style="margin-left:3%">
                                                <v-icon dense small>fas fa-list</v-icon>
                                            </button>
                                        </td>
                                        <td>
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>
                                            <v-layout style="margin:10px">
                                                <v-flex>
                                                    <label-edit :text="text1" v-on:text-updated="textUpdated1" v-on:text-updated-blur="textUpdated1" v-on:text-updated-enter="textUpdated1"></label-edit>
                                                </v-flex>

                                                <v-flex xs1>
                                                    <v-btn fab outlined x-small color="primary" style="margin-right:2%;margin-bottom:3%;margin-top:3%">
                                                        <v-icon dense x-small @click="add(k)">mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                                <v-flex xs1>
                                                    <v-btn fab outlined x-small color="primary" style="margin-left:2%;margin-bottom:3%;margin-top:3%">
                                                        <v-icon dense x-small @click="remove(k)">mdi-minus</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                            </v-layout>

                                            <v-row>
                                            <v-col cols="6">
                                                <v-text-field
                                                outlined
                                                dense
                                                placeholder="Name of the Company">
                                                </v-text-field> 
                                            </v-col> 

                                            <v-col cols="6">
                                                <v-select
                                                 outlined
                                                 dense
                                                 label="Relationship"></v-select>
                                            </v-col>   
                                            </v-row>                                       
                                            <v-text-field 
                                                v-model="item.particulars"
                                                outlined
                                                dense
                                                placeholder="<No of Shares> <Security Class alias> <Security Type> of <Face value> each"
                                                ></v-text-field>
                                        </td>
                                        <td>
                                            <br><br>
                                            <p></p>
                                            <v-row>
                                                <v-col cols="4">
                                                    <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                            </v-row>
                                            
                                        <td>
                                            <br><br>
                                            <p></p>
                                            <v-row>
                                                <v-col cols="4">
                                                    <v-text-field 
                                                    v-model="item.todate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                    v-model="item.todate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </td>
                                        <td>
                                            <button transparent style="margin-right:3%">
                                                <v-icon dense small>far fa-comment-dots</v-icon>
                                            </button>
                                            <button transparent style="margin-left:3%">
                                                <v-icon dense small>fas fa-list</v-icon>
                                            </button>
                                        </td>
                                        <td>
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
                    </v-tab-item>
                    <!-- ================================================-->

                    <!-- ===============Tab 4====================== -->
                    <v-tab-item key="tab4">
                        <v-data-table 
                         dense
                         :headers="headers"
                         :items="items"
                         hide-default-footer
                        >
                            <template v-slot:item="{ item }">
                                <tr>
                                    <td>
                                        <v-layout style="margin:10px">
                                            <v-flex xs6>
                                                <img src="../../assets/Vectorcolon.png" alt="">
                                                <label-edit> Equity Shares</label-edit>
                                            </v-flex>

                                            <v-flex xs1>
                                                <v-btn fab outlined x-small color="primary" style="margin-right:2%;margin-bottom:3%;margin-top:3%">
                                                    <v-icon dense x-small @click="add(k)">mdi-plus</v-icon>
                                                </v-btn>
                                            </v-flex>
                                            <v-flex xs1>
                                                <v-btn fab outlined x-small color="primary" style="margin-left:2%;margin-bottom:3%;margin-top:3%">
                                                    <v-icon dense x-small @click="remove(k)">mdi-minus</v-icon>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>

                                        <v-row>
                                            <v-col cols="8">
                                                <v-text-field
                                                outlined
                                                dense
                                                placeholder="Shareholder 1">
                                                </v-text-field> 
                                            </v-col>
                                            <v-col cols="1">
                                                <v-btn x-small fab outlined color="primary" disabled>
                                                    <v-icon x-small dense>mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="1">
                                                <v-btn x-small fab outlined color="primary" disabled>
                                                    <v-icon x-small dense>mdi-minus</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="8">
                                                <v-text-field
                                                outlined
                                                dense
                                                placeholder="Shareholder 2">
                                                </v-text-field> 
                                            </v-col>   
                                            <v-col cols="1">
                                                <v-btn x-small fab outlined color="primary" disabled>
                                                    <v-icon x-small dense>mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="1">
                                                <v-btn x-small fab outlined color="primary" disabled>
                                                    <v-icon x-small dense>mdi-minus</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </td>
                                    <td>
                                        <br><br>
                                        <p></p>
                                        <v-row>
                                            <v-col cols="4">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                        </v-row>
                                            
                                        <td>
                                            <br><br>
                                            <p></p>
                                            <v-row>
                                                <v-col cols="4">
                                                    <v-text-field 
                                                    v-model="item.todate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                    v-model="item.todate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="4">
                                                    <v-text-field 
                                                        v-model="item.fromdate"
                                                        outlined
                                                        dense></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                        v-model="item.fromdate"
                                                        outlined
                                                        dense></v-text-field>
                                                    </v-col>
                                            </v-row>
                                        </td>
                                        <td>
                                            <v-row>
                                                <v-col>
                                                    <button transparent style="margin-right:3%">
                                                        <v-icon dense small>far fa-comment-dots</v-icon>
                                                    </button>
                                                    <button transparent style="margin-left:3%">
                                                        <v-icon dense small>fas fa-list</v-icon>
                                                    </button>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col>
                                                    <button transparent style="margin-right:3%">
                                                        <v-icon dense small>far fa-comment-dots</v-icon>
                                                    </button>
                                                    <button transparent style="margin-left:3%">
                                                        <v-icon dense small>fas fa-list</v-icon>
                                                    </button>
                                                </v-col>
                                            </v-row>
                                        </td>

                                        <td>
                                            <v-row>
                                                <v-col>
                                                    <button transparent><v-icon>mdi-dots-vertical</v-icon></button>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col>
                                                    <button transparent><v-icon>mdi-dots-vertical</v-icon></button>
                                                </v-col>
                                            </v-row>
                                        </td>
                                    </tr>

                                    <tr>
                                    <td>
                                        <v-layout style="margin:10px">
                                            <v-flex xs6>
                                                <img src="../../assets/Vectorcolon.png" alt="">
                                                <label-edit> Preference Shares</label-edit>
                                            </v-flex>

                                            <v-flex xs1>
                                                <v-btn fab outlined x-small color="primary" style="margin-right:2%;margin-bottom:3%;margin-top:3%">
                                                    <v-icon dense x-small @click="add(k)">mdi-plus</v-icon>
                                                </v-btn>
                                            </v-flex>
                                            <v-flex xs1>
                                                <v-btn fab outlined x-small color="primary" style="margin-left:2%;margin-bottom:3%;margin-top:3%">
                                                    <v-icon dense x-small @click="remove(k)">mdi-minus</v-icon>
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>

                                        <v-row>
                                            <v-col cols="8">
                                                <v-text-field
                                                outlined
                                                dense
                                                placeholder="Shareholder 1">
                                                </v-text-field> 
                                            </v-col>
                                            <v-col cols="1">
                                                <v-btn x-small fab outlined color="primary" disabled>
                                                    <v-icon x-small dense>mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="1">
                                                <v-btn x-small fab outlined color="primary" disabled>
                                                    <v-icon x-small dense>mdi-minus</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="8">
                                                <v-text-field
                                                outlined
                                                dense
                                                placeholder="Shareholder 2">
                                                </v-text-field> 
                                            </v-col>   
                                            <v-col cols="1">
                                                <v-btn x-small fab outlined color="primary" disabled>
                                                    <v-icon x-small dense>mdi-plus</v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="1">
                                                <v-btn x-small fab outlined color="primary" disabled>
                                                    <v-icon x-small dense>mdi-minus</v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </td>
                                    <td>
                                        <br><br>
                                        <p></p>
                                        <v-row>
                                            <v-col cols="4">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="4">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field 
                                                    v-model="item.fromdate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                        </v-row>
                                            
                                        <td>
                                            <br><br>
                                            <p></p>
                                            <v-row>
                                                <v-col cols="4">
                                                    <v-text-field 
                                                    v-model="item.todate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                    v-model="item.todate"
                                                    outlined
                                                    dense></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col cols="4">
                                                    <v-text-field 
                                                        v-model="item.fromdate"
                                                        outlined
                                                        dense></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field 
                                                        v-model="item.fromdate"
                                                        outlined
                                                        dense></v-text-field>
                                                    </v-col>
                                            </v-row>
                                        </td>
                                        <td>
                                            <v-row>
                                                <v-col>
                                                    <button transparent style="margin-right:3%">
                                                        <v-icon dense small>far fa-comment-dots</v-icon>
                                                    </button>
                                                    <button transparent style="margin-left:3%">
                                                        <v-icon dense small>fas fa-list</v-icon>
                                                    </button>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col>
                                                    <button transparent style="margin-right:3%">
                                                        <v-icon dense small>far fa-comment-dots</v-icon>
                                                    </button>
                                                    <button transparent style="margin-left:3%">
                                                        <v-icon dense small>fas fa-list</v-icon>
                                                    </button>
                                                </v-col>
                                            </v-row>
                                        </td>

                                        <td>
                                            <v-row>
                                                <v-col>
                                                    <button transparent><v-icon>mdi-dots-vertical</v-icon></button>
                                                </v-col>
                                            </v-row>

                                            <v-row>
                                                <v-col>
                                                    <button transparent><v-icon>mdi-dots-vertical</v-icon></button>
                                                </v-col>
                                            </v-row>
                                        </td>
                                    </tr>
                            </template>
                        </v-data-table>
                    </v-tab-item>
                    <!-- ================================================-->

                    <!-- ========================TAB5=========================== -->
                    <v-tab-item key="tab5">
                        <div class="divClass">
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
                                        class="overflow-btn"
                                        overflow
                                        dense
                                    ></v-overflow-btn>

                                    <v-divider vertical></v-divider>

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
                                        <img src="../../assets/abcStrike.png" alt="">
                                        </v-btn>

                                        <v-btn 
                                        small
                                        :value="5"
                                        text>
                                        <img src="../../assets/textformat.png" alt="">
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
                                        <img src="../../assets/borderinner.png" alt=""><v-icon small>mdi-chevron-down</v-icon>
                                        </v-btn>
                                    </v-btn-toggle>

                                    </template>
                                </v-toolbar>
                                <v-divider></v-divider>

                                <v-textarea placeholder="Type Here"></v-textarea>
                            </div>

                    </v-tab-item>
                    <!-- ========================================================== -->
                </v-tabs-items>
                <div class="div-btn">
                    <v-btn flat small color="primary" style="margin-right:2%"> Modify </v-btn>
                    <v-btn flat small color="primary"> Validate </v-btn>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
import LabelEdit from 'label-edit'
export default {

    components: {
        LabelEdit,
    },

    data(){
        return{
            text: 'Authorized Capital',
            text1: 'Issued, Subscribed, Paidup',
            tabs: null,
            headers: [
                {text: 'Particulars', align: 'center', value: 'particulars',sortable: false, width: '40%'},
                {text: '31-03-2021', align: 'center', value: 'fromdate',sortable: false, width: '20%'},
                {text: '31-03-2020', align: 'center', value: 'todate',sortable: false, width: '20%'},
                {text: '', align: 'center', value: '',sortable: false},
                {text: '', align: 'center', value: '',sortable: false},
            ],
            tableInputs:[
                {
                    particulars: '', fromdate: '', todate: ''
                }
            ],
            items: [
                {
                    particulars: '',
                    fromdate: '',
                    todate: ''
                }
            ],
            breadcrumbsItems: [
                {
                text: 'BSY pvt.ltd',
                disabled: false,
                href: '',
                },
                {
                text: 'Balance Sheet',
                disabled: false,
                href: '/financialbalancesheet',
                },
                {
                text: 'Share Capital',
                disabled: false,
                href: 'breadcrumbs_link_2',
                },
            ]
        }
    },
    methods:{
        textUpdated: function(text){
            this.text = text;
        },
        textUpdated1: function(text1){
            this.text1 = text1;
        },
        add(){
            this.tableInputs.push({ particulars: '', fromdate: '', todate: '' });
        },
        remove(index) {
            this.tableInputs.splice(index, 1);
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam&display=swap');
.divClass{
    margin: 20px;
    padding: 5px;
    margin-top: 25px;
}
.btn-row{
    margin-top: 8px;
    text-align: right;
}
.div-btn{
    text-align: center;
    padding: 10px;
    margin: 8px;
}
.overflow-btn{
    max-width: 10%;
    margin: 10px
}
.container-align{
    padding: 20px;
    text-align: left;
    margin: 20px;
}
.v-data-table ::v-deep th{
    font-size: 14px !important;
    font-family: 'Be Vietnam, Helvetica, Arial, sans-serif';
    padding:0px;
}
h4{
    font-size: 18px;
    font-family: 'Be Vietnam';
    text-align: left;
    font-weight: 200;
}
</style>