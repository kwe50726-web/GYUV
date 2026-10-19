chrome.action.onClicked.addListener(async () => {
  const { gameUrl } = await chrome.storage.sync.get("gameUrl");
  if (!gameUrl) { chrome.runtime.openOptionsPage(); return; }
  const { winId } = await chrome.storage.session.get("winId").catch(() => ({}));
  if (winId) { try { await chrome.windows.update(winId, { focused: true }); return; } catch (e) {} }
  const w = await chrome.windows.create({ url: gameUrl, type: "popup", width: 520, height: 880 });
  chrome.storage.session.set({ winId: w.id }).catch(() => {});
});
chrome.windows.onRemoved.addListener(async (id) => {
  const { winId } = await chrome.storage.session.get("winId").catch(() => ({}));
  if (id === winId) chrome.storage.session.remove("winId").catch(() => {});
});
