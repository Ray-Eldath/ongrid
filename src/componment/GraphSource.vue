<template>
    <div class="source">
        <div class="contain-top">
            <p>数据源</p>
        </div>
        <div class="top-button">
            <Button class="h-btn h-btn-s" @click="addStatus=true">
                <i class="mdi mdi-plus"></i>
                添加
            </Button>

            <Button class="h-btn h-btn-s" text-color="red" @click="remove()">
                <i class="mdi mdi-delete"></i>
                删除
            </Button>
        </div>
        <Table :datas="datas" stripe checkbox ref="table" align="center" @trclick="detaile">
            <TableItem title="序号">
                <template slot-scope="{index}">{{index}}</template>
            </TableItem>
            <TableItem title="数据源" prop="name"></TableItem>
            <TableItem title="操作">
                <template slot-scope="{data}">
                    <!-- <button class="h-btn h-btn-s h-btn-text-yellow" @click="chooseOne(data)">
                        <i class="mdi mdi-pen"></i>
                    </button> -->

                    <button class="h-btn h-btn-s h-btn-text-yellow" v-tooltip placement="top-start" content="查看详情" @click="detail(data)">
                        <i class="mdi mdi-book"></i>
                    </button>
                    <Modal v-model="opened">
                        <div slot="header">修改</div>
                        <div :style="{'height': height ? '800px' : 'auto'}">
                            <div>修改该数据源</div>
                            <div>
                                <p>新数据源：{{value}}</p>
                                <div>
                                    <input type="text" v-model="value" placeholder="请输入新数据源" />
                                </div>
                            </div>
                        </div>
                        <div slot="footer">
                            <button class="h-btn" @click="close">取消</button>
                            <button class="h-btn h-btn-primary" @click="confirm(value)">确定</button>
                        </div>
                    </Modal>

                    <Modal v-model="detailStatus">
                        <div slot="header">详情</div>
                        <div :style="{'height': height ? '800px' : 'auto'}">
                            <div>
                                <p>数据源：{{detailList.name}}</p>
                            </div>
                            <div>
                                <p>创建时间：{{detailList.create_time}}</p>
                            </div>
                            <div v-if="detailList.last_connection_time!=null">
                                <p>最后链接时间：{{detailList.last_connection_time}}</p>
                            </div>
                            <div >
                                <p>id为：{{detailList.id}}</p>
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
                <div>新增数据源</div>
                <div>
                    <p>新数据源：{{valueAdd}}</p>
                    <div>
                        <input type="text" v-model="valueAdd" placeholder="请输入新数据源" />
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
    font-size: 20px
    margin-button: 20px
    display: flex
    justify-content: center
.source
    background-color: #F8F8F8
    width: 100%
       
</style>

<style>
    .h-btn.h-btn-s{
        margin: 5px 0 5px 0px !important;
        padding: 5px 5px !important;
    }
</style>

<script>
export default {
    data() {
        return {
            opened: false,
            value: "",
            currentIds: [],
            currentList: [],
            datas: [],
            index: 0,
            detailStatus: false,
            detailList: {},
            addStatus: false,
            valueAdd: ''
        };
    },
    created() {
        this.getDataList()
    },
    methods: {
        detail(data) {
            this.detailStatus = true
            let obj = {}
            obj.create_time = data.create_time.replace('T', ' ')
            obj.name = data.name
            obj.id=data.id
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
        chooseOne(data) {
            this.opened = true
            let currentList = []
            currentList.push(data)
            this.currentList = currentList
        },
        //修改数据源
        confirm(value) {
            if (this.value.length == 0) {
                this.$Message.error("新数据源不能为空");
            } else {
                //不知道为什么有问题
                let currentList = this.currentList
                this.updateDataList(currentList, value)
                // console.log(this.datas.indexOf(data));
                // this.datas[this.datas.indexOf(data)].name = this.value;
                // this.value = "";
                // this.$Message.success("修改成功！");
            }
            this.opened = false;
        },
        close() {
            this.opened = false;
        },
        //删除数据源
        remove() {
            let that = this
            this.$Confirm("确定删除？", "自定义title")
                .then(() => {
                    var selete = this.$refs.table.getSelection();
                    console.log('selete==>', selete);
                    if (selete.length == 0) {
                        this.$Message.error("未选中数据源");
                    } else {
                        // for (var i = 0; i < selete.length; i++) {
                        //     for (var j = 0; j < this.datas.length; j++) {
                        //         if (selete[i].name == this.datas[j].name) {
                        //             this.datas.splice(j, 1);
                        //             console.log(j);
                        //         }
                        //     }
                        // }
                        that.deleteDataList(selete)
                    }
                })
                .catch((error) => {
                    this.$Message.error("取消");
                });
        },
        //
        detaile(e) {
            // let currentIds = []
            // currentIds.push(e.id)
            // this.currentIds = currentIds
            // this.$Modal({
            //     title: "数据源详情",
            //     content: "详情 "
            // });
        },

        //添加数据源
        add() {
            // datas.push({ id: 7, name: "添加", age: 12, address: "然后添加的" });
            let valueAdd = this.valueAdd
            if (!valueAdd) {
                that.$Message.success("请输入新数据源");
                return
            }
            let that = this
            this.$api.post(
                "datasource",
                { name: valueAdd, postUrl: "https://github.com/Ray-Eldath/post_data" },
                {
                    success(r) {
                        that.$Message.success("增加成功！");
                        that.addStatus = false
                        that.valueAdd = ''
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
                "datasource",
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
                "datasource/" + str,
                {
                    success(r) {
                        that.$Message.success("删除成功！");
                        that.getDataList()
                    }
                }
            );
        },
        updateDataList(data, value) {
            let that = this
            let url = "datasource/" + data[0].id
            this.$api.patch(
                url,
                { name: value, postUrl: "https://github.com/Ray-Eldath/post_data" },
                {
                    success(r) {
                        that.$Message.success("修改成功！");
                        that.value = ''
                        that.getDataList()
                    }
                }
            );
        }
    }
};
</script>
