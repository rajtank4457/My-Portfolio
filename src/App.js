import { useState, useEffect, useRef } from "react";

// ── EMAILJS CONFIG ────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_7qam1nd";
const EMAILJS_TEMPLATE_ID = "template_y0mp1su";
const EMAILJS_PUBLIC_KEY  = "FUaZn-XuLqJ464IY8";

// ── DATA ──────────────────────────────────────────────────────────────────────
const ME = {
  email: "rajtank4457@gmail.com",
  phone: "+91 75678 00491",
  github: "https://github.com/rajtank4457",
  linkedin: "https://www.linkedin.com/in/raj-tank-52501b265/",
  summary: "Final-year M.Sc. Blockchain student at MIT-WPU. 4 months shipping a live multi-vendor eCommerce platform at PM Communications. I build with React, Next.js, Solidity — whatever the problem needs.",
};

const PROJECTS = [
  { name:"VendorHub", desc:"Live multi-vendor eCommerce platform built during internship — vendor dashboards, product catalogue, fully responsive UX.", stack:["React.js","Tailwind CSS","JavaScript"], live:"https://vendorhubonlinestore.lovable.app/", tag:"Internship", color:"#00ff9d" },
  { name:"Unity Talk", desc:"Discord-inspired real-time chat with WebSocket-powered channel messaging and sub-200ms latency.", stack:["React.js","Next.js","WebSockets","Tailwind"], repo:"https://github.com/rajtank4457", tag:"Personal", color:"#a78bfa" },
  { name:"mUSD DeFi", desc:"DeFi interface for mStable stablecoin — swap, save, yield-earn via Solidity smart contracts on Ethereum testnet.", stack:["Solidity","Web3.js","React.js","Tailwind"], repo:"https://github.com/rajtank4457", tag:"Blockchain", color:"#38bdf8" },
  { name:"Portfolio", desc:"This very site — scroll-triggered animations, particle canvas, scramble text, magnetic buttons, contact form with EmailJS.", stack:["React.js","Node.js","Tailwind CSS"], live:"https://rajtank-portfolio-website.netlify.app", repo:"https://github.com/rajtank4457/My-Portfolio", tag:"Personal", color:"#f472b6" },
];

const CERTS = [
  { name:"Blockchain in Depth",                  issuer:"Infosys Springboard",   date:"Nov 2025", icon:"🏢" },
  { name:"Blockchain for Enterprises",            issuer:"Infosys Springboard",   date:"Nov 2025", icon:"🏢" },
  { name:"Blockchain Fundamentals",               issuer:"101 Blockchains",       date:"Nov 2024", icon:"⛓" },
  { name:"Python Data Structures",                issuer:"Great Learning Academy", date:"Nov 2024", icon:"🐍" },
  { name:"Introduction to Blockchain & Solidity", issuer:"DApp World × MIT-WPU",  date:"Sept 2024",icon:"🎓" },
];

const NAV_ITEMS = ["about","experience","projects","certifications","contact"];

// ── BREAKPOINT HOOK ───────────────────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState({ isMobile: false, isTablet: false, isDesktop: true });
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setBp({ isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 });
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return bp;
}

// ── TEXT SCRAMBLE ─────────────────────────────────────────────────────────────
function useScramble(target, trigger) {
  const [text, setText] = useState(target);
  const CHARS = "!<>-_\\/[]{}—=+*^?#@$%ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  useEffect(() => {
    if (!trigger) return;
    let iter = 0, total = target.length * 3;
    const id = setInterval(() => {
      setText(target.split("").map((ch, i) => {
        if (ch === " ") return " ";
        if (i < iter / 3) return target[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(""));
      if (++iter > total) { setText(target); clearInterval(id); }
    }, 30);
    return () => clearInterval(id);
  }, [trigger, target]);
  return text;
}

// ── MAGNETIC BUTTON (desktop only) ───────────────────────────────────────────
function MagBtn({ children, style = {}, onClick, href, target: tgt, onMouseEnter, onMouseLeave }) {
  const ref = useRef(null);
  const { isMobile, isTablet } = useBreakpoint();
  const move = (e) => {
    if (isMobile || isTablet) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.3;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    ref.current.style.transform = `translate(${x}px,${y}px) scale(1.05)`;
  };
  const leave = (e) => {
    ref.current.style.transform = "translate(0,0) scale(1)";
    onMouseLeave && onMouseLeave(e);
  };
  const enter = (e) => { onMouseEnter && onMouseEnter(e); };
  const base = { ref, onMouseMove:move, onMouseLeave:leave, onMouseEnter:enter, style:{ transition:"transform 0.3s cubic-bezier(.23,1,.32,1)", ...style } };
  if (href) return <a href={href} target={tgt} rel="noopener noreferrer" {...base}>{children}</a>;
  return <button onClick={onClick} {...base}>{children}</button>;
}

// ── PARTICLE CANVAS (disabled on mobile) ─────────────────────────────────────
function Particles() {
  const cv = useRef(null);
  const { isMobile } = useBreakpoint();
  useEffect(() => {
    if (isMobile) return;
    const canvas = cv.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth, H = canvas.height = window.innerHeight;
    let mx = W/2, my = H/2;
    const N = window.innerWidth < 1024 ? 40 : 80;
    const pts = Array.from({length:N}, () => ({
      x:Math.random()*W, y:Math.random()*H,
      vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4,
      r:Math.random()*1.4+.4,
    }));
    const onR = () => { W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; };
    const onM = (e) => { mx=e.clientX; my=e.clientY; };
    window.addEventListener("resize",onR); window.addEventListener("mousemove",onM);
    let raf;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        const ddx=p.x-mx, ddy=p.y-my, dd=Math.sqrt(ddx*ddx+ddy*ddy);
        if(dd<90){ p.vx+=ddx/dd*.07; p.vy+=ddy/dd*.07; }
        const mv=1.4; p.vx=Math.max(-mv,Math.min(mv,p.vx*.992)); p.vy=Math.max(-mv,Math.min(mv,p.vy*.992));
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(0,255,157,0.4)"; ctx.fill();
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){ ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.strokeStyle=`rgba(0,255,157,${.12*(1-d/110)})`; ctx.lineWidth=.5; ctx.stroke(); }
      }
      raf=requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize",onR); window.removeEventListener("mousemove",onM); };
  }, [isMobile]);
  if (isMobile) return null;
  return <canvas ref={cv} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",opacity:.55}} />;
}

// ── CUSTOM CURSOR (desktop only) ─────────────────────────────────────────────
function Cursor() {
  const { isMobile, isTablet } = useBreakpoint();
  const cur = useRef(null);
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    if (isMobile || isTablet) return;
    const move = (e) => {
      if (!cur.current) return;
      cur.current.style.left = e.clientX + "px";
      cur.current.style.top  = e.clientY + "px";
    };
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile, isTablet]);

  if (isMobile || isTablet) return null;
  const size = hovering ? 36 : 20;
  const color = hovering ? "#00ff9d" : "rgba(255,255,255,0.85)";
  return (
    <div ref={cur} style={{ position:"fixed", pointerEvents:"none", zIndex:9999, transform:"translate(-50%,-50%)", transition:"width 0.2s ease, height 0.2s ease", width:size, height:size }}>
      <div style={{ position:"absolute", top:0, left:0, width:6, height:6, borderTop:`1.5px solid ${color}`, borderLeft:`1.5px solid ${color}`, transition:"border-color 0.2s" }} />
      <div style={{ position:"absolute", top:0, right:0, width:6, height:6, borderTop:`1.5px solid ${color}`, borderRight:`1.5px solid ${color}`, transition:"border-color 0.2s" }} />
      <div style={{ position:"absolute", bottom:0, left:0, width:6, height:6, borderBottom:`1.5px solid ${color}`, borderLeft:`1.5px solid ${color}`, transition:"border-color 0.2s" }} />
      <div style={{ position:"absolute", bottom:0, right:0, width:6, height:6, borderBottom:`1.5px solid ${color}`, borderRight:`1.5px solid ${color}`, transition:"border-color 0.2s" }} />
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:hovering?4:3, height:hovering?4:3, borderRadius:"50%", background:color, transition:"all 0.2s" }} />
    </div>
  );
}

// ── SCROLL REVEAL ─────────────────────────────────────────────────────────────
function Reveal({ children, delay=0, y=24 }) {
  const ref = useRef(null); const [v,setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e])=>{ if(e.isIntersecting){setV(true);o.disconnect();} },{threshold:.08});
    if(ref.current) o.observe(ref.current);
    return ()=>o.disconnect();
  },[]);
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"none":`translateY(${y}px)`,transition:`opacity .6s cubic-bezier(.23,1,.32,1) ${delay}s,transform .6s cubic-bezier(.23,1,.32,1) ${delay}s`}}>{children}</div>;
}

// ── COUNTER ───────────────────────────────────────────────────────────────────
function Counter({ to, suffix="" }) {
  const [val,setVal] = useState(0); const ref=useRef(null);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting)return; o.disconnect();
      let s=0; const step=()=>{ s+=to/45; setVal(Math.min(Math.round(s*10)/10,to)); if(s<to)requestAnimationFrame(step); };
      requestAnimationFrame(step);
    },{threshold:.5});
    if(ref.current) o.observe(ref.current);
    return ()=>o.disconnect();
  },[to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ── SKILL BAR ─────────────────────────────────────────────────────────────────
function SkillBar({ label, level, color, delay=0 }) {
  const [w,setW]=useState(0); const ref=useRef(null);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{ if(e.isIntersecting){setTimeout(()=>setW(level),delay*1000);o.disconnect();} },{threshold:.3});
    if(ref.current) o.observe(ref.current);
    return ()=>o.disconnect();
  },[level,delay]);
  return (
    <div ref={ref} style={{marginBottom:14}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
        <span style={{fontSize:13,color:"rgba(255,255,255,0.65)"}}>{label}</span>
        <span style={{fontSize:12,color,fontWeight:500}}>{level}%</span>
      </div>
      <div style={{height:3,background:"rgba(255,255,255,0.06)",borderRadius:3,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${w}%`,background:`linear-gradient(90deg,${color}55,${color})`,borderRadius:3,transition:"width 1.3s cubic-bezier(.23,1,.32,1)"}} />
      </div>
    </div>
  );
}

// ── TOAST ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(()=>{ const t=setTimeout(onClose,5000); return ()=>clearTimeout(t); },[onClose]);
  const ok = type==="success";
  return (
    <div style={{position:"fixed",bottom:20,right:20,left:20,zIndex:9999,background:ok?"#00ff9d":"#ff4d4d",color:ok?"#050f0a":"#1a0000",borderRadius:12,padding:"14px 18px",display:"flex",alignItems:"center",gap:12,fontSize:14,fontWeight:600,boxShadow:`0 0 40px ${ok?"rgba(0,255,157,0.3)":"rgba(255,77,77,0.3)"}`,animation:"toastIn .4s ease"}}>
      <span>{ok?"✓":"✕"}</span><span style={{flex:1}}>{msg}</span>
      <button onClick={onClose} style={{background:"none",border:"none",color:ok?"#050f0a":"#1a0000",fontSize:20,opacity:.5,padding:0}}>×</button>
    </div>
  );
}

// ── CONTACT FORM ──────────────────────────────────────────────────────────────
function ContactForm({ setToast }) {
  const fRef=useRef(null);
  const [form,setForm]=useState({from_name:"",from_email:"",subject:"",message:""});
  const [errors,setErrors]=useState({});
  const [sending,setSending]=useState(false);
  const { isMobile } = useBreakpoint();

  const validate=()=>{
    const e={};
    if(!form.from_name.trim()) e.from_name="Required";
    if(!/\S+@\S+\.\S+/.test(form.from_email)) e.from_email="Valid email required";
    if(form.message.trim().length<20) e.message="Min 20 characters";
    return e;
  };

  const change=(k)=>(e)=>{ setForm(p=>({...p,[k]:e.target.value})); setErrors(p=>({...p,[k]:undefined})); };

  const submit=async(e)=>{
    e.preventDefault();
    const errs=validate();
    if(Object.keys(errs).length){setErrors(errs);return;}
    setSending(true);
    try {
      await new Promise((res,rej)=>{
        if(document.querySelector('script[src*="emailjs"]')){ res(); return; }
        const s=document.createElement("script");
        s.src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
        s.onload=res; s.onerror=rej;
        document.head.appendChild(s);
      });
      await window.emailjs.sendForm(EMAILJS_SERVICE_ID,EMAILJS_TEMPLATE_ID,fRef.current,EMAILJS_PUBLIC_KEY);
      setToast({msg:"Message sent! I'll reply within 24 hours ✦",type:"success"});
      setForm({from_name:"",from_email:"",subject:"",message:""});
    } catch {
      setToast({msg:"Couldn't send. Email me: rajtank4457@gmail.com",type:"error"});
    } finally { setSending(false); }
  };

  const inp=(k)=>({
    width:"100%",background:"rgba(255,255,255,0.03)",
    border:`1px solid ${errors[k]?"#ff4d4d":"rgba(255,255,255,0.1)"}`,
    borderRadius:10,padding:"12px 14px",fontSize:15,color:"#f0f0f0",
    fontFamily:"inherit",outline:"none",boxSizing:"border-box",transition:"border-color .2s,box-shadow .2s",
  });
  const lbl={fontSize:12,color:"rgba(255,255,255,0.38)",letterSpacing:"0.08em",textTransform:"uppercase",display:"block",marginBottom:7};
  const focus=(e)=>{ e.target.style.borderColor="#00ff9d"; e.target.style.boxShadow="0 0 0 3px rgba(0,255,157,0.08)"; };
  const blur=(k)=>(e)=>{ e.target.style.borderColor=errors[k]?"#ff4d4d":"rgba(255,255,255,0.1)"; e.target.style.boxShadow="none"; };

  return (
    <form ref={fRef} onSubmit={submit} noValidate style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:14}}>
        {[["from_name","Your name","e.g. Priya Sharma"],["from_email","Email","you@company.com"]].map(([k,label,ph])=>(
          <div key={k}>
            <label style={lbl}>{label}</label>
            <input name={k} value={form[k]} onChange={change(k)} placeholder={ph} style={inp(k)} onFocus={focus} onBlur={blur(k)} />
            {errors[k]&&<span style={{fontSize:12,color:"#ff4d4d",marginTop:3,display:"block"}}>{errors[k]}</span>}
          </div>
        ))}
      </div>
      <div>
        <label style={lbl}>Subject</label>
        <input name="subject" value={form.subject} onChange={change("subject")} placeholder="Job opportunity / Freelance / Collaboration" style={inp("subject")} onFocus={focus} onBlur={blur("subject")} />
      </div>
      <div>
        <label style={lbl}>Message *</label>
        <textarea name="message" value={form.message} onChange={change("message")} rows={5} placeholder="Tell me about the project, role, or what you'd like to work on…" style={{...inp("message"),resize:"vertical",minHeight:120}} onFocus={focus} onBlur={blur("message")} />
        <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
          {errors.message?<span style={{fontSize:12,color:"#ff4d4d"}}>{errors.message}</span>:<span/>}
          <span style={{fontSize:12,color:"rgba(255,255,255,0.2)"}}>{form.message.length} chars</span>
        </div>
      </div>
      <button type="submit" disabled={sending} style={{background:sending?"rgba(0,255,157,0.3)":"#00ff9d",color:"#050f0a",border:"none",borderRadius:10,padding:"13px 28px",fontSize:15,fontWeight:700,fontFamily:"'Clash Display',sans-serif",display:"flex",alignItems:"center",gap:10,opacity:sending?.7:1,alignSelf:"flex-start",cursor:"pointer",touchAction:"manipulation"}}>
        {sending?<><span style={{width:16,height:16,border:"2px solid rgba(5,15,10,0.3)",borderTopColor:"#050f0a",borderRadius:"50%",animation:"spin .7s linear infinite",display:"inline-block"}}/>Sending…</>:"Send message →"}
      </button>
    </form>
  );
}

// ── PROJECT CARD ──────────────────────────────────────────────────────────────
function ProjectCard({ p, i }) {
  const [hov,setHov]=useState(false);
  return (
    <Reveal delay={i*.08}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{background:hov?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.02)",border:`1px solid ${hov?p.color+"55":"rgba(255,255,255,0.07)"}`,borderRadius:16,padding:"22px 22px 18px",display:"flex",flexDirection:"column",height:"100%",transform:hov?"translateY(-4px)":"none",transition:"all .35s cubic-bezier(.23,1,.32,1)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-50,right:-50,width:130,height:130,borderRadius:"50%",background:`radial-gradient(circle,${p.color}15 0%,transparent 70%)`,opacity:hov?1:0,transition:"opacity .4s",pointerEvents:"none"}} />
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,gap:8}}>
          <h3 style={{fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(17px,4vw,21px)",fontWeight:600,margin:0,color:"#f0f0f0"}}>{p.name}</h3>
          <span style={{fontSize:10,padding:"3px 9px",borderRadius:20,background:`${p.color}18`,color:p.color,border:`1px solid ${p.color}33`,whiteSpace:"nowrap",flexShrink:0}}>{p.tag}</span>
        </div>
        <p style={{fontSize:14,color:"rgba(255,255,255,0.45)",lineHeight:1.75,margin:"0 0 16px",flex:1}}>{p.desc}</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
          {p.stack.map(s=><span key={s} style={{fontSize:11,padding:"3px 9px",borderRadius:20,background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.38)"}}>{s}</span>)}
        </div>
        <div style={{display:"flex",gap:16,borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:12}}>
          {p.live&&<a href={p.live} target="_blank" rel="noopener noreferrer" style={{fontSize:13,color:p.color,textDecoration:"none",padding:"4px 0",minHeight:44,display:"flex",alignItems:"center"}}>Live ↗</a>}
          {p.repo&&<a href={p.repo} target="_blank" rel="noopener noreferrer" style={{fontSize:13,color:"rgba(255,255,255,0.3)",textDecoration:"none",padding:"4px 0",minHeight:44,display:"flex",alignItems:"center"}}>GitHub ↗</a>}
        </div>
      </div>
    </Reveal>
  );
}

// ── MAIN PORTFOLIO ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [active,setActive]=useState("hero");
  const [scrolled,setScrolled]=useState(false);
  const [heroIn,setHeroIn]=useState(false);
  const [scramble,setScramble]=useState(false);
  const [toast,setToast]=useState(null);
  const [menuOpen,setMenuOpen]=useState(false);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const nameText = useScramble("RAJ TANK", scramble);

  useEffect(()=>{
    if(!document.getElementById("pf")){
      const l=document.createElement("link"); l.id="pf"; l.rel="stylesheet";
      l.href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=outfit@300,400,500,600&display=swap";
      document.head.appendChild(l);
    }
    const st=document.createElement("style"); st.id="pg-st";
    st.textContent=`
      *{box-sizing:border-box;margin:0;padding:0}
      ::-webkit-scrollbar{width:3px}
      ::-webkit-scrollbar-track{background:#060d08}
      ::-webkit-scrollbar-thumb{background:#00ff9d33;border-radius:4px}
      ::selection{background:#00ff9d22;color:#00ff9d}
      @media(min-width:1024px){body,a,button{cursor:none!important}}
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
      @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      @keyframes toastIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      @keyframes pulseRing{0%{transform:scale(.85);opacity:.5}100%{transform:scale(1.8);opacity:0}}
      @keyframes menuSlide{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
      input,textarea,button{font-family:'Outfit',sans-serif}
    `;
    if(!document.getElementById("pg-st")) document.head.appendChild(st);

    setTimeout(()=>{ setHeroIn(true); setTimeout(()=>setScramble(true),350); },80);

    const onScroll=()=>{
      setScrolled(window.scrollY>50);
      const ids=["hero",...NAV_ITEMS];
      for(const id of ids){ const el=document.getElementById(id); if(!el)continue; if(el.getBoundingClientRect().top<=120)setActive(id); }
    };
    window.addEventListener("scroll",onScroll,{passive:true});
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);

  // Close mobile menu on nav click
  const scrollTo=(id)=>{ document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenuOpen(false); };

  const PAD = "0 clamp(18px,5vw,60px)";
  const W = { maxWidth:960, margin:"0 auto", padding:PAD };

  const SecHead=({n,title})=>(
    <Reveal>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:isMobile?32:48}}>
        <span style={{fontSize:11,color:"#00ff9d",letterSpacing:".18em",textTransform:"uppercase",opacity:.6}}>{n} —</span>
        <h2 style={{fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(26px,5vw,46px)",fontWeight:600,letterSpacing:"-.025em",color:"#f0f0f0"}}>{title}</h2>
      </div>
    </Reveal>
  );

  return (
    <div style={{background:"#060d08",color:"#e8f0ea",fontFamily:"'Outfit',sans-serif",lineHeight:1.7,minHeight:"100vh",overflowX:"hidden"}}>
      {isDesktop && <Cursor />}
      <Particles />

      {/* Noise texture */}
      <div style={{position:"fixed",inset:0,zIndex:1,pointerEvents:"none",backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",opacity:.022}} />

      {/* ── NAVBAR ── */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,height:60,padding:PAD,display:"flex",alignItems:"center",justifyContent:"space-between",background:scrolled||menuOpen?"rgba(6,13,8,0.95)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?"1px solid rgba(0,255,157,0.07)":"none",transition:"background .3s, border-color .3s"}}>
        <button onClick={()=>scrollTo("hero")} style={{background:"none",border:"none",fontFamily:"'Clash Display',sans-serif",fontSize:22,fontWeight:600,color:"#00ff9d",letterSpacing:".05em",padding:0}}>RT.</button>

        {/* Desktop nav links */}
        {!isMobile && (
          <div style={{display:"flex",gap:2}}>
            {NAV_ITEMS.map(n=>(
              <button key={n} onClick={()=>scrollTo(n)} style={{background:"none",border:"none",padding:isTablet?"6px 10px":"6px 14px",borderRadius:8,fontSize:isTablet?13:14,color:active===n?"#00ff9d":"rgba(255,255,255,0.38)",transition:"color .2s",textTransform:"capitalize",position:"relative"}}>
                {active===n&&<span style={{position:"absolute",bottom:1,left:"50%",transform:"translateX(-50%)",width:4,height:4,borderRadius:"50%",background:"#00ff9d"}} />}
                {n}
              </button>
            ))}
          </div>
        )}

        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          {!isMobile && (
            <MagBtn href={`mailto:${ME.email}`} style={{background:"rgba(0,255,157,0.08)",border:"1px solid rgba(0,255,157,0.22)",color:"#00ff9d",borderRadius:8,padding:"7px 16px",fontSize:13,textDecoration:"none",display:"block"}}>
              hire me
            </MagBtn>
          )}
          {/* Hamburger */}
          {isMobile && (
            <button onClick={()=>setMenuOpen(o=>!o)} style={{background:"none",border:"none",color:"#e8f0ea",fontSize:24,padding:"4px",lineHeight:1}}>
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {isMobile && menuOpen && (
        <div style={{position:"fixed",inset:0,zIndex:190,background:"rgba(6,13,8,0.98)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,animation:"menuSlide .3s ease"}}>
          {NAV_ITEMS.map(n=>(
            <button key={n} onClick={()=>scrollTo(n)} style={{background:"none",border:"none",fontFamily:"'Clash Display',sans-serif",fontSize:32,fontWeight:600,color:active===n?"#00ff9d":"#e8f0ea",padding:"10px 20px",textTransform:"capitalize"}}>
              {n}
            </button>
          ))}
          <a href={`mailto:${ME.email}`} style={{marginTop:20,background:"#00ff9d",color:"#050f0a",borderRadius:10,padding:"13px 32px",fontSize:16,fontWeight:700,fontFamily:"'Clash Display',sans-serif",textDecoration:"none"}}>
            hire me
          </a>
        </div>
      )}

      {/* Side dots — desktop only */}
      {isDesktop && (
        <div style={{position:"fixed",right:18,top:"50%",transform:"translateY(-50%)",zIndex:50,display:"flex",flexDirection:"column",gap:8}}>
          {["hero",...NAV_ITEMS].map(s=>(
            <button key={s} onClick={()=>scrollTo(s)} style={{width:active===s?24:7,height:7,borderRadius:4,border:"none",background:active===s?"#00ff9d":"rgba(255,255,255,0.18)",transition:"all .3s",padding:0}} />
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative",overflow:"hidden",...W,paddingTop:80,paddingBottom:60}}>
        {isDesktop && [520,380,260].map((sz,i)=>(
          <div key={sz} style={{position:"absolute",right:`${-15+i*5}%`,top:`${8+i*10}%`,width:sz,height:sz,borderRadius:"50%",border:`1px solid rgba(0,255,157,${.04-i*.01})`,animation:`pulseRing ${4+i*1.5}s ease-out infinite`,animationDelay:`${i*.8}s`,pointerEvents:"none"}} />
        ))}
        <div style={{opacity:heroIn?1:0,transform:heroIn?"none":"translateY(28px)",transition:"all 1s cubic-bezier(.23,1,.32,1)"}}>
          <div style={{fontSize:12,color:"#00ff9d",letterSpacing:".18em",textTransform:"uppercase",marginBottom:18,opacity:.65}}>
            Full Stack · Blockchain · Builder
          </div>
          <h1 style={{fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(52px,13vw,108px)",fontWeight:600,lineHeight:.9,letterSpacing:"-.03em",margin:"0 0 6px"}}>
            {nameText.split(" ").map((w,wi)=>(
              <span key={wi} style={{display:"block",color:wi===1?"#00ff9d":"#f0f0f0"}}>{w}</span>
            ))}
          </h1>
          <p style={{fontSize:"clamp(15px,2.5vw,18px)",color:"rgba(255,255,255,0.42)",maxWidth:500,margin:"24px 0 36px",fontWeight:300,lineHeight:1.85}}>
            {ME.summary}
          </p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <button onClick={()=>scrollTo("projects")} style={{background:"#00ff9d",color:"#050f0a",border:"none",borderRadius:10,padding:isMobile?"12px 24px":"14px 30px",fontSize:15,fontWeight:700,fontFamily:"'Clash Display',sans-serif",touchAction:"manipulation"}}>
              View projects →
            </button>
            <button onClick={()=>scrollTo("contact")} style={{background:"transparent",color:"#e8f0ea",border:"1px solid rgba(255,255,255,0.15)",borderRadius:10,padding:isMobile?"12px 24px":"14px 30px",fontSize:15,touchAction:"manipulation"}}>
              Get in touch
            </button>
          </div>
          <div style={{display:"flex",gap:isMobile?16:24,marginTop:40,flexWrap:"wrap"}}>
            {[{l:"GitHub",u:ME.github},{l:"LinkedIn",u:ME.linkedin},{l:isMobile?"Email":ME.email,u:`mailto:${ME.email}`}].map(x=>(
              <a key={x.l} href={x.u} target="_blank" rel="noopener noreferrer" style={{color:"rgba(255,255,255,0.25)",fontSize:13,textDecoration:"none",transition:"color .2s",padding:"4px 0",minHeight:44,display:"flex",alignItems:"center"}}
                onMouseEnter={e=>e.currentTarget.style.color="#00ff9d"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.25)"}
              >{x.l} ↗</a>
            ))}
          </div>
        </div>
        <div style={{position:"absolute",bottom:32,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,opacity:.3}}>
          <div style={{width:1,height:40,background:"linear-gradient(to bottom,transparent,#00ff9d)",animation:"float 2s ease-in-out infinite"}} />
          <span style={{fontSize:9,color:"#00ff9d",letterSpacing:".15em",textTransform:"uppercase"}}>scroll</span>
        </div>
      </section>

      {/* Marquee ticker */}
      <div style={{borderTop:"1px solid rgba(0,255,157,0.07)",borderBottom:"1px solid rgba(0,255,157,0.07)",padding:"12px 0",overflow:"hidden",background:"rgba(0,255,157,0.02)",position:"relative",zIndex:2}}>
        <div style={{display:"flex",animation:"marquee 20s linear infinite",whiteSpace:"nowrap",width:"fit-content"}}>
          {Array(4).fill(["React.js","Next.js","Solidity","Web3.js","Tailwind CSS","Node.js","Python","DeFi","Smart Contracts","Blockchain","Full Stack","Ethereum"]).flat().map((s,i)=>(
            <span key={i} style={{marginRight:32,fontSize:12,color:"rgba(0,255,157,0.5)",letterSpacing:".08em"}}>
              {i%3===0?"✦":"·"} {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" style={{padding:isMobile?"70px 0 50px":"110px 0 70px"}}>
        <div style={W}>
          <SecHead n="01" title="About me" />
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"1fr":"1fr 1.15fr",gap:isMobile?36:isTablet?40:64,alignItems:"start"}}>
            <div>
              <Reveal delay={.1}>
                <p style={{fontSize:isMobile?15:16,color:"rgba(255,255,255,0.55)",lineHeight:1.9,marginBottom:18}}>
                  I'm a final-year M.Sc. Blockchain Technology student at MIT World Peace University, Pune,
                  with a BCA (CGPA 8.09) from VNSGU. I spent 4 months as a full-stack intern at{" "}
                  <span style={{color:"#00ff9d"}}>PM Communications</span> in Ahmedabad — shipping a live multi-vendor eCommerce platform from scratch.
                </p>
                <p style={{fontSize:isMobile?15:16,color:"rgba(255,255,255,0.55)",lineHeight:1.9,marginBottom:28}}>
                  Outside web dev, I'm deep into blockchain — writing Solidity contracts, building DeFi interfaces,
                  and holding <span style={{color:"#00ff9d"}}>5 industry certifications</span> including two from Infosys Springboard.
                </p>
              </Reveal>
              <Reveal delay={.2}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  {[{n:4,s:"+",l:"Projects shipped",c:"#00ff9d"},{n:5,s:"",l:"Certifications",c:"#a78bfa"},{n:4,s:"mo",l:"Internship",c:"#38bdf8"},{n:8.09,s:"",l:"BCA CGPA",c:"#f472b6"}].map(x=>(
                    <div key={x.l} style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"16px",position:"relative",overflow:"hidden"}}>
                      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:x.c,opacity:.45}} />
                      <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(26px,6vw,34px)",fontWeight:600,color:x.c,lineHeight:1}}><Counter to={x.n} suffix={x.s} /></div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,0.32)",marginTop:5}}>{x.l}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Skills — shown below stats on mobile */}
            <Reveal delay={.15}>
              <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:16,padding:"24px"}}>
                {[
                  {cat:"Frontend",skills:[["React / Next.js",92,"#00ff9d"],["Tailwind CSS",88,"#00ff9d"],["JavaScript ES6+",85,"#00ff9d"]]},
                  {cat:"Blockchain",skills:[["Solidity",80,"#a78bfa"],["Web3.js / DeFi",75,"#a78bfa"]]},
                  {cat:"Backend",skills:[["Node.js / Python",78,"#38bdf8"],["PHP / REST APIs",70,"#38bdf8"]]},
                ].map((g,gi)=>(
                  <div key={g.cat} style={{marginBottom:gi<2?22:0}}>
                    <h3 style={{fontSize:10,fontWeight:500,color:"rgba(255,255,255,0.28)",letterSpacing:".12em",textTransform:"uppercase",marginBottom:14}}>{g.cat}</h3>
                    {g.skills.map(([l,v,c],i)=><SkillBar key={l} label={l} level={v} color={c} delay={gi*.12+i*.07} />)}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{padding:isMobile?"70px 0 50px":"110px 0 70px"}}>
        <div style={W}>
          <SecHead n="02" title="Experience" />
          <Reveal delay={.1}>
            {/* Timeline layout: stack on mobile */}
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"1fr":"160px 1fr",gap:0,position:"relative"}}>
              {!isMobile && <div style={{position:"absolute",left:isTablet?0:159,top:24,bottom:24,width:1,background:"linear-gradient(to bottom,#00ff9d55,transparent)"}} />}

              {!isMobile && (
                <div style={{paddingTop:6,paddingRight:24}}>
                  <div style={{fontSize:13,color:"#00ff9d",marginBottom:4}}>Feb – May 2026</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.28)"}}>4 months · On-site</div>
                </div>
              )}

              <div style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(0,255,157,0.14)",borderLeft:"3px solid #00ff9d",borderRadius:isMobile?"12px":"0 14px 14px 0",padding:isMobile?"20px 18px":"26px 28px",marginLeft:isMobile?0:1}}>
                {isMobile && <div style={{fontSize:12,color:"#00ff9d",marginBottom:8}}>Feb – May 2026 · 4 months · On-site</div>}
                <h3 style={{fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(18px,4vw,24px)",fontWeight:600,color:"#f0f0f0",marginBottom:4}}>Full Stack Developer Intern</h3>
                <div style={{color:"#00ff9d",fontSize:14,marginBottom:16}}>PM Communications · Ahmedabad, Gujarat</div>
                <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:10}}>
                  {["Built VendorHub — a live multi-vendor eCommerce platform enabling 100+ independent vendors to list, manage and sell products.",
                    "Implemented React.js component library and Tailwind CSS responsive UI across 10+ pages.",
                    "Collaborated in Agile team of 3; daily stand-ups, code reviews, sprint planning.",
                    "Delivered entire project within 4-month timeline — live and publicly accessible.",
                  ].map((b,i)=>(
                    <li key={i} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                      <span style={{color:"#00ff9d",flexShrink:0,fontSize:10,marginTop:5}}>▹</span>
                      <span style={{color:"rgba(255,255,255,0.52)",fontSize:isMobile?14:15,lineHeight:1.75}}>{b}</span>
                    </li>
                  ))}
                </ul>
                <div style={{marginTop:18}}>
                  <a href="https://vendorhubonlinestore.lovable.app/" target="_blank" rel="noopener noreferrer" style={{background:"rgba(0,255,157,0.08)",border:"1px solid rgba(0,255,157,0.22)",color:"#00ff9d",borderRadius:8,padding:"8px 16px",fontSize:13,textDecoration:"none",display:"inline-block"}}>
                    View live project ↗
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={.2}>
            <div style={{marginTop:36}}>
              <h3 style={{fontSize:10,color:"rgba(255,255,255,0.28)",letterSpacing:".15em",textTransform:"uppercase",marginBottom:16}}>Education</h3>
              <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:14}}>
                {[
                  {deg:"M.Sc. Blockchain Technology",sch:"MIT World Peace University, Pune",per:"2024 – 2026",gr:"CGPA 8.43 (Final Year)",c:"#a78bfa"},
                  {deg:"Bachelor of Computer Application",sch:"VNSGU, Surat",per:"2021 – 2024",gr:"CGPA 8.09",c:"#38bdf8"},
                ].map((e,i)=>(
                  <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"18px 20px",position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:e.c,opacity:.4}} />
                    <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(14px,3vw,16px)",fontWeight:600,color:"#f0f0f0",marginBottom:4}}>{e.deg}</div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,0.38)",marginBottom:10}}>{e.sch}</div>
                    <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
                      <span style={{fontSize:12,color:"rgba(255,255,255,0.24)"}}>{e.per}</span>
                      <span style={{fontSize:12,color:e.c,fontWeight:500}}>{e.gr}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{padding:isMobile?"70px 0 50px":"110px 0 70px"}}>
        <div style={W}>
          <SecHead n="03" title="Projects" />
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"1fr 1fr":"repeat(auto-fit,minmax(320px,1fr))",gap:16}}>
            {PROJECTS.map((p,i)=><ProjectCard key={p.name} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section id="certifications" style={{padding:isMobile?"70px 0 50px":"110px 0 70px"}}>
        <div style={W}>
          <SecHead n="04" title="Certifications" />
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {CERTS.map((c,i)=>(
              <Reveal key={i} delay={i*.05}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:isMobile?"14px 16px":"16px 20px",transition:"all .3s ease"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,255,157,0.03)";e.currentTarget.style.borderColor="rgba(0,255,157,0.18)";if(!isMobile)e.currentTarget.style.transform="translateX(6px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.02)";e.currentTarget.style.borderColor="rgba(255,255,255,0.06)";e.currentTarget.style.transform="none";}}
                >
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <span style={{fontSize:isMobile?18:22}}>{c.icon}</span>
                    <div>
                      <div style={{fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(13px,3.5vw,16px)",fontWeight:600,color:"#f0f0f0"}}>{c.name}</div>
                      <div style={{fontSize:12,color:"rgba(255,255,255,0.36)",marginTop:2}}>{c.issuer}</div>
                    </div>
                  </div>
                  <span style={{fontSize:11,color:"#00ff9d",background:"rgba(0,255,157,0.07)",border:"1px solid rgba(0,255,157,0.18)",padding:"4px 12px",borderRadius:20,whiteSpace:"nowrap"}}>{c.date}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{padding:isMobile?"70px 0 60px":"110px 0 80px"}}>
        <div style={W}>
          <SecHead n="05" title="Get in touch" />
          <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":isTablet?"1fr":"1fr 1.6fr",gap:isMobile?36:isTablet?40:52,alignItems:"start"}}>

            {/* Contact info */}
            <Reveal delay={.1}>
              <h3 style={{fontFamily:"'Clash Display',sans-serif",fontSize:"clamp(20px,4vw,34px)",fontWeight:600,lineHeight:1.2,letterSpacing:"-.02em",marginBottom:12,color:"#f0f0f0"}}>
                Let's build something<br /><span style={{color:"#00ff9d"}}>great together</span>
              </h3>
              <p style={{fontSize:15,color:"rgba(255,255,255,0.38)",lineHeight:1.85,marginBottom:28}}>
                Open to full-time roles, internships, and freelance in full-stack and blockchain. I reply within 24 hours.
              </p>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {[
                  {icon:"✉",label:"Email",val:ME.email,href:`mailto:${ME.email}`,c:"#00ff9d"},
                  {icon:"☎",label:"Phone",val:ME.phone,href:`tel:${ME.phone}`,c:"#a78bfa"},
                  {icon:"⌥",label:"GitHub",val:"rajtank4457",href:ME.github,c:"#38bdf8"},
                  {icon:"in",label:"LinkedIn",val:"rajtank4457",href:ME.linkedin,c:"#f472b6"},
                ].map(x=>(
                  <a key={x.label} href={x.href} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:12,textDecoration:"none",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:11,padding:"12px 14px",transition:"border-color .2s",minHeight:56}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=`${x.c}44`}
                    onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}
                  >
                    <span style={{width:34,height:34,borderRadius:9,background:`${x.c}12`,display:"flex",alignItems:"center",justifyContent:"center",color:x.c,fontSize:14,flexShrink:0}}>{x.icon}</span>
                    <div>
                      <div style={{fontSize:10,color:"rgba(255,255,255,0.28)",textTransform:"uppercase",letterSpacing:".08em"}}>{x.label}</div>
                      <div style={{fontSize:isMobile?13:14,color:"#e8f0ea",wordBreak:"break-all"}}>{x.val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={.15}>
              <div style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:isMobile?"20px 18px":"28px 26px"}}>
                <ContactForm setToast={setToast} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{borderTop:"1px solid rgba(0,255,157,0.07)",padding:"22px 0",...W,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <span style={{fontSize:12,color:"rgba(255,255,255,0.18)"}}>© 2026 Raj Tank — React · Netlify</span>
        <div style={{display:"flex",gap:18}}>
          {[{l:"GitHub",u:ME.github},{l:"LinkedIn",u:ME.linkedin},{l:"Email",u:`mailto:${ME.email}`}].map(x=>(
            <a key={x.l} href={x.u} target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:"rgba(255,255,255,0.2)",textDecoration:"none",transition:"color .2s",minHeight:44,display:"flex",alignItems:"center"}}
              onMouseEnter={e=>e.currentTarget.style.color="#00ff9d"}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.2)"}
            >{x.l}</a>
          ))}
        </div>
      </footer>

      {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)} />}
    </div>
  );
}
