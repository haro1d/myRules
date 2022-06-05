<template>
    <div>
        <slot name="beforeYear"></slot>
        <el-select placeholder="年"
        :size="size"
        v-model="year0" 
        class="year-width"
        @change="valueChanged"
        >
            <el-option
                v-for="item in yearOp"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <slot name="beforeMonth"></slot>
        <el-select placeholder="月"  
        :size="size"
        v-model="month0" 
        class="month-width"
        @change="valueChanged">
            <el-option
                v-for="item in monthOp"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <slot name="beforeDay"></slot>
        <el-select placeholder="日" 
        :size="size"
        v-model="day0" 
        class="month-width"
        :disabled="dayDisable"
        @change="valueChanged">
            <el-option
                v-for="item in dayOp"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div> 
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: ""
        },
        size:{
            type: String,
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['medium', 'small', 'mini'].indexOf(value) !== -1
            }
        },
        start:{
            type: Number,
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return value>0 && value<9966
            }
        },
        end:{
            type: Number,
            validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return value>1 && value<9966
            }
        },
    },
    created(){
        const _start = this.start || 1971
        const _end = this.end || 2041
        for(let i = _start; i <= _end; i ++){
            this.yearOp.push({label: i, value: i})
        }
        for(let i = 1; i <= 12; i ++){
            this.monthOp.push({label: i, value: i})
        }
    },
    computed:{
        dayDisable(){
            if(this.year0 && this.month0){
                return false 
            }
            return true
        }
    },
    watch: {
        year0(){
            this.changeDay()
        },
        month0(){
            this.changeDay()
        },
        //双向绑定，但必须是yyyy-MM-dd格式
        value(v){
            //yyyy-MM-dd正则
            const dateFormat =/^([1-9]\d{3})-(\d{2})-(\d{2})$/; 
            if(dateFormat.test(v)){
                this.year0 = v.slice(0,4)
                this.month0 = Number(v.slice(5,7))
                this.day0 = Number(v.slice(8,10))
            }
        }
    },
    data () {
        return {
            yearOp: [],
            monthOp: [],
            dayOp: [],
            year0: '',
            month0: '',
            day0: '',
        }
    },
    methods:{
        valueChanged() {
            let y = this.year0
            let m = this.month0<10? '0'+this.month0: this.month0
            let d = this.day0<10? '0'+this.day0: this.day0
            const v = `${y}-${m}-${d}`
            this.$emit("input", v);
        },
        changeDay(){
            if(this.year0 && this.month0){
                //获取 “日” 的选项
                if(this.month0 === 2){
                    //闰年2月
                    if(this.year0%400 === 0 || (this.year0%100 !== 0 && this.year0%4 === 0)){
                        this.dayOp = []
                        for(let i = 1; i <= 29; i ++){
                            this.dayOp.push({label: i, value: i})
                        }
                    }
                    //平年2月
                    else{
                        this.dayOp = []
                        for(let i = 1; i <= 28; i ++){
                            this.dayOp.push({label: i, value: i})
                        }
                    }
                }
                //大月
                else if([1,3,5,7,8,10,12].includes(this.month0)){
                    this.dayOp = []
                    for(let i = 1; i <= 31; i ++){
                        this.dayOp.push({label: i, value: i})
                    }
                }
                //小月
                else if([4,6,9,11].includes(this.month0)){
                    this.dayOp = []
                    for(let i = 1; i <= 30; i ++){
                        this.dayOp.push({label: i, value: i})
                    }
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
    .year-width{
        width: 100px;
    }
    .month-width{
        width: 70px;
    }
</style>
