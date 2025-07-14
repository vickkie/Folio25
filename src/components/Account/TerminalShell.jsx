import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
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
    "👾 UziShell Booting...",
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
    sudo: {
      description: "Gain dev access",
      action: () => ["> 🛡️  Access Denied. You're not root... yet 👀"],
    },
  };

  const handleCommand = async (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const command = commands[trimmed];

    if (command) {
      const output = command.action((newMode) => {
        setMode(newMode);
        setFormData({});
        setStepIndex(0);
        setWaitingForCommand(newMode === "idle");
      });

      if (trimmed === "clear") {
        setLogs([]);
      } else {
        setLogs((prev) => [...prev, `> ${trimmed}`, ...(Array.isArray(output) ? output : [output])]);
        if (["register", "login"].includes(trimmed)) {
          setWaitingForCommand(false);
        }
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
    <div className="bg-black text-green-400 font-mono p-4 h-screen overflow-y-auto">
      {logs.map((line, i) => (
        <div key={i}>{line}</div>
      ))}

      <form onSubmit={handleInputSubmit} className="flex mt-2">
        <span className="mr-2">&gt;</span>
        <input
          type={currentPrompt?.type || "text"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-black text-green-400 border-none outline-none w-full"
          autoFocus
        />
      </form>

      <div ref={terminalRef} />
    </div>
  );
};

export default TerminalShell;
