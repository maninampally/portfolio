// Window content modules — all 13 sections
import React, { useEffect, useState } from 'react';
import { PERSON, RESUME_DRIVE_ID, PROJECTS, EXPERIENCE, SKILL_ROWS, CERTS } from './data.js';

// Resume URLs derived from RESUME_DRIVE_ID in data.js
const RESUME_VIEW_URL     = `https://drive.google.com/file/d/${RESUME_DRIVE_ID}/view`;
const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_DRIVE_ID}`;
const RESUME_PREVIEW_URL  = `https://drive.google.com/file/d/${RESUME_DRIVE_ID}/preview`;

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

function Btn({ children, onClick, variant = 'primary', icon, disabled = false }) {
  const styles = {
    primary: { background: 'var(--primary)', color: '#fff', border: '1px solid var(--primary)' },
    ghost:   { background: 'transparent', color: 'var(--text)', border: '1px solid var(--border-2)' },
    teal:    { background: 'var(--teal)', color: '#0a0a0f', border: '1px solid var(--teal)' },
  }[variant];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...styles, padding: '8px 14px', borderRadius: 8,
      fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
      display: 'inline-flex', alignItems: 'center', gap: 8,
      transition: 'transform 100ms, filter 100ms',
      opacity: disabled ? 0.6 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
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
            {PERSON.title} · {PERSON.yearsExp} years building production data systems
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
        <StatusDot label={PERSON.title} />
        <span style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>·</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-2)' }}>
          {PERSON.location} · {PERSON.relocate}
        </span>
        <span style={{ flex: 1 }} />
        <Tag color="var(--amber)">{PERSON.dataScale}</Tag>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10,
        marginBottom: 24,
      }}>
        {[
          ['Experience', `${PERSON.yearsExp} years`],
          ['Companies', PERSON.companies],
          ['Data Scale', PERSON.dataScale],
          ['Certs', PERSON.certCount],
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
        <Btn variant="ghost" onClick={() => window.open(PERSON.githubUrl, '_blank')} icon={<IconGithub />}>GitHub</Btn>
        <Btn variant="ghost" onClick={() => window.open(PERSON.linkedinUrl, '_blank')} icon={<IconLink />}>LinkedIn</Btn>
      </div>

      <div style={{ marginTop: 28 }}>
        <Section title="Currently">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
            <FactCard label="Role" value={PERSON.currentRole} sub={PERSON.currentCompany} />
            <FactCard label="Degree" value={PERSON.degree} sub={`Florida Atlantic · GPA ${PERSON.gpa}`} />
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
          I'm a {PERSON.title} with {PERSON.yearsExp} years of experience building production-grade data infrastructure and ML-ready pipelines across AWS, Azure, and GCP, processing {PERSON.dataScale}.
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
          <FactCard label="University" value={PERSON.universityShort} sub={PERSON.location} />
          <FactCard label="Program" value={PERSON.degree} sub={`Graduating ${PERSON.graduation}`} />
          <FactCard label="GPA" value={`${PERSON.gpa} / 4.0`} />
          <FactCard label="Experience" value={`${PERSON.yearsExp} years`} sub={`${PERSON.dataScale} · ${PERSON.companies} companies`} />
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

function ProjectsWindow({ onOpenWindow }) {
  return (
    <div style={{ ...padX, overflow: 'auto', maxHeight: '100%' }}>
      <Section title={`All Projects (${PROJECTS.length})`}>
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
                  <div style={{ fontSize: 13, color: 'var(--primary-2)', marginTop: 2 }}>
                    {job.company}
                    {job.company === 'LTIMindtree' && (
                      <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 8, fontStyle: 'italic' }}>Global IT services · 80K+ employees</span>
                    )}
                  </div>
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

// Replace proficiency bars with a categorized, logo-only skills grid.
function SkillsWindow() {
  // Categories and icon sources (SVGs from SimpleIcons CDN)
  const SKILL_CATEGORIES = [
    {
      title: 'Languages',
      items: [
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python' },
        { name: 'SQL', icon: 'https://cdn.simpleicons.org/mysql' },
        { name: 'PySpark', icon: 'https://img.icons8.com/?size=192&id=0cRqPqlItA0E&format=png' },
        { name: 'Scala', icon: 'https://cdn.simpleicons.org/scala' },
      ],
    },
    {
      title: 'Backend & APIs',
      items: [
        { name: 'FastAPI', icon: 'https://cdn.simpleicons.org/fastapi' },
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql' },
        { name: 'Kafka', icon: 'https://cdn.simpleicons.org/apachekafka' },
        { name: 'Airflow', icon: 'https://img.icons8.com/?size=192&id=H1PUQ4T216d7&format=png' },
      ],
    },
    {
      title: 'Cloud & Platforms',
      items: [
        { name: 'AWS', icon: 'https://img.icons8.com/?size=192&id=33039&format=png' },
        { name: 'GCP', icon: 'https://cdn.simpleicons.org/googlecloud' },
        { name: 'Azure', icon: 'https://img.icons8.com/?size=192&id=VLKafOkk3sBX&format=png' },
        { name: 'Databricks', icon: 'https://cdn.simpleicons.org/databricks' },
      ],
    },
    {
      title: 'Data & Analytics',
      items: [
        { name: 'dbt', icon: null },
        { name: 'Snowflake', icon: 'https://cdn.simpleicons.org/snowflake' },
        { name: 'BigQuery', icon: 'https://cdn.simpleicons.org/googlebigquery' },
        { name: 'Delta Lake', icon: 'https://cdn.simpleicons.org/delta' },
      ],
    },
    {
      title: 'Tools & DevOps',
      items: [
        { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker' },
        { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes' },
        { name: 'Terraform', icon: 'https://cdn.simpleicons.org/terraform' },
        { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github' },
      ],
    },
  ];

  // chunk helper
  const chunk = (arr, n) => {
    const out = [];
    for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
    return out;
  };

  return (
    <div style={{ ...padX, overflow: 'auto', maxHeight: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 36, letterSpacing: '0.02em' }}>TECHNICAL SKILLS</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
        {SKILL_CATEGORIES.map(cat => (
          <div key={cat.title} style={{
            padding: 20, background: 'var(--surface)', borderRadius: 14,
            border: '1px solid var(--border)', boxShadow: '0 12px 30px -14px rgba(0,0,0,0.5)',
            minHeight: 160,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 22px 40px -18px rgba(0,0,0,0.55)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 30px -14px rgba(0,0,0,0.5)'; }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>{cat.title}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {chunk(cat.items, 4).map((group, idx) => (
                <div key={idx} style={{
                  padding: 0,
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {group.map(it => (
                      <div key={it.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {it.icon ? (
                          <img src={it.icon} alt={it.name} style={{ width: 28, height: 28, objectFit: 'contain' }} />
                        ) : (
                          <div style={{
                            width: 28, height: 28, borderRadius: 8,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'color-mix(in oklab, var(--primary) 16%, transparent)',
                            border: '1px solid color-mix(in oklab, var(--primary) 30%, transparent)',
                            color: 'var(--primary-2)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                          }}>dbt</div>
                        )}
                        <div style={{ fontSize: 14, color: 'var(--text-2)' }}>{it.name}</div>
                      </div>
                    ))}
                    {group.length < 4 && Array.from({ length: 4 - group.length }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============== 6. CERTIFICATIONS ==============

function CertsWindow() {
  return (
    <div style={padX}>
      <Section title="Verified credentials">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {CERTS.map(c => (
            <a key={c.code} href={c.credlyUrl} target="_blank" rel="noopener noreferrer" style={{
              padding: 20, background: 'var(--elev)', borderRadius: 14,
              border: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
              textDecoration: 'none',
              transition: 'border-color 180ms, transform 180ms, box-shadow 180ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = c.color;
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = `0 12px 32px -8px color-mix(in oklab, ${c.color} 35%, transparent)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <img
                src={c.badgeImg}
                alt={c.name}
                style={{ width: 110, height: 110, objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
              />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>{c.issuer}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 6 }}>{c.code}</div>
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, color: c.color,
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>verify on Credly →</span>
            </a>
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
              <div style={{ fontSize: 16, fontWeight: 600 }}>{PERSON.university}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>{PERSON.location}</div>
            </div>
          </div>
          <div style={{ fontSize: 15, color: 'var(--text)' }}>
            Master of Science in <strong>Information Technology &amp; Management</strong>
          </div>
          <div style={{
            display: 'flex', gap: 12, marginTop: 14, flexWrap: 'wrap',
            paddingTop: 14, borderTop: '1px solid var(--border)',
          }}>
            <Stat label="GPA"        value={`${PERSON.gpa} / 4.0`} />
            <Stat label="Graduation" value={PERSON.graduation} />
            <Stat label="Location"   value={PERSON.location} />
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
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(window.__API_BASE__ + '/api/feed')
      .then(r => r.json())
      .then(data => {
        if (!cancelled) {
          setFeed({
            github: data.github || [],
            linkedin: data.linkedin || [],
            timestamp: data.timestamp,
          });
          setLoading(false);
        }
      })
      .catch(() => { if (!cancelled) { setFetchError(true); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  const spinner = (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
      <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span> Loading…
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
  const offline = (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
      Backend offline — start FastAPI server to see live data.
    </div>
  );

  return (
    <div style={padX}>
      <Section title="Impact">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <FactCard label="Scale" value={PERSON.dataScale} sub="AWS · Azure · GCP" />
          <FactCard label="Reliability" value="99%+" sub="Pipeline reliability" />
          <FactCard label="Latency" value="2h → <5min" sub="Opsylux reporting" />
          <FactCard label="Quality" value="0.992 F1" sub="Phishing detection" />
        </div>
      </Section>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* GitHub commits */}
        <Section title="GitHub Activity">
          {loading && spinner}
          {fetchError && offline}
          {feed && feed.github.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {feed.github.map((c, i) => (
                <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', flexDirection: 'column', gap: 3,
                  padding: '9px 11px', background: 'var(--elev)', borderRadius: 10,
                  border: '1px solid var(--border)', textDecoration: 'none',
                  transition: 'border-color 160ms',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--primary)', flexShrink: 0 }}>⬡ {c.repo}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)' }}>{c.date}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.4 }}>{c.message}</div>
                </a>
              ))}
            </div>
          )}
          {feed && feed.github.length === 0 && !loading && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
              No commits — add GITHUB_TOKEN to .env.
            </div>
          )}
          {feed?.timestamp && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)', marginTop: 6 }}>
              cached · refreshes hourly
            </div>
          )}
        </Section>

        {/* LinkedIn-style posts */}
        <Section title="Posts">
          {loading && spinner}
          {fetchError && offline}
          {feed && feed.linkedin.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {feed.linkedin.map((p, i) => (
                <div key={i} style={{
                  padding: '9px 11px', background: 'var(--elev)', borderRadius: 10,
                  border: '1px solid var(--border)',
                }}>
                  <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>{p.text}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)', marginTop: 5 }}>{p.date}</div>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}

// ============== 9. CONTACT ==============
function ContactWindow() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Job Opportunity', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
            placeholder="Your name" style={inputStyle} required />
        </Field>
        <Field label="Email">
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com" style={inputStyle} required />
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
            style={{ ...inputStyle, resize: 'vertical', minHeight: 90, lineHeight: 1.5 }} required />
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
        <ContactLink icon={<IconMail />}   label={PERSON.email}    href={`mailto:${PERSON.email}`}    color="var(--primary)" />
        <ContactLink icon={<IconMail />}   label={PERSON.phone}    href={`tel:${PERSON.phone.replace(/\D/g,'')}`} color="var(--primary)" />
        <ContactLink icon={<IconLink />}   label={PERSON.linkedin} href={PERSON.linkedinUrl}           color="var(--teal)" />
        <ContactLink icon={<IconGithub />} label={PERSON.github}   href={PERSON.githubUrl}             color="var(--amber)" />
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
    <div style={{ ...padX, display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexShrink: 0 }}>
        <div>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600 }}>Résumé</h2>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>
            Live from Google Drive · always current
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn variant="ghost" onClick={() => window.open(RESUME_VIEW_URL, '_blank')} icon={<IconLink />}>Open in Drive</Btn>
          <Btn icon={<IconDoc />} onClick={() => window.open(RESUME_DOWNLOAD_URL, '_blank')}>Download PDF</Btn>
        </div>
      </div>

      {/* Live Drive preview iframe */}
      <div style={{
        flex: 1, borderRadius: 12, overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow: '0 12px 32px -10px rgba(0,0,0,0.5)',
        minHeight: 0,
      }}>
        <iframe
          src={RESUME_PREVIEW_URL}
          title="Resume Preview"
          width="100%"
          height="100%"
          style={{ display: 'block', border: 'none', minHeight: 420 }}
          allow="autoplay"
        />
      </div>
    </div>
  );
}

// ============== 11. ARTHA AI Spotlight ==============
function ArthaWindow({ onOpenWindow }) {
  const [showArch, setShowArch] = useState(false);
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

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 4, height: 14, borderRadius: 2, background: 'var(--primary)', display: 'inline-block' }} />
            <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, color: 'var(--text-2)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Architecture · 5 layers
            </h3>
          </div>
          <button onClick={() => setShowArch(a => !a)} style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
            padding: '5px 12px', borderRadius: 8, cursor: 'pointer',
            border: '1px solid',
            borderColor: showArch ? 'var(--primary)' : 'var(--border)',
            background: showArch ? 'color-mix(in oklab, var(--primary) 15%, transparent)' : 'transparent',
            color: showArch ? 'var(--primary-2)' : 'var(--text-3)',
            transition: 'all 150ms',
          }}>
            {showArch ? '▣ Hide Diagram' : '▣ Show Diagram'}
          </button>
        </div>
        {showArch
          ? <ArthaArchDiagram />
          : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
              {[
                { n: '01', t: 'Ingestion',     d: 'Polygon · SEC EDGAR · FRED · OpenInsider' },
                { n: '02', t: 'Orchestration', d: 'Airflow DAGs · LangGraph agents' },
                { n: '03', t: 'Transform',     d: 'dbt Core · PostgreSQL · TimescaleDB' },
                { n: '04', t: 'Serving',       d: 'FastAPI · Redis cache · pgvector' },
                { n: '05', t: 'Tracking',      d: 'MLflow · reproducible scoring runs' },
              ].map(L => (
                <div key={L.n} style={{ padding: 12, background: 'var(--elev)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--primary)', letterSpacing: '0.1em' }}>{L.n}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{L.t}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4, lineHeight: 1.4, fontFamily: 'var(--font-mono)' }}>{L.d}</div>
                </div>
              ))}
            </div>
        }
      </div>

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
  const [showArch, setShowArch] = useState(false);
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
          // sentiment pipeline · 30d
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

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 4, height: 14, borderRadius: 2, background: 'var(--teal)', display: 'inline-block' }} />
            <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, color: 'var(--text-2)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Pipeline</h3>
          </div>
          <button onClick={() => setShowArch(a => !a)} style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
            padding: '5px 12px', borderRadius: 8, cursor: 'pointer',
            border: '1px solid',
            borderColor: showArch ? 'var(--teal)' : 'var(--border)',
            background: showArch ? 'color-mix(in oklab, var(--teal) 15%, transparent)' : 'transparent',
            color: showArch ? 'var(--teal)' : 'var(--text-3)',
            transition: 'all 150ms',
          }}>
            {showArch ? '▣ Hide Diagram' : '▣ Show Diagram'}
          </button>
        </div>
        {showArch
          ? <FinSentArchDiagram />
          : <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-2)', flexWrap: 'wrap' }}>
              {['Pub/Sub', 'Dataflow', 'BigQuery', 'dbt Core', 'FinBERT', 'FastAPI'].map((s, i, a) => (
                <React.Fragment key={s}>
                  <span style={{ padding: '6px 10px', background: 'var(--elev)', borderRadius: 6, border: '1px solid var(--border)', color: 'var(--text)' }}>{s}</span>
                  {i < a.length - 1 && <span style={{ color: 'var(--teal)' }}>→</span>}
                </React.Fragment>
              ))}
            </div>
        }
      </div>

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
          <FactCard label="Experience" value={`${PERSON.yearsExp} years`} sub={`${PERSON.companies} companies`} />
          <FactCard label="Projects" value="8 major projects" sub="Artha AI · FinSentinel · StockSense" />
          <FactCard label="Education" value={PERSON.degree} sub={`${PERSON.university} · GPA ${PERSON.gpa}`} />
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

// ============== ARCH DIAGRAMS ==============
const ARCH_STYLE = `
  @keyframes archFlow { from { stroke-dashoffset: 14; } to { stroke-dashoffset: 0; } }
`;

function ArchNode({ x, title, color, subs }) {
  return (
    <g>
      <rect x={x} y={30} width={108} height={94} rx={8}
        fill={color} fillOpacity="0.10"
        stroke={color} strokeOpacity="0.45" strokeWidth="1"
      />
      <text x={x + 54} y={48} textAnchor="middle"
        fill={color} fontSize="10.5" fontWeight="700" fontFamily="monospace"
      >{title}</text>
      {subs.map((s, i) => (
        <text key={i} x={x + 54} y={63 + i * 13} textAnchor="middle"
          fill="rgba(220,220,255,0.52)" fontSize="9" fontFamily="monospace"
        >{s}</text>
      ))}
    </g>
  );
}

function ArchArrows({ color, markerId }) {
  return (
    <>
      <defs>
        <marker id={markerId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L8 4 L0 8z" fill={color} fillOpacity="0.7" />
        </marker>
      </defs>
      {[[118,138],[246,266],[374,394],[502,522]].map(([x1,x2], i) => (
        <line key={i} x1={x1} y1={77} x2={x2} y2={77}
          stroke={color} strokeWidth="1.5" strokeOpacity="0.55"
          strokeDasharray="4 3"
          markerEnd={`url(#${markerId})`}
          style={{ animation: `archFlow 1.1s linear ${i * 0.22}s infinite` }}
        />
      ))}
    </>
  );
}

function ArthaArchDiagram() {
  return (
    <div style={{ padding: '14px 0 4px' }}>
      <style>{ARCH_STYLE}</style>
      <svg viewBox="0 0 630 134" width="100%" style={{ display: 'block', overflow: 'visible' }}>
        <ArchArrows color="#6C63FF" markerId="artha-arr" />
        <ArchNode x={10}  title="Ingestion"     color="#6C63FF" subs={['Polygon API','SEC EDGAR','FRED · OpenInsider']} />
        <ArchNode x={138} title="Orchestrate"   color="#1DB88E" subs={['Airflow DAGs','LangGraph','10+ models']} />
        <ArchNode x={266} title="Transform"     color="#F5A623" subs={['dbt Core','PostgreSQL','TimescaleDB']} />
        <ArchNode x={394} title="Storage"       color="#8C84FF" subs={['Redis cache','pgvector','MLflow']} />
        <ArchNode x={522} title="Serve"         color="#1DB88E" subs={['FastAPI','500+ equities/day','99%+ complete']} />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 2px 0', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)' }}>
        {['Layer 1','Layer 2','Layer 3','Layer 4','Layer 5'].map(l => (
          <span key={l} style={{ width: 108, textAlign: 'center' }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function FinSentArchDiagram() {
  return (
    <div style={{ padding: '14px 0 4px' }}>
      <style>{ARCH_STYLE}</style>
      <svg viewBox="0 0 630 134" width="100%" style={{ display: 'block', overflow: 'visible' }}>
        <ArchArrows color="#1DB88E" markerId="fins-arr" />
        <ArchNode x={10}  title="Ingest"    color="#1DB88E" subs={['News APIs','Financial feeds','HTTP / RSS']} />
        <ArchNode x={138} title="Stream"    color="#6C63FF" subs={['GCP Pub/Sub','Event queue','Low latency']} />
        <ArchNode x={266} title="Process"   color="#F5A623" subs={['Dataflow','FinBERT NLP','Sentiment score']} />
        <ArchNode x={394} title="Store"     color="#1DB88E" subs={['BigQuery','dbt Core','Evidently AI']} />
        <ArchNode x={522} title="Serve"     color="#6C63FF" subs={['FastAPI','0.95 F1','Redis cache']} />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 2px 0', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--text-3)' }}>
        {['Ingest','Stream','Process','Store','Serve'].map(l => (
          <span key={l} style={{ width: 108, textAlign: 'center' }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

// ============== TERMINAL ==============
const TERM_COMMANDS = {
  whoami: () => [
    { t: 'out', v: PERSON.name.toLowerCase() },
    { t: 'out', v: `${PERSON.titleFull.toLowerCase()} · ${PERSON.location.toLowerCase()} · ${PERSON.relocate.toLowerCase()}` },
    { t: 'out', v: `${PERSON.degree.toLowerCase()} · ${PERSON.universityShort.toLowerCase()} · gpa ${PERSON.gpa}` },
  ],
  'ls projects/': () => PROJECTS.map((p, i) => ({
    t: 'out',
    v: `${String(i + 1).padStart(2, '0')}  ${p.name.toLowerCase().replace(/\s+/g, '-').padEnd(34)} ${p.impact}`,
  })),
  'ls': () => [
    { t: 'out', v: 'projects/   experience/   skills/   education/   certs/   contact/' },
  ],
  'cat experience.json': () => [
    { t: 'out', v: '{' },
    { t: 'out', v: `  "current": { "company": "${EXPERIENCE[0].company}", "role": "${EXPERIENCE[0].role}", "since": "${EXPERIENCE[0].time.split(' ')[0]} ${EXPERIENCE[0].time.split(' ')[1]}" },` },
    { t: 'out', v: `  "previous": { "company": "${EXPERIENCE[1].company}", "role": "${EXPERIENCE[1].role}", "period": "${EXPERIENCE[1].time}" },` },
    { t: 'out', v: `  "scale": "${PERSON.dataScale}", "reliability": "99%+", "years": ${PERSON.yearsExp}` },
    { t: 'out', v: '}' },
  ],
  'mani --skills': () => [
    { t: 'out', v: 'PYTHON    ████████████  expert    3+ yrs · daily use' },
    { t: 'out', v: 'PYSPARK   ██████████    expert    2.5 yrs · production' },
    { t: 'out', v: 'AIRFLOW   ████████      strong    2 yrs · production' },
    { t: 'out', v: 'KAFKA     ███████       strong    1.5 yrs · streaming' },
    { t: 'out', v: 'DBT CORE  ███████       strong    2 yrs · 3 analytics teams' },
    { t: 'out', v: 'AWS       ██████        strong    certified · 2 yrs' },
    { t: 'out', v: 'GCP       █████         solid     bigquery · dataflow · pub/sub' },
    { t: 'out', v: 'LANGGRAPH ████          growing   artha ai · multi-agent' },
  ],
  'mani --contact': () => [
    { t: 'out', v: `email    ${PERSON.email}` },
    { t: 'out', v: `phone    ${PERSON.phone}` },
    { t: 'out', v: `linkedin ${PERSON.linkedin}` },
    { t: 'out', v: `github   ${PERSON.github}` },
  ],
  'ssh recruiter@mani.dev': () => [
    { t: 'out', v: 'Connecting to mani.dev…' },
    { t: 'out', v: 'Access granted. Opening Contact window…' },
    { t: 'action', v: 'contact' },
  ],
  'help': () => [
    { t: 'out', v: 'Available commands:' },
    { t: 'out', v: '  whoami                  who is this person' },
    { t: 'out', v: '  ls                      list sections' },
    { t: 'out', v: '  ls projects/            all 8 projects with impact metrics' },
    { t: 'out', v: '  cat experience.json     work history as JSON' },
    { t: 'out', v: '  mani --skills           skills proficiency tree' },
    { t: 'out', v: '  mani --contact          contact info' },
    { t: 'out', v: '  ssh recruiter@mani.dev  open contact window' },
    { t: 'out', v: '  clear                   clear terminal' },
  ],
  'clear': () => [{ t: 'clear', v: '' }],
};

function TerminalWindow({ onOpenWindow }) {
  const makeLine = (t, v) => ({ id: `${t}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, t, v });
  const [lines, setLines] = useState([
    makeLine('out', 'ManiOS Terminal v1.0 — type `help` to see commands'),
    makeLine('out', ''),
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const endRef = React.useRef(null);
  const inputRef = React.useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const run = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;
    setHistory(h => [trimmed, ...h]);
    setHistIdx(-1);

    const promptLine = makeLine('prompt', cmd.trim());
    const handler = TERM_COMMANDS[trimmed];
    if (!handler) {
      setLines(l => [...l, promptLine, makeLine('err', `command not found: ${trimmed}. Try 'help'.`), makeLine('out', '')]);
      return;
    }
    const results = handler();
    const clearIdx = results.findIndex(r => r.t === 'clear');
    if (clearIdx >= 0) {
      setLines([makeLine('out', '')]);
      return;
    }
    const actionItem = results.find(r => r.t === 'action');
    const outputLines = results.filter(r => r.t !== 'action');
    setLines(l => [...l, promptLine, ...outputLines.map(line => makeLine(line.t, line.v)), makeLine('out', '')]);
    if (actionItem) setTimeout(() => onOpenWindow(actionItem.v), 400);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') { run(input); setInput(''); }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] || '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx < 0 ? '' : history[idx] || '');
    }
  };

  const lineColor = { out: 'var(--text-2)', err: 'var(--red)', prompt: 'var(--teal)' };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        background: '#0a0a0f', fontFamily: 'var(--font-mono)', fontSize: 13,
        padding: '14px 18px', boxSizing: 'border-box', cursor: 'text',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {lines.map((line) => (
          <div key={line.id} style={{ color: lineColor[line.t] || 'var(--text-2)', whiteSpace: 'pre', lineHeight: 1.6 }}>
            {line.t === 'prompt'
              ? <><span style={{ color: 'var(--primary)' }}>mani@portfolio</span><span style={{ color: 'var(--text-3)' }}>:~$</span> {line.v}</>
              : line.v
            }
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
        <span style={{ color: 'var(--primary)', flexShrink: 0 }}>mani@portfolio</span>
        <span style={{ color: 'var(--text-3)', flexShrink: 0 }}>:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          autoFocus
          data-no-drag
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: 13,
            caretColor: 'var(--primary)',
          }}
        />
      </div>
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
  ArthaWindow, StockWindow, TestimonialsWindow, TerminalWindow,
  IconHome, IconUser, IconBox, IconBriefcase, IconChip, IconAward, IconGrad,
  IconFeed, IconMail, IconDoc, IconSparkle, IconChart, IconQuote, IconGithub, IconLink, IconTerm,
});

export {
  HeroWindow, AboutWindow, ProjectsWindow, ExperienceWindow, SkillsWindow,
  CertsWindow, EducationWindow, FeedWindow, ContactWindow, ResumeWindow,
  ArthaWindow, StockWindow, TestimonialsWindow, TerminalWindow,
  IconHome, IconUser, IconBox, IconBriefcase, IconChip, IconAward, IconGrad,
  IconFeed, IconMail, IconDoc, IconSparkle, IconChart, IconQuote, IconGithub, IconLink, IconTerm,
};
