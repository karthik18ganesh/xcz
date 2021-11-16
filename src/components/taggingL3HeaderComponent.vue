<template >
           <div class="main-wrapper" >
            <span class="text-dark blueUline" style="float: left"
              >LEVEL 3
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
                    @click="() => params.context.componentParent.handleTagged(index, 3)"
                  >
                    <v-list-tile-title
                      ><v-icon
                        :color="params.context.componentParentlevel3filter == index ? '#008000' : 'grey'"
                        dark
                        >mdi-radiobox-marked</v-icon
                      >
                      {{ item.title }}</v-list-tile-title
                    >
                  </v-list-tile>
                </v-list>
              </v-menu>
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