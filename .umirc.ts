import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs", layout: false },
    {
      path: "/home",
      component: "@/pages/home/index",
    },
  ],
  npmClient: "pnpm",
  styles: [
    `html,body{
    margin:0;
    padding:0;
    }
    *{
    box-sizing:border-box;
    }`,
  ],
});
