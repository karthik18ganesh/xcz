<template >
           <div class="main-wrapper" >
<v-menu
                      offset-y
                      bottom
                      v-if="params.context.componentParent.groupingSelected || !params.data.isParentName"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          dark
                          class="noHover"
                          v-bind="attrs"
                          style="
                            background-color: #fff;
                            box-shadow: none !important;
                            color: #494949 ;text-transform: capitalize;padding: 0px;height: auto !important;
                          "
                          v-on="on"
                        >
                          {{ drcr?drcr:'' }}
                          <v-icon color="grey" style="font-size:20px" dark>mdi-menu-down</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(item, index) in [{ title: 'Dr' }, { title: 'Cr' }]"
                          :key="index"
                          @click="
                            params.context.componentParent.drcrChange(params.data.parent, params.data.name, item.title)
                          "
                        >
                          <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
          </div> 
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data(){
    return{
    drcr :''
    }
  },
  mounted(){
    console.log(this.params.data.balance)
    this.drcr = this.params.data.balance<0?'Dr':'Cr';
  }
});
</script>