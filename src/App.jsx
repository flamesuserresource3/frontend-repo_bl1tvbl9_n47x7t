import { useEffect, useMemo, useState } from 'react';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import ExperienceTimeline from './components/ExperienceTimeline.jsx';
import EditorPanel from './components/EditorPanel.jsx';

const DEFAULT_CONTENT = {
  profile: {
    name: 'Your Name',
    headline: 'Cloud Engineer • SRE • DevOps',
    summary:
      "I design, build, and operate scalable, secure cloud platforms. Obsessed with reliability, cost efficiency, and developer experience.",
    achievements: [
      'AWS Solutions Architect – Professional',
      '99.99% uptime across 12+ services',
      'Cut cloud spend by 32% in 6 months',
    ],
  },
  projects: [
    {
      title: 'Multi-Region Kubernetes Platform',
      description:
        'Built HA EKS across regions with GitOps, blue/green deploys, and service mesh. Reduced MTTR by 60%.',
      link: 'https://example.com',
      tags: ['Kubernetes', 'AWS', 'GitOps', 'ArgoCD', 'Istio'],
    },
    {
      title: 'Serverless Data Pipeline',
      description:
        'Event-driven ingestion on AWS with streaming, automated partitioning, and cost-aware storage tiers.',
      link: 'https://example.com',
      tags: ['Lambda', 'S3', 'Kinesis', 'Glue', 'Athena'],
    },
    {
      title: 'Observability Platform',
      description:
        'Unified tracing, metrics, and logs with SLO dashboards and error budgets adopted org-wide.',
      link: 'https://example.com',
      tags: ['OpenTelemetry', 'Prometheus', 'Grafana', 'SLOs'],
    },
  ],
  experience: [
    {
      company: 'Acme Cloud',
      role: 'Senior Cloud Engineer',
      period: '2022 — Present',
      description:
        'Led platform team. Built paved roads, golden paths, and multi-account governance with OPA + SCPs.',
    },
    {
      company: 'DevOps Co.',
      role: 'Site Reliability Engineer',
      period: '2019 — 2022',
      description:
        'Scaled infra to millions of users, introduced error budgets, and automated capacity planning.',
    },
  ],
  journey: [
    {
      title: 'Broke the Monolith',
      date: '2019',
      description: 'Migrated to microservices with progressive delivery and circuit breakers.'
    },
    {
      title: 'From Pets to Cattle',
      date: '2021',
      description: 'Immutable infra, GitOps, and self-service tooling adoption.'
    },
    {
      title: 'SLOs Everywhere',
      date: '2023',
      description: 'Operational excellence through observability-first culture.'
    },
  ],
};

const STORAGE_KEY = 'cloud-portfolio-content-v1';

export default function App() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [editMode, setEditMode] = useState(false);

  // Load persisted content
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Shallow merge to ensure forward-compat with defaults
        setContent((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {
      console.warn('Failed to load saved content', e);
    }
  }, []);

  // Persist on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.warn('Failed to save content', e);
    }
  }, [content]);

  const actions = useMemo(
    () => ({
      setProfile: (updater) =>
        setContent((c) => ({ ...c, profile: typeof updater === 'function' ? updater(c.profile) : updater })),
      setProjects: (updater) =>
        setContent((c) => ({ ...c, projects: typeof updater === 'function' ? updater(c.projects) : updater })),
      setExperience: (updater) =>
        setContent((c) => ({ ...c, experience: typeof updater === 'function' ? updater(c.experience) : updater })),
      setJourney: (updater) =>
        setContent((c) => ({ ...c, journey: typeof updater === 'function' ? updater(c.journey) : updater })),
      importData: (data) => setContent((c) => ({ ...c, ...data })),
      resetAll: () => setContent(DEFAULT_CONTENT),
    }),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <EditorPanel
        editMode={editMode}
        onToggle={() => setEditMode((v) => !v)}
        content={content}
        onImport={actions.importData}
        onReset={actions.resetAll}
      />

      <Hero
        profile={content.profile}
        editMode={editMode}
        onChange={actions.setProfile}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 pb-24">
        <Projects
          projects={content.projects}
          editMode={editMode}
          onChange={actions.setProjects}
        />

        <ExperienceTimeline
          experience={content.experience}
          journey={content.journey}
          editMode={editMode}
          onExperienceChange={actions.setExperience}
          onJourneyChange={actions.setJourney}
        />
      </main>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-slate-400">
        <p>Built with love for cloud, reliability, and great developer experience.</p>
      </footer>
    </div>
  );
}
