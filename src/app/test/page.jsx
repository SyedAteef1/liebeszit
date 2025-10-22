'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AITaskAssistant from '@/components/AITaskAssistant';
import SlackConnectButton from '@/components/SlackConnectButton';

export default function TestPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [repos, setRepos] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [phase, setPhase] = useState('input');
  const [taskAnalysis, setTaskAnalysis] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [githubConnected, setGithubConnected] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('github_connected') === 'true') {
      checkGithubConnection();
      window.history.replaceState({}, '', '/test');
    }
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    
    try {
      const response = await fetch('https://localhost:5000/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
        return;
      }
      
      const data = await response.json();
      setUser(data.user);
      setGithubConnected(data.user.github_connected || false);
      loadProjects();
      if (data.user.github_connected) {
        fetchRepos();
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    }
  };

  const checkGithubConnection = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://localhost:5000/api/github/check_connection', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setGithubConnected(data.connected);
    } catch (error) {
      console.error('Error checking GitHub connection:', error);
    }
  };

  const loadProjects = () => {
    const saved = localStorage.getItem('projects');
    if (saved) setProjects(JSON.parse(saved));
  };

  const saveProjects = (updatedProjects) => {
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const fetchRepos = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://localhost:5000/github/api/repos', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setRepos(data);
      }
    } catch (error) {
      console.error('Error fetching repos:', error);
    }
  };

  const createProject = () => {
    if (!newProjectName.trim()) return;
    const newProject = {
      id: Date.now(),
      name: newProjectName,
      repo: null,
      tasks: [],
      createdAt: new Date().toISOString()
    };
    const updated = [...projects, newProject];
    saveProjects(updated);
    setNewProjectName('');
    setShowCreateModal(false);
    setSelectedProject(newProject);
  };

  const connectRepoToProject = (repo) => {
    const updated = projects.map(p => 
      p.id === selectedProject.id ? { ...p, repo } : p
    );
    saveProjects(updated);
    setSelectedProject({ ...selectedProject, repo });
  };

  const analyzeTask = async (withAnswers = false) => {
    if (!taskInput || !selectedProject?.repo) return;
    
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const response = await fetch('https://localhost:5000/github/api/analyze_task', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          owner: selectedProject.repo.owner.login,
          repo: selectedProject.repo.name,
          task: taskInput,
          answers: withAnswers ? answers : undefined
        })
      });
      const data = await response.json();
      setTaskAnalysis(data);
      setPhase(data.phase);
    } catch (error) {
      console.error('Error analyzing task:', error);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const connectGithub = () => {
    const token = localStorage.getItem('token');
    window.location.href = `https://localhost:5000/github/install?token=${token}`;
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const submitAnswers = () => {
    analyzeTask(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/Images/F2.png" alt="Logo" width={32} height={32} className="rounded-md" />
            <div className="text-2xl font-extrabold">Feeta AI</div>
          </div>
          <div className="flex items-center gap-6">
            {user && <span className="text-sm text-gray-400">👤 {user.name}</span>}
            {!githubConnected && (
              <button
                onClick={connectGithub}
                className="text-sm bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Connect GitHub
              </button>
            )}
            {githubConnected && <span className="text-sm text-green-400">✓ GitHub</span>}
            <SlackConnectButton />
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
            >Logout</button>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-800 p-4">
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full bg-[#4C3BCF] px-4 py-3 rounded-lg hover:bg-[#4C3BCF]/80 mb-4 font-medium"
          >
            + Create Project
          </button>
          
          <div className="space-y-2">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedProject?.id === project.id
                    ? 'bg-[#4C3BCF]/20 border border-[#4C3BCF]'
                    : 'bg-gray-900 hover:bg-gray-800 border border-gray-800'
                }`}
              >
                <div className="font-medium">{project.name}</div>
                {project.repo && (
                  <div className="text-xs text-gray-400 mt-1">📁 {project.repo.name}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {!selectedProject ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <p className="text-xl mb-2">No project selected</p>
                <p className="text-sm">Create or select a project to get started</p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">{selectedProject.name}</h1>

              {/* Connect Repo */}
              {!selectedProject.repo ? (
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Connect Repository</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Connect a GitHub repository to provide context for AI analysis
                  </p>
                  <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                    {repos.map((repo) => (
                      <div
                        key={repo.id}
                        onClick={() => connectRepoToProject(repo)}
                        className="p-3 bg-black border border-gray-700 rounded-lg cursor-pointer hover:border-[#4C3BCF] transition-colors"
                      >
                        <div className="font-medium text-sm">{repo.name}</div>
                        <div className="text-xs text-gray-500">{repo.language}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400">Connected Repository</div>
                      <div className="font-medium">📁 {selectedProject.repo.name}</div>
                    </div>
                    <button
                      onClick={() => connectRepoToProject(null)}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              )}

              {/* AI Task Assistant */}
              {selectedProject.repo && (
                <AITaskAssistant 
                  repo={selectedProject.repo}
                  githubToken={user?.github_token}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Create New Project</h3>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && createProject()}
              placeholder="Project name"
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-[#4C3BCF]"
            />
            <div className="flex gap-2">
              <button
                onClick={createProject}
                className="flex-1 bg-[#4C3BCF] px-4 py-2 rounded-lg hover:bg-[#4C3BCF]/80"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
