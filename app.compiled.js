// 集寶 — 我的資產 (1:1 復刻 iPhone 15 Pro / 393pt)

const HOLDINGS = [{
  code: '053848',
  name: '亞翔凱基 5B 購 01',
  pct: 22,
  color: '#1F4FAE'
}, {
  code: '3443',
  name: '創意',
  pct: 10,
  color: '#5EE0D4'
}, {
  code: '2313',
  name: '華通',
  pct: 8,
  color: '#CDEAF7'
}, {
  code: '705200',
  name: '加百裕國票 58 購 01',
  pct: 6,
  color: '#1F8A5B'
}, {
  code: '2308',
  name: '台達電',
  pct: 5,
  color: '#5BD17A'
}, {
  code: 'other',
  name: '其他',
  pct: 49,
  color: '#3FA5D4'
}];
function DonutChart({
  size = 154
}) {
  const r = size / 2 - 8;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  let acc = 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, HOLDINGS.map((seg, i) => {
    const len = seg.pct / 100 * circ;
    const dash = `${len} ${circ - len}`;
    const offset = -acc;
    acc += len;
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: c,
      cy: c,
      r: r,
      fill: "none",
      stroke: seg.color,
      strokeWidth: "15",
      strokeDasharray: dash,
      strokeDashoffset: offset
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#222',
      fontWeight: 500,
      marginBottom: 2
    }
  }, "TWD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 700,
      color: '#111',
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: -0.5
    }
  }, "2,158,036")));
}
function HoldingRow({
  item
}) {
  const isOther = item.code === 'other';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '12px 1fr 28px',
      gap: 6,
      alignItems: 'center',
      paddingBottom: isOther ? 0 : 12,
      marginTop: isOther ? 8 : 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 99,
      background: item.color,
      display: 'inline-block',
      alignSelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, !isOther && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#4A8FE4',
      fontWeight: 400,
      fontVariantNumeric: 'tabular-nums',
      lineHeight: '11px',
      marginBottom: 6,
      letterSpacing: -0.3
    }
  }, item.code), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#4A8FE4',
      fontWeight: 400,
      lineHeight: '13px',
      whiteSpace: 'nowrap',
      letterSpacing: -0.3
    }
  }, item.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 400,
      color: '#111',
      fontVariantNumeric: 'tabular-nums',
      alignSelf: 'center',
      textAlign: 'right',
      lineHeight: '13px',
      letterSpacing: -0.3
    }
  }, item.pct, "%"));
}
function PrimaryButton({
  children
}) {
  return /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      height: 50,
      border: 'none',
      borderRadius: 7,
      background: '#5B7FE0',
      color: '#FFFFFF',
      fontSize: 17,
      fontWeight: 500,
      letterSpacing: 0.5,
      cursor: 'pointer',
      fontFamily: 'inherit'
    }
  }, children);
}
function TabIcon({
  name,
  active
}) {
  // All tab icons same visual size — width fits within 26pt box
  const sizes = {
    assets: {
      w: 22,
      h: 22
    },
    equity: {
      w: 23,
      h: 19
    },
    search: {
      w: 22,
      h: 21
    },
    fund: {
      w: 22,
      h: 18
    },
    tisa: {
      w: 26,
      h: 20
    }
  };
  const s = sizes[name] || {
    w: 22,
    h: 22
  };
  return /*#__PURE__*/React.createElement("img", {
    src: `assets/${name}-${active ? 'active' : 'inactive'}.png`,
    width: s.w,
    height: s.h,
    alt: "",
    style: {
      display: 'block'
    }
  });
}
function TabBar({
  fixed = false
}) {
  const tabs = [{
    key: 'assets',
    label: '我的資產',
    active: true
  }, {
    key: 'equity',
    label: '股東權益'
  }, {
    key: 'search',
    label: 'e 搜股'
  }, {
    key: 'fund',
    label: '找基金'
  }, {
    key: 'tisa',
    label: 'TISA'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: fixed ? 'fixed' : 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 'calc(86px + env(safe-area-inset-bottom))',
      paddingBottom: 'env(safe-area-inset-bottom)',
      background: '#1A1A1A',
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 86,
      paddingTop: 6,
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)'
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.key,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(TabIcon, {
    name: t.key,
    active: t.active
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.active ? '#FFFFFF' : '#6B7280',
      fontWeight: t.active ? 500 : 400
    }
  }, t.label)))));
}
function TrendCard() {
  const [range, setRange] = React.useState('1月');
  const ranges = ['1月', '3月', '6月', '1年'];

  // Data points scaled to match 2,158,036 total (in thousands)
  const data = [1800, 1850, 2040, 2130, 2150, 2070, 2090, 2120, 1970, 1950, 2030, 2050, 2050, 2000, 1970, 2010, 2250, 2310, 2130, 2090, 2040, 1970, 1920, 1950, 1950, 1920, 1900, 1940, 1920, 1900, 1880, 1890, 2158];
  const minY = 1000,
    maxY = 2500;
  const W = 320;
  const H = 200;
  const padL = 36,
    padR = 4,
    padT = 8,
    padB = 22;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const xAt = i => padL + i / (data.length - 1) * innerW;
  const yAt = v => padT + (1 - (v - minY) / (maxY - minY)) * innerH;
  let linePath = '';
  data.forEach((v, i) => {
    linePath += (i === 0 ? 'M' : 'L') + xAt(i).toFixed(1) + ',' + yAt(v).toFixed(1) + ' ';
  });
  const areaPath = linePath + `L${xAt(data.length - 1).toFixed(1)},${(padT + innerH).toFixed(1)} L${xAt(0).toFixed(1)},${(padT + innerH).toFixed(1)} Z`;
  const yLabels = [{
    v: 2500,
    label: '2.5M'
  }, {
    v: 2000,
    label: '2.0M'
  }, {
    v: 1500,
    label: '1.5M'
  }, {
    v: 1000,
    label: '1.0M'
  }];
  const xLabels = ['115/04/16', '115/04/22', '115/04/28', '115/05/05', '115/05/11', '115/05/18'];
  const miniH = 30;
  const miniInnerH = miniH - 4;
  const miniW = W;
  let miniLine = '';
  data.forEach((v, i) => {
    const x = i / (data.length - 1) * miniW;
    const y = 2 + (1 - (v - minY) / (maxY - minY)) * miniInnerH;
    miniLine += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' ';
  });
  const miniPath = miniLine + `L${miniW},${miniH} L0,${miniH} Z`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 19,
      background: '#FFFFFF',
      borderRadius: 7,
      padding: '13px 16px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontSize: 19,
      fontWeight: 700,
      color: '#111',
      letterSpacing: 1,
      marginBottom: 15
    }
  }, "\u8B49\u5238\u8CC7\u7522\u8DA8\u52E2\u5716"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 6,
      marginBottom: 18
    }
  }, ranges.map(r => /*#__PURE__*/React.createElement("button", {
    key: r,
    onClick: () => setRange(r),
    style: {
      height: 36,
      border: 'none',
      borderRadius: 8,
      background: r === range ? '#5B7FE0' : '#F1F2F4',
      color: r === range ? '#FFFFFF' : '#5C6A75',
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: 1,
      cursor: 'pointer',
      fontFamily: 'inherit'
    }
  }, r))), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    width: "100%",
    style: {
      display: 'block'
    }
  }, yLabels.map(({
    v,
    label
  }) => {
    const y = yAt(v);
    return /*#__PURE__*/React.createElement("g", {
      key: v
    }, /*#__PURE__*/React.createElement("line", {
      x1: padL,
      y1: y,
      x2: W - padR,
      y2: y,
      stroke: "#ECEEF0",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: padL - 4,
      y: y + 3,
      fontSize: "9",
      fill: "#8B97A1",
      textAnchor: "end",
      fontFamily: "-apple-system, system-ui, sans-serif"
    }, label));
  }), /*#__PURE__*/React.createElement("path", {
    d: areaPath,
    fill: "#7DD3D8",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: linePath,
    fill: "none",
    stroke: "#5BB8BD",
    strokeWidth: "1.3"
  }), xLabels.map((lbl, i) => {
    const x = padL + i / (xLabels.length - 1) * innerW;
    return /*#__PURE__*/React.createElement("text", {
      key: lbl,
      x: x,
      y: H - 6,
      fontSize: "8.5",
      fill: "#8B97A1",
      textAnchor: "middle",
      fontFamily: "-apple-system, system-ui, sans-serif"
    }, lbl);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginTop: 10,
      height: miniH,
      background: '#F8F9FA',
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${miniW} ${miniH}`,
    width: "100%",
    height: miniH,
    style: {
      display: 'block'
    },
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: miniPath,
    fill: "#7DD3D8",
    opacity: "0.6"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 6,
      top: 4,
      bottom: 4,
      width: 5,
      background: '#FFFFFF',
      borderRadius: 2,
      boxShadow: '0 0 0 1px rgba(0,0,0,0.08)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 6,
      top: 4,
      bottom: 4,
      width: 5,
      background: '#FFFFFF',
      borderRadius: 2,
      boxShadow: '0 0 0 1px rgba(0,0,0,0.08)'
    }
  })));
}
function CircleButton({
  children
}) {
  return /*#__PURE__*/React.createElement("button", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 99,
      background: '#BFE0F2',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, children);
}

// Status bar overlay with silent bell, 4G/5G, battery
function StatusOverlay() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 54,
      zIndex: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 26px',
      paddingTop: 19,
      pointerEvents: 'none',
      fontFamily: '-apple-system, "SF Pro", system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      fontWeight: 600,
      fontSize: 17,
      letterSpacing: -0.3
    }
  }, "9:22"), /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 17V11a6 6 0 0 1 10-4.5",
    stroke: "#fff",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18 11v6l1.2 1.6H8",
    stroke: "#fff",
    strokeWidth: "1.6",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 20a2 2 0 0 0 4 0",
    stroke: "#fff",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 4l18 18",
    stroke: "#fff",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "11",
    viewBox: "0 0 18 11"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7",
    width: "3",
    height: "4",
    rx: "0.6",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.5",
    y: "5",
    width: "3",
    height: "6",
    rx: "0.6",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "2.5",
    width: "3",
    height: "8.5",
    rx: "0.6",
    fill: "#fff"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "13.5",
    y: "0",
    width: "3",
    height: "11",
    rx: "0.6",
    fill: "#fff",
    opacity: "0.4"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fff',
      fontWeight: 600,
      fontSize: 13,
      letterSpacing: -0.2
    }
  }, "5G"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 11,
      borderRadius: 3,
      background: '#34C759',
      position: 'relative',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      color: '#fff',
      fontWeight: 700,
      letterSpacing: -0.3,
      display: 'flex',
      alignItems: 'center',
      gap: 1
    }
  }, "63", /*#__PURE__*/React.createElement("svg", {
    width: "4",
    height: "6",
    viewBox: "0 0 4 6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 0L0 3.5h1.5L1 6 4 2.5H2.5L3 0z",
    fill: "#fff"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 2,
      height: 4,
      background: 'rgba(255,255,255,0.7)',
      borderRadius: '0 1px 1px 0'
    }
  }))));
}
function TabBarRow({
  tabs
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: '#111',
      paddingBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      alignItems: 'center'
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.key,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(TabIcon, {
    name: t.key,
    active: t.active
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.active ? '#FFFFFF' : '#6B7280',
      fontWeight: t.active ? 500 : 400
    }
  }, t.label)))));
}
function Screen({
  hideStatus = false
}) {
  const tabs = [{
    key: 'assets',
    label: '我的資產',
    active: true
  }, {
    key: 'equity',
    label: '股東權益'
  }, {
    key: 'search',
    label: 'e 搜股'
  }, {
    key: 'fund',
    label: '找基金'
  }, {
    key: 'tisa',
    label: 'TISA'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'grid',
      gridTemplateRows: 'auto minmax(0, 1fr)',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #1F3A8A 0%, #2456B5 35%, #3F75D0 70%, #6FA3DC 100%)',
      fontFamily: '"PingFang TC", -apple-system, "Noto Sans TC", "Microsoft JhengHei", system-ui, sans-serif',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: hideStatus ? 'env(safe-area-inset-top)' : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: hideStatus ? '12px 16px 14px' : '58px 16px 14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(CircleButton, null, /*#__PURE__*/React.createElement("svg", {
    width: "30",
    height: "30",
    viewBox: "0 0 32 32",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "17",
    r: "11",
    stroke: "#fff",
    strokeWidth: "2",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "14",
    r: "3.6",
    stroke: "#fff",
    strokeWidth: "2",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.5 24.5c1.4-3 4-4.4 7-4.4s5.6 1.4 7 4.4",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "25",
    cy: "7",
    r: "5",
    fill: "#BFE0F2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 3l1.15 2.35 2.6.38-1.88 1.82.45 2.55-2.32-1.22-2.32 1.22.45-2.55-1.88-1.82 2.6-.38z",
    fill: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 500,
      color: '#FFFFFF',
      letterSpacing: 2
    }
  }, "\u6211\u7684\u8CC7\u7522"), /*#__PURE__*/React.createElement(CircleButton, null, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 26 26",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6.5 18V12a6.5 6.5 0 0 1 13 0v6l1.5 2H5L6.5 18z",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinejoin: "round",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 21.5a2 2 0 0 0 4 0",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "13",
    cy: "5",
    r: "1",
    fill: "#fff"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 0,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      padding: '0 10px 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#FFFFFF',
      borderRadius: 7,
      padding: '16px 6px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 15,
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 400,
      color: '#3B82F6',
      letterSpacing: 1,
      lineHeight: 1,
      display: 'inline-block'
    }
  }, "\u8B49\u5238")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: '#ECEEF0',
      margin: '0 10px 13px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 6,
      marginBottom: 14,
      whiteSpace: 'nowrap',
      paddingRight: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: '#5C6A75',
      fontVariantNumeric: 'tabular-nums',
      lineHeight: 1
    }
  }, "115/05/19 17:21 \u66F4\u65B0"), /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9.5",
    stroke: "#0088FE",
    strokeWidth: "2",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "1.2",
    fill: "#0088FE"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 10v8",
    stroke: "#0088FE",
    strokeWidth: "2",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexShrink: 0,
      width: 154
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 600,
      color: '#111',
      letterSpacing: 2,
      marginBottom: 19,
      lineHeight: 1
    }
  }, "\u8B49\u5238"), /*#__PURE__*/React.createElement(DonutChart, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      paddingLeft: 25,
      paddingRight: 6,
      alignSelf: 'flex-start',
      paddingTop: 0
    }
  }, HOLDINGS.map(h => /*#__PURE__*/React.createElement(HoldingRow, {
    key: h.code,
    item: h
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 53,
      padding: '0 25px 18px'
    }
  }, /*#__PURE__*/React.createElement(PrimaryButton, null, "\u67E5\u770B\u8B49\u5238\u5EAB\u5B58\u5206\u4F48"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 19,
      background: '#FFFFFF',
      borderRadius: 7,
      padding: '18px 15px 13px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: '#111',
      letterSpacing: 1,
      marginBottom: 16,
      textAlign: 'center'
    }
  }, "\u9023\u7D50\u9280\u884C\u529F\u80FD"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      lineHeight: 1.55,
      color: '#111',
      marginBottom: 8,
      padding: '0 16px',
      letterSpacing: -0.3
    }
  }, "\u5B8C\u6210\u9280\u884C\u9023\u7D50\u5373\u53EF\u4E00\u7AD9\u5F0F\u67E5\u8A62\u5404\u5408\u4F5C\u9280\u884C\u4E4B\u9918\u984D\u53CA\u4EA4\u6613\u660E\u7D30!"), /*#__PURE__*/React.createElement(PrimaryButton, null, "\u958B\u59CB\u9023\u7D50\u9280\u884C")), /*#__PURE__*/React.createElement(TrendCard, null)), /*#__PURE__*/React.createElement(TabBarRow, {
    tabs: tabs
  }), !hideStatus && /*#__PURE__*/React.createElement(StatusOverlay, null));
}
function App() {
  // Check if running in mobile mode (?mobile=1) — fill viewport without device frame
  const isMobile = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('mobile') === '1';
  if (isMobile) {
    return /*#__PURE__*/React.createElement("div", {
      className: "app-shell-mobile"
    }, /*#__PURE__*/React.createElement(Screen, {
      hideStatus: true
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: '#EEF0EE',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px 0'
    }
  }, /*#__PURE__*/React.createElement(IOSDevice, {
    width: 393,
    height: 852,
    dark: true,
    hideStatusBar: true
  }, /*#__PURE__*/React.createElement(Screen, null)));
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(App, null));
