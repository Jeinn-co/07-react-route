import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from './router';
import "antd/dist/reset.css"; // Import AntD's reset styles
import "./index.css";

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
    <RouterProvider router={router} />
  </React.StrictMode>,
);
  }
}

cleanupAndStart();