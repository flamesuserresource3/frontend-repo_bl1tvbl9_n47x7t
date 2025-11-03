import { Plus, Trash, ExternalLink } from 'lucide-react';

export default function Projects({ projects = [], editMode, onChange }) {
  const handleProjectChange = (index, key, value) => {
    if (!onChange) return;
    onChange((list) => list.map((p, i) => (i === index ? { ...p, [key]: value } : p)));
  };

  const addProject = () => {
    onChange((list) => [
      ...list,
      { title: 'New Project', description: '', link: '', tags: [] },
    ]);
  };

  const removeProject = (idx) => {
    onChange((list) => list.filter((_, i) => i !== idx));
  };

  const setTags = (idx, text) => {
    const tags = text
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    handleProjectChange(idx, 'tags', tags);
  };

  return (
    <section>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="mt-1 text-sm text-slate-400">
            Real-world work that demonstrates impact and depth in cloud engineering.
          </p>
        </div>
        {editMode && (
          <button
            onClick={addProject}
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            <Plus size={16} /> Add
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <div key={i} className="group relative rounded-2xl border border-white/10 bg-white/5 p-5">
            {editMode ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-indigo-400"
                    value={p.title}
                    onChange={(e) => handleProjectChange(i, 'title', e.target.value)}
                    placeholder="Project title"
                  />
                  <button
                    onClick={() => removeProject(i)}
                    className="rounded-md border border-white/10 p-2 text-slate-300 hover:bg-white/10"
                    aria-label="Remove project"
                  >
                    <Trash size={16} />
                  </button>
                </div>
                <textarea
                  rows={3}
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                  value={p.description}
                  onChange={(e) => handleProjectChange(i, 'description', e.target.value)}
                  placeholder="What did you build and why it matters"
                />
                <input
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                  value={p.link || ''}
                  onChange={(e) => handleProjectChange(i, 'link', e.target.value)}
                  placeholder="https://..."
                />
                <input
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-indigo-400"
                  value={(p.tags || []).join(', ')}
                  onChange={(e) => setTags(i, e.target.value)}
                  placeholder="tags (comma separated)"
                />
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-medium">{p.title}</h3>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-300 hover:text-indigo-200"
                      aria-label="Open link"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
                <p className="mt-2 text-sm text-slate-300">{p.description}</p>
                {p.tags?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
