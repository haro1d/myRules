
<script>
export default {
    data(){
        return{

        }
    },
    render(h){
        console.log(h);
        let elm = h('div',{
            style: { color: 'red', fontSize: '44px'}
        },[
            
            h('h3',{},'你好'),
            '先锋',
            h('h1',{},'你好'),
        ])
        return elm
    }
}
</script>

<style scoped lang="less">
</style>
