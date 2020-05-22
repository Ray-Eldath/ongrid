<template>
    <div class="central">
        <div class="contain-top">
            <p>路由</p>
        </div>
        <div class="top-button">
            <Button
                icon="mdi mdi-plus-circle"
                text-color="primary"
                @click="addStatus = true"
                >新增路由</Button
            >
            <Button icon="mdi mdi-delete" text-color="red" @click="remove()"
                >删除</Button
            >
        </div>
        <Table
            :loading="loading"
            :datas="datas"
            stripe
            checkbox
            ref="tablec"
            align="center"
        >
            <TableItem title="路由">
                <template slot-scope="{ data }">
                    <div class="primary-color">
                        {{ data.from.name }}
                        <i class="mdi mdi-swap-horizontal-bold"></i>
                        {{ data.to.name }}
                    </div>
                </template>
            </TableItem>
            <TableItem :width="80" title="操作">
                <template slot-scope="{ data }">
                    <!-- <button class="h-btn h-btn-s h-btn-text-yellow"  @click="opened=true">
                            <i class="mdi mdi-pen"></i>
                        </button> -->
                    <Button
                        icon="mdi mdi-book"
                        size="s"
                        v-tippy="{ arrow: true, theme: 'google' }"
                        content="查看详情"
                        text-color="yellow"
                        @click="detail(data)"
                    >
                    </Button>

                    <Modal v-model="detailStatus">
                        <div slot="header">详情</div>
                        <div class="entry primary-color">
                            <div class="first">路由</div>
                            <div class="second">
                                {{ detailList.from.name }}
                                <i class="mdi mdi-swap-horizontal-bold"></i>
                                {{ detailList.to.name }}
                            </div>
                        </div>
                        <div class="ablist">
                            <div class="entry">
                                <div class="first">ID</div>
                                <div class="second">{{ detailList.id }}</div>
                            </div>
                            <div class="entry">
                                <div class="first">路由状态</div>
                                <div class="second">
                                    {{
                                        detailList.state == 0 ? "启用" : "禁用"
                                    }}
                                </div>
                            </div>
                            <div class="entry">
                                <div class="first">源ID</div>
                                <div class="second">
                                    {{ detailList.from.id }}
                                </div>
                            </div>
                            <div class="entry">
                                <div class="first">目标ID</div>
                                <div class="second">{{ detailList.to.id }}</div>
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
            <div slot="header">新增路由</div>
            <div :style="{ height: height ? '800px' : 'auto' }">
                <div>
                    <p>数据源ID：{{ valueFrom }}</p>
                    <div>
                        <input
                            type="text"
                            v-model="valueFrom"
                            placeholder="请输入路由数据源ID"
                        />
                    </div>
                </div>
                <div>
                    <p>计算终端ID：{{ valueTo }}</p>
                    <div>
                        <input
                            type="text"
                            v-model="valueTo"
                            placeholder="请输入路由计算终端ID"
                        />
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button text @click="addStatus = false">取消</Button>
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
            margin-right: 1em

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
.central
    background-color: #F8F8F8
    margin: 0
    width: 100%
       
</style>

<script>
export default {
    data() {
        return {
            opened: false,
            datas: [],
            from: "",
            to: "",
            detailStatus: false,
            detailList: {
                from: {},
                to: {}
            },
            valueFrom: "",
            valueTo: "",
            addStatus: false,
            loading: true
        };
    },
    created() {
        this.getDataList();
    },
    methods: {
        detail(data) {
            console.log(data);
            this.detailStatus = true;
            let obj = {};
            obj.id = data.id;
            obj.state = data.state;
            obj.from = data.from;
            obj.to = data.to;
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
        //修改数据源
        confirm(from, to) {
            if (this.from.length == 0 || this.to.length == 0) {
                this.$Message.error("路由不能为空");
            } else {
                //不知道为什么有问题
                // this.datas[this.datas.indexOf(data)].name = this.value;
                // this.value = "";
                // this.$Message.success("修改成功！");
                this.add();
            }
            this.opened = false;
        },
        close() {
            this.opened = false;
        },
        remove() {
            this.$Confirm("确定删除？").then(() => {
                var selete = this.$refs.table.getSelection();
                console.log(selete);
                if (selete.length == 0) {
                    this.$Message.error("未选中数据源");
                } else {
                    that.deleteDataList(selete);
                }
            });
        },
        // 添加数据源
        add() {
            // datas.push({ id: 7, from: "from", to: 'to', age: 12, address: "然后添加的" });
            let valueFrom = this.valueFrom;
            let valueTo = this.valueTo;
            if (!valueTo || !valueFrom) {
                that.$Message.success("请输入新路由");
                return;
            }
            let that = this;
            let from = this.from;
            let to = this.to;
            this.$api.post(
                "routes",
                { from: valueFrom, to: valueTo },
                {
                    success(r) {
                        that.$Message.success("增加成功！");
                        that.addStatus = false;
                        that.valueFrom = "";
                        that.valueTo = "";
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
            this.$api.get("routes", {
                success(r) {
                    that.datas = r.result;
                    that.loading = false;
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
            this.$api.delete("routes/" + str, {
                success(r) {
                    that.$Message.success("删除成功！");
                    that.getDataList();
                }
            });
        }
    }
};
</script>