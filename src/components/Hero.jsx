import { useMemo } from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero({ profile, editMode, onChange }) {
  const { name, headline, summary, achievements = [] } = profile || {};

  const handleField = (key, value) => {
    if (!onChange) return;
    onChange((p) => ({ ...p, [key]: value }));
  };

  const sceneUrl = useMemo(
    () => 'https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode',
    []
  );

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene={sceneUrl} style={{ width: '100%', height: '100%' }} />
        {/* Soft gradient for contrast, does not block interaction */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/30 to-slate-950" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {editMode ? (
            <div className="space-y-4 rounded-2xl bg-black/40 p-6 backdrop-blur">
              <input
                className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-lg outline-none focus:border-indigo-400"
                value={name || ''}
                onChange={(e) => handleField('name', e.target.value)}
                placeholder="Your Name"
              />
              <input
                className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 outline-none focus:border-indigo-400"
                value={headline || ''}
                onChange={(e) => handleField('headline', e.target.value)}
                placeholder="Headline"
              />
              <textarea
                rows={3}
                className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 outline-none focus:border-indigo-400"
                value={summary || ''}
                onChange={(e) => handleField('summary', e.target.value)}
                placeholder="Short summary"
              />
              <div>
                <label className="mb-2 block text-sm text-slate-300">Achievements (one per line)</label>
                <textarea
                  rows={3}
                  className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm outline-none focus:border-indigo-400"
                  value={(achievements || []).join('\n')}
                  onChange={(e) =>
                    onChange((p) => ({ ...p, achievements: e.target.value.split('\n').filter(Boolean) }))
                  }
                />
              </div>
            </div>
          ) : (
            <div>
              <h1 className="font-semibold tracking-tight text-4xl sm:text-5xl md:text-6xl">
                {name || 'Your Name'}
              </h1>
              <p className="mt-3 text-lg text-indigo-300">{headline}</p>
              <p className="mt-6 max-w-2xl text-slate-200/90">{summary}</p>
              {achievements?.length > 0 && (
                <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-slate-300 sm:grid-cols-2">
                  {achievements.map((a, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {a}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
