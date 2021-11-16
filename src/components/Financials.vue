<template>
<v-container class="ma-0 pa-0" style="max-width:100% !important">
<v-layout v-if="e1==1">
            <v-flex xs1  style="margin-left: 2%;margin-top: 5px;">
                 <img src="../assets/profile-icon.png" height="50" width="50"/>
            </v-flex>

            <v-flex xs3 style="display:flex;align-items:center;justify-content:space-between">
                <h4 class="company-font">{{companyName}}</h4>
                 <!-- <v-divider
                inset
                vertical
                class="divider-size"
                ></v-divider> -->
            </v-flex>

            <v-flex style="display:flex;align-items:center">
      
            </v-flex>
        </v-layout>
        <v-divider v-if="e1==1" class="blueUline"></v-divider>
        <v-tabs v-if="e1!=1" v-model="tab" grow=true height="50" class="tab-decor">
    <v-tab class="tab-decor1">Comma Style</v-tab>
    <v-tab class="tab-decor1">Rounding Off</v-tab>
    <v-tab class="tab-decor1">Tagging Level</v-tab>
  </v-tabs>
<v-stepper v-model="e1" v-if="!isStepHidden" style="box-shadow: none;">

      <v-stepper-content step="1" style="display:flex;padding-top: 10px;padding-bottom: 7px;">

<v-layout style="margin-left: 35px;">
<v-flex md8>
<v-form >
<div style="display:flex;margin-bottom:10px">
        <button> <v-icon> mdi-pencil-circle-outline </v-icon> Edit Info</button>
        </div>
        <v-layout style="max-height: 50px;">
                <v-flex xs3 style="margin-right:2%">
                    <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field hide-details
                            v-model="financialData.fromDate"
                           
                            append-icon="mdi-calendar"
                            label="Financial Period From"
                            v-bind="attrs"
                            v-on="on"
                            :rules="[v => !!v || 'date is required']"
                            outlined
                            dense
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            no-title
                            v-model="financialData.fromDate"
                            @input="menu1 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-flex>

               
                
                <v-flex xs3>
                     <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="financialData.toDate"
                            persistent-hint
                            append-icon="mdi-calendar"
                            label="Financial Period To"
                            v-bind="attrs"
                            v-on="on"
                            :rules="[v => !!v || 'date is required']"
                            outlined
                            dense
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            no-title
                            v-model="financialData.toDate"
                            @input="menu1 = false"
                        ></v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>
            

                <v-layout style="max-height: 50px;">
                 <v-flex xs3 style="margin-right:2%">
                    <v-select hide-details
                    :items="availableStyles"
                        v-model="financialData.style"
                          item-text="value"
                    item-value="id"
                        label="Financial Style"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                <v-flex xs3>
                    <v-select hide-details
                        v-model="financialData.division"
                        label="Division Applicable"
                         item-text="value"
                    item-value="id"
                        :items="availableDivisions"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                <v-flex xs1 class="edit-button">
                <button> <v-icon style="font-size: 18px;"> mdi-help-circle-outline </v-icon></button>
                </v-flex>
            </v-layout>
            <v-layout style="max-height: 50px;">
            <v-flex xs4 style="display:flex;align-items:center;margin-top:15px;">
            <p class="toggle-text">Is previous year applicable ?</p>
            </v-flex>
             <v-flex xs1>
                    <v-switch hide-details style="margin-top:8px"
                        v-model="financialData.ispreviousyear"
                    >
                    <template v-slot:label>
                    Yes
                    </template>
                    </v-switch>
                </v-flex>
            </v-layout>
             <v-layout style="max-height: 40px;">
            <v-flex xs4 style="display:flex;align-items:center;margin-top:10px;">
            <p class="toggle-text">Is cash flow applicable ?</p>
            </v-flex>
             <v-flex xs1>
                    <v-switch style="margin-top:8px"
                        v-model="financialData.iscashflow"
                    >
                    <template v-slot:label>
                    Yes
                    </template>
                    </v-switch>
                </v-flex>
            </v-layout>
             <v-layout style="max-height: 40px;">
            <v-flex xs4 style="display:flex;align-items:center;margin-top:10px">
            <p class="toggle-text">Is audit applicable ?</p>
            </v-flex>
             <v-flex xs1>
                    <v-switch style="margin-top:8px"
                        v-model="financialData.isaudit"
                    >
                    <template v-slot:label>
                    Yes
                    </template>
                    </v-switch>
                </v-flex>
            </v-layout>
            <div class="heading-div" style="margin-top: 8px;margin-bottom: 10px;"> 
            <h2 style="font-size: 17px;font-weight:500" class="heading">Date Format  </h2>
            <button style="margin-left:2%"> <v-icon style="font-size: 18px;"> mdi-help-circle-outline </v-icon></button>
            </div>
            <v-layout style="max-height: 50px;margin-bottom:15px">
                <v-flex xs3 style="display:flex;margin-top:1%;max-width:17%">
                <p>Balance Sheet</p>
                </v-flex>
                 <v-flex xs3 style="margin-right:2%">
                    <v-select hide-details
                     :items="balancePeriodData"
                        v-model="bsDateFormatLabel"
                         @change="changeBalancePeriodData"
                      
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                <v-flex xs3>
                    <v-select hide-details
                        v-model="bsDateFormat"
                        :items="balanceDate"
                        @change="changeBalanceDate"
                            item-text="value"
                    item-value="id"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs3 style="display:flex;margin-top:1%;max-width:17%">
                <p>Profit & Loss A/c</p>
                </v-flex>
                 <v-flex xs3 style="margin-right:2%">
                    <v-select hide-details
                    :items="profitPeriodData"
                        v-model="plDateFormatLabel"
                       @change="changeProfitPeriodData"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                <v-flex xs3>
                    <v-select hide-details
                    v-model="plDateFormat"
                          :items="profitYearData"
                             item-text="value"
                             @change="changeProfitYear"
                    item-value="id"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
            </v-layout>
            <div class="heading-div" style="margin-top: 8px;margin-bottom: 10px;">
            <h2 style="font-size: 17px;font-weight:500" class="heading">Currency Details</h2>
            </div>
            <v-layout>
           <v-flex xs3 style="margin-right:2%">
                    <v-select hide-details
                        
                          v-model="financialData.currencyformat.name"
                         item-text="value"
                    item-value="id"
                        :items="availableCurrencyNames"
                        label="Reporting Currency"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                 <v-flex xs3 style="margin-right:2%">
                    <v-select hide-details
                     item-text="value"
                    item-value="id"
                        :items="availableCurrencySymbols"
                        v-model="financialData.currencyformat.symbol"
                        label="Currency Symbol"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
                <v-flex xs3>
                    <v-select hide-details
                          item-text="value"
                    item-value="id"
                        :items="availableDecimals"
                        label="No. of Decimals"
                        v-model="financialData.currencyformat.decimalFormat"
                        outlined
                        dense>
                    </v-select>
                </v-flex>
            </v-layout>   
    </v-form>
</v-flex>

<v-flex md4>
<v-card style="width:100% !important;padding: 15px;background: #F5F4F480;">
    <v-card-content>
    <v-row style="height:100px">
    <v-col md="6" style="display:flex;align-items:center;">
    <h4 >Balance Sheet</h4>
    </v-col>
    <v-col md="6" style="display:flex;justify-content:flex-end;">
    <h4 style="font-size: 14px;font-weight:500">{{balancePeriodFormat}}<br/>{{balanceDateFormat}}<br/><button style="width:11px;height:26px"> <v-icon> mdi-currency-inr </v-icon></button></h4>
    </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row style="margin-top:0px;font-size: 14px;">
    <v-col md="6" style="display:flex;align-items:center;">
    <p >Cash and Cash Equivalents</p>
    </v-col>
    <v-col md="6" style="display:flex;justify-content:flex-end;">
    <p >1,42,84,164.34</p>
    </v-col>
    </v-row>
     <v-row style="margin-top:0px;font-size: 14px;">
    <v-col class="lessPaddingClass" md="6" style="display:flex;align-items:center;">
    <p >Long-term Borrowings</p>
    </v-col>
    <v-col md="6" class="lessPaddingClass" style="display:flex;justify-content:flex-end;">
    <p >42,84,164.34</p>
    </v-col>
    </v-row>
     <v-row style="margin-top:0px;font-size: 14px;;margin-bottom:10px">
    <v-col md="6" class="lessPaddingClass" style="display:flex;align-items:center;">
    <p >Trade Payables</p>
    </v-col>
    <v-col md="6" class="lessPaddingClass" style="display:flex;justify-content:flex-end;">
    <p >2,62,84,164.34</p>
    </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row style="height:100px">
    <v-col md="6" style="display:flex;align-items:center;">
    <h4 >Profit and Loss A/c</h4>
    </v-col>
    <v-col md="6" style="display:flex;justify-content:flex-end;">
    <h4 style="font-size: 14px;font-weight:500">{{profitPeriodFormat}}<br/>{{profitYearFormat}}<br/><button style="width:11px;height:26px"> <v-icon> mdi-currency-inr </v-icon></button></h4>
    </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row style="margin-top:0px;font-size: 14px;">
    <v-col md="6" style="display:flex;align-items:center;">
    <p >Revenue from service</p>
    </v-col>
    <v-col md="6" style="display:flex;justify-content:flex-end;">
    <p >10,42,84,164.34</p>
    </v-col>
    </v-row>
     <v-row style="margin-top:0px;font-size: 14px;">
    <v-col md="6" class="lessPaddingClass" style="display:flex;align-items:center;">
    <p >Salaries and wages</p>
    </v-col>
    <v-col md="6" class="lessPaddingClass" style="display:flex;justify-content:flex-end;">
    <p >83,84,164.34</p>
    </v-col>
    </v-row>
     <v-row style="margin-top:0px;font-size: 14px;">
    <v-col md="6" class="lessPaddingClass" style="display:flex;align-items:center;">
    <p >Interest income</p>
    </v-col>
    <v-col md="6" class="lessPaddingClass" style="display:flex;justify-content:flex-end;">
    <p >2,62,84,164.34</p>
    </v-col>
    </v-row>

    </v-card-content>
    </v-card>     
</v-flex>
</v-layout>
</v-stepper-content>
 <v-stepper-content step="2" style="padding-top: 3px !important;font-size: 14px;" >
 <div>
 <h3 class="header-comma" style="font-size:16px !important">Financial Representation</h3>
 <p class="comma-sentence" style="font-size:14px !important">This is the Financial Representation of how the amount should be previewed</p>
<v-layout style="max-height: 67.5vh;">
<v-flex md4 style="margin-top: -10px !important;">
<v-card style="width:90% !important;margin:5%;min-height: 65vh;margin-left:10px">
<v-card-title class="commaheader-div" style="max-height: 50px !important;padding-top:6px">
<h4 class="commacard-header" style="font-size:15px !important;margin-top: -2px;">Amount in Thousands, Lakhs,Crores</h4>
<img src="../assets/selection-circle.png" height="35px" width="35px" @click="selectionCrore(true,false)" v-if="!selectedcrore" />
<img src="../assets/ellipse-tick.png" height="35px" width="35px" v-if="this.selectedcrore" />
</v-card-title>
    <v-card-content  > 
    <v-row style="padding:3px 20px">
    <v-col md="8" style="display:flex;align-items:center;">
    <h4 class="col1">Balance Sheet</h4>
    </v-col>
    <v-col md="4" style="display:flex;justify-content:flex-end;">
    <h4 style="font-size:14px;font-weight:500">As On<br/>31-03-2021<br/><button style="width:11px;height:26px"> <v-icon style="font-size:15px"> mdi-currency-inr </v-icon></button></h4>
    </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row style="padding:5px 20px;max-height:40px;height:40px;margin-top:0px;margin-bottom">
    <v-col md="8" style="display:flex;align-items:center;">
    <p style="font-size: 14px !important;">Cash and Cash Equivalents</p>
    </v-col>
    <v-col md="4" style="display:flex;justify-content:flex-end;">
    <p style="font-size: 14px !important;">1,42,84,164.34</p>
    </v-col>
    </v-row>
     <v-row style="padding:5px 20px;max-height:40px;height:40px;margin-top:0px">
    <v-col md="8" style="display:flex;align-items:center;">
    <p style="font-size: 14px !important;">Long-term Borrowings</p>
    </v-col>
    <v-col md="4" class="lessPaddingClass" style="display:flex;justify-content:flex-end;">
    <p style="font-size: 14px !important;">42,84,164.34</p>
    </v-col>
    </v-row>
     <v-row style="padding:5px 20px;max-height:43px;height:43px;margin-top:0px">
    <v-col md="8" style="display:flex;align-items:center;">
    <p style="font-size: 14px !important;">Trade Payables</p>
    </v-col>
    <v-col md="4" class="lessPaddingClass" style="display:flex;justify-content:flex-end;">
    <p style="font-size: 14px !important;">2,62,84,164.34</p>
    </v-col>
    </v-row>
    <v-divider style="margin-top: 22px;"></v-divider>
    <v-row style="padding:3px 20px">
    <v-col md="6" style="display:flex;align-items:center">
    <h4 class="col1">Profit and Loss A/c</h4>
    </v-col>
    <v-col md="6" style="display:flex;justify-content:flex-end;">
    <h4 style="font-size:14px;font-weight:500">For the year<br/>2020-2021<br/><button style="width:11px;height:26px"> <v-icon style="font-size:15px"> mdi-currency-inr </v-icon></button></h4>
    </v-col>
    </v-row>
    <v-divider ></v-divider>
    <v-row style="padding:5px 20px;max-height:40px;height:40px;margin-top:0px;margin-bottom">
    <v-col md="8" style="display:flex;align-items:center;">
    <p style="font-size: 14px !important;">Revenue from service</p>
    </v-col>
    <v-col md="4" style="display:flex;justify-content:flex-end;">
    <p style="font-size: 14px !important;">1,42,84,164.34</p>
    </v-col>
    </v-row>
     <v-row style="padding:5px 20px;max-height:40px;height:40px;margin-top:0px">
    <v-col md="8" style="display:flex;align-items:center;">
    <p style="font-size: 14px !important;">Salaries and wages</p>
    </v-col>
    <v-col md="4" class="lessPaddingClass" style="display:flex;justify-content:flex-end;">
    <p style="font-size: 14px !important;">42,84,164.34</p>
    </v-col>
    </v-row>
     <v-row style="padding:5px 20px;max-height:40px;height:40px;margin-top:0px">
    <v-col md="8" style="display:flex;align-items:center;">
    <p style="font-size: 14px !important;">Interest Income</p>
    </v-col>
    <v-col md="4" class="lessPaddingClass" style="display:flex;justify-content:flex-end;">
    <p style="font-size: 14px !important;">2,62,84,164.34</p>
    </v-col>
    </v-row>
    </v-card-content>
    </v-card>
</v-flex>
<v-flex md4 style="margin-top: -10px !important;">
<v-card style="width:90% !important;margin:5%;min-height: 65vh;margin-left:10px">
<v-card-title class="commaheader-div" style="max-height: 50px !important;padding-top:6px">
<h4 class="commacard-header" style="font-size:15px !important;margin-top: -2px;">Amount in Thousands, Millions, Billions</h4>
<img src="../assets/selection-circle.png" height="35px" width="35px" @click="selectionCrore(false,true)" v-if="!selectedcrore" />
<img src="../assets/ellipse-tick.png" height="35px" width="35px" v-if="this.selectedcrore" />
</v-card-title>
    <v-card-content  > 
    <v-row style="padding:3px 20px">
    <v-col md="8" style="display:flex;align-items:center;">
    <h4 class="col1">Balance Sheet</h4>
    </v-col>
    <v-col md="4" style="display:flex;justify-content:flex-end;">
    <h4 style="font-size:14px;font-weight:500">As On<br/>31-03-2021<br/><button style="width:11px;height:26px"> <v-icon style="font-size:15px"> mdi-currency-inr </v-icon></button></h4>
    </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row style="padding:5px 20px;max-height:40px;height:40px;margin-top:0px;margin-bottom">
    <v-col md="8" style="display:flex;align-items:center;">
    <p style="font-size: 14px !important;">Cash and Cash Equivalents</p>
    </v-col>
    <v-col md="4" style="display:flex;justify-content:flex-end;">
    <p style="font-size: 14px !important;">1,42,84,164.34</p>
    </v-col>
    </v-row>
     <v-row style="padding:5px 20px;max-height:40px;height:40px;margin-top:0px">
    <v-col md="8" style="display:flex;align-items:center;">
    <p style="font-size: 14px !important;">Long-term Borrowings</p>
    </v-col>
    <v-col md="4" class="lessPaddingClass" style="display:flex;justify-content:flex-end;">
    <p style="font-size: 14px !important;">42,84,164.34</p>
    </v-col>
    </v-row>
     <v-row style="padding:5px 20px;max-height:43px;height:43px;margin-top:0px">
    <v-col md="8" style="display:flex;align-items:center;">
    <p style="font-size: 14px !important;">Trade Payables</p>
    </v-col>
    <v-col md="4" class="lessPaddingClass" style="display:flex;justify-content:flex-end;">
    <p style="font-size: 14px !important;">2,62,84,164.34</p>
    </v-col>
    </v-row>
    <v-divider style="margin-top: 22px;"></v-divider>
    <v-row style="padding:3px 20px">
    <v-col md="6" style="display:flex;align-items:center">
    <h4 class="col1">Profit and Loss A/c</h4>
    </v-col>
    <v-col md="6" style="display:flex;justify-content:flex-end;">
    <h4 style="font-size:14px;font-weight:500">For the year<br/>2020-2021<br/><button style="width:11px;height:26px"> <v-icon style="font-size:15px"> mdi-currency-inr </v-icon></button></h4>
    </v-col>
    </v-row>
    <v-divider ></v-divider>
    <v-row style="padding:5px 20px;max-height:40px;height:40px;margin-top:0px;margin-bottom">
    <v-col md="8" style="display:flex;align-items:center;">
    <p style="font-size: 14px !important;">Revenue from service</p>
    </v-col>
    <v-col md="4" style="display:flex;justify-content:flex-end;">
    <p style="font-size: 14px !important;">1,42,84,164.34</p>
    </v-col>
    </v-row>
     <v-row style="padding:5px 20px;max-height:40px;height:40px;margin-top:0px">
    <v-col md="8" style="display:flex;align-items:center;">
    <p style="font-size: 14px !important;">Salaries and wages</p>
    </v-col>
    <v-col md="4" class="lessPaddingClass" style="display:flex;justify-content:flex-end;">
    <p style="font-size: 14px !important;">42,84,164.34</p>
    </v-col>
    </v-row>
     <v-row style="padding:5px 20px;max-height:40px;height:40px;margin-top:0px">
    <v-col md="8" style="display:flex;align-items:center;">
    <p style="font-size: 14px !important;">Interest Income</p>
    </v-col>
    <v-col md="4" class="lessPaddingClass" style="display:flex;justify-content:flex-end;">
    <p style="font-size: 14px !important;">2,62,84,164.34</p>
    </v-col>
    </v-row>
    </v-card-content>
    </v-card>
</v-flex>

</v-layout>
</div>
</v-stepper-content>
<v-stepper-content step="3" >
<div>
 <h3 class="header-comma">Rounding Off</h3>
 <!-- <p class="comma-sentence">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form<br/>of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder</p> -->
 <v-layout style="margin-top:15px;margin-bottom: 50px;">
 <div id="apptable" style="width:100%">

    <v-data-table
      dense
      id="roundingoff"
      disable-sort
      hide-default-footer
      :items="cars"
      item-key="id"
      group-by="format"
      style="color: #808080;"
    >
     <template v-slot:header="{ props: { headers } }" >
       <thead :colspan="headers.length" class="header-view">
         <tr>
       <th class="header-fontview" style="background-color: #03a9f4;">Particulars</th>
         <th class="header-fontview" style="background-color: #03a9f4;" @click="roundingOff=1"><img v-if="roundingOff==1" src="../assets/financial_icon.png" height="24px" width="24px" style="margin-left:17%"/><br/>In Actuals</th>
         <th class="header-fontview" style="background-color: #03a9f4;" @click="roundingOff=2"><img v-if="roundingOff==2" src="../assets/financial_icon.png" height="24px" width="24px" style="margin-left:17%"/><br/>In Thousands</th>
         <th class="header-fontview" style="background-color: #03a9f4;" @click="roundingOff=3"><img v-if="roundingOff==3" src="../assets/financial_icon.png" height="24px" width="24px" style="margin-left:17%"/><br/>{{selectedbillion?"In Million":"In Lakhs"}}</th>
         <th class="header-fontview" style="background-color: #03a9f4;" @click="roundingOff=4"><img v-if="roundingOff==4" src="../assets/financial_icon.png" height="24px" width="24px" style="margin-left:17%"/><br/>{{selectedbillion?"In Billion":"In Crores"}}</th>
         </tr>
       </thead>
     </template>
      <template v-slot:group.header="{items}" style="background: #C4C4C4;opacity:2.0 !important">
          <th class="header-font" style="color:grey;font-weight:500;">{{ items[0].format }}</th>
          <th><h4 class="col2 header-font" style="font-size:12px !important;font-weight:500;color:grey;">As On<br/>31-03-2021<br/>(<v-icon style="font-size:15px"> mdi-currency-inr </v-icon>)</h4>
          </th>
          <th><h4 class="col2 header-font" style="font-size:12px !important;font-weight:500;color:grey;">As On<br/>31-03-2021<br/>(<v-icon style="font-size:15px"> mdi-currency-inr </v-icon>)</h4></th>
          <th><h4 class="col2 header-font" style="font-size:12px !important;font-weight:500;color:grey;">As On<br/>31-03-2021<br/>(<v-icon style="font-size:15px"> mdi-currency-inr </v-icon>)</h4></th>
          <th><h4 class="col2 header-font" style="font-size:12px !important;font-weight:500;color:grey;">As On<br/>31-03-2021<br/>(<v-icon style="font-size:15px"> mdi-currency-inr </v-icon>)</h4></th>
      </template>
      <template v-slot:item="{ item }" >
        <tr style="height: 45px;">
          <td class="text-font">{{ item.name }}</td>
          <td class="text-font">{{ item.actual }}</td>
          <td class="text-font">{{ item.thousand }}</td>
          <td class="text-font">{{ item.lakh }}</td>
          <td class="text-font">{{ item.crore }}</td>
        </tr>
      </template>
    </v-data-table>

</div>

</v-layout>
 </div>
</v-stepper-content>
<v-stepper-content step="4"  style="padding-bottom:true">
<div>
<div style="margin-left:20px">
<v-radio-group style="margin-top:0px"
      v-model="tagginglevelfix" hide-details
      row
    >
      <v-radio
        label="Simplified"
        value="1"
        color="green"
      ></v-radio>
      <v-radio
        label="Standard"
        value="2"
        color="green"
      ></v-radio>
    </v-radio-group>
</div>
 <v-layout>
 <v-flex md4>
<v-card style="width:86% !important;margin-left:20px;margin-top: 10px;margin-bottom: 8px;padding-bottom: 10px;">
<v-card-title class="commaheader-div" style="max-height: 50px !important;padding-top:6px">
<h4 class="commacard-header">Type 1</h4>
<img src="../assets/selection-circle.png" height="35px" width="35px" v-if="!this.selectedtype" @click="typeSelection(true)" style="margin-bottom:3%"/>
<img src="../assets/ellipse-tick.png" height="35px" width="35px" v-if="this.selectedtype" @click="typeSelection(false)" style="margin-bottom:3%"/>
</v-card-title>
    <v-card-content>
    <p class="e4Header">Liability</p>
    <p class="e4row">Share Capitial</p>
    <p class="e4row">Reserves and surplus</p>
    <p class="e4row">Money received against share warrants</p>
    <p class="e4row">Share application money pending allotment</p>
    <p class="e4row">Long Term Borrowing</p>
    <p class="e4row">Deferred tax liabilty (net)</p>
    <p class="e4Header seco">Assets</p>
    <p class="e4row">Property, plant and Equipment</p>
    <p class="e4row">Non current Investment</p>
    <p class="e4row">Deffered tax assests(net)</p>
    <p class="e4row">Current investment</p>
    </v-card-content>
 </v-card>   
 </v-flex>
 <v-flex md4>
  <v-card style="width:86% !important;margin-left:20px;margin-top: 10px;margin-bottom: 5px;padding-bottom: 10px;">
<v-card-title class="commaheader-div" style="max-height: 50px !important;padding-top:6px">
<h4 class="commacard-header">Type 2</h4>
<img src="../assets/selection-circle.png" height="35px" width="35px" v-if="!this.selectedtype" @click="typeSelection2(true)" style="margin-bottom:3%"/>
<img src="../assets/ellipse-tick.png" height="35px" width="35px" v-if="this.selectedtype" @click="typeSelection2(false)" style="margin-bottom:3%"/>
</v-card-title>
    <v-card-content>
    <p class="e4Header">Liability</p>
    <p class="e4rowWithIcon"> <v-icon class="plus-button">mdi-plus-box-outline</v-icon> Share Capitial</p>
    <p class="e4rowWithIcon"> <v-icon class="plus-button">mdi-plus-box-outline</v-icon> Reserves and surplus</p>
    <p class="e4rowWithIcon"> <v-icon class="plus-button">mdi-plus-box-outline</v-icon> Money received against share warrants</p>
    <p class="e4rowWithIcon"> <v-icon class="plus-button">mdi-plus-box-outline</v-icon> Share application money pending allotment</p>
    <p class="e4rowWithIcon"> <v-icon class="plus-button">mdi-minus-box-outline</v-icon> Long Term Borrowing</p>
    <p class="e4row">Debentures</p>
    <p class="e4row">Bonds</p>
    <p class="e4row">Term loans</p>
    <p class="e4row">Working capital loans from banks</p>
    <p class="e4row">Deposits</p>
    <p class="e4rowWithIcon"> <v-icon class="plus-button">mdi-minus-box-outline</v-icon> Deferred tax liabilty (net)</p>
    </v-card-content>
 </v-card>   
 </v-flex>
 <v-flex md4 v-if="tagginglevelfix != '1'">
<v-card style="width:86% !important;margin-left:20px;margin-top: 10px;margin-bottom: 5px;padding-bottom: 10px;">
<v-card-title class="commaheader-div" style="max-height: 50px !important;padding-top:6px">
<h4 class="commacard-header">Type 3</h4>
<img src="../assets/selection-circle.png" height="35px" width="35px" v-if="!this.selectedtype" @click="typeSelection3(true)" style="margin-bottom:3%"/>
<img src="../assets/ellipse-tick.png" height="35px" width="35px" v-if="this.selectedtype" @click="typeSelection3(false)" style="margin-bottom:3%"/>
</v-card-title>
    <v-card-content>
    <p class="e4Header">Liability</p>
    <p class="e4rowWithIcon"> <v-icon class="plus-button">mdi-plus-box-outline</v-icon> Share Capitial</p>
    <p class="e4rowWithIcon"> <v-icon class="plus-button">mdi-plus-box-outline</v-icon> Reserves and surplus</p>
    <p class="e4rowWithIcon"> <v-icon class="plus-button">mdi-plus-box-outline</v-icon> Money received against share warrants</p>
    <p class="e4rowWithIcon"> <v-icon class="plus-button">mdi-plus-box-outline</v-icon> Share application money pending allotment</p>
    <p class="e4rowWithIcon"> <v-icon class="plus-button">mdi-minus-box-outline</v-icon> Long Term Borrowing</p>
    <p class="e4row"><v-icon class="plus-button" style="margin-right: 6px;margin-bottom: 2px;">mdi-minus-box-outline</v-icon>Debentures</p>
    <p class="e4rowtype3">Fully convertable debunture banks</p>
    <p class="e4rowtype3">Fully convertable debunture governments</p>
    <p class="e4rowtype3">Fully convertable debunture others</p>
    <p class="e4row"><v-icon class="plus-button" style="margin-right: 6px;margin-bottom: 2px;">mdi-plus-box-outline</v-icon>Bonds</p>
    <p class="e4row"><v-icon class="plus-button" style="margin-right: 6px;margin-bottom: 2px;">mdi-plus-box-outline</v-icon>Term loans</p>
    </v-card-content>
 </v-card>  

</v-flex>
 </v-layout>
 </div>
</v-stepper-content>
 <v-stepper-header style="max-height:48px;box-shadow: none;margin: 0px 30px;margin-top: -5px;">
   <v-col md="8" style="display:flex;padding:0px">
        <v-stepper-step style="max-height: 10px;" :complete="e1 > 1" step="1"></v-stepper-step>
  
        <v-divider  style="max-height: 10px;"></v-divider>
  
        <v-stepper-step  style="max-height: 10px;" :complete="e1 > 2" step="2"></v-stepper-step>
  
        <v-divider  style="max-height: 10px;"></v-divider>

  <v-stepper-step  style="max-height: 10px;" :complete="e1 > 3" step="3"></v-stepper-step>
  
        <v-divider  style="max-height: 10px;"></v-divider>
        <v-stepper-step  style="max-height: 10px;" step="4">
        </v-stepper-step  >
   </v-col >
   <v-col md="4" style="display:flex;padding:0px;justify-content: center;margin-top: -5px;">
            
            <v-btn v-if="e1!=1"
                class="ma-2"
                color="#03a9f4"
                style="color:white"
                @click="pagePreviewChange"
            >
                Previous
            </v-btn>
            <v-btn
            v-if="e1!=4"
                class="ma-2"
                outlined
                color="#03a9f4"
                style="border-color:#03a9f4 !important;text-transform:none;"
                @click="pageChange"
            >
                Continue
            </v-btn>
            <v-btn v-if="e1==4"
            @click="saveFinancials"
                class="ma-2"
                color="#03a9f4"
                style="background-color: #03a9f4 !important;border-color:#03a9f4 !important;text-transform:none;color:white"
            >
                Save
            </v-btn>
        </v-col >
      </v-stepper-header>
</v-stepper>
</v-container>
</template>



<script>
 export default {
    data () {
      return {
        tagginglevelfix:"1",
        roundingOff:1,
        companyName:"",
        financialData:{fromDate:"",toDate:"",
        isaudit:false,iscashflow:false,
        ispreviousyear:false,
        balancePeriodFormat:"",
        balanceDateFormat:"",
        profitPeriodFormat:"",
        subData:false,
        profitYearFormat:"",
        style:"",division:"",
        dateformat:{bsDateFormatLabel:"As on",bsDateFormat:"31-03-21",plDateFormatLabel:"For the year",plDateFormat:"2020-2021"},
        currencyformat:{"name":12,"symbol":1,"decimalFormat":1},
        },
        bsDateFormatLabel:"As on",
        bsDateFormat:"31-03-21",
        plDateFormatLabel:"For the year",
        plDateFormat:"2020-2021",
         balancePeriodData:["As on","As at"],
         profitPeriodData:['For the year','For the period'],
         balanceDate:['31-03-2021','31-03-21','31/03/21'],
         profitYearData:['2020-2021','20-21','2020-21'],
        e1: 1,
        steps: 1,
        selectedcrore:false,
        selectedtype:false,
        selectedtype2:false,
        selectedtype3:false,
        selectionBillion:false,
        selecteditem: 1,
      list1: [
        { text: 'Tangible Assets' },
        { text: 'Intangible Assets' },
        { text: 'Non-current Investments' },
        { text: 'Current Investments' },
      ],
      list2: [
        { text: 'Reserves and Surplus' },
        { text: 'Long-term Borrowings' },
        { text: 'Short-term Borrowings' },
        { text: 'Proprietor Capital Account' },
        { text: 'Proprietor Current Account' },
      ],
      admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      availableDivisions:[{id:'Division I',value:'Division -1'},{id:'Division II',value:'Division -||'}],
      availableStyles:[{id:'Vertical',value:'Vertical'},{id:'Horizontal',value:'Horizontal'}],
      // availableDateFromats:[{id:'MM-DD-YYYY',value:'31-03-2021'},{id:'MM-DD-YY',value:'31-03-21'},{id:'MM/DD/YY',value:'31/03/21'}],
      // availablePLDateFromats:[{id:'MM-DD-YYYY',value:'2020-2021'},{id:'MM-DD-YY',value:'20-21'},{id:'YYYY-YY',value:'2020-21'}],
      availableCurrencySymbols:[{id:'1',value:'INR (₹)'},{id:'3',value:'SGD ($)'},{id:'2',value:'AUD ($)'}],
      availableCurrencyNames:[{id:'11',value:'Indian Rupee (₹)'},{id:'13',value:'Singapore Dollar ($)'},{id:'12',value:'AUS Dollar ($)'}],
      availableDecimals:[{id:'0',value:'1 (EG 12345)'},{id:'1',value:'1 (EG 1234.5)'},{id:'2',value:'1 (EG 123.45)'}],
      
      headers: [
        { text: 'Particulars', value: 'name' },
        { text: 'In Actuals', value: 'actual' },
        { text: 'In Thousands', value: 'thousand' },
        { text: 'In Lakhs', value: 'lakh' },
        { text: 'In Crores', value: 'crore' }

      ],
      cars: [
        {
          id: 1,
          name: 'Cash and Cash Equivalents',
          format: 'Balance Sheet',
          actual:'1,42,364,34.65',
          thousand:'14,236.34',
          lakh: '142.36',
          crore:'1.42'
        },
       {
          id: 1,
          name: 'Revenue from Service',
          format: 'Profit and Loss Account',
          actual:'1,42,364,34.65',
          thousand:'14,236.34',
          lakh: '142.36',
          crore:'1.42'
        },
        {
          id: 1,
          name: 'Trade Payables',
          format: 'Balance Sheet',
          actual:'1,42,364,34.65',
          thousand:'14,236.34',
          lakh: '142.36',
          crore:'1.42'
        },
       {
          id: 1,
          name: 'Salaries and Wages',
          format: 'Profit and Loss Account',
          actual:'1,42,364,34.65',
          thousand:'14,236.34',
          lakh: '142.36',
          crore:'1.42'
        },
      ]
      }
    },
    mounted(){
      this.companyName = JSON.parse(sessionStorage.getItem("master")).entity[0].name;
      this.balancePeriodFormat="As on",
      this.balanceDateFormat="31-03-21",
      this.profitPeriodFormat="For the year",
      this.profitYearFormat="2020-2021"
      console.log(this.balancePeriodFormat,this.balanceDateFormat,this.profitPeriodFormat,this.profitYearFormat,"dataaa")
      if(this.$store.getters.getMasterData.financial.length>0){
        this.financialData.fromDate=this.$moment(this.$store.getters.getMasterData.financial[0].period_from).format("YYYY-MM-DD")
        ;
        this.financialData.toDate=this.$moment(this.$store.getters.getMasterData.financial[0].period_to).format("YYYY-MM-DD");
        if(this.$store.getters.getMasterData.financial[0].commonstyle==1){
          this.selectionCrore(true,false)
        }
        if(this.$store.getters.getMasterData.financial[0].tagginglevelformat==1){
          this.selectedtype=true;
        }
        else if(this.$store.getters.getMasterData.financial[0].tagginglevelformat==2){
          this.selectedtype2=true;
        }
        else if(this.$store.getters.getMasterData.financial[0].tagginglevelformat==3){
          this.selectedtype3=true;
        }
        this.financialData.isaudit=this.$store.getters.getMasterData.financial[0].isaudit;
        this.financialData.iscashflow=this.$store.getters.getMasterData.financial[0].iscashflow;
        this.financialData.division=this.$store.getters.getMasterData.financial[0].division;
        this.financialData.style=this.$store.getters.getMasterData.financial[0].style;
        this.financialData.tagginglevelname=this.$store.getters.getMasterData.financial[0].tagginglevelname;
         this.financialData.ispreviousyear=this.$store.getters.getMasterData.financial[0].ispreviousyear;
         this.financialData.dateformat=this.$store.getters.getMasterData.financial[0].dateformat;
         this.financialData.currencyformat=this.$store.getters.getMasterData.financial[0].currencyformat;
        

      }
console.log("town",this.$store.getters.getMasterData.financial,this.$moment(this.$store.getters.getMasterData.financial[0].period_from).format("YYYY-MM-DD"))
    },

    watch: {
      steps (val) {
        if (this.e1 > val) {
            console.log(this.e1,"e1 value")
          this.e1 = val
        }
      },
    },

    methods: {
      pagePreviewChange(){
        console.log("e1 value")
        if(this.e1 == 2){
        this.e1 = 1;
        }
        else if(this.e1 == 3){
        this.e1 = 2;this.tab =0;
        }
        else if(this.e1 == 4){
          this.e1 = 3;this.tab =1;
        }
        else{
          this.e1 = 1;
        }
      },
      pageChange(){
        console.log("e1 value")
        if(this.e1 == 1){
        this.e1 = 2;this.tab =0;
        }
        else if(this.e1 == 2){
        this.e1 = 3;this.tab =1;
        }
        else if(this.e1 == 3){
        this.e1 = 4;this.tab =2;
        }
        else if(this.e1 == 4){
          this.lastContinueClick()
        }
        else{
          this.e1 = 1;
        }
      },
      async saveFinancials(){
        console.log(this.financialData,"this.financialData",this.selectedcrore,this.selectedbillion,this.roundingOff);
        let findCurrencyNameIndex = this.$_.findLastIndex(this.availableCurrencyNames, {
        id:this.financialData["currencyformat"]["name"]
      });
        let findCurrencySymbolIndex = this.$_.findLastIndex(this.availableCurrencySymbols, {
        id:this.financialData["currencyformat"]["symbol"]
      });
        let findCurrencyDecimalIndex = this.$_.findLastIndex(this.availableDecimals, {
        id:this.financialData["currencyformat"]["decimalFormat"]
      });
        
        if(findCurrencyNameIndex!=-1)this.financialData["currencyformat"]["name"]= this.availableCurrencyNames[findCurrencyNameIndex]
        if(findCurrencySymbolIndex!=-1)this.financialData["currencyformat"]["symbol"]= this.availableCurrencySymbols[findCurrencySymbolIndex]
        if(findCurrencyDecimalIndex!=-1)this.financialData["currencyformat"]["decimalFormat"]=this.availableDecimals[findCurrencyDecimalIndex]
        
        this.financialData["commonstyle"]= this.selectedcrore?1:2;
        this.financialData["roundingoff"]= this.roundingOff;
        if(this.roundingOff == 1 ){
          this.financialData["amountIn"]= "In Actuals";
        }
        else if(this.roundingOff == 2){
          this.financialData["amountIn"]= "In Thousands";
        }
        else if(this.roundingOff == 3){
          this.financialData["amountIn"]= this.selectedcrore?"In Lakhs":"In Million";
        }
        else if(this.roundingOff == 4){
          this.financialData["amountIn"]= this.selectedcrore?"In Crores":"In Billion";
        }
        this.financialData["tagginglevel"]= this.selectedtype?1:this.selectedtype2?2:3;
        this.financialData["tagginglevelType"]= this.tagginglevelfix;
        console.log(this.financialData,"final");

try{          
            var res = await this.$apiService.post('/master',{financialDetails:this.financialData,financialid:sessionStorage.getItem("financialId")});
            if(res&&res.status === 200) {

    this.lastContinueClick()  ;        
   this.showSuccess("Save Success");        
}
                 
            
        }
        catch(error) {
         console.log(error,"this is")
           }
      },
      nextStep (n) {
        console.log("e1 value")
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
      selectionCrore(val1,val2){
          this.selectedcrore=val1;
          this.selectedbillion=val2;
      },
      typeSelection(val){
        this.selectedtype=val;
      },
       typeSelection2(val){
        this.selectedtype2=val;
      },
       typeSelection3(val){
        this.selectedtype3=val;
      },
       lastContinueClick(){
            this.$router.push('/directors');
        },
        changeBalancePeriodData(item){
        this.balancePeriodFormat=item;
        },
        changeBalanceDate(item){
        this.balanceDateFormat=item;
        },
        changeProfitPeriodData(item){
        this.profitPeriodFormat=item;
        },
        changeProfitYear(item){
        this.profitYearFormat=item;
        },
        showSubData(){
          this.subData=true;
        }
    },
  }
</script>


<style scoped>
.toolbar-align{
    margin-left: 50px;
    margin-right: 100px;
}
.toolbar-align1{
    margin-left: 100px;
}
.blueUline{
    width:100%;
    border-top: 3px solid #03a9f4;
}
.edit-button{
    display:flex;
    margin-left:1%;
}
.heading{
    
font-size: 24px;
color:#03a9f4;

}
.heading-div{
    display:flex;
    margin:2% 0% 3% 0%;
}
.card-div{
    display:flex;
    justify-content:space-between;
    align-items:center;
}
.v-stepper_header{
    width:52%;
    margin-left:22%;
}
.btn-align{
    text-align: right;
    margin-top: 15px;
}
.tab-decor{
    color: #9F9F9F;
    
font-size: 24px;
font-style: normal;
font-weight: 900 !important;
}

.tab-decor1{
    font-weight: 900 !important;
}
.header-comma{
    text-align:initial;
    color: #03a9f4;

font-size: 20px;
font-style: normal;
font-weight: 500;
margin-left:1.5%;
}
.comma-sentence{
  text-align:initial;
  
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  margin-left:1.5%;
}
/deep/p{
  margin: 0px;
}
.commacard-header{

    line-height: 17px;
    letter-spacing: 0px;
    text-align: left;
    color: #fff;
    font-size: 16px !important;
    margin-top: -13px;
    font-weight: 500;
}
.company-font{
    
font-size: 18px !important;
font-style: normal;
font-weight: 600;
color: #03a9f4;
margin:0% 1% 1% 0%;
}
.year-font{
    
font-size: 22px !important;
font-style: normal;
font-weight: 700;
margin:0% 8% 1% 5%;
}
.data-font{
    
font-size: 17px !important;
font-style: normal;
font-weight: 400;
line-height: 23px;
text-align:left;
margin-left:3%;
}
.divider-size{
    border-right: 1px solid rgba(64, 64, 64, 0.25);
    height: 3em;
    margin-top:6% !important;
}
.commaheader-div{
height: 74px;
background: #03a9f4;
display:flex;
justify-content:space-between;
}
.col1{
    margin-left:5%;
    
}
.col2{
    margin:2% 3% 2% 0%;
}
.col-content{
    
font-size: 15px !important;
font-style: normal;
font-weight: 400;
}
.lessPaddingClass{
    /* padding-top:2px; */
}
.headerFont{
max-height: 15px;
    
    font-size: 17px !important;
font-style: normal;
font-weight: 400;
line-height: 29px;
letter-spacing: 0px;
text-align: left;
color:black !important;
padding: 0px;
}
.header-view{
  background: #03a9f4 !important;
  height: 77px !important;
width: 1095px !important;
border-radius: 25px 25px 0px 0px !important;
}
.header-fontview{
font-size: 18px !important;
font-style: normal;
font-weight: 500 !important;
color:white !important;
}
.text-start{
  color:white !important;
  
font-size: 18px !important;
font-style: normal;
font-weight: 500;
}
.text-font{
  
font-size: 15px !important;
font-style: normal;
font-weight: 400;
text-align:left;
}
.header-font{

font-size: 16px !important;
font-style: normal;
}
.plus-button{
      color: #2E3A59 !important;
    height: 6px;
    width: 6px;
    margin-right: 3px;
    font-size: 14px;
}

/deep/ .v-data-table__wrapper{
  width:100% !important;
}
/deep/ .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    font-size: 13px !important;
    font-weight: 600;
    background-color: #ecebeb;
    text-align: start !important;
    padding-left: 55px;
    color: #808080;
}

/deep/.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    font-size: 13px !important;
    text-align: start !important;
    padding-left: 4vw;
}
  /deep/.v-input input {
      font-size: 14px !important;
  }
  /deep/.v-text-field--outlined.v-input--dense .v-label {
      font-size: 14px;
  }

  /deep/.theme--light.v-data-table {
    box-shadow: none !important;
  }
  /deep/ button{
    font-size: 14px !important;
  }

  /deep/.mdi-calendar::before {
    font-size: 15px;
}

/deep/ p{
  color: grey;
}

/deep/ .v-select.v-text-field--outlined:not(.v-text-field--single-line).v-input--dense .v-select__selections {
    font-size: 14px;
    color:grey
}

/deep/ .v-stepper--is-booted .v-stepper__content, .v-stepper--is-booted .v-stepper__wrapper {
    padding: 15px 35px !important;
}

/deep/ #roundingoff>.v-data-table__wrapper{
  border-radius: 20px;
  margin-left:20px;
  }

/deep/ .v-application .primary {
    background-color: #03a9f4 !important;
    border-color: #03a9f4 !important;
}

.e4Header{
   margin: 10px;
   margin-left: 20px;
   text-align: start;
}
.e4row {
    margin: 8px;
    margin-left: 40px;
    font-size: 14px;
    text-align: start;
}
.e4rowWithIcon{
  margin: 9.1px;
    margin-left: 20px;
   text-align: start;
   font-size: 14px;
}

.e4rowtype3{
  margin: 8px;
    margin-left: 70px;
   text-align: start;
   font-size: 14px;
}
</style>