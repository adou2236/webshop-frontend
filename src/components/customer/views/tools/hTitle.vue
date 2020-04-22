<template>
    <div id="hTitle">{{title}}
    </div>
</template>

<script>
  export default {
    props:['title'],
    name: 'hTitle'
  }
</script>

<style scoped>
  #hTitle{
    user-select: none;
    border-bottom: 1px solid #dcdcdc;
    border-radius: 5px 5px 0 0;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    padding-left: 25px;
    text-align: left;
    line-height: 60px;
    background: #fbfbfb;
    font-size: 20px;
    font-weight: 400;
    color: #626262;
  }

</style>
