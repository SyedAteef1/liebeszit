"use client";
import { useState, useEffect } from "react";

function SubtaskCard({ subtask, index }) {
  const [showAssign, setShowAssign] = useState(false);
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const slackUserId = localStorage.getItem('slack_user_id');
    if (slackUserId) {
      fetchChannels(slackUserId);
    }
  }, []);

  const fetchChannels = async (userId) => {
    try {
      const res = await fetch(`https://localhost:5000/api/list_conversations?user_id=${userId}`);
      const data = await res.json();
      if (data.channels) {
        setChannels(data.channels);
      }
    } catch (err) {
      console.error("Error fetching channels:", err);
    }
  };

  const assignToSlack = async () => {
    if (!selectedChannel) return;
    setSending(true);
    
    const slackUserId = localStorage.getItem('slack_user_id');
    const message = `📝 *New Task Assignment*\n\n*Task:* ${subtask.title}\n*Description:* ${subtask.description}\n*Assigned to:* ${subtask.assigned_to}\n*Deadline:* ${subtask.deadline}\n*Output:* ${subtask.output}`;
    
    try {
      await fetch("https://localhost:5000/api/send_message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: slackUserId,
          channel: selectedChannel,
          text: message,
        }),
      });
      setShowAssign(false);
      setSelectedChannel("");
    } catch (err) {
      console.error("Error sending to Slack:", err);
    }
    setSending(false);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg mb-3">
      <div className="flex justify-between mb-2">
        <strong className="text-sm">{index + 1}. {subtask.title}</strong>
        <span className="text-xs text-green-400">{subtask.deadline}</span>
      </div>
      <p className="text-xs text-gray-400 mb-2">{subtask.description}</p>
      <div className="flex gap-4 text-xs text-gray-500 mb-3">
        <span>👤 {subtask.assigned_to}</span>
        <span>📦 {subtask.output}</span>
        <span>✅ {subtask.clarity_score}%</span>
      </div>
      
      {!showAssign ? (
        <button
          onClick={() => setShowAssign(true)}
          className="text-xs px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
        >
          Assign to Slack
        </button>
      ) : (
        <div className="mt-2 p-3 bg-black rounded border border-gray-700">
          <label className="block text-xs mb-2 text-gray-400">Select Channel:</label>
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs mb-2"
          >
            <option value="">-- Select Channel --</option>
            {channels.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {ch.is_channel ? '#' : ''}{ch.name || 'Direct Message'}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={assignToSlack}
              disabled={!selectedChannel || sending}
              className="flex-1 text-xs px-3 py-1 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send"}
            </button>
            <button
              onClick={() => setShowAssign(false)}
              className="flex-1 text-xs px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AITaskAssistant({ repo, githubToken }) {
  const [task, setTask] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [status, setStatus] = useState("idle");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [plan, setPlan] = useState(null);
  const [logs, setLogs] = useState([]);
  const [searchQueries, setSearchQueries] = useState([]);

  const addLog = (msg) => {
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);
    console.log(msg);
  };

  const analyzeTask = async () => {
    addLog("🚀 Starting task analysis with repo context...");
    setStatus("analyzing");
    
    try {
      const [owner, repoName] = repo?.full_name?.split('/') || [];
      
      addLog("📡 Calling /api/analyze endpoint");
      addLog(`📦 Analyzing repo: ${owner}/${repoName}`);
      
      const res = await fetch("https://localhost:5000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          task,
          owner,
          repo: repoName,
          github_token: githubToken
        }),
      });
      
      addLog(`✅ Response status: ${res.status}`);
      const data = await res.json();
      addLog(`📦 Response data: ${JSON.stringify(data)}`);
      
      setSessionId(data.session_id);
      
      if (data.status === "needs_context") {
        addLog(`🔍 AI needs to search codebase: ${data.search_queries?.length} queries`);
        setStatus("needs_context");
        setSearchQueries(data.search_queries || []);
        addLog("🔎 Searching repository for relevant code...");
        setTimeout(() => generatePlan(data.session_id), 1000);
      } else if (data.status === "clear") {
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
    <div className="bg-gray-900 border border-[#4C3BCF]/30 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">🤖 AI Task Assistant</h3>
      
      {/* Input Section */}
      <div className="mb-4">
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="e.g., Build the Feeta AI dashboard in dark mode"
          className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#4C3BCF] min-h-[80px]"
        />
        <button
          onClick={analyzeTask}
          disabled={!task || status === "analyzing"}
          className="mt-2 px-6 py-3 bg-[#4C3BCF] rounded-lg hover:bg-[#4C3BCF]/80 disabled:opacity-50"
        >
          {status === "analyzing" ? "Analyzing..." : "Analyze Task"}
        </button>
      </div>

      {/* Context Search Section */}
      {status === "needs_context" && searchQueries.length > 0 && (
        <div className="bg-black border border-yellow-700 rounded-lg p-6 mb-4">
          <h4 className="font-semibold mb-3 text-yellow-400">🔍 Analyzing Codebase</h4>
          <p className="text-sm text-gray-400 mb-3">AI is searching for relevant code...</p>
          {searchQueries.map((q, i) => (
            <div key={i} className="text-xs text-yellow-300 mb-1">• {q}</div>
          ))}
          <div className="mt-3 text-sm text-gray-500">Generating implementation plan...</div>
        </div>
      )}

      {/* Questions Section */}
      {status === "ambiguous" && questions.length > 0 && (
        <div className="bg-black border border-gray-700 rounded-lg p-6 mb-4">
          <h4 className="font-semibold mb-3 text-[#4C3BCF]">❓ Clarification Needed</h4>
          {questions.map((q, i) => (
            <div key={i} className="mb-4">
              <label className="block mb-2 text-sm">{q}</label>
              <input
                type="text"
                onChange={(e) => setAnswers({ ...answers, [`q${i}`]: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4C3BCF]"
              />
            </div>
          ))}
          <button
            onClick={() => generatePlan()}
            className="w-full px-4 py-3 bg-green-600 rounded-lg hover:bg-green-700"
          >
            Generate Plan
          </button>
        </div>
      )}

      {/* Plan Section */}
      {plan && (
        <div className="bg-black border border-green-700 rounded-lg p-6 mb-4">
          <h4 className="font-semibold mb-3 text-green-400">📋 {plan.main_task}</h4>
          <p className="mb-4 text-sm text-gray-400">{plan.goal}</p>
          
          <h5 className="font-semibold mb-2">Subtasks:</h5>
          {plan.subtasks?.map((sub, i) => (
            <SubtaskCard key={i} subtask={sub} index={i} />
          ))}
        </div>
      )}

      {/* Logs Section */}
      <div className="bg-black border border-gray-700 rounded-lg p-4">
        <h5 className="font-semibold mb-2 text-sm">📊 Console Logs</h5>
        <div className="bg-black p-3 rounded max-h-[200px] overflow-auto font-mono text-xs">
          {logs.map((log, i) => (
            <div key={i} className="text-green-400 mb-1">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
