"use client";

import { useEffect, useRef, useCallback } from "react";

interface Pt { x: number; y: number }
interface Drop { progress: number; radius: number; opacity: number; sorted: boolean }

const BASE_SPEED = 20;
const MAX_DPR = 1.5;

interface PD { pts: Pt[]; cum: number[]; len: number }

function buildPD(pts: Pt[]): PD {
  const cum = [0];
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x, dy = pts[i].y - pts[i - 1].y;
    len += Math.sqrt(dx * dx + dy * dy);
    cum.push(len);
  }
  return { pts, cum, len };
}

function sample(pd: PD, t: number): Pt {
  if (pd.pts.length < 2) return pd.pts[0] || { x: 0, y: 0 };
  const tgt = Math.max(0, Math.min(1, t)) * pd.len;
  let lo = 1, hi = pd.cum.length - 1;
  while (lo < hi) {
    const m = (lo + hi) >> 1;
    if (pd.cum[m] < tgt) lo = m + 1; else hi = m;
  }
  const s = pd.cum[lo - 1], sl = pd.cum[lo] - s;
  const f = sl > 0 ? (tgt - s) / sl : 0;
  return {
    x: pd.pts[lo - 1].x + (pd.pts[lo].x - pd.pts[lo - 1].x) * f,
    y: pd.pts[lo - 1].y + (pd.pts[lo].y - pd.pts[lo - 1].y) * f,
  };
}

function makeSerpentine(
  cx: number, halfSpan: number, startY: number,
  turnR: number, turns: number, segs = 16
): Pt[] {
  const pts: Pt[] = [];
  const L = cx - halfSpan, R = cx + halfSpan;
  pts.push({ x: cx, y: startY });
  pts.push({ x: R, y: startY });

  let y = startY, atR = true;
  for (let t = 0; t < turns; t++) {
    const cy = y + turnR;
    if (atR) {
      for (let i = 1; i <= segs; i++) {
        const a = (i / segs) * Math.PI;
        pts.push({ x: R + turnR * Math.sin(a), y: cy - turnR * Math.cos(a) });
      }
    } else {
      for (let i = 1; i <= segs; i++) {
        const a = (i / segs) * Math.PI;
        pts.push({ x: L - turnR * Math.sin(a), y: cy - turnR * Math.cos(a) });
      }
    }
    y += 2 * turnR;
    if (t < turns - 1) {
      pts.push({ x: atR ? L : R, y });
    } else {
      pts.push({ x: cx, y });
    }
    atR = !atR;
  }
  return pts;
}

export default function MicrofluidicPath() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const dprRef = useRef(1);
  const dimsRef = useRef({ w: 0, vh: 0, H: 0 });

  const mainRef = useRef<PD>({ pts: [], cum: [0], len: 0 });
  const branchRef = useRef<PD>({ pts: [], cum: [0], len: 0 });
  const picoRef = useRef<PD>({ pts: [], cum: [0], len: 0 });

  const mainDrops = useRef<Drop[]>([]);

  const spdMain = useRef(0);
  const chamberZ = useRef({ s: 0, e: 0 });
  const electrodeFlash = useRef(0);
  const geoRef = useRef<Record<string, any> | null>(null);

  const generate = useCallback((w: number, H: number) => {
    const cx = (document.documentElement.clientWidth || w) / 2;
    const cw = Math.min(20, Math.max(10, Math.min(22, w * 0.014)) * 1.8);

    const mainEl = document.querySelector("main");
    if (!mainEl) return;
    const secs = Array.from(mainEl.children) as HTMLElement[];
    if (secs.length < 7) return;

    const secBot = secs.map(s => s.offsetTop + s.offsetHeight);
    const py = w >= 1024 ? 160 : 128;
    const gap = secBot.slice(0, -1);
    const gapH = py * 2;

    // ─── HERO: straight centered channel ───
    const heroH = secBot[0];
    const mergeY = heroH * 0.82;
    const startY = heroH * 0.68;

    // ─── GAP 1: picoinjection ───
    const picoY = gap[0];
    const picoSX = Math.min(cx + cw * 10, w - cw * 2);
    const picoNarrowX = cx + cw * 3;

    // ─── GAPS 2 & 3: rounded serpentines ───
    const serpHS = Math.min(cw * 5, w * 0.22);
    const serpTR = Math.max(cw * 0.5, gapH / 12);
    const serpH = 5 * 2 * serpTR;

    const serp1Start = gap[1] - serpH / 2;
    const serp2Start = gap[2] - serpH / 2;

    // ─── GAP 4: Y-junction ───
    const juncY = gap[3];
    const bOff = cw * 5;
    const divLen = cw * 4;

    // ─── GAP 5: outlet + merge ───
    const branchEndY = gap[4] - py * 0.3;
    const mergeToCenterY = gap[4] + py * 0.3;

    // ─── GAP 6: widening chamber ───
    const chHW = cw * 2.5;
    const chExp = cw * 2;
    const chBody = Math.min(cw * 8, gapH * 0.5);
    const chCon = cw * 2;
    const chTotalH = chExp + chBody + chCon;
    const chamberTop = gap[5] - chTotalH / 2;
    const chBotY = chamberTop + chTotalH;

    const exitY = secBot[secs.length - 1];

    // ═══ MAIN PATH ═══
    const m: Pt[] = [];
    m.push({ x: cx, y: startY });
    m.push({ x: cx, y: mergeY });
    m.push({ x: cx, y: picoY });
    m.push({ x: cx, y: serp1Start });

    const s1 = makeSerpentine(cx, serpHS, serp1Start, serpTR, 5);
    for (let i = 1; i < s1.length; i++) m.push(s1[i]);

    m.push({ x: cx, y: serp2Start });

    const s2 = makeSerpentine(cx, serpHS, serp2Start, serpTR, 5);
    for (let i = 1; i < s2.length; i++) m.push(s2[i]);

    m.push({ x: cx, y: juncY });
    const sortIdx = m.length - 1;
    m.push({ x: cx + bOff, y: juncY + divLen });
    m.push({ x: cx + bOff, y: branchEndY });
    m.push({ x: cx, y: mergeToCenterY });
    m.push({ x: cx, y: chamberTop });

    const chIdx = m.length - 1;
    m.push({ x: cx, y: chBotY });
    m.push({ x: cx, y: exitY });

    const mpd = buildPD(m);
    mainRef.current = mpd;
    spdMain.current = BASE_SPEED / (mpd.len * 60);

    chamberZ.current = {
      s: mpd.cum[chIdx] / mpd.len,
      e: mpd.cum[chIdx + 1] / mpd.len,
    };

    const picoJuncT = mpd.cum[1] / mpd.len;
    const sortJuncT = mpd.cum[sortIdx] / mpd.len;

    // ═══ BRANCH A ═══
    const baPD = buildPD([
      { x: cx, y: juncY },
      { x: cx - bOff, y: juncY + divLen },
      { x: cx - bOff, y: branchEndY },
    ]);
    branchRef.current = baPD;

    // ═══ PICOINJECTION PATH ═══
    const ppd = buildPD([
      { x: picoSX, y: picoY },
      { x: cx, y: picoY },
    ]);
    picoRef.current = ppd;

    const juncDist = picoY - mergeY;

    geoRef.current = {
      cx, cw, mergeY,
      picoY, picoSX, picoNarrowX, juncDist,
      picoJuncT, sortJuncT, branchLen: baPD.len,
      serpHS, serpTR,
      juncY, bOff, divLen,
      branchEndY, mergeToCenterY,
      chamberTop, chHW, chExp, chBody, chCon, chBotY,
      exitY, py,
    };
  }, []);

  const initDroplets = useCallback((w: number) => {
    const n = w < 480 ? 19 : w < 768 ? 29 : w < 1024 ? 40 : 51;
    mainDrops.current = Array.from({ length: n }, (_, i) => ({
      progress: i / n,
      radius: 2.5 + Math.random() * 2.5,
      opacity: 0.15 + Math.random() * 0.2,
      sorted: Math.random() < 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const w = document.documentElement.clientWidth || window.innerWidth;
      const vh = window.innerHeight;
      const H = document.documentElement.scrollHeight;
      const prev = dimsRef.current;
      const unchanged = geoRef.current
        && prev.w === w
        && prev.vh === vh
        && prev.H === H
        && dprRef.current === dpr;
      if (unchanged) return;

      canvas.width = w * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dprRef.current = dpr;
      dimsRef.current = { w, vh, H };
      generate(w, H);
    };

    const poly = (pts: Pt[], color: string, lw: number) => {
      if (pts.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.setLineDash([]);
      ctx.stroke();
    };

    const drawReservoir = (x: number, yp: number, r: number, sy: number, vh: number) => {
      const y = yp;
      if (y < sy - r * 3 || y > sy + vh + r * 3) return;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(233,30,99,0.03)";
      ctx.fill();
      ctx.strokeStyle = "rgba(233,30,99,0.08)";
      ctx.lineWidth = 0.8;
      ctx.setLineDash([]);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, r * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(233,30,99,0.07)";
      ctx.fill();
    };

    const draw = () => {
      const { w, vh, H } = dimsRef.current;
      const sy = window.scrollY;
      const mp = mainRef.current;
      const g = geoRef.current;

      const viewTop = Math.max(0, sy - 140);
      const viewH = Math.min(H - viewTop, vh + 280);
      ctx.clearRect(0, viewTop, w, viewH);
      if (!g || mp.len === 0) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      const {
        cx, cw,
        picoY, picoSX, picoNarrowX, juncDist,
        juncY, bOff, divLen, branchEndY,
        chamberTop, chHW, chExp, chBody, chBotY,
        exitY,
      } = g;
      const Y = (v: number) => v;
      const mhw = cw / 2;

      // Only rasterize primitives in/near the visible viewport band.
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, viewTop, w, viewH);
      ctx.clip();

      // ═══ MAIN CHANNEL ═══
      poly(mp.pts, "rgba(233,30,99,0.018)", cw * 2.2);
      poly(mp.pts, "rgba(233,30,99,0.055)", cw);
      poly(mp.pts, "rgba(233,30,99,0.085)", 0.5);

      // ═══ BRANCH A ═══
      const ba = branchRef.current;
      if (ba.len > 0) {
        poly(ba.pts, "rgba(233,30,99,0.018)", cw * 2.2);
        poly(ba.pts, "rgba(233,30,99,0.055)", cw);
        poly(ba.pts, "rgba(233,30,99,0.085)", 0.5);
        const op = ba.pts[ba.pts.length - 1];
        drawReservoir(op.x, op.y, cw * 2, sy, vh);
      }

      // ═══ PICOINJECTION CHANNEL ═══
      // Full-width portion (same as main channel)
      const picoFullPts: Pt[] = [
        { x: picoSX, y: picoY },
        { x: picoNarrowX, y: picoY },
      ];
      poly(picoFullPts, "rgba(233,30,99,0.018)", cw * 2.2);
      poly(picoFullPts, "rgba(233,30,99,0.055)", cw);
      poly(picoFullPts, "rgba(233,30,99,0.085)", 0.5);

      // Narrowing section (cw → cw/3 near junction)
      const nw = cw / 3;
      const psy = Y(picoY);
      ctx.beginPath();
      ctx.moveTo(picoNarrowX, psy - mhw);
      ctx.lineTo(cx + mhw, psy - nw / 2);
      ctx.lineTo(cx + mhw, psy + nw / 2);
      ctx.lineTo(picoNarrowX, psy + mhw);
      ctx.closePath();
      ctx.fillStyle = "rgba(233,30,99,0.055)";
      ctx.fill();
      // Narrowing walls
      ctx.beginPath();
      ctx.moveTo(picoNarrowX, psy - mhw);
      ctx.lineTo(cx + mhw, psy - nw / 2);
      ctx.moveTo(picoNarrowX, psy + mhw);
      ctx.lineTo(cx + mhw, psy + nw / 2);
      ctx.strokeStyle = "rgba(233,30,99,0.085)";
      ctx.lineWidth = 0.5;
      ctx.lineCap = "square";
      ctx.stroke();

      drawReservoir(picoSX, picoY, cw * 1.3, sy, vh);

      // ═══ ELECTRODES AT Y-JUNCTION (matching Sort panel aesthetic) ═══
      const ePlateLen = cw * 2.5;
      const ePlateThick = cw * 0.25;
      const eR = ePlateThick * 0.4;
      const eGap = cw * 0.2;
      const eCenterY = juncY - cw * 1.5;
      const eTop = eCenterY - ePlateLen / 2;

      // Electrode zone background (dashed rect)
      const zoneW = cw + eGap * 2 + ePlateThick * 2 + cw * 0.6;
      const zoneH = ePlateLen + cw;
      ctx.beginPath();
      const zx = cx - zoneW / 2, zy = Y(eCenterY - zoneH / 2);
      ctx.roundRect(zx, zy, zoneW, zoneH, cw * 0.15);
      const zoneFlash = 0.015 + electrodeFlash.current * 0.04;
      ctx.fillStyle = `rgba(233,30,99,${zoneFlash})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(233,30,99,${0.04 + electrodeFlash.current * 0.08})`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([cw * 0.2, cw * 0.15]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Thin rounded electrode plates
      const eLx = cx - mhw - eGap - ePlateThick;
      const eRx = cx + mhw + eGap;

      const flashOp = 0.18 + electrodeFlash.current * 0.4;
      const drawPlate = (px: number) => {
        ctx.beginPath();
        ctx.roundRect(px, Y(eTop), ePlateThick, ePlateLen, eR);
        ctx.fillStyle = `rgba(233,30,99,${flashOp})`;
        ctx.fill();
      };
      drawPlate(eLx);
      drawPlate(eRx);

      // Field lines between plates
      const fxL = eLx + ePlateThick;
      const fxR = eRx;
      const fieldOp = 0.05 + electrodeFlash.current * 0.15;
      ctx.setLineDash([cw * 0.1, cw * 0.1]);
      ctx.strokeStyle = `rgba(233,30,99,${fieldOp})`;
      ctx.lineWidth = 0.5;
      for (let fl = 0; fl < 3; fl++) {
        const fy = eTop + ePlateLen * (fl + 0.5) / 3;
        ctx.beginPath();
        ctx.moveTo(fxL, Y(fy));
        ctx.lineTo(fxR, Y(fy));
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // ═══ WIDENING CHAMBER ═══
      const chExpEnd = chamberTop + chExp;
      const chConStart = chExpEnd + chBody;

      // Chamber fill (same opacity as channel body)
      ctx.beginPath();
      ctx.moveTo(cx - mhw, Y(chamberTop));
      ctx.lineTo(cx - chHW, Y(chExpEnd));
      ctx.lineTo(cx - chHW, Y(chConStart));
      ctx.lineTo(cx - mhw, Y(chBotY));
      ctx.lineTo(cx + mhw, Y(chBotY));
      ctx.lineTo(cx + chHW, Y(chConStart));
      ctx.lineTo(cx + chHW, Y(chExpEnd));
      ctx.lineTo(cx + mhw, Y(chamberTop));
      ctx.closePath();
      ctx.fillStyle = "rgba(233,30,99,0.055)";
      ctx.fill();

      // Chamber walls
      const leftWall: Pt[] = [
        { x: cx - mhw, y: chamberTop },
        { x: cx - chHW, y: chExpEnd },
        { x: cx - chHW, y: chConStart },
        { x: cx - mhw, y: chBotY },
      ];
      const rightWall: Pt[] = [
        { x: cx + mhw, y: chamberTop },
        { x: cx + chHW, y: chExpEnd },
        { x: cx + chHW, y: chConStart },
        { x: cx + mhw, y: chBotY },
      ];
      poly(leftWall, "rgba(233,30,99,0.085)", 0.5);
      poly(rightWall, "rgba(233,30,99,0.085)", 0.5);

      // Dividers (lighter than chamber)
      const divOff = chHW * 0.4;
      const divW = cw * 0.35;
      const divPad = cw;
      for (const ds of [-1, 1]) {
        const dx = cx + ds * divOff;
        ctx.fillStyle = "rgba(233,30,99,0.025)";
        ctx.fillRect(dx - divW / 2, Y(chExpEnd + divPad), divW, chBody - 2 * divPad);
        ctx.strokeStyle = "rgba(233,30,99,0.035)";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(dx - divW / 2, Y(chExpEnd + divPad), divW, chBody - 2 * divPad);
      }

      // ═══ DROPLETS ═══
      const { s: cs, e: ce } = chamberZ.current;
      const { picoJuncT, sortJuncT, branchLen } = g;
      const ppd = picoRef.current;
      const spd = spdMain.current;

      electrodeFlash.current *= 0.965;

      const drawDrop = (
        x: number, screenY: number, r: number,
        red: number, grn: number, blu: number, op: number
      ) => {
        const gr = ctx.createRadialGradient(x, screenY, 0, x, screenY, r * 3);
        gr.addColorStop(0, `rgba(${red},${grn},${blu},${op * 0.6})`);
        gr.addColorStop(1, `rgba(${red},${grn},${blu},0)`);
        ctx.beginPath();
        ctx.arc(x, screenY, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, screenY, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${red},${grn},${blu},${op})`;
        ctx.fill();
      };

      for (const d of mainDrops.current) {
        let s = spd;
        if (d.progress >= cs && d.progress <= ce) s *= 0.2;
        d.progress += s;
        if (d.progress > 1) {
          d.progress -= 1;
          d.sorted = Math.random() < 0.3;
        }

        // Grey → pink fusion at picoinjection over ~0.5s of travel time.
        const fadeZone = Math.max(spd * 30, 0.0015);
        let fuse = 0;
        if (d.progress > picoJuncT + fadeZone) fuse = 1;
        else if (d.progress > picoJuncT) fuse = (d.progress - picoJuncT) / fadeZone;

        const cr = Math.round(160 + fuse * (233 - 160));
        const cg = Math.round(165 + fuse * (30 - 165));
        const cb = Math.round(175 + fuse * (99 - 175));

        const mergeFlash = 1 + 0.45 * Math.sin(fuse * Math.PI);

        const pastSort = d.progress >= sortJuncT;

        // Electrode flash when a sorted droplet crosses the junction
        if (pastSort && d.sorted && (d.progress - s) < sortJuncT) {
          electrodeFlash.current = 1;
        }

        const dropOp = d.opacity * mergeFlash;

        if (pastSort && !d.sorted && ba.len > 0) {
          // Not-sorted → travel to outlet, then hold and fade (~0.5s)
          const distPast = (d.progress - sortJuncT) * mp.len;
          const branchP = distPast / branchLen;
          const fadeProgressSpan = Math.max(spd * 30, 0.0015);
          const branchTravelProgress = branchLen / mp.len;

          let pos: Pt;
          let fade = 1;
          if (branchP <= 1) {
            // Moving along branch
            pos = sample(ba, branchP);
          } else {
            // Reached outlet: stop at center and fade out
            pos = ba.pts[ba.pts.length - 1];
            const holdProgress = d.progress - (sortJuncT + branchTravelProgress);
            const holdT = holdProgress / fadeProgressSpan;
            if (holdT >= 1) continue;
            fade = Math.max(0, 1 - holdT);
          }

          const yy = pos.y;
          if (yy < sy - 30 || yy > sy + vh + 30) continue;
          drawDrop(pos.x, yy, d.radius, cr, cg, cb, dropOp * fade);
        } else {
          // Before junction or sorted → draw on main path
          const pos = sample(mp, d.progress);
          const yy = pos.y;
          if (yy < sy - 30 || yy > sy + vh + 30) continue;
          drawDrop(pos.x, yy, d.radius, cr, cg, cb, dropOp);
        }
      }

      // ═══ COUPLED PICO DROPLETS (half-size, pink) – one per main, synced at junction ═══
      if (ppd.len > 0) {
        for (const d of mainDrops.current) {
          const toJunc = ((picoJuncT - d.progress) % 1 + 1) % 1;
          if (toJunc > picoJuncT) continue;
          const picoT = 1 - toJunc / picoJuncT;
          if (picoT < 0.01) continue;
          const pos = sample(ppd, picoT);
          const ppy = pos.y;
          if (ppy < sy - 30 || ppy > sy + vh + 30) continue;
          const pr = d.radius * 0.5;
          const mergeFade = picoT > 0.96 ? (1 - picoT) / 0.04 : 1;
          drawDrop(pos.x, ppy, pr, 233, 30, 99, d.opacity * Math.max(0, mergeFade));
        }
      }

      // Fade-out gradient at bottom so channel disappears at footer
      const fadeBotH = cw * 12;
      const fadeBotGrad = ctx.createLinearGradient(0, Y(exitY - fadeBotH), 0, Y(exitY));
      fadeBotGrad.addColorStop(0, "rgba(250,251,252,0)");
      fadeBotGrad.addColorStop(1, "rgba(250,251,252,1)");
      ctx.fillStyle = fadeBotGrad;
      ctx.fillRect(0, Y(exitY - fadeBotH), w, fadeBotH);

      ctx.restore();

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    initDroplets(window.innerWidth);
    draw();

    window.addEventListener("resize", resize);
    const ro = new ResizeObserver(resize);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      ro.disconnect();
    };
  }, [generate, initDroplets]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute left-0 top-0 z-0" aria-hidden="true" />;
}
