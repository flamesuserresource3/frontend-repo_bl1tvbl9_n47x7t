import { Briefcase, Calendar, Plus, Trash } from 'lucide-react';

export default function ExperienceTimeline({
  experience = [],
  journey = [],
  editMode,
  onExperienceChange,
  onJourneyChange,
}) {
  const changeExp = (idx, key, val) =>
    onExperienceChange((list) => list.map((e, i) => (i === idx ? { ...e, [key]: val } : e)));
  const addExp = () => onExperienceChange((list) => [...list, { company: '', role: '', period: '', description: '' }]);
  const rmExp = (idx) => onExperienceChange((list) => list.filter((_, i) => i !== idx));

  const changeJourney = (idx, key, val) =>
    onJourneyChange((list) => list.map((j, i) => (i === idx ? { ...j, [key]: val } : j)));
  const addJourney = () => onJourneyChange((list) => [...list, { title: '', date: '', description: '' }]);
  const rmJourney = (idx) => onJourneyChange((list) => list.filter((_, i) => i !== idx));

  return (
    <section className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2"><Briefcase size={20}/> Experience</h2>
            <p className="mt-1 text-sm text-slate-400">Where you built platforms, owned SLOs, and shipped impact.</p>
          </div>
          {editMode && (
            <button onClick={addExp} className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500">
              <Plus size={16}/> Add
            </button>
          )}
        </div>

        <ol className="space-y-4">
          {experience.map((e, i) => (
            <li key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              {editMode ? (
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input className="w-1/2 rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-indigo-400" value={e.company} onChange={(ev) => changeExp(i, 'company', ev.target.value)} placeholder="Company"/>
                    <input className="w-1/2 rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-indigo-400" value={e.role} onChange={(ev) => changeExp(i, 'role', ev.target.value)} placeholder="Role"/>
                  </div>
                  <input className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-indigo-400" value={e.period} onChange={(ev) => changeExp(i, 'period', ev.target.value)} placeholder="Period (e.g., 2022 — Present)"/>
                  <textarea rows={3} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-indigo-400" value={e.description} onChange={(ev) => changeExp(i, 'description', ev.target.value)} placeholder="Key outcomes, scope, stack"/>
                  <div className="text-right">
                    <button onClick={() => rmExp(i)} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/10">
                      <Trash size={14}/> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-lg font-medium">{e.role}</span>
                    <span className="text-slate-400">@ {e.company}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                    <Calendar size={14}/> {e.period}
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{e.description}</p>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Journey</h2>
            <p className="mt-1 text-sm text-slate-400">Milestones that shaped your craft.</p>
          </div>
          {editMode && (
            <button onClick={addJourney} className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500">
              <Plus size={16}/> Add
            </button>
          )}
        </div>

        <ol className="relative ml-2 border-l border-white/10 pl-6">
          {journey.map((j, i) => (
            <li key={i} className="mb-8 last:mb-0">
              <div className="absolute -left-2 mt-1 h-3 w-3 rounded-full bg-indigo-400" />
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                {editMode ? (
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <input className="w-2/3 rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-indigo-400" value={j.title} onChange={(ev) => changeJourney(i, 'title', ev.target.value)} placeholder="Title"/>
                      <input className="w-1/3 rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-indigo-400" value={j.date} onChange={(ev) => changeJourney(i, 'date', ev.target.value)} placeholder="Year"/>
                    </div>
                    <textarea rows={3} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-indigo-400" value={j.description} onChange={(ev) => changeJourney(i, 'description', ev.target.value)} placeholder="What happened and why it mattered"/>
                    <div className="text-right">
                      <button onClick={() => rmJourney(i)} className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/10">
                        <Trash size={14}/> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{j.title}</h3>
                      <span className="text-xs text-slate-400">{j.date}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{j.description}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
