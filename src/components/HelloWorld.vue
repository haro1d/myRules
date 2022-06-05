<template>
  <div class="hello">
    <has></has><has1></has1><has2></has2><has3></has3>
    <rend></rend>
    <h1>{{ msg }}</h1>
    <!-- <TraDate v-model="test"></TraDate> -->
  </div>
</template>

<script>
// import TraDate from './TraDate'
import rend from './rend'
export default {
  name: 'HelloWorld',
  components: {
    rend,
    // TraDate
  },
  props: {
    msg: String
  },
  watch:{
  },
  created() {
    console.log("this",this.$vnode.context,this);
    // this.aa()
    // this.ab()
  },
  data () {
    return {
      test: ''
    }
  },
  methods:{
    aa:function(){
      console.log(1,this);
    },
    ab:()=>{
      console.log(2,this);
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
