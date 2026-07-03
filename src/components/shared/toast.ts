type ToastType = "success" | "error" | "info" | "warning";

interface ToastOptions {
  type?: ToastType;
  message: string;
}

function showToast({ type = "info", message }: ToastOptions) {
  const colors: Record<ToastType, string> = {
    success: "background: #16a34a; color: white;",
    error: "background: #dc2626; color: white;",
    info: "background: #2563eb; color: white;",
    warning: "background: #d97706; color: white;",
  };

  const style = `
    ${colors[type]}
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 13px;
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;

  const el = document.createElement("div");
  el.innerText = message;
  el.style.cssText = style;

  document.body.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 2500);
}

export const toast = {
  success: (msg: string) => showToast({ type: "success", message: msg }),
  error: (msg: string) => showToast({ type: "error", message: msg }),
  info: (msg: string) => showToast({ type: "info", message: msg }),
  warning: (msg: string) => showToast({ type: "warning", message: msg }),
};
