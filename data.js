window.CAO_DATA = {
  plants: [
    {
      id: "rhodiola",
      name: "红景天",
      latin: "Rhodiola rosea",
      family: "景天科 / 示例标本",
      part: "植物来源待核验",
      code: "HERB-001",
      short: "用植物卡展示来源、提取物与配方关系。正式版需替换为老师确认的植物资料。",
      ingredientId: "rhodiola-extract",
      specimen: "stem"
    },
    {
      id: "acmella",
      name: "千日菊",
      latin: "Acmella oleracea",
      family: "菊科 / 示例标本",
      part: "植物来源待核验",
      code: "HERB-002",
      short: "用通俗语言说明植物名称与化妆品成分名称之间的关系，不直接推导产品功效。",
      ingredientId: "acmella-extract",
      specimen: "flower"
    },
    {
      id: "bidens",
      name: "三叶鬼针草",
      latin: "Bidens pilosa",
      family: "菊科 / 示例标本",
      part: "植物来源待核验",
      code: "HERB-003",
      short: "作为第三张标本卡，验证植物图鉴与产品成分表之间的双向入口。",
      ingredientId: "bidens-extract",
      specimen: "leaf"
    }
  ],
  ingredients: [
    {
      id: "bidens-extract",
      name: "三叶鬼针草提取物",
      english: "Bidens Pilosa Extract",
      alias: "植物提取物",
      position: 3,
      type: "plant",
      role: "植物来源成分",
      origin: "植物来源（示例）",
      plantId: "bidens",
      plain: "这是一个植物提取物名称示例。正式版只描述来源与配方角色，不把研究结果直接写成产品功效。",
      evidence: "示例阶段不作功效宣称。正式版需要补充植物资料、成分命名来源、证据等级和访问日期。"
    },
    {
      id: "butylene-glycol",
      name: "丁二醇",
      english: "Butylene Glycol",
      alias: "保湿类 / 溶剂",
      position: 2,
      type: "hydration",
      role: "溶剂 · 保湿",
      origin: "化妆品配方常见成分（示例）",
      plantId: null,
      plain: "一个看起来像化学术语的名字，常被用于解释配方中的溶剂和保湿角色。",
      evidence: "正式版需依据老师指定的配方与权威成分资料核对中文名、英文名和功能分类。"
    },
    {
      id: "ectoin",
      name: "四氢甲基嘧啶羧酸",
      english: "Ectoin",
      alias: "依克多因",
      position: 4,
      type: "hydration",
      role: "保湿类示例",
      origin: "成分名称示例",
      plantId: null,
      plain: "先用 INCI 名称与常见俗名对照，帮助用户降低阅读成分表的门槛。",
      evidence: "正式版需补充成分数据库来源，并明确证据等级，不把体外或动物研究等同于人体效果。"
    },
    {
      id: "rhodiola-extract",
      name: "红景天提取物",
      english: "Rhodiola Rosea Extract",
      alias: "植物提取物",
      position: 9,
      type: "plant",
      role: "植物来源成分",
      origin: "植物来源（示例）",
      plantId: "rhodiola",
      plain: "从植物卡进入这里，可以看到植物名称、成分名称与产品配方之间的关联。",
      evidence: "正式版需使用老师确认的植物资料和研究来源，并把证据类型写清楚。"
    },
    {
      id: "panthenol",
      name: "泛醇",
      english: "Panthenol",
      alias: "维生素 B5",
      position: 8,
      type: "hydration",
      role: "保湿 · 舒缓示例",
      origin: "成分名称示例",
      plantId: null,
      plain: "泛醇是常见的成分名称示例，可用来演示“专业名词—通俗解释—配方角色”的三层信息结构。",
      evidence: "正式版应补充权威成分资料和访问日期；页面不作任何治疗、修复或功效承诺。"
    },
    {
      id: "sodium-hyaluronate",
      name: "透明质酸钠",
      english: "Sodium Hyaluronate",
      alias: "保湿类",
      position: 12,
      type: "hydration",
      role: "保湿类示例",
      origin: "成分名称示例",
      plantId: null,
      plain: "用一个大众较熟悉的名称做对照，让用户理解“知道名字”与“读懂配方角色”之间的差别。",
      evidence: "正式版需以老师提供的参考配方和可靠资料逐项核对。"
    },
    {
      id: "hexanediol",
      name: "1,2-己二醇",
      english: "1,2-Hexanediol",
      alias: "保湿类 / 溶剂",
      position: 13,
      type: "other",
      role: "保湿 · 溶剂示例",
      origin: "成分名称示例",
      plantId: null,
      plain: "用来演示如何拆解较长的成分名称，并把它放回完整配方语境中理解。",
      evidence: "正式版需要补充功能分类与资料出处，避免把“化学名”简单等同于好或坏。"
    },
    {
      id: "acmella-extract",
      name: "千日菊提取物",
      english: "Acmella Oleracea Extract",
      alias: "植物提取物",
      position: 5,
      type: "plant",
      role: "植物来源成分",
      origin: "植物来源（示例）",
      plantId: "acmella",
      plain: "植物图鉴与配方卡共享这一条数据，避免同一成分在不同页面出现互相矛盾的解释。",
      evidence: "正式版需核验植物中文名、拉丁学名、提取部位与研究来源。"
    }
  ]
};
