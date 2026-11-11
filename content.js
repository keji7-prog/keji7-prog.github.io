/* Public content for JK's portfolio — no private account or raw listing data. */
window.KEJI_PORTFOLIO = {
  name: 'JK', englishName: 'JK', initials: 'JK',
  headline: 'Data Analysis · Python · Interactive Systems',
  summary: '从真实的数据与业务问题出发，把采集、分析和代码变成可以探索、可以操作的作品。',
  about: '商业信息系统背景，关注数据如何支持判断、流程如何通过自动化改进，以及技术如何转化为直观的用户体验。作品覆盖公开数据分析、浏览器采集、Python 桌面工具与交互式网页应用。',
  github: 'https://github.com/keji7-prog',
  skills: ['Python', 'Pandas', 'DrissionPage', 'JavaScript', 'HTML / CSS', 'REST API', 'Data Visualization', 'GitHub Pages'],
  projects: [
    {id:'opensource',num:'01',category:'data',title:'Open Source Data Explorer',subtitle:'GitHub 开源仓库数据分析',description:'基于 2026-11-10 的 GitHub API 快照，对比 12 个公开仓库的指标、推送时间与分类，并支持筛选和导出。',tags:['Python','GitHub API','Data Visualization'],href:'opensource.html',art:'github',tint:'mint'},
    {id:'housing',num:'02',category:'crawler',title:'Beijing Housing Data Analysis',subtitle:'北京二手房数据采集与分析',description:'从贝壳北京二手房列表页实际采集 30 条、13 个字段的挂牌记录，分析这组样本的户型与价格分布。',tags:['DrissionPage','Pandas','Excel'],href:'housing-case.html',art:'housing',tint:'blue'},
    {id:'csv',num:'03',category:'data',title:'CSV Data Explorer',subtitle:'CSV 数据质量检查与探索工具',description:'使用已采集的 GitHub 公开快照或本地 CSV，完成字段检查、缺失值与重复行分析、筛选及统计报告导出。',tags:['JavaScript','CSV','Charts'],href:'demos/csv-lab.html',art:'csv',tint:'lavender'},
    {id:'tkinter',num:'04',category:'apps',title:'Python Desktop Calculator',subtitle:'Python Tkinter 桌面计算器',description:'通过实际运行的 Tkinter 程序展示基础运算、异常输入处理及已归档的 5 项修订版校验结果。',tags:['Python','Tkinter','GUI'],href:'desktop.html',art:'desktop',tint:'peach'},
    {id:'webcalc',num:'05',category:'apps',title:'Expression Calculator',subtitle:'数学表达式交互计算器',description:'实现无需 eval 的表达式解析、括号和四则运算，支持键盘输入、会话历史与结果复制。',tags:['JavaScript','Parser','UI'],href:'lab.html#calculator',art:'calculator',tint:'mint'},
    {id:'timer',num:'06',category:'apps',title:'Focus Timer',subtitle:'专注学习与倒计时工具',description:'实现预设及自定义倒计时、暂停与重置，并仅在计时真正结束时记录本次会话完成量。',tags:['JavaScript','State','Timer'],href:'lab.html#timer',art:'timer',tint:'blue'},
    {id:'notes',num:'07',category:'apps',title:'Quick Notes',subtitle:'本地便签与记录工具',description:'实现单篇便签的浏览器本地保存、TXT 导入导出，以及字符数和行数即时统计。',tags:['Local Storage','Text','Export'],href:'lab.html#notes',art:'notes',tint:'sand'},
    {id:'cleaner',num:'08',category:'apps',title:'Text & Data Cleaner',subtitle:'文本整理与清洗工具',description:'将用户输入的多行文本去空行、去重并统计关键词，支持忽略大小写与 TXT 导出。',tags:['Text Processing','JavaScript'],href:'lab.html#text',art:'cleaner',tint:'lavender'},
    {id:'cards',num:'09',category:'creative',title:'Random Card Generator',subtitle:'随机卡片生成与统计工具',description:'按页面明示的概率权重生成卡片，统计当前会话的随机结果并导出 CSV；结果不是外部采集数据。',tags:['Random','Interaction','UI'],href:'lab.html#draw',art:'cards',tint:'peach'}
  ]
};