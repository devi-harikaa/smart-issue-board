import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, addDoc, query, orderBy, onSnapshot, updateDoc, doc, serverTimestamp, getDocs 
} from 'firebase/firestore';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [issues, setIssues] = useState([]);
  const [formData, setFormData] = useState({ 
    title: '', description: '', priority: 'Medium', status: 'Open', assignedTo: '' 
  });
  const [filter, setFilter] = useState({ status: 'All', priority: 'All' });
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); });
    return unsub;
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "issues"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      setIssues(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, [user]);

  const handleAuth = async (type) => {
    try {
      if (type === 'login') await signInWithEmailAndPassword(auth, email, password);
      else await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) { alert(err.message); }
  };

  const createIssue = async (e, force = false) => {
    e.preventDefault();
    if (!force) {
      const snap = await getDocs(collection(db, "issues"));
      const similar = snap.docs.find(d => 
        d.data().title.toLowerCase().includes(formData.title.toLowerCase())
      );
      if (similar) { 
        setWarning(`Similar issue detected: "${similar.data().title}". Proceed?`); 
        return; 
      }
    }
    await addDoc(collection(db, "issues"), { 
      ...formData, 
      createdBy: user.email, 
      createdAt: serverTimestamp() 
    });
    setFormData({ title: '', description: '', priority: 'Medium', status: 'Open', assignedTo: '' });
    setWarning(null);
  };

  const updateStatus = async (id, oldS, newS) => {
    if (oldS === 'Open' && newS === 'Done') { 
      alert("Status Rule: An issue cannot move directly from Open to Done."); 
      return; 
    }
    await updateDoc(doc(db, "issues", id), { status: newS });
  };

  if (loading) return <div className="p-10 text-center font-bold">Initializing...</div>;

  if (!user) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-sm border text-center">
        <h2 className="text-2xl font-bold mb-6">Smart Issue Board</h2>
        <input className="w-full border p-2 mb-2 rounded" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input className="w-full border p-2 mb-4 rounded" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={() => handleAuth('login')} className="w-full bg-blue-600 text-white p-2 mb-2 rounded font-bold">Login</button>
        <button onClick={() => handleAuth('signup')} className="w-full bg-gray-200 p-2 rounded text-sm">Sign Up</button>
      </div>
    </div>
  );

  const filteredIssues = issues.filter(i => 
    (filter.status === 'All' || i.status === filter.status) && 
    (filter.priority === 'All' || i.priority === filter.priority)
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded shadow-sm border">
        <h1 className="text-xl font-bold">Issue Board</h1>
        <div className="text-sm font-medium">Logged in: {user.email} <button onClick={() => signOut(auth)} className="ml-4 text-red-500 underline text-xs">Logout</button></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <form onSubmit={createIssue} className="bg-white p-4 rounded shadow border h-fit space-y-3">
          <h2 className="font-bold border-b pb-2">New Issue</h2>
          <input required placeholder="Title" className="w-full border p-2 text-sm" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <textarea required placeholder="Description" className="w-full border p-2 text-sm h-20" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <select className="w-full border p-2 text-sm" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}><option>Low</option><option>Medium</option><option>High</option></select>
          <input required placeholder="Assign To" className="w-full border p-2 text-sm" value={formData.assignedTo} onChange={e => setFormData({...formData, assignedTo: e.target.value})} />
          {warning && <div className="p-2 bg-amber-50 text-[10px] text-amber-700 border border-amber-200">{warning} <button type="button" onClick={(e) => createIssue(e, true)} className="font-bold underline ml-2">Confirm</button></div>}
          <button className="w-full bg-black text-white p-2 rounded text-sm font-bold">Create Issue</button>
        </form>
        <div className="md:col-span-2 space-y-4">
          <div className="flex gap-2 mb-4">
            <select className="border p-2 text-xs rounded bg-white" onChange={e => setFilter({...filter, status: e.target.value})}><option value="All">All Status</option><option>Open</option><option>In Progress</option><option>Done</option></select>
            <select className="border p-2 text-xs rounded bg-white" onChange={e => setFilter({...filter, priority: e.target.value})}><option value="All">All Priority</option><option>Low</option><option>Medium</option><option>High</option></select>
          </div>
          {filteredIssues.map(i => (
            <div key={i.id} className="p-4 bg-white border rounded shadow-sm border-l-4 border-l-blue-500">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800">{i.title}</h3>
                <span className="text-[10px] font-black uppercase bg-gray-100 px-2 py-0.5 rounded">{i.priority}</span>
              </div>
              <p className="text-sm text-gray-600 my-3">{i.description}</p>
              <div className="flex justify-between items-center text-[10px] text-gray-400">
                <span>Assignee: {i.assignedTo} | By: {i.createdBy}</span>
                <div className="flex gap-1">
                  {['Open', 'In Progress', 'Done'].map(s => (
                    <button key={s} onClick={() => updateStatus(i.id, i.status, s)} className={`px-2 py-1 rounded border transition-colors ${i.status === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50'}`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}