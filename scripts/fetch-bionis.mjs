import fs from 'fs';
import path from 'path';

const filesToFetch = [
  { remote: 'dashboard.css', local: 'dashboard.css' },
  { remote: 'data.ts', local: 'data.ts' },
  { remote: 'components/bionis/icons.tsx', local: 'icons.tsx' },
  { remote: 'components/bionis/logo.tsx', local: 'logo.tsx' },
  { remote: 'components/bionis/navigation.tsx', local: 'navigation.tsx' },
  { remote: 'components/bionis/theme-provider.tsx', local: 'theme-provider.tsx' },
  { remote: 'components/bionis/shared.tsx', local: 'shared.tsx' },
  { remote: 'components/bionis/sidebar.tsx', local: 'sidebar.tsx' },
  { remote: 'components/bionis/topbar.tsx', local: 'topbar.tsx' },
  { remote: 'components/bionis/dashboard-content.tsx', local: 'dashboard-content.tsx' },
  { remote: 'components/bionis/trends-content.tsx', local: 'trends-content.tsx' },
  { remote: 'dashboard-layout.tsx', local: 'dashboard-layout.tsx' },
  { remote: 'demo.tsx', local: 'demo.tsx' }
];

const baseUrl = 'https://raw.githubusercontent.com/WatermelonCorp/watermelon-platform/main/src/data/contents/dashboards/bionis-dashboard/';

async function run() {
  const targetDir = path.join(process.cwd(), 'components', 'bionis');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const f of filesToFetch) {
    const url = baseUrl + f.remote;
    console.log(`Fetching ${url}...`);
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch ${url}: ${res.status}`);
      continue;
    }
    let text = await res.text();
    text = text.replace(/from '\.\.\/\.\.\/data'/g, "from './data'");
    text = text.replace(/from '\.\/components\/bionis\//g, "from './");

    const localPath = path.join(targetDir, f.local);
    fs.writeFileSync(localPath, text, 'utf8');
    console.log(`Saved ${f.local} (${text.length} bytes)`);
  }
}

run();
