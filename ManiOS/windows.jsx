// Window content modules — all 13 sections
import React from 'react';
const { useState: useS, useEffect: useE } = React;

// ============== Shared building blocks ==============
const padX = { padding: '24px 28px' };

function Section({ title, children, accent }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
      }}>
        <span style={{
          width: 4, height: 14, borderRadius: 2,
          background: accent || 'var(--primary)',
        }} />
        <h3 style={{
          margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11,
          fontWeight: 500, color: 'var(--text-2)',
          letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Tag({ children, color = 'var(--primary)' }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 11,
      padding: '3px 8px', borderRadius: 4,
      background: `color-mix(in oklab, ${color} 14%, transparent)`,
      color: color, border: `1px solid color-mix(in oklab, ${color} 30%, transparent)`,
    }}>{children}</span>
  );
}

function StatusDot({ label, color = 'var(--teal)' }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)',
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%',
        background: color, boxShadow: `0 0 6px ${color}`,
      }} />
      {label}
    </span>
  );
}

function Btn({ children, onClick, variant = 'primary', icon }) {
  const styles = {
    primary: { background: 'var(--primary)', color: '#fff', border: '1px solid var(--primary)' },
    ghost:   { background: 'transparent', color: 'var(--text)', border: '1px solid var(--border-2)' },
    teal:    { background: 'var(--teal)', color: '#0a0a0f', border: '1px solid var(--teal)' },
  }[variant];
  return (
    <button onClick={onClick} style={{
      ...styles, padding: '8px 14px', borderRadius: 8,
      fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
      display: 'inline-flex', alignItems: 'center', gap: 8,
      transition: 'transform 100ms, filter 100ms',
    }}
    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      {icon}{children}
    </button>
  );
}

// ============== 1. HERO ==============
function HeroWindow({ onOpenWindow }) {
  return (
    <div style={{ ...padX, paddingTop: 32, paddingBottom: 32 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 14 }}>
        $ whoami
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28, marginBottom: 22 }}>
        <Avatar size={96} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--primary)', marginBottom: 6, letterSpacing: '0.1em' }}>
            HELLO, I'M
          </div>
          <h1 style={{
            margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 44, letterSpacing: '-0.02em', lineHeight: 1.05,
          }}>
            Manikanth<span style={{ color: 'var(--primary)' }}>.</span>
          </h1>
          <div style={{
            marginTop: 8, fontFamily: 'var(--font-mono)', fontSize: 14,
            color: 'var(--text-2)', letterSpacing: '0.04em',
          }}>
            Data Engineer · 2.5 years building production data systems
          </div>
          <p style={{
            marginTop: 16, marginBottom: 0, fontSize: 16, color: 'var(--text)',
            maxWidth: 480, lineHeight: 1.55,
          }}>
            I build <em style={{ color: 'var(--primary-2)', fontStyle: 'normal' }}>data systems</em>, <em style={{ color: 'var(--teal)', fontStyle: 'normal' }}>AI products</em>,
            and <em style={{ color: 'var(--amber)', fontStyle: 'normal' }}>tools</em> people actually use.
          </p>
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24,
        padding: '10px 14px', background: 'var(--elev)', borderRadius: 10,
        border: '1px solid var(--border)',
      }}>
        <StatusDot label="Data Engineer" />
        <span style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>·</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)' }}>
          Boca Raton, FL · Remote / Relocate
        </span>
        <span style={{ flex: 1 }} />
        <Tag color="var(--amber)">10+ TB/day</Tag>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10,
        marginBottom: 24,
      }}>
        {[
          ['Experience', '2.5 years'],
          ['Companies', '2'],
          ['Data Scale', '10+ TB/day'],
          ['Certs', '2 AWS'],
        ].map(([label, value]) => (
          <div key={label} style={{
            padding: '12px 14px', background: 'var(--elev)', borderRadius: 10,
            border: '1px solid var(--border)',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</div>
            <div style={{ marginTop: 4, fontSize: 13.5, color: 'var(--text)', fontWeight: 600 }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Btn onClick={() => onOpenWindow('resume')} icon={<IconDoc />}>Download Résumé</Btn>
        <Btn variant="ghost" onClick={() => onOpenWindow('contact')} icon={<IconMail />}>Get in Touch</Btn>
        <Btn variant="ghost" onClick={() => window.open('https://github.com/maninampally', '_blank')} icon={<IconGithub />}>GitHub</Btn>
        <Btn variant="ghost" onClick={() => window.open('https://www.linkedin.com/in/manikanthn/', '_blank')} icon={<IconLink />}>LinkedIn</Btn>
      </div>

      <div style={{ marginTop: 28 }}>
        <Section title="Currently">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
            <FactCard label="Role" value="Data Engineer" sub="Opsylux LLC" />
            <FactCard label="Degree" value="M.S. IT & Management" sub="Florida Atlantic · GPA 3.9" />
            <FactCard label="Focus" value="Streaming + Lakehouse" sub="Kafka · Delta Lake · Iceberg" />
            <FactCard label="Certs" value="AWS Cloud + AI" sub="2026" />
          </div>
        </Section>
      </div>
    </div>
  );
}

function FactCard({ label, value, sub }) {
  return (
    <div style={{
      padding: 14, background: 'var(--elev)', border: '1px solid var(--border)', borderRadius: 10,
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 15, color: 'var(--text)', fontWeight: 500 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function Avatar({ size = 80 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg, #6C63FF 0%, #1DB88E 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', flexShrink: 0, overflow: 'hidden',
      boxShadow: '0 12px 30px -6px rgba(108,99,255,0.5), inset 0 0 0 2px rgba(255,255,255,0.1)',
    }}>
      <img
        src="/assets/Profile.jpeg"
        alt="Profile"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

// ============== 2. ABOUT ==============
function AboutWindow() {
  return (
    <div style={{ ...padX, overflow: 'auto', maxHeight: '100%' }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 22 }}>
        <Avatar size={72} />
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>
            Hey, I'm Manikanth Nampally.
          </h2>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>
            // Product thinker · Engineer · Builder
          </div>
        </div>
      </div>

      <Section title="Bio">
        <p style={{ margin: 0, lineHeight: 1.65, color: 'var(--text)', fontSize: 14 }}>
          I'm a Data Engineer with 2.5 years of experience building production-grade data infrastructure and ML-ready pipelines across AWS, Azure, and GCP, processing 10+ TB/day.
        </p>
        <p style={{ marginTop: 12, marginBottom: 0, lineHeight: 1.65, color: 'var(--text)', fontSize: 14 }}>
          I specialize in streaming architectures (Kafka, Spark Structured Streaming), lakehouse design (Delta Lake, Iceberg),
          data governance, and AI-powered data products. I own end-to-end data infrastructure at an AI-driven SaaS startup.
        </p>
        <p style={{ marginTop: 12, marginBottom: 0, lineHeight: 1.65, color: 'var(--text-2)', fontSize: 14, fontStyle: 'italic' }}>
          "I think like a product person and build like an engineer."
        </p>
      </Section>

      <Section title="Quick facts">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <FactCard label="University" value="Florida Atlantic" sub="Boca Raton, FL" />
          <FactCard label="Program" value="MS IT & Management" sub="Graduating May 2026" />
          <FactCard label="GPA" value="3.9 / 4.0" />
          <FactCard label="Experience" value="2.5 years" sub="10+ TB/day · 2 companies" />
        </div>
      </Section>

      <Section title="What I care about">
        <ul style={{ margin: 0, paddingLeft: 16, color: 'var(--text)', fontSize: 14, lineHeight: 1.7 }}>
          <li>Pipelines that don't wake you up at 3am.</li>
          <li>AI features grounded in real product context — not demos.</li>
          <li>Tools the team reaches for on Tuesday morning.</li>
        </ul>
      </Section>
    </div>
  );
}

// ============== 3. PROJECTS ==============
const PROJECTS = [
  {
    name: 'Real-Time Security Analytics',
    tagline: 'Streaming lakehouse on AWS processing 708M+ authentication events across 11K+ users and 22K+ endpoints with a 4-tier risk engine.',
    stack: ['AWS Kinesis', 'S3', 'Lambda', 'Terraform', 'CloudWatch', 'Streaming'],
    period: 'Dec 2025 — Feb 2026',
    impact: '15s end-to-end latency',
    accent: 'var(--red)',
  },
  {
    name: 'Artha AI',
    tagline: 'AI financial intelligence platform orchestrating LangGraph multi-agent workflows across 10+ investor philosophy models.',
    stack: ['LangGraph', 'Airflow', 'dbt Core', 'PostgreSQL', 'TimescaleDB', 'Redis'],
    period: 'Mar 2026 — Present',
    impact: '500+ equities/day',
    accent: 'var(--primary)',
  },
  {
    name: 'FinSentinel',
    tagline: 'Real-time financial news sentiment platform on GCP with Pub/Sub, Dataflow, BigQuery, and FinBERT.',
    stack: ['GCP', 'Pub/Sub', 'Dataflow', 'BigQuery', 'PyTorch', 'FastAPI', 'Redis'],
    period: 'Apr 2026 — Present',
    impact: '0.95 F1',
    accent: 'var(--teal)',
  },
  {
    name: 'Network Security',
    tagline: 'End-to-end MLOps pipeline for phishing detection with drift checks, MLflow experiments, and Dockerized FastAPI deployment.',
    stack: ['MongoDB', 'MLflow', 'FastAPI', 'Docker', 'AWS ECR', 'EC2', 'GitHub Actions'],
    period: 'Jan 2026 — Mar 2026',
    impact: '0.992 F1',
    accent: 'var(--amber)',
  },
  {
    name: 'Repo2Jac',
    tagline: 'LLM workflow automation project for translating repository changes into structured developer context and downstream actions.',
    stack: ['LLM', 'Automation', 'Workflow', 'GitHub', 'Python'],
    period: 'GitHub project',
    impact: 'Dev workflow automation',
    accent: 'var(--primary-2)',
  },
  {
    name: 'StockSense',
    tagline: 'AI financial insights chatbot that turns market signals into plain-language investment context and summaries.',
    stack: ['RAG', 'AI Chat', 'Financial Data', 'PostgreSQL', 'FastAPI'],
    period: 'GitHub project',
    impact: 'Conversational insights',
    accent: 'var(--teal)',
  },
  {
    name: 'Fintech Pipeline',
    tagline: 'Multi-source ETL orchestration project for automating finance data flows and analytics-ready transformations.',
    stack: ['ETL', 'Orchestration', 'SQL', 'Python', 'Cloud'],
    period: 'GitHub project',
    impact: 'Production data flow',
    accent: 'var(--red)',
  },
  {
    name: 'MLOps Suite',
    tagline: 'Model monitoring and deployment toolkit for tracking experiments, validating drift, and shipping models reliably.',
    stack: ['MLflow', 'Monitoring', 'Docker', 'CI/CD', 'FastAPI'],
    period: 'GitHub project',
    impact: 'Model lifecycle tooling',
    accent: 'var(--amber)',
  },
];

function ProjectsWindow({ onOpenWindow }) {
  return (
    <div style={{ ...padX, overflow: 'auto', maxHeight: '100%' }}>
      <Section title="Selected projects">
        <div style={{ marginBottom: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
          {PROJECTS.length} projects · scroll to explore ↓
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {PROJECTS.map(p => (
            <div key={p.name} style={{
              padding: 16, background: 'var(--elev)',
              border: '1px solid var(--border)', borderRadius: 12,
              display: 'flex', flexDirection: 'column', gap: 10,
              position: 'relative', overflow: 'hidden',
              transition: 'border-color 180ms, transform 180ms',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = p.accent; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: p.accent }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, color: 'var(--text)',
                }}>{p.name}</div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)' }}>{p.period}</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{p.tagline}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 'auto' }}>
                {p.stack.map(t => <Tag key={t} color={p.accent}>{t}</Tag>)}
              </div>
              <div style={{
                display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4,
                fontFamily: 'var(--font-mono)', fontSize: 11, color: p.accent,
              }}>
                <span>{p.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ============== 4. EXPERIENCE ==============
const EXPERIENCE = [
  {
    role: 'Data Engineer',
    company: 'Opsylux LLC',
    time: 'Nov 2025 — Present',
    current: true,
    bullets: [
      'Architected and own end-to-end data infrastructure, building idempotent ELT pipelines in Python, Airflow, and Azure Data Factory ingesting from REST APIs, flat files, and databases into Azure SQL.',
      'Reduced pipeline errors from 12% to under 2%, achieved 99%+ reliability, and cut reporting prep time by 50% for internal teams and client-facing data products.',
      'Designed and implemented a star schema warehouse on Azure Databricks with dbt Core transformations, GitHub Actions CI/CD, and Great Expectations validation.',
      'Reduced query load time by 30%, enforced schema validation, lineage tracking, and SLA monitoring across 3+ downstream analytical consumers.',
      'Translated business requirements into production Power BI dashboards and automated pipelines, eliminating manual reporting across internal operations and client-facing products.',
    ],
  },
  {
    role: 'Data Engineer',
    company: 'LTIMindtree',
    time: 'May 2022 — Jul 2024',
    bullets: [
      'Built and owned Python and PySpark ETL/ELT pipelines on AWS ingesting 10+ TB/day from 20+ heterogeneous sources into Redshift, BigQuery, and Databricks.',
      'Cut report delivery from 8 hours to 3 hours across multiple client environments.',
      'Led end-to-end design and implementation of medallion architecture (Bronze/Silver/Gold) on Databricks Delta Lake with Great Expectations validation across 25+ datasets.',
      'Reduced data defects by 50% and infrastructure costs by 40%.',
      'Architected Spark Structured Streaming and Kafka ingestion platform layered with dbt Core transformations, cutting reporting latency from 24 hours to 9 hours.',
      'Hardened pipeline security and observability with KMS encryption, IAM controls, CloudWatch monitoring, and Terraform IaC, achieving 99% pipeline reliability and reducing manual reconciliation by 60%.',
      'Refactored 50+ SQL transformations across Redshift and BigQuery using partition pruning, CTEs, and window functions, reducing average query runtime from 4.2 minutes to 88 seconds and saving ~$18K annually in compute costs.',
      'Engineered dbt Core transformation workflows across 3 analytics teams and data science leads, defining SLA requirements and accelerating KPI delivery by 50%.',
    ],
  },
];

function ExperienceWindow() {
  return (
    <div style={padX}>
      <Section title="Timeline">
        <div style={{ position: 'relative', paddingLeft: 28 }}>
          <div style={{ position: 'absolute', left: 10, top: 4, bottom: 4, width: 1, background: 'var(--border)' }} />
          {EXPERIENCE.map((job, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 24 }}>
              <div style={{
                position: 'absolute', left: -22, top: 4, width: 12, height: 12, borderRadius: '50%',
                background: job.current ? 'var(--teal)' : 'var(--elev-2)',
                border: '2px solid var(--bg)',
                boxShadow: job.current ? '0 0 0 3px color-mix(in oklab, var(--teal) 30%, transparent)' : 'none',
              }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600 }}>{job.role}</div>
                  <div style={{ fontSize: 13, color: 'var(--primary-2)', marginTop: 2 }}>{job.company}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{job.time}</div>
              </div>
              <ul style={{ marginTop: 10, marginBottom: 0, paddingLeft: 16, color: 'var(--text-2)', fontSize: 13, lineHeight: 1.65 }}>
                {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ============== 5. SKILLS ==============
// Curated groups — concise cards, not a resume keyword dump.
const SKILL_GROUPS = [
  {
    title: 'Languages',
    subtitle: 'Primary languages for pipelines, APIs, and analytics code.',
    accent: 'var(--primary)',
    chips: ['Python', 'SQL', 'Scala', 'Bash', 'SparkSQL'],
  },
  {
    title: 'Streaming & orchestration',
    subtitle: 'Real-time and batch workloads with dependable scheduling.',
    accent: 'var(--teal)',
    chips: ['Spark', 'Kafka', 'Flink', 'Airflow', 'Beam'],
  },
  {
    title: 'Lakehouse & quality',
    subtitle: 'Medallion-style layers, contracts, and warehouse best practices.',
    accent: 'var(--amber)',
    chips: ['Delta Lake', 'Iceberg', 'dbt Core', 'Databricks', 'Great Expectations'],
  },
  {
    title: 'Cloud',
    subtitle: 'Multi-cloud data platforms — depth on AWS, GCP, and Azure in production.',
    accent: 'var(--primary-2)',
    chips: ['AWS', 'GCP', 'Azure', 'Terraform', 'IaC & observability'],
  },
  {
    title: 'Stores & BI',
    subtitle: 'Operational stores, warehouses, and how insights are delivered.',
    accent: 'var(--primary)',
    chips: ['PostgreSQL', 'Snowflake', 'BigQuery', 'MongoDB', 'Power BI', 'Tableau'],
  },
  {
    title: 'ML, AI & shipping',
    subtitle: 'Model lifecycle, evaluation, and getting services to production.',
    accent: 'var(--amber)',
    chips: ['LangGraph', 'MLflow', 'PyTorch', 'Docker', 'Kubernetes', 'GitHub Actions'],
  },
];

function SkillsWindow() {
  return (
    <div style={{ ...padX, paddingBottom: 28 }}>
      <p style={{
        margin: '0 0 22px',
        fontSize: 14,
        color: 'var(--text-2)',
        lineHeight: 1.6,
        maxWidth: 520,
      }}>
        A tight map of how skills show up in real work — not every keyword from a résumé. Happy to go deep on any area in conversation.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))',
        gap: 14,
      }}>
        {SKILL_GROUPS.map(g => (
          <div
            key={g.title}
            style={{
              position: 'relative',
              padding: '20px 18px 18px',
              borderRadius: 14,
              background: 'linear-gradient(165deg, var(--elev) 0%, color-mix(in oklab, var(--elev) 88%, var(--bg)) 100%)',
              border: '1px solid var(--border)',
              boxShadow: '0 8px 28px -14px rgba(0,0,0,0.55)',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${g.accent}, color-mix(in oklab, ${g.accent} 45%, transparent))`,
            }} />
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 17,
              fontWeight: 600,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              marginBottom: 8,
            }}>{g.title}</div>
            <div style={{
              fontSize: 12.5,
              color: 'var(--text-2)',
              lineHeight: 1.55,
              marginBottom: 14,
            }}>{g.subtitle}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {g.chips.map(c => (
                <span
                  key={c}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    padding: '6px 10px',
                    borderRadius: 8,
                    background: 'color-mix(in oklab, var(--bg) 55%, transparent)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                >{c}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============== 6. CERTIFICATIONS ==============
const CERTS = [
  { name: 'AWS Certified Cloud Practitioner', code: 'CLF-C02', issuer: 'Amazon Web Services', color: 'var(--amber)', credlyUrl: 'https://www.credly.com/badges/1c61f0c9-465d-403f-bd14-83def5da04b0' },
  { name: 'AWS Certified AI Practitioner',    code: 'AIF-C01', issuer: 'Amazon Web Services', color: 'var(--primary)', credlyUrl: 'https://www.credly.com/badges/54c0266d-8a07-44ad-83fe-8a09f7a828d3' },
];

function CertsWindow() {
  return (
    <div style={padX}>
      <Section title="Verified credentials">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {CERTS.map(c => (
            <div key={c.code} style={{
              padding: 18, background: 'var(--elev)', borderRadius: 12,
              border: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12,
                background: `linear-gradient(135deg, ${c.color}, color-mix(in oklab, ${c.color} 30%, transparent))`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 8px 20px -6px color-mix(in oklab, ${c.color} 60%, transparent)`,
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0a0a0f" strokeWidth="2.5"><path d="M12 2l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 9l6-1z"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{c.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 3 }}>{c.issuer}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 6 }}>
                  ID: {c.code}
                </div>
              </div>
              <a href={c.credlyUrl} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, color: c.color,
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>verify credential →</a>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ============== 7. EDUCATION ==============
function EducationWindow() {
  return (
    <div style={padX}>
      <Section title="Graduate">
        <div style={{
          padding: 20, background: 'var(--elev)', borderRadius: 12,
          border: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
            <img
               src="/assets/Florida_Atlantic_Owls_logo.svg.png"
              alt="Florida Atlantic University"
               style={{ width: 54, height: 54, borderRadius: 0, objectFit: 'contain', flexShrink: 0 }}
            />
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Florida Atlantic University</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>Boca Raton, FL</div>
            </div>
          </div>
          <div style={{ fontSize: 15, color: 'var(--text)' }}>
            Master of Science in <strong>Information Technology &amp; Management</strong>
          </div>
          <div style={{
            display: 'flex', gap: 12, marginTop: 14, flexWrap: 'wrap',
            paddingTop: 14, borderTop: '1px solid var(--border)',
          }}>
            <Stat label="GPA"        value="3.9 / 4.0" />
            <Stat label="Graduation" value="May 2026" />
            <Stat label="Location"   value="Boca Raton, FL" />
          </div>
        </div>
      </Section>
      <Section title="Focus areas">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Streaming Systems', 'Lakehouse Design', 'Data Governance', 'AI Products', 'MLOps']
            .map(t => <Tag key={t}>{t}</Tag>)}
        </div>
      </Section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--text)', marginTop: 2, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

// ============== 8. IMPACT ==============
function FeedWindow() {
  return (
    <div style={padX}>
      <Section title="Impact">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <FactCard label="Scale" value="10+ TB/day" sub="AWS · Azure · GCP" />
          <FactCard label="Reliability" value="99%+" sub="Pipeline reliability" />
          <FactCard label="Latency" value="2h → <5min" sub="Opsylux reporting" />
          <FactCard label="Quality" value="0.992 F1" sub="Phishing detection" />
        </div>
      </Section>
      <Section title="Experience snapshot">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ padding: 14, background: 'var(--elev)', borderRadius: 12, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>Opsylux LLC</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>Nov 2025 — Present</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6, marginTop: 8 }}>
              Python, Airflow, Azure Data Factory, Azure Databricks, dbt Core, Great Expectations, Power BI.
            </div>
          </div>
          <div style={{ padding: 14, background: 'var(--elev)', borderRadius: 12, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>LTIMindtree</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>May 2022 — Jul 2024</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6, marginTop: 8 }}>
              Spark Structured Streaming, Kafka, Delta Lake, Redshift, BigQuery, Terraform, CloudWatch.
            </div>
          </div>
        </div>
      </Section>
      <Section title="Activity note">
        <p style={{ margin: 0, fontSize: 12.5, color: 'var(--text-2)', lineHeight: 1.6 }}>
          LinkedIn-style items returned by <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-3)' }}>/api/feed</span> are
          illustrative samples only, not live LinkedIn posts. GitHub data in that API is live when the backend is configured with a token.
        </p>
      </Section>
    </div>
  );
}

// ============== 9. CONTACT ==============
function ContactWindow() {
  const [form, setForm] = useS({ name: '', email: '', subject: 'Job Opportunity', message: '' });
  const [sent, setSent] = useS(false);
  const [loading, setLoading] = useS(false);
  const [error, setError] = useS(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(window.__API_BASE__ + '/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ name: '', email: '', subject: 'Job Opportunity', message: '' });
        setTimeout(() => setSent(false), 4000);
      } else {
        setError('Failed to send message. Try again.');
      }
    } catch (err) {
      setError('Network error. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={padX}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600 }}>Let's talk.</h2>
        <p style={{ margin: '6px 0 0', color: 'var(--text-2)', fontSize: 13, lineHeight: 1.5 }}>
          I reply within 24 hours. Open to remote and relocation.
        </p>
      </div>

      <form onSubmit={submit} data-no-drag style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Field label="Name">
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Your name" style={inputStyle} />
        </Field>
        <Field label="Email">
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com" style={inputStyle} />
        </Field>
        <Field label="Subject">
          <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={inputStyle}>
            <option>Job Opportunity</option>
            <option>Collaboration</option>
            <option>General</option>
          </select>
        </Field>
        <Field label="Message">
          <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
            placeholder="What's on your mind?" rows={5}
            style={{ ...inputStyle, resize: 'vertical', minHeight: 90, lineHeight: 1.5 }} />
        </Field>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
          <Btn disabled={loading}>{loading ? '⏳ Sending...' : (sent ? '✓ Message Sent' : 'Send Message')}</Btn>
          {error && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--red)' }}>Error: {error}</span>}
        </div>
      </form>

      <div style={{
        marginTop: 24, paddingTop: 18, borderTop: '1px solid var(--border)',
        display: 'flex', gap: 16, flexWrap: 'wrap',
      }}>
        <ContactLink icon={<IconMail />}   label="manikanthnampally94@gmail.com"           href="mailto:manikanthnampally94@gmail.com"         color="var(--primary)" />
        <ContactLink icon={<IconMail />}   label="+1 (561) 542-6494"                      href="tel:+15615426494"                            color="var(--primary)" />
        <ContactLink icon={<IconLink />}   label="linkedin.com/in/manikanthn"       href="https://www.linkedin.com/in/manikanthn/" color="var(--teal)" />
        <ContactLink icon={<IconGithub />} label="github.com/maninampally"    href="https://github.com/maninampally"   color="var(--amber)" />
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle = {
  background: 'var(--elev)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  color: 'var(--text)',
  padding: '10px 12px',
  fontSize: 13,
  fontFamily: 'var(--font-body)',
  outline: 'none',
  width: '100%',
};

function ContactLink({ icon, label, href, color }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, color: color,
      fontFamily: 'var(--font-mono)', fontSize: 12,
    }}>
      {icon}{label}
    </a>
  );
}

// ============== 10. RESUME ==============
function ResumeWindow() {
  return (
    <div style={padX}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600 }}>Résumé</h2>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>
            Resume preview · PDF · 2 pages
          </div>
        </div>
        <Btn icon={<IconDoc />} onClick={() => window.open('/assets/MANIKANTH%20NAMPALLY%20RESUME%20(1).pdf', '_blank')}>Download PDF</Btn>
      </div>
      <div style={{
        background: '#f6f7fb',
        color: '#14141f',
        borderRadius: 16,
        border: '1px solid #d7dbe8',
        overflow: 'hidden',
        boxShadow: '0 18px 40px -20px rgba(0,0,0,0.45)',
        marginBottom: 16,
      }}>
        <div style={{
          padding: '18px 22px',
          background: 'linear-gradient(180deg, #ffffff, #f3f5fb)',
          borderBottom: '1px solid #dde2ee',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#14141f' }}>
            Manikanth Nampally
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#5c5c78', marginTop: 4 }}>
            Data &amp; AI Engineer · Boca Raton, FL · manikanthnampally94@gmail.com
          </div>
        </div>
        <div style={{ display: 'grid', gap: 14, padding: 22 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 14 }}>
            <div style={{ padding: 16, background: '#ffffff', borderRadius: 12, border: '1px solid #e1e5f0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#7b8197', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Summary</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.65, color: '#202236' }}>
                Data Engineer with 2.5 years building production-grade data infrastructure and ML-ready pipelines across AWS, Azure, and GCP.
                Specialized in streaming architectures, lakehouse design, data governance, and AI-powered data products.
              </div>
            </div>
            <div style={{ padding: 16, background: '#ffffff', borderRadius: 12, border: '1px solid #e1e5f0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#7b8197', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Highlights</div>
              <div style={{ display: 'grid', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: '#202236' }}>
                <div>• 10+ TB/day data throughput</div>
                <div>• 708M+ auth events</div>
                <div>• 2 AWS certifications</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div style={{ padding: 14, background: '#ffffff', borderRadius: 12, border: '1px solid #e1e5f0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#7b8197', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>Education</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600, color: '#14141f' }}>M.S. IT &amp; Management</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#5c5c78', marginTop: 4 }}>Florida Atlantic University · GPA 3.9</div>
            </div>
            <div style={{ padding: 14, background: '#ffffff', borderRadius: 12, border: '1px solid #e1e5f0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#7b8197', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>Experience</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 600, color: '#14141f' }}>Opsylux · LTIMindtree</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#5c5c78', marginTop: 4 }}>ELT pipelines · streaming · lakehouse · analytics</div>
            </div>
            <div style={{ padding: 14, background: '#ffffff', borderRadius: 12, border: '1px solid #e1e5f0' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#7b8197', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>Core Stack</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: '#202236', lineHeight: 1.6 }}>Python · PySpark · SQL · AWS · GCP · Azure · dbt Core · Airflow</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Btn icon={<IconDoc />} onClick={() => window.open('/assets/MANIKANTH%20NAMPALLY%20RESUME%20(1).pdf', '_blank')}>
          Open Resume PDF
        </Btn>
      </div>
    </div>
  );
}

// ============== 11. ARTHA AI Spotlight ==============
function ArthaWindow({ onOpenWindow }) {
  return (
    <div style={padX}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22,
        padding: 18, background: 'linear-gradient(135deg, color-mix(in oklab, var(--primary) 18%, transparent), transparent)',
        borderRadius: 12, border: '1px solid color-mix(in oklab, var(--primary) 30%, transparent)',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 14,
          background: 'linear-gradient(135deg, var(--primary), var(--primary-2))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22,
          boxShadow: '0 10px 24px -6px var(--primary)',
        }}>α</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>
            Artha AI
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>
            AI financial intelligence platform driven by investor philosophy models.
          </div>
        </div>
        <StatusDot label="In Progress" color="var(--amber)" />
      </div>

      <Section title="The idea">
        <p style={{ margin: 0, lineHeight: 1.65, color: 'var(--text)', fontSize: 14 }}>
          Artha AI orchestrates LangGraph multi-agent workflows across 10+ investor philosophy models, scoring 500+ equities daily
          via scheduled Airflow DAGs ingesting from Polygon, SEC EDGAR, FRED, and OpenInsider.
          The pipeline uses dbt Core transformations on PostgreSQL/TimescaleDB and maintains 99%+ daily completeness with zero missed trading-day runs.
        </p>
      </Section>

      <Section title="Architecture · 5 layers">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
          {[
            { n: '01', t: 'Ingestion',   d: 'Polygon · SEC EDGAR · FRED · OpenInsider' },
            { n: '02', t: 'Orchestration', d: 'Airflow DAGs · LangGraph agents' },
            { n: '03', t: 'Transform',   d: 'dbt Core · PostgreSQL · TimescaleDB' },
            { n: '04', t: 'Serving',     d: 'FastAPI · Redis cache · pgvector' },
            { n: '05', t: 'Tracking',    d: 'MLflow · reproducible scoring runs' },
          ].map(L => (
            <div key={L.n} style={{
              padding: 12, background: 'var(--elev)', borderRadius: 10,
              border: '1px solid var(--border)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--primary)', letterSpacing: '0.1em' }}>{L.n}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{L.t}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4, lineHeight: 1.4, fontFamily: 'var(--font-mono)' }}>{L.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Stack">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Python', 'LangGraph', 'Airflow', 'dbt Core', 'PostgreSQL', 'TimescaleDB', 'Redis', 'pgvector', 'FastAPI', 'MLflow'].map(t =>
            <Tag key={t}>{t}</Tag>
          )}
        </div>
      </Section>

      <div style={{
        padding: 16, background: 'var(--elev)', borderRadius: 12,
        border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>
        <div>
          <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>Want to collaborate?</div>
          <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>
            Built for finance domain experts, research loops, and reproducible scoring runs.
          </div>
        </div>
        <Btn onClick={() => onOpenWindow('contact')}>Open Contact →</Btn>
      </div>
    </div>
  );
}

// ============== 12. STOCK DASHBOARD ==============
function StockWindow() {
  return (
    <div style={padX}>
      <h2 style={{ margin: '0 0 6px', fontFamily: 'var(--font-display)', fontSize: 22 }}>FinSentinel</h2>
      <div style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 16 }}>
        Real-time financial news sentiment platform on GCP with Pub/Sub, Dataflow, BigQuery, and FinBERT.
      </div>

      {/* mock chart placeholder */}
      <div style={{
        height: 220, background: 'var(--elev)', borderRadius: 12,
        border: '1px solid var(--border)', position: 'relative', overflow: 'hidden',
        marginBottom: 16, padding: 16,
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginBottom: 8 }}>
          // sentiment pipeline · 30d · mock
        </div>
        <svg viewBox="0 0 400 140" style={{ width: '100%', height: 160 }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--primary)" stopOpacity="0.4" />
              <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 100 L40 90 L80 88 L120 72 L160 76 L200 55 L240 60 L280 40 L320 48 L360 32 L400 35 L400 140 L0 140 Z" fill="url(#g1)" />
          <path d="M0 100 L40 90 L80 88 L120 72 L160 76 L200 55 L240 60 L280 40 L320 48 L360 32 L400 35" stroke="var(--primary)" strokeWidth="2" fill="none" />
          <path d="M0 110 L40 105 L80 102 L120 98 L160 95 L200 88 L240 82 L280 70 L320 68 L360 60 L400 58" stroke="var(--teal)" strokeWidth="2" fill="none" strokeDasharray="3 3" />
        </svg>
      </div>

      <Section title="Pipeline">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)',
          flexWrap: 'wrap',
        }}>
          {['Pub/Sub', 'Dataflow', 'BigQuery', 'dbt Core', 'FinBERT', 'FastAPI'].map((s, i, a) => (
            <React.Fragment key={s}>
              <span style={{
                padding: '6px 10px', background: 'var(--elev)',
                borderRadius: 6, border: '1px solid var(--border)', color: 'var(--text)',
              }}>{s}</span>
              {i < a.length - 1 && <span style={{ color: 'var(--primary)' }}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </Section>

      <Section title="Stack">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['GCP', 'Pub/Sub', 'Dataflow', 'BigQuery', 'PyTorch', 'FastAPI', 'Redis', 'Evidently AI', 'Airflow'].map(t => <Tag key={t} color="var(--teal)">{t}</Tag>)}
        </div>
      </Section>
    </div>
  );
}

// ============== 13. SNAPSHOT ==============
function TestimonialsWindow() {
  return (
    <div style={padX}>
      <Section title="Snapshot">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
          <FactCard label="Experience" value="2.5 years" sub="2 companies" />
          <FactCard label="Projects" value="8 major projects" sub="Artha AI · FinSentinel · StockSense" />
          <FactCard label="Education" value="M.S. IT & Management" sub="Florida Atlantic · GPA 3.9" />
          <FactCard label="Certifications" value="2 AWS certs" sub="Cloud Practitioner · AI Practitioner" />
        </div>
      </Section>
      <Section title="Core focus">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Streaming', 'Lakehouse', 'Governance', 'MLOps', 'AI Products', 'Power BI'].map(t => <Tag key={t}>{t}</Tag>)}
        </div>
      </Section>
    </div>
  );
}

// ============== ICONS ==============
function IconHome()    { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12l9-9 9 9M5 10v10h14V10"/></svg>; }
function IconUser()    { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M3 21c0-5 4-8 9-8s9 3 9 8"/></svg>; }
function IconBox()     { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 7l9-4 9 4-9 4-9-4z M3 7v10l9 4 9-4V7"/></svg>; }
function IconBriefcase() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>; }
function IconChip()    { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4"/></svg>; }
function IconAward()   { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="9" r="6"/><path d="M9 13l-2 8 5-3 5 3-2-8"/></svg>; }
function IconGrad()    { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 9l10-5 10 5-10 5z M6 11v6c0 1 3 3 6 3s6-2 6-3v-6"/></svg>; }
function IconFeed()    { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1.5" fill="currentColor"/></svg>; }
function IconMail()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>; }
function IconDoc()     { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6"/></svg>; }
function IconSparkle() { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/></svg>; }
function IconChart()   { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3v18h18 M7 14l4-4 3 3 5-6"/></svg>; }
function IconQuote()   { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 7h4v4H7zM5 17c0-4 2-6 4-6 M15 7h4v4h-4zM13 17c0-4 2-6 4-6"/></svg>; }
function IconGithub()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 8.84 21.5c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.74c0 .27.18.59.69.49A10 10 0 0 0 12 2z"/></svg>; }
function IconLink()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1 M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>; }
function IconTerm()    { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h5"/></svg>; }

// ============== EXPORT ==============
Object.assign(window, {
  HeroWindow, AboutWindow, ProjectsWindow, ExperienceWindow, SkillsWindow,
  CertsWindow, EducationWindow, FeedWindow, ContactWindow, ResumeWindow,
  ArthaWindow, StockWindow, TestimonialsWindow,
  IconHome, IconUser, IconBox, IconBriefcase, IconChip, IconAward, IconGrad,
  IconFeed, IconMail, IconDoc, IconSparkle, IconChart, IconQuote, IconGithub, IconLink, IconTerm,
});
