import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./terminal.css";
import { AuthContext } from "../contexts/AuthContext";
const registerPrompts = [
  { key: "username", label: "Enter your username" },
  { key: "firstname", label: "Enter your first name" },
  { key: "lastname", label: "Enter your last name" },
  { key: "email", label: "Enter your email" },
  { key: "password", label: "Enter your password", type: "password" },
  { key: "phone", label: "Enter your phone number" },
];

const loginPrompts = [
  { key: "email", label: "Enter your email" },
  { key: "password", label: "Enter your password", type: "password" },
];

const TerminalShell = () => {
  const [logs, setLogs] = useState([
    "👾 UziShell Command Line",
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

    sudo: {
      description: "Try sudo access",
      action: (_setMode, _setLogs, input = "") => {
        const args = input.trim().toLowerCase();
        console.log("sudo args:", args);

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
      description: "See your developer fortune 🍀",
      action: () => {
        const fortunes = [
          "👾 You will debug something on the first try today.",
          "💻 Coffee will flow. Bugs will go.",
          "🚫 Avoid merging without testing. Trust me.",
          "🔮 A new framework will appear… again.",
          "🎯 Your code will pass all tests — eventually.",
        ];
        return ["> fortune", fortunes[Math.floor(Math.random() * fortunes.length)]];
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
      description: "Display system info in a stylish way",
      action: () => {
        const uptime = `${Math.floor(Math.random() * 5)}h ${Math.floor(Math.random() * 60)}m`;
        const usedMem = (Math.random() * 4 + 2).toFixed(1); // 2GB - 6GB
        const totalMem = 18;

        return [
          "> neofetch",
          "                 `.-/+osyhhhhyyso+:.`                 uzi@uzi-shell",
          "              .+hMMMMMMMMMMMMMMMMMMMd/`              --------------------",
          "            `oNMMMMMMMMMMMMMMMMMMMMMMMN+             OS: UziShellOS 1.0",
          "           :mMMMMMMMMMMMMMMMMMMMMMMMMMMm.            Host: 🧠 Virtual Superbrain",
          "          +MMMMMMMMMMMMMMMMMMMMMMMMMMMMM/            Kernel: 🤖 ReactJS v18",
          "         /MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM+            Uptime: " + uptime,
          "         yMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMs            Packages: 666 (npm)",
          "         sMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMs            Terminal: WebTerminal",
          "         .NMMMMMMMMMMMMMMMMMMMMMMMMMMMMm`            Shell: zsh (uzi-mod)",
          "          /NMMMMMMMMMMMMMMMMMMMMMMMMMMN+             CPU: 💻 QuantumCore i9",
          "           .dMMMMMMMMMMMMMMMMMMMMMMMMd-              Memory: " + usedMem + "GiB / " + totalMem + "GiB",
          "             -+shmMMMMMMMMMMMMMMmhs+:.               GPU: Imaginary RTX",
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
      description: "Delete everything",
      action: () => [
        "> rm -rf /",
        "🔥 Warning: Deleting everything...",
        "💣 BOOM. System files nuked.",
        "Just kidding. Your files are safe 😅",
      ],
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

    // manually build new formData including this step's input
    const updatedData = { ...formData };
    if (!prompt.optional || value.trim() !== "") {
      updatedData[prompt.key] = value;
    }

    setFormData(updatedData);
    setLogs((prev) => [...prev, `> ${prompt.label}`, `> ${value || "[skipped]"}`]);

    // If not at last step, go to next prompt
    if (stepIndex + 1 < promptList.length) {
      setStepIndex((prev) => prev + 1);
      setLogs((prev) => [...prev, `> ${promptList[stepIndex + 1].label}`]);
    } else {
      // Final step — submit form
      const action = mode;
      const BYPASS_KEY = import.meta.env.VITE_BYPASS_KEY || "BpassFolio";
      const route = `/api/${action}?bypass=${BYPASS_KEY}`;

      setLogs((prev) => [...prev, `> Submitting ${action} data...`]);

      try {
        const res = await axios.post(route, updatedData, {
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

      // Reset everything
      setMode("idle");
      setStepIndex(0);
      setWaitingForCommand(true);
      setFormData({});
    }
  };

  return (
    <div className="terminal-box bg-black text-green-400 font-mono p-4 h-screen overflow-y-auto">
      {logs.map((line, i) => (
        <div className="terminal" key={i}>
          {line}
        </div>
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
