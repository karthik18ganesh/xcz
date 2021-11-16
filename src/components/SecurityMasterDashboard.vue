<template>
<v-dialog>
      <v-card>
        <v-card-title class="text-h5 white lighten-2 ">
            <div >
                Security Masters
                </div>
        
        </v-card-title>
        <v-divider  class="blueUline"></v-divider>

        <v-card-text>
        <v-container>
        <div class="search-tools">
            <section class="toolbar">
                <v-text-field autocomplete="off" 
                dense
                outlined
                append-icon="mdi-magnify"
                class="text-class"
                placeholder="Search company here"
                v-model="search"
                @change="search"
                style="border:none !important;color:#DEDEDE;"
                >
                </v-text-field>
            </section>
        </div> 
<div>
<v-simple-table dense>
                 <template v-slot:default>
                    <thead>
                      <tr class="table-heading">
                        1.Equity
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                         v-for="item in details"
                         :key="item.name"
                      >
                      <td>{{ item.name }}</td>
                      </tr>
                    </tbody>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
          </template>
              </v-simple-table>
              </div>
              </v-container>
        </v-card-text>

        <v-divider></v-divider>
      </v-card>
      </v-dialog>
</template>

<script>
 export default {
     name: "SecurityMasterDashboard",
    data () {
      return {
        header:[
        { text: "", value: "actions", sortable: false },
        ],
        details: [
          {
            name: 'a.Class A Share',
          },
          {
            name: 'b.Class B Share',
          },
          {
            name: 'c.Class C Share',
          },
        ],
      }
    },
  }
</script>


<style scoped>
.table-card{
  width:100%;
  margin:0% 8.5% 0% 2.5%;
}
</style>