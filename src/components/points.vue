<template>
  <div class="cardShow">
    <Card :bordered="false"
          style="width:150px;margin: 10px"
          id='card'>
      <p slot="title" class='cardTitle'>节点</p>
      <div class='cardPoints'>
        <span class="btn run"></span>
      </div>
    </Card>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        renderData: [],
      };
    },
  };
</script>

<style>
  .cardShow {
    display: flex;
    justify-content: space-between;
    margin: 20px;
  }
  #card
  .cardTitle {
    font-size: 16px;
  }

  .cardPoints {
    display: flex;
    justify-content: space-between;
    width: 250px;
  }

  .btn {
    position: relative;
    width: 20px;
    height: 20px;
    display: block;
    line-height: 40px;
    border-radius: 20px;
    font-size: 20px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    background-image: -webkit-gradient(linear, left top, left bottom, from(#FFC0CB), to(#FF69B4));
    background-image: -moz-linear-gradient(#FFC0CB, #FF69B4);
    animation: ease-in-out breath 2500ms infinite alternate;
    -webkit-animation: ease-in-out breath 2500ms infinite alternate;
    cursor: pointer;
  }

  .run {
    border: 1px solid #78C850;
    background-color: #37B157;
  }

  .stop {
    background-color: #EA0000;
  }

  @keyframes breath {
    0% {
      opacity: .2;
      box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
    }
    100% {
      opacity: 1;
      border: 1px solid #fff;
      box-shadow: 0 1px 30px #fff;
    }
  }

  @-webkit-keyframes breath {
    0% {
      opacity: .2;
      box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1);
    }
    100% {
      opacity: 1;
      border: 1px solid rgba(255, 192, 203, 1);
      box-shadow: 0 1px 30px rgba(255, 192, 203, 1);
    }
  }
</style>
