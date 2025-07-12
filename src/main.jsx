import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from './layouts/AppLayout';

// 建立 QueryClient 實例
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 分鐘
      gcTime: 10 * 60 * 1000, // 10 分鐘
      refetchOnWindowFocus: false, // 視窗聚焦時不重新取得
      retry: 1, // 失敗時重試 1 次
    },
    mutations: {
      retry: 1, // mutation 失敗時重試 1 次
    },
  },
});

async function cleanupAndStart() {
  // 在開發環境中啟用 Mock Service Worker
  if (import.meta.env.DEV) {
    // 強制清除所有已註冊的舊 Service Worker
    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
          console.log('[MSW Cleanup] Unregistered old service worker:', registration);
        }
      } catch (error) {
        console.error('Error unregistering service worker:', error);
      }
    }

    const { worker } = await import('./mocks/browser.js');
    console.log('[MSW] Starting MSW...');
    await worker.start({
      onUnhandledRequest: 'bypass', // 對於未處理的請求，直接放行
    });
    console.log('[MSW] MSW started with latest handlers.');
  }

  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <AppLayout />
      </React.StrictMode>,
    );
  }
}

cleanupAndStart();