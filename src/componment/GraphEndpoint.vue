di<template>
    <div class="terminal">
        <div class="contain-top">
            <p>计算终端</p>
        </div>
        <div class="top-button">
            <Button icon="mdi mdi-plus-circle" text-color="primary" @click="addStatus = true"
                >新增计算终端</Button
            >
            <Button icon="mdi mdi-delete" text-color="red" @click="remover()"
                >删除</Button
            >
        </div>
        <Table
            :datas="datas"
            stripe
            checkbox
            ref="tabler"
            align="center"
            @trclick="detaile()"
        >
            <TableItem title="计算终端名称" prop="name"></TableItem>
            <TableItem :width="80" title="操作">
                <template slot-scope="{ data }">
                    <!-- <button class="h-btn h-btn-s h-btn-text-yellow"  @click="chooseOne(data)">
                            <i class="mdi mdi-pen"></i>
                        </button> -->
                    <Button
                        size="s"
                        text-color="yellow"
                        icon="mdi mdi-book"
                        v-tippy="{ arrow: true, theme: 'google' }"
                        content="查看详情"
                        @click="detail(data)"
                    >
                    </Button>
                    <Modal v-model="opened">
                        <div slot="header">修改</div>
                        <div :style="{ height: height ? '800px' : 'auto' }">
                            <div>修改该计算终端</div>
                            <div>
                                <p>新计算终端：{{ value }}</p>
                                <div>
                                    <input
                                        type="text"
                                        v-model="value"
                                        placeholder="请输入新计算终端"
                                    />
                                </div>
                            </div>
                        </div>
                        <div slot="footer">
                            <button class="h-btn" @click="close">取消</button>
                            <button
                                class="h-btn h-btn-primary"
                                @click="confirm(data, value)"
                            >
                                确定
                            </button>
                        </div>
                    </Modal>

                    <Modal v-model="detailStatus">
                        <div slot="header">详情</div>
                        <div class="ablist">
                            <div class="entry">
                                <div class="first">ID</div>
                                <div class="second">{{ detailList.id }}</div>
                            </div>
                            <div class="entry">
                                <div class="first">名称</div>
                                <div class="second">{{ detailList.name }}</div>
                            </div>
                            <div class="entry">
                                <div class="first">创建时间</div>
                                <div class="second">
                                    {{ prettify(detailList.create_time) }}
                                </div>
                            </div>
                            <div class="entry" v-if="detailList.last_connection_time != null">
                                <div class="first">最后链接时间</div>
                                <div class="second">
                                    {{
                                        prettify(
                                            detailList.last_connection_time
                                        )
                                    }}
                                </div>
                            </div>
                        </div>
                        <div slot="footer">
                            <button
                                class="h-btn h-btn-primary"
                                @click="detailStatus = false"
                            >
                                确定
                            </button>
                        </div>
                    </Modal>
                </template>
            </TableItem>
        </Table>
        <Modal v-model="addStatus">
            <div slot="header">新增</div>
            <div>
                <div>
                    <span>名称：{{ valueAdd }}</span>
                    <div>
                        <input
                            type="text"
                            v-model="valueAdd"
                            placeholder="请输入新计算终端的名称"
                        />
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button class="h-btn" @click="addStatus = false">取消</button>
                <button class="h-btn h-btn-primary" @click="add()">确定</button>
            </div>
        </Modal>
    </div>
</template>

<style lang="sass" scoped>
.ablist
    margin-top: 1em
    margin-bottom: 1em

    .entry
        .first
            display: inline

        .second
            float: right
</style>

<style lang="sass" scoped>
.top-button 
    padding-left: 5px
    Button
    margin: 5px 0 10px 5px !important
     
.contain-top
    height: 60px
    font-size: 20px
    margin-button: 20px
    display: flex
    justify-content: center

.terminal
    background-color: #F8F8F8
    width: 100%
</style>

<script>
export default {
    data() {
        return {
            opened: false,
            datas: [],
            currentList: [],
            currentIds: [],
            value: "",
            detailStatus: false,
            detailList: {},
            addStatus: false,
            valueAdd: ""
        };
    },
    created() {
        this.getDataList();
    },
    methods: {
        prettify(time) {
            return this.$dayjs(time).format("llll");
        },
        detail(data) {
            this.detailStatus = true;
            let obj = {};
            obj.create_time = data.create_time;
            obj.name = data.name;
            obj.id = data.id;
            this.detailList = obj;
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
            this.opened = true;
            let currentList = [];
            currentList.push(data);
            this.currentList = currentList;
        },
        //修改数据源
        confirm(data, value) {
            if (this.value.length == 0) {
                this.$Message.error("新计算终端不能为空");
            } else {
                //不知道为什么有问题
                let currentList = this.currentList;
                this.updateDataList(currentList, value);
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
        remover() {
            let that = this;
            this.$Confirm("确定删除？")
                .then(() => {
                    var selete = this.$refs.tabler.getSelection();
                    console.log(selete);
                    if (selete.length == 0) {
                        this.$Message.error("未选中计算终端");
                    } else {
                        that.deleteDataList(selete);
                    }
                })
                .catch(() => {
                    this.$Message.error("取消");
                });
        },

        detaile() {
            // this.$Modal({
            //     title: "计算终端详情",
            //     content: "名字：  "
            // });
        },

        //添加数据源
        add() {
            // datas.push({ id: 7, name: "添加", age: 12, address: "然后添加的" });
            let that = this;
            let valueAdd = this.valueAdd;
            if (!valueAdd) {
                that.$Message.success("请输入新计算终端");
                return;
            }
            this.$api.post(
                "endpoint",
                {
                    name: valueAdd,
                    postUrl: "https://github.com/Ray-Eldath/post_data"
                },
                {
                    success(r) {
                        that.$Message.success("增加成功！");
                        that.addStatus = false;
                        that.valueAdd = "";
                        that.getDataList();
                    }
                }
            );
        },

        onselect(data) {
            log(data);
        },
        getDataList() {
            let that = this;
            this.$api.get("endpoint", {
                success(r) {
                    that.datas = r.result;
                }
            });
        },
        deleteDataList(data) {
            let array = [];
            data.map(v => {
                array.push(v.id);
            });
            let str = array.join(",");
            let that = this;
            this.$api.delete("endpoint/" + str, {
                success(r) {
                    that.$Message.success("删除成功！");
                    that.getDataList();
                }
            });
        },
        updateDataList(data, value) {
            let that = this;
            let url = "endpoint/" + data[0].id;
            this.$api.patch(
                url,
                {
                    name: value,
                    postUrl: "https://github.com/Ray-Eldath/post_data"
                },
                {
                    success(r) {
                        that.$Message.success("修改成功！");
                        that.value = "";
                        that.getDataList();
                    }
                }
            );
        }
    }
};
</script>
