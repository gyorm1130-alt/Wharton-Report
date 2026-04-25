import { useState, useRef, useCallback } from "react";
import Head from "next/head";

const GOLD = "#c4a84f";
const NAVY = "#0f1f42";
const LIGHT = "#f5f2ec";
const LOGO_BG = "#0a1530";
const LOGO_GOLD = "#c4b28a";
const LOGO_SRC = "data:image/jpeg;base64,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";

const CATEGORIES = [
  "고난도 독해","국제반 수능 엔솔로지","내신","모의고사","문법트레이닝",
  "서술형대비","수능형독해","독해/중등독해","영어논술","원어민","클래스 무비","토셀/토플","파닉스","LT"
];
const GRADES = ["A+","A","A-","B+","B","B-","C+","C","C-","D"];

const gradeColor = g => {
  if(["A+","A","A-"].includes(g)) return {bg:"#e8f5e9",text:"#2e7d32",border:"#a5d6a7"};
  if(["B+","B","B-"].includes(g)) return {bg:"#e3f2fd",text:"#1565c0",border:"#90caf9"};
  if(["C+","C","C-"].includes(g)) return {bg:"#fff8e1",text:"#f57f17",border:"#ffe082"};
  return {bg:"#fce4ec",text:"#c62828",border:"#ef9a9a"};
};

const CURRICULUM = `[서술형] Essay1~6: 주어/be동사/명사/형용사/관사/인칭대명사/전치사/현재진행형/명령문/제안문/접속사/There be/미래형will/4·5형식/조동사/to부정사/과거시제/비교급·최상급/지각동사/가주어·진주어/수동태/사역동사/동명사/분사
[English Holic] 01 After Phonics→Reading S1~S4+Holic Step1~2 / 02 OK Writing 1~7+Bridge Writing / 03 Writing Holic with Grammar 1~8 / 04 영어문장쓰기설명서 Structure 1~5 / 05 문법트레이닝 Holic Grammar 1~24
[문법트레이닝] Ch01 인칭대명사→Ch02 be동사→Ch03 일반동사→Ch04 의문사→Ch05 명사→Ch06 관사→Ch07 대명사→Ch08 형용사→Ch09 부사→Ch10 시제→Ch11 조동사→Ch12 to부정사→Ch13 동명사→Ch14 접속사→Ch15 전치사→Ch16 문장종류→Ch17 문장형태→Ch18 비교→Ch19 수동태→Ch20 관계대명사→Ch21 관계부사→Ch22 분사→Ch23 가정법→Ch24 일치·화법`;

function getFirstName(n) {
  const s = n.trim();
  return s.length <= 2 ? s : s.slice(1);
}

const inp = (extra={}) => ({
  width:"100%", padding:"10px 14px", border:"1.5px solid #ddd",
  borderRadius:8, fontSize:14, outline:"none", boxSizing:"border-box",
  fontFamily:"inherit", background:"#fff", ...extra
});

function generateReportHTML(data) {
  const N="#0f1f42",G="#c4a84f",LBG="#0a1530",LG="#c4b28a";
  const gStyle=g=>{
    if(["A+","A","A-"].includes(g)) return "background:#e8f5e9;color:#2e7d32;";
    if(["B+","B","B-"].includes(g)) return "background:#e3f2fd;color:#1565c0;";
    if(["C+","C","C-"].includes(g)) return "background:#fff8e1;color:#f57f17;";
    return "background:#fce4ec;color:#c62828;";
  };
  const g2n=g=>({"A+":1,"A":.9,"A-":.8,"B+":0.7,"B":.6,"B-":.5,"C+":0.4,"C":.3,"C-":.2,"D":.1}[g]||.5);
  const avg=(g2n(data.attitude)+g2n(data.homework))/2;
  const poly=r=>Array.from({length:5},(_,i)=>{const a=(i*2*Math.PI/5)-Math.PI/2;return `${100+r*Math.cos(a)},${100+r*Math.sin(a)}`;}).join(" ");
  const radarSVG=`<svg viewBox="0 0 200 200" width="140" style="display:block;margin:auto;">
    ${[60,45,30,15].map(r=>`<polygon points="${poly(r)}" fill="none" stroke="#ece8e0" stroke-width="1"/>`).join("")}
    <polygon points="${poly(60*avg)}" fill="rgba(196,168,79,0.22)" stroke="${G}" stroke-width="2"/>
    ${[["종합",100,22],["참여",175,80],["성취",148,168],["과제",52,168],["태도",25,80]].map(([l,x,y])=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="11" fill="${N}" font-family="Malgun Gothic,sans-serif">${l}</text>`).join("")}
    <text x="100" y="108" text-anchor="middle" font-size="12" font-weight="700" fill="${G}" font-family="Malgun Gothic,sans-serif">${data.attitude} / ${data.homework}</text>
  </svg>`;
  const catRows=data.categories.map(c=>`<tr>
    <td style="background:#f0ede5;padding:7px 10px;font-size:10px;font-weight:700;color:${N};border-right:1px solid ${N};border-bottom:1px solid #ece8e0;width:120px;">[${c.category}]</td>
    <td style="padding:7px 10px;font-size:11px;color:#333;line-height:1.7;border-bottom:1px solid #ece8e0;">${c.content}</td>
    <td style="${gStyle(c.grade||"A")}text-align:center;font-size:13px;font-weight:900;border-left:1px solid ${N};border-bottom:1px solid #ece8e0;width:48px;vertical-align:middle;">${c.grade||"A"}</td>
  </tr>`).join("");
  const analysisRows=data.analysisItems.map(item=>`<tr>
    <td style="padding:8px 10px;border-bottom:1px solid #ece8e0;">
      <div style="font-size:9px;color:${G};font-weight:700;margin-bottom:2px;">${item.label}</div>
      <div style="font-size:11px;color:#333;line-height:1.6;">${item.detail}</div>
    </td>
    <td style="background:${N};text-align:center;vertical-align:middle;width:42px;border-bottom:1px solid #ece8e0;">
      <span style="color:#fff;font-weight:900;font-size:12px;">${item.grade}</span>
    </td>
  </tr>`).join("");
  const photosHTML=data.photos.length>0?`<table style="width:100%;border-collapse:collapse;margin-bottom:${data.photoAnalysis?8:0}px;"><tr>${data.photos.slice(0,3).map(p=>`<td style="padding:2px;"><img src="${p.dataUrl}" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:3px;border:1px solid #e0ddd5;display:block;"></td>`).join("")}</tr></table>`:"";
  const photoSection=(data.photos.length>0||data.photoAnalysis)?`
    <div style="background:${N};padding:5px 11px;"><span style="color:#fff;font-size:10px;font-weight:700;">첨부 결과물 분석</span></div>
    <div style="border:1px solid ${N};border-top:none;padding:10px;margin-bottom:10px;">
      ${photosHTML}
      ${data.photoAnalysis?`<div style="font-size:11px;color:#333;line-height:1.7;${data.photos.length?"border-top:1px solid #ece8e0;padding-top:8px;":""}">${data.photoAnalysis}</div>`:""}
    </div>`:"";
  const currBlock=data.curriculumLevel?`<div style="background:#f8f4eb;border:1px solid ${G};border-radius:5px;padding:7px 12px;margin-bottom:10px;">
    <span style="font-size:10px;color:#999;">📍 현재 커리큘럼 위치&nbsp;&nbsp;</span>
    <span style="font-size:11px;font-weight:700;color:${N};">${data.curriculumLevel}</span>
    ${data.nextStep?`<span style="font-size:10px;color:${G};">&nbsp;→ ${data.nextStep}</span>`:""}
  </div>`:"";

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<title>와튼_월말리포트_${data.studentName}_${data.month}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Malgun Gothic','Apple SD Gothic Neo',Arial,sans-serif;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
table{border-collapse:collapse;width:100%;}
@media print{@page{margin:8mm;size:A4;}body{padding:0;}.no-print{display:none!important;}}
</style>
</head>
<body style="padding:0;">
<div style="max-width:760px;margin:0 auto;background:#fff;">
  <div style="background:${LBG};padding:18px 28px 14px;text-align:center;">
    <img src="${LOGO_SRC}" width="90" height="90" style="display:block;margin:0 auto;object-fit:contain;">
    <div style="margin-top:8px;font-size:9px;letter-spacing:5px;color:${LG};">WHARTON ENGLISH SCHOOL</div>
    <div style="font-size:9px;letter-spacing:4px;color:#a0925a;margin-top:3px;">MONTHLY PROGRESS REPORT</div>
  </div>
  <table>
    <tr>
      <td style="background:${N};width:34px;text-align:center;vertical-align:middle;">
        <div style="writing-mode:vertical-rl;transform:rotate(180deg);font-size:10px;letter-spacing:4px;color:#c8b97a;font-weight:700;padding:14px 0;">REPORT CARD</div>
      </td>
      <td style="padding:14px 20px;vertical-align:top;">
        <table style="border-top:2px solid ${N};border-bottom:1px solid ${N};margin-bottom:12px;">
          <tr>
            ${[["Name",data.studentName],["Class",data.className],["Teacher",data.teacher],["Month",data.month]].map(([k,v])=>`<td style="padding:6px 10px;border-right:1px solid ${N};"><div style="font-size:9px;color:#999;">${k}</div><div style="font-size:12px;font-weight:700;color:${N};">${v}</div></td>`).join("")}
          </tr>
        </table>
        ${currBlock}
        <div style="background:${N};padding:5px 11px;"><span style="color:#fff;font-size:10px;font-weight:700;">학습진도평가</span></div>
        <table style="border:1px solid ${N};border-top:none;margin-bottom:10px;">${catRows}</table>
        <div style="background:${N};padding:5px 11px;"><span style="color:#fff;font-size:10px;font-weight:700;">학습 분석 리포트</span></div>
        <table style="border:1px solid ${N};border-top:none;margin-bottom:10px;">${analysisRows}</table>
        ${photoSection}
        <table style="margin-bottom:10px;">
          <tr>
            <td style="vertical-align:top;">
              <div style="background:${N};padding:4px 11px;"><span style="color:#fff;font-size:9px;font-weight:700;">학습 성취도</span></div>
              <div style="border:1px solid ${N};border-top:none;padding:6px;">${radarSVG}</div>
            </td>
            <td style="width:130px;vertical-align:top;padding-left:10px;padding-top:20px;">
              <div style="border:2px solid ${N};border-radius:3px;overflow:hidden;">
                <div style="background:${N};padding:5px 10px;color:#fff;font-size:9px;font-weight:700;">학습태도 등급</div>
                <div style="padding:10px;text-align:center;font-size:26px;font-weight:900;color:${G};">${data.attitude}</div>
                <div style="background:${N};padding:5px 10px;color:#fff;font-size:9px;font-weight:700;">과제수행 등급</div>
                <div style="padding:10px;text-align:center;font-size:26px;font-weight:900;color:${G};">${data.homework}</div>
              </div>
            </td>
          </tr>
        </table>
        <div style="background:${N};padding:7px 12px;"><span style="font-size:9px;letter-spacing:3px;color:${G};font-weight:700;">TEACHER'S COMMENTS AND FEEDBACK</span></div>
        <div style="border:1px solid ${N};border-top:none;padding:14px 16px;margin-bottom:12px;">
          <div style="font-size:12px;line-height:2.1;color:#222;white-space:pre-line;">${data.comments}</div>
        </div>
        <div style="border-top:1px solid #ddd;padding-top:10px;display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:8px;background:${LBG};padding:4px 10px;border-radius:6px;">
            <img src="${LOGO_SRC}" width="24" height="24" style="object-fit:contain;">
            <span style="font-size:9px;color:${LG};font-weight:700;">와튼영어스쿨</span>
          </div>
          <span style="font-size:9px;color:#ccc;">WHARTON ENGLISH SCHOOL — MONTHLY PROGRESS REPORT</span>
        </div>
      </td>
    </tr>
  </table>
</div>
<script>window.addEventListener("load",function(){setTimeout(function(){window.print();},800);});</script>
</body>
</html>`;
}

function LandingScreen({onStart}) {
  const features=[
    {icon:"🤖",title:"AI 커리큘럼 분석",desc:"강점·발전 영역·학습 방향 자동 생성"},
    {icon:"📊",title:"과목별 등급 평가",desc:"각 항목 A+ ~ D 등급 직접 입력"},
    {icon:"✍️",title:"700자 다면 코멘트",desc:"학습·태도·인성·성장 포함 따뜻한 편지"},
    {icon:"📸",title:"결과물 사진 분석",desc:"시험지·과제물 첨부 시 AI 함께 분석"},
    {icon:"🖨️",title:"깔끔한 인쇄/PDF",desc:"로고·색상·한글 완벽 출력"},
    {icon:"📋",title:"텍스트 복사 공유",desc:"카카오톡·문자에 바로 붙여넣기"},
  ];
  return (
    <div style={{minHeight:"100vh",background:LOGO_BG,fontFamily:"'Malgun Gothic','Apple SD Gothic Neo',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",padding:"0 0 60px",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-100,right:-100,width:360,height:360,borderRadius:"50%",border:`1px solid ${GOLD}22`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:-80,left:-80,width:300,height:300,borderRadius:"50%",border:`1px solid ${GOLD}22`,pointerEvents:"none"}}/>
      <div style={{width:"100%",maxWidth:680,padding:"48px 24px 0",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
        <div style={{background:`${GOLD}18`,border:`1px solid ${GOLD}44`,borderRadius:16,padding:"18px 24px",marginBottom:24,display:"inline-flex",alignItems:"center",gap:14}}>
          <img src={LOGO_SRC} width={60} height={60} style={{objectFit:"contain"}}/>
          <div style={{textAlign:"left"}}>
            <div style={{fontSize:20,fontWeight:900,color:GOLD,letterSpacing:2}}>WHARTON</div>
            <div style={{fontSize:11,color:"#a09070",letterSpacing:3,marginTop:2}}>ENGLISH SCHOOL</div>
          </div>
        </div>
        <div style={{fontSize:11,letterSpacing:5,color:GOLD,marginBottom:12,fontWeight:700,opacity:0.8}}>MONTHLY PROGRESS REPORT GENERATOR</div>
        <h1 style={{fontSize:26,fontWeight:900,color:"#fff",margin:"0 0 10px",lineHeight:1.35}}>
          AI 월말 리포트<br/><span style={{color:GOLD}}>자동 생성기</span>
        </h1>
        <p style={{fontSize:13,color:"#8a9bb8",lineHeight:1.8,maxWidth:400,margin:"0 0 28px"}}>
          학생 이름·등급·과목별 평가만 입력하면<br/>커리큘럼 분석 · 다면 코멘트 · 성취도 차트까지 완성
        </p>
        <button onClick={onStart} style={{padding:"14px 44px",background:`linear-gradient(135deg,${GOLD},#a07c2a)`,border:"none",borderRadius:50,fontSize:15,fontWeight:900,color:"#fff",cursor:"pointer",boxShadow:`0 8px 28px ${GOLD}55`,marginBottom:10}}>
          ✨ 지금 바로 시작하기
        </button>
        <p style={{fontSize:11,color:"#506080",margin:0}}>🔓 로그인 불필요 · 누구나 무료로 즉시 사용</p>
      </div>
      <div style={{width:"100%",maxWidth:600,margin:"40px 0 0",padding:"0 20px",display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
        {features.map((f,i)=>(
          <div key={i} style={{background:`${GOLD}0a`,border:`1px solid ${GOLD}2a`,borderRadius:12,padding:"14px 16px",display:"flex",gap:10,alignItems:"flex-start"}}>
            <div style={{fontSize:20,background:`${GOLD}18`,borderRadius:8,padding:"5px 7px",flexShrink:0}}>{f.icon}</div>
            <div>
              <div style={{fontSize:12,fontWeight:800,color:"#ddd",marginBottom:2}}>{f.title}</div>
              <div style={{fontSize:10,color:"#607090",lineHeight:1.5}}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const today=new Date();
  const defaultMonth=`${today.getFullYear()}년 ${today.getMonth()+1}월`;
  const [appStep,setAppStep]=useState("landing");
  const [fixed,setFixed]=useState({className:"",teacher:"",month:defaultMonth,categories:[{category:"서술형대비",content:""}]});
  const [editingFixed,setEditingFixed]=useState(false);
  const [studentName,setStudentName]=useState("");
  const [attitude,setAttitude]=useState("A+");
  const [homework,setHomework]=useState("A+");
  const [catGrades,setCatGrades]=useState([]);
  const [photos,setPhotos]=useState([]);
  const [reportData,setReportData]=useState(null);
  const [error,setError]=useState("");
  const [debugMsg,setDebugMsg]=useState("");
  const fileRef=useRef();

  const addCat=()=>{setFixed(f=>({...f,categories:[...f.categories,{category:"",content:""}]}));setCatGrades(g=>[...g,"A"]);};
  const removeCat=i=>{setFixed(f=>({...f,categories:f.categories.filter((_,j)=>j!==i)}));setCatGrades(g=>g.filter((_,j)=>j!==i));};
  const updateCat=(i,k,v)=>setFixed(f=>({...f,categories:f.categories.map((c,j)=>j===i?{...c,[k]:v}:c)}));
  const updateCatGrade=(i,v)=>setCatGrades(g=>g.map((x,j)=>j===i?v:x));
  const syncedGrades=fixed.categories.map((_,i)=>catGrades[i]||"A");

  const handleFiles=useCallback(async(files)=>{
    const arr=Array.from(files).slice(0,6);
    const results=await Promise.all(arr.map(f=>new Promise((res,rej)=>{
      const r=new FileReader();
      r.onload=e=>res({name:f.name,dataUrl:e.target.result,type:f.type});
      r.onerror=rej;r.readAsDataURL(f);
    })));
    setPhotos(p=>[...p,...results].slice(0,6));
  },[]);
  const removePhoto=i=>setPhotos(p=>p.filter((_,j)=>j!==i));

  const handleGenerate=async()=>{
    if(!studentName.trim()){setError("학생 이름을 입력해주세요.");return;}
    const validCats=fixed.categories.filter(c=>c.category&&c.content.trim());
    if(!validCats.length){setError("학습 진도 내용을 최소 1개 입력해주세요.");return;}
    setError("");setDebugMsg("");setAppStep("generating");
    const firstName=getFirstName(studentName);
    const catsWithGrades=fixed.categories.filter(c=>c.category&&c.content.trim()).map((c,i)=>({...c,grade:syncedGrades[i]}));
    const catText=catsWithGrades.map(c=>`[${c.category}] ${c.content} (평가: ${c.grade})`).join("\n");
    const hasPhotos=photos.length>0;
    const photoContent=hasPhotos?photos.map(p=>({type:"image",source:{type:"base64",media_type:p.type,data:p.dataUrl.split(",")[1]}})):[];
    const prompt=`당신은 와튼영어스쿨의 담당 선생님입니다.\n\n[커리큘럼]\n${CURRICULUM}\n\n[학생 정보]\n이름: ${studentName} / 이름(성 제외): ${firstName}\n반: ${fixed.className} / 담당: ${fixed.teacher} / 월: ${fixed.month}\n학습태도: ${attitude} / 과제수행: ${homework}\n\n[학습 진도 및 평가]\n${catText}${hasPhotos?`\n[첨부 결과물 ${photos.length}장]`:""}\n\n순수 JSON만 출력 (마크다운 없이):\n{\n  "curriculumLevel": "현재 위치 간결하게",\n  "nextStep": "다음 달 목표",\n  "analysisItems": [\n    {"label":"학습 강점","detail":"2문장","grade":"A+"},\n    {"label":"발전 영역","detail":"2문장","grade":"B+"},\n    {"label":"권장 학습 방향","detail":"2문장","grade":"A"}\n  ],\n  "photoAnalysis": "${hasPhotos?"결과물 분석 2문장":""}",\n  "comments": "【700자 내외】① 첫 문장: '${firstName}는 이번 달에...' 또는 '${firstName}이는 이번 달에...' (성 제외, 학생 단어 금지) ② 손편지처럼 친근하고 따뜻하게 ③ 학습 성취 구체적 칭찬(과목명 활용) ④ 수업 태도·참여도 1~2문장 ⑤ 생활·인성 긍정적 면모 1문장 ⑥ 아쉬운 점 직접 언급 금지 ⑦ 응원·기대 마무리 ⑧ 마지막 줄: '${fixed.teacher} 선생님 드림' ⑨ 700자 내외"\n}`;
    const msgContent=hasPhotos?[...photoContent,{type:"text",text:prompt}]:prompt;
    try {
      // ★ 핵심: 직접 Anthropic이 아닌 우리 서버(/api/generate)로 호출 → API 키 안전
      const res=await fetch("/api/generate",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-5",max_tokens:2000,messages:[{role:"user",content:msgContent}]})
      });
      if(!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
      const data=await res.json();
      let raw=(data.content||[]).map(b=>b.type==="text"?b.text:"").join("");
      const fi=raw.indexOf("{"),la=raw.lastIndexOf("}");
      if(fi===-1||la===-1) throw new Error("JSON 없음: "+raw.slice(0,200));
      const parsed=JSON.parse(raw.slice(fi,la+1));
      setReportData({studentName,firstName,month:fixed.month,className:fixed.className,teacher:fixed.teacher,categories:catsWithGrades,attitude,homework,photos,curriculumLevel:parsed.curriculumLevel||"",nextStep:parsed.nextStep||"",analysisItems:Array.isArray(parsed.analysisItems)?parsed.analysisItems:[],photoAnalysis:parsed.photoAnalysis||"",comments:parsed.comments||""});
      setAppStep("report");
    } catch(e) {
      setError("AI 생성 중 오류. 잠시 후 다시 시도해주세요.");
      setDebugMsg(e.message||"");
      setAppStep("form");
    }
  };

  if(appStep==="landing") return <LandingScreen onStart={()=>setAppStep("setup")}/>;

  if(appStep==="setup"||editingFixed) return (
    <div style={{minHeight:"100vh",background:LIGHT,display:"flex",flexDirection:"column",alignItems:"center",padding:"32px 16px",fontFamily:"'Malgun Gothic','Apple SD Gothic Neo',sans-serif"}}>
      <Head><title>와튼영어스쿨 월말 리포트 생성기</title></Head>
      <div style={{background:"#fff",borderRadius:16,padding:"28px",width:"100%",maxWidth:520,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:16,background:LOGO_BG,borderRadius:12,padding:"16px"}}>
          <img src={LOGO_SRC} width={100} height={100} style={{objectFit:"contain"}}/>
        </div>
        <h3 style={{color:NAVY,margin:"0 0 4px",fontSize:16,fontWeight:800,textAlign:"center"}}>📌 반 공통 정보 설정</h3>
        <p style={{color:"#aaa",fontSize:12,marginBottom:20,textAlign:"center"}}>한 번 저장하면 고정됩니다.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
          <div><label style={{fontSize:12,color:"#666",display:"block",marginBottom:6}}>반 (CLASS)</label>
            <input style={inp()} placeholder="예: M1" value={fixed.className} onChange={e=>setFixed(f=>({...f,className:e.target.value}))}/></div>
          <div><label style={{fontSize:12,color:"#666",display:"block",marginBottom:6}}>담당 선생님</label>
            <input style={inp()} placeholder="예: Alice" value={fixed.teacher} onChange={e=>setFixed(f=>({...f,teacher:e.target.value}))}/></div>
        </div>
        <div style={{marginBottom:14}}>
          <label style={{fontSize:12,color:"#666",display:"block",marginBottom:6}}>리포트 월</label>
          <input style={inp()} value={fixed.month} onChange={e=>setFixed(f=>({...f,month:e.target.value}))}/>
        </div>
        <div style={{marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <label style={{fontSize:12,color:"#666",fontWeight:700}}>📚 학습 진도 항목</label>
            <button onClick={addCat} style={{fontSize:11,color:GOLD,background:"none",border:`1px solid ${GOLD}`,borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>+ 추가</button>
          </div>
          <div style={{background:"#fafaf8",borderRadius:8,padding:12}}>
            {fixed.categories.map((c,i)=>(
              <div key={i} style={{display:"grid",gridTemplateColumns:"145px 1fr auto",gap:8,marginBottom:i<fixed.categories.length-1?10:0,alignItems:"start"}}>
                <select style={inp({padding:"8px 10px",fontSize:13})} value={c.category} onChange={e=>updateCat(i,"category",e.target.value)}>
                  <option value="">카테고리 선택</option>
                  {CATEGORIES.map(o=><option key={o}>{o}</option>)}
                </select>
                <textarea style={inp({resize:"vertical",minHeight:58,fontSize:12})} placeholder="진도 내용, 교재명, 범위..." value={c.content} onChange={e=>updateCat(i,"content",e.target.value)}/>
                {i>0&&<button onClick={()=>removeCat(i)} style={{background:"#fee2e2",border:"none",borderRadius:6,padding:"5px 8px",cursor:"pointer",color:"#c00",fontSize:14,marginTop:2}}>✕</button>}
              </div>
            ))}
          </div>
        </div>
        <button onClick={()=>{
          if(!fixed.className||!fixed.teacher){alert("반과 선생님을 입력해주세요.");return;}
          if(!fixed.categories.some(c=>c.category&&c.content.trim())){alert("학습 진도를 최소 1개 입력해주세요.");return;}
          setCatGrades(fixed.categories.map((_,i)=>catGrades[i]||"A"));
          setEditingFixed(false);setAppStep("form");
        }} style={{width:"100%",padding:14,background:NAVY,color:"#fff",border:"none",borderRadius:10,fontSize:15,fontWeight:900,cursor:"pointer"}}>
          {editingFixed?"수정 완료 ✓":"저장하고 시작하기 →"}
        </button>
      </div>
    </div>
  );

  if(appStep==="report"&&reportData) return <ReportView data={reportData}
    onNext={()=>{setStudentName("");setAttitude("A+");setHomework("A+");setCatGrades(fixed.categories.map(()=>"A"));setPhotos([]);setAppStep("form");}}
    onEditFixed={()=>setEditingFixed(true)}/>;

  return (
    <div style={{minHeight:"100vh",background:LIGHT,fontFamily:"'Malgun Gothic','Apple SD Gothic Neo',sans-serif"}}>
      <Head><title>와튼영어스쿨 월말 리포트 생성기</title></Head>
      <div style={{background:LOGO_BG,padding:"20px 0 16px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center"}}>
        <img src={LOGO_SRC} width={100} height={100} style={{objectFit:"contain"}}/>
        <div style={{fontSize:9,letterSpacing:5,color:LOGO_GOLD,marginTop:6}}>MONTHLY PROGRESS REPORT</div>
        <div style={{width:40,height:2,background:LOGO_GOLD,margin:"6px auto 0"}}/>
      </div>
      <div style={{background:"#fff",borderBottom:"2px solid #e8e4db",padding:"10px 20px",maxWidth:640,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{fontSize:13,color:NAVY,display:"flex",gap:16,flexWrap:"wrap"}}>
          <span>📌 <b>{fixed.className}</b></span>
          <span style={{color:"#888"}}>👩‍🏫 {fixed.teacher} 선생님</span>
          <span style={{color:"#888"}}>📅 {fixed.month}</span>
        </div>
        <button onClick={()=>setEditingFixed(true)} style={{fontSize:11,color:GOLD,background:"none",border:`1px solid ${GOLD}`,borderRadius:6,padding:"3px 10px",cursor:"pointer",whiteSpace:"nowrap"}}>수정</button>
      </div>
      <div style={{maxWidth:640,margin:"20px auto 40px",background:"#fff",borderRadius:12,boxShadow:"0 2px 16px rgba(0,0,0,0.08)",padding:"26px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:22}}>
          <div style={{background:"#fff8e7",border:`1px solid ${GOLD}`,borderRadius:8,padding:"8px 10px",fontSize:18}}>✏️</div>
          <div><h2 style={{fontSize:16,fontWeight:800,color:NAVY,margin:0}}>학생 정보 입력</h2>
            <p style={{fontSize:11,color:"#aaa",margin:0}}>이름, 등급, 과목별 평가를 입력하세요</p></div>
        </div>
        <div style={{marginBottom:18}}>
          <label style={{fontSize:12,color:"#666",display:"block",marginBottom:6}}>👤 학생 이름 <span style={{color:"red"}}>*</span></label>
          <input style={inp({fontSize:16,fontWeight:600})} placeholder="예: 김주하" value={studentName} onChange={e=>setStudentName(e.target.value)}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:22}}>
          <div><label style={{fontSize:12,color:"#666",display:"block",marginBottom:6}}>📊 학습 태도 등급</label>
            <select style={inp({fontSize:15,fontWeight:700,color:NAVY})} value={attitude} onChange={e=>setAttitude(e.target.value)}>
              {GRADES.map(g=><option key={g}>{g}</option>)}
            </select></div>
          <div><label style={{fontSize:12,color:"#666",display:"block",marginBottom:6}}>📝 과제 수행 등급</label>
            <select style={inp({fontSize:15,fontWeight:700,color:NAVY})} value={homework} onChange={e=>setHomework(e.target.value)}>
              {GRADES.map(g=><option key={g}>{g}</option>)}
            </select></div>
        </div>
        <div style={{marginBottom:22}}>
          <label style={{fontSize:12,fontWeight:700,color:NAVY,display:"block",marginBottom:8}}>
            📋 과목별 학습 진도 평가 <span style={{fontSize:11,color:"#aaa",fontWeight:400,marginLeft:6}}>이번 달 수행 등급 선택</span>
          </label>
          <div style={{border:"1.5px solid #e0ddd5",borderRadius:10,overflow:"hidden"}}>
            {fixed.categories.filter(c=>c.category).map((c,i)=>{
              const g=syncedGrades[i];const gc=gradeColor(g);
              return (<div key={i} style={{display:"grid",gridTemplateColumns:"1fr 110px",borderBottom:i<fixed.categories.filter(x=>x.category).length-1?"1px solid #ece8e0":"none",background:i%2===0?"#fff":"#fafaf8"}}>
                <div style={{padding:"10px 14px"}}>
                  <div style={{fontSize:11,fontWeight:700,color:NAVY,marginBottom:2}}>[{c.category}]</div>
                  <div style={{fontSize:11,color:"#666",lineHeight:1.5}}>{c.content}</div>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"8px",borderLeft:"1px solid #ece8e0"}}>
                  <select value={g} onChange={e=>updateCatGrade(i,e.target.value)} style={{padding:"6px 8px",border:`1.5px solid ${gc.border}`,borderRadius:8,fontSize:14,fontWeight:900,color:gc.text,background:gc.bg,cursor:"pointer",outline:"none",width:"100%",textAlign:"center"}}>
                    {GRADES.map(gr=><option key={gr}>{gr}</option>)}
                  </select>
                </div>
              </div>);
            })}
          </div>
        </div>
        <div style={{marginBottom:22}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <label style={{fontSize:12,fontWeight:700,color:NAVY}}>📸 결과물 사진 <span style={{fontWeight:400,color:"#aaa"}}>(선택, 최대 6장)</span></label>
            <button onClick={()=>fileRef.current.click()} style={{fontSize:11,color:GOLD,background:"none",border:`1px solid ${GOLD}`,borderRadius:6,padding:"3px 10px",cursor:"pointer"}}>+ 추가</button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={e=>handleFiles(e.target.files)}/>
          {photos.length>0?(
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {photos.map((p,i)=>(
                <div key={i} style={{position:"relative",aspectRatio:"4/3",borderRadius:8,overflow:"hidden",border:"1.5px solid #e0ddd5"}}>
                  <img src={p.dataUrl} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                  <button onClick={()=>removePhoto(i)} style={{position:"absolute",top:4,right:4,background:"rgba(0,0,0,0.6)",border:"none",borderRadius:"50%",width:22,height:22,color:"#fff",cursor:"pointer",fontSize:12}}>✕</button>
                </div>
              ))}
              {photos.length<6&&<div onClick={()=>fileRef.current.click()} style={{aspectRatio:"4/3",borderRadius:8,border:"2px dashed #ddd",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"#ccc",fontSize:28}}>+</div>}
            </div>
          ):(
            <div onClick={()=>fileRef.current.click()} style={{border:"2px dashed #e0ddd5",borderRadius:10,padding:"22px",textAlign:"center",cursor:"pointer",color:"#ccc",background:"#fafaf8"}}>
              <div style={{fontSize:28,marginBottom:4}}>📷</div>
              <div style={{fontSize:12}}>시험지, 과제물 사진을 업로드하면 AI가 분석합니다</div>
            </div>
          )}
        </div>
        {error&&<div style={{background:"#fff0f0",border:"1px solid #fcc",borderRadius:8,padding:"10px 14px",color:"#c00",fontSize:13,marginBottom:6}}>⚠️ {error}</div>}
        {debugMsg&&<div style={{background:"#f8f8f8",border:"1px solid #ddd",borderRadius:8,padding:"8px 12px",color:"#888",fontSize:11,marginBottom:14,wordBreak:"break-all"}}>{debugMsg}</div>}
        <button onClick={handleGenerate} disabled={appStep==="generating"} style={{width:"100%",padding:15,background:appStep==="generating"?"#aaa":NAVY,color:"#fff",border:"none",borderRadius:10,fontSize:15,fontWeight:800,cursor:appStep==="generating"?"not-allowed":"pointer",letterSpacing:1}}>
          {appStep==="generating"?"⏳  AI 분석 중...":"✨  월말 리포트 생성하기  →"}
        </button>
      </div>
    </div>
  );
}

function ReportView({data,onNext,onEditFixed}) {
  const {studentName,firstName,className,teacher,month,categories,attitude,homework,photos,curriculumLevel,nextStep,analysisItems,photoAnalysis,comments}=data;
  const [shareMsg,setShareMsg]=useState("");

  const handlePrint=()=>{
    const html=generateReportHTML(data);
    const blob=new Blob([html],{type:"text/html;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=`와튼_월말리포트_${studentName}_${month}.html`;
    document.body.appendChild(a);a.click();document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url),3000);
  };

  const handleShare=()=>{
    const text=["【와튼영어스쿨 월말 리포트】","━━━━━━━━━━━━━━━━━",`📌 ${studentName} | ${className} | ${teacher} 선생님 | ${month}`,"","📚 학습 진도 평가",...categories.map(c=>`· [${c.category}] ${c.content}  ▶ ${c.grade||"A"}`),
      "",curriculumLevel?`📍 현재 위치: ${curriculumLevel}`:"",nextStep?`→ 다음 목표: ${nextStep}`:"","","📊 학습 분석",...analysisItems.map(a=>`· ${a.label} (${a.grade}): ${a.detail}`),"",
      `📝 학습태도: ${attitude}  |  과제수행: ${homework}`,"","💬 선생님 코멘트",comments,"━━━━━━━━━━━━━━━━━","와튼영어스쿨 (Wharton English School)"].filter(l=>l!==undefined).join("\n");
    try{
      const ta=document.createElement("textarea");ta.value=text;ta.style.cssText="position:fixed;top:0;left:0;opacity:0.01;font-size:16px;width:1px;height:1px;";
      document.body.appendChild(ta);ta.focus();ta.select();const ok=document.execCommand("copy");document.body.removeChild(ta);
      setShareMsg(ok?"📋 복사 완료! 카카오톡에 붙여넣기 하세요.":"⚠️ 복사 실패");setTimeout(()=>setShareMsg(""),4000);
    }catch{setShareMsg("⚠️ 복사 실패");setTimeout(()=>setShareMsg(""),3000);}
  };

  const g2n=g=>({"A+":1,"A":.9,"A-":.8,"B+":0.7,"B":.6,"B-":.5,"C+":0.4,"C":.3,"C-":.2,"D":.1}[g]||.5);
  const avg=(g2n(attitude)+g2n(homework))/2;
  const poly=r=>Array.from({length:5},(_,i)=>{const a=(i*2*Math.PI/5)-Math.PI/2;return `${100+r*Math.cos(a)},${100+r*Math.sin(a)}`;}).join(" ");

  return (
    <div style={{fontFamily:"'Malgun Gothic','Apple SD Gothic Neo',sans-serif",background:"#f0ede5",minHeight:"100vh",padding:"16px 0 40px"}}>
      <Head><title>와튼영어스쿨 월말 리포트 — {studentName}</title></Head>
      <div style={{maxWidth:760,margin:"0 auto 10px",display:"flex",gap:8,padding:"0 12px",flexWrap:"wrap",alignItems:"center"}}>
        <button onClick={onNext} style={{padding:"8px 16px",background:"#fff",border:"1.5px solid #ccc",borderRadius:8,cursor:"pointer",fontSize:13}}>← 다음 학생</button>
        <button onClick={onEditFixed} style={{padding:"8px 16px",background:"#fff",border:`1.5px solid ${GOLD}`,borderRadius:8,cursor:"pointer",fontSize:13,color:GOLD}}>반 정보 수정</button>
        <button onClick={handlePrint} style={{padding:"8px 16px",background:NAVY,border:"none",borderRadius:8,cursor:"pointer",fontSize:13,color:"#fff",fontWeight:700}}>🖨️ HTML 저장 후 인쇄</button>
        <button onClick={handleShare} style={{padding:"8px 16px",background:GOLD,border:"none",borderRadius:8,cursor:"pointer",fontSize:13,color:"#fff",fontWeight:700}}>📋 텍스트 복사</button>
      </div>
      <div style={{maxWidth:760,margin:"0 auto 6px",padding:"0 12px"}}>
        <div style={{background:"#f0f6ff",border:"1px solid #c5d8f5",borderRadius:8,padding:"8px 14px",fontSize:11,color:"#4060a0"}}>
          💡 <b>인쇄 방법:</b> HTML 저장 → 파일 열기 → 인쇄창 자동 → PDF저장 또는 프린터 출력
        </div>
      </div>
      {shareMsg&&<div style={{maxWidth:760,margin:"0 auto 8px",padding:"0 12px"}}>
        <div style={{background:"#fffbe6",border:`1px solid ${GOLD}`,borderRadius:8,padding:"10px 14px",fontSize:12,color:"#7a5c00",fontWeight:600}}>{shareMsg}</div>
      </div>}
      <div style={{maxWidth:760,margin:"0 auto",background:"#fff",boxShadow:"0 4px 24px rgba(0,0,0,0.12)",borderRadius:4,overflow:"hidden"}}>
        <div style={{background:LOGO_BG,padding:"18px 28px 14px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
          <img src={LOGO_SRC} width={90} height={90} style={{objectFit:"contain"}}/>
          <div style={{marginTop:8,fontSize:9,letterSpacing:5,color:LOGO_GOLD}}>WHARTON ENGLISH SCHOOL</div>
          <div style={{fontSize:9,letterSpacing:4,color:"#a0925a",marginTop:3}}>MONTHLY PROGRESS REPORT</div>
        </div>
        <div style={{display:"flex"}}>
          <div style={{background:NAVY,writingMode:"vertical-rl",transform:"rotate(180deg)",padding:"14px 9px",fontSize:10,letterSpacing:4,color:"#c8b97a",fontWeight:700,minWidth:34}}>REPORT CARD</div>
          <div style={{flex:1,padding:"14px 22px"}}>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderTop:`2px solid ${NAVY}`,borderBottom:`1px solid ${NAVY}`,marginBottom:12}}>
              {[["Name",studentName],["Class",className],["Teacher",teacher],["Month",month]].map(([k,v])=>(
                <div key={k} style={{padding:"6px 10px",borderRight:`1px solid ${NAVY}`}}>
                  <div style={{fontSize:9,color:"#999"}}>{k}</div>
                  <div style={{fontSize:12,fontWeight:700,color:NAVY}}>{v}</div>
                </div>
              ))}
            </div>
            {curriculumLevel&&<div style={{background:"#f8f4eb",border:`1px solid ${GOLD}`,borderRadius:5,padding:"7px 12px",marginBottom:10,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
              <span style={{fontSize:10,color:"#999"}}>📍 현재 커리큘럼 위치</span>
              <span style={{fontSize:11,fontWeight:700,color:NAVY}}>{curriculumLevel}</span>
              {nextStep&&<span style={{fontSize:10,color:GOLD}}>→ {nextStep}</span>}
            </div>}
            <div style={{background:NAVY,padding:"5px 12px"}}><span style={{color:"#fff",fontSize:10,fontWeight:700,letterSpacing:1}}>학습진도평가</span></div>
            <div style={{border:`1px solid ${NAVY}`,borderTop:"none",marginBottom:10}}>
              {categories.map((c,i)=>{const gc=gradeColor(c.grade||"A");return(
                <div key={i} style={{display:"grid",gridTemplateColumns:"120px 1fr 52px",borderBottom:i<categories.length-1?"1px solid #ece8e0":"none"}}>
                  <div style={{background:"#f0ede5",padding:"8px 11px",fontSize:10,fontWeight:700,color:NAVY,borderRight:`1px solid ${NAVY}`,display:"flex",alignItems:"center"}}>[{c.category}]</div>
                  <div style={{padding:"8px 11px",fontSize:11,color:"#333",lineHeight:1.7}}>{c.content}</div>
                  <div style={{background:gc.bg,borderLeft:`1px solid ${NAVY}`,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:13,fontWeight:900,color:gc.text}}>{c.grade||"A"}</span></div>
                </div>
              );})}
            </div>
            <div style={{background:NAVY,padding:"5px 12px"}}><span style={{color:"#fff",fontSize:10,fontWeight:700,letterSpacing:1}}>학습 분석 리포트</span></div>
            <div style={{border:`1px solid ${NAVY}`,borderTop:"none",marginBottom:10}}>
              {analysisItems.map((item,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 42px",borderBottom:i<analysisItems.length-1?"1px solid #ece8e0":"none"}}>
                  <div style={{padding:"8px 11px"}}>
                    <div style={{fontSize:9,color:GOLD,fontWeight:700,marginBottom:2}}>{item.label}</div>
                    <div style={{fontSize:11,color:"#333",lineHeight:1.6}}>{item.detail}</div>
                  </div>
                  <div style={{background:NAVY,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontWeight:900,fontSize:12}}>{item.grade}</span></div>
                </div>
              ))}
            </div>
            {(photos.length>0||photoAnalysis)&&<>
              <div style={{background:NAVY,padding:"5px 12px"}}><span style={{color:"#fff",fontSize:10,fontWeight:700,letterSpacing:1}}>첨부 결과물 분석</span></div>
              <div style={{border:`1px solid ${NAVY}`,borderTop:"none",padding:10,marginBottom:10}}>
                {photos.length>0&&<div style={{display:"grid",gridTemplateColumns:`repeat(${Math.min(photos.length,3)},1fr)`,gap:6,marginBottom:photoAnalysis?8:0}}>
                  {photos.map((p,i)=><img key={i} src={p.dataUrl} alt="" style={{width:"100%",aspectRatio:"4/3",objectFit:"cover",borderRadius:3,border:"1px solid #e0ddd5"}}/>)}
                </div>}
                {photoAnalysis&&<div style={{fontSize:11,color:"#333",lineHeight:1.7,borderTop:photos.length?"1px solid #ece8e0":"none",paddingTop:photos.length?8:0}}>{photoAnalysis}</div>}
              </div>
            </>}
            <div style={{display:"grid",gridTemplateColumns:"1fr 130px",gap:10,marginBottom:10,alignItems:"stretch"}}>
              <div style={{display:"flex",flexDirection:"column"}}>
                <div style={{background:NAVY,padding:"4px 11px"}}><span style={{color:"#fff",fontSize:9,fontWeight:700}}>학습 성취도</span></div>
                <div style={{border:`1px solid ${NAVY}`,borderTop:"none",flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"4px"}}>
                  <svg width="100%" viewBox="0 0 200 200" style={{display:"block",maxHeight:"120px"}}>
                    {[60,45,30,15].map(r=><polygon key={r} points={poly(r)} fill="none" stroke="#ece8e0" strokeWidth="1"/>)}
                    <polygon points={poly(60*avg)} fill="rgba(196,168,79,0.2)" stroke={GOLD} strokeWidth="2"/>
                    {[["종합",100,22],["참여",175,80],["성취",148,168],["과제",52,168],["태도",25,80]].map(([l,x,y])=><text key={l} x={x} y={y} textAnchor="middle" fontSize="12" fill={NAVY}>{l}</text>)}
                    <text x="100" y="108" textAnchor="middle" fontSize="13" fontWeight="700" fill={GOLD}>{attitude} / {homework}</text>
                  </svg>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",marginTop:20}}>
                <div style={{border:`2px solid ${NAVY}`,borderRadius:3,overflow:"hidden",flex:1,display:"flex",flexDirection:"column"}}>
                  <div style={{background:NAVY,padding:"5px 10px",color:"#fff",fontSize:9,fontWeight:700}}>학습태도</div>
                  <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:900,color:GOLD}}>{attitude}</div>
                  <div style={{background:NAVY,padding:"5px 10px",color:"#fff",fontSize:9,fontWeight:700}}>과제수행</div>
                  <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,fontWeight:900,color:GOLD}}>{homework}</div>
                </div>
              </div>
            </div>
            <div style={{background:NAVY,padding:"7px 12px"}}><span style={{fontSize:9,letterSpacing:3,color:GOLD,fontWeight:700}}>TEACHER'S COMMENTS AND FEEDBACK</span></div>
            <div style={{border:`1px solid ${NAVY}`,borderTop:"none",padding:"14px 16px",marginBottom:12}}>
              <div style={{fontSize:12,lineHeight:2.1,color:"#222",whiteSpace:"pre-line"}}>{comments}</div>
            </div>
            <div style={{borderTop:"1px solid #ddd",paddingTop:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,background:LOGO_BG,padding:"4px 10px",borderRadius:6}}>
                <img src={LOGO_SRC} width={24} height={24} style={{objectFit:"contain"}}/>
                <span style={{fontSize:9,color:LOGO_GOLD,fontWeight:700}}>와튼영어스쿨</span>
              </div>
              <span style={{fontSize:9,color:"#ccc"}}>WHARTON ENGLISH SCHOOL — MONTHLY PROGRESS REPORT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
