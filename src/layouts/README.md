# Layout 結構說明

## 分層架構

```
AppLayout (最外層)
├── QueryClientProvider (React Query 配置)
└── RouterProvider (React Router 配置)
    └── PageLayout (頁面層級)
        ├── Ant Design 樣式引入
        └── MainLayout (主要佈局)
            ├── Sidebar (側邊欄)
            ├── Header (頂部導航)
            ├── Content (主要內容區域)
            └── Footer (底部)
```

## 各層職責

### AppLayout
- 提供 React Query 的 QueryClientProvider
- 提供 React Router 的 RouterProvider
- 集中管理全域狀態和配置

### PageLayout
- 引入全域樣式 (Ant Design + 自定義 CSS)
- 作為頁面層級的容器

### MainLayout
- 提供應用程式的主要 UI 結構
- 包含側邊欄、頂部導航、內容區域、底部
- 處理導航和麵包屑

## 優點

1. **關注點分離** - 每層都有明確的職責
2. **可維護性** - 容易修改和擴展
3. **可重用性** - 可以輕鬆替換或重組 layout
4. **配置集中** - React Query 配置集中在 AppLayout 