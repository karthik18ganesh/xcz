<template >
           <div class="main-wrapper" style="width: 100%;">
            <span class="text-dark blueUline" style="justify-content:flex-start;width: 100%;align-items: center;display: flex;"
              > {{params.context.componentParent.groupingSelected === false?"GROUPS & LEDGERS":"NAME OF LEDGER"}}
              <v-menu
                offset-y
                bottom
                :close-on-content-click="false"
                v-if="params.context.componentParent.groupingSelected === false"
                content-class="whiteBg"
                style="background-color: white"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="#03a9f4"
                    dark
                    v-on="on"
                    style="
                      height: auto !important;
                      background-color: #0000 !important;
                      box-shadow: none;
                    "
                  >
                    <v-icon color="#676767" style="font-size: 20px" dark
                      >mdi-filter-outline</v-icon
                    >
                  </v-btn>
                </template>
                <v-list
                  style="
                    display: flex;
                    flex-direction: column;
                    padding: 10px;
                    text-align: start;
                  "
                >
                  <div>
                    <div>
                      <v-text-field autocomplete="off" 
                        style="box-shadow: none; border: 1px solid #d3d3d3"
                        hide-details
                        v-model="params.context.componentParent.first"
                        label="Type Here..."
                        solo
                        @input="params.context.componentParent.filterLevel1Options"
                      ></v-text-field>
                    </div>
                    <hr class="hrstyle" />
                    <div style="height: 180px; width: 250px;background-color: #fff;overflow:auto">
                      <v-list-item style="background-color: #fff;"
                        v-for="(item, index) in params.context.componentParent.l1FilterOption"
                        :key="index"
                      >
                        <v-list-item-content
                          style="display: flex; flex-wrap: nowrap"
                          v-bind:class="{ filterChildStyle: !item.header }"
                        >
                          <v-checkbox
                            dense
                            hide-details
                            class="pa-0 ma-0"
                            :value="
                              item.header
                                ? params.context.componentParent.parentChecked[item.header]
                                : params.context.componentParent.childChecked[item.name]
                            "
                            @click="
                              item.header
                                ? params.context.componentParent.handleParentFil(item)
                                : params.context.componentParent.handleChildFil(item)
                            "
                          ></v-checkbox>
                          <v-list-item-title>{{
                            item.header ? item.header : item.name
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </div>
                </v-list>
              </v-menu>
              <img
                v-if="params.context.componentParent.groupingSelected === false && params.context.componentParent.isHeadergroupOpen"
                @click="params.context.componentParent.headerGroupHandel(1)"
                src="../assets/ungroup.jpg"
                height="16"
                width="16"
                style="cursor: pointer;"
              />
              <img
                v-if="params.context.componentParent.groupingSelected === false && !params.context.componentParent.isHeadergroupOpen"
                @click="params.context.componentParent.headerGroupHandel(2)"
                src="../assets/group.jpg"
                height="16"
                width="16"
                style="cursor: pointer;"
              />
            </span>
          </div> 
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  mounted(){
  }
});
</script>

<style scoped>
/deep/ [role=menu] {
   background-color: #fff !important;
}
</style>