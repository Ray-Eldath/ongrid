<template>
    <div class="terminal">
            <div class="contain-top">
                <p>计算终端</p>
            </div>
            <div>
                <button class="h-btn h-btn-s" @click="add(datasr)">
                    <i class="mdi mdi-plus"></i>
                    添加
                </button>

                <Button class="h-btn h-btn-s" text-color="red" @click="remover()">
                    <i class="mdi mdi-delete"></i>
                    删除
                </Button>
            </div>
            <Table :datas="datasr" stripe checkbox ref="tabler" align="center" @trclick="detaile()">
                <TableItem title="序号">
                    <template slot-scope="{index}">{{index}}</template>
                </TableItem>
                <TableItem title="计算终端" prop="name"></TableItem>
                <TableItem title="操作">
                    <template slot-scope="{data}">
                        <button class="h-btn h-btn-s h-btn-text-yellow"  @click="opened=true">
                            <i class="mdi mdi-pen"></i>
                          
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
                                <button class="h-btn h-btn-primary" @click="confirm(data,value)">确定</button>
                            </div>
                        </Modal>
                    </template>
                </TableItem>
            </Table>
        </div>
</template>

<style lang="sass" scoped>
Button
        margin: 5px 0 15px 15px
.contain-top
        height: 60px
        font-size:20px
        margin-button:20px
        display: flex
        justify-content: center
.terminal
        background-color: #F8F8F8
        width: 100%
</style>

<script>
export default {
    data(){
        return{
            datasr:[
                { name: "测试5" },
                { name: "测试6" },
                { name: "测试7" },
                { name: "测试8" },
                { name: "测试9" }
            ]
        }
    },
    methods: {
        modalClose() {
            this.$Message.warn("点击了取消按钮");
            this.opened = false;
        },
        modalDelete() {
            this.$Message.error("点击了删除按钮");
            this.opened = false;
        },
        //修改数据源
        confirm(data, value) {
            if (this.value.length == 0) {
                this.$Message.error("新数据源不能为空");
            } else {
                //不知道为什么有问题
                this.datas[this.datas.indexOf(data)].name = this.value;
                this.value = "";
                this.$Message.success("修改成功！");
            }
            this.opened = false;
        },
        close() {
            this.opened = false;
        },
        //删除数据源
        remover() {
            this.$Confirm("确定删除？", "自定义title")
                .then(() => {
                    var selete = this.$refs.tabler.getSelection();
                    console.log(selete);
                    if (selete.length == 0) {
                        this.$Message.error("未选中数据源");
                    }
                    else{
                    for (var i = 0; i < selete.length; i++) {
                        for (var j = 0; j < this.datasr.length; j++) {
                            if (selete[i].name == this.datasr[j].name) {
                                this.datasr.splice(j, 1);
                                console.log(j);
                            }
                        }
                    }
                    this.$Message.success("删除成功！");
                    }
                })
                .catch(() => {
                    this.$Message.error("取消");
                });
        },

       detaile() {
            this.$Modal({
                title: "计算终端详情",
                content: "名字：  "
            });
        },

        //添加数据源
        add(datas) {
            datas.push({ id: 7, name: "添加", age: 12, address: "然后添加的" });
        },

        onselect(data) {
            log(data);
        }
    }
}
</script>