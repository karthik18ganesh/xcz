<template>
    <div>
        <v-layout>
            <v-flex xs4 md4 style="margin-top:1%; margin-left:1%">
                <v-breadcrumbs :items="items" large>
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>
            </v-flex>
            <v-flex>
                <div class="btn-row">
                    Preview
                </div>
            </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-container class="container-align">
            <v-layout>
                <v-flex xs9 md9>
                    <h4><u>Note 1. Share Capital</u></h4>
                </v-flex>
            </v-layout>

            <div style="text-align:center">
                <div class="company-popup">
                    <v-card
                        class="mx-auto"
                        max-width="400"
                    >
                        <v-card-actions>
                            <v-btn
                                text
                                color="black"
                                @click="clickEventAuto"
                            >
                                Auto fill from Masters
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </div>

                <div class="company-popup">
                    <v-card
                        class="mx-auto"
                        max-width="400"
                    >
                        <v-card-actions>
                            <v-btn
                                text
                                color="black"
                                @click="clickEvent"
                            >
                                Manually Enter Information
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </div>

        </v-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            items: [
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
        clickEvent(){
            this.$router.push({ path: '/sharecapital1'})
        },
        clickEventAuto(){
            this.$router.push({ path: '/sharecapitalauto'})
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam&display=swap');
.btn-row{
    margin-top: 8px;
    text-align: right;
}
.container-align{
    padding: 20px;
    text-align: left;
    margin: 20px;
}
.company-popup{
    top: 30%;
    width: auto;
    padding: 15px;
    margin: 100px 20px;
    background: white;
    border-radius: 5px;
    display: inline-block;
}
h4{
    font-size: 20px;
    font-family: 'Be Vietnam';
    text-align: left;
    font-weight: 200;
}
</style>