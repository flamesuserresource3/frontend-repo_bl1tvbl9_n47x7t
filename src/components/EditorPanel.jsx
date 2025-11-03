import { useRef } from 'react';
import { Edit, Save, Upload, Download, RefreshCw } from 'lucide-react';

export default function EditorPanel({ editMode, onToggle, content, onImport, onReset }) {
  const fileRef = useRef(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => fileRef.current?.click();

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        onImport?.(data);
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-medium text-slate-300">Cloud Portfolio</span>
          <span className="text-xs text-slate-500">Edit directly on the site. Changes auto-save.</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggle}
            className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
              editMode
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20'
                : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
          >
            {editMode ? <Save size={16} /> : <Edit size={16} />} {editMode ? 'Save' : 'Edit'}
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
          >
            <Download size={16} /> Export
          </button>
          <button
            onClick={handleImportClick}
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
          >
            <Upload size={16} /> Import
          </button>
          <input type="file" accept="application/json" ref={fileRef} onChange={handleImportFile} className="hidden" />
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-100 hover:bg-red-500/20"
          >
            <RefreshCw size={16} /> Reset
          </button>
        </div>
      </div>
    </div>
  );
}
