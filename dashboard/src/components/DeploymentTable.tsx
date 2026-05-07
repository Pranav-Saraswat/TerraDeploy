import React from 'react';

const deployments = [
  { id: 'DEP-001', env: 'Production', provider: 'AWS', status: 'Healthy', version: 'v2.4.0', time: '2h ago' },
  { id: 'DEP-002', env: 'Staging', provider: 'GCP', status: 'In Progress', version: 'v2.5.0-rc1', time: '15m ago' },
  { id: 'DEP-003', env: 'Development', provider: 'Azure', status: 'Healthy', version: 'v2.5.0-beta', time: '5h ago' },
  { id: 'DEP-004', env: 'Production', provider: 'AWS', status: 'Drift Detected', version: 'v2.3.9', time: '1d ago' },
];

export const DeploymentTable = () => {
  return (
    <div className="w-full rounded-2xl glass border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-bold">Recent Deployments</h3>
      </div>
      <table className="w-full text-left">
        <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Environment</th>
            <th className="px-6 py-4">Provider</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Version</th>
            <th className="px-6 py-4">Last Activity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {deployments.map((dep) => (
            <tr key={dep.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-6 py-4 font-mono text-sm text-accent">{dep.id}</td>
              <td className="px-6 py-4 text-sm">{dep.env}</td>
              <td className="px-6 py-4 text-sm">{dep.provider}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                  dep.status === 'Healthy' ? 'bg-green-500/10 text-green-500' :
                  dep.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-red-500/10 text-red-500'
                }`}>
                  {dep.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground">{dep.version}</td>
              <td className="px-6 py-4 text-sm text-muted-foreground">{dep.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
