/* Public content for Keji Yin's portfolio — no private account or raw listing data. */
window.KEJI_PORTFOLIO = {
  name: '尹可济', englishName: 'Keji Yin', initials: 'KJ',
  headline: 'Data Analysis · Python · Interactive Systems',
  summary: '从真实的数据与业务问题出发，把采集、分析和代码变成可以探索、可以操作的作品。',
  about: '商业信息系统背景，关注数据如何支持判断、流程如何通过自动化改进，以及技术如何转化为直观的用户体验。作品覆盖公开数据分析、浏览器采集、Python 桌面工具与交互式网页应用。',
  github: 'https://github.com/keji7-prog',
  skills: ['Python', 'Pandas', 'DrissionPage', 'JavaScript', 'HTML / CSS', 'REST API', 'Data Visualization', 'GitHub Pages'],
  projects: [
    {id:'opensource',num:'01',category:'data',title:'Open Source Data Explorer',subtitle:'开源项目指标分析',description:'获取 12 个真实开源仓库的公开指标，以图表、筛选和排序探索 Python 生态。',tags:['Python','GitHub API','Data Visualization'],href:'opensource.html',art:'github',tint:'mint'},
    {id:'housing',num:'02',category:'crawler',title:'北京二手房数据采集',subtitle:'Browser-based Data Collection',description:'使用 Chromium 浏览器提取真实列表信息，完成 30 条房源记录的结构化处理和汇总分析。',tags:['DrissionPage','Pandas','Excel'],href:'housing-case.html',art:'housing',tint:'blue'},
    {id:'csv',num:'03',category:'data',title:'CSV Data Explorer',subtitle:'交互式数据处理工具',description:'导入自己的 CSV 或加载 GitHub 公开数据，自动查看字段、数据表和数值分布。',tags:['JavaScript','CSV','Charts'],href:'demos/csv-lab.html',art:'csv',tint:'lavender'},
    {id:'tkinter',num:'04',category:'apps',title:'Python Desktop Calculator',subtitle:'桌面计算器',description:'采用 Tkinter 开发的桌面运算工具，支持四则运算、平方、平方根、百分比与表达式校验。',tags:['Python','Tkinter','GUI'],href:'desktop.html',art:'desktop',tint:'peach'},
    {id:'webcalc',num:'05',category:'apps',title:'Expression Calculator',subtitle:'在线表达式计算器',description:'无需安装即可执行括号和四则运算，使用自定义解析器处理表达式。',tags:['JavaScript','Parser','UI'],href:'lab.html#calculator',art:'calculator',tint:'mint'},
    {id:'timer',num:'06',category:'apps',title:'Focus Timer',subtitle:'专注与休息计时器',description:'可在专注和休息模式之间切换，支持开始、暂停、重置与进度反馈。',tags:['JavaScript','State','Timer'],href:'lab.html#timer',art:'timer',tint:'blue'},
    {id:'notes',num:'07',category:'apps',title:'Quick Notes',subtitle:'浏览器便签工具',description:'即时编辑、浏览器本地保存与 TXT 导出，无需登录即可使用。',tags:['Local Storage','Text','Export'],href:'lab.html#notes',art:'notes',tint:'sand'},
    {id:'cleaner',num:'08',category:'apps',title:'Text & Data Cleaner',subtitle:'文本清洗工具',description:'按行去重、清除空行、统计关键词出现次数，并导出整理结果。',tags:['Text Processing','JavaScript'],href:'lab.html#text',art:'cleaner',tint:'lavender'},
    {id:'cards',num:'09',category:'creative',title:'Random Card Generator',subtitle:'随机卡片互动程序',description:'使用加权随机规则生成卡片，提供连续抽取、结果记录与统计。',tags:['Random','Interaction','UI'],href:'lab.html#draw',art:'cards',tint:'peach'}
  ]
};