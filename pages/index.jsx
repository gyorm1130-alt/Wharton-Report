import { useState, useRef, useCallback } from "react";

const G="#c4a84f",N="#0f1f42",LBG="#0a1530",LG="#c4b28a";
const LOGO_SRC="data:image/jpeg;base64,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";
const CATS=["고난도 독해","국제반 수능 엔솔로지","내신","모의고사","문법트레이닝","서술형대비","수능형독해","독해/중등독해","영어논술","원어민","클래스 무비","토셀/토플","파닉스","LT"];
const GRS=["A+","A","A-","B+","B","B-","C+","C","C-","D"];
const CUR=`[서술형] Essay1~6: 주어/be동사/명사/형용사/관사/인칭대명사/전치사/현재진행형/명령문/제안문/접속사/There be/미래형will/4·5형식/조동사/to부정사/과거시제/비교급·최상급/지각동사/가주어·진주어/수동태/사역동사/동명사/분사
[English Holic] After Phonics→Reading S1~S4 / OK Writing+Bridge / Writing Holic with Grammar / 영어문장쓰기설명서 / 문법트레이닝 Holic Grammar 1~24
[문법트레이닝] Ch01인칭대명사→Ch02be동사→Ch03일반동사→Ch04의문사→Ch05명사→Ch06관사→Ch07대명사→Ch08형용사→Ch09부사→Ch10시제→Ch11조동사→Ch12to부정사→Ch13동명사→Ch14접속사→Ch15전치사→Ch16문장종류→Ch17문장형태→Ch18비교→Ch19수동태→Ch20관계대명사→Ch21관계부사→Ch22분사→Ch23가정법→Ch24일치화법`;

const gcol = g => ["A+","A","A-"].includes(g) ? "#2e7d32" : ["B+","B","B-"].includes(g) ? "#1565c0" : ["C+","C","C-"].includes(g) ? "#f57f17" : "#c62828";
const gbg = g => ["A+","A","A-"].includes(g) ? "#e8f5e9" : ["B+","B","B-"].includes(g) ? "#e3f2fd" : ["C+","C","C-"].includes(g) ? "#fff8e1" : "#fce4ec";
const gst = g => ({ background: gbg(g), color: gcol(g), fontWeight: 900 });
const fn = n => { const s = n.trim(); return s.length <= 2 ? s : s.slice(1); };
const today = new Date();

function compImg(f) {
  return new Promise(r => {
    const rd = new FileReader();
    rd.onload = e => {
      const i = new Image();
      i.onload = () => {
        const c = document.createElement("canvas");
        let w = i.width, h = i.height, M = 640;
        if (w > M) { h = h * M / w; w = M; }
        if (h > M) { w = w * M / h; h = M; }
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(i, 0, 0, w, h);
        r({ name: f.name, url: c.toDataURL("image/jpeg", 0.55), type: "image/jpeg" });
      };
      i.src = e.target.result;
    };
    rd.readAsDataURL(f);
  });
}

// 등급 → 숫자 변환 (0~1)
const g2n = g => ({ "A+":1,"A":.9,"A-":.8,"B+":.7,"B":.6,"B-":.5,"C+":.4,"C":.3,"C-":.2,"D":.1 }[g] || .5);
// 숫자 → 등급 변환 (종합 평균용)
const n2g = n => n >= .95 ? "A+" : n >= .85 ? "A" : n >= .75 ? "A-" : n >= .65 ? "B+" : n >= .55 ? "B" : n >= .45 ? "B-" : n >= .35 ? "C+" : n >= .25 ? "C" : n >= .15 ? "C-" : "D";

// 모든 평가를 모아 종합 점수 계산 (학습태도+과제수행+모든 진도평가+모든 분석등급)
function calcOverall(d) {
  const scores = [g2n(d.att), g2n(d.hw)];
  if (Array.isArray(d.cats)) d.cats.forEach(c => { if (c.grade) scores.push(g2n(c.grade)); });
  if (Array.isArray(d.anal)) d.anal.forEach(a => { if (a.grade) scores.push(g2n(a.grade)); });
  const avg = scores.reduce((s, v) => s + v, 0) / scores.length;
  return { avg, grade: n2g(avg) };
}

function buildRadarSVG(d) {
  const polyPoints = scale => {
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const a = (i * 2 * Math.PI / 5) - Math.PI / 2;
      pts.push((100 + scale * Math.cos(a)) + "," + (100 + scale * Math.sin(a)));
    }
    return pts.join(" ");
  };
  const { avg, grade: overall } = calcOverall(d);
  const rings = [60, 45, 30, 15].map(s => `<polygon points="${polyPoints(s)}" fill="none" stroke="#c8d4ea" stroke-width="1"/>`).join("");
  const fill = `<polygon points="${polyPoints(60 * avg)}" fill="rgba(196,168,79,0.22)" stroke="#c4a84f" stroke-width="2"/>`;
  const labels = [["종합",100,22],["참여",175,82],["성취",148,168],["과제",52,168],["태도",25,82]]
    .map(([l,x,y]) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="11" fill="#0f1f42" font-family="Malgun Gothic,sans-serif">${l}</text>`).join("");
  return `<svg viewBox="0 0 200 200" width="110" style="display:block;">${rings}${fill}${labels}<text x="100" y="108" text-anchor="middle" font-size="14" font-weight="900" fill="#c4a84f">${overall}</text></svg>`;
}

function makeHTML(d) {
  const SH = (t, e = "") => `<div style="background:linear-gradient(135deg,${N},#1a3060);padding:7px 14px;border-radius:6px 6px 0 0;"><span style="color:${G};font-size:10px;font-weight:700;letter-spacing:1px;">${e} ${t}</span></div>`;
  const gst2 = g => {
    const bg = ["A+","A","A-"].includes(g) ? "#e8f5e9" : ["B+","B","B-"].includes(g) ? "#e3f2fd" : ["C+","C","C-"].includes(g) ? "#fff8e1" : "#fce4ec";
    const co = ["A+","A","A-"].includes(g) ? "#2e7d32" : ["B+","B","B-"].includes(g) ? "#1565c0" : ["C+","C","C-"].includes(g) ? "#f57f17" : "#c62828";
    return `background:${bg};color:${co};font-weight:900;`;
  };
  const ph = d.photos.length > 0
    ? `<table style="width:100%;border-collapse:collapse;"><tr>${d.photos.slice(0, 3).map(p => `<td style="padding:4px;width:33%;"><img src="${p.url}" style="width:100%;height:200px;object-fit:cover;border-radius:6px;border:1px solid #e0ddd5;display:block;"></td>`).join("")}</tr></table>`
    : "";
  const ps = d.photos.length > 0
    ? `<div class="photo-section" style="margin-top:16px;page-break-inside:avoid;break-inside:avoid;">${SH("첨부 결과물 분석","📸")}<div style="border:1px solid #ddd;border-top:none;padding:14px;border-radius:0 0 6px 6px;">${ph}${d.pa ? `<div style="font-size:12px;color:#333;line-height:1.8;background:#fafaf8;padding:12px;border-radius:6px;border-left:3px solid ${G};margin-top:10px;">${d.pa}</div>` : ""}</div></div>`
    : "";
  const cr = d.cats.map((c, i) => `<tr style="background:${i % 2 === 0 ? "#fff" : "#fafbff"};"><td style="padding:8px 12px;font-size:10px;font-weight:700;color:${N};border-right:2px solid ${G};width:115px;vertical-align:middle;">[${c.cat}]</td><td style="padding:8px 12px;font-size:11px;color:#333;line-height:1.6;">${c.cont}</td><td style="${gst2(c.grade || "A")}text-align:center;font-size:13px;width:48px;vertical-align:middle;">${c.grade || "A"}</td></tr>`).join("");
  const ar = d.anal.map((it, i) => `<tr style="background:${i % 2 === 0 ? "#fff" : "#fafbff"};"><td style="padding:9px 12px;border-right:2px solid ${G};"><div style="font-size:9px;color:${G};font-weight:700;margin-bottom:3px;">${it.label}</div><div style="font-size:11px;color:#333;line-height:1.6;">${it.detail}</div></td><td style="background:${N};text-align:center;vertical-align:middle;width:44px;"><span style="color:#fff;font-weight:900;font-size:13px;">${it.grade}</span></td></tr>`).join("");
  const cu = "";
  const ac = ["A+","A","A-"].includes(d.att) ? "#2e7d32" : ["B+","B","B-"].includes(d.att) ? "#1565c0" : "#f57f17";
  const hc = ["A+","A","A-"].includes(d.hw) ? "#2e7d32" : ["B+","B","B-"].includes(d.hw) ? "#1565c0" : "#f57f17";
  const radarSVG = buildRadarSVG(d);
  const { avg: overallAvg, grade: overallGrade } = calcOverall(d);
  const summary = overallAvg >= .85 ? "우수한" : overallAvg >= .7 ? "양호한" : overallAvg >= .55 ? "안정적인" : "성장 중인";
  const summaryMsg = overallAvg >= .85
    ? `종합 평가 <b style="color:${N};">${overallGrade}</b>, <b style="color:${N};">${summary}</b> 학습 성취를 보이고 있어 매우 인상적입니다.`
    : overallAvg >= .7
    ? `종합 평가 <b style="color:${N};">${overallGrade}</b>, <b style="color:${N};">${summary}</b> 수준으로 꾸준한 학습 습관이 잘 형성되어 있습니다.`
    : `종합 평가 <b style="color:${N};">${overallGrade}</b>, <b style="color:${N};">${summary}</b> 단계로 앞으로의 발전이 더욱 기대됩니다.`;

  const achievementBlock = `<div style="background:#eef1f8;border:1px solid #c8d4ea;border-radius:7px;padding:10px 14px;margin-bottom:10px;">
<div style="font-size:9px;color:${N};font-weight:700;margin-bottom:8px;">📊 학습 성취도</div>
<table style="width:100%;border-collapse:collapse;"><tr>
<td style="width:140px;vertical-align:middle;padding-right:12px;">${radarSVG}</td>
<td style="vertical-align:top;">
<table style="width:100%;border-collapse:separate;border-spacing:6px 0;margin-bottom:8px;"><tr>
<td style="background:#fff;border:1px solid #d8e0ee;border-radius:6px;padding:8px 10px;text-align:center;width:50%;"><div style="font-size:9px;color:#666;margin-bottom:3px;">학습태도</div><div style="font-size:26px;font-weight:900;color:${ac};line-height:1;">${d.att}</div></td>
<td style="background:#fff;border:1px solid #d8e0ee;border-radius:6px;padding:8px 10px;text-align:center;width:50%;"><div style="font-size:9px;color:#666;margin-bottom:3px;">과제수행</div><div style="font-size:26px;font-weight:900;color:${hc};line-height:1;">${d.hw}</div></td>
</tr></table>
<div style="background:#fff;border:1px solid ${G};border-left:3px solid ${G};border-radius:4px;padding:7px 10px;font-size:10.5px;color:#444;line-height:1.55;"><span style="color:${G};font-weight:700;margin-right:4px;">💬</span>${summaryMsg}</div>
</td></tr></table>
</div>`;

  return `<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><title>와튼_${d.name}_${d.month}</title><style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Malgun Gothic','Apple SD Gothic Neo',Arial,sans-serif;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;color-adjust:exact;}table{border-collapse:collapse;width:100%;}.no-break{page-break-inside:avoid;break-inside:avoid;}@media print{@page{margin:8mm;size:A4;}body{padding:0;}.main-card{page-break-after:auto;}.photo-section{page-break-before:auto;}}</style></head><body><div style="max-width:780px;margin:0 auto;"><div style="background:${LBG};padding:14px 28px 12px;text-align:center;"><div style="font-size:14px;letter-spacing:5px;color:${LG};font-weight:700;">WHARTON ENGLISH SCHOOL</div><div style="font-size:11px;letter-spacing:4px;color:#a0925a;margin-top:3px;">MONTHLY PROGRESS REPORT</div></div><table class="main-card"><tr><td style="background:linear-gradient(180deg,${N},#1a3060);width:32px;text-align:center;vertical-align:middle;"><div style="writing-mode:vertical-rl;transform:rotate(180deg);font-size:9px;letter-spacing:4px;color:${G};font-weight:700;padding:14px 0;">REPORT CARD</div></td><td style="padding:12px 18px;vertical-align:top;"><table style="border:2px solid ${N};border-radius:6px;overflow:hidden;margin-bottom:10px;"><tr style="background:linear-gradient(135deg,${N},#1a3060);">${[["Name",d.name],["Class",d.cls],["Teacher",d.tchr],["Month",d.month]].map(([k,v]) => `<td style="padding:7px 12px;border-right:1px solid #2a4070;"><div style="font-size:8px;color:${G};letter-spacing:1px;">${k}</div><div style="font-size:12px;font-weight:700;color:#fff;">${v}</div></td>`).join("")}</tr></table>${cu}${SH("학습진도평가","📚")}<table style="border:1px solid #ddd;border-top:none;margin-bottom:10px;border-radius:0 0 6px 6px;overflow:hidden;">${cr}</table>${SH("학습 분석 리포트","🔍")}<table style="border:1px solid #ddd;border-top:none;margin-bottom:10px;border-radius:0 0 6px 6px;overflow:hidden;">${ar}</table>${achievementBlock}<div class="no-break"><div style="background:linear-gradient(135deg,${N},#1a3060);padding:8px 14px;border-radius:6px 6px 0 0;"><span style="font-size:9px;letter-spacing:3px;color:${G};font-weight:700;">✍️ TEACHER'S COMMENTS AND FEEDBACK</span></div><div style="border:1px solid #ddd;border-top:none;padding:14px 16px;border-radius:0 0 6px 6px;background:#fffef8;"><div style="font-size:11.5px;line-height:2.0;color:#222;white-space:pre-line;">${d.cmt}</div></div></div></td></tr></table>${ps}<div style="max-width:780px;margin:14px auto 0;padding:8px 18px 0;border-top:1px solid #eee;display:flex;justify-content:space-between;align-items:center;"><div style="background:${LBG};padding:4px 10px;border-radius:6px;"><span style="font-size:9px;color:${LG};font-weight:700;">와튼영어스쿨</span></div><span style="font-size:8px;color:#ccc;">WHARTON ENGLISH SCHOOL — MONTHLY PROGRESS REPORT</span></div></div><script>window.addEventListener("load",function(){setTimeout(function(){window.print();},700);});<\/script></body></html>`;
}

const inp = { width: "100%", padding: "9px 12px", border: "1.5px solid #ddd", borderRadius: 7, fontSize: 13, outline: "none", fontFamily: "inherit", background: "#fff" };
const SH = ({ t, e = "" }) => <div style={{ background: `linear-gradient(135deg,${N},#1a3060)`, padding: "7px 14px", borderRadius: "6px 6px 0 0" }}><span style={{ color: G, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>{e} {t}</span></div>;

export default function App() {
  const [step, setStep] = useState("landing");
  const [cls, setCls] = useState("");
  const [tchr, setTchr] = useState("");
  const [month, setMonth] = useState(`${today.getFullYear()}년 ${today.getMonth() + 1}월`);
  const [cats, setCats] = useState([{ cat: "서술형대비", cont: "" }]);
  const [cg, setCg] = useState(["A"]);
  const [name, setName] = useState("");
  const [att, setAtt] = useState("A+");
  const [hw, setHw] = useState("A+");
  const [photos, setPhotos] = useState([]);
  const [rpt, setRpt] = useState(null);
  const [err, setErr] = useState("");
  const [cmt, setCmt] = useState("");
  const [paEdit, setPaEdit] = useState(""); // 사진 분석 편집용
  const [progOverride, setProgOverride] = useState({}); // 학생별 진도 오버라이드 {인덱스: "수정된 진도내용"}
  const [editIdx, setEditIdx] = useState(-1); // 편집 중인 진도 인덱스 (-1이면 편집 없음)
  const fileRef = useRef();

  const syncGrades = cats.map((_, i) => cg[i] || "A");
  // 실제 사용할 진도 내용 (오버라이드 있으면 그것, 없으면 반 공통)
  const getContent = (i, defaultCont) => progOverride[i] !== undefined ? progOverride[i] : defaultCont;

  const handleFiles = useCallback(async (files) => {
    const arr = Array.from(files).slice(0, 3 - photos.length);
    const res = await Promise.all(arr.map(f => compImg(f)));
    setPhotos(p => [...p, ...res].slice(0, 3));
  }, [photos]);

  const doGen = async () => {
    if (!name.trim()) { setErr("학생 이름을 입력해주세요."); return; }
    // 반 공통 진도에 학생별 오버라이드 적용
    const catsWithOverride = cats.map((c, i) => ({ ...c, cont: getContent(i, c.cont) }));
    const vc = catsWithOverride.filter(c => c.cat && c.cont.trim());
    if (!vc.length) { setErr("학습 진도를 최소 1개 입력해주세요."); return; }
    setErr(""); setStep("generating");
    const first = fn(name);
    // 평가 등급도 같이 매핑
    const validIndices = cats.map((c, i) => ({ c, i })).filter(({ c }, idx) => c.cat && getContent(idx, c.cont).trim()).map(({ i }) => i);
    const cwg = vc.map((c, idx) => ({ ...c, grade: cg[validIndices[idx]] || "A" }));
    const hp = photos.length > 0;
    const pc = hp ? photos.map(p => ({ type: "image", source: { type: "base64", media_type: p.type, data: p.url.split(",")[1] } })) : [];
    // 진도 텍스트를 미리 빌드 (백틱 안에 화살표 함수 직접 쓰지 않기 위해)
    const progressLines = [];
    for (let i = 0; i < cwg.length; i++) {
      const c = cwg[i];
      progressLines.push("[" + c.cat + "] " + c.cont + " (평가: " + c.grade + ")");
    }
    const progressText = progressLines.join("\n");
    // prompt를 일반 문자열 합치기로 (백틱 안에 백틱 들어가면 GitHub가 깨뜨림)
    const photoAnaInst = hp
      ? "당신은 시험·과제 분석 전문가입니다. " + first + " 학생의 학습물을 보고 아래 형식으로 분석을 작성하세요.\\n\\n[필수 어조 - 매우 중요]\\n모든 문장을 반드시 '~입니다', '~합니다', '~됩니다', '~보입니다' 같은 격식체(하십시오체)로 작성합니다.\\n절대 금지: '~해요', '~예요', '~이에요', '~네요', '~군요', '~돼요' 같은 해요체 어미 사용 금지.\\n\\n[작성 형식 - 정확히 이 순서, 4~5문장, 250자 내외]\\n① 무엇을 시험·학습한 자료인지 (예: 'be동사 의문문과 현재진행형 작문을 다룬 학습 내용입니다.') - 1문장\\n② 잘한 부분/이해한 개념 - 구체적 문법 용어로 (예: '명사+be동사 일치는 안정적으로 처리하고 있습니다.') - 1~2문장\\n③ 약한 부분/보강 필요 개념 - 구체적 진단 (예: '복수 주어와 be동사 활용에서 일부 혼동이 보입니다.') - 1~2문장\\n④ 격려·응원 한마디 (예: '꾸준한 연습으로 충분히 극복할 수 있는 부분이므로 함께 다져나가겠습니다.') - 1문장\\n\\n[절대 금지 - 한 단어라도 들어가면 안 됨]\\n사진, 첨부, 노트, 필기, 문제지, 활동지, 시험지, 과제물, 자료에는, 자료를 보면, 첨부 자료, 첨부된\\n빨간, 빨간색, 빨간 펜, 빨간펜, 빨간 원, 빨간색 원, 동그라미, 체크, 체크되어, 표시되어, 표시한, 채점\\n복습 흔적, 학습 흔적, 흔적, 표시되어 있, 정리한 흔적, 정리해놓은\\n학생이 ~한, 스스로 표시, 스스로 체크, 자기주도\\n\\n자료의 외관·표시·채점에 대해서는 한 글자도 쓰지 않습니다. 오직 학생이 학습한 내용과 이해도만 분석하며, 반드시 격식체(~입니다)로 작성합니다."
      : "";

    const commentsInst = "매우중요: 반드시 한글 400자 이상 500자 이내(공백포함). 400자 미만 금지. (1)첫문장: '" + first + "는 이번 달에...' 또는 '" + first + "이는 이번 달에...' (성 제외, '학생' 단어 금지) (2)손편지처럼 친근하고 따뜻하게 (3)학습 성취 구체적 칭찬 (과목명·진도내용 활용) (4)수업 태도·참여도 1~2문장 (5)생활·인성 긍정적 면모 1문장 (6)아쉬운 점·부정 표현·~지만·~했으면 등 직접 언급 절대 금지 (7)응원·기대로 마무리 (8)마지막 줄에 줄바꿈 후 '" + tchr + " 선생님 드림' (9)글자수 400~500자 엄수";

    const promptParts = [];
    promptParts.push("당신은 와튼영어스쿨 담당 선생님입니다.");
    promptParts.push("");
    promptParts.push("[와튼영어스쿨 커리큘럼 참고]");
    promptParts.push(CUR);
    promptParts.push("");
    promptParts.push("[중요 안내사항]");
    promptParts.push("- 문법트레이닝은 학생마다 개별 진도로 진행됩니다. 다른 학생과 비교하지 말고 " + first + " 학생의 현재 진도에 집중해서 분석하세요.");
    promptParts.push("- 첨부된 자료는 선생님이 이미 채점을 마친 " + first + " 학생의 결과물입니다. 자료 자체나 채점 표시(빨간 원·체크 등)는 절대 언급하지 마세요.");
    promptParts.push("- photoAnalysis는 자료를 보고 '" + first + " 학생이 어떤 개념을 정확히 이해하고 있고, 어떤 개념이 약한지'만 자연스럽게 진단합니다.");
    promptParts.push("- '사진', '문제지', '빨간 원', '체크', '표시' 같은 메타 표현은 photoAnalysis에서 절대 사용하지 마세요. 이 단어가 하나라도 들어가면 안 됩니다.");
    promptParts.push("");
    promptParts.push("[학생 정보]");
    promptParts.push("이름: " + name + " / 성 제외 호칭: " + first);
    promptParts.push("반: " + cls + " / 담당: " + tchr + " / 월: " + month);
    promptParts.push("학습태도 등급: " + att + " / 과제수행 등급: " + hw);
    promptParts.push("");
    promptParts.push("[이번 달 학습 진도 및 평가]");
    promptParts.push(progressText);
    if (hp) promptParts.push("\n[첨부 사진: " + photos.length + "장 - 학생의 시험지/과제물]");
    promptParts.push("");
    promptParts.push("순수 JSON만 출력 (마크다운 코드블록 금지):");
    promptParts.push("{");
    promptParts.push('  "analysisItems": [');
    promptParts.push('    {"label":"학습 강점","detail":"진도 평가 등급을 근거로 잘하는 영역과 그 이유를 2문장(반드시 격식체 ~입니다 어미 사용, ~해요 금지)","grade":"A+"},');
    promptParts.push('    {"label":"발전 영역","detail":"상대적으로 보강이 필요한 영역을 부드럽게 2문장(반드시 격식체 ~입니다 어미 사용, ~해요 금지)","grade":"B+"},');
    promptParts.push('    {"label":"권장 학습 방향","detail":"개별 진도 기준 다음 달 학습 전략 2문장(반드시 격식체 ~입니다 어미 사용, ~해요 금지)","grade":"A"}');
    promptParts.push('  ],');
    promptParts.push('  "photoAnalysis": "' + photoAnaInst + '",');
    promptParts.push('  "comments": "' + commentsInst + '"');
    promptParts.push("}");
    const prompt = promptParts.join("\n");
    const mc = hp ? [...pc, { type: "text", text: prompt }] : prompt;
    const tryModels = ["claude-sonnet-4-5", "claude-sonnet-4-5-20250929", "claude-sonnet-4-20250514", "claude-3-5-sonnet-20241022"];
    let lastErr = "";
    try {
      let data = null;
      for (const model of tryModels) {
        const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model, max_tokens: 2000, messages: [{ role: "user", content: mc }] }) });
        if (res.ok) { data = await res.json(); break; }
        let detail = "";
        try { const ej = await res.json(); detail = ej.error || ej.message || JSON.stringify(ej); } catch { detail = await res.text().catch(() => ""); }
        lastErr = `${res.status} (${model}) - ${detail.slice(0, 150)}`;
        if (res.status !== 404 && res.status !== 400) break;
      }
      if (!data) throw new Error(lastErr || "모든 모델 호출 실패");
      let raw = (data.content || []).map(b => b.type === "text" ? b.text : "").join("");
      const fi = raw.indexOf("{"), la = raw.lastIndexOf("}");
      if (fi === -1 || la === -1) throw new Error("JSON없음");
      const p = JSON.parse(raw.slice(fi, la + 1));
      // 사진 분석 결과 후처리: 금지어 포함 시 안전한 형태로 정제
      let safePA = hp ? (p.photoAnalysis || "") : "";
      if (safePA) {
        const bannedWords = ["사진", "첨부", "노트 필기", "필기에", "문제지", "활동지", "시험지", "과제물에", "자료에는", "자료를 보면", "빨간", "동그라미", "체크되어", "체크한", "표시되어", "표시한", "채점", "복습한 흔적", "학습한 흔적", "흔적이 보", "흔적이 역", "흔적이 느", "흔적이 묻"];
        const hasBanned = bannedWords.some(w => safePA.includes(w));
        if (hasBanned) {
          // 첫 문장만 잘라내고 안전한 안내문 추가
          const sentences = safePA.split(/(?<=[.!?])\s+/).filter(s => !bannedWords.some(w => s.includes(w)));
          safePA = sentences.length > 0
            ? sentences.join(" ") + ` ${first}의 학습 내용을 바탕으로 강점은 더 다지고 부족한 부분은 차근차근 보완해 나가겠습니다.`
            : `${first}가 학습한 내용을 검토한 결과, 전반적으로 성실하게 임하고 있으며 부족한 부분은 다음 달 학습으로 충분히 보완 가능합니다.`;
        }
      }
      setRpt({ name, first, month, cls, tchr, cats: cwg, att, hw, photos, cl: p.curriculumLevel || "", ns: p.nextStep || "", anal: Array.isArray(p.analysisItems) ? p.analysisItems : [], pa: safePA, cmt: p.comments || "" });
      setCmt(p.comments || ""); setPaEdit(safePA); setStep("report");
    } catch (e) { setErr("AI 생성 오류: " + e.message); setStep("form"); }
  };

  const doPrint = () => {
    const html = makeHTML({ ...rpt, cmt, pa: paEdit });
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `와튼_${rpt.name}_${rpt.month}.html`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  };

  const doShare = () => {
    const d = rpt;
    const txt = ["【와튼영어스쿨 월말 리포트】", "━━━━━━━━", `📌${d.name}|${d.cls}|${d.tchr}선생님|${d.month}`, "", "📚학습진도", ...d.cats.map(c => `·[${c.cat}]${c.cont}▶${c.grade}`), "", "📊분석", ...d.anal.map(a => `·${a.label}(${a.grade}):${a.detail}`), "", `📝태도:${d.att}|과제:${d.hw}`, "", "💬코멘트", cmt, paEdit ? "\n📸결과물 분석\n" + paEdit : "", "━━━━━━━━", "와튼영어스쿨"].filter(Boolean).join("\n");
    try {
      const ta = document.createElement("textarea");
      ta.value = txt;
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0.01;width:1px;height:1px;";
      document.body.appendChild(ta); ta.focus(); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
      alert("복사됐어요! 카카오톡에 붙여넣기 하세요 😊");
    } catch { alert("복사 실패"); }
  };

  // ── 랜딩 ──
  if (step === "landing") return (
    <div style={{ background: LBG, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0 40px", fontFamily: "'Malgun Gothic','Apple SD Gothic Neo',sans-serif" }}>
      <div style={{ maxWidth: 600, width: "100%", padding: "40px 20px 0", textAlign: "center" }}>
        <div style={{ background: "rgba(196,168,79,0.12)", border: "1px solid rgba(196,168,79,0.3)", borderRadius: 12, padding: "16px 20px", marginBottom: 18, display: "inline-flex", alignItems: "center", gap: 14 }}>
          <img src={LOGO_SRC} width={60} height={60} style={{ objectFit: "contain" }} />
          <div style={{ textAlign: "left" }}><div style={{ fontSize: 18, fontWeight: 900, color: G, letterSpacing: 2 }}>WHARTON</div><div style={{ fontSize: 10, color: "#a09070", letterSpacing: 2, marginTop: 2 }}>ENGLISH SCHOOL</div></div>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 0 10px", lineHeight: 1.35 }}>AI 월말 리포트<br /><span style={{ color: G }}>자동 생성기</span></h1>
        <p style={{ fontSize: 13, color: "#8a9bb8", lineHeight: 1.8, margin: "0 0 22px" }}>학생 이름·등급·과목별 평가만 입력하면<br />커리큘럼 분석·코멘트·성취도까지 완성</p>
        <button onClick={() => setStep("setup")} style={{ padding: "12px 36px", background: `linear-gradient(135deg,${G},#a07c2a)`, border: "none", borderRadius: 50, fontSize: 14, fontWeight: 900, color: "#fff", cursor: "pointer", marginBottom: 8 }}>✨ 지금 바로 시작하기</button>
        <p style={{ fontSize: 11, color: "#506080" }}>🔓 로그인 불필요 · 누구나 즉시 사용</p>
      </div>
      <div style={{ maxWidth: 560, width: "100%", margin: "24px 0 0", padding: "0 16px", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 8 }}>
        {[["🤖", "AI 커리큘럼 분석", "강점·발전·방향 자동 생성"], ["📊", "과목별 등급 평가", "A+~D 등급 직접 입력"], ["✍️", "500자 코멘트", "따뜻한 손편지 스타일"], ["📸", "결과물 사진 분석", "시험지·과제물 AI 분석"], ["🖨️", "깔끔한 인쇄/PDF", "로고·색상 완벽 출력"], ["📋", "텍스트 복사", "카카오톡 바로 공유"]].map(([ic, t, dsc], i) => (
          <div key={i} style={{ background: "rgba(196,168,79,0.06)", border: "1px solid rgba(196,168,79,0.15)", borderRadius: 9, padding: "10px 12px", display: "flex", gap: 8 }}>
            <span style={{ fontSize: 17 }}>{ic}</span>
            <div><div style={{ fontSize: 11, fontWeight: 800, color: "#ddd", marginBottom: 1 }}>{t}</div><div style={{ fontSize: 10, color: "#607090", lineHeight: 1.4 }}>{dsc}</div></div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── 반 설정 ──
  if (step === "setup") return (
    <div style={{ minHeight: "100vh", background: "#f5f2ec", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 14px", fontFamily: "'Malgun Gothic','Apple SD Gothic Neo',sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 12, padding: 22, width: "100%", maxWidth: 420, boxShadow: "0 4px 18px rgba(15,31,66,0.1)" }}>
        <div style={{ background: LBG, borderRadius: 8, padding: "12px", textAlign: "center", marginBottom: 12, display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
          <img src={LOGO_SRC} width={48} height={48} style={{ objectFit: "contain" }} />
          <div style={{ color: LG, fontSize: 12, fontWeight: 900, letterSpacing: 2 }}>WHARTON</div>
        </div>
        <h3 style={{ color: N, margin: "0 0 4px", fontSize: 14, fontWeight: 800, textAlign: "center" }}>📌 반 공통 정보 설정</h3>
        <p style={{ color: "#aaa", fontSize: 11, marginBottom: 14, textAlign: "center" }}>한 번 저장하면 고정됩니다.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
          <div><label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 4 }}>반 (CLASS)</label><input style={inp} placeholder="예: M1" value={cls} onChange={e => setCls(e.target.value)} /></div>
          <div><label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 4 }}>담당 선생님</label><input style={inp} placeholder="예: Alice" value={tchr} onChange={e => setTchr(e.target.value)} /></div>
        </div>
        <div style={{ marginBottom: 10 }}><label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 4 }}>리포트 월</label><input style={inp} value={month} onChange={e => setMonth(e.target.value)} /></div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
            <label style={{ fontSize: 11, color: "#666", fontWeight: 700 }}>📚 학습 진도 항목</label>
            <button onClick={() => { setCats(c => [...c, { cat: "", cont: "" }]); setCg(g => [...g, "A"]); }} style={{ fontSize: 10, color: G, background: "none", border: `1px solid ${G}`, borderRadius: 5, padding: "2px 7px", cursor: "pointer" }}>+ 추가</button>
          </div>
          <div style={{ background: "#fafaf8", borderRadius: 6, padding: 9 }}>
            {cats.map((c, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #ece8e0", borderRadius: 6, padding: 8, marginBottom: i < cats.length - 1 ? 7 : 0 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "center" }}>
                  <select value={c.cat} onChange={e => setCats(cs => cs.map((x, j) => j === i ? { ...x, cat: e.target.value } : x))} style={{ ...inp, padding: "6px 8px", fontSize: 11, flex: 1 }}>
                    <option value="">카테고리 선택</option>
                    {CATS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {i > 0 && <button onClick={() => { setCats(cs => cs.filter((_, j) => j !== i)); setCg(gs => gs.filter((_, j) => j !== i)); }} style={{ background: "#fee2e2", border: "none", borderRadius: 5, padding: "5px 9px", color: "#c00", fontSize: 11, cursor: "pointer", flexShrink: 0 }}>✕</button>}
                </div>
                <textarea value={c.cont} onChange={e => setCats(cs => cs.map((x, j) => j === i ? { ...x, cont: e.target.value } : x))} style={{ ...inp, minHeight: 52, fontSize: 11, resize: "vertical" }} placeholder="진도 내용을 입력하세요..." />
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => { if (!cls || !tchr) { alert("반과 선생님을 입력해주세요."); return; } if (!cats.some(c => c.cat && c.cont.trim())) { alert("학습 진도를 최소 1개 입력해주세요."); return; } setStep("form"); }} style={{ width: "100%", padding: 12, background: N, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 900, cursor: "pointer" }}>저장하고 시작하기 →</button>
      </div>
    </div>
  );

  // ── 입력 폼 ──
  if (step === "form" || step === "generating") {
    const isG = step === "generating";
    return (
      <div style={{ minHeight: "100vh", background: "#f5f2ec", fontFamily: "'Malgun Gothic','Apple SD Gothic Neo',sans-serif" }}>
        <div style={{ background: LBG, padding: "14px 0 10px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={LOGO_SRC} width={60} height={60} style={{ objectFit: "contain" }} />
          <div style={{ color: LG, fontSize: 9, letterSpacing: 5, marginTop: 4 }}>MONTHLY PROGRESS REPORT</div>
          <div style={{ width: 32, height: 2, background: LG, margin: "5px auto 0" }} />
        </div>
        <div style={{ background: "#fff", borderBottom: "2px solid #e8e4db", padding: "7px 14px", maxWidth: 480, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 12, color: N, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span>📌 <b>{cls}</b></span><span style={{ color: "#888" }}>👩‍🏫 {tchr}선생님</span><span style={{ color: "#888" }}>📅 {month}</span>
          </div>
          <button onClick={() => setStep("setup")} style={{ fontSize: 10, color: G, background: "none", border: `1px solid ${G}`, borderRadius: 5, padding: "2px 7px", cursor: "pointer" }}>수정</button>
        </div>
        <div style={{ maxWidth: 480, margin: "14px auto 32px", background: "#fff", borderRadius: 12, boxShadow: "0 4px 18px rgba(15,31,66,0.1)", padding: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ background: "#fff8e7", border: `1px solid ${G}`, borderRadius: 7, padding: "6px 8px", fontSize: 15 }}>✏️</div>
            <div><h2 style={{ fontSize: 14, fontWeight: 800, color: N, margin: 0 }}>학생 정보 입력</h2><p style={{ fontSize: 11, color: "#aaa", margin: 0 }}>이름, 등급, 과목별 평가를 입력하세요</p></div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 4 }}>👤 학생 이름 <span style={{ color: "red" }}>*</span></label>
            <input style={{ ...inp, fontSize: 14, fontWeight: 600 }} placeholder="예: 김주하" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <div><label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 4 }}>📊 학습 태도 등급</label>
              <select value={att} onChange={e => setAtt(e.target.value)} style={{ ...inp, fontSize: 13, fontWeight: 700, color: N }}>{GRS.map(g => <option key={g}>{g}</option>)}</select></div>
            <div><label style={{ fontSize: 11, color: "#666", display: "block", marginBottom: 4 }}>📝 과제 수행 등급</label>
              <select value={hw} onChange={e => setHw(e.target.value)} style={{ ...inp, fontSize: 13, fontWeight: 700, color: N }}>{GRS.map(g => <option key={g}>{g}</option>)}</select></div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: N }}>📋 과목별 학습 진도 평가</label>
              <span style={{ fontSize: 9, color: G, fontWeight: 600 }}>💡 진도 박스 클릭 = 학생별 수정</span>
            </div>
            <div style={{ border: "1.5px solid #e0ddd5", borderRadius: 8, overflow: "hidden" }}>
              {cats.filter(c => c.cat).map((c, i) => {
                const realIdx = cats.findIndex((cc, j) => cc === c);
                const displayCont = getContent(realIdx, c.cont);
                const isOverridden = progOverride[realIdx] !== undefined && progOverride[realIdx] !== c.cont;
                const isEditing = editIdx === realIdx;
                return (
                  <div key={realIdx} style={{ display: "grid", gridTemplateColumns: "1fr 95px", borderBottom: i < cats.filter(x => x.cat).length - 1 ? "1px solid #ece8e0" : "none", background: isOverridden ? "#fffbef" : (i % 2 === 0 ? "#fff" : "#fafaf8") }}>
                    <div style={{ padding: "8px 11px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4, flexWrap: "wrap" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: N }}>[{c.cat}]</div>
                        {isOverridden ? (
                          <span style={{ fontSize: 9, color: "#fff", background: G, borderRadius: 3, padding: "2px 6px", fontWeight: 800 }}>🧑‍🎓 개별 진도</span>
                        ) : (
                          <span style={{ fontSize: 9, color: "#999", background: "#f0f0f0", borderRadius: 3, padding: "2px 6px", fontWeight: 600 }}>반 공통</span>
                        )}
                      </div>
                      {isEditing ? (
                        <textarea
                          autoFocus
                          value={displayCont}
                          onChange={e => setProgOverride(o => ({ ...o, [realIdx]: e.target.value }))}
                          onBlur={() => setEditIdx(-1)}
                          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); setEditIdx(-1); } if (e.key === "Escape") setEditIdx(-1); }}
                          style={{ width: "100%", fontSize: 10.5, color: "#333", lineHeight: 1.5, border: `1.5px solid ${G}`, borderRadius: 4, padding: "5px 7px", outline: "none", fontFamily: "inherit", resize: "vertical", minHeight: 42, background: "#fffef5" }}
                        />
                      ) : (
                        <div onClick={() => setEditIdx(realIdx)} style={{ fontSize: 10.5, color: "#333", lineHeight: 1.5, cursor: "pointer", padding: "4px 7px", borderRadius: 4, border: "1px dashed #d4d0c8", background: "#fff", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }} onMouseEnter={e => { e.currentTarget.style.background = "#fffef5"; e.currentTarget.style.borderColor = G; }} onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#d4d0c8"; }}>
                          <span style={{ flex: 1 }}>{displayCont}</span>
                          <span style={{ color: G, fontSize: 10, fontWeight: 700, flexShrink: 0 }}>✏️ 수정</span>
                        </div>
                      )}
                      {isOverridden && !isEditing && (
                        <button onClick={() => setProgOverride(o => { const n = { ...o }; delete n[realIdx]; return n; })} style={{ marginTop: 5, fontSize: 10, background: "#fff", border: `1.5px solid ${G}`, color: G, borderRadius: 5, padding: "3px 9px", cursor: "pointer", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 3 }}>↩️ 반 공통으로 되돌리기</button>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 6, borderLeft: "1px solid #ece8e0" }}>
                      <select value={syncGrades[realIdx]} onChange={e => { const ng = [...cg]; ng[realIdx] = e.target.value; setCg(ng); }} style={{ ...gst(syncGrades[realIdx]), padding: "5px 6px", borderRadius: 6, fontSize: 12, fontWeight: 900, cursor: "pointer", outline: "none", width: "100%", textAlign: "center", border: `1.5px solid ${gcol(syncGrades[realIdx])}44`, fontFamily: "inherit" }}>
                        {GRS.map(g => <option key={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: N }}>📸 결과물 사진 <span style={{ fontWeight: 400, color: "#aaa" }}>(선택, 최대 3장)</span></label>
              <button onClick={() => fileRef.current.click()} style={{ fontSize: 10, color: G, background: "none", border: `1px solid ${G}`, borderRadius: 5, padding: "2px 7px", cursor: "pointer" }}>+ 추가</button>
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => handleFiles(e.target.files)} />
            {photos.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5 }}>
                {photos.map((p, i) => (
                  <div key={i} style={{ position: "relative", aspectRatio: "4/3", borderRadius: 6, overflow: "hidden", border: "1.5px solid #e0ddd5" }}>
                    <img src={p.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button onClick={() => setPhotos(ps => ps.filter((_, j) => j !== i))} style={{ position: "absolute", top: 3, right: 3, background: "rgba(0,0,0,0.6)", border: "none", borderRadius: "50%", width: 18, height: 18, color: "#fff", fontSize: 10, cursor: "pointer" }}>✕</button>
                  </div>
                ))}
                {photos.length < 3 && <div onClick={() => fileRef.current.click()} style={{ aspectRatio: "4/3", borderRadius: 6, border: "2px dashed #ddd", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#ccc", fontSize: 22 }}>+</div>}
              </div>
            ) : (
              <div onClick={() => fileRef.current.click()} style={{ border: "2px dashed #e0ddd5", borderRadius: 8, padding: 16, textAlign: "center", cursor: "pointer", color: "#ccc", background: "#fafaf8" }}>
                <div style={{ fontSize: 24, marginBottom: 3 }}>📷</div>
                <div style={{ fontSize: 11 }}>시험지, 과제물 사진을 업로드하면 AI가 분석합니다</div>
              </div>
            )}
          </div>
          {err && <div style={{ background: "#fff0f0", border: "1px solid #fcc", borderRadius: 7, padding: "8px 11px", color: "#c00", fontSize: 11, marginBottom: 10 }}>⚠️ {err}</div>}
          <button onClick={doGen} disabled={isG} style={{ width: "100%", padding: 13, background: isG ? "#aaa" : N, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 800, cursor: isG ? "not-allowed" : "pointer" }}>
            {isG ? "⏳ AI 분석 중... (30초~1분 소요)" : "✨ 월말 리포트 생성하기 →"}
          </button>
        </div>
      </div>
    );
  }

  // ── 리포트 뷰 ──
  if (step === "report" && rpt) {
    const d = rpt;
    const polyPoints = r => {
      const pts = [];
      for (let i = 0; i < 5; i++) {
        const a = (i * 2 * Math.PI / 5) - Math.PI / 2;
        pts.push((100 + r * Math.cos(a)) + "," + (100 + r * Math.sin(a)));
      }
      return pts.join(" ");
    };
    const { avg, grade: overall } = calcOverall(d);

    return (
      <div style={{ fontFamily: "'Malgun Gothic','Apple SD Gothic Neo',sans-serif", background: "#f0ede5", minHeight: "100vh", padding: "12px 0 32px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto 6px", display: "flex", gap: 5, padding: "0 8px", flexWrap: "wrap", alignItems: "center" }}>
          <button onClick={() => { setName(""); setAtt("A+"); setHw("A+"); setCg(cats.map(() => "A")); setPhotos([]); setProgOverride({}); setEditIdx(-1); setStep("form"); }} style={{ padding: "6px 12px", background: "#fff", border: "1.5px solid #ccc", borderRadius: 7, fontSize: 11, cursor: "pointer" }}>← 다음 학생</button>
          <button onClick={() => setStep("setup")} style={{ padding: "6px 12px", background: "#fff", border: `1.5px solid ${G}`, borderRadius: 7, fontSize: 11, color: G, cursor: "pointer" }}>반 정보 수정</button>
          <button onClick={doPrint} style={{ padding: "6px 12px", background: N, border: "none", borderRadius: 7, fontSize: 11, color: "#fff", fontWeight: 700, cursor: "pointer" }}>🖨️ HTML 저장 후 인쇄</button>
          <button onClick={doShare} style={{ padding: "6px 12px", background: G, border: "none", borderRadius: 7, fontSize: 11, color: "#fff", fontWeight: 700, cursor: "pointer" }}>📋 텍스트 복사</button>
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto 5px", padding: "0 8px" }}>
          <div style={{ background: "#f0f6ff", border: "1px solid #c5d8f5", borderRadius: 6, padding: "6px 11px", fontSize: 11, color: "#4060a0" }}>
            💡 <b>인쇄:</b> HTML 저장 → 파일 열기 → 인쇄창 자동 → PDF 또는 프린터 출력
          </div>
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto", background: "#fff", boxShadow: "0 3px 18px rgba(0,0,0,0.1)", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ background: LBG, padding: "14px 22px 12px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={LOGO_SRC} width={70} height={70} style={{ objectFit: "contain" }} />
            <div style={{ marginTop: 6, fontSize: 9, letterSpacing: 5, color: LG }}>WHARTON ENGLISH SCHOOL</div>
            <div style={{ fontSize: 8, letterSpacing: 4, color: "#a0925a", marginTop: 2 }}>MONTHLY PROGRESS REPORT</div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ background: `linear-gradient(180deg,${N},#1a3060)`, writingMode: "vertical-rl", transform: "rotate(180deg)", padding: "12px 8px", fontSize: 9, letterSpacing: 4, color: "#c8b97a", fontWeight: 700, minWidth: 30 }}>REPORT CARD</div>
            <div style={{ flex: 1, padding: "12px 16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", background: `linear-gradient(135deg,${N},#1a3060)`, borderRadius: 5, marginBottom: 9, overflow: "hidden" }}>
                {[["Name", d.name], ["Class", d.cls], ["Teacher", d.tchr], ["Month", d.month]].map(([k, v]) => (
                  <div key={k} style={{ padding: "7px 11px", borderRight: "1px solid #2a4070" }}>
                    <div style={{ fontSize: 8, color: G, letterSpacing: 1 }}>{k}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginTop: 1 }}>{v}</div>
                  </div>
                ))}
              </div>
              <SH t="학습진도평가" e="📚" />
              <div style={{ border: "1px solid #ddd", borderTop: "none", borderRadius: "0 0 6px 6px", overflow: "hidden", marginBottom: 9 }}>
                {d.cats.map((c, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "110px 1fr 48px", borderBottom: i < d.cats.length - 1 ? "1px solid #eee" : "none", background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
                    <div style={{ padding: "7px 10px", fontSize: 10, fontWeight: 700, color: N, borderRight: `2px solid ${G}`, display: "flex", alignItems: "center" }}>[{c.cat}]</div>
                    <div style={{ padding: "7px 10px", fontSize: 11, color: "#333", lineHeight: 1.6 }}>{c.cont}</div>
                    <div style={{ ...gst(c.grade || "A"), display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid #eee" }}><span style={{ fontSize: 12, fontWeight: 900 }}>{c.grade || "A"}</span></div>
                  </div>
                ))}
              </div>
              <SH t="학습 분석 리포트" e="🔍" />
              <div style={{ border: "1px solid #ddd", borderTop: "none", borderRadius: "0 0 6px 6px", overflow: "hidden", marginBottom: 9 }}>
                {d.anal.map((it, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 42px", borderBottom: i < d.anal.length - 1 ? "1px solid #eee" : "none", background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
                    <div style={{ padding: "8px 11px", borderRight: `2px solid ${G}` }}>
                      <div style={{ fontSize: 9, color: G, fontWeight: 700, marginBottom: 2 }}>{it.label}</div>
                      <div style={{ fontSize: 11, color: "#333", lineHeight: 1.5 }}>{it.detail}</div>
                    </div>
                    <div style={{ background: N, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontWeight: 900, fontSize: 12 }}>{it.grade}</span></div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#eef1f8", border: "1px solid #c8d4ea", borderRadius: 7, padding: "10px 14px", marginBottom: 9 }}>
                <div style={{ fontSize: 9, color: N, fontWeight: 700, marginBottom: 8 }}>📊 학습 성취도</div>
                <div style={{ display: "flex", gap: 18, alignItems: "stretch" }}>
                  <svg viewBox="0 0 200 200" width="130" style={{ display: "block", flexShrink: 0 }}>
                    {[60, 45, 30, 15].map(r => <polygon key={r} points={polyPoints(r)} fill="none" stroke="#c8d4ea" strokeWidth="1" />)}
                    <polygon points={polyPoints(60 * avg)} fill="rgba(196,168,79,0.22)" stroke={G} strokeWidth="2" />
                    {[["종합", 100, 22], ["참여", 175, 82], ["성취", 148, 168], ["과제", 52, 168], ["태도", 25, 82]].map(([l, x, y]) => (
                      <text key={l} x={x} y={y} textAnchor="middle" fontSize="11" fill={N} fontFamily="Malgun Gothic,sans-serif">{l}</text>
                    ))}
                    <text x="100" y="110" textAnchor="middle" fontSize="14" fontWeight="900" fill={G} fontFamily="Malgun Gothic,sans-serif">{overall}</text>
                  </svg>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <div style={{ background: "#fff", border: "1px solid #d8e0ee", borderRadius: 6, padding: "8px 10px", textAlign: "center" }}>
                        <div style={{ fontSize: 9, color: "#666", marginBottom: 3 }}>학습태도</div>
                        <div style={{ fontSize: 26, fontWeight: 900, color: gcol(d.att), lineHeight: 1 }}>{d.att}</div>
                      </div>
                      <div style={{ background: "#fff", border: "1px solid #d8e0ee", borderRadius: 6, padding: "8px 10px", textAlign: "center" }}>
                        <div style={{ fontSize: 9, color: "#666", marginBottom: 3 }}>과제수행</div>
                        <div style={{ fontSize: 26, fontWeight: 900, color: gcol(d.hw), lineHeight: 1 }}>{d.hw}</div>
                      </div>
                    </div>
                    <div style={{ background: "#fff", border: `1px solid ${G}`, borderLeft: `3px solid ${G}`, borderRadius: 4, padding: "7px 10px", fontSize: 10.5, color: "#444", lineHeight: 1.55 }}>
                      <span style={{ color: G, fontWeight: 700, marginRight: 4 }}>💬</span>
                      종합 평가 <b style={{ color: N }}>{overall}</b>, <b style={{ color: N }}>{avg >= .85 ? "우수한" : avg >= .7 ? "양호한" : avg >= .55 ? "안정적인" : "성장 중인"}</b> {avg >= .85 ? "학습 성취를 보이고 있어 매우 인상적입니다." : avg >= .7 ? "수준으로 꾸준한 학습 습관이 잘 형성되어 있습니다." : avg >= .55 ? "단계로 점진적 향상이 기대됩니다." : "단계로 앞으로의 발전이 더욱 기대됩니다."}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ background: `linear-gradient(135deg,${N},#1a3060)`, padding: "7px 13px", borderRadius: "6px 6px 0 0" }}>
                <span style={{ fontSize: 9, letterSpacing: 2, color: G, fontWeight: 700 }}>✍️ TEACHER'S COMMENTS AND FEEDBACK</span>
              </div>
              <div style={{ border: "1px solid #ddd", borderTop: "none", padding: "12px 14px", marginBottom: 10, background: "#fffef8", borderRadius: "0 0 6px 6px" }}>
                <textarea value={cmt} onChange={e => { if (e.target.value.length <= 500) setCmt(e.target.value); }} style={{ width: "100%", fontSize: 12, lineHeight: 1.9, color: "#222", fontFamily: "'Malgun Gothic',sans-serif", border: "none", outline: "none", resize: "none", background: "transparent", minHeight: 148, padding: 0, boxSizing: "border-box" }} />
                <div style={{ textAlign: "right", fontSize: 10, marginTop: 3, color: cmt.length < 400 ? "#c00" : cmt.length > 480 ? "#e67e00" : "#2e7d32", fontWeight: 600 }}>
                  {cmt.length < 400 ? `⚠️ ${cmt.length}/500자 (400자 이상 필요)` : `✓ ${cmt.length}/500자`}
                </div>
              </div>
              {d.photos.length > 0 && (
                <div style={{ marginTop: 12, borderTop: `2px solid ${N}`, paddingTop: 10 }}>
                  <div style={{ background: `linear-gradient(135deg,${N},#1a3060)`, padding: "7px 13px", borderRadius: "6px 6px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: G, fontSize: 10, fontWeight: 700 }}>📸 첨부 결과물 분석</span>
                    <span style={{ color: "#888", fontSize: 9 }}>✏️ 클릭하여 수정 가능</span>
                  </div>
                  <div style={{ border: "1px solid #ddd", borderTop: "none", padding: 10, borderRadius: "0 0 6px 6px", background: "#fffef8" }}>
                    {d.photos.length > 0 && <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(d.photos.length, 3)},1fr)`, gap: 5, marginBottom: 8 }}>
                      {d.photos.map((p, i) => <img key={i} src={p.url} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 4, border: "1px solid #e0ddd5" }} />)}
                    </div>}
                    <textarea value={paEdit} onChange={e => setPaEdit(e.target.value)} style={{ width: "100%", fontSize: 11, lineHeight: 1.7, color: "#333", fontFamily: "'Malgun Gothic',sans-serif", border: "none", outline: "none", resize: "vertical", background: "transparent", minHeight: 90, padding: 0, boxSizing: "border-box", borderTop: d.photos.length ? "1px solid #ece8e0" : "none", paddingTop: d.photos.length ? 7 : 0 }} />
                  </div>
                </div>
              )}
              <div style={{ borderTop: "1px solid #ddd", paddingTop: 8, display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: LBG, padding: "3px 9px", borderRadius: 5 }}>
                  <img src={LOGO_SRC} width={20} height={20} style={{ objectFit: "contain" }} />
                  <span style={{ fontSize: 9, color: LG, fontWeight: 700 }}>와튼영어스쿨</span>
                </div>
                <span style={{ fontSize: 8, color: "#ccc" }}>WHARTON ENGLISH SCHOOL — MONTHLY PROGRESS REPORT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
