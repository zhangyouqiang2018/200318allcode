<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--条件的展示-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!--分类信息的名字-->
            <li class="with-x" v-if="options.categoryName">
              {{options.categoryName}}
              <i @click="removeCategory">×</i>
            </li>
            <!---搜索关键字-->
            <li class="with-x" v-if="options.keyword">
              {{options.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!--品牌信息-->
            <li class="with-x" v-if="options.trademark">
              {{options.trademark}}
              <i @click="removeTrademark">×</i>
            </li>
            <!--平台属性信息-->
            <li class="with-x" v-for="(prop,index) in options.props" :key="prop">
              {{prop}}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--品牌和平台属性-->
        <SearchSelector :setTrademark="setTrademark" :addProps="addProps" />

        <!--产品的展示及分页-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- <li :class="{active:options.order.indexOf('1')===0}"> -->
                <li :class="{active:isActive('1')}" @click="setOrder('1')">
                  <a href="javascript:;">综合{{getOrderIcon('1')}}</a>
                </li>
                <li>
                  <a href="javascript:;">销量</a>
                </li>
                <li>
                  <a href="javascript:;">新品</a>
                </li>
                <li>
                  <a href="javascript:;">评价</a>
                </li>
                <li :class="{active:isActive('2')}" @click="setOrder('2')">
                  <a href="javascript:;">价格{{getOrderIcon('2')}}</a>
                </li>
                <!-- <li>
                  <a href="javascript:;">价格⬇⬆</a>
                </li>-->
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods,index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="javascript:;">
                      <img :src="goods.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a href="javascript:;" :title="goods.title">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>2000</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a href="javascript:;" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--分页-->
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted">
                  <span>...</span>
                </li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div>
                <span>共10页&nbsp;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
// 引入vuex的辅助函数
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Search',
  components: {
    SearchSelector
  },
  data() {
    return {
      // 定义一个对象,用来初始化所需要的参数数据
      options: {
        category1Id: '', // 一级分类的id
        category2Id: '', // 二级分类的id
        category3Id: '', // 三级分类的id
        categoryName: '', // 分类信息的名字
        trademark: '', // 品牌信息  '254:小米'------>  '品牌的id值:品牌的名字'
        order: '1:desc', // 排序方式   '1:desc' ----->   1--->综合排序  2--->价格排序, desc--->降序,asc--->升序
        pageNo: 1, // 当前的页码--->默认显示第1页的数据
        pageSize: 3, // 每页显示数据的条数
        keyword: '', // 搜索关键字
        props: [] // 平台属性 ['384:NM存储卡:存储卡'] '平台属性的id值:平台属性值:平台属性名字'
        // ["384:支持MicroSD(TF):存储卡", "385:128GB :机身存储", "386:3GB:运行内存"]
      }
    }
  },
  // 计算属性
  computed: {
    ...mapState({
      // 获取商品信息数据对象
      productList: state => state.search.productList
    }),
    // 产品信息数据
    ...mapGetters(['goodsList'])
  },
  // 监视(侦听器)
  watch: {
    $route(to, from) {
      // to ---->目标路由
      // from---->从哪里跳转过来的路由
      // console.log(from)
      const { query, params } = to
      const options = {
        ...this.options,
        category1Id: '', // 重置
        category2Id: '', // 重置
        category3Id: '', // 重置
        categoryName: '', // 重置
        ...query,
        ...params
      }
      // 更新参数数据
      this.options = options
      // 获取商品信息数据
      this.getProductList()
    }
  },
  // 界面加载完毕的生命周期回调
  mounted() {
    // 获取跳转到当前Search界面的时候传入进来的参数数据
    const { query, params } = this.$route
    const options = {
      ...this.options,
      ...query,
      ...params
    }
    // 更新参数数据
    this.options = options
    // 获取商品信息数据
    this.getProductList()
  },
  methods: {
    // 获取商品信息数据
    getProductList() {
      // 提交action,发送异步请求,同时传入该接口需要的参数数据--对象(包含很多的参数)
      this.$store.dispatch('getProductList', this.options)
    },
    // 移除分类信息数据操作
    removeCategory() {
      this.options.category1Id = ''
      this.options.category2Id = ''
      this.options.category3Id = ''
      this.options.categoryName = ''
      // 重新获取商品信息数据
      this.$router.replace(this.$route.path)
      // 下面的这个操作,确实可以重新获取数据,但是浏览器的地址上的参数数据依然存在
      // this.getProductList()
    },
    // 移除搜索关键字操作
    removeKeyword() {
      this.options.keyword = ''
      // this.getProductList()
      // 需要重新跳转路由,同时重新的设置query参数
      this.$router.replace({ path: '/search', query: this.$route.query })
      // 分发事件总线中绑定的removeKeyword 事件
      this.$bus.$emit('removeKeyword')
    },
    // 设置品牌信息的数据
    setTrademark(trademarkId, trademarkName) {
      // 获取品牌的信息(id和name)
      this.options.trademark = trademarkId + ':' + trademarkName
      // 重新获取商品信息数据
      this.getProductList()
    },
    // 移除品牌信息操作
    removeTrademark() {
      // 清空品牌信息数据
      this.options.trademark = ''
      // 重新获取商品信息数据
      this.getProductList()
    },
    // 添加平台属性信息数据
    addProps(attrId, attrVal, attrName) {
      // 拼接字符串
      const prop = `${attrId}:${attrVal}:${attrName}`
      // 判断,平台属性数组中是否已经有两个这个数据,没有则添加
      if (this.options.props.indexOf(prop) === -1) {
        // 添加到props数组中
        this.options.props.push(prop)
        // 重新获取商品信息数据
        this.getProductList()
      }
    },
    // 移除平台属性信息数据
    removeProp(index) {
      this.options.props.splice(index, 1)
      // 重新获取商品信息数据
      this.getProductList()
    },
    // 设置排序的一些选项的类样式
    isActive(flag) {
      return this.options.order.indexOf(flag) === 0
    },
    // 排序操作的回调
    setOrder(flag) {
      // flag ------>1---->综合  或者   2----->价格
      // 获取order参数中的标识及排序的方式
      let [orderFlag, orderType] = this.options.order.split(':')
      // orderFlag----->1 或许将来可能是2
      // orderType------>desc 或许将来可能是asc
      // 判断传进来的标识和解构出来的标识是否是一致的
      if (orderFlag === flag) {
        // orderFlag--->1  flag---->1
        // 此时说明点击的是同一个排序菜单,只需要改变排序方式即可
        orderType = orderType === 'desc' ? 'asc' : 'desc'
      } else {
        // 传入进来的标识和默认的标识不一样
        // orderFlag---->1  flag---->2
        // 先修改标识
        orderFlag = flag
        // 默认是降序排序
        orderType = 'desc'
      }
      // 重新的设置一下order参数数据
      this.options.order = orderFlag + ':' + orderType
      // 重新获取数据即可
      this.getProductList()
    },
    // 是否显示升序或者降序的符号
    getOrderIcon(flag) {
      let [orderFlag, orderType] = this.options.order.split(':')
      // 判断标识是否相同
      if (orderFlag === flag) {
        return orderType === 'desc' ? '⬇' : '⬆'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>