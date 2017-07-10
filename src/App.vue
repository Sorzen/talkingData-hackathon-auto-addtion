<template>

  <div class="layout" id="app">
        <div class="layout-ceiling">
            <div class="layout-ceiling-main">
                <router-link to="/">
                  <Icon type="navicon"></Icon>
                   <span style="margin-left:5px;">应用列表</span>
                </router-link>
            </div>
        </div>
        <div>
          <router-view></router-view>
        </div>
        <div class="layout-copy">
            2011-2017 &copy; TalkingData
        </div>
    </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
@import './assets/common.scss';
@import './assets/appdetail.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.layout-ceiling-main {
  font-size: 18px;
  float: left;
  margin-left: 20px;
  a {
    color: #fff;
  }

}
</style>
