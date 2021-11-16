<template>
    <div>
        <v-layout>
            <v-flex xs1  style="margin-left:4%">
                <p></p>
                <v-img src="https://picsum.photos/id/11/500/300" class="img-border" max-height="60" max-width="55"></v-img>
            </v-flex>

            <v-flex xs3>
                <p></p>
                <h4>Name</h4>
            </v-flex>

            <v-flex xs1>
                <p></p>
                <v-divider
                inset
                vertical
                class="divider-size"
                ></v-divider>
            </v-flex>

            <v-flex>
                <p></p>
                <h6>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate 
the visual form of a document or a typeface without relying on meaningful content.</h6>
            </v-flex>
        </v-layout>

        <v-divider class="blueUline"></v-divider>

        <v-card
        max-width="100%"
        class="table-align"
        >
        <v-card-title class="card-align">
            <button>
                <v-icon>mdi-plus</v-icon>
                    Add
            </button>
        </v-card-title>
        <v-data-table
            v-model="selected"
            :headers="headers"
            @click:row="handleClick"
            class="elevation-1"
            loading="Loading...."
        >
            <!-- <template v-slot:item="{ item }">
                <tr>
                    <template >
                    <td>{{ item.slno }}</td>
                    </template>
                    <td>{{ item.name }}</td>
                    <td>{{ getFormatDate(item.reportingperioddata.map(i => i.fromdate).join('')) }}
                         - {{ getFormatDate(item.reportingperioddata.map(i => i.fromdate).join(' ')) }}</td>
                    <td>{{ item.users.map(i => i.username).join(' ') }}</td>
                    <td>
                    </td>
                    <td>{{ getFormatDueDate(item.reportingperioddata.map(i => i.duedate).join('')) }}</td>
                </tr>
            </template> -->
        </v-data-table>
            
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'Proprietor1',
    components:{

    },
    data(){
        return{
            selected: [],
            headers:[
                {text:'Proprietor name' , value:'proprietorname', align: 'center'},
                {text:'Address' , value:'address', align: 'center'},
                {text:'Designation' , value:'designation', align: 'center'},
                {text:'PAN No' , value:'pan', align: 'center'},
                {text:'' , value:'', align: 'center', sortable: false}
            ],
        }
    },
    methods:{
        handleClick(){
            console.log("Hello")
        }
    }
}
</script>


<style scoped>
h3{
    margin: 20px;
}
h2{
    color: #03a9f4;
    margin-top: 2vh;
    margin-bottom: 1vh;
}
h6{
    font-size: 14px;
}
button{
    top: 1%;
    font-size: 14px;
    margin: 10px;
}
.divider-size{
    border-right: 1px solid grey;
    height: 32px;
}
.blueUline{
    width:100%;
    border-top: 3px solid #03a9f4;
}
.container-align{
    margin-top: 2vh;
    text-align: left;
    margin-left:100px;
}
.img-border{
    border-radius: 50%;
}
.table-align{
    margin-top: 40px;
}
.text-field-class{
    max-width: 20%;
    margin-right: 30px;
}
</style>