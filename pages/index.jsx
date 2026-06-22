import { useState, useRef, useCallback } from "react";

const G="#c4a84f",N="#0f1f42",LBG="#0a1530",LG="#c4b28a";
const LOGO_SRC="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAB4AHgDASIAAhEBAxEB/8QAGwAAAwEBAQEBAAAAAAAAAAAAAAQFAwIBBgf/xAA6EAACAQMDAgMGAwUIAwAAAAABAgMABBEFEiETMUFRYQYUIjJxkRWBoSNCUrHBBxYkVWJy0uGTsvD/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAHBEBAQEBAQEBAQEAAAAAAAAAAAERITECQRJh/9oADAMBAAIRAxEAPwD82ooooCiiigKK3s7V7y4WKPjPdj2UedUZzpdiej7o11IvDM8xXB+ijA+5qauI45pk2M4mEZC5IzncMDz5poXWmfMLKaNvIShl/Vc/rR7zMZVkS0boKpXbt4wfXGKaJroyOyMMMpwRXlUzc6b3aymZv4RKqD9FzWkM2k3LdOSyNtngOtw39QR/KmmJFFNahZPYz7GJZDyjYxkfTwPpStVBRRRQFFFFAUUVrbW8t1cJBCheRzhQKDMAsQACSewFO2+lXUtzFDJG1uJDgPMpVR65pxr6HST0NO2yTDiW68WP8KHwX17mnLG8uncQztG4mjMmBkFBtLAnzHHPl5g1m2rI9/wmlRMljOlxLbMks8mRhxnG1fQZH39KVaKDUGWx013l3vvBlUKIVGSST49+T6CmodZSLT0vGtLKeRZekwkjG/tkNkd/I+o9aJb5W06S9uh031Kbpt0FGViQDIXPmcVnrRR9QtNLPS0uKOaVeGu5l3En/Qp4Apc+0Orlt34hOD5BsD7VUvfZyyt9IbUI7qeVNgZQEX97sTz286z0PQbHV7Yst3NHKmFdSi9z5c9u/wBqu/OamXwqmsxXuItYt0mU8e8RqFlT144P0NaNbQaduguJ2FtcDfFcxJuEqYxgjwP8jS9lp1rc621iXuVUvsU7FyCO+7nsMGqNpPALW6gspHm9wIu4GmQdwcOMA/KRg0v+Ee9Wy1CNlvJBDbTydO3ckboti8MfQ5wf+qkXmkXFveNBAPewACHgUsCD9KsHXEurS5uzZWEMkW1VxGGdmbx58Bgn7VzNd3Jit4oGRGliEoZ8kuTk4Hhxjk+fkMVJsW5XzTo0blXUqw7gjBFc1ZTVIr/Fvqq5jPCTjl4T/Mr6H8qnXtnLZXLQy4JHKspyrqezA+INblZL0UUVUP6TYC9uP2m/pLjIT5nJ7Kvqf0AJ8Kt/itppxaK1jsEOCrBIWl48QZCRn8hipeg3Crde7yOIlmSSNZD2V2XaCf5fmabk0x7XT7gX1mtukcXwSt8zy542nPxAjP0FYvvWp5x4LnRNQYx3Vr7hKeBNbElPzU1ne2ep2VuIEuurYSjEckb/ALNx5Z8Poah1S0e+uYLgW8csQhnIV0uBmI58SP61cxNYQWyJLKt6JIyi52cKzfeqes2/R0WyRW3LbTTQscYOSQwyPA4P6VSvVewWRWi6SxxdSJknLxtkgAJlSy8nwNIWscqRTWeqxNbW96Q0crDiOQdj+fY1N3q5+Kns1Kl7pgspH3K6PA4PdSclPrxu59BWGixjSY0SVf8AF3MzFB5CPP8A7HcKnaT1dF15Le9UxK5CsfDvlWB8RnHPlmuPaDU2n9oGuIWG23YLER2+E9/vmpnV3i3qdrFYXup6nv6cc8AEDAZy7jnH5A/eons5GWbUHJCp7q0ZY9gXIUfzpz2ku/xBtOsrANIvTEgReTubsPyFcS2k1vY/hdjH7xc7hLeMgBVSPlT1xzn1pPC+pV5axI6x23VaQsyGNsFsjxwO3jx6U5p9pq1xG1nDM0duuerufCRDxyfD6VT0/rXiwosLySyF0lXrGMR7cZ3nG7GCPH0qVrt5cLM2niW3FrCeI7XiPP8AMn61dt4mfphn0PTMJHEdUuB3dztiB9B40wutWt0iQ3EenhFGFRrZgijyDA5H2r5er1jYG40uI2loLt3LrPtGXQ/u454Hjn60sn6SldZ09LVxLArLExwULbthxkYb95SOQfH8qK11p/doraw3K8kMISYg5AbcWAz6Zx+ZorU8So1dM7MAGYnHbJ7VzRVQUUUUFbSdQChLO6YNbdQOu88I39AfGu9XeaF7iOVMtM+5nZuSM5GV8CO2fLtUanrfWNQtohFFcv0x2VgGA+mc4rOLpiy1W493FtcWyX9snypIpJT/AGsORXXvOhk5Om3St/ALjj9Rml21rUHPx3UjL/DuIX7DFNe9wm4R2ljMuw/tdpwOR38c4z+lMUTatJbwNHp9kunxuMGRQTIw/wB5/pS+nNLOnu0a/Fv3q4cgqSAM4HJPHGOa8Os3yOeldSKuewY4P5EmvJdb1GWMxtdOFPBCALn64Apiad1rUdklxbWx2dZ905XxOPl49e/r9KhUUVZMLdFeq7IcqxU+hxXlFVBRRRQFFFFBVt4oJtAupFgT3m3dMvk5KNkds4yDimJdMhhfTHRRIspMU4YnAcH4vsCPtSuh3kNpcTi6GYJYWVl8yOV/UD71ra6kg0q+inOZ2fqwn/UwKt+hrN1rjS1jt7uy1SWKwQvEUMKrvJAZsefPFZvapD7OtNLZhLjriIOwYHaVJzjOM1zp0sUekajG1ykcswQRqd2TtbJ7Cullik9njbvdxidrkShWLcLtI749ag50/T4rnTLtmB962GSAeYTG/wDQ/oaNIhhls9QaS3SV4YuohO7OdwHge3NMQX6WOqWawz20ltEFUv0/D98EkZ5Jb717avaWbaosF/GFmj2QMNwPzAjw44FOjO5isbVdPuJrbDyxO0tsHOM8hD3yAe9esbKCy0y5msYmW4MnWClhwrY45rHU57fUbeO86qpfY2zxkH9oR2ccYyR3ov2gbRdPhjuYnlt+pvRd2fibIxxQF3FDpcNqhgjmnmiEzmTJChuygA+Xc+tMpaWcV9YzNbiWzvY9/TZjlCM7gCD5jjPnS13LFqkNo/XjhnhiEMiyEgEL2YHHl3HpTAvLWW8sYRcLHa2URTqup+MnOSABnufsKDg2UFnqGDCl1ZzxNLA7EjICkjsRyCMEVFY7mJAC5OcDsKsWF/FDa3FjdMHRVdreRc/C5UjA9Gz98VGrUSiiiiqgoopnT7GfUbtLa3UF2yck4AA7k0C1er8wz2qxN7PTxm3MdxbzwzSiHqxNuVWPgaxj0WaTW20tZI+qpI3nO3gZqbFymZJ7IyyCUoylnZSuDxtwF4A7848iBWbm3YoxnhYiRWI4ACAngDHkRxWp9m2BIOo2QI9W/wCNJppE8urfh9vJFNJ/GpO3GMk5I8KzxemBNZjomXYx3R/CpGFAJ57dvMVlbSRi0jHUijmAYJnBGc9zxwccfbtimW9l7t0D2U1vepu2sYn+U+uaVutFubfV001WSWd9uCvA5GfGrw60Sa1wQCiz7VxIcFd2089uOfHzxWiz2u9cvB0+OoNvzPkfEOO3/fnWWo6FPY23vAnguIlfpuYWzsbyNL6tpsml3fu8siO2wPlc45+tOU6TkXZIy7lbHipyK5p6HTJp9KuL9WTpQMFZTnJzjt96Vt4uvcRxb1TewXc3YZ8TV1lnRV3+7bf5jZfd/wDjSGraXLpVwkM0kbl0DgpnGCT5/SmyrlI0UUVUFVPZ7UItN1LqXAboyRtG5XuoPjUum9PvmsJWkWC3m3LtxMm4D1FS9ix9SUt9Gez0iKR5pZruOdmZcBVyMD68UNJbJ7YvLAFjmh3mbry7VckY+Hg+dS/72XTXCTSWlkzqR8XS+LA8ASeKVh1totfbVegpZmZunu4GRjvWP5rWx9eb5CT/AI6Meg1M/wDGoEl49n7VJc2+28MyhSkc3VLZG0jdjvxSjavprsWbQ4SSck9d6S/EBDqkd7Y26W3TIKxglhkd+/nSfJa+wS1Nram0tNNt9kj9R4rq6UtnwwAfCl0lEv8AaDEzRyRkJtAkXBzsNRpNZ02aVp5tEjaZjuYidgpPnik7zWbq51VdQBWKVMbAg4UDsPWk+abFvTWgj0HV2vo3lhFyu5EbaSc+f2rP2oS3k9po1u5WhgMK7nVdxHB8Kl6hrt3qEAhkWGKLfvZYk2728z513d64brVlvmtIGKxhOlIN6njGasl3U2eKCe0NjaxiwtrEvpxBEvUP7SQnx9P/ALtSUP4bFrVo9jJNLExziRum0bZ4+IeXBzXv94R/lOmf+D/usH1jff2l0LO2hNuwbbAuwPznmmGvtlmQxOXvJA4+VRfOQfqdvFfL+2LE3tuJI9svSzu6u8MuePAev3ph/bFnYsbSYZ8Fu3A+2Ki6xqY1SdJek0ZVdp3Slyec9zU+fmyrbMT6KKK6MCiiigKKKKAooooCiiigKKKKAooooCiiigKKKKD/2Q==";
const CATS=["고난도 독해","국제반 수능 엔솔로지","내신","모의고사","문법트레이닝","서술형대비","수능형독해","독해/중등독해","영어논술","원어민","클래스 무비","토셀/토플","파닉스","LT"];
const GRS=["A+","A","A-","B+","B","B-","C+","C","C-","D"];
const EXAM_GRS=["A","B","C","D","E"];
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
        let w = i.width, h = i.height, M = 480;
        if (w > M) { h = h * M / w; w = M; }
        if (h > M) { w = w * M / h; h = M; }
        c.width = w; c.height = h;
        c.getContext("2d").drawImage(i, 0, 0, w, h);
        r({ name: f.name, url: c.toDataURL("image/jpeg", 0.45), type: "image/jpeg" });
      };
      i.src = e.target.result;
    };
    rd.readAsDataURL(f);
  });
}

// 학생별 코멘트 이력 관리 (localStorage 활용, 최대 6개월 보관)
const CMT_HISTORY_KEY = "wharton_cmt_history";
function getCmtHistory(studentName) {
  if (!studentName || typeof window === "undefined") return [];
  try {
    const all = JSON.parse(localStorage.getItem(CMT_HISTORY_KEY) || "{}");
    const list = all[studentName.trim()] || [];
    return list.slice(-6); // 최근 6개월만 사용
  } catch { return []; }
}
function saveCmtHistory(studentName, month, comment) {
  if (!studentName || !comment || typeof window === "undefined") return;
  try {
    const all = JSON.parse(localStorage.getItem(CMT_HISTORY_KEY) || "{}");
    const key = studentName.trim();
    const list = all[key] || [];
    // 같은 월이 이미 있으면 교체, 아니면 추가
    const existIdx = list.findIndex(item => item.month === month);
    if (existIdx >= 0) list[existIdx] = { month, comment };
    else list.push({ month, comment });
    // 최근 12개월만 저장 (그 이상은 자동 삭제)
    all[key] = list.slice(-12);
    localStorage.setItem(CMT_HISTORY_KEY, JSON.stringify(all));
  } catch (e) { console.warn("코멘트 이력 저장 실패:", e); }
}

// 월간 성취도 모의고사 등급 이력 관리 (추이 그래프용)
const EXAM_HISTORY_KEY = "wharton_exam_history";
function getExamHistory(studentName) {
  if (!studentName || typeof window === "undefined") return [];
  try {
    const all = JSON.parse(localStorage.getItem(EXAM_HISTORY_KEY) || "{}");
    return all[studentName.trim()] || [];
  } catch { return []; }
}
function saveExamHistory(studentName, month, grade) {
  if (!studentName || !grade || typeof window === "undefined") return;
  try {
    const all = JSON.parse(localStorage.getItem(EXAM_HISTORY_KEY) || "{}");
    const key = studentName.trim();
    const list = all[key] || [];
    // 같은 월이 이미 있으면 교체, 아니면 추가
    const existIdx = list.findIndex(item => item.month === month);
    if (existIdx >= 0) list[existIdx] = { month, grade };
    else list.push({ month, grade });
    // 최근 12개월만 저장
    all[key] = list.slice(-12);
    localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(all));
  } catch (e) { console.warn("시험 이력 저장 실패:", e); }
}
// 시험 등급(A~E) → 숫자 변환 (그래프 y축용, A=5 ~ E=1)
const examG2n = g => ({ "A": 5, "B": 4, "C": 3, "D": 2, "E": 1 }[g] || 3);

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

  // 시험 결과 블록 (월간 모의고사 / 승반고사)
  const examGcol = g => g === "A" ? "#2e7d32" : g === "B" ? "#1565c0" : g === "C" ? "#f57f17" : "#c62828";
  const examGbg = g => g === "A" ? "#e8f5e9" : g === "B" ? "#e3f2fd" : g === "C" ? "#fff8e1" : "#fce4ec";
  let examBlock = "";
  if (d.exam1On || d.exam2On) {
    let rows = "";
    if (d.exam1On) {
      // 추이 그래프 SVG (2회 이상)
      let trendSVG = "";
      if (d.examTrend && d.examTrend.length >= 2) {
        const trend = d.examTrend.slice(-8);
        const W = 460, H = 130, padL = 30, padR = 14, padT = 14, padB = 26;
        const plotW = W - padL - padR, plotH = H - padT - padB;
        const nn = trend.length;
        const xAt = i => padL + (nn === 1 ? plotW / 2 : (plotW * i / (nn - 1)));
        const eg2n = g => ({ "A": 5, "B": 4, "C": 3, "D": 2, "E": 1 }[g] || 3);
        const yAt = g => padT + plotH - ((eg2n(g) - 1) / 4) * plotH;
        const gColor = g => g === "A" ? "#2e7d32" : g === "B" ? "#1565c0" : g === "C" ? "#f57f17" : g === "D" ? "#e65100" : "#c62828";
        const linePts = trend.map((t, i) => `${xAt(i)},${yAt(t.grade)}`).join(" ");
        const grid = ["A", "B", "C", "D", "E"].map(g => `<line x1="${padL}" y1="${yAt(g)}" x2="${W - padR}" y2="${yAt(g)}" stroke="#e8e8e8" stroke-width="1"/><text x="${padL - 6}" y="${yAt(g) + 3}" text-anchor="end" font-size="9" fill="#999" font-family="Malgun Gothic,sans-serif">${g}</text>`).join("");
        const dots = trend.map((t, i) => `<circle cx="${xAt(i)}" cy="${yAt(t.grade)}" r="4" fill="${gColor(t.grade)}" stroke="#fff" stroke-width="1.5"/><text x="${xAt(i)}" y="${yAt(t.grade) - 8}" text-anchor="middle" font-size="9" font-weight="700" fill="${gColor(t.grade)}" font-family="Malgun Gothic,sans-serif">${t.grade}</text><text x="${xAt(i)}" y="${H - 8}" text-anchor="middle" font-size="8" fill="#888" font-family="Malgun Gothic,sans-serif">${t.month.replace(/^\d+년\s*/, "")}</text>`).join("");
        trendSVG = `<div style="margin-top:10px;background:#fafbff;border:1px solid #e0ddd5;border-radius:6px;padding:8px 10px;"><div style="font-size:9px;color:${G};font-weight:700;margin-bottom:4px;">📈 월간 모의고사 성적 추이 (최근 ${trend.length}회)</div><svg viewBox="0 0 ${W} ${H}" style="width:100%;display:block;">${grid}<polyline points="${linePts}" fill="none" stroke="${G}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg></div>`;
      }
      rows += `<div style="padding:10px 12px;${d.exam2On ? "border-bottom:1px solid #eee;" : ""}background:#fff;"><div style="margin-bottom:5px;"><span style="font-size:11px;font-weight:700;color:${N};margin-right:8px;">📊 월간 성취도 모의고사</span><span style="background:${examGbg(d.exam1Grade)};color:${examGcol(d.exam1Grade)};font-weight:900;font-size:13px;padding:2px 12px;border-radius:5px;">${d.exam1Grade}등급</span></div>${d.exam1Comment ? `<div style="font-size:11px;color:#1a1a1a;line-height:1.6;font-weight:500;">${d.exam1Comment}</div>` : ""}${trendSVG}</div>`;
    }
    if (d.exam2On) {
      rows += `<div style="padding:10px 12px;background:#fff;"><div style="margin-bottom:5px;"><span style="font-size:11px;font-weight:700;color:${N};margin-right:8px;">🎯 승반고사</span><span style="background:${examGbg(d.exam2Grade)};color:${examGcol(d.exam2Grade)};font-weight:900;font-size:13px;padding:2px 12px;border-radius:5px;">${d.exam2Grade}등급</span></div>${d.exam2Comment ? `<div style="font-size:11px;color:#1a1a1a;line-height:1.6;font-weight:500;">${d.exam2Comment}</div>` : ""}</div>`;
    }
    examBlock = `${SH("시험 결과","📝")}<div style="border:1px solid #ddd;border-top:none;margin-bottom:10px;border-radius:0 0 6px 6px;overflow:hidden;">${rows}</div>`;
  }

  return `<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><title>와튼_${d.name}_${d.month}</title><style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Malgun Gothic','Apple SD Gothic Neo',Arial,sans-serif;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;color-adjust:exact;}table{border-collapse:collapse;width:100%;}.no-break{page-break-inside:avoid;break-inside:avoid;}@media print{@page{margin:8mm;size:A4;}body{padding:0;}.main-card{page-break-after:auto;}.photo-section{page-break-before:auto;}}</style></head><body><div style="max-width:780px;margin:0 auto;"><div style="background:${LBG};padding:14px 28px 12px;text-align:center;"><div style="font-size:14px;letter-spacing:5px;color:${LG};font-weight:700;">WHARTON ENGLISH SCHOOL</div><div style="font-size:11px;letter-spacing:4px;color:#a0925a;margin-top:3px;">MONTHLY PROGRESS REPORT</div></div><table class="main-card"><tr><td style="background:linear-gradient(180deg,${N},#1a3060);width:32px;text-align:center;vertical-align:middle;"><div style="writing-mode:vertical-rl;transform:rotate(180deg);font-size:9px;letter-spacing:4px;color:${G};font-weight:700;padding:14px 0;">REPORT CARD</div></td><td style="padding:12px 18px;vertical-align:top;"><table style="border:2px solid ${N};border-radius:6px;overflow:hidden;margin-bottom:10px;"><tr style="background:linear-gradient(135deg,${N},#1a3060);">${[["Name",d.name],["Class",d.cls],["Teacher",d.tchr],["Month",d.month]].map(([k,v]) => `<td style="padding:7px 12px;border-right:1px solid #2a4070;"><div style="font-size:8px;color:${G};letter-spacing:1px;">${k}</div><div style="font-size:12px;font-weight:700;color:#fff;">${v}</div></td>`).join("")}</tr></table>${cu}${SH("학습진도평가","📚")}<table style="border:1px solid #ddd;border-top:none;margin-bottom:10px;border-radius:0 0 6px 6px;overflow:hidden;">${cr}</table>${SH("학습 분석 리포트","🔍")}<table style="border:1px solid #ddd;border-top:none;margin-bottom:10px;border-radius:0 0 6px 6px;overflow:hidden;">${ar}</table>${examBlock}${achievementBlock}<div class="no-break"><div style="background:linear-gradient(135deg,${N},#1a3060);padding:8px 14px;border-radius:6px 6px 0 0;"><span style="font-size:9px;letter-spacing:3px;color:${G};font-weight:700;">✍️ TEACHER'S COMMENTS AND FEEDBACK</span></div><div style="border:1px solid #ddd;border-top:none;padding:14px 16px;border-radius:0 0 6px 6px;background:#fffef8;"><div style="font-size:11.5px;line-height:2.0;color:#222;white-space:pre-line;">${d.cmt}</div></div></div></td></tr></table>${ps}<div style="max-width:780px;margin:14px auto 0;padding:8px 18px 0;border-top:1px solid #eee;display:flex;justify-content:space-between;align-items:center;"><div style="background:${LBG};padding:4px 10px;border-radius:6px;"><span style="font-size:9px;color:${LG};font-weight:700;">와튼영어스쿨</span></div><span style="font-size:8px;color:#ccc;">WHARTON ENGLISH SCHOOL — MONTHLY PROGRESS REPORT</span></div></div><script>window.addEventListener("load",function(){setTimeout(function(){window.print();},700);});<\/script></body></html>`;
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
  const [cmtKeywords, setCmtKeywords] = useState(""); // 선생님이 입력하는 코멘트 키워드 (선택)
  // 시험 섹션 - 단일 선택 ("none" | "exam1"=월간모의고사 | "exam2"=승반고사)
  const [examType, setExamType] = useState("none");
  const [exam1Grade, setExam1Grade] = useState("A");
  const [exam1Fb, setExam1Fb] = useState(""); // 월간 모의고사 선생님 피드백 멘트
  const [exam2Grade, setExam2Grade] = useState("A");
  const [exam2Fb, setExam2Fb] = useState(""); // 승반고사 선생님 피드백 멘트
  const exam1On = examType === "exam1";
  const exam2On = examType === "exam2";
  const [rpt, setRpt] = useState(null);
  const [err, setErr] = useState("");
  const [cmt, setCmt] = useState("");
  const [paEdit, setPaEdit] = useState(""); // 사진 분석 편집용
  const [analEdit, setAnalEdit] = useState([]); // 학습 분석 리포트 편집용
  const [reportPhotos, setReportPhotos] = useState([]); // 리포트 화면에 표시할 사진 (분석은 유지하고 사진만 삭제 가능)
  const [exam1CmtEdit, setExam1CmtEdit] = useState(""); // 월간 모의고사 코멘트 편집
  const [exam2CmtEdit, setExam2CmtEdit] = useState(""); // 승반고사 코멘트 편집
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
      ? "당신은 시험·과제 분석 전문가입니다. " + first + " 학생의 학습물을 보고 아래 형식으로 분석을 작성하세요.\\n\\n[필수 어조 - 매우 중요]\\n모든 문장을 반드시 '~입니다', '~합니다', '~됩니다', '~보입니다' 같은 격식체(하십시오체)로 작성합니다.\\n절대 금지: '~해요', '~예요', '~이에요', '~네요', '~군요', '~돼요' 같은 해요체 어미 사용 금지.\\n\\n[작성 형식 - 정확히 이 순서, 4~5문장, 250자 내외]\\n① 무엇을 시험·학습한 자료인지 (예: 'be동사 의문문과 현재진행형 작문을 다룬 학습 내용입니다.') - 1문장\\n② 잘한 부분/이해한 개념 - 구체적 문법 용어로 (예: '명사+be동사 일치는 안정적으로 처리하고 있습니다.') - 1~2문장\\n③ 약한 부분/보강 필요 개념 - 구체적 진단 (예: '복수 주어와 be동사 활용에서 일부 혼동이 보입니다.') - 1~2문장\\n④ 격려·응원 한마디 (예: '꾸준한 연습으로 충분히 극복할 수 있는 부분이므로 함께 다져나가겠습니다.') - 1문장\\n\\n[절대 금지 - 한 단어라도 들어가면 안 됨]\\n사진, 첨부, 노트, 필기, 문제지, 활동지, 시험지, 과제물, 자료에는, 자료를 보면, 첨부 자료, 첨부된\\n빨간, 빨간색, 빨간 펜, 빨간펜, 빨간 원, 빨간색 원, 동그라미, 체크, 체크되어, 표시되어, 표시한, 채점\\n복습 흔적, 학습 흔적, 흔적, 표시되어 있, 정리한 흔적, 정리해놓은\\n학생이 ~한, 스스로 표시, 스스로 체크, 자기주도\\n다음 달, 다음 학습, 향후, 앞으로 배울, 앞으로 학습할, 다음에 배울, 다음에 학습할, 다음 단원, 다음 챕터\\n\\n자료의 외관·표시·채점에 대해서는 한 글자도 쓰지 않으며, 다음 달이나 앞으로 배울 내용에 대해서도 절대 언급하지 않습니다. 오직 현재 학습한 내용과 이해도만 분석하며, 반드시 격식체(~입니다)로 작성합니다."
      : "";

    // 학생 이전 코멘트 이력 가져오기 (중복 방지용)
    const cmtHistory = getCmtHistory(name);
    const hasHistory = cmtHistory.length > 0;
    const hasKeywords = cmtKeywords.trim().length > 0;

    let commentsInst = "매우중요: 반드시 한글 400자 이상 500자 이내(공백포함). 400자 미만 금지. (1)첫문장: '" + first + "는 이번 달에...' 또는 '" + first + "이는 이번 달에...' (성 제외, '학생' 단어 금지) (2)손편지처럼 친근하고 따뜻하게 (3)학습 성취 구체적 칭찬 (과목명·진도내용 활용) (4)수업 태도·참여도 1~2문장 (5)생활·인성 긍정적 면모 1문장 (6)" + (hasKeywords ? "선생님이 제공한 키워드가 부정적·아쉬운 내용이면 '~하면 좋을 것 같습니다', '~하면 더 좋겠습니다' 같은 부드러운 제안형으로 1~2문장 포함 (단, 단정적 비판·~지만·~했어야 등은 금지)" : "아쉬운 점·부정 표현·~지만·~했으면 등 직접 언급 절대 금지") + " (7)응원·기대로 마무리 (8)마지막 줄에 줄바꿈 후 '" + tchr + " 선생님 드림' (9)글자수 400~500자 엄수";

    // 선생님이 입력한 키워드가 있으면 반영 지침 추가
    if (hasKeywords) {
      commentsInst += " (10)★매우중요★ 선생님이 제공한 다음 키워드를 반드시 코멘트에 자연스럽게 녹여서 작성: [" + cmtKeywords.trim().replace(/"/g, "'") + "] - 부정적·아쉬운 키워드(예: 집중력 떨어짐, 숙제 미흡, 산만함, 지각 등)가 있어도 절대 직접적·단정적으로 비판하지 말고, '현재 상태를 부드럽게 인정하면서 개선 방향을 따뜻하게 제안하는' 방식으로 작성. 변환 예시: '집중력이 떨어진다' 키워드 → '집중하는 시간을 조금씩 늘려가면 더 좋을 것 같습니다' / '숙제를 자주 안 한다' 키워드 → '숙제를 조금 더 꼼꼼히 챙기는 습관을 들이면 좋겠습니다' / '발표를 어려워한다' 키워드 → '발표 시간에 자신감을 조금씩 키워가면 더 멋질 것 같습니다' / '단어 시험을 잘 못한다' 키워드 → '단어 암기를 매일 조금씩 꾸준히 해보면 큰 도움이 될 것 같습니다' / '산만하다' 키워드 → '수업 시간 집중도를 한 단계 더 끌어올리면 실력이 더욱 빛날 것 같습니다'. 핵심 원칙: ① 현재의 부족함을 부드럽게 인정 ② '~하면 좋을 것 같습니다', '~하면 더 ~할 것 같습니다' 같은 제안형 어미 사용 ③ 비난·단정·부정 표현 금지 ④ 학부모가 읽었을 때 따뜻하면서도 솔직하게 느껴지는 톤. 긍정적 키워드(예: 발표 자신감, 친구들과 잘 어울림 등)는 그대로 칭찬으로 자연스럽게 녹여 표현.";
    }

    // 이전 코멘트 이력이 있으면 중복 방지 지침 추가
    if (hasHistory) {
      commentsInst += " (11)★매우중요★ 이 학생에게 이전 달에 작성된 코멘트와 표현·문장구조·칭찬 포인트가 절대 겹치지 않게 완전히 새로운 표현으로 작성. 같은 단어·구문 반복 금지. 이전 코멘트:\\n" + cmtHistory.map(h => "[" + h.month + "] " + h.comment.slice(0, 200)).join("\\n") + "\\n이전 코멘트의 어떤 문장도 비슷하게 쓰지 말고, 새로운 시각과 표현으로 작성.";
    }

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
    // 시험 정보 추가
    if (exam1On) {
      promptParts.push("\n[월간 성취도 모의고사] 등급: " + exam1Grade + "등급" + (exam1Fb.trim() ? " / 선생님 피드백: " + exam1Fb.trim() : ""));
    }
    if (exam2On) {
      promptParts.push("\n[승반고사] 등급: " + exam2Grade + "등급" + (exam2Fb.trim() ? " / 선생님 피드백: " + exam2Fb.trim() : ""));
    }
    promptParts.push("");
    // 학생의 전체 등급 평균을 계산해서 분석 등급 자동 매칭 (A+ 학생에게 B+ 발전영역 나오는 문제 방지)
    const allGrades = [g2n(att), g2n(hw), ...cwg.map(c => g2n(c.grade))];
    const avgGrade = allGrades.reduce((s, v) => s + v, 0) / allGrades.length;
    const strengthGrade = n2g(Math.min(1, avgGrade + 0.05)); // 강점은 평균보다 약간 위
    const growthGrade = n2g(Math.max(0.1, avgGrade - 0.1));  // 발전영역은 평균보다 약간 아래 (단, 너무 떨어지지 않게)
    const directionGrade = n2g(avgGrade); // 권장 학습 방향은 평균
    // A+ 학생은 발전영역도 A로 (B+ 안 나오게)
    const finalGrowthGrade = avgGrade >= 0.95 ? "A" : avgGrade >= 0.85 ? "A-" : growthGrade;

    // 시험 코멘트 instruction 생성
    const examInstParts = [];
    if (exam1On) {
      examInstParts.push("월간 성취도 모의고사(" + exam1Grade + "등급)" + (exam1Fb.trim() ? " 선생님 피드백 '" + exam1Fb.trim().replace(/"/g, "'") + "'을 반영하여" : "에 대해") + " 격식체(~입니다)로 2문장 작성. 등급과 피드백 내용을 따뜻하게 녹이되, 부정적 내용은 '~하면 좋겠습니다' 식 제안형으로. ~해요 금지");
    }
    if (exam2On) {
      examInstParts.push("승반고사(" + exam2Grade + "등급)" + (exam2Fb.trim() ? " 선생님 피드백 '" + exam2Fb.trim().replace(/"/g, "'") + "'을 반영하여" : "에 대해") + " 격식체(~입니다)로 2문장 작성. 등급과 피드백 내용을 따뜻하게 녹이되, 부정적 내용은 '~하면 좋겠습니다' 식 제안형으로. ~해요 금지");
    }
    const hasExam = exam1On || exam2On;

    promptParts.push("순수 JSON만 출력 (마크다운 코드블록 금지):");
    promptParts.push("{");
    promptParts.push('  "analysisItems": [');
    promptParts.push('    {"label":"학습 강점","detail":"진도 평가 등급을 근거로 잘하는 영역과 그 이유를 2문장(반드시 격식체 ~입니다 어미 사용, ~해요 금지, 다음 달이나 향후 계획 언급 금지)","grade":"' + strengthGrade + '"},');
    promptParts.push('    {"label":"발전 영역","detail":"' + (avgGrade >= 0.85 ? '학생이 이미 우수하지만 더욱 완성도를 높일 수 있는 세부 영역을 부드럽게 2문장(반드시 격식체 ~입니다 어미 사용, ~해요 금지, 다음 달이나 향후 계획 언급 금지, 비판 금지)' : '상대적으로 보강이 필요한 영역을 부드럽게 2문장(반드시 격식체 ~입니다 어미 사용, ~해요 금지, 다음 달이나 향후 계획 언급 금지)') + '","grade":"' + finalGrowthGrade + '"},');
    promptParts.push('    {"label":"권장 학습 방향","detail":"현재 진도를 기준으로 어떤 부분을 더 다지면 좋을지 학습 방향 2문장(반드시 격식체 ~입니다 어미 사용, ~해요 금지, 다음 달·다음 학습·향후 계획·앞으로 배울 단원 등 미래 학습 내용 언급 절대 금지, 오직 현재 학습 보완 방향만 작성)","grade":"' + directionGrade + '"}');
    promptParts.push('  ],');
    if (exam1On) promptParts.push('  "exam1Comment": "' + examInstParts[0] + '",');
    if (exam2On) promptParts.push('  "exam2Comment": "' + (exam1On ? examInstParts[1] : examInstParts[0]) + '",');
    promptParts.push('  "photoAnalysis": "' + photoAnaInst + '",');
    promptParts.push('  "comments": "' + commentsInst + '"');
    promptParts.push("}");
    const prompt = promptParts.join("\n");
    const mc = hp ? [...pc, { type: "text", text: prompt }] : prompt;
    const tryModels = ["claude-sonnet-4-5", "claude-sonnet-4-5-20250929", "claude-sonnet-4-6", "claude-opus-4-6", "claude-haiku-4-5", "claude-3-5-sonnet-latest"];
    let lastErr = "";
    let firstErr = "";
    // 페이로드 크기 사전 체크 (Vercel 4.5MB 제한)
    const payloadStr = JSON.stringify({ model: "test", max_tokens: 2000, messages: [{ role: "user", content: mc }] });
    const payloadKB = Math.round(payloadStr.length / 1024);
    console.log("📦 페이로드 크기:", payloadKB, "KB");
    if (payloadStr.length > 4 * 1024 * 1024) {
      const msg = `요청 크기가 너무 큽니다 (${payloadKB}KB). 사진을 줄이거나 빼주세요.`;
      setErr(msg); alert(msg); setStep("form"); return;
    }
    try {
      let data = null;
      for (const model of tryModels) {
        const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model, max_tokens: 2000, messages: [{ role: "user", content: mc }] }) });
        if (res.ok) { data = await res.json(); break; }
        let detail = "";
        let fullJson = null;
        try {
          const ej = await res.json();
          fullJson = ej;
          // 모든 가능한 에러 필드 추출
          if (ej.fullError) {
            detail = JSON.stringify(ej.fullError);
          } else if (ej.error && typeof ej.error === 'object') {
            detail = JSON.stringify(ej.error);
          } else if (typeof ej.error === 'string') {
            detail = ej.error;
          } else if (ej.message) {
            detail = ej.message;
          } else if (ej.type) {
            detail = ej.type;
          } else {
            detail = JSON.stringify(ej);
          }
        } catch {
          detail = await res.text().catch(() => "(빈 응답)");
        }
        if (!detail || detail === "{}" || detail === "(빈 응답)") {
          // 상태코드별 추정 원인
          if (res.status === 413) detail = "Payload Too Large - 사진 크기가 너무 큽니다";
          else if (res.status === 504) detail = "Timeout - 응답 시간 초과";
          else if (res.status === 502) detail = "Bad Gateway - 서버 일시 오류";
          else if (res.status === 500) detail = "Internal Server Error - 서버 내부 오류";
          else detail = `(빈 에러 응답) 페이로드: ${payloadKB}KB`;
        }
        const errMsg = `${res.status} (${model}) - ${String(detail).slice(0, 500)}`;
        if (!firstErr) firstErr = errMsg;
        lastErr = errMsg;
        console.error("API 에러 상세:", errMsg, fullJson);
        // 413, 500, 401, 429는 모델 바꿔도 안되니 즉시 중단
        if (![404, 400].includes(res.status)) break;
      }
      if (!data) throw new Error(firstErr || lastErr || "모든 모델 호출 실패");
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
      // 월간 모의고사 등급 이력 저장 (추이 그래프용) - 저장 전에 이전 이력 가져와서 추이 데이터 구성
      let examTrend = [];
      if (exam1On) {
        saveExamHistory(name, month, exam1Grade);
        examTrend = getExamHistory(name); // 이번 등급이 포함된 최신 이력
      }
      setRpt({ name, first, month, cls, tchr, cats: cwg, att, hw, photos, cl: p.curriculumLevel || "", ns: p.nextStep || "", anal: Array.isArray(p.analysisItems) ? p.analysisItems : [], pa: safePA, cmt: p.comments || "", exam1On, exam1Grade, exam1Comment: p.exam1Comment || "", exam2On, exam2Grade, exam2Comment: p.exam2Comment || "", examTrend });
      setCmt(p.comments || ""); setPaEdit(safePA); setAnalEdit(Array.isArray(p.analysisItems) ? p.analysisItems.map(a => ({ ...a })) : []); setReportPhotos([...photos]); setExam1CmtEdit(p.exam1Comment || ""); setExam2CmtEdit(p.exam2Comment || "");
      // 코멘트 이력 저장 (다음 달 작성 시 중복 방지용)
      if (p.comments) saveCmtHistory(name, month, p.comments);
      setStep("report");
    } catch (e) {
      const fullMsg = "AI 생성 오류: " + e.message;
      setErr(fullMsg);
      // 자세한 에러를 alert로도 표시 (모바일/태블릿에서도 보이게)
      alert(fullMsg);
      setStep("form");
    }
  };

  const doPrint = () => {
    const finalAnal = analEdit.length ? analEdit : (rpt.anal || []);
    const html = makeHTML({ ...rpt, cmt, pa: paEdit, anal: finalAnal, photos: reportPhotos, exam1Comment: exam1CmtEdit, exam2Comment: exam2CmtEdit });
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `와튼_${rpt.name}_${rpt.month}.html`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  };

  const doShare = () => {
    const d = rpt;
    const finalAnal = analEdit.length ? analEdit : (d.anal || []);
    const examTxt = [];
    if (d.exam1On) { examTxt.push(`📊월간성취도모의고사: ${d.exam1Grade}등급`); if (exam1CmtEdit) examTxt.push(`  ${exam1CmtEdit}`); }
    if (d.exam2On) { examTxt.push(`🎯승반고사: ${d.exam2Grade}등급`); if (exam2CmtEdit) examTxt.push(`  ${exam2CmtEdit}`); }
    const txt = ["【와튼영어스쿨 월말 리포트】", "━━━━━━━━", `📌${d.name}|${d.cls}|${d.tchr}선생님|${d.month}`, "", "📚학습진도", ...d.cats.map(c => `·[${c.cat}]${c.cont}▶${c.grade}`), "", "📊분석", ...finalAnal.map(a => `·${a.label}(${a.grade}):${a.detail}`), examTxt.length ? "\n📝시험결과\n" + examTxt.join("\n") : "", "", `📝태도:${d.att}|과제:${d.hw}`, "", "💬코멘트", cmt, paEdit ? "\n📸결과물 분석\n" + paEdit : "", "━━━━━━━━", "와튼영어스쿨"].filter(Boolean).join("\n");
    try {
      const ta = document.createElement("textarea");
      ta.value = txt;
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0.01;width:1px;height:1px;";
      document.body.appendChild(ta); ta.focus(); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
      alert("복사됐어요! 카카오톡에 붙여넣기 하세요 😊");
    } catch { alert("복사 실패"); }
  };

  const doJpg = async (format = "jpeg", scale = 3) => {
    const el = document.getElementById("report-capture");
    if (!el) { alert("리포트를 찾을 수 없어요."); return; }
    // html2canvas 라이브러리 동적 로딩 (한번만)
    if (!window.html2canvas) {
      try {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
      } catch { alert("이미지 변환 라이브러리 로딩 실패. 인터넷 연결을 확인해주세요."); return; }
    }
    try {
      // 캡처에서 제외할 요소들 (글자수 카운터, 수정 안내 등) 임시로 숨김
      const hideEls = el.querySelectorAll('[data-no-capture="true"]');
      const hidden = [];
      hideEls.forEach(elm => {
        hidden.push({ elm, display: elm.style.display });
        elm.style.display = "none";
      });

      // textarea의 값을 placeholder div로 대체해서 캡처 (textarea 스크롤 잘림 방지)
      const textareas = el.querySelectorAll("textarea");
      const replaced = [];
      textareas.forEach(ta => {
        const div = document.createElement("div");
        div.textContent = ta.value;
        // textarea 스타일 그대로 복사
        const cs = window.getComputedStyle(ta);
        div.style.cssText = `font-family:${cs.fontFamily};font-size:${cs.fontSize};font-weight:${cs.fontWeight};line-height:${cs.lineHeight};color:${cs.color};white-space:pre-wrap;word-wrap:break-word;padding:${cs.padding};margin:${cs.margin};border:${cs.border};background:${cs.background};width:${cs.width};box-sizing:border-box;-webkit-font-smoothing:antialiased;`;
        ta.style.display = "none";
        ta.parentNode.insertBefore(div, ta);
        replaced.push({ ta, div });
      });

      await new Promise(r => setTimeout(r, 150));
      const canvas = await window.html2canvas(el, {
        scale: scale,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        imageTimeout: 0,
        letterRendering: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: el.scrollWidth,
        windowHeight: el.scrollHeight,
        height: el.scrollHeight,
        width: el.scrollWidth
      });

      // 원상복구
      replaced.forEach(({ ta, div }) => {
        ta.style.display = "";
        div.remove();
      });
      hidden.forEach(({ elm, display }) => {
        elm.style.display = display;
      });

      const mime = format === "png" ? "image/png" : "image/jpeg";
      const ext = format === "png" ? "png" : "jpg";
      const quality = format === "png" ? undefined : 0.98;
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `와튼_${rpt.name}_${rpt.month}.${ext}`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 3000);
      }, mime, quality);
    } catch (e) { alert("이미지 저장 실패: " + e.message); }
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
              <label style={{ fontSize: 11, fontWeight: 700, color: N }}>💬 코멘트 키워드 <span style={{ fontWeight: 400, color: "#aaa" }}>(선택, 특정 학생만)</span></label>
              {name.trim() && getCmtHistory(name).length > 0 && (
                <span style={{ fontSize: 9, color: G, fontWeight: 700, background: "#fff8e7", border: `1px solid ${G}`, borderRadius: 4, padding: "2px 6px" }}>
                  📚 이전 코멘트 {getCmtHistory(name).length}개월 기록 보유
                </span>
              )}
            </div>
            <textarea
              value={cmtKeywords}
              onChange={e => setCmtKeywords(e.target.value)}
              placeholder="예: 집중력 떨어짐, 숙제 자주 잊음, 단어 시험 향상&#10;→ AI가 '집중하는 시간을 조금씩 늘려가면 좋겠습니다' 식으로 자연스럽게 변환"
              style={{ ...inp, fontSize: 11, minHeight: 56, resize: "vertical", lineHeight: 1.5 }}
            />
            <div style={{ fontSize: 9.5, color: "#999", marginTop: 4, lineHeight: 1.5 }}>
              💡 비워두면 평소처럼 자동 작성됩니다. 아쉬운 점이 있으면 솔직하게 적어주세요 — AI가 '~하면 좋겠습니다' 식의 따뜻한 제안형으로 바꿔서 반영해요.
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: N, display: "block", marginBottom: 5 }}>📝 시험 결과 <span style={{ fontWeight: 400, color: "#aaa" }}>(선택, 이번 달 본 시험 하나만)</span></label>
            {/* 시험 종류 단일 선택 버튼 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: examType !== "none" ? 10 : 0 }}>
              {[["none", "시험 없음", "—"], ["exam1", "📊 월간 모의고사", ""], ["exam2", "🎯 승반고사", "7·11월"]].map(([val, label, sub]) => (
                <button key={val} onClick={() => setExamType(val)} style={{ padding: "9px 6px", borderRadius: 8, border: `1.5px solid ${examType === val ? G : "#e0ddd5"}`, background: examType === val ? "#fffdf5" : "#fafaf8", cursor: "pointer", fontSize: 11, fontWeight: examType === val ? 800 : 600, color: examType === val ? N : "#888", lineHeight: 1.3, transition: "all 0.15s" }}>
                  {label}{sub && <div style={{ fontSize: 8, color: "#aaa", marginTop: 1 }}>{sub}</div>}
                </button>
              ))}
            </div>
            {/* 월간 모의고사 선택 시 */}
            {exam1On && (
              <div style={{ border: `1.5px solid ${G}`, borderRadius: 8, padding: 10, background: "#fffdf5" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: N }}>📊 월간 성취도 모의고사</span>
                  <select value={exam1Grade} onChange={e => setExam1Grade(e.target.value)} style={{ background: exam1Grade === "A" ? "#e8f5e9" : exam1Grade === "B" ? "#e3f2fd" : exam1Grade === "C" ? "#fff8e1" : "#fce4ec", color: exam1Grade === "A" ? "#2e7d32" : exam1Grade === "B" ? "#1565c0" : exam1Grade === "C" ? "#f57f17" : "#c62828", padding: "5px 12px", borderRadius: 6, fontSize: 14, fontWeight: 900, cursor: "pointer", outline: "none", border: `1.5px solid ${G}`, fontFamily: "inherit" }}>
                    {EXAM_GRS.map(g => <option key={g} value={g}>{g}등급</option>)}
                  </select>
                </div>
                <textarea value={exam1Fb} onChange={e => setExam1Fb(e.target.value)} placeholder="선생님 피드백 멘트 (예: 어법 파트 만점, 빈칸추론 보강 필요)&#10;→ AI가 이 멘트를 바탕으로 시험 코멘트를 따뜻하게 작성해요" style={{ ...inp, fontSize: 11, minHeight: 48, resize: "vertical", lineHeight: 1.5 }} />
                {/* 추이 그래프 미리보기 (이전 기록 있을 때) */}
                {name.trim() && getExamHistory(name).length > 0 && (
                  <div style={{ marginTop: 8, background: "#fff", border: "1px solid #e0ddd5", borderRadius: 6, padding: "8px 10px" }}>
                    <div style={{ fontSize: 9, color: G, fontWeight: 700, marginBottom: 4 }}>📈 {name.trim()} 모의고사 추이 (이번 등급 포함 시)</div>
                    <div style={{ fontSize: 9, color: "#888" }}>
                      이전 {getExamHistory(name).length}회 기록 보유 — 리포트에 추이 그래프가 표시됩니다
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* 승반고사 선택 시 */}
            {exam2On && (
              <div style={{ border: `1.5px solid ${G}`, borderRadius: 8, padding: 10, background: "#fffdf5" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: N }}>🎯 승반고사</span>
                  <select value={exam2Grade} onChange={e => setExam2Grade(e.target.value)} style={{ background: exam2Grade === "A" ? "#e8f5e9" : exam2Grade === "B" ? "#e3f2fd" : exam2Grade === "C" ? "#fff8e1" : "#fce4ec", color: exam2Grade === "A" ? "#2e7d32" : exam2Grade === "B" ? "#1565c0" : exam2Grade === "C" ? "#f57f17" : "#c62828", padding: "5px 12px", borderRadius: 6, fontSize: 14, fontWeight: 900, cursor: "pointer", outline: "none", border: `1.5px solid ${G}`, fontFamily: "inherit" }}>
                    {EXAM_GRS.map(g => <option key={g} value={g}>{g}등급</option>)}
                  </select>
                </div>
                <textarea value={exam2Fb} onChange={e => setExam2Fb(e.target.value)} placeholder="선생님 피드백 멘트 (예: 다음 레벨 진입 성공, 독해 속도 우수)&#10;→ AI가 이 멘트를 바탕으로 시험 코멘트를 따뜻하게 작성해요" style={{ ...inp, fontSize: 11, minHeight: 48, resize: "vertical", lineHeight: 1.5 }} />
              </div>
            )}
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
          {err && <div style={{ background: "#fff0f0", border: "1px solid #fcc", borderRadius: 7, padding: "8px 11px", color: "#c00", fontSize: 11, marginBottom: 10, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>⚠️ {err}</div>}
          <button onClick={doGen} disabled={isG} style={{ width: "100%", padding: 13, background: isG ? "#aaa" : N, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 800, cursor: isG ? "not-allowed" : "pointer" }}>
            {isG ? "⏳ AI 분석 중... (30초~1분 소요)" : "✨ 월말 리포트 생성하기 →"}
          </button>
          <button onClick={async () => {
            try {
              const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ model: "claude-sonnet-4-5", max_tokens: 50, messages: [{ role: "user", content: "안녕" }] })
              });
              const data = await res.json();
              alert("🔬 API 진단 결과\n\n상태코드: " + res.status + "\n\n응답: " + JSON.stringify(data, null, 2).slice(0, 800));
            } catch (e) {
              alert("🔬 API 진단 실패\n\n에러: " + e.message);
            }
          }} style={{ width: "100%", padding: 8, background: "#fff8e7", color: "#a07c2a", border: `1px solid ${G}`, borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", marginTop: 6 }}>
            🔬 API 진단 (디버깅용)
          </button>
          {name.trim() && (getCmtHistory(name).length > 0 || getExamHistory(name).length > 0) && (
            <button onClick={() => {
              const cmtN = getCmtHistory(name).length;
              const examN = getExamHistory(name).length;
              if (window.confirm(`'${name}' 학생의 저장된 이력을 모두 삭제할까요?\n· 코멘트 이력 ${cmtN}개 (중복 방지용)\n· 모의고사 추이 ${examN}회 (그래프용)`)) {
                try {
                  const allC = JSON.parse(localStorage.getItem(CMT_HISTORY_KEY) || "{}");
                  delete allC[name.trim()];
                  localStorage.setItem(CMT_HISTORY_KEY, JSON.stringify(allC));
                  const allE = JSON.parse(localStorage.getItem(EXAM_HISTORY_KEY) || "{}");
                  delete allE[name.trim()];
                  localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(allE));
                  alert("✅ 이력이 삭제되었습니다.");
                  setName(name); // 리렌더 트리거
                } catch { alert("삭제 실패"); }
              }
            }} style={{ width: "100%", padding: 6, background: "#fff", color: "#888", border: "1px solid #ddd", borderRadius: 8, fontSize: 10, cursor: "pointer", marginTop: 6 }}>
              🗑️ {name.trim()} 학생 이력 초기화 (코멘트·모의고사 추이)
            </button>
          )}
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
          <button onClick={() => { setName(""); setAtt("A+"); setHw("A+"); setCg(cats.map(() => "A")); setPhotos([]); setReportPhotos([]); setProgOverride({}); setEditIdx(-1); setCmtKeywords(""); setExamType("none"); setExam1Grade("A"); setExam1Fb(""); setExam2Grade("A"); setExam2Fb(""); setExam1CmtEdit(""); setExam2CmtEdit(""); setStep("form"); }} style={{ padding: "6px 12px", background: "#fff", border: "1.5px solid #ccc", borderRadius: 7, fontSize: 11, cursor: "pointer" }}>← 다음 학생</button>
          <button onClick={() => setStep("setup")} style={{ padding: "6px 12px", background: "#fff", border: `1.5px solid ${G}`, borderRadius: 7, fontSize: 11, color: G, cursor: "pointer" }}>반 정보 수정</button>
          <button onClick={doPrint} style={{ padding: "6px 12px", background: N, border: "none", borderRadius: 7, fontSize: 11, color: "#fff", fontWeight: 700, cursor: "pointer" }}>🖨️ HTML 저장 후 인쇄</button>
          <button onClick={() => doJpg("png", 3)} style={{ padding: "6px 12px", background: "#1565c0", border: "none", borderRadius: 7, fontSize: 11, color: "#fff", fontWeight: 700, cursor: "pointer" }}>🖼️ PNG 다운로드 (선명함)</button>
          <button onClick={() => doJpg("jpeg", 3)} style={{ padding: "6px 12px", background: "#2e7d32", border: "none", borderRadius: 7, fontSize: 11, color: "#fff", fontWeight: 700, cursor: "pointer" }}>📷 JPG 다운로드</button>
          <button onClick={doShare} style={{ padding: "6px 12px", background: G, border: "none", borderRadius: 7, fontSize: 11, color: "#fff", fontWeight: 700, cursor: "pointer" }}>📋 텍스트 복사</button>
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto 5px", padding: "0 8px" }}>
          <div style={{ background: "#f0f6ff", border: "1px solid #c5d8f5", borderRadius: 6, padding: "6px 11px", fontSize: 11, color: "#4060a0" }}>
            💡 <b>인쇄:</b> HTML 저장 → 파일 열기 → 인쇄창 자동 → PDF 또는 프린터 출력
          </div>
        </div>
        <div id="report-capture" style={{ maxWidth: 720, margin: "0 auto", background: "#fff", boxShadow: "0 3px 18px rgba(0,0,0,0.1)", borderRadius: 4, overflow: "hidden" }}>
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
                    <div style={{ padding: "7px 10px", fontSize: 11, color: "#1a1a1a", lineHeight: 1.6, fontWeight: 500 }}>{c.cont}</div>
                    <div style={{ ...gst(c.grade || "A"), display: "flex", alignItems: "center", justifyContent: "center", borderLeft: "1px solid #eee" }}><span style={{ fontSize: 12, fontWeight: 900 }}>{c.grade || "A"}</span></div>
                  </div>
                ))}
              </div>
              <SH t="학습 분석 리포트" e="🔍" />
              <div data-no-capture="true" style={{ display: "flex", justifyContent: "flex-end", marginTop: -2, marginBottom: 2 }}>
                <span style={{ fontSize: 9, color: "#888" }}>✏️ 내용 클릭하여 수정 · 등급도 변경 가능</span>
              </div>
              <div style={{ border: "1px solid #ddd", borderTop: "none", borderRadius: "0 0 6px 6px", overflow: "hidden", marginBottom: 9 }}>
                {(analEdit.length ? analEdit : d.anal).map((it, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 42px", borderBottom: i < (analEdit.length || d.anal.length) - 1 ? "1px solid #eee" : "none", background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
                    <div style={{ padding: "8px 11px", borderRight: `2px solid ${G}` }}>
                      <div style={{ fontSize: 9, color: G, fontWeight: 700, marginBottom: 3 }}>{it.label}</div>
                      <textarea value={it.detail} onChange={e => setAnalEdit(prev => { const next = (prev.length ? [...prev] : d.anal.map(a => ({ ...a }))); next[i] = { ...next[i], detail: e.target.value }; return next; })} style={{ width: "100%", fontSize: 11, color: "#1a1a1a", lineHeight: 1.5, fontFamily: "'Malgun Gothic',sans-serif", border: "none", outline: "none", resize: "vertical", background: "transparent", minHeight: 44, padding: 0, boxSizing: "border-box", fontWeight: 500 }} />
                    </div>
                    <div style={{ background: N, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 2px" }}>
                      <select
                        value={it.grade}
                        onChange={e => setAnalEdit(prev => {
                          const next = (prev.length ? [...prev] : d.anal.map(a => ({ ...a })));
                          next[i] = { ...next[i], grade: e.target.value };
                          return next;
                        })}
                        style={{ background: "transparent", color: "#fff", fontWeight: 900, fontSize: 12, border: "none", outline: "none", cursor: "pointer", textAlign: "center", textAlignLast: "center", width: "100%", appearance: "none", WebkitAppearance: "none", MozAppearance: "none", fontFamily: "inherit", padding: "4px 0" }}
                        title="등급 수정"
                      >
                        {GRS.map(g => <option key={g} value={g} style={{ background: "#fff", color: "#000" }}>{g}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              {(d.exam1On || d.exam2On) && (() => {
                const examGcol = g => g === "A" ? "#2e7d32" : g === "B" ? "#1565c0" : g === "C" ? "#f57f17" : "#c62828";
                const examGbg = g => g === "A" ? "#e8f5e9" : g === "B" ? "#e3f2fd" : g === "C" ? "#fff8e1" : "#fce4ec";
                return (
                  <div style={{ marginBottom: 9 }}>
                    <SH t="시험 결과" e="📝" />
                    <div style={{ border: "1px solid #ddd", borderTop: "none", borderRadius: "0 0 6px 6px", overflow: "hidden" }}>
                      {d.exam1On && (
                        <div style={{ borderBottom: d.exam2On ? "1px solid #eee" : "none", padding: "10px 12px", background: "#fff" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: N }}>📊 월간 성취도 모의고사</span>
                            <span style={{ background: examGbg(d.exam1Grade), color: examGcol(d.exam1Grade), fontWeight: 900, fontSize: 13, padding: "2px 12px", borderRadius: 5, border: `1.5px solid ${examGcol(d.exam1Grade)}33` }}>{d.exam1Grade}등급</span>
                          </div>
                          {(exam1CmtEdit || d.exam1Comment) && (
                            <textarea value={exam1CmtEdit} onChange={e => setExam1CmtEdit(e.target.value)} style={{ width: "100%", fontSize: 11, lineHeight: 1.6, color: "#1a1a1a", fontFamily: "'Malgun Gothic',sans-serif", border: "none", outline: "none", resize: "vertical", background: "transparent", minHeight: 40, padding: 0, boxSizing: "border-box", fontWeight: 500 }} />
                          )}
                          {/* 추이 그래프 (2회 이상 기록 시) */}
                          {d.examTrend && d.examTrend.length >= 2 && (() => {
                            const trend = d.examTrend.slice(-8); // 최근 8회
                            const W = 460, H = 130, padL = 30, padR = 14, padT = 14, padB = 26;
                            const plotW = W - padL - padR, plotH = H - padT - padB;
                            const n = trend.length;
                            const xAt = i => padL + (n === 1 ? plotW / 2 : (plotW * i / (n - 1)));
                            const yAt = g => padT + plotH - ((examG2n(g) - 1) / 4) * plotH; // A=5(위) ~ E=1(아래)
                            const linePts = trend.map((t, i) => `${xAt(i)},${yAt(t.grade)}`).join(" ");
                            const gColor = g => g === "A" ? "#2e7d32" : g === "B" ? "#1565c0" : g === "C" ? "#f57f17" : g === "D" ? "#e65100" : "#c62828";
                            return (
                              <div style={{ marginTop: 10, background: "#fafbff", border: "1px solid #e0ddd5", borderRadius: 6, padding: "8px 10px" }}>
                                <div style={{ fontSize: 9, color: G, fontWeight: 700, marginBottom: 4 }}>📈 월간 모의고사 성적 추이 (최근 {trend.length}회)</div>
                                <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
                                  {/* y축 등급 라벨 + 가로 그리드 */}
                                  {["A", "B", "C", "D", "E"].map(g => {
                                    const y = yAt(g);
                                    return (
                                      <g key={g}>
                                        <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#e8e8e8" strokeWidth="1" />
                                        <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#999" fontFamily="Malgun Gothic,sans-serif">{g}</text>
                                      </g>
                                    );
                                  })}
                                  {/* 추이 선 */}
                                  <polyline points={linePts} fill="none" stroke={G} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                                  {/* 데이터 점 + 등급 라벨 + 월 라벨 */}
                                  {trend.map((t, i) => (
                                    <g key={i}>
                                      <circle cx={xAt(i)} cy={yAt(t.grade)} r="4" fill={gColor(t.grade)} stroke="#fff" strokeWidth="1.5" />
                                      <text x={xAt(i)} y={yAt(t.grade) - 8} textAnchor="middle" fontSize="9" fontWeight="700" fill={gColor(t.grade)} fontFamily="Malgun Gothic,sans-serif">{t.grade}</text>
                                      <text x={xAt(i)} y={H - 8} textAnchor="middle" fontSize="8" fill="#888" fontFamily="Malgun Gothic,sans-serif">{t.month.replace(/^\d+년\s*/, "")}</text>
                                    </g>
                                  ))}
                                </svg>
                              </div>
                            );
                          })()}
                        </div>
                      )}
                      {d.exam2On && (
                        <div style={{ padding: "10px 12px", background: "#fff" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: N }}>🎯 승반고사</span>
                            <span style={{ background: examGbg(d.exam2Grade), color: examGcol(d.exam2Grade), fontWeight: 900, fontSize: 13, padding: "2px 12px", borderRadius: 5, border: `1.5px solid ${examGcol(d.exam2Grade)}33` }}>{d.exam2Grade}등급</span>
                          </div>
                          {(exam2CmtEdit || d.exam2Comment) && (
                            <textarea value={exam2CmtEdit} onChange={e => setExam2CmtEdit(e.target.value)} style={{ width: "100%", fontSize: 11, lineHeight: 1.6, color: "#1a1a1a", fontFamily: "'Malgun Gothic',sans-serif", border: "none", outline: "none", resize: "vertical", background: "transparent", minHeight: 40, padding: 0, boxSizing: "border-box", fontWeight: 500 }} />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
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
                <textarea value={cmt} onChange={e => { if (e.target.value.length <= 500) setCmt(e.target.value); }} onBlur={() => { if (cmt && rpt) saveCmtHistory(rpt.name, rpt.month, cmt); }} style={{ width: "100%", fontSize: 12, lineHeight: 1.9, color: "#0d0d0d", fontFamily: "'Malgun Gothic',sans-serif", border: "none", outline: "none", resize: "none", background: "transparent", minHeight: 148, padding: 0, boxSizing: "border-box", fontWeight: 500 }} />
                <div data-no-capture="true" style={{ textAlign: "right", fontSize: 10, marginTop: 3, color: cmt.length < 400 ? "#c00" : cmt.length > 480 ? "#e67e00" : "#2e7d32", fontWeight: 600 }}>
                  {cmt.length < 400 ? `⚠️ ${cmt.length}/500자 (400자 이상 필요)` : `✓ ${cmt.length}/500자`}
                </div>
              </div>
              {(reportPhotos.length > 0 || paEdit) && (
                <div style={{ marginTop: 12, borderTop: `2px solid ${N}`, paddingTop: 10 }}>
                  <div style={{ background: `linear-gradient(135deg,${N},#1a3060)`, padding: "7px 13px", borderRadius: "6px 6px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: G, fontSize: 10, fontWeight: 700 }}>📸 첨부 결과물 분석</span>
                    <span data-no-capture="true" style={{ color: "#888", fontSize: 9 }}>✏️ 클릭하여 수정 가능</span>
                  </div>
                  <div style={{ border: "1px solid #ddd", borderTop: "none", padding: 10, borderRadius: "0 0 6px 6px", background: "#fffef8" }}>
                    {reportPhotos.length > 0 && <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(reportPhotos.length, 3)},1fr)`, gap: 5, marginBottom: 8 }}>
                      {reportPhotos.map((p, i) => (
                        <div key={i} style={{ position: "relative" }}>
                          <img src={p.url} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 4, border: "1px solid #e0ddd5", display: "block" }} />
                          <button
                            data-no-capture="true"
                            onClick={() => {
                              if (window.confirm("이 사진을 리포트에서 제거할까요?\n(분석 내용은 그대로 유지됩니다)")) {
                                setReportPhotos(ps => ps.filter((_, j) => j !== i));
                              }
                            }}
                            title="사진 제거 (분석은 유지)"
                            style={{ position: "absolute", top: 4, right: 4, background: "rgba(198,40,40,0.92)", border: "2px solid #fff", borderRadius: "50%", width: 24, height: 24, color: "#fff", fontSize: 13, fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, padding: 0, boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
                          >✕</button>
                        </div>
                      ))}
                    </div>}
                    <textarea value={paEdit} onChange={e => setPaEdit(e.target.value)} style={{ width: "100%", fontSize: 11, lineHeight: 1.7, color: "#1a1a1a", fontFamily: "'Malgun Gothic',sans-serif", border: "none", outline: "none", resize: "vertical", background: "transparent", minHeight: 90, padding: 0, boxSizing: "border-box", borderTop: reportPhotos.length ? "1px solid #ece8e0" : "none", paddingTop: reportPhotos.length ? 7 : 0, fontWeight: 500 }} />
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
