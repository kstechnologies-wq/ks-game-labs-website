// Central game data. Add a new game by adding a new object to this array —
// no other file needs to change for it to appear on the site.
const GAMES = [
  {
    id: "gridsnap",
    name: "GridSnap",
    genre: "Puzzle",
    platform: ["Android"],
    version: "1.0.0",
    description: "A fun and challenging puzzle game with Arrow Puzzle and Dot Puzzle modes — slide tiles, connect dots, and beat hundreds of levels.",
    icon: "🧩",       // emoji fallback icon (no artwork uploaded yet)
    iconImg: "",       // set to e.g. "assets/gridsnap/icon.png" once available
    screenshots: [],   // add paths e.g. "assets/gridsnap/screenshot-1.png"
    downloadType: "apk",   // "apk" | "googlePlay" | "both"
    apkUrl: "YOUR_APK_URL",
    googlePlayUrl: "",
    features: ["Arrow Puzzle & Dot Puzzle modes", "Daily challenges", "Hints & undo", "Offline play"]
  },
  {
    id: "ticx",
    name: "TicX",
    genre: "Strategy",
    platform: ["Android"],
    version: "1.0.0",
    description: "TicX brings the timeless classic Tic Tac Toe to your phone with a fresh, modern design and exciting new features.",
    icon: "⭕",
    iconImg: "assets/ticx/icon.png",
    screenshots: [
      "assets/ticx/screenshot-1.png",
      "assets/ticx/screenshot-2.png",
      "assets/ticx/screenshot-3.png",
      "assets/ticx/screenshot-4.png",
      "assets/ticx/screenshot-5.png",
      "assets/ticx/screenshot-6.png",
      "assets/ticx/screenshot-7.png",
      "assets/ticx/screenshot-8.png"
    ],
    downloadType: "apk",
    apkUrl: "https://drive.google.com/uc?export=download&id=1AQX7huaAAOyFxyE_AOC__AA6ZQQmJkT0",
    googlePlayUrl: "",
    features: [
      "Play offline anytime, no internet needed",
      "Classic 2-player mode",
      "Daily challenges",
      "Multiple game themes",
      "Track your statistics",
      "Unlock achievements and rewards"
    ]
  }
];

const UPDATES = [
  { date: "COMING SOON", title: "GridSnap — Official Launch", desc: "Our flagship puzzle game is on its way. Stay tuned for the release date." },
  { date: "COMING SOON", title: "TicX Available Off-Store", desc: "TicX will be available soon via direct APK download." }
];
