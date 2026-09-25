'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, Send, Trash2, Sparkles, AlertCircle, ExternalLink, ShieldAlert } from 'lucide-react';
import { answerAgriQuestion } from '../../lib/agri-knowledge';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; url: string }[];
  isFallback?: boolean;
};

const suggestions = [
  '🌾 Land preparation & seed treatment for paddy',
  '🐛 Cotton pink bollworm & sucking pest management',
  '🍅 Tomato leaf curl & yellowing symptoms',
  '🌶️ Chilli thrips, mites & viral disease remedies',
  '🌽 Maize recommended NPK fertilizer schedule',
  '💧 Drip irrigation scheduling for red & black soils',
  '🌦️ How does high humidity & rain affect spraying?',
  '📈 Warangal & Khammam chilli mandi price trends',
  '🏛️ PM-KISAN 17th installment eligibility & eKYC',
  '🚜 Best tractor HP rating for 5 acres & rotavator',
];

export default function Copilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I am Rythu Dost (రైతు దోస్త్) 🌱, your AI Farming Companion. How can I assist you with your crops, soil, pests, irrigation, mandi prices, machinery, or government schemes today?',
    }
  ]);
  const [text, setText] = useState('');
  const [farmContext, setFarmContext] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/farm')
      .then(r => r.json())
      .then(d => setFarmContext(d.farms?.[0] || null))
      .catch(() => {});
  }, []);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (value = text) => {
    const q = value.trim();
    if (!q || loading) return;

    const next: Message[] = [...messages, { role: 'user', content: q }];
    setMessages(next);
    setText('');
    setLoading(true);

    try {
      const r = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, farmContext }),
      });
      const d = await r.json();

      if (!r.ok) {
        // OpenAI API quota exhausted or offline -> Fallback gracefully to Rythu Nestham agronomy engine
        const fallback = answerAgriQuestion(q, farmContext);
        setMessages(m => [
          ...m,
          {
            role: 'assistant',
            content: `⚠️ [Notice: Live OpenAI cloud API reached its rate limit / quota limit on the server. Showing verified guidance from Rythu Dost Agronomy Knowledge Engine:]\n\n${fallback.answer}`,
            sources: fallback.sources,
            isFallback: true,
          }
        ]);
        return;
      }

      setMessages(m => [
        ...m,
        {
          role: 'assistant',
          content: d.answer,
          sources: d.sources,
        }
      ]);
    } catch (e: any) {
      // Network or unexpected error -> Use offline agronomy engine
      const fallback = answerAgriQuestion(q, farmContext);
      setMessages(m => [
        ...m,
        {
          role: 'assistant',
          content: `⚠️ [Notice: AI cloud server is currently unreachable. Providing verified agronomy guidance:]\n\n${fallback.answer}`,
          sources: fallback.sources,
          isFallback: true,
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container chat">
        <div className="card chat-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div>
              <div className="eyebrow" style={{ color: 'var(--primary)', fontWeight: 800 }}>RYTHU DOST</div>
              <h1 className="h2" style={{ margin: '4px 0 2px' }}>Your AI Farming Companion</h1>
              <p className="muted" style={{ margin: 0, fontSize: 13 }}>Ask questions about crops, pests, irrigation, mandi prices, and government schemes.</p>
            </div>
            <button
              className="btn btn-soft"
              onClick={() => setMessages([{
                role: 'assistant',
                content: 'New conversation started. I am Rythu Dost 🌱. What would you like help with?'
              }])}
            >
              <Trash2 size={16}/> Clear
            </button>
          </div>

          <div className="messages" style={{ marginTop: 18, minHeight: 320 }}>
            {messages.map((m, i) => (
              <div key={i} className={`bubble ${m.role === 'user' ? 'user' : 'assistant'} fade`}>
                <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{m.content}</div>
                {m.sources && m.sources.length > 0 && (
                  <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.08)', fontSize: 12 }}>
                    <b>Sources & References:</b>
                    <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                      {m.sources.map((s, idx) => (
                        <li key={idx}>
                          <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="bubble assistant">
                <div className="typing">
                  <span className="dot"/><span className="dot"/><span className="dot"/>
                </div>
              </div>
            )}
            <div ref={end}/>
          </div>

          {messages.length <= 2 && !loading && (
            <div style={{ marginTop: 12 }}>
              <small className="muted" style={{ display: 'block', marginBottom: 6, fontWeight: 700 }}>Quick Questions for Rythu Dost:</small>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {suggestions.map(s => (
                  <button className="btn btn-soft" key={s} onClick={() => send(s)} style={{ fontSize: 12, padding: '6px 12px' }}>
                    <Sparkles size={14}/> {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="composer" style={{ marginTop: 14 }}>
            <textarea
              className="input"
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask Rythu Dost anything about your crops, pests, fertilizers, schemes..."
            />
            <button className="btn btn-primary" onClick={() => send()} disabled={loading}>
              <Send size={18}/> Send
            </button>
          </div>

          <p className="muted" style={{ fontSize: 12, marginTop: 10, marginBottom: 0, textAlign: 'center' }}>
            Rythu Dost provides agricultural guidance based on agronomic best practices. For critical crop or livestock health emergencies, always consult your local Agricultural Extension Officer or Veterinarian.
          </p>
        </div>
      </div>
    </div>
  );
}
