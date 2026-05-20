# 集寶 · 我的資產 — Static PWA

證券資產總覽單頁 webapp。原始設計來自 claude.ai/design handoff bundle，重寫為純靜態 SPA + PWA。

**Live:** https://ajoe734.github.io/jibao-assets/?mobile=1
**Repo:** https://github.com/ajoe734/jibao-assets

---

## 給後續 Claude / 工程師：先讀這個

這個 repo 經歷過漫長的 iOS Safari 兼容性修正，**很多看起來怪的設計都是踩坑後保留的防禦性寫法，不要隨手「清乾淨」**。修改前先讀完 [§ iOS Safari / PWA 的坑](#ios-safari--pwa-的坑) 那節，否則八成會把人家辛苦修好的東西打掉重做一次。

---

## 專案結構

```
jibao-assets/
├── index.html              # 入口；含內聯 splash + PWA 設定
├── app.jsx                 # React 主畫面源碼 — 編輯它
├── app.compiled.js         # ↑ 預編譯產出，瀏覽器實際載入這個
├── ios-frame.jsx           # iOS device frame 元件源碼 — 編輯它
├── ios-frame.compiled.js   # ↑ 預編譯產出
├── manifest.webmanifest    # PWA manifest（standalone + icons + start_url）
├── pwa-test.html           # PWA 診斷頁，**不要刪**（除錯用）
├── icons/                  # PWA icon 三尺寸
│   ├── apple-touch-icon.png    # 180×180，iOS Add to Home Screen
│   ├── icon-192.png
│   └── icon-512.png
└── assets/                 # Tab bar icon (5 tab × {active, inactive} PNG)
```

無 build system。無 Node runtime。GitHub Pages 直接 serve 這些檔案。

---

## 修改流程

### 改 UI / 邏輯

只改 `.jsx`，然後**必須**重新編譯：

```bash
npm install --no-save @babel/core @babel/cli @babel/preset-react
npx babel app.jsx        -o app.compiled.js        --presets=@babel/preset-react
npx babel ios-frame.jsx  -o ios-frame.compiled.js  --presets=@babel/preset-react
git add -A && git commit -m "..." && git push
```

`.jsx` 是給人讀的，`compiled.js` 是給瀏覽器跑的。**只 commit `.jsx` 而忘了 commit `.compiled.js`，部署後畫面不會變**（一個常見的 footgun）。

### 改 PWA manifest / icons

- `manifest.webmanifest` 的 `start_url` 是絕對路徑 `/jibao-assets/?mobile=1`。如果這個 repo 改名，這個 path 一定要跟著改。
- `icons/` 下的 PNG 是 Python script 動態畫的「集」字，重 generate 範例：
  ```bash
  python3 -c "
  from PIL import Image, ImageDraw, ImageFont
  for sz in (192, 512, 180):
      img = Image.new('RGB', (sz, sz), '#1F3A8A')
      d = ImageDraw.Draw(img)
      f = ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc', int(sz*0.6))
      bbox = d.textbbox((0,0), '集', font=f)
      w, h = bbox[2]-bbox[0], bbox[3]-bbox[1]
      d.text(((sz-w)/2-bbox[0], (sz-h)/2-bbox[1]), '集', fill='white', font=f)
      img.save(f'icons/icon-{sz}.png' if sz!=180 else 'icons/apple-touch-icon.png')
  "
  ```

### URL 模式

- `?mobile=1` → 全螢幕 mobile shell，沒有 iOS device frame（給真實手機/PWA 用）
- 不帶參數 → desktop 預覽模式，套上 iPhone 15 Pro device frame（開發/截圖用）

切換邏輯在 `app.jsx` 的 `App()` 函式：`new URLSearchParams(window.location.search).get('mobile') === '1'`。

---

## iOS Safari / PWA 的坑

這節是 hard-won knowledge。**動 index.html 或 tab bar 之前一定要看完。**

### 1. Tab bar 高度不要用 `env(safe-area-inset-bottom)`

**症狀**：使用者打開 Safari 看到底部 tab bar 異常的高、佔了半個螢幕。
**原因**：iOS 18+ Safari 把底部 URL bar 的高度（~50pt）算進 `safe-area-inset-bottom`，結果 `paddingBottom: env(safe-area-inset-bottom)` 給出 ~80-100pt 而不是預期的 34pt。看 WebKit Bug 281071、Stack Overflow #79067207。

**解法**（已落實在 `app.jsx` 的 `TabBarRow`）：
```jsx
<nav style={{
  position: 'fixed',
  bottom: 0, left: 0, right: 0,
  zIndex: 50,
  background: '#111',
  paddingBottom: 8,    // ← 寫死 8px，不要碰 env()
}}>
  <div style={{ height: 56, /* ... */ }}>
```

Tab bar 總高 = `56 (inner) + 8 (padding) = 64pt`，確定值。Home indicator 跟黑色 tab bar 重疊但不影響可讀性。

### 2. 內聯 splash + inline `style=` 在 `<html>` / `<body>` 上是救命設計

**症狀**：使用者把網站 Add to Home Screen 後，從主畫面開啟整個白屏；同樣 URL 在 Safari 開卻正常。
**原因**：iOS PWA 啟動時某些 timing 下 `<style>` block 沒套上，body 變預設白底。內聯 `<style>` 區塊內定義的 `html, body { background: #111 }` 失效。

**解法**（已落實在 `index.html`）：
```html
<html lang="zh-Hant" style="background:#111;color:#fff;...">
<body style="background:#111;color:#fff;...">
  <div id="boot" style="position:fixed;inset:0;background:#111;z-index:1"></div>
  <div id="root"></div>
```

- `<html>` 跟 `<body>` 的 `style=` 屬性是元素自帶的，iOS PWA 一定會套用，不依賴 `<style>` block 解析時序
- `#boot` splash div 用 inline style 寫死黑底佔滿全螢幕；React mount 完後 onload handler 把它 `display:none`
- 這就是為什麼 `index.html` 看起來「重複」放 background — 不是疏忽，是必要的雙保險

### 3. 不要回去用 `type="text/babel"` runtime 編譯

**症狀**：跟症狀 2 一樣，PWA 白屏；Safari 正常。
**原因**：`@babel/standalone` 在 PWA standalone 模式下處理 `<script type="text/babel">` 的時序有 bug，DOMContentLoaded hook 不可靠。

**解法**：JSX 在開發機上預先用 `@babel/cli` 編譯成純 JS。HTML 用 `<script src="*.compiled.js"></script>` 載入。完全拿掉 Babel runtime。

### 4. Manifest 的 `start_url` 要絕對路徑

```json
{
  "start_url": "/jibao-assets/?mobile=1",   // ✓ 絕對路徑可靠
  // "start_url": "./?mobile=1",            // ✗ 相對路徑某些 iOS 版本會錯解析
  "scope": "/jibao-assets/",
  "display": "standalone"
}
```

### 5. PWA 出問題時要叫使用者完整重設

iOS PWA cache 非常頑固，server 端改了東西不會自動更新。修完 manifest / index.html 後告訴使用者：

1. 主畫面長按舊 icon → **移除書籤**
2. iOS 設定 → Safari → **清除瀏覽紀錄與網站資料**
3. Safari 重新開頁面
4. 重新「加入主畫面」
5. 從主畫面 icon 啟動

少做任何一步都可能在用舊 cache。

### 6. 怎麼判斷 PWA 到底狀態如何

打開 `pwa-test.html`（在主畫面或 Safari 都行），它會印出：
- `URL`: 實際載入路徑（檢查 start_url 解析對不對）
- `standalone`: `YES (PWA)` / `NO (Safari)` / `undefined`（檢查到底有沒有進 PWA 模式）
- `vp`: visualViewport 尺寸（檢查 Safari chrome 吃掉多少）
- `UA`: iOS 版本

修任何 PWA 問題前先讓使用者開這個頁面拍給你看。

---

## Tab bar 規格速查

如果你要動 `app.jsx` 裡的 `TabBarRow`：

| 屬性 | 值 | 理由 |
| --- | --- | --- |
| `position` | `fixed` | 釘 viewport 底（不要回去用 grid row） |
| `bottom` | `0` | 同上 |
| `paddingBottom` | `8` | 寫死。**不要**用 `env(safe-area-inset-bottom)` |
| Inner `height` | `56` | iOS 標準 49pt + 一點呼吸空間 |
| Items `justifyContent` | （無，預設 center） | 配 56 內框看起來剛好 |
| 配色 | `#111` 背景 | 配 home indicator 看不太到 |

Tab bar 總高度永遠是 64pt，不會因為 iOS 版本/URL bar 狀態變化。

---

## Screen 結構

`Screen` 元件是 2-row CSS grid：

```
┌─────────────────────────┐
│ Header (我的資產 + 兩個 │  ← row 1: auto (內容自適應)
│ CircleButton)            │
├─────────────────────────┤
│                          │
│ Scrollable content       │  ← row 2: minmax(0, 1fr)
│ (證券卡 + 連結銀行卡    │     padding-bottom: 80px
│  + 趨勢圖卡)              │     留給 fixed tab bar
│                          │
└─────────────────────────┘
   fixed tab bar 浮在最下面    ← position: fixed; bottom: 0
```

Content scroll 區的 `padding: '0 10px 80px'` 那個 80 是讓最後一張卡片可以完整滑到 tab bar 上方（不會被 tab bar 蓋住）。Tab bar 64pt + 一點呼吸 = 80。

---

## 提交歷史摘要（給後人）

時間線上踩過的坑：

| Commit | 教訓 |
| --- | --- |
| `f098e57` | body 不要用 `#1F3A8A` 藍色，因為 tab bar safe-area 留白會漏色 → 改 `#111` |
| `0afdaf3` → `2353391` | Tab bar 內框從 78px 一路壓到 49px；最後決定丟掉 `env(safe-area-inset-bottom)` |
| `f1e373c` | Tab bar 改 `position: fixed; bottom: 0`，Screen grid 從 3 row 改 2 row |
| `a64ea6a` | JSX 預先編譯成 `.compiled.js`，丟掉 Babel runtime |
| `eb0d6a7` | 加 PWA manifest + apple-touch-icon |
| `cdc4888` | 加 inline `style=` 在 html/body + `#boot` splash，PWA 白屏終於解決 |
| `0f8960a` | 移掉 diagnostic 文字，保留 inline-style 救命設計 |

如果你修改後 PWA 又白屏了，先回去看 `cdc4888` 的 diff，那是最關鍵的修正。

---

## 部署

### GitHub Pages（目前用的）

`main` push 後 GitHub Pages 自動 build，1-2 分鐘上線。設定在 GitHub repo Settings → Pages → Branch `main` / Folder `/`。

### 其他靜態 host

整包 dump 到任何 static server 都可以：

- **GCS + Cloud CDN**: `gsutil -m cp -r jibao-assets/ gs://your-bucket/`
- **Vercel**: 直接連 repo
- **Netlify**: drag-and-drop 整個資料夾
- **本機測試**: `python3 -m http.server 8000`，開 http://localhost:8000

唯一前提：manifest 的 `start_url` / `scope` 是絕對路徑 `/jibao-assets/...`，部署在不同 path 要改。

---

## 已知不修

- **桌面預覽模式（不帶 `?mobile=1`）的 device frame** 在 iPad / 寬螢幕 Safari 上會跑版。設計上只是給 demo / 截圖用，沒打算當 production UI。
- **TabBar 的 home indicator 重疊**：64pt 的 tab bar 底部會跟 iPhone home indicator 視覺重疊（home indicator 變白色細線在黑色 tab bar 上）。可讀性沒問題，是 trade-off 後決定保留這樣，避免依賴 `env(safe-area-inset-bottom)`。

---

## License / 來源

設計原案來自 claude.ai/design 的 handoff bundle（檔案 ID `TTYTPkZhVl9oJbDkF_uPPA`）。Tab bar icon PNG (`assets/`) 由原案附帶。React 18.3.1 從 unpkg CDN 載入。
