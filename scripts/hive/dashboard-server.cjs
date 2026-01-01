/**
 * HIVE DASHBOARD SERVER
 * FOR THE KIDS - Visual Operations Center
 * 
 * Provides real-time visibility into:
 * - PM2 process status
 * - Job queue and completed jobs
 * - Generated content gallery
 * - System statistics
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8888;
const HIVE_DIR = __dirname;
const ASSETS_DIR = path.join(__dirname, '..', '..', 'assets');
const GENERATED_DIR = path.join(ASSETS_DIR, 'generated');
const JOBS_FILE = path.join(HIVE_DIR, 'jobs.json');

// MIME types
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml'
};

// Get PM2 status
function getPM2Status() {
  return new Promise((resolve) => {
    exec('pm2 jlist', (error, stdout) => {
      if (error) {
        resolve([]);
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch {
        resolve([]);
      }
    });
  });
}

// Get jobs data
function getJobs() {
  try {
    const data = fs.readFileSync(JOBS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return { queue: [], completed: [], failed: [] };
  }
}

// Get generated files
function getGeneratedFiles() {
  try {
    const files = fs.readdirSync(GENERATED_DIR);
    return files.map(f => ({
      name: f,
      path: `/generated/${f}`,
      ext: path.extname(f),
      created: fs.statSync(path.join(GENERATED_DIR, f)).mtime
    })).sort((a, b) => b.created - a.created);
  } catch {
    return [];
  }
}

// Dashboard HTML
function getDashboardHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HIVE Dashboard - FOR THE KIDS</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
      color: #e0e0e0;
      min-height: 100vh;
    }
    .header {
      background: linear-gradient(90deg, #ff6b00, #ff9500);
      padding: 20px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(255, 107, 0, 0.3);
    }
    .header h1 {
      font-size: 2rem;
      color: #fff;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .header .subtitle {
      color: rgba(255,255,255,0.9);
      font-size: 0.9rem;
      margin-top: 5px;
    }
    .gospel-badge {
      display: inline-block;
      background: rgba(0,0,0,0.3);
      padding: 5px 15px;
      border-radius: 20px;
      margin-top: 10px;
      font-weight: bold;
    }
    .container { max-width: 1400px; margin: 0 auto; padding: 20px; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 30px;
    }
    .stat-card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
    }
    .stat-card .value {
      font-size: 2.5rem;
      font-weight: bold;
      color: #ff9500;
    }
    .stat-card .label { color: #888; font-size: 0.85rem; margin-top: 5px; }
    .section {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .section h2 {
      color: #ff9500;
      margin-bottom: 15px;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .process-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 15px;
    }
    .process-card {
      background: rgba(0,0,0,0.3);
      border-radius: 8px;
      padding: 15px;
      border-left: 4px solid #4caf50;
    }
    .process-card.stopped { border-left-color: #f44336; }
    .process-card .name { font-weight: bold; font-size: 1.1rem; }
    .process-card .status {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      margin-top: 5px;
    }
    .process-card .status.online { background: #4caf50; color: #fff; }
    .process-card .status.stopped { background: #f44336; color: #fff; }
    .process-card .meta { color: #888; font-size: 0.8rem; margin-top: 8px; }
    .jobs-list { max-height: 400px; overflow-y: auto; }
    .job-item {
      background: rgba(0,0,0,0.2);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 10px;
      border-left: 4px solid #2196f3;
    }
    .job-item.completed { border-left-color: #4caf50; }
    .job-item.failed { border-left-color: #f44336; }
    .job-item .type {
      display: inline-block;
      background: rgba(255,255,255,0.1);
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      text-transform: uppercase;
    }
    .job-item .content { margin-top: 8px; font-size: 0.9rem; color: #ccc; }
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }
    .gallery-item {
      background: rgba(0,0,0,0.3);
      border-radius: 8px;
      overflow: hidden;
    }
    .gallery-item img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
    .gallery-item .info {
      padding: 10px;
      font-size: 0.8rem;
      color: #888;
      word-break: break-all;
    }
    .refresh-btn {
      background: #ff9500;
      color: #000;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .refresh-btn:hover { background: #ff6b00; }
    .auto-refresh { color: #888; font-size: 0.8rem; margin-left: 15px; }
    .timestamp { color: #666; font-size: 0.75rem; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🐝 HIVE DASHBOARD</h1>
    <div class="subtitle">FOR THE KIDS - Visual Operations Center</div>
    <div class="gospel-badge">GOSPEL v1.3 | 60/30/10</div>
  </div>
  
  <div class="container">
    <button class="refresh-btn" onclick="refresh()">🔄 Refresh</button>
    <span class="auto-refresh">Auto-refresh: 30s</span>
    
    <div class="stats-grid" id="stats">
      <div class="stat-card">
        <div class="value" id="stat-processes">-</div>
        <div class="label">Active Processes</div>
      </div>
      <div class="stat-card">
        <div class="value" id="stat-completed">-</div>
        <div class="label">Jobs Completed</div>
      </div>
      <div class="stat-card">
        <div class="value" id="stat-queued">-</div>
        <div class="label">Jobs Queued</div>
      </div>
      <div class="stat-card">
        <div class="value" id="stat-images">-</div>
        <div class="label">Images Generated</div>
      </div>
    </div>
    
    <div class="section">
      <h2>⚙️ PM2 Processes</h2>
      <div class="process-grid" id="processes"></div>
    </div>
    
    <div class="section">
      <h2>📋 Recent Jobs</h2>
      <div class="jobs-list" id="jobs"></div>
    </div>
    
    <div class="section">
      <h2>🎨 Generated Content</h2>
      <div class="gallery" id="gallery"></div>
    </div>
  </div>
  
  <script>
    async function fetchData() {
      const [pm2, jobs, files] = await Promise.all([
        fetch('/api/pm2').then(r => r.json()),
        fetch('/api/jobs').then(r => r.json()),
        fetch('/api/files').then(r => r.json())
      ]);
      return { pm2, jobs, files };
    }
    
    function renderProcesses(processes) {
      const el = document.getElementById('processes');
      const online = processes.filter(p => p.pm2_env?.status === 'online');
      document.getElementById('stat-processes').textContent = online.length;
      
      el.innerHTML = processes.map(p => {
        const status = p.pm2_env?.status || 'unknown';
        const memory = p.monit?.memory ? (p.monit.memory / 1024 / 1024).toFixed(1) + ' MB' : '-';
        const cpu = p.monit?.cpu !== undefined ? p.monit.cpu + '%' : '-';
        const uptime = p.pm2_env?.pm_uptime ? timeSince(p.pm2_env.pm_uptime) : '-';
        return \`
          <div class="process-card \${status !== 'online' ? 'stopped' : ''}">
            <div class="name">\${p.name}</div>
            <span class="status \${status}">\${status.toUpperCase()}</span>
            <div class="meta">CPU: \${cpu} | RAM: \${memory} | Uptime: \${uptime}</div>
          </div>
        \`;
      }).join('');
    }
    
    function renderJobs(jobs) {
      const el = document.getElementById('jobs');
      document.getElementById('stat-completed').textContent = jobs.completed?.length || 0;
      document.getElementById('stat-queued').textContent = jobs.queue?.length || 0;
      
      const all = [
        ...(jobs.completed || []).map(j => ({...j, _status: 'completed'})),
        ...(jobs.failed || []).map(j => ({...j, _status: 'failed'})),
        ...(jobs.queue || []).map(j => ({...j, _status: 'queued'}))
      ].slice(0, 20);
      
      el.innerHTML = all.map(j => {
        let content = '';
        if (j.result?.post) content = j.result.post.substring(0, 150) + '...';
        else if (j.result?.trend) content = 'Trend: ' + j.result.trend;
        else if (j.result?.imagePath) content = '🖼️ ' + j.result.filename;
        
        return \`
          <div class="job-item \${j._status}">
            <span class="type">\${j.type}</span>
            <span class="timestamp">\${j.completedAt ? new Date(j.completedAt).toLocaleString() : ''}</span>
            <div class="content">\${content}</div>
          </div>
        \`;
      }).join('') || '<div style="color:#666">No jobs yet</div>';
    }
    
    function renderGallery(files) {
      const el = document.getElementById('gallery');
      const images = files.filter(f => ['.png', '.jpg', '.gif'].includes(f.ext));
      document.getElementById('stat-images').textContent = images.length;
      
      el.innerHTML = images.slice(0, 12).map(f => \`
        <div class="gallery-item">
          <img src="\${f.path}" alt="\${f.name}" loading="lazy">
          <div class="info">\${f.name.substring(0, 30)}...</div>
        </div>
      \`).join('') || '<div style="color:#666">No images generated yet</div>';
    }
    
    function timeSince(timestamp) {
      const seconds = Math.floor((Date.now() - timestamp) / 1000);
      if (seconds < 60) return seconds + 's';
      if (seconds < 3600) return Math.floor(seconds / 60) + 'm';
      if (seconds < 86400) return Math.floor(seconds / 3600) + 'h';
      return Math.floor(seconds / 86400) + 'd';
    }
    
    async function refresh() {
      try {
        const data = await fetchData();
        renderProcesses(data.pm2);
        renderJobs(data.jobs);
        renderGallery(data.files);
      } catch (err) {
        console.error('Refresh failed:', err);
      }
    }
    
    refresh();
    setInterval(refresh, 30000);
  </script>
</body>
</html>`;
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  
  // API Routes
  if (url.pathname === '/api/pm2') {
    const data = await getPM2Status();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
    return;
  }
  
  if (url.pathname === '/api/jobs') {
    const data = getJobs();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
    return;
  }
  
  if (url.pathname === '/api/files') {
    const data = getGeneratedFiles();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
    return;
  }
  
  // Serve generated images
  if (url.pathname.startsWith('/generated/')) {
    const filename = url.pathname.replace('/generated/', '');
    const filepath = path.join(GENERATED_DIR, filename);
    if (fs.existsSync(filepath)) {
      const ext = path.extname(filename);
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filepath).pipe(res);
      return;
    }
  }
  
  // Dashboard
  if (url.pathname === '/' || url.pathname === '/dashboard') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(getDashboardHTML());
    return;
  }
  
  // 404
  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║       🐝 HIVE DASHBOARD - FOR THE KIDS                     ║');
  console.log('║                                                            ║');
  console.log(`║       Running at: http://localhost:${PORT}                    ║`);
  console.log('║       Gospel v1.3 | 60/30/10                               ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
});
