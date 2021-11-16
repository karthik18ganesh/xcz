<template>
    <div>
        <v-dialog
            persistent
            width="800"
            v-model="commentDialogList"
            >
                <template v-slot:activator="{ on, attrs }">
                    <p
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >
                    <button transparent  v-bind="attrs" v-on="on"><v-icon small dense> far fa-comment-dots </v-icon></button>
                    </p>
                </template>
            <v-card class="mx-auto" width="800">
                <v-toolbar dense flat>
                    <h5>Cash on hand</h5>

                    <v-spacer></v-spacer>

                    <!-- <AddComment></AddComment> -->

                    <!--========== Add Comment ============= -->

                    <v-dialog
                    persistent
                    width="800"
                    v-model="commentDialog"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <button style="color: rgba(3, 169, 244, 1);" v-on="on" v-bind="attrs" @click="addCommentFunction">
                            <img src="../assets/plus.png" alt="">
                                Add Comments
                            </button>
                        </template>
                        <v-card class="mx-auto" width="800">
                            <v-toolbar dense flat>
                                <h5>Cash on hand</h5>

                                <v-spacer></v-spacer>

                                <button style="color: rgba(3, 169, 244, 1);" @click="commentDialog=false">
                                    <v-icon dense> fas fa-long-arrow-alt-left</v-icon>
                                        Back
                                </button>
                                
                                <v-btn small 
                                :disabled="comments1 ? false : true" @click="resolve"
                                :color="isResolve ? 'success' : 'primary'" style="margin-left:5px; margin-right:5px">Resolve </v-btn>
                                <v-icon small v-if="isResolve" :color="isResolve ? 'success' : ''"> fas fa-check-circle</v-icon>
                            </v-toolbar>

                            <v-divider class="blueUline"></v-divider>

                            <v-container style="text-align:left">
                                <div v-if="comments1">
                                    <div style="margin-left:5%; margin-right:5%; margin-top:0%">
                                        <v-avatar color="#FFDCBB" size="38">
                                            <span style="color: #000000">CS</span>
                                        </v-avatar> 
                                        <span style="padding: 3px">{{ comments1 }}</span>
                                    </div>

                                    <v-divider></v-divider>
                                    </div>

                                <div>
                                                            
                                    <div v-if="!comments1" style="margin:10px;margin-left:10%">
                                        <v-avatar color="#FFDCBB" size="38">
                                            <span style="color: #000000">CS</span>
                                        </v-avatar> 
                                        <span style="padding: 3px">Chandra Shekar</span>

                                        <v-textarea
                                        outlined
                                        dense
                                        v-model="comments"
                                        placeholder="Comment Here..."
                                        style="margin-top:2%; margin-right:10%"></v-textarea>
                                    </div>

                                    <div style="margin-left:10%; margin-right:10%; margin-top:0%;" v-for="data in allComments" v-bind:key="data.id">
                                        <div style="padding: 3px">
                                            <v-avatar color="#FFDCBB" size="38" style="padding-right:3px">
                                                <span style="color: #000000; padding-left:3px"> {{ data.username ? data.username[0] : data.userName[0] }} </span>
                                            </v-avatar>
                                            <span>{{ data.userName ? data.userName : data.username }}</span> <span style="color:#404040; font-size: 13px">{{ moment().diff(moment(Number(data.createdat)),"minutes") }} mins ago</span>
                                        </div>
                                        <div style="margin-left:7%;margin-top:3px; margin-bottom:1%">
                                            <span style="padding: 3px">{{ data.comment }}</span>
                                        </div>
                                    </div>

                                    <div style="margin:10px;margin-left:10%;" v-if="comments1 && !isResolve">                                       
                                        <v-text-field
                                        v-model="reply"
                                        dense
                                        outlined 
                                        placeholder="Reply..."
                                        style="margin-top:2%; margin-right:10%"></v-text-field>
                                    </div>

                                </div>

                                <div style="text-align:right;margin-right:10%" v-if="!isResolve">
                                    <v-btn small color="primary" style="margin-right:2%" @click="submitComment"> Post </v-btn>
                                    <v-btn small @click="reply=''"> Cancel </v-btn>
                                </div>

                                <div v-if="isResolve" style="text-align:center">
                                    <v-btn small color="primary" @click="reopenResolve">Re-open</v-btn>
                                </div>
                            </v-container>
                        </v-card>
                    </v-dialog>
                    <!--==================================== -->

                    <button transparent @click="commentDialogList = false">
                        <img src="../assets/closeicon.png" height="35" style="right:0%">
                    </button>
                </v-toolbar>

                <v-divider class="blueUline"></v-divider>

                <v-container style="text-align:left">
                    <v-simple-table>
                        <thead style="border-bottom:1px solid #8A8A8A; text-align:left">
                            <tr>
                                <td style="font-size: 15px; color: #03A9F4">Sl.no</td>
                                <td style="font-size: 15px; color: #03A9F4">Comment Thread</td>
                                <td style="text-align:left"></td>
                                <td style="text-align:left"></td>
                            </tr>
                        </thead>

                        <tbody v-for="item in commentList" v-bind:key="item.id">
                            <tr>
                                <td style="text-align:left">{{ item.slno}} </td>
                                <td style="text-align:left;" @click="rowClick(item)"> {{ item.thread.substring(0,14)+ "..."}} </td>
                                <td style="text-align:right;">
                                    <button transparent style="padding:5px">
                                        <v-icon small :color="item.isresolved ? 'success' : 'orange'">{{item.isresolved ? 'fas fa-check-circle' : 'fas fa-clock'}} </v-icon>
                                    </button>
                                </td>
                                <td style="text-align:left;">
                                    <button transparent style="padding:5px" @click="deleteComment(item.id)"><img src="../assets/delete.png" alt=""></button>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>


<script>
//import AddComment from './CommentScreen.vue'
import moment from "moment";
export default {
    components:{
        //AddComment
        /* eslint-disable vue/no-unused-components */
    },
    mounted(){
        console.log(moment)
        this.getCommentList()  
    },
    data(){
        return{
            commentDialog: false,
            commentDialogList: false,
            addDisclosureDialog: false,

            comments: '',
            comments1: '',
            reply: '',
            post: false,
            addComment : false,
            isResolve: false,

            commentList: [],
            allComments: []
        }
    },
    methods: {
        addComments(){
            this.addComment = true
        },
        addCommentFunction(){
            this.comments1 = ''
            this.allComments = []
            this.comments = ''
        },
        async resolve(){
            try{
                var resolve_update = {
                    "threadId": this.selectedRow.id,
                    "level":2,
                    "isResolved":true
                }
                const resolveRes = await this.$apiService.put("/financial/threads/level",resolve_update);
                console.log(resolveRes)
                if(resolveRes.status === 200){
                    this.isResolve = true
                }
                this.getCommentList()
            }
            catch(error){
                console.log(error)
            }
        },
        async reopenResolve(){
            try{
                var reopen_update = {
                    "threadId": this.selectedRow.id,
                    "level":2,
                    "isResolved": false
                }
                const reopenRes = await this.$apiService.put("/financial/threads/level",reopen_update)
                console.log(reopenRes)
                if(reopenRes.status === 200){
                    this.isResolve = false
                }
                this.getCommentList()
            }
            catch(error){
                console.log(error)
            }
        },
        async submitComment() {
            try{
                this.isResolve = false
                if(this.comments1){
                    var reply_payload={
                    "userId":10002,
                    "userName":"vivek",
                    "threadId":this.selectedRow.id,
                    "level":2,
                    "comment": this.reply,
                    "createdat": moment().valueOf()
                }
                const result = await this.$apiService.post("/financial/comments",reply_payload)
                console.log(result)
                this.allComments.push(reply_payload)
                this.reply = ''
                }
                else{
                    var payload = {
                        "financialId":97,
                        "level1":"Cash and cash equivalents",
                        "level2":"Cash on hands",
                        "userId":10001,
                        "userName":"Sharan",
                        "thread":this.comments
                    }
                    const result = await this.$apiService.post("/financial/threads/level2",payload)
                    console.log(result)
                    this.comments1 = this.comments
                    this.getCommentList()
                }
            }
            catch(error){
                console.log(error)
            }
            
        },
        async rowClick(item){
            this.selectedRow = item
            this.isResolve = this.selectedRow.isresolved
            var res = await this.$apiService.get(`/financial/comments?threadId=${item.id}&level=2`)
            this.allComments = res.data.data
            console.log("Res => ",res)
            this.comments1=item.thread
            this.commentDialog= true
        },
        async getCommentList(){
            try{
                const commentResult = await this.$apiService.get("/financial/threads/level2?financialid=97&level1=Cash and cash equivalents&level2=Balance with banks");
                this.commentList = commentResult.data.data
                console.log("Comment list =>", commentResult.data.data)
                this.commentList.forEach((x,index)=>{
                    x.slno=index+1;
                });
            }
            catch(error){
                console.log(error)
            }
        },
        async deleteComment(id){
            var del = await this.$apiService.delete("/financial/threads/level?threadId="+id+"&level=2");
            console.log(del)
            this.commentList.splice(id,1)
            this.getCommentList()
        }
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam&display=swap');
.containerClass{
    text-align: left;
    margin-top: 15px;
}
.div-btn{
    text-align: right;
    padding: 10px;
    margin: 5px;
    padding-bottom: 3%;
    padding-right: 2%;
    
}
.blueUline{
    width:100%;
    border-bottom: 3px solid rgba(3, 169, 244, 1);
}
.inline{
    display: inline-block;
    flex: 20px;
}
button{
    padding: 5px;
}
h5{
    padding-top: 3%;
    padding-left: 2%;
    font-size: 22px;
    font-weight: 700;
    text-align: justify;
}
span{
    font: 'Roboto';
    font-size: 16px;
}
</style>