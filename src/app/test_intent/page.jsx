"use client";
import { useState } from "react";

export default function TestIntent() {
  const [task, setTask] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [status, setStatus] = useState("idle");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [plan, setPlan] = useState(null);
  const [logs, setLogs] = useState([]);
  const [showRepo, setShowRepo] = useState(false);
  const [githubToken, setGithubToken] = useState("");
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [repoSummary, setRepoSummary] = useState(null);

  const addLog = (msg) => {
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);
    console.log(msg);
  };

  const analyzeTask = async () => {
    addLog("🚀 Starting task analysis...");
    setStatus("analyzing");
    
    try {
      addLog("📡 Calling /api/analyze endpoint");
      const res = await fetch("https://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      });
      
      addLog(`✅ Response status: ${res.status}`);
      const data = await res.json();
      addLog(`📦 Response data: ${JSON.stringify(data)}`);
      
      setSessionId(data.session_id);
      
      if (data.status === "clear") {
        addLog("✅ Task is clear, generating plan...");
        setStatus("clear");
        generatePlan(data.session_id);
      } else {
        addLog(`❓ Task needs clarification (${data.questions?.length} questions)`);
        setStatus("ambiguous");
        setQuestions(data.questions || []);
      }
    } catch (err) {
      addLog(`❌ Error: ${err.message}`);
      setStatus("error");
    }
  };

  const generatePlan = async (sid = sessionId) => {
    addLog("🔧 Generating implementation plan...");
    setStatus("generating");
    
    try {
      addLog("📡 Calling /api/generate_plan endpoint");
      const res = await fetch("https://localhost:5000/api/generate_plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, session_id: sid, answers }),
      });
      
      addLog(`✅ Response status: ${res.status}`);
      const data = await res.json();
      addLog(`📦 Plan generated with ${data.subtasks?.length} subtasks`);
      
      setPlan(data);
      setStatus("complete");
    } catch (err) {
      addLog(`❌ Error: ${err.message}`);
      setStatus("error");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", background: "#0a0a0a", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>🤖 AI Task Breakdown Test</h1>
      
      {/* Toggle */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setShowRepo(false)}
          style={{ padding: "10px 20px", background: !showRepo ? "#0070f3" : "#2a2a2a", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Task Analysis
        </button>
        <button
          onClick={() => setShowRepo(true)}
          style={{ padding: "10px 20px", background: showRepo ? "#0070f3" : "#2a2a2a", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          GitHub Repo Analysis
        </button>
      </div>
      
      {/* GitHub Repo Section */}
      {showRepo && (
        <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>GitHub Token:</label>
          <input
            type="password"
            value={githubToken}
            onChange={(e) => setGithubToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxx"
            style={{ width: "100%", padding: "12px", background: "#2a2a2a", color: "#fff", border: "1px solid #444", borderRadius: "4px", marginBottom: "10px" }}
          />
          <button
            onClick={async () => {
              addLog("🔍 Fetching repositories...");
              try {
                const res = await fetch("https://localhost:5000/api/github/repos", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ github_token: githubToken }),
                });
                const data = await res.json();
                addLog(`✅ Found ${data.repos?.length} repositories`);
                setRepos(data.repos || []);
              } catch (err) {
                addLog(`❌ Error: ${err.message}`);
              }
            }}
            disabled={!githubToken}
            style={{ padding: "12px 24px", background: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Connect GitHub
          </button>

          {repos.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Select Repository:</label>
              <select
                value={selectedRepo}
                onChange={(e) => setSelectedRepo(e.target.value)}
                style={{ width: "100%", padding: "12px", background: "#2a2a2a", color: "#fff", border: "1px solid #444", borderRadius: "4px", marginBottom: "10px" }}
              >
                <option value="">-- Select a repo --</option>
                {repos.map((r) => (
                  <option key={r.full_name} value={r.full_name}>
                    {r.full_name} {r.language ? `(${r.language})` : ""}
                  </option>
                ))}
              </select>
              <button
                onClick={async () => {
                  addLog(`🚀 Analyzing ${selectedRepo}...`);
                  try {
                    const [owner, repo] = selectedRepo.split('/');
                    const res = await fetch("https://localhost:5000/api/github/analyze", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ owner, repo, github_token: githubToken }),
                    });
                    const data = await res.json();
                    addLog(`✅ Analysis complete`);
                    setRepoSummary(data);
                  } catch (err) {
                    addLog(`❌ Error: ${err.message}`);
                  }
                }}
                disabled={!selectedRepo}
                style={{ padding: "12px 24px", background: "#10b981", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Analyze Repository
              </button>
            </div>
          )}
        </div>
      )}

      {/* Repo Summary */}
      {repoSummary && showRepo && (
        <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>📦 {repoSummary.project_name}</h2>
          <p style={{ marginBottom: "15px", color: "#aaa" }}>{repoSummary.description}</p>
          <div style={{ marginBottom: "10px" }}>
            <strong>Tech Stack:</strong> {repoSummary.tech_stack?.join(", ")}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Features:</strong>
            <ul style={{ marginLeft: "20px", marginTop: "5px" }}>
              {repoSummary.main_features?.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Architecture:</strong> {repoSummary.architecture}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <strong>Total Files:</strong> {repoSummary.total_files}
          </div>
          <div>
            <strong>Folder Structure:</strong>
            <div style={{ background: "#2a2a2a", padding: "10px", borderRadius: "4px", marginTop: "5px", fontFamily: "monospace", fontSize: "13px" }}>
              {Object.entries(repoSummary.folder_structure || {}).map(([folder, desc]) => (
                <div key={folder} style={{ marginBottom: "5px" }}>
                  <span style={{ color: "#10b981" }}>📁 {folder}/</span> - {desc}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Section */}
      {!showRepo && (
      <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Enter Natural Task:</label>
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="e.g., Build the Feeta AI dashboard in dark mode"
          style={{ width: "100%", padding: "12px", background: "#2a2a2a", color: "#fff", border: "1px solid #444", borderRadius: "4px", minHeight: "80px" }}
        />
        <button
          onClick={analyzeTask}
          disabled={!task || status === "analyzing"}
          style={{ marginTop: "10px", padding: "12px 24px", background: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          {status === "analyzing" ? "Analyzing..." : "Analyze Task"}
        </button>
      </div>
      )}

      {/* Questions Section */}
      {!showRepo && status === "ambiguous" && questions.length > 0 && (
        <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>❓ Clarification Needed</h2>
          {questions.map((q, i) => (
            <div key={i} style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>{q}</label>
              <input
                type="text"
                onChange={(e) => setAnswers({ ...answers, [`q${i}`]: e.target.value })}
                style={{ width: "100%", padding: "10px", background: "#2a2a2a", color: "#fff", border: "1px solid #444", borderRadius: "4px" }}
              />
            </div>
          ))}
          <button
            onClick={() => generatePlan()}
            style={{ padding: "12px 24px", background: "#10b981", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Generate Plan
          </button>
        </div>
      )}

      {/* Plan Section */}
      {!showRepo && plan && (
        <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>📋 {plan.main_task}</h2>
          <p style={{ marginBottom: "20px", color: "#888" }}>{plan.goal}</p>
          
          <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Subtasks:</h3>
          {plan.subtasks?.map((sub, i) => (
            <div key={i} style={{ background: "#2a2a2a", padding: "15px", borderRadius: "4px", marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <strong>{i + 1}. {sub.title}</strong>
                <span style={{ color: "#10b981" }}>{sub.deadline}</span>
              </div>
              <p style={{ color: "#aaa", fontSize: "14px", marginBottom: "5px" }}>{sub.description}</p>
              <div style={{ display: "flex", gap: "15px", fontSize: "13px", color: "#888" }}>
                <span>👤 {sub.assigned_to}</span>
                <span>📦 {sub.output}</span>
                <span>✅ {sub.clarity_score}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Logs Section */}
      <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "8px" }}>
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>📊 Console Logs</h3>
        <div style={{ background: "#000", padding: "15px", borderRadius: "4px", maxHeight: "300px", overflow: "auto", fontFamily: "monospace", fontSize: "12px" }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: "5px", color: "#0f0" }}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
