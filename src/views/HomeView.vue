<template>
  <div class="home">
    <!-- <aside>
      <b-menu>
        <b-menu-list>
          <b-menu-item>
            <template #label="props">
              <div>
                adosaifohs
              </div>
            </template>
          </b-menu-item>
        </b-menu-list>
      </b-menu>
    </aside> -->
    <main class="p-4">
      <h1 class="title mb-2">Llamadas:</h1>
      <section class="container-box">
        <incomming-call v-for="call in calls" :key="call.id"></incomming-call>
      </section>
    </main>
  </div>
</template>

<script>
import IncommingCall from "@/components/IncommingCall.vue"
import { mapState } from "vuex";
export default {
  name: "HomeView",
  components: {
    IncommingCall
  },
  computed: {
    ...mapState(["calls"])
  },
  mounted(){
    this.calls.forEach(c=>{
      c.on("close",()=>{
        console.log("aaaa");
      })
    })
  }
};
</script>

<style lang="scss" scoped>
$aside_width: 25%;

aside {
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  top: 0;
  width: $aside_width;
  border-right: 1px solid rgb(202, 202, 202);
}

main {
  height: 100vh;
}



.container-box {
  display: flex;
  flex-wrap: wrap;
  // justify-content: center;
}
</style>
