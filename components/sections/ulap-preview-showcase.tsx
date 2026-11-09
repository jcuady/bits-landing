"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import {
  Cloud,
  MessageSquare,
  Video,
  Radar,
  Sparkles,
  Lock,
  Mic,
  Send,
  CheckCircle2,
  AlertTriangle,
  Share2,
  ShoppingBag,
  MapPin,
  ShieldCheck,
  Users,
  ExternalLink,
  Smile,
  Volume2,
  MonitorUp,
} from "lucide-react";

type UlapTabId = "chats" | "rooms" | "maritess" | "cloud9";

interface BarkadaSticker {
  id: string;
  phrase: string;
  sub: string;
  mood: string;
  gradient: string;
}

const BARKADA_STICKERS: BarkadaSticker[] = [
  {
    id: "kumusta",
    phrase: "Kumusta! ☁️",
    sub: "Warm greeting cloud",
    mood: " Friendly Wave",
    gradient: "from-sky-400 to-blue-600",
  },
  {
    id: "mabuhay",
    phrase: "Mabuhay! ✨",
    sub: "Celebration sunburst",
    mood: "Festive Cheer",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: "salamat",
    phrase: "Salamat po! 💙",
    sub: "Grateful cumulus bow",
    mood: "Heartfelt Thanks",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "sana-all",
    phrase: "Sana all! 🌟",
    sub: "Daydreaming starlight cloud",
    mood: "Playful Hype",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    id: "tara-g",
    phrase: "Tara G! 🚀",
    sub: "Jet-stream cloud dash",
    mood: "Ready to Roll",
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    id: "ingat",
    phrase: "Ingat palagi! 🌈",
    sub: "Umbrella & rainbow shield",
    mood: "Safe Travels",
    gradient: "from-cyan-400 to-blue-500",
  },
];

interface MaritessPost {
  id: string;
  category: "Traffic" | "Weather" | "Events" | "Safety";
  author: string;
  badge: string;
  distance: string;
  timeAgo: string;
  title: string;
  detail: string;
  totooCount: number;
  hindiTotooCount: number;
}

const INITIAL_MARITESS_POSTS: MaritessPost[] = [
  {
    id: "post-1",
    category: "Traffic",
    author: "@kuya_joms",
    badge: "Top Maritess ★",
    distance: "~800m away · Ortigas Center",
    timeAgo: "4m ago",
    title: "EDSA-Ortigas Flyover Northbound moving smoothly right now",
    detail:
      "Cleared of earlier stalled van near Robinsons Galleria. Bus carousel lane and outer lanes are both light.",
    totooCount: 28,
    hindiTotooCount: 2,
  },
  {
    id: "post-2",
    category: "Weather",
    author: "@ate_claire",
    badge: "Verified Neighbor",
    distance: "~1.1km away · Kapitolyo",
    timeAgo: "12m ago",
    title: "Sudden heavy downpour along Shaw Blvd — bring umbrellas!",
    detail:
      "Zero street flooding so far near Capitol Commons, but visibility is low. Tricycle queues at Estancia are covered.",
    totooCount: 41,
    hindiTotooCount: 1,
  },
  {
    id: "post-3",
    category: "Events",
    author: "@barkada_run_ph",
    badge: "Community Host",
    distance: "~600m away · Greenfield District",
    timeAgo: "27m ago",
    title: "Weekend Sunset Community Market & Acoustic Jam open until 10 PM",
    detail:
      "Local coffee pop-ups, artisan pastries, and acoustic sets at the central lawn. Free entry and pet-friendly!",
    totooCount: 64,
    hindiTotooCount: 0,
  },
];

export function UlapPreviewShowcase() {
  const [activeTab, setActiveTab] = React.useState<UlapTabId>("chats");
  const [selectedFolder, setSelectedFolder] = React.useState<string>("All Chats");
  const [sentStickers, setSentStickers] = React.useState<BarkadaSticker[]>([
    BARKADA_STICKERS[0],
  ]);
  const [votes, setVotes] = React.useState<Record<string, "totoo" | "hindi" | undefined>>({
    "post-1": "totoo",
  });
  const [micMuted, setMicMuted] = React.useState(false);
  const [screenSharing, setScreenSharing] = React.useState(true);

  const handleSendSticker = (sticker: BarkadaSticker) => {
    setSentStickers((prev) => [...prev.slice(-2), sticker]);
  };

  const handleVote = (postId: string, choice: "totoo" | "hindi") => {
    setVotes((prev) => ({
      ...prev,
      [postId]: prev[postId] === choice ? undefined : choice,
    }));
  };

  const tabs: {
    id: UlapTabId;
    label: string;
    shortLabel: string;
    badge: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: "chats",
      label: "Chats & Ulap Barkada Stickers",
      shortLabel: "Chats & Stickers",
      badge: "37 Animated Stickers",
      icon: MessageSquare,
    },
    {
      id: "rooms",
      label: "Drop-In Voice & Video Rooms",
      shortLabel: "Voice & Video",
      badge: "Docked Call + Chat",
      icon: Video,
    },
    {
      id: "maritess",
      label: "Maritess Hub & Nearby Radar",
      shortLabel: "Maritess Hub",
      badge: "Totoo / Hindi Totoo",
      icon: Radar,
    },
    {
      id: "cloud9",
      label: "Cloud 9, Passing Clouds & Market",
      shortLabel: "Cloud 9 & Market",
      badge: "24h Stories & Local Trade",
      icon: Sparkles,
    },
  ];

  return (
    <section
      id="ulap-visual-showcase"
      data-ulap-preview-showcase="true"
      className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-sky-50/70 via-white to-slate-50/60 py-20 sm:py-28"
    >
      {/* Ambient Sky Glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 h-[360px] w-[960px] rounded-full bg-sky-200/35 blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-4 py-1.5 shadow-2xs">
            <Cloud className="size-4 text-blue-600" />
            <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-blue-700">
              Interactive Product Tour · chat.boundlessits.com
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
            Inside BITS ULAP: Uniting Lives Across Places
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore the four signature experiences that make ULAP feel like home — from expressive{" "}
            <strong className="font-semibold text-slate-800">Ulap Barkada</strong> cloud stickers and{" "}
            <strong className="font-semibold text-slate-800">drop-in call rooms</strong> to community-verified{" "}
            <strong className="font-semibold text-slate-800">Maritess Hub</strong> radar updates.
          </p>
        </div>

        {/* Interactive 4-Tab Selector Bar */}
        <div
          role="tablist"
          aria-label="BITS ULAP Interactive Feature Views"
          className="mx-auto mb-8 grid max-w-5xl grid-cols-2 gap-2.5 sm:grid-cols-4"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-ulap-tab={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "group flex flex-col items-start justify-between rounded-2xl border p-3.5 sm:p-4 text-left transition-all duration-200 cursor-pointer",
                  isActive
                    ? "border-blue-600 bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-600/20"
                    : "border-slate-200/90 bg-white/90 text-slate-700 hover:border-blue-300 hover:bg-white shadow-xs"
                )}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span
                    className={cn(
                      "inline-flex size-9 items-center justify-center rounded-xl transition-colors",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-sky-50 text-blue-600 group-hover:bg-blue-50"
                    )}
                  >
                    <Icon className="size-4.5" />
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-600"
                    )}
                  >
                    {tab.badge}
                  </span>
                </div>
                <span className="mt-3 text-xs sm:text-sm font-bold leading-snug">
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Window Shell */}
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-sky-200/90 bg-white shadow-2xl shadow-blue-950/10">
          {/* Browser / App Titlebar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 px-4 py-3 sm:px-6 text-white">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-rose-400/90" />
                <span className="size-2.5 rounded-full bg-amber-400/90" />
                <span className="size-2.5 rounded-full bg-emerald-400/90" />
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs">
                <Cloud className="size-3.5 text-sky-300" />
                <span className="font-mono text-[11px] font-semibold text-sky-100">
                  https://chat.boundlessits.com
                </span>
                <span className="rounded-full bg-emerald-400/20 px-2 py-0.2 text-[10px] font-bold text-emerald-300">
                  Live PWA
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-sky-200">
                <ShieldCheck className="size-3.5 text-emerald-300" />
                Web · Android APK · iOS Home Screen · Desktop
              </span>
              <a
                href="https://chat.boundlessits.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-sky-400 hover:bg-sky-300 px-3.5 py-1 text-xs font-extrabold text-slate-950 transition-colors"
              >
                <span>Open App</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>

          {/* ── TAB 1: CHATS & ULAP BARKADA STICKERS ── */}
          {activeTab === "chats" && (
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_290px]">
              {/* Left Column: Chat Folders & Conversations */}
              <div className="border-b lg:border-b-0 lg:border-r border-slate-200/80 bg-slate-50/70 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Chat Folders
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                    <Lock className="size-2.5" /> PIN Hidden Ready
                  </span>
                </div>

                {/* Folder Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["All Chats", "Barkada", "Work", "Channels", "🔒 Hidden"].map((folder) => (
                    <button
                      key={folder}
                      type="button"
                      onClick={() => setSelectedFolder(folder)}
                      className={cn(
                        "rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer",
                        selectedFolder === folder
                          ? "bg-blue-600 text-white shadow-2xs"
                          : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
                      )}
                    >
                      {folder}
                    </button>
                  ))}
                </div>

                {/* Active Conversation List */}
                <div className="space-y-2">
                  <div className="rounded-xl border border-blue-200 bg-white p-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900">
                        ☁️ Ulap Barkada HQ
                      </span>
                      <span className="rounded-full bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        Active
                      </span>
                    </div>
                    <p className="mt-1 truncate text-[11px] text-slate-600">
                      Mika: {sentStickers[sentStickers.length - 1]?.phrase ?? "Kumusta! ☁️"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200/80 bg-white/70 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        📢 Manila Tech &amp; Ops Channel
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">1.4k</span>
                    </div>
                    <p className="mt-1 truncate text-[11px] text-slate-500">
                      New release notes posted · Poll active
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200/80 bg-white/70 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">
                        🔒 Executive Board (PIN Locked)
                      </span>
                      <Lock className="size-3 text-amber-600" />
                    </div>
                    <p className="mt-1 truncate text-[11px] text-slate-500">
                      Protected by 4-digit privacy PIN
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Column: Active Chat Stream */}
              <div className="flex flex-col justify-between p-5 sm:p-6 bg-white">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-extrabold text-slate-900">
                          Ulap Barkada HQ ({selectedFolder})
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          <span className="size-1.5 rounded-full bg-emerald-500" /> 8 Online
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Replies, reactions, polls, voice notes &amp; 50MB file attachments
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="mt-4 space-y-3.5">
                    <div className="flex items-start gap-2.5">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-extrabold text-blue-700">
                        JR
                      </div>
                      <div className="max-w-md rounded-2xl rounded-tl-xs border border-slate-200 bg-slate-50 px-3.5 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-900">Joms Rivera</span>
                          <span className="text-[10px] text-slate-400">10:14 AM</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-700 leading-relaxed">
                          Uploaded the Q3 operations deck (18.4 MB PDF) and pinned the Friday dinner poll!
                        </p>
                        {/* Voice Note Waveform */}
                        <div className="mt-2 flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-3 py-1.5">
                          <Volume2 className="size-3.5 text-blue-600 shrink-0" />
                          <div className="flex items-center gap-0.5" aria-hidden="true">
                            {[4, 8, 12, 6, 14, 10, 7, 13, 9, 5, 11, 8].map((h, idx) => (
                              <span
                                key={idx}
                                style={{ height: `${h}px` }}
                                className="w-1 rounded-full bg-blue-500/80"
                              />
                            ))}
                          </div>
                          <span className="ml-auto font-mono text-[10px] font-bold text-slate-500">
                            0:18 Voice Note
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Sent Stickers */}
                    {sentStickers.map((stk, i) => (
                      <div key={`${stk.id}-${i}`} className="flex items-end justify-end gap-2">
                        <div className="flex flex-col items-end">
                          <div
                            className={cn(
                              "inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r px-4 py-2.5 text-white shadow-md",
                              stk.gradient
                            )}
                          >
                            <Cloud className="size-5 text-white shrink-0" />
                            <div>
                              <p className="text-xs font-extrabold leading-tight">{stk.phrase}</p>
                              <p className="text-[10px] text-white/85">{stk.sub}</p>
                            </div>
                          </div>
                          <span className="mt-1 text-[10px] font-medium text-slate-400">
                            Sent via Ulap Barkada Sticker Pack · Read ✓✓
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Composer Bar */}
                <div className="mt-5 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2">
                  <Mic className="size-4 text-blue-600 shrink-0" />
                  <span className="text-xs text-slate-500 truncate">
                    Tap any Ulap Barkada sticker on the right to send it into the chat →
                  </span>
                  <span className="ml-auto inline-flex size-7 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Send className="size-3.5" />
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Ulap Barkada Sticker Drawer */}
              <div className="border-t lg:border-t-0 lg:border-l border-slate-200/80 bg-sky-50/40 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Smile className="size-4 text-blue-600" />
                    <span className="text-xs font-extrabold text-slate-900">
                      Ulap Barkada Stickers
                    </span>
                  </div>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 font-mono text-[10px] font-bold text-blue-700">
                    37 Pack
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-3">
                  Click any expressive Filipino cloud sticker below to test sending it in the chat:
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {BARKADA_STICKERS.map((sticker) => (
                    <button
                      key={sticker.id}
                      type="button"
                      onClick={() => handleSendSticker(sticker)}
                      className="group flex flex-col items-start rounded-xl border border-sky-200/80 bg-white p-2.5 text-left shadow-2xs transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-sm cursor-pointer"
                    >
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-lg bg-gradient-to-r px-2 py-1 text-[11px] font-extrabold text-white",
                          sticker.gradient
                        )}
                      >
                        {sticker.phrase}
                      </span>
                      <span className="mt-1.5 text-[10px] font-semibold text-slate-600">
                        {sticker.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 2: DROP-IN VOICE & VIDEO ROOMS ── */}
          {activeTab === "rooms" && (
            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr]">
              {/* Left: Docked Multi-Participant Voice & Video Stage */}
              <div className="bg-slate-950 p-5 sm:p-6 text-white">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex size-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <h3 className="text-sm font-extrabold text-white">
                      Design &amp; Ops Standup Room · Docked Call Mode
                    </h3>
                  </div>
                  <span className="rounded-full border border-sky-400/30 bg-sky-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-sky-300">
                    Dedicated TURN Relay · Low-Latency
                  </span>
                </div>

                {/* Participant Grid */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    {
                      name: "Andrea Reyes",
                      role: "Product Lead · Speaking",
                      speaking: true,
                      filter: "Studio Soft Blur",
                    },
                    {
                      name: "Marco Santos",
                      role: screenSharing ? "Sharing Screen (1080p)" : "Camera Active",
                      speaking: false,
                      filter: "Sky Horizon BG",
                    },
                    {
                      name: "Bea Villanueva",
                      role: "Voice Connected",
                      speaking: false,
                      filter: "Warm Daylight",
                    },
                    {
                      name: "You (Preview)",
                      role: micMuted ? "Mic Muted" : "Mic Live",
                      speaking: !micMuted,
                      filter: "Beauty Filter On",
                    },
                  ].map((participant) => (
                    <div
                      key={participant.name}
                      className={cn(
                        "relative rounded-2xl border p-4 transition-all",
                        participant.speaking
                          ? "border-sky-400 bg-gradient-to-br from-blue-900/60 to-slate-900 shadow-md shadow-sky-500/10"
                          : "border-white/10 bg-white/5"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="inline-flex size-9 items-center justify-center rounded-full bg-sky-500/25 font-bold text-xs text-sky-200">
                          {participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-sky-200">
                          {participant.filter}
                        </span>
                      </div>
                      <p className="mt-3 text-xs font-bold text-white">{participant.name}</p>
                      <p className="text-[11px] text-sky-200/80">{participant.role}</p>
                    </div>
                  ))}
                </div>

                {/* Interactive Call Controls */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setMicMuted((m) => !m)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer",
                        micMuted
                          ? "bg-rose-500/20 text-rose-200 border border-rose-400/40"
                          : "bg-emerald-500/20 text-emerald-200 border border-emerald-400/40"
                      )}
                    >
                      <Mic className="size-3.5" />
                      <span>{micMuted ? "Unmute Mic" : "Mic Active"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setScreenSharing((s) => !s)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer",
                        screenSharing
                          ? "bg-sky-500/25 text-sky-200 border border-sky-400/40"
                          : "bg-white/10 text-slate-300"
                      )}
                    >
                      <MonitorUp className="size-3.5" />
                      <span>{screenSharing ? "Screen Share On" : "Share Screen"}</span>
                    </button>
                  </div>
                  <span className="text-[11px] text-sky-200/90">
                    Keep chatting on the right without leaving the call →
                  </span>
                </div>
              </div>

              {/* Right: Simultaneous Text Chat Next to Docked Call */}
              <div className="flex flex-col justify-between bg-white p-5 sm:p-6">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-600">
                        Side-by-Side Workspace
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900">
                        Room Text Chat &amp; Shared Links
                      </h4>
                    </div>
                    <Users className="size-4 text-slate-400" />
                  </div>

                  <div className="mt-4 space-y-3 text-xs">
                    <div className="rounded-xl bg-slate-50 p-3 border border-slate-200/80">
                      <span className="font-bold text-slate-900">Andrea Reyes:</span>{" "}
                      <span className="text-slate-600">
                        Dropping the Figma prototype link here while Marco shares his screen so nobody loses context.
                      </span>
                    </div>
                    <div className="rounded-xl bg-sky-50/70 p-3 border border-sky-200/80">
                      <span className="font-bold text-blue-900">Marco Santos:</span>{" "}
                      <span className="text-slate-700">
                        Love that the call stays docked at the top even when I switch over to answer a DM!
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/60 p-3.5">
                  <p className="text-xs font-bold text-blue-950">
                    Why Docked Calls Matter
                  </p>
                  <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                    Unlike traditional apps that lock your entire screen during a video call, ULAP docks the active room so you can browse channels, drop files, and reply to messages simultaneously.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 3: MARITESS HUB & NEARBY RADAR ── */}
          {activeTab === "maritess" && (
            <div className="p-5 sm:p-7 bg-white">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-200/80">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-900">
                      <Radar className="size-3 text-amber-700" /> Maritess Hub Local Radar
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                      <MapPin className="size-3 text-emerald-600" /> ~1km Approximate Privacy Zone
                    </span>
                  </div>
                  <h3 className="mt-2 text-base sm:text-lg font-extrabold text-slate-900">
                    Real-Time Community Updates · Verified by Neighbors with Totoo / Hindi Totoo Votes
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Click <strong className="text-emerald-700">Totoo</strong> or{" "}
                    <strong className="text-rose-700">Hindi Totoo</strong> to test community verification
                  </span>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {INITIAL_MARITESS_POSTS.map((post) => {
                  const userVote = votes[post.id];
                  const totooTotal = post.totooCount + (userVote === "totoo" ? 1 : 0);
                  const hindiTotal = post.hindiTotooCount + (userVote === "hindi" ? 1 : 0);

                  return (
                    <div
                      key={post.id}
                      className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-slate-50/50 p-4 shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded-md bg-blue-100 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-blue-800">
                            {post.category}
                          </span>
                          <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                            {post.badge}
                          </span>
                        </div>

                        <h4 className="mt-3 text-sm font-bold text-slate-900 leading-snug">
                          {post.title}
                        </h4>
                        <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                          {post.detail}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/80">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2.5">
                          <span>{post.author}</span>
                          <span>{post.distance} · {post.timeAgo}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleVote(post.id, "totoo")}
                            className={cn(
                              "inline-flex items-center justify-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
                              userVote === "totoo"
                                ? "border-emerald-600 bg-emerald-600 text-white shadow-xs"
                                : "border-emerald-200 bg-emerald-50/80 text-emerald-800 hover:bg-emerald-100"
                            )}
                          >
                            <CheckCircle2 className="size-3.5" />
                            <span>Totoo ({totooTotal})</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleVote(post.id, "hindi")}
                            className={cn(
                              "inline-flex items-center justify-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-bold transition-all cursor-pointer",
                              userVote === "hindi"
                                ? "border-rose-600 bg-rose-600 text-white shadow-xs"
                                : "border-rose-200 bg-rose-50/80 text-rose-800 hover:bg-rose-100"
                            )}
                          >
                            <AlertTriangle className="size-3.5" />
                            <span>Hindi ({hindiTotal})</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── TAB 4: CLOUD 9, PASSING CLOUDS & MARKETPLACE ── */}
          {activeTab === "cloud9" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80 bg-white">
              {/* Left: Cloud 9 (24h Stories) & Passing Clouds */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      Ephemeral Sky Feed
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Cloud 9 (24-Hour Status) &amp; Passing Clouds
                    </h3>
                  </div>
                  <Sparkles className="size-4 text-sky-500" />
                </div>

                {/* Cloud 9 Story Bubbles */}
                <div className="flex items-center gap-3 overflow-x-auto py-2">
                  {[
                    { name: "Your Cloud 9", sub: "+ Post 24h status", ring: "border-sky-400" },
                    { name: "Bianca M.", sub: "Coffee at BGC ☕", ring: "border-blue-600" },
                    { name: "Kevin T.", sub: "Pickleball night 🏓", ring: "border-indigo-500" },
                    { name: "Tita Baby", sub: "Sunday lutong bahay", ring: "border-emerald-500" },
                  ].map((story) => (
                    <div
                      key={story.name}
                      className="flex flex-col items-center text-center shrink-0 w-24"
                    >
                      <div
                        className={cn(
                          "flex size-12 items-center justify-center rounded-full border-2 bg-sky-50 text-xs font-extrabold text-blue-700",
                          story.ring
                        )}
                      >
                        <Cloud className="size-5 text-blue-600" />
                      </div>
                      <span className="mt-1 text-[11px] font-bold text-slate-800 truncate w-full">
                        {story.name}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate w-full">
                        {story.sub}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Passing Clouds Cards */}
                <div className="mt-4 space-y-2.5">
                  <div className="rounded-2xl border border-sky-200/90 bg-gradient-to-r from-sky-50/90 to-blue-50/50 p-3.5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-blue-700">
                      <span>☁️ Passing Cloud · ~1.2km away</span>
                      <span>24h Auto-Expire</span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-slate-800 italic">
                      &ldquo;Anyone around Makati Poblacion down for late-night board games or acoustic open mic tonight?&rdquo;
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                      <span>☁️ Passing Cloud · ~900m away</span>
                      <span>Opt-in Discovery</span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-slate-700 italic">
                      &ldquo;Looking for a weekend running club around UP Diliman oval — 5K pace!&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Community Marketplace */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      Local Buy &amp; Sell
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900">
                      ULAP Community Marketplace
                    </h3>
                  </div>
                  <ShoppingBag className="size-4 text-emerald-600" />
                </div>
                <p className="text-xs text-slate-600 mb-4">
                  Browse verified neighborhood listings and message sellers directly in ULAP with one tap:
                </p>

                <div className="space-y-3">
                  {[
                    {
                      title: "Keychron Q1 Pro Wireless Mechanical Keyboard",
                      price: "₱6,500",
                      location: "Pasig · ~1.0km away",
                      seller: "Verified Neighbor · 4.9★",
                    },
                    {
                      title: "Homemade Ube Cheese Pandesal Box (Fresh Batch)",
                      price: "₱280 / box",
                      location: "Mandaluyong · ~600m away",
                      seller: "Local Home Baker · Instant Chat",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 p-3.5 hover:border-blue-300 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-emerald-100 px-2 py-0.5 font-mono text-xs font-extrabold text-emerald-900">
                            {item.price}
                          </span>
                          <span className="text-[11px] font-medium text-slate-500">
                            {item.location}
                          </span>
                        </div>
                        <h4 className="mt-1 text-xs sm:text-sm font-bold text-slate-900">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500">{item.seller}</p>
                      </div>
                      <a
                        href="https://chat.boundlessits.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1 rounded-xl bg-blue-600 hover:bg-blue-700 px-3 py-2 text-[11px] font-bold text-white transition-colors"
                      >
                        <Share2 className="size-3" />
                        <span>Chat Seller</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

