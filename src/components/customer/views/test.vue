<template>
  <div class="demo">
    <div class="addBtn" @click="addGoods"></div>
    <div class="cart">
      这是购物车
      <div class="ball-wrapper" v-for="(ball, index) of balls" :key="index">
        <transition
          name="drop"
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter">
          <div class="ball" v-show="ball.show">
            <!--这里为了做两个维度的动画，因此需要多包一层，外层做Y轴，内层做X轴动画-->
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "test",
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [] // 在动画中的小球集合
      };
    },
    methods: {
      addGoods(e) {
        let el = e.target;
        this.balls.forEach(v => {
          if (!v.show) {
            v.show = true; // 当切换元素的display:block/none时，会触发vue的动画
            v.el = el; // 将触发点击事件的“+”号保定道小球对象上，方便获取动画初始时的位置
            this.dropBalls.push(v); // 取一个小球加入动画队列
            return;
          }
        });
      },
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          // 将动画队列中的小球，依次处理
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect(); //拿到点击的“+”号的位置,这里不直接取值（我是用的绝对定位，当然可以直接取值）的原因是，商品列表中每个加号的位置是不固定的，如果上下滑动了，这个位置就不确定
            let x = rect.left - 70; // 需要偏移的x向距离
            let y = -(window.innerHeight - rect.top - 65); // 需要偏移的y向距离
            el.style.display = ""; // 当前状态下，display值为none，将其置空。

            // 这里需要注意了，小球飞入的动画分两个维度，X轴和Y轴，因此
            el.style.webkitTransform = `translate3d(0px, ${y}px, 0px)`; // 首先将“ball”Y向移动至“+”好位置
            el.style.transform = `translate3d(0px, ${y}px, 0px)`;
            // 接着将“inner-hook”X向移动至“+”号处，其实此时外层“ball”的X位置没有动，但因为背景色等等样式只应用于“inner-hook”上，因此，视觉效果上，这个小球是移动到了“+”号的位置
            let inner = el.getElementsByClassName("inner-hook")[0];
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enter(el) {
        /* eslint-disable no-unused-vars */

        let rf = el.offsetHeight; // 主动触发浏览器重绘
        this.$nextTick(() => {
          el.style.webkitTransform = "translate3d(0, 0, 0)"; //接着将小球位置置为初始值，但css中设置了transition .8s,因此，动画效果就出来了
          el.style.transform = "translate3d(0, 0, 0)";
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = "translate3d(0, 0, 0)";
          el.style.transform = "translate3d(0, 0, 0)";
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift(); //结束后，将这个活动中的小球删除
        if (ball) {
          ball.show = false;
          el.style.display = "none"; // 并且将其设为不可见
        }
      }
    }
  };
</script>
<style lang="stylus" scoped>
  .demo
    .addBtn
      position: absolute;
      top: 50px;
      right: 50px;
      width: 20px;
      height: 20px;
      background: blue;
      border-radius: 50%;

    .cart
      position: absolute;
      left: 30px;
      bottom: 30px;
      width: 100px;
      text-align: center;
      height: 50px;
      line-height: 50px;
      border: 1px solid #ccc;

      .ball
        position: fixed;
        z-index: 100;
        left: 70px;
        bottom: 45px;

        &.drop-enter-active
          transition: all 0.8s cubic-bezier(0.49, -0.29, 0.75, 0.41);

        .inner
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: red;
          transition: all 0.8s;
</style>
