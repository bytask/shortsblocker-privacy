// Feature registry — the single source of truth for options (popup) and behaviour (content/page scripts).
// key: storage key + html[data-sb-<key>] attribute. type: "bool" | "select". platforms: d = desktop, m = mobile.
// Labels are inline (ja/en) so the popup needs no extra locale plumbing.
const SB_CATEGORIES = [
  { id: "shorts", ja: "ショート", en: "Shorts" },
  { id: "home", ja: "ホーム", en: "Home" },
  { id: "subs", ja: "登録チャンネル", en: "Subscriptions" },
  { id: "lists", ja: "動画リスト", en: "Video lists" },
  { id: "watch", ja: "動画ページ", en: "Video pages" },
  { id: "player", ja: "プレーヤー", en: "Player" },
  { id: "fullscreen", ja: "全画面表示", en: "Full screen" },
  { id: "sidebar", ja: "サイドバー（PC）", en: "Sidebar (desktop)" },
  { id: "ui", ja: "UI の微調整", en: "UI tweaks" },
  { id: "ads", ja: "広告", en: "Ads" },
  { id: "embed", ja: "埋め込み動画", en: "Embedded videos" },
  { id: "mobile", ja: "モバイル", en: "Mobile" },
  { id: "tools", ja: "ツール", en: "Tools" },
  { id: "debug", ja: "デバッグ", en: "Debug" },
];

const SB_FEATURES = [
  // ---- Shorts
  { key: "hideShorts", cat: "shorts", default: true, ja: "ショート動画を非表示", en: "Hide Shorts" },
  { key: "redirectShorts", cat: "shorts", default: true, ja: "ショートを通常のプレイヤーにリダイレクト", en: "Redirect Shorts to the normal player" },
  { key: "stopShortsLooping", cat: "shorts", default: false, ja: "ショートのループ再生を停止", en: "Stop Shorts looping" },
  { key: "hideShortsSuggestedActions", cat: "shorts", default: true, ja: "提案アクションを非表示", en: "Hide suggested actions" },
  { key: "hideShortsMusicLink", cat: "shorts", default: true, ja: "楽曲リンクを非表示", en: "Hide music link" },
  { key: "hideShortsRelatedLink", cat: "shorts", default: true, ja: "同じチャンネルの関連ショートへのリンクを非表示", en: "Hide link to related Short by the same channel" },
  { key: "hideShortsRemixButton", cat: "shorts", default: false, ja: "リミックスボタンを非表示", en: "Hide Remix button" },
  { key: "hideShortsMetadataUntilHover", cat: "shorts", default: false, platforms: "d", ja: "ホバーするまでショートのメタデータを隠す", en: "Hide Shorts metadata until hover" },
  { key: "alwaysShowShortsProgressBar", cat: "shorts", default: false, ja: "常に進行状況バーを表示", en: "Always show progress bar" },
  { key: "minimumShortsPerRow", cat: "shorts", default: "0", type: "select", platforms: "d", options: [["0", "自動", "Auto"], ["4", "4"], ["5", "5"], ["6", "6"], ["8", "8"]], ja: "1行あたりの最小ショート数", en: "Minimum Shorts per row" },

  // ---- Home
  { key: "disableHomeFeed", cat: "home", default: false, ja: "ホームフィードを無効化（登録チャンネルへ）", en: "Disable Home feed (redirects to Subscriptions)" },
  { key: "redirectLogoToSubscriptions", cat: "home", default: false, ja: "ロゴのリンク先を登録チャンネルにする", en: "Link YouTube logo to Subscriptions" },
  { key: "hideHomeCategories", cat: "home", default: false, ja: "ホームのカテゴリを非表示", en: "Hide categories in Home" },
  { key: "hideHomePosts", cat: "home", default: false, ja: "ホームの投稿を非表示", en: "Hide Posts in Home" },
  { key: "hideSuggestedSections", cat: "home", default: false, ja: "おすすめセクションを非表示", en: "Hide suggested sections" },
  { key: "hideExploreButton", cat: "home", default: false, platforms: "m", ja: "ホームの探索ボタンを非表示", en: "Hide Explore button in Home" },
  { key: "displayHomeGridAsList", cat: "home", default: false, platforms: "d", ja: "ホームのグリッドをリスト形式で表示", en: "Display Home grid as a list" },

  // ---- Subscriptions
  { key: "displaySubscriptionsGridAsList", cat: "subs", default: false, platforms: "d", ja: "登録チャンネルのグリッドをリスト形式で表示", en: "Display Subscriptions grid as a list" },
  { key: "showChannelHeadersInListView", cat: "subs", default: false, platforms: "d", ja: "リスト表示でチャンネルヘッダーを表示", en: "Show channel headers in list view" },
  { key: "hideSubscriptionsChannelList", cat: "subs", default: false, platforms: "m", ja: "登録チャンネルのチャンネルリストを非表示", en: "Hide channel list in Subscriptions" },
  { key: "hideSubscriptionsLatestBar", cat: "subs", default: false, platforms: "d", ja: "「新しい順」バーを非表示", en: "Hide \"Latest\" bar in Subscriptions" },
  { key: "hideCollaborations", cat: "subs", default: false, ja: "コラボレーションを非表示", en: "Hide Collaborations in Subscriptions" },

  // ---- Video lists
  { key: "hideWatched", cat: "lists", default: false, ja: "視聴済みの動画を非表示", en: "Hide watched videos" },
  { key: "hideWatchedThreshold", cat: "lists", default: "80", type: "select", options: [["0", "割合によらず", "any %"], ["50", "50% 以上", "At least 50%"], ["80", "80% 以上", "At least 80%"], ["95", "95% 以上", "At least 95%"]], ja: "視聴済みの割合", en: "Watched %" },
  { key: "hideLive", cat: "lists", default: false, ja: "ライブ動画を非表示", en: "Hide Live videos" },
  { key: "hideStreamed", cat: "lists", default: false, ja: "配信済みの動画を非表示", en: "Hide Streamed videos" },
  { key: "hideUpcoming", cat: "lists", default: false, ja: "公開予定の動画を非表示", en: "Hide Upcoming videos" },
  { key: "hideMixes", cat: "lists", default: false, ja: "ミックスを非表示", en: "Hide Mixes" },
  { key: "hidePlaylists", cat: "lists", default: false, ja: "再生リストを非表示", en: "Hide Playlists" },
  { key: "hideMoviesAndTV", cat: "lists", default: false, ja: "映画とテレビを非表示", en: "Hide Movies and TV" },
  { key: "hideMembersOnly", cat: "lists", default: false, ja: "メンバー限定動画を非表示", en: "Hide Members only videos" },
  { key: "hideAutoDubbed", cat: "lists", default: false, ja: "自動吹き替え動画を非表示", en: "Hide Auto-dubbed videos" },
  { key: "hideSponsored", cat: "lists", default: true, ja: "スポンサー動画とプロモーションを非表示", en: "Hide Sponsored videos & promos" },
  { key: "hideHiddenVideos", cat: "lists", default: false, ja: "「興味なし」にした動画を非表示（5秒後）", en: "Hide hidden videos (after 5s)" },
  { key: "hideChannels", cat: "lists", default: false, ja: "指定チャンネルの動画を非表示", en: "Hide channels" },
  { key: "hiddenChannels", cat: "lists", default: "", type: "text", ja: "非表示にするチャンネル名（改行区切り）", en: "Channel names to hide (one per line)" },
  { key: "hideLowViews", cat: "lists", default: false, ja: "関連動画の再生数が少ない動画を非表示（1,000 未満）", en: "Hide low view videos in Related (< 1,000)" },
  { key: "showFullVideoTitles", cat: "lists", default: false, ja: "動画のタイトルを全文表示", en: "Show full video titles" },
  { key: "gridItemsPerRow", cat: "lists", default: "0", type: "select", platforms: "d", options: [["0", "自動", "Auto"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"]], ja: "1行あたりのグリッド項目数", en: "Grid items per row" },
  { key: "searchThumbnailSize", cat: "lists", default: "default", type: "select", platforms: "d", options: [["default", "デフォルト", "Default"], ["small", "小", "Small"], ["xsmall", "極小", "Extra small"]], ja: "検索サムネイルのサイズ", en: "Search thumbnail size" },
  { key: "disableVideoPreviews", cat: "lists", default: false, platforms: "d", ja: "動画のプレビューを無効化", en: "Disable video previews" },
  { key: "disableThemedHover", cat: "lists", default: false, platforms: "d", ja: "テーマホバー効果を無効化", en: "Disable themed hover effects" },
  { key: "fixGhostCards", cat: "lists", default: true, platforms: "d", ja: "グリッドの読み込みプレースホルダーを修正", en: "Fix grid loading placeholders" },
  { key: "animateHiding", cat: "lists", default: false, ja: "アニメーション付きで非表示", en: "Animate hiding" },

  // ---- Video pages
  { key: "hideRelated", cat: "watch", default: false, ja: "関連動画を非表示", en: "Hide Related videos" },
  { key: "hideRelatedBelow", cat: "watch", default: false, platforms: "d", ja: "関連動画は動画の下に出る場合のみ非表示", en: "Only when they appear below the video" },
  { key: "hideComments", cat: "watch", default: false, ja: "コメントを非表示", en: "Hide Comments" },
  { key: "hideChat", cat: "watch", default: false, ja: "チャットを非表示", en: "Hide Chat" },
  { key: "hideChatFullScreen", cat: "watch", default: false, platforms: "d", ja: "チャットは全画面表示中のみ非表示", en: "Only hide chat in full screen" },
  { key: "hideMetadata", cat: "watch", default: false, ja: "動画のメタデータを非表示", en: "Hide video metadata" },
  { key: "hideMerchEtc", cat: "watch", default: true, ja: "商品・オファーなどを非表示", en: "Hide Merch, Offers etc." },
  { key: "hideShareThanksClip", cat: "watch", default: false, ja: "共有 / Thanks / クリップなどを非表示", en: "Hide Share/Thanks/Clip etc." },
  { key: "hideAskButton", cat: "watch", default: false, ja: "「質問する」ボタンを非表示", en: "Hide Ask button" },
  { key: "hideAI", cat: "watch", default: false, ja: "AI による概要を非表示", en: "Hide AI summaries" },
  { key: "hideInfoPanels", cat: "watch", default: false, ja: "情報パネルを非表示", en: "Hide information panels" },
  { key: "hideEndCards", cat: "watch", default: false, ja: "動画のエンドカードを非表示", en: "Hide video end cards" },
  { key: "hideEndVideos", cat: "watch", default: false, ja: "終了画面のおすすめを非表示", en: "Hide video endscreen content" },
  { key: "hideChannelWatermark", cat: "watch", default: false, ja: "チャンネルの透かしを非表示", en: "Hide channel watermark" },
  { key: "hideNextButton", cat: "watch", default: false, platforms: "d", ja: "「次へ」ボタンを非表示（再生リスト外）", en: "Hide the Next button (outside playlists)" },
  { key: "hideJumpAheadButton", cat: "watch", default: false, ja: "Premium の「ジャンプ」ボタンを非表示", en: "Hide Premium Jump ahead button" },
  { key: "hideExperiencingInterruptions", cat: "watch", default: true, ja: "「再生が中断されていますか？」を非表示", en: "Hide \"Experiencing interruptions?\" popup" },
  { key: "hideWatchSideMenu", cat: "watch", default: false, platforms: "m", ja: "動画ページのサイドメニューを非表示", en: "Hide video page side menu" },
  { key: "disableAutoplay", cat: "watch", default: false, ja: "自動再生を無効化", en: "Disable Autoplay" },
  { key: "pauseChannelTrailers", cat: "watch", default: false, ja: "チャンネルのトレーラーを自動的に一時停止", en: "Automatically pause channel trailers" },
  { key: "alwaysUseOriginalAudio", cat: "watch", default: false, ja: "常にオリジナル音声を使用", en: "Always use original audio" },
  { key: "disableStableVolume", cat: "watch", default: false, platforms: "d", ja: "「一定音量」を無効化", en: "Disable Stable Volume" },

  // ---- Player
  { key: "disableAmbientMode", cat: "player", default: false, ja: "アンビエントモードを無効化", en: "Disable Ambient mode" },
  { key: "alwaysUseTheaterMode", cat: "player", default: false, platforms: "d", ja: "常にシアターモードを使用", en: "Always use theater mode" },
  { key: "fullSizeTheaterMode", cat: "player", default: false, platforms: "d", ja: "フルサイズシアターモード", en: "Full size theater mode" },
  { key: "fullSizeTheaterModeHideHeader", cat: "player", default: false, platforms: "d", ja: "フルサイズ時にヘッダーを非表示", en: "Hide header in full size theater mode" },
  { key: "revertGiantRelated", cat: "player", default: false, platforms: "d", ja: "関連動画のサイドバーレイアウトを復元", en: "Restore Related sidebar layout" },
  { key: "restoreMiniplayerButton", cat: "player", default: false, platforms: "d", ja: "ミニプレーヤーボタンを復元", en: "Restore Miniplayer button" },
  { key: "playerControlsBg", cat: "player", default: "default", type: "select", platforms: "d", options: [["default", "デフォルト", "Default"], ["transparent", "透明", "Transparent"], ["blur", "ぼかし", "Blur"]], ja: "プレーヤーコントロールの背景", en: "Player controls background" },
  { key: "removePink", cat: "player", default: false, ja: "進捗バーのピンクのグラデーションを削除", en: "Remove pink gradient from progress bars" },
  { key: "playerRemoveDelhiExperimentFlags", cat: "player", default: false, platforms: "d", ja: "新しいプログレスバーとコントロールを無効化（旧 UI が残る間のみ）", en: "Disable new progress bar and controls (while the old UI exists)" },
  { key: "playerFixFullScreenButton", cat: "player", default: false, platforms: "d", ja: "隅のダブルクリックで全画面切替を復元", en: "Restore corner click to toggle full screen" },
  { key: "disableNumberKeySeeking", cat: "player", default: false, platforms: "d", ja: "数字キーによるシークを無効化", en: "Disable number key seeking" },

  // ---- Full screen
  { key: "playerHideFullScreenControls", cat: "fullscreen", default: false, ja: "新しい全画面コントロールを非表示", en: "Hide new full screen controls" },
  { key: "playerHideFullScreenMoreActions", cat: "fullscreen", default: false, ja: "「その他の操作」メニューを非表示", en: "Hide full screen \"More actions\" menu" },
  { key: "playerHideFullScreenMoreVideos", cat: "fullscreen", default: false, ja: "「その他の動画」を非表示", en: "Hide \"More videos\" in full screen" },
  { key: "playerHideFullScreenTitle", cat: "fullscreen", default: false, ja: "全画面のタイトルを非表示", en: "Hide full screen title" },
  { key: "playerHideFullScreenVoting", cat: "fullscreen", default: false, ja: "全画面の高評価 / 低評価ボタンを非表示", en: "Hide full screen like/dislike buttons" },

  // ---- Sidebar (desktop)
  { key: "tidyGuideSidebar", cat: "sidebar", default: false, platforms: "d", ja: "サイドバーを整理（探索・その他を隠す）", en: "Tidy Guide sidebar" },
  { key: "hideSidebarSubscriptions", cat: "sidebar", default: false, platforms: "d", ja: "登録チャンネルのリストを非表示", en: "Hide Subscriptions list" },
  { key: "hideSidebarWhenEmpty", cat: "sidebar", default: false, platforms: "d", ja: "サイドバーが空のときは非表示", en: "Hide sidebar when empty" },
  { key: "revertSidebarOrder", cat: "sidebar", default: false, platforms: "d", ja: "サイドバー項目の並び順を復元（登録チャンネルを上へ）", en: "Restore order of sidebar items" },
  { key: "restoreSidebarSubscriptionsLink", cat: "sidebar", default: false, platforms: "d", ja: "サイドバーの「登録チャンネル」リンクを復元", en: "Restore Subscriptions link in sidebar" },

  // ---- UI tweaks
  { key: "enforceTheme", cat: "ui", default: "device", type: "select", options: [["device", "デバイスのテーマ", "Device theme"], ["light", "ライト", "Light"], ["dark", "ダーク", "Dark"]], ja: "テーマを強制", en: "Enforce theme" },
  { key: "useSquareCorners", cat: "ui", default: false, ja: "サムネイルと動画の角を四角にする", en: "Use square corners for thumbnails and videos" },
  { key: "fullWidthChannelPage", cat: "ui", default: false, platforms: "d", ja: "全幅チャンネルページ", en: "Full-width channel page" },
  { key: "hideChannelBanner", cat: "ui", default: false, ja: "チャンネルバナー画像を非表示", en: "Hide channel banner images" },
  { key: "hideVoiceSearch", cat: "ui", default: false, ja: "音声検索を非表示", en: "Hide Search with your voice" },
  { key: "hidePremiumUpsells", cat: "ui", default: true, ja: "Premium のアップセルを非表示", en: "Hide Premium upsells" },

  // ---- Ads
  { key: "blockAds", cat: "ads", default: false, ja: "広告をブロック（他の広告ブロッカーと併用時はオフ）", en: "Block ads (turn off if you use another adblocker)" },

  // ---- Embedded videos
  { key: "hideEmbedPauseOverlay", cat: "embed", default: false, ja: "一時停止オーバーレイを非表示", en: "Hide pause overlay" },
  { key: "hideEmbedShareButton", cat: "embed", default: false, ja: "共有ボタンを非表示", en: "Hide Share button" },

  // ---- Mobile
  { key: "allowBackgroundPlay", cat: "mobile", default: false, platforms: "m", ja: "バックグラウンド再生を許可", en: "Allow background playback" },
  { key: "hideOpenApp", cat: "mobile", default: true, platforms: "m", ja: "「アプリを開く」リンクを非表示", en: "Hide Open App links" },
  { key: "mobileGridView", cat: "mobile", default: false, platforms: "m", ja: "登録チャンネルと検索でグリッド表示（縦画面のみ）", en: "Use grid view for Subscriptions & Search (portrait only)" },

  // ---- Tools
  { key: "downloadTranscript", cat: "tools", default: false, platforms: "d", ja: "文字起こしをダウンロード可能にする", en: "Make Transcript downloadable" },
  { key: "addTakeSnapshot", cat: "tools", default: false, ja: "動画のスナップショットボタンを追加", en: "Add Take snapshot to the player" },
  { key: "snapshotFormat", cat: "tools", default: "jpeg", type: "select", options: [["jpeg", "JPEG"], ["png", "PNG"], ["webp", "WebP"]], ja: "スナップショット形式", en: "Snapshot format" },
  { key: "snapshotQuality", cat: "tools", default: "0.92", type: "select", options: [["0.6", "低", "Low"], ["0.8", "中", "Medium"], ["0.92", "高", "High"], ["1", "最高", "Full"]], ja: "品質", en: "Quality" },

  // ---- Debug
  { key: "debug", cat: "debug", default: false, ja: "デバッグログを有効化", en: "Debug mode" },
  { key: "debugManualHiding", cat: "debug", default: false, ja: "非表示にせず要素をハイライト", en: "Highlight elements instead of hiding them" },
];

const SB_DEFAULTS = Object.fromEntries(SB_FEATURES.map((f) => [f.key, f.default]));
// Shorts Blocker — content script for youtube.com (desktop ytd-* and mobile ytm-*) and YouTube embeds.
// Engine: every feature in features.js becomes an <html data-sb-<key>> attribute (booleans) or a value
// (selects). CSS rules are gated on those attributes (zero flash, toggles are attribute flips, injected at
// document_start). A small idempotent JS pass covers what CSS cannot express (text classification of
// video items, redirects, injected buttons). page.js runs in the page world for player/visibility hooks.
(() => {
  "use strict";
  const api = typeof browser !== "undefined" ? browser : chrome;
  const html = document.documentElement;
  const HIDDEN = "data-sb-hidden";
  const A = (key) => `data-sb-${key.toLowerCase()}`;
  const H = (key) => `html[${A(key)}]`;
  const IS_EMBED = /\/embed\//.test(location.pathname) || /youtube-nocookie\.com$/.test(location.hostname);
  const IS_MOBILE = /^m\./.test(location.hostname);
  const SHORTS_RE = /^\/shorts\/([A-Za-z0-9_-]{6,})/;
  const T = {
    shorts: ["shorts", "ショート", "ショート動画"],
    live: ["live", "ライブ", "ライブ配信中", "配信中", "視聴中"],
    streamed: ["streamed", "配信済み", "ライブ配信済み"],
    upcoming: ["premieres", "premiere", "upcoming", "scheduled for", "公開予定", "プレミア公開", "待機中", "配信予定"],
    mix: ["mix", "ミックス"],
    members: ["members only", "members-only", "メンバー限定", "メンバーシップ限定"],
    dubbed: ["auto-dubbed", "auto dubbed", "自動吹き替え", "自動ダビング", "オートダビング"],
    sponsored: ["sponsored", "ad", "ads", "スポンサー", "広告", "プロモーション"],
    collab: ["collaboration", "コラボレーション", "コラボ"],
    interruptions: ["experiencing interruptions", "再生が中断", "中断されていますか"],
  };
  const norm = (s) => (s || "").replace(/\s+/g, " ").trim().toLowerCase();
  const hasText = (el, words, exact = false) => {
    if (!el) return false;
    const t = norm(el.textContent);
    return exact ? words.includes(t) : words.some((w) => t.includes(w));
  };

  // ------------------------------------------------------------------ CSS
  const CSS = `
/* ===== generic hidden marker (JS pass) ===== */
[${HIDDEN}] { display: none !important; }
html[data-sb-debugmanualhiding] [${HIDDEN}] { display: revert !important; outline: 3px solid #ff0033 !important; outline-offset: -3px; opacity: .55; }
html[data-sb-animatehiding] .sb-fading { transition: opacity .35s ease; opacity: 0 !important; }

/* ===== Shorts ===== */
${H("hideShorts")} ytd-rich-shelf-renderer[is-shorts],
${H("hideShorts")} ytd-reel-shelf-renderer,
${H("hideShorts")} ytd-shorts-shelf-renderer,
${H("hideShorts")} ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts]),
${H("hideShorts")} ytd-rich-section-renderer:has(ytd-reel-shelf-renderer),
${H("hideShorts")} ytd-rich-section-renderer:has(grid-shelf-view-model),
${H("hideShorts")} ytd-rich-section-renderer:has(ytm-shorts-lockup-view-model),
${H("hideShorts")} ytd-rich-section-renderer:has(ytm-shorts-lockup-view-model-v2),
${H("hideShorts")} ytd-rich-section-renderer:has(a[href^="/shorts"]),
${H("hideShorts")} grid-shelf-view-model,
${H("hideShorts")} ytd-rich-item-renderer:has(a[href^="/shorts/"]),
${H("hideShorts")} ytd-rich-item-renderer:has(ytm-shorts-lockup-view-model),
${H("hideShorts")} ytd-rich-item-renderer:has(ytm-shorts-lockup-view-model-v2),
${H("hideShorts")} ytd-rich-grid-slim-media[is-short],
${H("hideShorts")} ytd-rich-grid-slim-media[is-reel-item],
${H("hideShorts")} ytd-grid-video-renderer:has(a[href^="/shorts/"]),
${H("hideShorts")} ytd-video-renderer:has(a[href^="/shorts/"]),
${H("hideShorts")} ytd-video-renderer:has(ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]),
${H("hideShorts")} ytd-item-section-renderer:has(> #contents > ytd-reel-shelf-renderer:only-child),
${H("hideShorts")} ytd-compact-video-renderer:has(a[href^="/shorts/"]),
${H("hideShorts")} yt-lockup-view-model:has(a[href^="/shorts/"]),
${H("hideShorts")} ytd-guide-entry-renderer:has(a[href^="/shorts"]),
${H("hideShorts")} ytd-mini-guide-entry-renderer:has(a[href^="/shorts"]),
${H("hideShorts")} ytd-guide-entry-renderer:has(a[title="Shorts"]),
${H("hideShorts")} ytd-guide-entry-renderer:has(a[title="ショート"]),
${H("hideShorts")} ytd-mini-guide-entry-renderer[aria-label="Shorts"],
${H("hideShorts")} ytd-mini-guide-entry-renderer[aria-label="ショート"],
${H("hideShorts")} yt-tab-shape[tab-title="Shorts"],
${H("hideShorts")} yt-tab-shape[tab-title="ショート"],
${H("hideShorts")} tp-yt-paper-tab:has(> .tab-content[title="Shorts"]),
${H("hideShorts")} tp-yt-paper-tab:has(> .tab-content[title="ショート"]),
${H("hideShorts")} ytd-notification-renderer:has(a[href^="/shorts/"]),
${H("hideShorts")} yt-chip-cloud-chip-renderer:has(yt-formatted-string[title="Shorts"]),
${H("hideShorts")} yt-chip-cloud-chip-renderer:has(yt-formatted-string[title="ショート"]),
${H("hideShorts")} ytd-shorts,
${H("hideShorts")} ytd-reel-video-renderer,
${H("hideShorts")} ytm-reel-shelf-renderer,
${H("hideShorts")} ytm-shorts-lockup-view-model,
${H("hideShorts")} ytm-shorts-lockup-view-model-v2,
${H("hideShorts")} ytm-reel-item-renderer,
${H("hideShorts")} ytm-reel-lockup-view-model,
${H("hideShorts")} ytm-rich-grid-media[is-short],
${H("hideShorts")} ytm-rich-item-renderer:has(a[href^="/shorts/"]),
${H("hideShorts")} ytm-rich-item-renderer:has(ytm-shorts-lockup-view-model),
${H("hideShorts")} ytm-rich-item-renderer:has(ytm-shorts-lockup-view-model-v2),
${H("hideShorts")} ytm-rich-section-renderer:has(ytm-reel-shelf-renderer),
${H("hideShorts")} ytm-rich-section-renderer:has(ytm-shorts-lockup-view-model),
${H("hideShorts")} ytm-rich-section-renderer:has(ytm-shorts-lockup-view-model-v2),
${H("hideShorts")} ytm-rich-section-renderer:has(a[href^="/shorts/"]),
${H("hideShorts")} ytm-item-section-renderer:has(> * > ytm-reel-shelf-renderer:only-child),
${H("hideShorts")} ytm-video-with-context-renderer:has(a[href^="/shorts/"]),
${H("hideShorts")} ytm-video-with-context-renderer:has(ytm-thumbnail-overlay-time-status-renderer[data-style="SHORTS"]),
${H("hideShorts")} ytm-video-with-context-renderer:has(ytm-media-item.big-shorts-singleton),
${H("hideShorts")} ytm-compact-video-renderer:has(a[href^="/shorts/"]),
${H("hideShorts")} ytm-notification-renderer:has(a[href^="/shorts/"]),
${H("hideShorts")} ytm-chip-cloud-chip-renderer:has(a[href^="/shorts"]) { display: none !important; }
${H("hideShorts")} ytm-pivot-bar-item-renderer:has(.pivot-shorts),
${H("hideShorts")} ytm-pivot-bar-item-renderer:has(a[href^="/shorts"]),
${H("hideShorts")} ytm-pivot-bar-item-renderer[data-sb-pivot="shorts"] {
  display: none !important; flex: 0 0 0 !important; width: 0 !important; min-width: 0 !important; max-width: 0 !important;
  padding: 0 !important; margin: 0 !important; overflow: hidden !important; pointer-events: none !important;
}
${H("hideShorts")} ytm-pivot-bar-renderer[data-sb-rebalanced] { display: flex !important; justify-content: space-around !important; }
${H("hideShorts")} ytm-pivot-bar-renderer[data-sb-rebalanced] > ytm-pivot-bar-item-renderer:not([data-sb-pivot="shorts"]) { flex: 1 1 0 !important; width: auto !important; min-width: 0 !important; max-width: none !important; }
${H("hideShortsSuggestedActions")} ytd-reel-video-renderer .ytp-suggested-action,
${H("hideShortsSuggestedActions")} ytd-shorts .ytp-suggested-action,
${H("hideShortsSuggestedActions")} ytm-shorts-player .ytp-suggested-action,
${H("hideShortsSuggestedActions")} reel-player-overlay-renderer yt-shorts-suggested-action-view-model,
${H("hideShortsSuggestedActions")} .ytShortsSuggestedActionViewModelHost { display: none !important; }
${H("hideShortsMusicLink")} reel-player-overlay-renderer reel-sound-metadata-view-model,
${H("hideShortsMusicLink")} ytd-reel-player-overlay-renderer .reel-sound-metadata,
${H("hideShortsMusicLink")} .ytReelSoundMetadataViewModelHost,
${H("hideShortsMusicLink")} ytm-reel-player-overlay-renderer .reel-sound-metadata { display: none !important; }
${H("hideShortsRelatedLink")} reel-player-overlay-renderer .ytReelMultiFormatLinkViewModelHost,
${H("hideShortsRelatedLink")} reel-multi-format-link-view-model,
${H("hideShortsRelatedLink")} ytd-reel-player-overlay-renderer #multi-format-link { display: none !important; }
${H("hideShortsRemixButton")} ytd-reel-player-overlay-renderer #remix-button,
${H("hideShortsRemixButton")} reel-action-bar-view-model button[aria-label*="Remix"],
${H("hideShortsRemixButton")} reel-action-bar-view-model button[aria-label*="リミックス"],
${H("hideShortsRemixButton")} ytm-reel-player-overlay-renderer button[aria-label*="Remix"],
${H("hideShortsRemixButton")} ytm-reel-player-overlay-renderer button[aria-label*="リミックス"] { display: none !important; }
${H("hideShortsMetadataUntilHover")} ytd-reel-video-renderer:not(:hover) ytd-reel-player-overlay-renderer #actions,
${H("hideShortsMetadataUntilHover")} ytd-reel-video-renderer:not(:hover) ytd-reel-player-overlay-renderer #overlay,
${H("hideShortsMetadataUntilHover")} ytd-shorts .reel-video-in-sequence:not(:hover) reel-player-overlay-renderer { opacity: 0 !important; transition: opacity .2s; }
${H("alwaysShowShortsProgressBar")} ytd-shorts .ytp-progress-bar-container,
${H("alwaysShowShortsProgressBar")} ytd-reel-video-renderer .ytp-progress-bar-container,
${H("alwaysShowShortsProgressBar")} ytm-shorts-player .player-controls-bottom,
${H("alwaysShowShortsProgressBar")} ytm-shorts-player .ytm-progress-bar { opacity: 1 !important; visibility: visible !important; display: block !important; }
html[data-sb-minimumshortsperrow="4"] ytd-rich-shelf-renderer[is-shorts] { --ytd-rich-grid-slim-items-per-row: 4 !important; --ytd-rich-grid-items-per-row: 4 !important; }
html[data-sb-minimumshortsperrow="5"] ytd-rich-shelf-renderer[is-shorts] { --ytd-rich-grid-slim-items-per-row: 5 !important; --ytd-rich-grid-items-per-row: 5 !important; }
html[data-sb-minimumshortsperrow="6"] ytd-rich-shelf-renderer[is-shorts] { --ytd-rich-grid-slim-items-per-row: 6 !important; --ytd-rich-grid-items-per-row: 6 !important; }
html[data-sb-minimumshortsperrow="8"] ytd-rich-shelf-renderer[is-shorts] { --ytd-rich-grid-slim-items-per-row: 8 !important; --ytd-rich-grid-items-per-row: 8 !important; }

/* ===== Home ===== */
${H("disableHomeFeed")} ytd-browse[page-subtype="home"] ytd-rich-grid-renderer,
${H("disableHomeFeed")} ytd-browse[page-subtype="home"] #primary > ytd-section-list-renderer,
${H("disableHomeFeed")} ytm-browse[data-sb-home] ytm-rich-grid-renderer,
${H("disableHomeFeed")} ytm-browse[data-sb-home] ytm-section-list-renderer { display: none !important; }
${H("hideHomeCategories")} ytd-browse[page-subtype="home"] ytd-feed-filter-chip-bar-renderer,
${H("hideHomeCategories")} ytd-browse[page-subtype="home"] #header ytd-rich-grid-renderer > #header,
${H("hideHomeCategories")} ytm-browse[data-sb-home] ytm-feed-filter-chip-bar-renderer,
${H("hideHomeCategories")} ytm-browse[data-sb-home] ytm-chip-cloud-renderer,
${H("hideHomeCategories")} ytm-browse[data-sb-home] .rich-grid-sticky-header { display: none !important; }
${H("hideHomePosts")} ytd-rich-section-renderer:has(ytd-post-renderer),
${H("hideHomePosts")} ytd-rich-item-renderer:has(ytd-post-renderer),
${H("hideHomePosts")} ytd-rich-item-renderer:has(post-shelf-view-model),
${H("hideHomePosts")} ytm-rich-section-renderer:has(ytm-post-renderer),
${H("hideHomePosts")} ytm-rich-item-renderer:has(ytm-post-renderer),
${H("hideHomePosts")} ytm-rich-item-renderer:has(post-shelf-view-model) { display: none !important; }
${H("hideSuggestedSections")} ytd-browse[page-subtype="home"] ytd-rich-section-renderer:not(:has(ytd-post-renderer)),
${H("hideSuggestedSections")} ytm-browse[data-sb-home] ytm-rich-section-renderer:not(:has(ytm-post-renderer)) { display: none !important; }
${H("hideExploreButton")} ytm-browse[data-sb-home] ytm-chip-cloud-chip-renderer:has(a[href="/feed/explore"]),
${H("hideExploreButton")} ytm-feed-filter-chip-bar-renderer .explore-button,
${H("hideExploreButton")} ytm-browse[data-sb-home] a[href="/feed/explore"] { display: none !important; }
${H("displayHomeGridAsList")} ytd-browse[page-subtype="home"] ytd-rich-grid-renderer { --ytd-rich-grid-items-per-row: 1 !important; --ytd-rich-grid-posts-per-row: 1 !important; }
${H("displayHomeGridAsList")} ytd-browse[page-subtype="home"] ytd-rich-item-renderer { max-width: 100% !important; }
${H("displayHomeGridAsList")} ytd-browse[page-subtype="home"] ytd-rich-grid-media #dismissible { display: flex !important; gap: 16px; }
${H("displayHomeGridAsList")} ytd-browse[page-subtype="home"] ytd-rich-grid-media #dismissible > ytd-thumbnail,
${H("displayHomeGridAsList")} ytd-browse[page-subtype="home"] ytd-rich-grid-media #dismissible > yt-thumbnail-view-model { flex: 0 0 360px !important; max-width: 360px; }
${H("displayHomeGridAsList")} ytd-browse[page-subtype="home"] ytd-rich-grid-media #details { margin-top: 0 !important; }

/* ===== Subscriptions ===== */
${H("displaySubscriptionsGridAsList")} ytd-browse[page-subtype="subscriptions"] ytd-rich-grid-renderer { --ytd-rich-grid-items-per-row: 1 !important; --ytd-rich-grid-posts-per-row: 1 !important; }
${H("displaySubscriptionsGridAsList")} ytd-browse[page-subtype="subscriptions"] ytd-rich-item-renderer { max-width: 100% !important; }
${H("displaySubscriptionsGridAsList")} ytd-browse[page-subtype="subscriptions"] ytd-rich-grid-media #dismissible { display: flex !important; gap: 16px; }
${H("displaySubscriptionsGridAsList")} ytd-browse[page-subtype="subscriptions"] ytd-rich-grid-media #dismissible > ytd-thumbnail,
${H("displaySubscriptionsGridAsList")} ytd-browse[page-subtype="subscriptions"] ytd-rich-grid-media #dismissible > yt-thumbnail-view-model { flex: 0 0 360px !important; max-width: 360px; }
${H("displaySubscriptionsGridAsList")} ytd-browse[page-subtype="subscriptions"] ytd-rich-grid-media #details { margin-top: 0 !important; }
${H("showChannelHeadersInListView")} ytd-browse[page-subtype="subscriptions"] ytd-rich-grid-media #avatar-link,
${H("showChannelHeadersInListView")} ytd-browse[page-subtype="subscriptions"] ytd-rich-grid-media #channel-name { display: block !important; visibility: visible !important; }
${H("hideSubscriptionsChannelList")} ytm-browse ytm-channel-list-sub-menu-renderer,
${H("hideSubscriptionsChannelList")} ytm-browse ytm-channel-list-sub-menu-avatar-renderer,
${H("hideSubscriptionsChannelList")} ytm-browse .channel-list-sub-menu { display: none !important; }
${H("hideSubscriptionsLatestBar")} ytd-browse[page-subtype="subscriptions"] ytd-rich-grid-renderer > #header,
${H("hideSubscriptionsLatestBar")} ytd-browse[page-subtype="subscriptions"] #title-container,
${H("hideSubscriptionsLatestBar")} ytd-browse[page-subtype="subscriptions"] ytd-feed-filter-chip-bar-renderer { display: none !important; }

/* ===== Video lists ===== */
${H("showFullVideoTitles")} #video-title, ${H("showFullVideoTitles")} yt-formatted-string#video-title,
${H("showFullVideoTitles")} .yt-lockup-metadata-view-model-wiz__title, ${H("showFullVideoTitles")} .yt-lockup-metadata-view-model__title,
${H("showFullVideoTitles")} .media-item-headline, ${H("showFullVideoTitles")} .compact-media-item-headline,
${H("showFullVideoTitles")} h3.ytd-rich-grid-media, ${H("showFullVideoTitles")} .yt-core-attributed-string--white-space-pre-wrap {
  -webkit-line-clamp: unset !important; max-height: none !important; overflow: visible !important; white-space: normal !important; display: block !important;
}
html[data-sb-griditemsperrow="3"] ytd-rich-grid-renderer { --ytd-rich-grid-items-per-row: 3 !important; }
html[data-sb-griditemsperrow="4"] ytd-rich-grid-renderer { --ytd-rich-grid-items-per-row: 4 !important; }
html[data-sb-griditemsperrow="5"] ytd-rich-grid-renderer { --ytd-rich-grid-items-per-row: 5 !important; }
html[data-sb-griditemsperrow="6"] ytd-rich-grid-renderer { --ytd-rich-grid-items-per-row: 6 !important; }
html[data-sb-searchthumbnailsize="small"] ytd-search ytd-video-renderer ytd-thumbnail,
html[data-sb-searchthumbnailsize="small"] ytd-search ytd-video-renderer yt-thumbnail-view-model { max-width: 240px !important; min-width: 240px !important; }
html[data-sb-searchthumbnailsize="xsmall"] ytd-search ytd-video-renderer ytd-thumbnail,
html[data-sb-searchthumbnailsize="xsmall"] ytd-search ytd-video-renderer yt-thumbnail-view-model { max-width: 168px !important; min-width: 168px !important; }
${H("disableVideoPreviews")} ytd-video-preview, ${H("disableVideoPreviews")} #video-preview, ${H("disableVideoPreviews")} ytd-moving-thumbnail-renderer,
${H("disableVideoPreviews")} #mouseover-overlay, ${H("disableVideoPreviews")} .ytd-moving-thumbnail-renderer,
${H("disableVideoPreviews")} yt-thumbnail-view-model .ytThumbnailViewModelPreview, ${H("disableVideoPreviews")} ytm-video-preview { display: none !important; }
${H("disableThemedHover")} ytd-rich-item-renderer, ${H("disableThemedHover")} ytd-rich-grid-media { --ytd-rich-grid-item-themed-hover-color: transparent !important; }
${H("disableThemedHover")} ytd-rich-grid-media:hover #dismissible, ${H("disableThemedHover")} ytd-rich-item-renderer:hover { background: transparent !important; box-shadow: none !important; }
${H("fixGhostCards")} ytd-rich-grid-renderer:has(ytd-rich-item-renderer) ytd-ghost-grid-renderer { display: none !important; }

/* ===== Video pages ===== */
${H("hideRelated")}:not([data-sb-hiderelatedbelow]) ytd-watch-flexy #secondary #related,
${H("hideRelated")}:not([data-sb-hiderelatedbelow]) ytd-watch-next-secondary-results-renderer,
${H("hideRelated")}:not([data-sb-hiderelatedbelow]) ytd-watch-grid #secondary,
${H("hideRelated")}:not([data-sb-hiderelatedbelow]) ytm-item-section-renderer[section-identifier="related-items"],
${H("hideRelated")}:not([data-sb-hiderelatedbelow]) ytm-single-column-watch-next-results-renderer ytm-video-with-context-renderer.adaptive-feed-item,
${H("hideRelated")}:not([data-sb-hiderelatedbelow]) ytm-related-chip-cloud-renderer,
${H("hideRelated")}:not([data-sb-hiderelatedbelow]) ytm-single-column-watch-next-results-renderer lazy-list > ytm-item-section-renderer:not([section-identifier="comments-entry-point"]):not([section-identifier="comments"]) { display: none !important; }
${H("hideRelated")}[data-sb-hiderelatedbelow] ytd-watch-flexy[theater] #below ytd-watch-next-secondary-results-renderer,
${H("hideRelated")}[data-sb-hiderelatedbelow] ytd-watch-flexy[is-two-columns_="false"] #related,
${H("hideRelated")}[data-sb-hiderelatedbelow] ytd-watch-flexy:not([is-two-columns_]) #related { display: none !important; }
${H("hideRelated")}:not([data-sb-hiderelatedbelow]) ytd-watch-flexy #secondary { width: 0 !important; min-width: 0 !important; padding: 0 !important; }
${H("hideComments")} ytd-comments#comments, ${H("hideComments")} #comments, ${H("hideComments")} ytd-item-section-renderer#sections,
${H("hideComments")} ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-comments-section"],
${H("hideComments")} ytm-comment-section-renderer, ${H("hideComments")} ytm-comments-entry-point-header-renderer,
${H("hideComments")} ytm-item-section-renderer[section-identifier="comments-entry-point"],
${H("hideComments")} ytm-item-section-renderer[section-identifier="comments"],
${H("hideComments")} ytm-comment-input-box-carousel-item-view-model, ${H("hideComments")} yt-comment-input-box-carousel-item-view-model { display: none !important; }
${H("hideChat")}:not([data-sb-hidechatfullscreen]) #chat, ${H("hideChat")}:not([data-sb-hidechatfullscreen]) ytd-live-chat-frame,
${H("hideChat")}:not([data-sb-hidechatfullscreen]) #chat-container, ${H("hideChat")}:not([data-sb-hidechatfullscreen]) ytm-live-chat-frame,
${H("hideChat")}:not([data-sb-hidechatfullscreen]) ytd-watch-flexy #chat-template { display: none !important; }
${H("hideChat")}[data-sb-hidechatfullscreen] ytd-watch-flexy[fullscreen] #chat,
${H("hideChat")}[data-sb-hidechatfullscreen] ytd-watch-flexy[fullscreen] ytd-live-chat-frame { display: none !important; }
${H("hideMetadata")} ytd-watch-metadata #bottom-row, ${H("hideMetadata")} ytd-watch-metadata #description,
${H("hideMetadata")} ytd-watch-metadata ytd-metadata-row-container-renderer,
${H("hideMetadata")} ytm-slim-video-metadata-section-renderer .slim-video-metadata-description,
${H("hideMetadata")} ytm-expandable-video-description-body-renderer, ${H("hideMetadata")} ytm-video-description-header-renderer { display: none !important; }
${H("hideMerchEtc")} ytd-merch-shelf-renderer, ${H("hideMerchEtc")} #offer-module, ${H("hideMerchEtc")} ytd-watch-flexy #ticket-shelf,
${H("hideMerchEtc")} ytd-video-attribute-view-model, ${H("hideMerchEtc")} #clarify-box ytd-shopping-shelf-renderer,
${H("hideMerchEtc")} ytd-watch-flexy ytd-shopping-shelf-renderer, ${H("hideMerchEtc")} ytd-product-details-renderer,
${H("hideMerchEtc")} ytm-merch-shelf-renderer, ${H("hideMerchEtc")} ytm-shopping-shelf-renderer, ${H("hideMerchEtc")} ytm-product-details-renderer,
${H("hideMerchEtc")} ytd-badge-supported-renderer:has(a[href*="/store"]) { display: none !important; }
${H("hideShareThanksClip")} ytd-watch-metadata yt-button-view-model:has(button[aria-label*="Share"]), ${H("hideShareThanksClip")} ytd-watch-metadata yt-button-view-model:has(button[aria-label*="共有"]),
${H("hideShareThanksClip")} ytd-watch-metadata yt-button-view-model:has(button[aria-label*="Thanks"]), ${H("hideShareThanksClip")} ytd-watch-metadata yt-button-view-model:has(button[aria-label*="Thanks"]),
${H("hideShareThanksClip")} ytd-watch-metadata yt-button-view-model:has(button[aria-label*="Clip"]), ${H("hideShareThanksClip")} ytd-watch-metadata yt-button-view-model:has(button[aria-label*="クリップ"]),
${H("hideShareThanksClip")} ytd-watch-metadata yt-button-view-model:has(button[aria-label*="Download"]), ${H("hideShareThanksClip")} ytd-watch-metadata yt-button-view-model:has(button[aria-label*="オフライン"]),
${H("hideShareThanksClip")} ytd-watch-metadata ytd-button-renderer:has(button[aria-label*="Share"]), ${H("hideShareThanksClip")} ytd-watch-metadata ytd-button-renderer:has(button[aria-label*="共有"]),
${H("hideShareThanksClip")} ytd-watch-metadata ytd-download-button-renderer,
${H("hideShareThanksClip")} ytm-slim-video-action-bar-renderer button-view-model:has(button[aria-label*="Share"]), ${H("hideShareThanksClip")} ytm-slim-video-action-bar-renderer button-view-model:has(button[aria-label*="共有"]),
${H("hideShareThanksClip")} ytm-slim-video-action-bar-renderer button-view-model:has(button[aria-label*="Thanks"]),
${H("hideShareThanksClip")} ytm-slim-video-action-bar-renderer button-view-model:has(button[aria-label*="Clip"]), ${H("hideShareThanksClip")} ytm-slim-video-action-bar-renderer button-view-model:has(button[aria-label*="クリップ"]),
${H("hideShareThanksClip")} ytm-slim-video-action-bar-renderer button-view-model:has(button[aria-label*="Download"]), ${H("hideShareThanksClip")} ytm-slim-video-action-bar-renderer button-view-model:has(button[aria-label*="オフライン"]) { display: none !important; }
${H("hideAskButton")} ytd-watch-metadata yt-button-view-model:has(button[aria-label="Ask"]), ${H("hideAskButton")} ytd-watch-metadata yt-button-view-model:has(button[aria-label="質問する"]),
${H("hideAskButton")} ytd-watch-metadata yt-button-view-model:has(button[aria-label*="Ask about"]), ${H("hideAskButton")} ytd-watch-metadata yt-button-view-model:has(button[aria-label*="質問"]),
${H("hideAskButton")} ytm-slim-video-action-bar-renderer button-view-model:has(button[aria-label*="Ask"]), ${H("hideAskButton")} ytm-slim-video-action-bar-renderer button-view-model:has(button[aria-label*="質問"]) { display: none !important; }
${H("hideAI")} ytd-watch-metadata yt-video-description-ai-summary-view-model, ${H("hideAI")} ytd-watch-metadata [class*="ai-summary"], ${H("hideAI")} ytd-watch-metadata [class*="AiSummary"],
${H("hideAI")} ytd-expandable-metadata-renderer:has([class*="summary"]), ${H("hideAI")} ytm-expandable-video-description-body-renderer [class*="ai-summary"],
${H("hideAI")} ytd-watch-metadata [aria-label*="AI"]:not(button), ${H("hideAI")} ytd-engagement-panel-section-list-renderer[target-id*="ai"] { display: none !important; }
${H("hideInfoPanels")} ytd-info-panel-content-renderer, ${H("hideInfoPanels")} #clarify-box, ${H("hideInfoPanels")} ytd-info-panel-container-renderer,
${H("hideInfoPanels")} ytm-info-panel-content-renderer, ${H("hideInfoPanels")} ytm-info-panel-container-renderer { display: none !important; }
${H("hideEndCards")} .ytp-ce-element, ${H("hideEndCards")} .ytp-ce-covering-overlay { display: none !important; }
${H("hideEndVideos")} .html5-endscreen.ytp-player-content, ${H("hideEndVideos")} .ytp-endscreen-content, ${H("hideEndVideos")} .ytp-endscreen-previous, ${H("hideEndVideos")} .ytp-endscreen-next { display: none !important; }
${H("hideChannelWatermark")} .iv-branding, ${H("hideChannelWatermark")} .ytp-watermark, ${H("hideChannelWatermark")} .branding-img-container, ${H("hideChannelWatermark")} .annotation-type-custom.iv-branding { display: none !important; }
${H("hideNextButton")}:not([data-sb-inplaylist]) .ytp-next-button { display: none !important; }
${H("hideJumpAheadButton")} .ytp-jump-ahead-button, ${H("hideJumpAheadButton")} button[aria-label*="Jump ahead"], ${H("hideJumpAheadButton")} button[aria-label*="ジャンプ"], ${H("hideJumpAheadButton")} .ytp-skip-ahead-button { display: none !important; }
${H("hideExperiencingInterruptions")} ytd-playback-issue-survey-renderer, ${H("hideExperiencingInterruptions")} [data-sb-interruptions] { display: none !important; }
${H("hideWatchSideMenu")} ytm-watch ytm-slim-video-action-bar-renderer ytm-menu-renderer, ${H("hideWatchSideMenu")} ytm-watch .slim-video-action-bar-actions ytm-menu-renderer { display: none !important; }
${H("disableAutoplay")} .ytp-autonav-toggle-button-container { opacity: .5; }

/* ===== Player ===== */
${H("disableAmbientMode")} #cinematics, ${H("disableAmbientMode")} #cinematics-container, ${H("disableAmbientMode")} ytd-watch-flexy #cinematics canvas, ${H("disableAmbientMode")} .ytp-cinematics { display: none !important; }
${H("fullSizeTheaterMode")} ytd-watch-flexy[theater] #player-full-bleed-container, ${H("fullSizeTheaterMode")} ytd-watch-flexy[theater] #full-bleed-container { max-height: calc(100vh - 56px) !important; height: calc(100vh - 56px) !important; }
${H("fullSizeTheaterMode")}[data-sb-fullsizetheatermodehideheader] ytd-watch-flexy[theater] ~ #masthead-container, ${H("fullSizeTheaterMode")}[data-sb-fullsizetheatermodehideheader][data-sb-theater] #masthead-container { display: none !important; }
${H("fullSizeTheaterMode")}[data-sb-fullsizetheatermodehideheader][data-sb-theater] ytd-app #page-manager { margin-top: 0 !important; }
${H("fullSizeTheaterMode")}[data-sb-fullsizetheatermodehideheader][data-sb-theater] ytd-watch-flexy[theater] #player-full-bleed-container { max-height: 100vh !important; height: 100vh !important; }
${H("revertGiantRelated")} ytd-watch-flexy { --ytd-watch-flexy-sidebar-width: 402px !important; --ytd-watch-flexy-sidebar-min-width: 300px !important; }
${H("revertGiantRelated")} ytd-watch-flexy #secondary yt-lockup-view-model { --yt-lockup-thumbnail-width: 168px !important; }
${H("revertGiantRelated")} ytd-watch-flexy #secondary yt-lockup-view-model .yt-lockup-view-model-wiz__content-image, ${H("revertGiantRelated")} ytd-watch-flexy #secondary ytd-compact-video-renderer ytd-thumbnail { max-width: 168px !important; min-width: 168px !important; }
${H("restoreMiniplayerButton")} .ytp-miniplayer-button { display: inline-block !important; }
html[data-sb-playercontrolsbg="transparent"] .ytp-chrome-bottom { background: transparent !important; }
html[data-sb-playercontrolsbg="transparent"] .ytp-gradient-bottom { display: none !important; }
html[data-sb-playercontrolsbg="blur"] .ytp-chrome-bottom { backdrop-filter: blur(10px) !important; -webkit-backdrop-filter: blur(10px) !important; background: rgba(0,0,0,.25) !important; }
html[data-sb-playercontrolsbg="blur"] .ytp-gradient-bottom { display: none !important; }
${H("removePink")} .ytp-play-progress, ${H("removePink")} .ytp-swatch-background-color, ${H("removePink")} .ytp-scrubber-button, ${H("removePink")} .ytp-volume-slider-handle::before,
${H("removePink")} .ytm-progress-bar .progress-bar-played, ${H("removePink")} .ytm-progress-bar .progress-bar-playhead, ${H("removePink")} ytm-thumbnail-overlay-resume-playback-renderer .thumbnail-overlay-resume-playback-progress,
${H("removePink")} #progress.ytd-thumbnail-overlay-resume-playback-renderer, ${H("removePink")} .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment { background: #f03 !important; background-image: none !important; }
${H("playerHideFullScreenControls")} .ytp-fullscreen .ytp-fullscreen-quick-actions, ${H("playerHideFullScreenControls")} .ytp-fullscreen .ytp-chrome-top-buttons, ${H("playerHideFullScreenControls")} .ytp-fullscreen .ytp-fullerscreen-edu-chevron,
${H("playerHideFullScreenControls")} .ytp-fullscreen .ytp-delhi-fullscreen-controls, ${H("playerHideFullScreenControls")} ytd-watch-flexy[fullscreen] #full-screen-actions { display: none !important; }
${H("playerHideFullScreenMoreActions")} .ytp-fullscreen .ytp-overflow-button, ${H("playerHideFullScreenMoreActions")} .ytp-fullscreen .ytp-fullscreen-more-actions, ${H("playerHideFullScreenMoreActions")} ytd-watch-flexy[fullscreen] .ytp-chrome-top .ytp-button[aria-label*="More"], ${H("playerHideFullScreenMoreActions")} ytd-watch-flexy[fullscreen] .ytp-chrome-top .ytp-button[aria-label*="その他"] { display: none !important; }
${H("playerHideFullScreenMoreVideos")} .ytp-fullscreen .ytp-suggestion-set, ${H("playerHideFullScreenMoreVideos")} .ytp-fullscreen .ytp-fullscreen-more-videos, ${H("playerHideFullScreenMoreVideos")} ytd-watch-flexy[fullscreen] #fullscreen-more-videos, ${H("playerHideFullScreenMoreVideos")} .ytp-fullscreen .ytp-fullscreen-recommendations { display: none !important; }
${H("playerHideFullScreenTitle")} .ytp-fullscreen .ytp-title, ${H("playerHideFullScreenTitle")} .ytp-fullscreen .ytp-title-text, ${H("playerHideFullScreenTitle")} .ytp-fullscreen .ytp-fullscreen-title { display: none !important; }
${H("playerHideFullScreenVoting")} .ytp-fullscreen .ytp-like-button, ${H("playerHideFullScreenVoting")} .ytp-fullscreen .ytp-dislike-button, ${H("playerHideFullScreenVoting")} .ytp-fullscreen .ytp-fullscreen-voting, ${H("playerHideFullScreenVoting")} .ytp-fullscreen .ytp-fullscreen-like-buttons { display: none !important; }

/* ===== Sidebar (desktop) ===== */
${H("tidyGuideSidebar")} ytd-guide-section-renderer:has(a[href="/feed/trending"]), ${H("tidyGuideSidebar")} ytd-guide-section-renderer:has(a[href^="/feed/explore"]),
${H("tidyGuideSidebar")} ytd-guide-section-renderer:has(a[href*="youtube.com/premium"]), ${H("tidyGuideSidebar")} ytd-guide-section-renderer:has(a[href*="studio.youtube.com"]),
${H("tidyGuideSidebar")} ytd-guide-section-renderer:has(a[href*="music.youtube.com"]), ${H("tidyGuideSidebar")} ytd-guide-section-renderer:has(a[href*="youtubekids.com"]),
${H("tidyGuideSidebar")} ytd-guide-section-renderer:has(a[href*="/gaming"]), ${H("tidyGuideSidebar")} ytd-guide-section-renderer:has(a[href="/feed/courses"]),
${H("tidyGuideSidebar")} #footer.ytd-guide-renderer, ${H("tidyGuideSidebar")} ytd-guide-renderer #footer { display: none !important; }
${H("hideSidebarSubscriptions")} ytd-guide-section-renderer:has(ytd-guide-collapsible-entry-renderer), ${H("hideSidebarSubscriptions")} ytd-guide-section-renderer:has(#expandable-items) { display: none !important; }
${H("hideSidebarWhenEmpty")}[data-sb-tidyguidesidebar][data-sb-hidesidebarsubscriptions] tp-yt-app-drawer#guide, ${H("hideSidebarWhenEmpty")}[data-sb-tidyguidesidebar][data-sb-hidesidebarsubscriptions] ytd-mini-guide-renderer,
${H("hideSidebarWhenEmpty")}[data-sb-tidyguidesidebar][data-sb-hidesidebarsubscriptions] #guide-button { display: none !important; }
${H("hideSidebarWhenEmpty")}[data-sb-tidyguidesidebar][data-sb-hidesidebarsubscriptions] ytd-page-manager { margin-left: 0 !important; }
${H("revertSidebarOrder")} ytd-guide-renderer #sections { display: flex !important; flex-direction: column !important; }
${H("revertSidebarOrder")} ytd-guide-renderer #sections > ytd-guide-section-renderer { order: 3; }
${H("revertSidebarOrder")} ytd-guide-renderer #sections > ytd-guide-section-renderer:first-child { order: 1; }
${H("revertSidebarOrder")} ytd-guide-renderer #sections > ytd-guide-section-renderer:has(ytd-guide-collapsible-entry-renderer) { order: 2; }

/* ===== UI tweaks ===== */
${H("useSquareCorners")} ytd-thumbnail, ${H("useSquareCorners")} #thumbnail, ${H("useSquareCorners")} ytd-thumbnail img, ${H("useSquareCorners")} yt-thumbnail-view-model, ${H("useSquareCorners")} .yt-thumbnail-view-model__image,
${H("useSquareCorners")} .ytThumbnailViewModelImage, ${H("useSquareCorners")} .html5-video-player, ${H("useSquareCorners")} #movie_player, ${H("useSquareCorners")} video, ${H("useSquareCorners")} #player-container, ${H("useSquareCorners")} #player-container-inner,
${H("useSquareCorners")} .yt-core-image, ${H("useSquareCorners")} ytm-thumbnail-cover, ${H("useSquareCorners")} .media-item-thumbnail-container, ${H("useSquareCorners")} .video-thumbnail-img, ${H("useSquareCorners")} ytm-media-item .media-item-thumbnail-container img,
${H("useSquareCorners")} .ytp-chrome-bottom, ${H("useSquareCorners")} ytd-playlist-thumbnail, ${H("useSquareCorners")} yt-collection-thumbnail-view-model { border-radius: 0 !important; --yt-img-border-radius: 0 !important; --ytd-thumbnail-border-radius: 0 !important; }
${H("useSquareCorners")} * { --yt-img-border-radius: 0 !important; --ytd-thumbnail-border-radius: 0 !important; --yt-lockup-thumbnail-border-radius: 0 !important; }
${H("fullWidthChannelPage")} ytd-browse[page-subtype="channels"] #contentContainer, ${H("fullWidthChannelPage")} ytd-browse[page-subtype="channels"] ytd-two-column-browse-results-renderer,
${H("fullWidthChannelPage")} ytd-browse[page-subtype="channels"] #page-header, ${H("fullWidthChannelPage")} ytd-browse[page-subtype="channels"] ytd-tabbed-page-header, ${H("fullWidthChannelPage")} ytd-browse[page-subtype="channels"] #page-header-container,
${H("fullWidthChannelPage")} ytd-browse[page-subtype="channels"] ytd-rich-grid-renderer, ${H("fullWidthChannelPage")} ytd-browse[page-subtype="channels"] #primary { max-width: 100% !important; width: 100% !important; }
${H("hideChannelBanner")} #page-header-banner, ${H("hideChannelBanner")} yt-image-banner-view-model, ${H("hideChannelBanner")} .yt-image-banner-view-model-wiz, ${H("hideChannelBanner")} ytd-c4-tabbed-header-renderer #banner,
${H("hideChannelBanner")} ytm-c4-tabbed-header-renderer .banner, ${H("hideChannelBanner")} ytm-page-header-renderer .banner, ${H("hideChannelBanner")} ytm-c4-tabbed-header-renderer ytm-image-banner-view-model, ${H("hideChannelBanner")} .page-header-banner { display: none !important; }
${H("hideVoiceSearch")} #voice-search-button, ${H("hideVoiceSearch")} ytd-masthead #voice-search-button, ${H("hideVoiceSearch")} .voice-search-button, ${H("hideVoiceSearch")} button[aria-label="Search with your voice"], ${H("hideVoiceSearch")} button[aria-label="音声で検索"], ${H("hideVoiceSearch")} ytm-mobile-topbar-renderer button[aria-label*="音声"], ${H("hideVoiceSearch")} .searchbox-voice-search-wrapper { display: none !important; }
${H("hidePremiumUpsells")} ytd-mealbar-promo-renderer, ${H("hidePremiumUpsells")} ytm-mealbar-promo-renderer, ${H("hidePremiumUpsells")} yt-mealbar-promo-renderer, ${H("hidePremiumUpsells")} ytd-statement-banner-renderer,
${H("hidePremiumUpsells")} ytd-guide-entry-renderer:has(a[href*="/premium"]), ${H("hidePremiumUpsells")} ytd-mini-guide-entry-renderer:has(a[href*="/premium"]), ${H("hidePremiumUpsells")} ytd-topbar-menu-button-renderer:has(a[href*="/premium"]),
${H("hidePremiumUpsells")} ytm-promoted-sparkles-web-renderer:has(a[href*="premium"]), ${H("hidePremiumUpsells")} ytd-banner-promo-renderer, ${H("hidePremiumUpsells")} ytm-banner-promo-renderer, ${H("hidePremiumUpsells")} #masthead-ad:has(a[href*="premium"]),
${H("hidePremiumUpsells")} ytd-popup-container tp-yt-paper-dialog:has(a[href*="/premium"]), ${H("hidePremiumUpsells")} yt-mealbar-promo-renderer, ${H("hidePremiumUpsells")} ytd-rich-item-renderer:has(a[href*="youtube.com/premium"]),
${H("hidePremiumUpsells")} .ytp-premium-upsell, ${H("hidePremiumUpsells")} ytm-upsell-dialog-renderer:has(a[href*="premium"]), ${H("hidePremiumUpsells")} ytd-compact-promoted-item-renderer { display: none !important; }

/* ===== Ads ===== */
${H("blockAds")} #player-ads, ${H("blockAds")} #masthead-ad, ${H("blockAds")} ytd-ad-slot-renderer, ${H("blockAds")} ytd-promoted-sparkles-web-renderer, ${H("blockAds")} ytd-display-ad-renderer, ${H("blockAds")} ytd-in-feed-ad-layout-renderer,
${H("blockAds")} ytd-banner-promo-renderer, ${H("blockAds")} ytd-video-masthead-ad-v3-renderer, ${H("blockAds")} ytd-primetime-promo-renderer, ${H("blockAds")} ytd-action-companion-ad-renderer, ${H("blockAds")} ytd-companion-slot-renderer,
${H("blockAds")} ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"], ${H("blockAds")} ytd-rich-item-renderer:has(ytd-ad-slot-renderer), ${H("blockAds")} ytd-rich-item-renderer:has(ytd-in-feed-ad-layout-renderer),
${H("blockAds")} ytm-promoted-video-renderer, ${H("blockAds")} ytm-companion-slot-renderer, ${H("blockAds")} ytm-promoted-sparkles-web-renderer, ${H("blockAds")} ytm-ad-slot-renderer, ${H("blockAds")} ytm-rich-item-renderer:has(ytm-ad-slot-renderer),
${H("blockAds")} .ytp-ad-overlay-container, ${H("blockAds")} .ytp-ad-image-overlay, ${H("blockAds")} .ytp-ad-text-overlay, ${H("blockAds")} ytd-enforcement-message-view-model, ${H("blockAds")} ytm-promoted-sparkles-text-search-renderer,
${H("blockAds")} ytd-search ytd-promoted-video-renderer, ${H("blockAds")} ytd-search ytd-promoted-sparkles-text-search-renderer, ${H("blockAds")} #related ytd-promoted-video-renderer, ${H("blockAds")} ytd-brand-video-shelf-renderer, ${H("blockAds")} ytd-brand-video-singleton-renderer,
${H("blockAds")} .ad-showing .video-ads.ytp-ad-module, ${H("blockAds")} .ytp-ad-player-overlay-layout, ${H("blockAds")} .ytp-ad-action-interstitial { display: none !important; }
${H("blockAds")} .ad-showing video.html5-main-video { opacity: 0 !important; }

/* ===== Mobile ===== */
${H("hideOpenApp")} ytm-app-upsell, ${H("hideOpenApp")} ytm-app-upsell-shelf-renderer, ${H("hideOpenApp")} .app-upsell-shelf, ${H("hideOpenApp")} ytm-upsell-dialog-renderer, ${H("hideOpenApp")} ytm-mealbar-promo-renderer:has(a[href^="youtube://"]),
${H("hideOpenApp")} a[href^="youtube://"], ${H("hideOpenApp")} ytm-mobile-topbar-renderer button[aria-label*="Open App"], ${H("hideOpenApp")} ytm-mobile-topbar-renderer button[aria-label*="アプリを開く"], ${H("hideOpenApp")} ytm-mobile-topbar-renderer .open-app-button,
${H("hideOpenApp")} ytm-button-renderer.open-app, ${H("hideOpenApp")} .mobile-topbar-header-content ytm-button-renderer:has(a[href*="app"]), ${H("hideOpenApp")} ytm-slim-video-action-bar-renderer button-view-model:has(button[aria-label*="アプリ"]),
${H("hideOpenApp")} ytm-slim-video-action-bar-renderer button-view-model:has(button[aria-label*="Open App"]), ${H("hideOpenApp")} ytm-mobile-topbar-renderer button-view-model:has(button[aria-label*="アプリを開く"]), ${H("hideOpenApp")} ytm-mobile-topbar-renderer button-view-model:has(button[aria-label*="Open App"]), ${H("hideOpenApp")} [data-sb-openapp] { display: none !important; }
@media (orientation: portrait) {
  ${H("mobileGridView")} ytm-browse[data-sb-subs] ytm-item-section-renderer > lazy-list, ${H("mobileGridView")} ytm-search ytm-item-section-renderer > lazy-list,
  ${H("mobileGridView")} ytm-browse[data-sb-subs] ytm-section-list-renderer > lazy-list > ytm-item-section-renderer > lazy-list { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 8px 8px !important; }
  ${H("mobileGridView")} ytm-browse[data-sb-subs] ytm-video-with-context-renderer, ${H("mobileGridView")} ytm-search ytm-video-with-context-renderer { width: auto !important; margin: 0 !important; }
  ${H("mobileGridView")} ytm-browse[data-sb-subs] ytm-video-with-context-renderer .media-item-info, ${H("mobileGridView")} ytm-search ytm-video-with-context-renderer .media-item-info { padding: 0 4px !important; }
  ${H("mobileGridView")} ytm-browse[data-sb-subs] ytm-video-with-context-renderer .media-item-headline, ${H("mobileGridView")} ytm-search ytm-video-with-context-renderer .media-item-headline { font-size: 13px !important; }
}

/* ===== Embedded ===== */
${H("hideEmbedPauseOverlay")} .ytp-pause-overlay, ${H("hideEmbedPauseOverlay")} .ytp-pause-overlay-container { display: none !important; }
${H("hideEmbedShareButton")} .ytp-share-button, ${H("hideEmbedShareButton")} .ytp-share-button-visible, ${H("hideEmbedShareButton")} .ytp-chrome-top .ytp-button[aria-label*="Share"], ${H("hideEmbedShareButton")} .ytp-chrome-top .ytp-button[aria-label*="共有"] { display: none !important; }

/* ===== Tools ===== */
.sb-player-btn { width: 48px; height: 100%; display: inline-flex; align-items: center; justify-content: center; color: #fff; opacity: .9; cursor: pointer; background: none; border: 0; padding: 0; vertical-align: top; }
.sb-player-btn svg { width: 22px; height: 22px; fill: currentColor; }
.sb-transcript-btn { margin-left: auto; font: 500 13px/1 Roboto, Arial, sans-serif; color: var(--yt-spec-text-primary, #0f0f0f); background: var(--yt-spec-badge-chip-background, rgba(0,0,0,.05)); border: 0; border-radius: 18px; padding: 8px 14px; cursor: pointer; }
.sb-mobile-snapshot { position: fixed; right: 12px; bottom: 90px; z-index: 9999; width: 44px; height: 44px; border-radius: 22px; background: rgba(0,0,0,.55); color: #fff; border: 0; display: flex; align-items: center; justify-content: center; }
.sb-mobile-snapshot svg { width: 22px; height: 22px; fill: currentColor; }
`;

  // ------------------------------------------------------------------ settings → attributes
  let settings = { ...SB_DEFAULTS };
  const featureMap = Object.fromEntries(SB_FEATURES.map((f) => [f.key, f]));
  function applyAttributes() {
    for (const f of SB_FEATURES) {
      const v = settings[f.key];
      const name = A(f.key);
      if (f.type === "select") html.setAttribute(name, String(v));
      else if (f.type === "text") continue;
      else if (v) html.setAttribute(name, "");
      else html.removeAttribute(name);
    }
    applyTheme();
  }
  function applyTheme() {
    const t = settings.enforceTheme;
    if (t === "dark") { html.setAttribute("dark", ""); document.body?.classList.add("dark"); }
    else if (t === "light") { html.removeAttribute("dark"); document.body?.classList.remove("dark"); }
  }
  function injectStyle() {
    if (document.getElementById("sb-style")) return;
    const style = document.createElement("style");
    style.id = "sb-style";
    style.textContent = CSS;
    (document.head || html).appendChild(style);
  }
  function injectPageScript() {
    if (IS_EMBED || document.getElementById("sb-page")) return;
    try {
      const s = document.createElement("script");
      s.id = "sb-page";
      s.src = api.runtime.getURL("page.js");
      (document.head || html).appendChild(s);
    } catch (_e) {}
  }
  const log = (...a) => { if (settings.debug) console.log("[Shorts Blocker]", ...a); };

  // ------------------------------------------------------------------ redirects
  function redirectIfShorts() {
    if (!settings.redirectShorts) return false;
    const m = location.pathname.match(SHORTS_RE);
    if (m) { location.replace(`${location.origin}/watch?v=${m[1]}`); return true; }
    if (location.pathname === "/shorts" || location.pathname === "/shorts/") { location.replace(`${location.origin}/`); return true; }
    return false;
  }
  function redirectHome() {
    if (!settings.disableHomeFeed) return false;
    if (location.pathname === "/" || location.pathname === "/feed" || location.pathname === "/feed/") {
      // Only meaningful when logged in (Subscriptions needs an account); a signed-out home has no avatar button.
      const loggedIn = !!document.querySelector("ytd-topbar-menu-button-renderer #avatar-btn, ytm-mobile-topbar-renderer .topbar-menu-button-avatar-button, #avatar-btn, ytm-topbar-menu-button-renderer button[aria-label*='アカウント'], ytm-topbar-menu-button-renderer button[aria-label*='Account']");
      if (loggedIn || !document.body) { location.replace(`${location.origin}/feed/subscriptions`); return true; }
    }
    return false;
  }

  // ------------------------------------------------------------------ hide / restore helpers
  function hide(el, reason) {
    if (!el || el.getAttribute(HIDDEN)) return;
    if (settings.animateHiding && !settings.debugManualHiding) {
      if (el.classList.contains("sb-fading")) return;
      el.classList.add("sb-fading");
      setTimeout(() => { el.setAttribute(HIDDEN, reason); el.classList.remove("sb-fading"); }, 350);
    } else el.setAttribute(HIDDEN, reason);
    log("hide", reason, el);
  }
  function restore(reason) {
    document.querySelectorAll(`[${HIDDEN}="${reason}"]`).forEach((el) => el.removeAttribute(HIDDEN));
  }

  // ------------------------------------------------------------------ video item classification
  const ITEM_SEL = [
    "ytd-rich-item-renderer", "ytd-video-renderer", "ytd-grid-video-renderer", "ytd-compact-video-renderer", "ytd-playlist-renderer", "ytd-radio-renderer",
    "ytd-compact-radio-renderer", "ytd-compact-playlist-renderer", "ytd-grid-playlist-renderer", "ytd-movie-renderer", "ytd-compact-movie-renderer", "yt-lockup-view-model",
    "ytm-rich-item-renderer", "ytm-video-with-context-renderer", "ytm-compact-video-renderer", "ytm-playlist-renderer", "ytm-radio-renderer", "ytm-compact-playlist-renderer", "ytm-compact-radio-renderer",
  ].join(",");
  const META_SEL = "#metadata-line, .inline-metadata-item, ytd-video-meta-block, .yt-content-metadata-view-model-wiz__metadata-text, .yt-content-metadata-view-model__metadata-text, .ytm-badge-and-byline-renderer, .media-item-metadata, .compact-media-item-metadata, ytm-badge-and-byline-renderer, #byline-container, #video-title-link";
  const BADGE_SEL = "ytd-badge-supported-renderer, .badge, .yt-badge-shape, ytm-badge-renderer, .ytm-badge, yt-thumbnail-overlay-badge-view-model, ytd-thumbnail-overlay-time-status-renderer, ytm-thumbnail-overlay-time-status-renderer, .yt-thumbnail-overlay-badge-view-model, .ytThumbnailOverlayBadgeViewModelHost, ytd-thumbnail-overlay-bottom-panel-renderer";
  function itemText(item, sel) { return [...item.querySelectorAll(sel)].map((e) => norm(e.textContent)).join(" | "); }
  function isLive(item) {
    if (item.querySelector('[overlay-style="LIVE"], [data-style="LIVE"], .badge-style-type-live-now-alternate, .badge-style-type-live-now, ytm-thumbnail-overlay-time-status-renderer[data-style="LIVE"]')) return true;
    return T.live.some((w) => itemText(item, BADGE_SEL).split(" | ").includes(w));
  }
  function isStreamed(item) { return T.streamed.some((w) => itemText(item, META_SEL).includes(w)); }
  function isUpcoming(item) {
    if (item.querySelector('[overlay-style="UPCOMING"], [data-style="UPCOMING"], ytd-toggle-button-renderer[aria-label*="Notify"], ytd-toggle-button-renderer[aria-label*="通知"]')) return true;
    return T.upcoming.some((w) => itemText(item, META_SEL + ", " + BADGE_SEL).includes(w));
  }
  function isMix(item) {
    const tag = item.tagName.toLowerCase();
    if (tag.includes("radio")) return true;
    if (item.querySelector("ytd-radio-renderer, ytm-radio-renderer, ytd-compact-radio-renderer, [href*='&list=RD'], [href*='list=RD']")) return true;
    const title = norm(item.querySelector("#video-title, .media-item-headline, .yt-lockup-metadata-view-model-wiz__title, h3")?.textContent);
    return T.mix.some((w) => title.startsWith(w + " ") || title.startsWith(w + "-") || title.startsWith("my " + w) || title.endsWith(" " + w) || title === w);
  }
  function isPlaylist(item) {
    const tag = item.tagName.toLowerCase();
    if (tag.includes("playlist")) return true;
    return !!item.querySelector("ytd-playlist-thumbnail, yt-collection-thumbnail-view-model, .yt-collection-thumbnail-view-model-wiz, [overlay-style='PLAYLIST'], [data-style='PLAYLIST'], ytm-playlist-renderer, ytd-playlist-renderer, ytm-compact-playlist-renderer");
  }
  function isMovie(item) {
    const tag = item.tagName.toLowerCase();
    return tag.includes("movie") || !!item.querySelector("ytd-movie-renderer, ytd-compact-movie-renderer, a[href*='/movies'], a[href*='/feed/storefront']") || itemText(item, BADGE_SEL).includes("映画") || itemText(item, META_SEL).includes("youtube movies");
  }
  function isMembersOnly(item) { return !!item.querySelector(".badge-style-type-members-only") || T.members.some((w) => itemText(item, BADGE_SEL).includes(w)); }
  function isAutoDubbed(item) { return T.dubbed.some((w) => itemText(item, BADGE_SEL + ", " + META_SEL).includes(w)); }
  function isSponsored(item) {
    if (item.querySelector("ytd-ad-slot-renderer, ytd-promoted-video-renderer, ytd-display-ad-renderer, ytd-in-feed-ad-layout-renderer, ytm-promoted-video-renderer, ytm-ad-slot-renderer, ytd-promoted-sparkles-web-renderer, ytm-promoted-sparkles-web-renderer, [is-ad], .ytd-ad-slot-renderer")) return true;
    const badges = itemText(item, BADGE_SEL).split(" | ");
    return badges.some((b) => T.sponsored.includes(b));
  }
  function isCollab(item) { return T.collab.some((w) => itemText(item, META_SEL + ", " + BADGE_SEL).includes(w)) || item.querySelectorAll("#avatar-container img, .ytm-badge-and-byline-renderer img").length > 1; }
  function watchedPercent(item) {
    const bar = item.querySelector("ytd-thumbnail-overlay-resume-playback-renderer #progress, .thumbnail-overlay-resume-playback-progress, .ytThumbnailOverlayProgressBarHostWatchedProgressBarSegment, yt-thumbnail-overlay-progress-bar-view-model [style*='width']");
    if (!bar) return 0;
    const w = parseFloat((bar.style.width || "").replace("%", ""));
    return isNaN(w) ? 0 : w;
  }
  function viewCount(item) {
    const t = itemText(item, META_SEL);
    const m = t.match(/([\d.,]+)\s*([kmb万億千]?)\s*(?:views|回視聴|回|views?)/);
    if (!m) return null;
    let n = parseFloat(m[1].replace(/,/g, ""));
    const u = m[2];
    if (u === "k" || u === "千") n *= 1e3; else if (u === "m" || u === "万") n *= (u === "m" ? 1e6 : 1e4); else if (u === "b" || u === "億") n *= (u === "b" ? 1e9 : 1e8);
    return n;
  }
  function channelName(item) {
    const el = item.querySelector("ytd-channel-name #text, ytd-channel-name a, #channel-name #text, .ytd-channel-name a, .yt-content-metadata-view-model-wiz__metadata-text a, .ytm-badge-and-byline-renderer .yt-core-attributed-string, .media-item-metadata .ytm-badge-and-byline-renderer span, .compact-media-item-byline, #byline a, #byline");
    return norm(el?.textContent);
  }
  function hiddenChannelSet() {
    return new Set((settings.hiddenChannels || "").split(/\r?\n|,/).map(norm).filter(Boolean));
  }
  function classifyItems() {
    const inRelated = (item) => !!item.closest("ytd-watch-next-secondary-results-renderer, #related, ytm-item-section-renderer[section-identifier='related-items'], ytm-single-column-watch-next-results-renderer");
    const inSubs = (item) => !!item.closest("ytd-browse[page-subtype='subscriptions'], ytm-browse[data-sb-subs]");
    const threshold = parseFloat(settings.hideWatchedThreshold || "0");
    const hiddenCh = settings.hideChannels ? hiddenChannelSet() : null;
    document.querySelectorAll(ITEM_SEL).forEach((item) => {
      if (item.getAttribute(HIDDEN)) return;
      if (item.querySelector(ITEM_SEL)) return; // container of other items (e.g. rich-item wrapping lockup): classify the leaf
      if (settings.hideSponsored && isSponsored(item)) return hide(item, "sponsored");
      if (settings.hideLive && isLive(item)) return hide(item, "live");
      if (settings.hideStreamed && isStreamed(item)) return hide(item, "streamed");
      if (settings.hideUpcoming && isUpcoming(item)) return hide(item, "upcoming");
      if (settings.hideMixes && isMix(item)) return hide(item, "mix");
      if (settings.hidePlaylists && isPlaylist(item)) return hide(item, "playlist");
      if (settings.hideMoviesAndTV && isMovie(item)) return hide(item, "movie");
      if (settings.hideMembersOnly && isMembersOnly(item)) return hide(item, "members");
      if (settings.hideAutoDubbed && isAutoDubbed(item)) return hide(item, "dubbed");
      if (settings.hideCollaborations && inSubs(item) && isCollab(item)) return hide(item, "collab");
      if (settings.hideWatched) { const p = watchedPercent(item); if (p > 0 && p >= threshold) return hide(item, "watched"); }
      if (settings.hideLowViews && inRelated(item)) { const v = viewCount(item); if (v !== null && v < 1000) return hide(item, "lowviews"); }
      if (hiddenCh && hiddenCh.size) { const c = channelName(item); if (c && hiddenCh.has(c)) return hide(item, "channel"); }
    });
    // Wrappers whose only child got hidden (rich-item wrapping a lockup)
    document.querySelectorAll(`ytd-rich-item-renderer:has(> #content > [${HIDDEN}]), ytm-rich-item-renderer:has(> [${HIDDEN}])`).forEach((w) => hide(w, "wrapper"));
  }
  const REASONS = ["sponsored", "live", "streamed", "upcoming", "mix", "playlist", "movie", "members", "dubbed", "collab", "watched", "lowviews", "channel", "wrapper"];
  const REASON_KEY = { sponsored: "hideSponsored", live: "hideLive", streamed: "hideStreamed", upcoming: "hideUpcoming", mix: "hideMixes", playlist: "hidePlaylists", movie: "hideMoviesAndTV", members: "hideMembersOnly", dubbed: "hideAutoDubbed", collab: "hideCollaborations", watched: "hideWatched", lowviews: "hideLowViews", channel: "hideChannels" };
  function restoreDisabled() {
    for (const r of REASONS) { if (r !== "wrapper" && !settings[REASON_KEY[r]]) restore(r); }
    document.querySelectorAll(`[${HIDDEN}="wrapper"]`).forEach((w) => { if (!w.querySelector(`[${HIDDEN}]`)) w.removeAttribute(HIDDEN); });
  }

  // ------------------------------------------------------------------ Shorts JS pass (text-based, mobile pivot bar)
  const HEADER_HOSTS = "ytd-rich-section-renderer, ytd-reel-shelf-renderer, ytd-item-section-renderer, ytm-rich-section-renderer, ytm-item-section-renderer, ytm-reel-shelf-renderer, grid-shelf-view-model";
  const HEADER_TEXT = "#title, h2, h3, .shelf-header, .rich-shelf-header, yt-shelf-header-layout, ytm-shelf-header-renderer, .rich-shelf-title, .shelf-title, [role=heading]";
  function shortsPass() {
    if (!settings.hideShorts) { restore("shorts"); document.querySelectorAll("[data-sb-pivot], [data-sb-rebalanced]").forEach((el) => { el.removeAttribute("data-sb-pivot"); el.removeAttribute("data-sb-rebalanced"); }); return; }
    document.querySelectorAll(HEADER_HOSTS).forEach((host) => {
      if (host.getAttribute(HIDDEN)) return;
      const heading = host.querySelector(HEADER_TEXT);
      if (heading && hasText(heading, T.shorts, true)) hide(host, "shorts");
    });
    document.querySelectorAll("yt-tab-shape, tp-yt-paper-tab, ytm-tab-renderer, .tab-content, [role=tab]").forEach((tab) => {
      const label = tab.getAttribute("tab-title") || tab.getAttribute("title") || tab.getAttribute("aria-label") || tab.textContent;
      if (T.shorts.includes(norm(label))) hide(tab.closest("yt-tab-shape, tp-yt-paper-tab") || tab, "shorts");
    });
    document.querySelectorAll("ytm-pivot-bar-item-renderer").forEach((item) => {
      if (item.getAttribute("data-sb-pivot") === "shorts") return;
      const title = item.querySelector(".pivot-bar-item-title")?.textContent;
      const aria = item.getAttribute("aria-label") || item.querySelector("[aria-label]")?.getAttribute("aria-label");
      if (item.querySelector('a[href^="/shorts"], .pivot-shorts') || T.shorts.includes(norm(title)) || T.shorts.includes(norm(aria))) {
        item.setAttribute("data-sb-pivot", "shorts");
        (item.closest("ytm-pivot-bar-renderer") || item.parentElement)?.setAttribute("data-sb-rebalanced", "");
      }
    });
    document.querySelectorAll("ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer").forEach((entry) => {
      const link = entry.querySelector("a");
      const href = link?.getAttribute("href") || "";
      const label = entry.querySelector(".title")?.textContent || link?.getAttribute("title") || entry.getAttribute("aria-label");
      if (href.startsWith("/shorts") || T.shorts.includes(norm(label))) hide(entry, "shorts");
    });
  }

  // ------------------------------------------------------------------ page-type markers (used by CSS)
  function markPage() {
    const p = location.pathname;
    const mb = document.querySelector("ytm-browse");
    if (mb) {
      mb.toggleAttribute("data-sb-home", p === "/" || p === "/feed" || p === "/feed/");
      mb.toggleAttribute("data-sb-subs", p.startsWith("/feed/subscriptions"));
    }
    const flexy = document.querySelector("ytd-watch-flexy");
    html.toggleAttribute("data-sb-theater", !!flexy?.hasAttribute("theater"));
    const playlistPanel = document.querySelector("ytd-playlist-panel-renderer#playlist:not([hidden]) #items > *, ytm-playlist-panel-renderer");
    html.toggleAttribute("data-sb-inplaylist", !!playlistPanel || /[?&]list=/.test(location.search));
  }

  // ------------------------------------------------------------------ misc JS features
  function logoPass() {
    if (!settings.redirectLogoToSubscriptions) return;
    document.querySelectorAll("a#logo, ytd-topbar-logo-renderer a, a.mobile-topbar-logo, ytm-mobile-topbar-renderer a[href='/'], ytm-home-logo a, a[aria-label*='YouTube ホーム'], a[aria-label='YouTube Home']").forEach((a) => {
      if (a.getAttribute("href") !== "/feed/subscriptions") a.setAttribute("href", "/feed/subscriptions");
    });
  }
  function restoreSubsLinkPass() {
    if (!settings.restoreSidebarSubscriptionsLink) return;
    const section = document.querySelector("ytd-guide-renderer #sections > ytd-guide-section-renderer:first-child #items");
    if (!section || section.querySelector("a[href='/feed/subscriptions']") || section.querySelector(".sb-subs-link")) return;
    const home = section.querySelector("ytd-guide-entry-renderer:has(a[href='/'])");
    if (!home) return;
    const clone = home.cloneNode(true);
    clone.classList.add("sb-subs-link");
    const a = clone.querySelector("a"); if (a) { a.href = "/feed/subscriptions"; a.title = IS_JA ? "登録チャンネル" : "Subscriptions"; }
    const t = clone.querySelector(".title"); if (t) t.textContent = IS_JA ? "登録チャンネル" : "Subscriptions";
    clone.querySelectorAll("[selected], .selected").forEach((e) => { e.removeAttribute("selected"); e.classList?.remove("selected"); });
    clone.addEventListener("click", (e) => { e.preventDefault(); location.href = "/feed/subscriptions"; });
    home.after(clone);
  }
  const IS_JA = (navigator.language || "").toLowerCase().startsWith("ja");
  function hiddenVideosPass() {
    if (!settings.hideHiddenVideos) return;
    document.querySelectorAll("ytd-rich-item-renderer:has(ytd-notification-multi-action-renderer), ytd-rich-item-renderer:has(#dismissed:not([hidden])), ytm-rich-item-renderer:has(ytm-notification-multi-action-renderer), ytd-compact-video-renderer[is-dismissed], ytd-rich-item-renderer[is-dismissed]").forEach((el) => {
      if (el.__sbDismissTimer) return;
      el.__sbDismissTimer = setTimeout(() => { if (el.isConnected) hide(el, "dismissed"); }, 5000);
    });
  }
  function interruptionsPass() {
    if (!settings.hideExperiencingInterruptions) return;
    document.querySelectorAll("tp-yt-paper-dialog, ytd-popup-container yt-confirm-dialog-renderer, ytm-confirm-dialog-renderer, .ytp-popup, yt-bottom-sheet-layout-view-model").forEach((d) => {
      if (hasText(d, T.interruptions)) { d.setAttribute("data-sb-interruptions", ""); d.querySelector("#dismiss-button, button[aria-label*='Close'], button[aria-label*='閉じる'], .ytp-popup-close")?.click(); }
    });
  }
  function openAppPass() {
    if (!settings.hideOpenApp || !IS_MOBILE) return;
    document.querySelectorAll("ytm-button-renderer, button-view-model, ytm-mealbar-promo-renderer, ytm-app-upsell-shelf-renderer, .app-upsell, ytm-mobile-topbar-renderer > * button").forEach((el) => {
      const t = norm(el.textContent);
      if ((t === "open app" || t === "アプリを開く" || t === "アプリで開く" || t.includes("youtube アプリ")) && t.length < 40) (el.closest("button-view-model, ytm-button-renderer, ytm-mealbar-promo-renderer, ytm-app-upsell-shelf-renderer") || el).setAttribute("data-sb-openapp", "");
    });
  }
  function fullscreenCornerPass() {
    if (!settings.playerFixFullScreenButton || window.__sbCornerHooked) return;
    const p = document.getElementById("movie_player"); if (!p) return;
    window.__sbCornerHooked = true;
    p.addEventListener("dblclick", (e) => {
      if (!settings.playerFixFullScreenButton) return;
      const r = p.getBoundingClientRect();
      const nearCorner = (e.clientX - r.left < 120 || r.right - e.clientX < 120) && (e.clientY - r.top < 120 || r.bottom - e.clientY < 120);
      if (nearCorner) { e.stopPropagation(); e.preventDefault(); document.querySelector(".ytp-fullscreen-button")?.click(); }
    }, true);
  }
  const CAMERA_SVG = '<svg viewBox="0 0 24 24"><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zM9 2 7.17 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.17L15 2H9zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/></svg>';
  function snapshotPass() {
    const existing = document.querySelectorAll(".sb-player-btn, .sb-mobile-snapshot");
    if (!settings.addTakeSnapshot) { existing.forEach((b) => b.remove()); return; }
    if (existing.length) return;
    const right = document.querySelector("#movie_player .ytp-right-controls");
    if (right && !IS_MOBILE) {
      const b = document.createElement("button");
      b.className = "ytp-button sb-player-btn"; b.title = IS_JA ? "スナップショットを保存" : "Take snapshot"; b.innerHTML = CAMERA_SVG;
      b.addEventListener("click", (e) => { e.stopPropagation(); document.dispatchEvent(new CustomEvent("sb-snapshot")); });
      right.prepend(b);
    } else if (IS_MOBILE && document.querySelector("ytm-watch video, #player video")) {
      const b = document.createElement("button");
      b.className = "sb-mobile-snapshot"; b.setAttribute("aria-label", IS_JA ? "スナップショットを保存" : "Take snapshot"); b.innerHTML = CAMERA_SVG;
      b.addEventListener("click", () => document.dispatchEvent(new CustomEvent("sb-snapshot")));
      document.body.appendChild(b);
    }
  }
  function transcriptPass() {
    if (!settings.downloadTranscript) { document.querySelectorAll(".sb-transcript-btn").forEach((b) => b.remove()); return; }
    const panel = document.querySelector("ytd-engagement-panel-section-list-renderer[target-id='engagement-panel-searchable-transcript']:not([visibility='ENGAGEMENT_PANEL_VISIBILITY_HIDDEN'])");
    if (!panel || panel.querySelector(".sb-transcript-btn")) return;
    const header = panel.querySelector("#header #title-container, #header ytd-engagement-panel-title-header-renderer #title-container, #header");
    if (!header) return;
    const b = document.createElement("button");
    b.className = "sb-transcript-btn"; b.textContent = IS_JA ? "ダウンロード" : "Download";
    b.addEventListener("click", () => document.dispatchEvent(new CustomEvent("sb-transcript")));
    header.appendChild(b);
  }

  // ------------------------------------------------------------------ main pass
  function processPage() {
    if (!document.body) return;
    markPage();
    applyTheme();
    shortsPass();
    restoreDisabled();
    classifyItems();
    logoPass();
    restoreSubsLinkPass();
    hiddenVideosPass();
    interruptionsPass();
    openAppPass();
    fullscreenCornerPass();
    snapshotPass();
    transcriptPass();
  }
  function debounce(fn, wait) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), wait); }; }
  const processPageDebounced = debounce(processPage, 150);

  // ------------------------------------------------------------------ navigation hooks (YouTube is an SPA)
  let lastUrl = "";
  function onNavigate(force) {
    const url = location.href;
    if (!force && url === lastUrl) return;
    lastUrl = url;
    if (redirectIfShorts() || redirectHome()) return;
    processPageDebounced();
  }
  function installNavHooks() {
    if (window.__sbNavHooked) return;
    window.__sbNavHooked = true;
    for (const name of ["pushState", "replaceState"]) {
      const original = history[name];
      if (typeof original !== "function") continue;
      history[name] = function (...args) { const r = original.apply(this, args); queueMicrotask(() => onNavigate(false)); return r; };
    }
    window.addEventListener("popstate", () => onNavigate(true));
    for (const ev of ["yt-navigate-start", "yt-navigate-finish", "yt-page-data-updated"]) {
      window.addEventListener(ev, () => onNavigate(true));
      document.addEventListener(ev, () => onNavigate(true));
    }
  }

  // ------------------------------------------------------------------ settings
  async function loadSettings() {
    try { const stored = await api.storage.local.get(SB_DEFAULTS); settings = { ...SB_DEFAULTS, ...stored }; } catch (_e) { settings = { ...SB_DEFAULTS }; }
    applyAttributes();
    if (redirectIfShorts() || redirectHome()) return;
    processPage();
  }
  try {
    api.storage.onChanged.addListener((changes, area) => {
      if (area !== "local") return;
      for (const [key, change] of Object.entries(changes)) if (key in featureMap) settings[key] = change.newValue ?? SB_DEFAULTS[key];
      applyAttributes();
      if (redirectIfShorts() || redirectHome()) return;
      processPage();
    });
  } catch (_e) {}

  // ------------------------------------------------------------------ boot
  injectStyle();
  applyAttributes();
  if (redirectIfShorts()) return;
  installNavHooks();
  loadSettings();
  const observer = new MutationObserver((muts) => { for (const m of muts) if (m.addedNodes.length) { processPageDebounced(); break; } });
  function whenBodyReady(cb) {
    if (document.body) return cb();
    const o = new MutationObserver(() => { if (document.body) { o.disconnect(); cb(); } });
    o.observe(html, { childList: true });
  }
  whenBodyReady(() => {
    injectStyle();
    injectPageScript();
    lastUrl = location.href;
    if (redirectHome()) return;
    processPage();
    observer.observe(document.body, { childList: true, subtree: true });
    setInterval(processPage, 3000); // safety net for attribute-only changes (progress bars, badges) the observer doesn't see
    try { const p = api.runtime.sendMessage({ type: "sb-content-seen", host: location.host }); if (p && p.catch) p.catch(() => {}); } catch (_e) {}
  });
})();
// Page-world script (injected by content.js). Handles what an isolated content script cannot:
// visibility/loop/keyboard interception, YouTube experiment flags, player API calls.
// Settings arrive via <html data-sb-*> attributes (observed) — no privileged APIs here.
(() => {
  "use strict";
  if (window.__sbPage) return;
  window.__sbPage = true;
  const html = document.documentElement;
  const on = (k) => html.hasAttribute("data-sb-" + k);
  const attr = (k) => html.getAttribute("data-sb-" + k);

  // ---- Background playback (mobile): keep the page "visible" so YouTube doesn't pause when the screen locks.
  const stopEvent = (e) => { if (on("allowbackgroundplay")) { e.stopImmediatePropagation(); } };
  document.addEventListener("visibilitychange", stopEvent, true);
  window.addEventListener("pagehide", stopEvent, true);
  window.addEventListener("blur", stopEvent, true);
  try {
    const desc = Object.getOwnPropertyDescriptor(Document.prototype, "hidden");
    const vdesc = Object.getOwnPropertyDescriptor(Document.prototype, "visibilityState");
    Object.defineProperty(document, "hidden", { get() { return on("allowbackgroundplay") ? false : desc.get.call(document); }, configurable: true });
    Object.defineProperty(document, "visibilityState", { get() { return on("allowbackgroundplay") ? "visible" : vdesc.get.call(document); }, configurable: true });
  } catch (_e) {}
  // Resume if YouTube paused us anyway (e.g. media session interruption).
  setInterval(() => {
    if (!on("allowbackgroundplay")) return;
    const v = document.querySelector("video.html5-main-video, video");
    if (v && v.paused && !v.ended && v.currentTime > 0 && document.hidden !== undefined && window.__sbWasPlaying) v.play().catch(() => {});
  }, 1500);
  document.addEventListener("play", (e) => { if (e.target?.tagName === "VIDEO") window.__sbWasPlaying = true; }, true);
  document.addEventListener("pause", (e) => { if (e.target?.tagName === "VIDEO" && !on("allowbackgroundplay")) window.__sbWasPlaying = false; }, true);

  // ---- Stop Shorts looping: turn the loop attribute off on Shorts pages and pause at the end.
  function shortsLoopPass() {
    if (!on("stopshortslooping") || !location.pathname.startsWith("/shorts/")) return;
    document.querySelectorAll("video").forEach((v) => {
      if (v.loop) v.loop = false;
      if (!v.__sbLoopHooked) {
        v.__sbLoopHooked = true;
        v.addEventListener("ended", () => { if (on("stopshortslooping")) v.pause(); });
      }
    });
  }

  // ---- Number key seeking (desktop): swallow 0-9 when the player has focus.
  document.addEventListener("keydown", (e) => {
    if (!on("disablenumberkeyseeking")) return;
    if (e.target && ["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
    if (e.target?.isContentEditable) return;
    if (/^[0-9]$/.test(e.key) && !e.metaKey && !e.ctrlKey && !e.altKey) { e.stopImmediatePropagation(); e.preventDefault(); }
  }, true);

  // ---- Experiment flags (desktop): opt out of the new ("Delhi") player UI while YouTube still ships the old one.
  function patchFlags() {
    if (!on("playerremovedelhiexperimentflags")) return;
    try {
      const f = window.yt?.config_?.EXPERIMENT_FLAGS;
      if (!f) return;
      for (const k of Object.keys(f)) if (/delhi/i.test(k) && f[k] === true) f[k] = false;
    } catch (_e) {}
  }

  // ---- Player helpers (desktop + mobile where the API exists)
  function player() { return document.getElementById("movie_player"); }
  function originalAudioPass() {
    if (!on("alwaysuseoriginalaudio")) return;
    const p = player();
    if (!p || typeof p.getAvailableAudioTracks !== "function" || window.__sbAudioDoneFor === location.href) return;
    try {
      const tracks = p.getAvailableAudioTracks?.() || [];
      const orig = tracks.find((t) => /original|オリジナル/i.test(JSON.stringify(t)));
      if (orig && typeof p.setAudioTrack === "function") { p.setAudioTrack(orig); window.__sbAudioDoneFor = location.href; }
    } catch (_e) {}
  }
  function theaterPass() {
    if (!on("alwaysusetheatermode") || location.pathname !== "/watch") return;
    const flexy = document.querySelector("ytd-watch-flexy");
    if (!flexy || flexy.hasAttribute("theater") || flexy.hasAttribute("fullscreen")) return;
    const btn = document.querySelector(".ytp-size-button");
    if (btn && !window.__sbTheaterTried) { window.__sbTheaterTried = true; btn.click(); setTimeout(() => { window.__sbTheaterTried = false; }, 5000); }
  }
  function autoplayPass() {
    if (!on("disableautoplay")) return;
    const d = document.querySelector(".ytp-autonav-toggle-button");
    if (d && d.getAttribute("aria-checked") === "true") d.click();
    const m = document.querySelector("ytm-autonav-toggle-button-renderer button, .ytm-autonav-toggle-button-container button");
    if (m && m.getAttribute("aria-pressed") === "true") m.click();
  }
  function stableVolumePass() {
    if (!on("disablestablevolume")) return;
    const p = player();
    try { if (p && typeof p.getVolume === "function" && p.setOption) p.setOption("stablevolume", "enabled", false); } catch (_e) {}
  }
  function trailerPass() {
    if (!on("pausechanneltrailers")) return;
    if (!/^\/(@|channel\/|c\/|user\/)/.test(location.pathname)) return;
    const v = document.querySelector("ytd-channel-video-player-renderer video, .ytd-channel-video-player-renderer video");
    if (v && !v.paused && !v.__sbPaused) { v.__sbPaused = true; v.pause(); }
  }
  function adsPass() {
    if (!on("blockads")) return;
    const p = player();
    const ad = document.querySelector(".ad-showing, .ad-interrupting");
    if (ad) {
      const v = document.querySelector("video.html5-main-video");
      if (v) { try { v.muted = true; if (isFinite(v.duration) && v.duration > 0) v.currentTime = v.duration; } catch (_e) {} }
      document.querySelectorAll(".ytp-skip-ad-button, .ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-ad-skip-button-slot button").forEach((b) => b.click());
    } else {
      const v = document.querySelector("video.html5-main-video");
      if (v && v.__sbMutedByAd) { v.muted = false; v.__sbMutedByAd = false; }
    }
    if (ad) { const v = document.querySelector("video.html5-main-video"); if (v) v.__sbMutedByAd = true; }
    document.querySelectorAll(".ytp-ad-overlay-close-button").forEach((b) => b.click());
    // "Ad blockers violate YouTube's Terms" style dialogs
    document.querySelectorAll("ytd-enforcement-message-view-model button, tp-yt-paper-dialog[aria-label*='ad'] #dismiss-button").forEach((b) => b.click());
  }

  // ---- Snapshot: capture the current frame.
  window.__sbTakeSnapshot = function () {
    const v = document.querySelector("video.html5-main-video, video");
    if (!v) return;
    const c = document.createElement("canvas");
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    const fmt = attr("snapshotformat") || "jpeg";
    const q = parseFloat(attr("snapshotquality") || "0.92");
    const mime = fmt === "png" ? "image/png" : fmt === "webp" ? "image/webp" : "image/jpeg";
    c.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const title = (document.title || "snapshot").replace(/ - YouTube$/, "").replace(/[\\/:*?"<>|]+/g, "_");
      const t = Math.floor(v.currentTime);
      a.href = url; a.download = `${title} ${Math.floor(t / 60)}m${String(t % 60).padStart(2, "0")}s.${fmt === "jpeg" ? "jpg" : fmt}`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    }, mime, q);
  };

  // ---- Transcript download (desktop): read the open transcript panel and save as text.
  window.__sbDownloadTranscript = function () {
    const segs = [...document.querySelectorAll("ytd-transcript-segment-renderer")];
    if (!segs.length) return false;
    const lines = segs.map((s) => {
      const t = s.querySelector(".segment-timestamp")?.textContent.trim() || "";
      const x = s.querySelector(".segment-text")?.textContent.trim() || "";
      return `${t}\t${x}`;
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${(document.title || "transcript").replace(/ - YouTube$/, "").replace(/[\\/:*?"<>|]+/g, "_")}.txt`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    return true;
  };

  document.addEventListener("sb-snapshot", () => window.__sbTakeSnapshot());
  document.addEventListener("sb-transcript", () => window.__sbDownloadTranscript());

  function tick() {
    shortsLoopPass(); patchFlags(); originalAudioPass(); theaterPass(); autoplayPass(); stableVolumePass(); trailerPass(); adsPass();
  }
  setInterval(tick, 1000);
  document.addEventListener("yt-navigate-finish", () => { window.__sbTheaterTried = false; setTimeout(tick, 300); });
  tick();
})();
