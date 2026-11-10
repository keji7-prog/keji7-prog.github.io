const PROJECTS = [
  {
    "id": "open",
    "cat": "data",
    "kind": "公开数据项目",
    "title": "Open Source Data Explorer",
    "desc": "基于 GitHub REST API 获取 12 个开源项目的公开指标，支持多维统计、筛选、排序与仓库溯源。",
    "href": "opensource.html",
    "label": "探索数据",
    "tags": [
      "Python",
      "GitHub API",
      "Data Analysis"
    ],
    "symbol": "API",
    "bg": "#1b5044"
  },
  {
    "id": "beike",
    "cat": "crawler",
    "kind": "真实网页采集",
    "title": "北京房源信息采集",
    "desc": "在本地 Chromium 环境读取真实房源列表，解析 30 条记录并导出 Excel 和 CSV。完整数据存放于授权访问的私有仓库。",
    "href": "https://github.com/keji7-prog/beike-housing-project",
    "label": "查看私有项目",
    "tags": [
      "DrissionPage",
      "Pandas",
      "Excel"
    ],
    "symbol": "30",
    "bg": "#26475e",
    "external": true
  },
  {
    "id": "csv",
    "cat": "data",
    "kind": "交互数据工具",
    "title": "CSV Data Explorer",
    "desc": "直接读取真实 CSV 或加载 GitHub 公开项目数据，识别字段、分析数值分布并生成可视化表格。",
    "href": "demos/csv-lab.html",
    "label": "打开 CSV 工具",
    "tags": [
      "JavaScript",
      "CSV",
      "Visualization"
    ],
    "symbol": "CSV",
    "bg": "#243e61"
  },
  {
    "id": "desktop",
    "cat": "desktop",
    "kind": "已运行应用",
    "title": "Tkinter Calculator",
    "desc": "Python 桌面计算器的实际运行界面、运算功能与源码，支持表达式解析和输入校验。",
    "href": "desktop.html",
    "label": "查看程序",
    "tags": [
      "Python",
      "Tkinter",
      "AST"
    ],
    "symbol": "⌗",
    "bg": "#53436a"
  },
  {
    "id": "math",
    "cat": "web",
    "kind": "在线应用",
    "title": "表达式计算器",
    "desc": "支持括号、四则运算与历史结果；浏览器中运行自定义表达式解析器。",
    "href": "lab.html#calculator",
    "label": "立即使用",
    "tags": [
      "Algorithms",
      "JavaScript"
    ],
    "symbol": "÷",
    "bg": "#46556e"
  },
  {
    "id": "timer",
    "cat": "web",
    "kind": "在线应用",
    "title": "Focus Timer",
    "desc": "可切换专注与休息时长的计时工具，支持暂停、继续、重置和实时进度。",
    "href": "lab.html#timer",
    "label": "开始计时",
    "tags": [
      "Timer",
      "State"
    ],
    "symbol": "25:00",
    "bg": "#3d5d53"
  },
  {
    "id": "notes",
    "cat": "web",
    "kind": "在线应用",
    "title": "Quick Notes",
    "desc": "即写即存的浏览器便签，支持本地保存、文本编辑和 TXT 导出。",
    "href": "lab.html#notes",
    "label": "打开便签",
    "tags": [
      "LocalStorage",
      "Export"
    ],
    "symbol": "✎",
    "bg": "#5b4a39"
  },
  {
    "id": "text",
    "cat": "web",
    "kind": "在线应用",
    "title": "Text & Data Cleaner",
    "desc": "对实际输入文本执行去重、去空行、关键词统计和文件下载。",
    "href": "lab.html#text",
    "label": "处理文本",
    "tags": [
      "Text",
      "Cleaning"
    ],
    "symbol": "TXT",
    "bg": "#284857"
  },
  {
    "id": "draw",
    "cat": "web",
    "kind": "互动程序",
    "title": "Random Card Generator",
    "desc": "可交互随机卡片程序，支持概率权重、连续抽取与本次结果统计。",
    "href": "lab.html#draw",
    "label": "运行程序",
    "tags": [
      "Random",
      "State",
      "UI"
    ],
    "symbol": "✦",
    "bg": "#59485d"
  },
  {
    "id": "api",
    "cat": "code",
    "kind": "数据采集脚本",
    "title": "GitHub API Collector",
    "desc": "Python 脚本调用官方公开 API，记录项目名称、星标、Fork、语言和更新时间。",
    "href": "code.html?path=scripts/collect_github_repos.py",
    "label": "查看源代码",
    "tags": [
      "Python",
      "REST",
      "JSON"
    ],
    "symbol": "</>",
    "bg": "#355465"
  },
  {
    "id": "analysis",
    "cat": "code",
    "kind": "分析脚本",
    "title": "Repository Metrics Analysis",
    "desc": "使用 Python 对真实公开数据执行指标汇总、分组统计与结果导出。",
    "href": "code.html?path=scripts/analyze_github_repos.py",
    "label": "查看源代码",
    "tags": [
      "Python",
      "Statistics",
      "JSON"
    ],
    "symbol": "∑",
    "bg": "#455669"
  }
];
const FILTERS=[['all','全部项目'],['data','数据应用'],['crawler','网页采集'],['web','在线工具'],['desktop','桌面应用'],['code','Python 源码']];
const grid=document.getElementById('project-grid'),filters=document.getElementById('filters');let active='all';
if(grid&&filters){function render(){filters.innerHTML=FILTERS.map(([id,label])=>`<button type="button" class="filter ${active===id?'active':''}" data-filter="${id}">${label}</button>`).join('');const rows=PROJECTS.filter(p=>active==='all'||p.cat===active);grid.innerHTML=rows.map(p=>`<a class="project-card" href="${p.href}" ${p.external?'target="_blank" rel="noopener"':''} aria-label="${p.title}"><div class="project-art" style="--art-bg:${p.bg}"><span class="tiny-corner">${p.kind}</span><span class="symbol">${p.symbol}</span><span class="number">${String(PROJECTS.indexOf(p)+1).padStart(2,'0')}</span></div><div class="project-info"><div class="project-meta"><span>${p.cat.toUpperCase()}</span><span>VIEW ↗</span></div><h3>${p.title}</h3><p>${p.desc}</p><div class="tagline">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><div class="project-view"><span>${p.label}</span><span>↗</span></div></div></a>`).join('');const msg=document.getElementById('project-count');if(msg)msg.textContent=`显示 ${rows.length} / ${PROJECTS.length} 个项目`;}
filters.addEventListener('click',e=>{const b=e.target.closest('button[data-filter]');if(!b)return;active=b.dataset.filter;render()});render();}
