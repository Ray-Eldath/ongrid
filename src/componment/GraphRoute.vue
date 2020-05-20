<template>
    <div class="central">
            <div class="contain-top">
                <p>路由</p>
            </div>
            <div class="top-button">
                <Button icon="mdi mdi-plus" class="h-btn h-btn-s" @click="addStatus=true">添加</Button>
                <Button icon="mdi mdi-delete" class="h-btn h-btn-s" text-color="red" @click="remove()">删除</Button>
            </div>
            <Table :datas="datas" stripe checkbox ref="tablec" align="center" @trclick="detaile()" >
                <TableItem title="序号">
                    <template slot-scope="{index}">{{index}}</template>
                </TableItem>
                <TableItem title="来路由" prop="from"></TableItem>
                <TableItem title="去路由" prop="to"></TableItem>
                <TableItem title="操作">
                    <template slot-scope="{data}">
                        <!-- <button class="h-btn h-btn-s h-btn-text-yellow"  @click="opened=true">
                            <i class="mdi mdi-pen"></i>
                        </button> -->
                        <button class="h-btn h-btn-s h-btn-text-yellow" v-tooltip placement="top-start" content="查看详情" @click="detail(data)">
                            <i class="mdi mdi-book"></i>
                        </button>
                        <Modal v-model="detailStatus">
                            <div slot="header">详情</div>
                            <div :style="{'height': height ? '800px' : 'auto'}">
                                <div>
                                    <p>来路由：{{detailList.from}}</p>
                                </div>
                                <div>
                                    <p>去路由：{{detailList.to}}</p>
                                </div>
                                <div>
                                    <p>创建时间：{{detailList.create_time}}</p>
                                </div>
                                <div>
                                    <p>状态：{{detailList.state}}</p>
                                </div>
                            </div>
                            <div slot="footer">
                                <button class="h-btn h-btn-primary" @click="detailStatus=false">确定</button>
                            </div>
                        </Modal>

                    </template>
                </TableItem>
            </Table>

            <Modal v-model="addStatus">
                <div slot="header">新增</div>
                <div :style="{'height': height ? '800px' : 'auto'}">
                    <div>新增路由</div>
                    <div>
                        <p>新来路由：{{valueFrom}}</p>
                        <div>
                            <input type="text" v-model="valueFrom" placeholder="请输入新来路由" />
                        </div>
                    </div>
                    <div>
                        <p>新去路由：{{valueTo}}</p>
                        <div>
                            <input type="text" v-model="valueTo" placeholder="请输入新去路由" />
                        </div>
                    </div>
                </div>
                <div slot="footer">
                    <button class="h-btn" @click="addStatus=false">取消</button>
                    <button class="h-btn h-btn-primary" @click="add()">确定</button>
                </div>
            </Modal>
        </div>
</template>

<style lang="sass" scoped>
.top-button 
    padding-left:5px
    Button
        margin:5px 0 10px 5px !important
     
.contain-top
        height: 60px
        font-size:20px
        margin-button:20px
        display: flex
        justify-content: center
.central
        background-color: #F8F8F8
        margin:0
        width: 100%
       
</style>

<script>

export default {
    data(){
        return{
            opened: false,
            datas:[],
            from: '',
            to: '',
            detailStatus: false,
            detailList: {},
            valueFrom: '',
            valueTo: '',
            addStatus: false
        }
    },
    created() {
        this.getDataList()
    },
    methods:{
        detail(data) {
            this.detailStatus = true
            let obj = {}
            obj.create_time = data.create_time.replace('T', ' ')
            obj.name = data.name
            obj.id=data.id
            obj.state=data.state
            this.detailList = obj
        },
        modalClose() {
            this.$Message.warn("点击了取消按钮");
            this.opened = false;
        },
        modalDelete() {
            this.$Message.error("点击了删除按钮");
            this.opened = false;
        },
        //修改数据源
        confirm(from, to) {
            if (this.from.length == 0 || this.to.length == 0) {
                this.$Message.error("路由不能为空");
            } else {
                //不知道为什么有问题
                // this.datas[this.datas.indexOf(data)].name = this.value;
                // this.value = "";
                // this.$Message.success("修改成功！");
                this.add()
            }
            this.opened = false;
        },
        close() {
            this.opened = false;
        },
        //删除数据源
        remove() {
            this.$Confirm("确定删除？", "自定义title")
                .then(() => {
                    var selete = this.$refs.table.getSelection();
                    console.log(selete);
                    if (selete.length == 0) {
                        this.$Message.error("未选中数据源");
                    }
                    else{
                        // for (var i = 0; i < selete.length; i++) {
                        //     for (var j = 0; j < this.datas.length; j++) {
                        //         if (selete[i].name == this.datas[j].name) {
                        //             this.datas.splice(j, 1);
                        //             console.log(j);
                        //         }
                        //     }
                        // }
                        // this.$Message.success("删除成功！");
                        that.deleteDataList(selete)
                    }
                })
                .catch(() => {
                    this.$Message.error("取消");
                });
        },

       detaile() {
            // this.$Modal({
            //     title: "路由详情",
            //     content: "名字：  "
            // });
        },

        //添加数据源
        add() {
            // datas.push({ id: 7, from: "from", to: 'to', age: 12, address: "然后添加的" });
            let valueFrom = this.valueFrom
            let valueTo = this.valueTo
            if (!valueTo || !valueFrom) {
                that.$Message.success("请输入新路由");
                return
            }
            let that = this
            let from = this.from
            let to = this.to
            this.$api.post(
                "routes",
                { from: valueFrom, to: valueTo },
                {
                    success(r) {
                        that.$Message.success("增加成功！");
                        that.addStatus = false
                        that.valueFrom = ''
                        that.valueTo = ''
                        that.getDataList()
                    }
                }
            );
        },

        onselect(data) {
            log(data);
        },
        getDataList() {
            let that = this
            this.$api.get(
                "routes",
                {
                    success(r) {
                        that.datas = r.result
                    }
                }
            );
        },
        deleteDataList(data) {
            let array = []
            data.map(v => {
                array.push(v.id)
            })
            let str = array.join(',')
            let that = this
            this.$api.delete(
                "routes/" + str,
                {
                    success(r) {
                        that.$Message.success("删除成功！");
                        that.getDataList()
                    }
                }
            );
        },
        // updateDataList(data, value) {
        //     let that = this
        //     let url = "datasource/" + data[0].id
        //     this.$api.patch(
        //         url,
        //         { name: value, postUrl: "https://github.com/Ray-Eldath/post_data" },
        //         {
        //             success(r) {
        //                 that.$Message.success("修改成功！");
        //                 that.value = ''
        //                 that.getDataList()
        //             }
        //         }
        //     );
        // }
        //
    }
}
</script>
