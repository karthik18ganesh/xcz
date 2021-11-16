<template >
           <div class="main-wrapper" >
            <span style="float: left" class="text-dark blueUline">
              <span>{{ params.displayName.toUpperCase() }}&nbsp;&nbsp; </span>

              <v-menu offset-y bottom :close-on-content-click="false">
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
                    <v-icon color="grey" style="font-size:20px" dark>mdi-chevron-down</v-icon>
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
                  <v-list-tile
                    style="padding: 3px; cursor: pointer"
                    v-for="(item, index) in [
                      { title: 'Show untagged Ledgers' },
                      { title: 'Show tagged Ledgers' },
                    ]"
                    :key="index"
                    @click="() => params.context.componentParent.handleTagged(index, 1)"
                  >
                    <v-list-tile-title
                      ><v-icon
                        :color="params.context.componentParent.level1filter == index ? '#008000' : 'grey'"
                        dark
                        >mdi-radiobox-marked</v-icon
                      >
                      {{ item.title }}</v-list-tile-title
                    >
                  </v-list-tile>
                </v-list>
              </v-menu>
              <v-btn
                x-small
                color="#03a9f4"
                style="float: right"
                dark
                @click="() => params.context.componentParent.bulkTagLevel(2)"
              >
                Bulk Tag
              </v-btn>
              <v-icon
                v-if="!params.context.componentParent.showLevel2"
                color="grey"
                style="float: right"
                @click="params.context.componentParent.showLevel2Fields()"
                dark
                >mdi-menu-right</v-icon
              >
              <v-icon
                v-if="params.context.componentParent.showLevel2"
                color="grey"
                style="float: right"
                @click="params.context.componentParent.hideLevel2Fields()"
                dark
                >mdi-menu-left</v-icon
              >
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