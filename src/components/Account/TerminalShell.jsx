import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./terminal.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_PORT;

import { AuthContext } from "../contexts/AuthContext";
const registerPrompts = [
  { key: "username", label: "Enter your username" },
  { key: "firstname", label: "Enter your first name" },
  { key: "lastname", label: "Enter your last name" },
  { key: "email", label: "Enter your email" },
  { key: "password", label: "Enter your password", type: "password" },
  { key: "phone", label: "Enter your phone number" },
  { key: "bypass", label: "Enter Reference Admin code" },
];

const loginPrompts = [
  { key: "email", label: "Enter your email" },
  { key: "password", label: "Enter your password", type: "password" },
];

const TerminalShell = () => {
  const [logs, setLogs] = useState([
    "👾 UziShell Terminal",
    `██████╗ ██╗   ██╗███████╗██╗     ██╗ ██████╗ `,
    `██╔══██╗██║   ██║██╔════╝██║     ██║██╔════╝ `,
    `██████╔╝██║   ██║█████╗  ██║     ██║██║  ███╗`,
    `██╔═══╝ ██║   ██║██╔══╝  ██║     ██║██║   ██║`,
    `██║     ╚██████╔╝███████╗███████╗██║╚██████╔╝`,
    `╚═╝      ╚═════╝ ╚══════╝╚══════╝╚═╝ ╚═════╝ `,
    "Type `register` or `login` to begin. Type `help` for commands.",
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.redirect || "/dashboard";

  const { setAuthData } = useContext(AuthContext);

  const [mode, setMode] = useState("idle"); // 'idle' | 'register' | 'login'
  const [formData, setFormData] = useState({});
  const [input, setInput] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [waitingForCommand, setWaitingForCommand] = useState(true);
  const terminalRef = useRef();

  const scrollToBottom = () => {
    terminalRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [logs]);

  const promptList = mode === "register" ? registerPrompts : loginPrompts;
  const currentPrompt = promptList[stepIndex];

  const [rootAccess, setRootAccess] = useState(false);
  const [currentDir, setCurrentDir] = useState("~");

  const fakeFileSystem = {
    "~": ["📂 projects", "📂 src", "📂 node_modules", "📂 README.md", "📂 package.json"],
    projects: ["uzi-ai", "nuker-app", "haxx"],
    src: ["App.jsx", "TerminalShell.jsx", "auth"],
    "src/auth": ["login.js", "register.js"],
    haxx: ["virus.exe", "payload.sh"],
  };

  const commands = {
    help: {
      description: "List available commands",
      action: () => [
        "> Available commands:",
        ...Object.keys(commands).map((key) => `- ${key}: ${commands[key].description}`),
      ],
    },
    clear: {
      description: "Clear the terminal",
      action: () => [],
    },
    register: {
      description: "Start registration",
      action: (setState) => {
        setState("register");
        return [`> register`, `> ${registerPrompts[0].label}`];
      },
    },
    login: {
      description: "Start login",
      action: (setState) => {
        setState("login");
        return [`> login`, `> ${loginPrompts[0].label}`];
      },
    },
    whoami: {
      description: "Show current user",
      action: () => {
        const user = localStorage.getItem("user");
        return ["> whoami", user ? user : "> You're not logged in"];
      },
    },
    ls: {
      description: "List directory contents",
      action: () => {
        const items = fakeFileSystem[currentDir] || [];
        if (items.length === 0) return ["> ls", "📂 (empty directory)"];
        return ["> ls", ...items.map((i) => `- ${i}`)];
      },
    },
    cd: {
      description: "Change directory",
      action: (_setMode, _setLogs, input = "") => {
        const args = input.trim().split(" ");
        if (args.length < 2) return ["> cd", "❗ Usage: cd <folder>"];

        const target = args[1];
        const base = currentDir === "~" ? "" : currentDir + "/";
        const newPath = base + target;

        if (fakeFileSystem[newPath]) {
          setCurrentDir(newPath);
          return ["> cd " + target, `📂 Moved to ${newPath}`];
        }

        return ["> cd " + target, `❌ Directory '${target}' not found`];
      },
    },

    sudo: {
      description: "Try sudo access",
      action: (_setMode, _setLogs, input = "") => {
        const args = input.trim().toLowerCase();

        if (args === "sudo uzi --power") {
          setRootAccess(true);
          return [
            "> sudo uzi --power",
            "🧠 Root access granted...",
            "✨ Welcome, Superuser Uzi Trake",
            "Type `format`, `inject`, or `shutdown` to proceed.",
          ];
        }

        return ["> sudo", "🛡️  Access Denied. You're not root... yet 👀"];
      },
    },
    mkdir: {
      description: "Create a directory",
      action: (setState) => {
        setState("idle");
        return ["> mkdir", "you dont have permission to create a directory"];
      },
    },

    exit: {
      description: "Exit to main shell",
      action: (setState) => {
        setState("idle");
        return ["> Exited to main shell"];
      },
    },
    custom: {
      description: "Test custom command",
      action: () => ["> 🧪 This is a custom command!"],
    },
    quote: {
      description: "Get a random motivational quote",
      action: () => {
        const quotes = [
          "🚀 'Stay hungry, stay foolish.' – Steve Jobs",
          "🔥 'Code is like humor. When you have to explain it, it’s bad.' – Cory House",
          "🌍 'The best way to predict the future is to invent it.' – Alan Kay",
          "😤 'No pressure, no diamonds.' – Thomas Carlyle",
          "💡 'Simplicity is the soul of efficiency.' – Austin Freeman",
        ];
        const pick = quotes[Math.floor(Math.random() * quotes.length)];
        return ["> quote", pick];
      },
    },

    banner: {
      description: "Print a cool ASCII banner",
      action: () => [
        "> banner",
        `██████╗ ██╗   ██╗███████╗██╗     ██╗ ██████╗ `,
        `██╔══██╗██║   ██║██╔════╝██║     ██║██╔════╝ `,
        `██████╔╝██║   ██║█████╗  ██║     ██║██║  ███╗`,
        `██╔═══╝ ██║   ██║██╔══╝  ██║     ██║██║   ██║`,
        `██║     ╚██████╔╝███████╗███████╗██║╚██████╔╝`,
        `╚═╝      ╚═════╝ ╚══════╝╚══════╝╚═╝ ╚═════╝ `,
        `              Welcome to UziShell 🧠`,
      ],
    },

    date: {
      description: "Show the current date and time",
      action: () => ["> date", `🕒 ${new Date().toLocaleString()}`],
    },

    fortune: {
      description: "Consult the chaotic developer oracle 🧙‍♂️",
      action: () => {
        const fortunes = [
          "🧠 Your brain will buffer today. Refresh recommended.",
          "🐛 The bug knows you’re looking for it and moved.",
          "🔥 You will fix one thing and break three unrelated things.",
          "🧪 It works. You don’t know why. Do not touch it.",
          "👁️ The error message is gaslighting you.",
          "🧱 The problem is a missing semicolon. Yes, really.",
          "🧃 You will debug for hours and it will be a typo.",
          "🕳️ You are about to fall into a documentation hole.",
          "🧠 StackOverflow will judge you silently.",
          "🧙‍♂️ A random comment from 2017 will save you.",
          "📦 node_modules weighs more than your OS.",
          "🧟‍♂️ Dead code is still alive and angry.",
          "🎭 You will pretend you understand async.",
          "🧨 The fix will feel illegal but work.",
          "🧊 Cold coffee. Hot bugs.",
          "🌀 Infinite loop detected (in your thoughts).",
          "🪦 You will delete code and everything improves.",
          "🤡 You will console.log the same thing 12 times.",
          "📉 Your confidence will drop after running tests.",
          "📈 Your confidence will rise after commenting them out.",
          "🔁 Have you tried restarting? Be honest.",
          "🧪 The test failed because it felt like it.",
          "🪤 The bug was introduced by past-you. Past-you denies it.",
          "🧠 You will refactor and accidentally invent a new bug species.",
          "🧃 Memory leak detected. In your brain.",
          "🛑 You will ignore a warning. It will matter.",
          "📡 The network request is haunted.",
          "🧯 Production is on fire but vibes are calm.",
          "👀 Someone will say “it works on my machine.” It’s you.",
          "🧵 Race condition? Or fate?",
          "🧪 The fix is one line. You changed 40.",
          "🧙‍♀️ You will summon a bug by renaming a variable.",
          "🧬 Schrödinger’s bug: fixed and broken until observed.",
          "📚 The docs explain it. You refuse to read them.",
          "🧠 Sleep is deprecated in this build.",
          "🗑️ You will delete something important. Probably.",
          "🔮 A dependency update will ruin your day.",
          "🧯 You will hotfix and immediately regret it.",
          "🧃 Your code compiles out of pity.",
          "🧱 You will fight CSS and lose.",
          "🤖 The linter knows your sins.",
          "🪞 You are the edge case.",
          "🎲 You will change something “just to see”.",
          "🏁 It works. Ship it. Don’t ask questions."
        ];
    
        return [
          "> fortune",
          fortunes[Math.floor(Math.random() * fortunes.length)],
        ];
      },
    },
    
    

    format: {
      description: "Wipe the entire simulated OS (fake)",
      action: async (_setMode, setLogs) => {
        if (!rootAccess) {
          return ["⛔ Permission denied. Try `sudo uzi --power`"];
        }

        const steps = [
          "💣 Formatting virtual disk...",
          "█░░░░░░░░░░ 10%",
          "███░░░░░░░░ 30%",
          "██████░░░░░ 60%",
          "███████████ 100%",
          "✔ Format complete. Everything is gone. Or is it? 👀",
        ];

        setLogs((prev) => [...prev, "> format"]);
        for (let step of steps) {
          await new Promise((res) => setTimeout(res, 600));
          setLogs((prev) => [...prev, step]);
        }

        return null;
      },
    },

    inject: {
      description: "Inject a payload (just for kicks)",
      action: () => {
        if (!rootAccess) return ["> inject", "⚠️  Access denied. Root access needed."];
        return [
          "> inject",
          "🧬 Injecting payload into system...",
          "🦠 Virus uploaded successfully.",
          "💀 Target IP: 1.1.1.1",
          "🔥 Status: SYSTEM OVERRIDE INITIATED",
        ];
      },
    },

    shutdown: {
      description: "Shutdown the system",
      action: () => {
        if (!rootAccess) return ["> shutdown", "⚠️ You must be root to shutdown the system."];

        flashTerminal(); // simulate red flash

        setTimeout(() => {
          const shell = document.querySelector(".terminal-box");
          if (shell) {
            shell.innerHTML = `
          <div class="h-screen bg-black text-green-400 flex items-center justify-center text-xl">
            🧠 SYSTEM HALTED. <br /> Press F5 to restart.
          </div>`;
          }
        }, 10000);

        return [
          "> shutdown",
          "🛑 SYSTEM SHUTDOWN IN 3...",
          "2...",
          "1...",
          "💤 Goodbye, Trake...",
          "💀 Shell terminated.",
        ];
      },
    },
    reboot: {
      description: "Restart the terminal ",
      action: () => {
        window.location.reload();
        return ["> rebooting..."];
      },
    },
    neofetch: {
      description: "Display system info with sexy Arch logo 🔷",
      action: () => {
        const uptime = `${Math.floor(Math.random() * 10)}h ${Math.floor(Math.random() * 60)}m`;
        const usedMem = (Math.random() * 6 + 4).toFixed(1); // 4–10GB
        const totalMem = 16;

        return [
          "> neofetch",
          "                      -`                        uzi@uzi-arch",
          "                     .o+`                       -----------------------",
          "                    `ooo/                       OS: UziShellOS (Arch Base)",
          "                   `+oooo:                      Host: 🧠 Virtual HaxxCore",
          "                  `+oooooo:                     Kernel: ReactJS v18.2 + Vite",
          "                  -+oooooo+:                    Uptime: " + uptime,
          "                `/:-:++oooo+:`                  Packages: 777 (npm), 42 (custom)",
          "               `/++++/+++++++:`                 Shell: cyberzsh (uzi mod)",
          "              `/++++++++++++++:                Terminal: WebTermUX",
          "             `/+++ooooooooooooo/`              CPU: i9 NeuralCore 13900K",
          "            ./ooosssso++osssssso+`             GPU: RTX Vanta v2.1 (Virtual)",
          "           .oossssso-````/ossssss+`            Memory: " + usedMem + "GiB / " + totalMem + "GiB",
          "          -osssssso.      :ssssssso.           DE: UziMate 1.0",
          "         :osssssss/        osssso+++.          WM: HaxWM (custom build)",
          "        /ossssssss/        +ssssooo/-          Theme: Synthwave Matrix",
          "      `/ossssso+/:-        -:/+osssso/.        Icons: cyberpunk-icons [GTK2/3]",
          "     `+sso+:-`                 `.-/+oso:       Font: JetBrainsMono Nerd 14",
          "    `++:.                           `-/+/      Resolution: 1920x1080",
          "    .`                                        ",
        ];
      },
    },

    install: {
      description: "Install package on server",
      action: async (_setMode, setLogs, input = "") => {
        if (!rootAccess) {
          return ["⛔ Permission denied. Try `sudo uzi --power`"];
        }

        const parts = input.trim().split(" ");
        const pkg = parts[1];

        if (!pkg) {
          return ["> install", "❓ Specify a package to install. Example: `install matrix-driver`"];
        }

        const steps = [
          `📦 Fetching package: ${pkg}...`,
          `🔧 Resolving dependencies...`,
          `📁 Installing ${pkg}@1.0.0`,
          `🔩 Linking binaries...`,
          `🧪 Running post-install hooks...`,
          `✅ ${pkg} installed successfully!`,
          `⚠️  Warning: You've unlocked unstable dev powers.`,
        ];

        setLogs((prev) => [...prev, `> install ${pkg}`]);

        for (let step of steps) {
          await new Promise((res) => setTimeout(res, 600));
          setLogs((prev) => [...prev, step]);
        }

        return null;
      },
    },

    rm: {
      description: "Delete everything (fake, chill)",
      action: async (_setMode, setLogs) => {
        const output = [];

        const log = (line) => {
          output.push(line);
          setLogs((prev) => [...prev, line]);
        };

        log("> rm -rf /");
        await new Promise((r) => setTimeout(r, 500));
        log("🔥 Warning: Deleting everything...");

        const fakeFiles = [
          "Deleting /etc/passwd...",
          "Deleting /usr/bin/bash...",
          "Deleting /home/uzi/codebase...",
          "Deleting /opt/memes/collection.zip...",
          "Deleting /var/log/this_joke.log...",
          "Deleting /System32 (even though you're on Linux?)...",
          "Deleting your browser history 😳...",
          "Deleting your terminal...",
        ];

        for (let i = 0; i < fakeFiles.length; i++) {
          await new Promise((r) => setTimeout(r, 400));
          log(`🗑️  ${fakeFiles[i]}`);
        }

        await new Promise((r) => setTimeout(r, 600));
        log("💣 BOOM. System files nuked.");
        await new Promise((r) => setTimeout(r, 800));
        log("😅 Just kidding. Your files are safe.");
        return null; // prevent double logging
      },
    },
  };

  // Fake alert effect
  const flashTerminal = () => {
    const terms = document.querySelectorAll(".terminal");
    if (!terms) return;
    terms.forEach((term) => {
      term.classList.add("alert");
      setTimeout(() => term.classList.remove("alert"), 10000);
    });
  };
  const handleCommand = async (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const base = trimmed.split(" ")[0];
    const command = commands[base];

    if (command) {
      if (base === "clear") {
        setLogs([]);
        return;
      }

      const result = await command.action(
        (newMode) => {
          setMode(newMode);
          setFormData({});
          setStepIndex(0);
          setWaitingForCommand(newMode === "idle");
        },
        setLogs,
        trimmed // <-- pass lowercase trimmed input here
      );

      if (result && Array.isArray(result)) {
        setLogs((prev) => [...prev, `> ${cmd}`, ...result]);
      } else if (typeof result === "string") {
        setLogs((prev) => [...prev, `> ${cmd}`, result]);
      }
    } else {
      setLogs((prev) => [...prev, `> ${cmd}`, "> Unknown command. Try `help`"]);
    }
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    const value = input;
    setInput("");

    if (waitingForCommand) {
      await handleCommand(value);
      return;
    }

    const prompt = promptList[stepIndex];
    const updatedData = { ...formData };

    // 👇 Add current input into formData
    if (!prompt.optional || value.trim() !== "") {
      updatedData[prompt.key] = value;
    }

    setFormData(updatedData);
    setLogs((prev) => [...prev, `> ${prompt.label}`, `> ${value || "[skipped]"}`]);

    if (stepIndex + 1 < promptList.length) {
      // 👇 Go to next step
      setStepIndex((prev) => prev + 1);
      setLogs((prev) => [...prev, `> ${promptList[stepIndex + 1].label}`]);
    } else {
      // ✅ Final step — submit
      const action = mode;
      const BYPASS_KEY = updatedData.bypass || "";
      const { bypass, ...payload } = updatedData;

      const isRegister = action === "register";
      const route = isRegister
        ? `${BACKEND_URL}/api/register?bypass=${encodeURIComponent(BYPASS_KEY)}`
        : `${BACKEND_URL}/api/login`;

      setLogs((prev) => [...prev, `> Submitting ${action} data...`]);

      try {
        const res = await axios.post(route, payload, {
          withCredentials: true,
        });

        if (res.status === 200 || res.status === 201) {
          setAuthData(res.data);

          navigate(redirectTo);
        }

        setLogs((prev) => [
          ...prev,
          `>  ${action} successful.`,
          `> Welcome, ${res.data?.user?.username || "user"}`,
          `> Type 'exit' to return`,
        ]);
      } catch (err) {
        const msg = err?.response?.data?.message || "❌ Something went wrong.";
        setLogs((prev) => [...prev, `> ${msg}`]);
      }

      // 🧼 Reset for next session
      setMode("idle");
      setStepIndex(0);
      setWaitingForCommand(true);
      setFormData({});
    }
  };

  return (
    <div className="terminal-box bg-black text-green-400 font-mono p-4 h-screen overflow-y-auto">
      {logs.map((line, i) => (
        <pre key={i} className="whitespace-pre">
          {line}
        </pre>
      ))}

      <form onSubmit={handleInputSubmit} className="flex mt-2">
        <span className="terminal mr-2">{rootAccess ? "#" : ">"}</span>
        <input
          type={currentPrompt?.type || "text"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="terminal bg-black text-green-400 border-none outline-none w-full"
          autoFocus
        />
      </form>

      <div ref={terminalRef} />
    </div>
  );
};

export default TerminalShell;
