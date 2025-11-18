import { Link, Outlet } from "umi";
import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./index.less";
import language from "@/language/language";
// import logo from "../assets/logo.svg";
import logo from "../assets/logo-white.svg";

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedTab, setSelectedTab] = useState("");
  const [currentLang, setCurrentLang] = useState<"zh-CN" | "en-US">("zh-CN"); // 语言
  const text = language[currentLang];
  console.log("text:", text);
  const Tabs = [
    {
      route: "/",
      label: text.nav.home,
      key: "home",
    },
    {
      route: "/",
      label: text.nav.about,
      key: "about",
    },
    {
      route: "/",
      label: text.nav.article,
      key: "articles",
    },
    {
      route: "/",
      label: text.nav.contact,
      key: "contact",
    },
  ];

  // 防抖处理滚动事件
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // 记录是否正在滚动中
  const isScrolling = useRef(false);
  // 记录当前页面所在的"屏数"
  const currentScreen = useRef(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const shouldShow = scrollTop > 50; // 增加触发阈值，避免频繁切换

    // 平滑状态切换
    if (shouldShow !== isScrolled) {
      setIsScrolled(shouldShow);
    }

    // 更新当前屏数
    const windowHeight = window.innerHeight;
    currentScreen.current = Math.round(scrollTop / windowHeight);
  }, [isScrolled]);

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 16); // 约60fps的更新频率

    // 添加被动监听器以提高性能
    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [handleScroll]);

  // 处理滚轮事件，实现整屏滚动
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 如果正在滚动中，阻止新的滚动
      if (isScrolling.current) {
        e.preventDefault();
        return;
      }

      // 阻止默认滚动行为
      e.preventDefault();
      isScrolling.current = true;

      // 获取窗口高度
      const windowHeight = window.innerHeight;

      // 根据滚轮方向决定滚动方向
      // deltaY > 0 表示向下滚动，deltaY < 0 表示向上滚动
      const direction = e.deltaY > 0 ? 1 : -1;

      // 计算目标屏数
      const targetScreen = Math.max(0, currentScreen.current + direction);

      // 计算目标滚动位置
      const targetPosition = targetScreen * windowHeight;

      // 执行平滑滚动
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // 更新当前屏数
      currentScreen.current = targetScreen;

      // 滚动完成后重置标志
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000); // 给滚动动画足够的时间完成
    };

    // 添加事件监听器，passive: false 允许我们调用 preventDefault()
    window.addEventListener("wheel", handleWheel, { passive: false });

    // 初始化当前屏数
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    currentScreen.current = Math.round(scrollTop / windowHeight);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className={styles.layout}>
      <nav
        className={`${styles.navs} ${isScrolled ? styles.scrolled : styles.top}`}
      >
        {!isScrolled ? (
          <div className={styles.logo}>
            <img className={styles.logoText} src={logo} alt="/" />
          </div>
        ) : (
          <div className={styles.navContent}>
            <div className={styles.logo}>
              <span className={styles.logoText}>ZYvora</span>
            </div>
            <ul className={styles.navList}>
              {Tabs.map((item) => {
                return (
                  <li key={item.key}>
                    <Link to={item.route}>{item.label}</Link>
                  </li>
                );
              })}
              <li>
                <div className={styles.languageSwitch}>
                  <span
                    style={{ marginBottom: 10 }}
                    className={`${styles.langBtn} ${currentLang === "zh-CN" ? styles.active : ""}`}
                    onClick={() => setCurrentLang("zh-CN")}
                  >
                    CH
                  </span>
                  <div className={styles.divider}></div>
                  <span
                    style={{ marginTop: 10 }}
                    className={`${styles.langBtn} ${currentLang === "en-US" ? styles.active : ""}`}
                    onClick={() => setCurrentLang("en-US")}
                  >
                    EN
                  </span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <Outlet />
      <footer></footer>
    </div>
  );
}
