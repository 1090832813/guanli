<template>
  <transition name="el-zoom-in-bottom">
    <div class="boxs" @keyup.enter="inp" v-show="show2" v-if="show2" ref="main">
      <div class="h">
        <span style="cursor: pointer" @click="clear">清空</span>
        <span>聊天机器人</span
        ><span
          class="el-icon-caret-bottom"
          style="cursor: pointer"
          @click="cover"
        ></span>
      </div>
      <div class="bord" ref="content">
        <div class="" v-for="(item, index) in message" :key="item.content">
          <div v-if="item.role == 'system'" class="chat">
            <div
              :class="item.role == 'system' ? 'chat_role' : 'user_role'"
            ></div>
            <div
              class="load"
              v-loading="load && index == message.length - 1"
              element-loading-spinner="el-icon-loading"
              :class="item.role == 'system' ? 'chat_msg' : 'user_msg'"
              :style="item.type=='error'?'color:red':'color:black'"
            >
              {{ item.content }}
            </div>
          </div>
          <div v-else class="chat chat_user">
            <div :class="item.role == 'system' ? 'chat_msg' : 'user_msg'">
              {{ item.content }}
            </div>
            <div
              :class="item.role == 'system' ? 'chat_role' : 'user_role'"
            ></div>
          </div>
        </div>
      </div>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        class="box_input"
      ></el-input>
    </div>
    <el-button @click="cover" type="warning" v-else>问一下</el-button>
  </transition>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      load: false,
      show2: true,
      input: "",
      message: [{ role: "system", content: "你好，有什么可以帮到你吗" }],
    };
  },
  methods: {
    clear() {
      this.message = [];
    },
    cover() {
      this.show2 = !this.show2;
    },
    inp() {
      if (this.input != "") {
        this.message.push({ role: "user", content: this.input });
        this.input = "";
        this.$nextTick(() => {
          this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
        });
        this.openai();
        this.message.push({
          role: "system",
        });
        this.load = !this.load;
      }
    },
    openai() {
      const params = {
        messages: this.message,
        model: "gpt-3.5-turbo-0613",
        temperature: 0,
      };

      axios
        .post("https://api.openai.com/v1/chat/completions", params, {
          headers: {
            Authorization:
              "Bearer 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",
          },
        })
        .then((res) => {
          console.log(res.data.choices[0].message);
          this.message.pop();
          this.load = !this.load;
          this.message.push({
            role: "system",
            content: res.data.choices[0].message.content,
          });

          this.$nextTick(() => {
            this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
          });
        })
        .catch((err) => {
          this.message.pop();
          this.load = !this.load;
          this.message.push({
            role: "system",
            content:"ERROR:"+ err.message,
            type:'error'
          });

          this.$nextTick(() => {
            this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
          });
        });
    },
  },
  mounted() {
    // this.openai();
  },
};
</script>

<style>
.boxs {
  background: white;
  width: 200px;
  height: 300px;
  /* display: flex; */
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.chat {
  display: flex;
  /* align-items: center; */
}
.chat_user {
  justify-content: end;
}
.bord {
  /* border-radius: 4px; */
  height: 250px;
  width: 100%;
  /* margin-bottom: 10px; */
  overflow-y: scroll;
  background: #e9eef3;
}
.box_input {
  border-radius: 4px;
}
.chat_role {
  width: 30px;
  height: 30px;
  background: red;
  margin: 4px;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.user_role {
  width: 30px;
  height: 30px;
  background: green;
  margin: 4px;
  float: right;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.chat_msg {
  width: 120px;
  margin: 4px;
  padding: 6px;
  background: white;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.user_msg {
  width: 120px;
  margin: 4px;
  padding: 6px;
  background: white;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.h {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  background: white;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.h span {
  margin-left: 5px;
  margin-right: 5px;
}
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
.load .el-loading-spinner {
  top: 27px !important;
}
</style>