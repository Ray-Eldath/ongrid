<template>
    <div class="home">
        <div class="header">{{ whatnoon }}，{{ self.username }}</div>
        <div class="headline">
            现在是 {{ time }}。欢迎访问 Offgrid 控制面板。
        </div>
        <div class="headline">
            您的身份是
            <span v-color:green
                ><i class="mdi mdi-shield-account"></i>
                {{ self.role.name }}</span
            >，上次登录于 {{ $dayjs(self.lastLoginTime).format("lll") }}。
        </div>
        <div class="line"></div>
        <div class="text health">
            <div class="head">
                <span
                    style="opacity: .5"
                    v-tippy="{
                        arrow: true,
                        theme: 'google',
                        placement: 'bottom'
                    }"
                    content="数据由容器托管服务提供"
                    ><i class="mdi mdi-information"></i
                ></span>
                当前服务状态：
            </div>
            <div class="status">
                <span v-color:green style="font-weight: bold"
                    ><i class="mdi mdi-shield-check-outline"></i> 健康</span
                >
                <div class="services">
                    <span>反向代理</span>
                    <span>后端</span>
                    <span>前端</span>
                    <span>基本数据库</span>
                    <span>指标数据库</span>
                    <span>指标可视化面板</span>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="text links">
            <Button
                icon="mdi mdi-open-in-new"
                color="primary"
                size="l"
                @click="openInNew('https://grafana.qvq.ink/')"
                >前往 Grafana 指标可视化面板</Button
            >
            <Button
                icon="mdi mdi-open-in-new"
                color="yellow"
                size="l"
                @click="openInNew('https://portainer.qvq.ink/')"
                >前往 Portainer 容器管理面板</Button
            >
            <Button
                icon="mdi mdi-open-in-new"
                color="green"
                size="l"
                @click="openInNew('https://netdata.qvq.ink/')"
                >前往 netdata 资源监测面板</Button
            >
        </div>
        <div style="margin-left: 63px; margin-top: 10px; opacity: 0.4">
            *服务可能需要登录，且您不一定具有访问请求的资源所需的权限。
        </div>
    </div>
</template>

<style lang="sass" scoped>
.line
    margin-top: 1.5em
    margin-bottom: 1.5em
    border-bottom: 1px solid #eeeeee

.home
    height: 60vh
    cursor: default

    .links
        display: flex
        justify-content: space-between
        padding-top: 0.5em
        padding-left: 3.5em
        padding-right: 3.5em
        zoom: 1.2

    .health
        .services span
            opacity: .6
            margin-right: 5px
            
        .head
            display: inline-block
        
        .status
            display: inline-grid

    .header
        font-size: 2.6em
        font-weight: bold
        margin-bottom: 0.5em

    .headline
        font-size: 1.2em
        margin-top: 2px
    
    .text
        font-size: 1.1em
</style>

<script>
import { mapState } from "vuex";
export default {
    methods: {
        openInNew(url) {
            window.open(url, "_blank");
        }
    },
    computed: {
        whatnoon() {
            let hour = this.$dayjs().hour;
            if (hour < 12) return "上午好";
            else if (hour < 18) return "下午好";
            return "晚上好";
        },
        time() {
            return this.$dayjs().format("LLLL");
        },
        ...mapState({
            self: state => state.auth
        })
    }
};
</script>
