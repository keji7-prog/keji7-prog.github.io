/* Public content for Keji Yin's portfolio — no private account or raw listing data. */
window.KEJI_PORTFOLIO = {
  name: '尹可济', englishName: 'Keji Yin', initials: 'KJ',
  headline: 'Data Analysis · Python · Interactive Systems',
  summary: '从真实的数据与业务问题出发，把采集、分析和代码变成可以探索、可以操作的作品。',
  about: '商业信息系统背景，关注数据如何支持判断、流程如何通过自动化改进，以及技术如何转化为直观的用户体验。作品覆盖公开数据分析、浏览器采集、Python 桌面工具与交互式网页应用。',
  github: 'https://github.com/keji7-prog',
  skills: ['Python', 'Pandas', 'DrissionPage', 'JavaScript', 'HTML / CSS', 'REST API', 'Data Visualization', 'GitHub Pages'],
  projects: [
    {id:'opensource',num:'01',category:'data',title:'Open Source Data Explorer',subtitle:'开源项目指标分析',description:'分析 12 个真实 GitHub 开源仓库的公开快照，可筛选、并排比较指标并导出数据。',tags:['Python','GitHub API','Data Visualization'],href:'opensource.html',art:'github',tint:'mint'},
    {id:'housing',num:'02',category:'crawler',title:'北京二手房数据采集',subtitle:'Browser-based Data Collection',description:'浏览器采集 30 条北京房源记录，分析户型、挂牌价格区间与面积，并导出汇总。',tags:['DrissionPage','Pandas','Excel'],href:'housing-case.html',art:'housing',tint:'blue'},
    {id:'csv',num:'03',category:'data',title:'CSV Data Explorer',subtitle:'交互式数据处理工具',description:'导入真实 CSV 或公开 API 数据，检查空值与重复、验证列结构、查看统计并导出筛选结果。',tags:['JavaScript','CSV','Charts'],href:'demos/csv-lab.html',art:'csv',tint:'lavender'},
    {id:'tkinter',num:'04',category:'apps',title:'Python Desktop Calculator',subtitle:'桌面计算器',description:'Python Tkinter 桌面计算器，展示实际运行界面、核心运算及由程序记录读取的验证结果。',tags:['Python','Tkinter','GUI'],href:'desktop.html',art:'desktop',tint:'peach'},
    {id:'webcalc',num:'05',category:'apps',title:'Expression Calculator',subtitle:'在线表达式计算器',description:'自定义表达式解析器，支持括号和四则运算、键盘输入、计算历史与复制结果。',tags:['JavaScript','Parser','UI'],href:'lab.html#calculator',art:'calculator',tint:'mint'},
    {id:'timer',num:'06',category:'apps',title:'Focus Timer',subtitle:'专注与休息计时器',description:'可选预设或自定义时长，支持暂停、继续、重置，以及已完成计时次数统计。',tags:['JavaScript','State','Timer'],href:'lab.html#timer',art:'timer',tint:'blue'},
    {id:'notes',num:'07',category:'apps',title:'Quick Notes',subtitle:'浏览器便签工具',description:'本地保存单篇便签，支持 TXT 导入导出，并实时显示字符数和行数。',tags:['Local Storage','Text','Export'],href:'lab.html#notes',art:'notes',tint:'sand'},
    {id:'cleaner',num:'08',category:'apps',title:'Text & Data Cleaner',subtitle:'文本清洗工具',description:'多行文本去重、去空行、可选忽略大小写和关键词统计，支持 TXT 导出。',tags:['Text Processing','JavaScript'],href:'lab.html#text',art:'cleaner',tint:'lavender'},
    {id:'cards',num:'09',category:'creative',title:'Random Card Generator',subtitle:'随机卡片互动程序',description:'按明示概率随机生成卡片，统计当前会话的实际结果并可导出 CSV。',tags:['Random','Interaction','UI'],href:'lab.html#draw',art:'cards',tint:'peach'}
  ]
};