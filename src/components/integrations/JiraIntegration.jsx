'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export const JiraIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [projects, setProjects] = useState([]);
  const [issues, setIssues] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [transitions, setTransitions] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showTransitionModal, setShowTransitionModal] = useState(false);
  const [showPriorityModal, setShowPriorityModal] = useState(false);
  const [showImpactEffortModal, setShowImpactEffortModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [newIssue, setNewIssue] = useState({ summary: '', description: '', issue_type: 'Task' });
  const [comment, setComment] = useState('');
  const [impactEffortData, setImpactEffortData] = useState({ impact: '', effort: '' });
  const [viewMode, setViewMode] = useState('list');
  const searchParams = useSearchParams();

  useEffect(() => {
    const user_id = searchParams.get('user_id');
    const cloud_id = searchParams.get('cloud_id');
    
    if (user_id && cloud_id) {
      localStorage.setItem('jira_user_id', user_id);
      localStorage.setItem('jira_cloud_id', cloud_id);
      setUserId(user_id);
      setIsConnected(true);
      fetchProjects(user_id);
      fetchUsers(user_id);
    }
  }, [searchParams]);

  const handleConnect = () => {
    window.location.href = "https://localhost:5000/jira/install";
  };

  const fetchProjects = async (user_id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://localhost:5000/jira/api/projects?user_id=${user_id}`);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
    setLoading(false);
  };

  const fetchUsers = async (user_id) => {
    try {
      const response = await fetch(`https://localhost:5000/jira/api/users?user_id=${user_id}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchIssues = async (projectKey) => {
    setLoading(true);
    try {
      const response = await fetch(`https://localhost:5000/jira/api/issues?user_id=${userId}&project_key=${projectKey}`);
      const data = await response.json();
      setIssues(data.issues || []);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
    setLoading(false);
  };

  const fetchTransitions = async (issueKey) => {
    try {
      const response = await fetch(`https://localhost:5000/jira/api/get_transitions?user_id=${userId}&issue_key=${issueKey}`);
      const data = await response.json();
      setTransitions(data.transitions || []);
    } catch (error) {
      console.error('Error fetching transitions:', error);
    }
  };

  const createIssue = async () => {
    try {
      const response = await fetch('https://localhost:5000/jira/api/create_issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          project_key: selectedProject.key,
          ...newIssue
        })
      });
      const data = await response.json();
      if (data.key) {
        alert(`Issue created: ${data.key}`);
        setShowCreateModal(false);
        setNewIssue({ summary: '', description: '', issue_type: 'Task' });
        fetchIssues(selectedProject.key);
      }
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  const assignIssue = async (assigneeId) => {
    try {
      await fetch('https://localhost:5000/jira/api/assign_issue', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, issue_key: selectedIssue.key, assignee_id: assigneeId })
      });
      alert('Issue assigned');
      setShowAssignModal(false);
      fetchIssues(selectedProject.key);
    } catch (error) {
      console.error('Error assigning issue:', error);
    }
  };

  const addComment = async () => {
    try {
      await fetch('https://localhost:5000/jira/api/add_comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, issue_key: selectedIssue.key, comment })
      });
      alert('Comment added');
      setShowCommentModal(false);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const transitionIssue = async (transitionId) => {
    try {
      await fetch('https://localhost:5000/jira/api/transition_issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, issue_key: selectedIssue.key, transition_id: transitionId })
      });
      alert('Issue status changed');
      setShowTransitionModal(false);
      fetchIssues(selectedProject.key);
    } catch (error) {
      console.error('Error transitioning issue:', error);
    }
  };

  const setPriority = async (priority) => {
    try {
      await fetch('https://localhost:5000/jira/api/set_priority', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, issue_key: selectedIssue.key, priority })
      });
      alert('Priority updated');
      setShowPriorityModal(false);
      fetchIssues(selectedProject.key);
    } catch (error) {
      console.error('Error setting priority:', error);
    }
  };

  const saveImpactEffort = async () => {
    const labels = [];
    if (impactEffortData.impact) labels.push(`impact-${impactEffortData.impact}`);
    if (impactEffortData.effort) labels.push(`effort-${impactEffortData.effort}`);
    
    try {
      await fetch('https://localhost:5000/jira/api/set_labels', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, issue_key: selectedIssue.key, labels })
      });
      alert('Impact/Effort updated');
      setShowImpactEffortModal(false);
      setImpactEffortData({ impact: '', effort: '' });
      fetchIssues(selectedProject.key);
    } catch (error) {
      console.error('Error setting impact/effort:', error);
    }
  };

  const getImpactEffort = (issue) => {
    const labels = issue.fields.labels || [];
    const impact = labels.find(l => l.startsWith('impact-'))?.replace('impact-', '');
    const effort = labels.find(l => l.startsWith('effort-'))?.replace('effort-', '');
    return { impact, effort };
  };

  const getQuadrant = (impact, effort) => {
    if (impact === 'high' && effort === 'low') return { name: 'Quick Wins', color: 'bg-green-100 text-green-800' };
    if (impact === 'high' && effort === 'high') return { name: 'Major Projects', color: 'bg-blue-100 text-blue-800' };
    if (impact === 'low' && effort === 'low') return { name: 'Fill Ins', color: 'bg-yellow-100 text-yellow-800' };
    if (impact === 'low' && effort === 'high') return { name: 'Time Sinks', color: 'bg-red-100 text-red-800' };
    return { name: 'Unscored', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Jira Integration</h2>
          <p className="text-gray-600">Manage projects, issues, and team members</p>
        </div>

        {!isConnected ? (
          <button
            onClick={handleConnect}
            className="w-full flex justify-center items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Connect with Jira
          </button>
        ) : (
          <div>
            <div className="bg-green-100 p-4 rounded-md mb-6">
              <span className="text-green-800 font-medium">✅ Jira Connected!</span>
            </div>

            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Projects Section */}
                <div className="lg:col-span-1">
                  <h3 className="text-xl font-bold mb-4">Projects ({projects.length})</h3>
                  <div className="space-y-2">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className={`p-4 bg-white border rounded-md cursor-pointer hover:shadow-md ${
                          selectedProject?.id === project.id ? 'border-blue-500 bg-blue-50' : ''
                        }`}
                        onClick={() => {
                          setSelectedProject(project);
                          fetchIssues(project.key);
                        }}
                      >
                        <h4 className="font-bold">{project.name}</h4>
                        <p className="text-sm text-gray-600">{project.key}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Issues Section */}
                {selectedProject && (
                  <div className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Issues in {selectedProject.name}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setViewMode('list')}
                          className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                          List
                        </button>
                        <button
                          onClick={() => setViewMode('matrix')}
                          className={`px-3 py-1 rounded ${viewMode === 'matrix' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        >
                          Impact/Effort
                        </button>
                        <button
                          onClick={() => setShowCreateModal(true)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          + Create
                        </button>
                      </div>
                    </div>
                    {viewMode === 'list' ? (
                      <div className="space-y-3">
                        {issues.map((issue) => {
                          const { impact, effort } = getImpactEffort(issue);
                          const quadrant = getQuadrant(impact, effort);
                          return (
                            <div key={issue.id} className="p-4 bg-white border rounded-md">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-bold text-blue-600">{issue.key}</h4>
                                  <p className="text-gray-900 mt-1">{issue.fields.summary}</p>
                                  <div className="flex gap-2 mt-2 flex-wrap">
                                    <span className="text-xs px-2 py-1 bg-gray-200 rounded">
                                      {issue.fields.status.name}
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-purple-200 rounded">
                                      {issue.fields.issuetype.name}
                                    </span>
                                    {issue.fields.priority && (
                                      <span className="text-xs px-2 py-1 bg-orange-200 rounded">
                                        {issue.fields.priority.name}
                                      </span>
                                    )}
                                    {(impact || effort) && (
                                      <span className={`text-xs px-2 py-1 rounded ${quadrant.color}`}>
                                        {quadrant.name}
                                      </span>
                                    )}
                                    {issue.fields.assignee && (
                                      <span className="text-xs px-2 py-1 bg-green-200 rounded">
                                        👤 {issue.fields.assignee.displayName}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-1 flex-wrap">
                                  <button
                                    onClick={() => {
                                      setSelectedIssue(issue);
                                      setShowAssignModal(true);
                                    }}
                                    className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                                  >
                                    Assign
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedIssue(issue);
                                      setShowPriorityModal(true);
                                    }}
                                    className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded hover:bg-orange-200"
                                  >
                                    Priority
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedIssue(issue);
                                      setShowImpactEffortModal(true);
                                    }}
                                    className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                                  >
                                    Impact/Effort
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedIssue(issue);
                                      setShowCommentModal(true);
                                    }}
                                    className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                  >
                                    Comment
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedIssue(issue);
                                      fetchTransitions(issue.key);
                                      setShowTransitionModal(true);
                                    }}
                                    className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                                  >
                                    Status
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        {['Quick Wins', 'Major Projects', 'Fill Ins', 'Time Sinks'].map((quadrantName) => {
                          const quadrantIssues = issues.filter(issue => {
                            const { impact, effort } = getImpactEffort(issue);
                            const q = getQuadrant(impact, effort);
                            return q.name === quadrantName;
                          });
                          const colors = {
                            'Quick Wins': 'border-green-500 bg-green-50',
                            'Major Projects': 'border-blue-500 bg-blue-50',
                            'Fill Ins': 'border-yellow-500 bg-yellow-50',
                            'Time Sinks': 'border-red-500 bg-red-50'
                          };
                          return (
                            <div key={quadrantName} className={`p-4 border-2 rounded-lg ${colors[quadrantName]}`}>
                              <h4 className="font-bold mb-3">{quadrantName} ({quadrantIssues.length})</h4>
                              <div className="space-y-2">
                                {quadrantIssues.map(issue => (
                                  <div key={issue.id} className="p-2 bg-white rounded border text-sm">
                                    <p className="font-medium text-blue-600">{issue.key}</p>
                                    <p className="text-xs text-gray-700">{issue.fields.summary}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Create Issue Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Create New Issue</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Summary</label>
                  <input
                    type="text"
                    value={newIssue.summary}
                    onChange={(e) => setNewIssue({ ...newIssue, summary: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Issue title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={newIssue.description}
                    onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    rows="4"
                    placeholder="Issue description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    value={newIssue.issue_type}
                    onChange={(e) => setNewIssue({ ...newIssue, issue_type: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Task">Task</option>
                    <option value="Bug">Bug</option>
                    <option value="Story">Story</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={createIssue}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assign Modal */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Assign Issue: {selectedIssue?.key}</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {users.map((user) => (
                  <div
                    key={user.accountId}
                    onClick={() => assignIssue(user.accountId)}
                    className="p-3 border rounded cursor-pointer hover:bg-blue-50"
                  >
                    <p className="font-medium">{user.displayName}</p>
                    <p className="text-sm text-gray-600">{user.emailAddress}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowAssignModal(false)}
                className="w-full mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Comment Modal */}
        {showCommentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Add Comment: {selectedIssue?.key}</h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border rounded px-3 py-2"
                rows="4"
                placeholder="Write your comment..."
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={addComment}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Comment
                </button>
                <button
                  onClick={() => setShowCommentModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transition Modal */}
        {showTransitionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Change Status: {selectedIssue?.key}</h3>
              <div className="space-y-2">
                {transitions.map((transition) => (
                  <button
                    key={transition.id}
                    onClick={() => transitionIssue(transition.id)}
                    className="w-full p-3 border rounded text-left hover:bg-blue-50"
                  >
                    {transition.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowTransitionModal(false)}
                className="w-full mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Priority Modal */}
        {showPriorityModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Set Priority: {selectedIssue?.key}</h3>
              <div className="space-y-2">
                {['Highest', 'High', 'Medium', 'Low', 'Lowest'].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setPriority(priority)}
                    className="w-full p-3 border rounded text-left hover:bg-orange-50"
                  >
                    {priority}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowPriorityModal(false)}
                className="w-full mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Impact/Effort Modal */}
        {showImpactEffortModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Set Impact & Effort: {selectedIssue?.key}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Impact</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['high', 'low'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setImpactEffortData({ ...impactEffortData, impact: level })}
                        className={`p-3 border rounded ${
                          impactEffortData.impact === level ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)} Impact
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Effort</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['high', 'low'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setImpactEffortData({ ...impactEffortData, effort: level })}
                        className={`p-3 border rounded ${
                          impactEffortData.effort === level ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)} Effort
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={saveImpactEffort}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowImpactEffortModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
