/* 单一数据源。静态 HTML 由 scripts/build-static.cjs 同步。 */
window.CAO_DATA = {
  version: "2026-10-29",
  plants: [
    { id: "bidens", name: "三叶鬼针草", latin: "Bidens pilosa", image: "assets/images/plants/bidens.webp", position: 3, ingredientId: "bidens-extract", description: "插画标注为「鬼针草」，配方记录使用「三叶鬼针草提取物」。从植物名，找到成分表里的对应项。" },
    { id: "acmella", name: "千日菊", latin: "Acmella oleracea", image: "assets/images/plants/acmella.webp", position: 5, ingredientId: "acmella-extract", description: "一朵黄色小花，也有一个专业的配方名称。点击卡片，看千日菊如何出现在这瓶精华的成分表中。" },
    { id: "rhodiola", name: "红景天", latin: "Rhodiola rosea", image: "assets/images/plants/rhodiola.webp", position: 9, ingredientId: "rhodiola-extract", description: "包装插画之外，还有值得读懂的名字。红景天提取物，出现在这份配方记录的第 9 项。" }
  ],
  sources: {
    formula: { label: "S01 · 草肤荟公众号发布的配方记录与包装照片", url: "assets/images/serum/package.webp" },
    butylene: { label: "S04 · COSMILE Europe：Butylene Glycol", url: "https://cosmileeurope.eu/inci/detail/2015/butylene-glycol/" },
    ectoin: { label: "S05 · COSMILE Europe：Ectoin", url: "https://cosmileeurope.eu/inci/detail/5191/ectoin/" },
    panthenol: { label: "S06 · COSMILE Europe：Panthenol", url: "https://cosmileeurope.eu/inci/detail/10243/panthenol/" },
    hyaluronate: { label: "S07 · COSMILE Europe：Sodium Hyaluronate", url: "https://cosmileeurope.eu/inci/detail/14809/sodium-hyaluronate/" },
    hexanediol: { label: "S08 · COSMILE Europe：1,2-Hexanediol", url: "https://cosmileeurope.eu/inci/detail/5/1-2-hexanediol/" }
  },
  ingredients: [
    { id: "water", name: "水", labelName: "水", english: "Water", position: 1 },
    { id: "butylene-glycol", name: "丁二醇", labelName: "丁二醇", english: "Butylene Glycol", position: 2, featured: true, type: "hydration", alias: "保湿剂 · 溶剂", role: "帮助保留水分、溶解其他成分", plain: "读到「醇」字，不必马上联想到酒精。丁二醇是另一种物质，常在化妆品中承担保湿和溶剂角色。", evidence: "这里解释的是成分的一般用途。不能从名称判断本配方中它的具体浓度、来源工艺或最终使用效果。", source: "butylene" },
    { id: "bidens-extract", name: "三叶鬼针草提取物", labelName: "三叶鬼针草（BIDENS PILOSA）提取物", english: "Bidens Pilosa Extract", position: 3, featured: true, type: "plant", alias: "植物提取物", role: "配方记录中的植物来源成分", plantId: "bidens", plain: "植物的名字与成分的名字，只差了「提取物」三个字。它说明这项原料与三叶鬼针草有关，并不表示把整株植物直接放进瓶子。", evidence: "中文名称、拉丁名和序位来自草肤荟公众号发布的配方记录。资料没有给出提取部位、提取工艺或浓度，本页不作补充推断。", source: "formula" },
    { id: "ectoin", name: "四氢甲基嘧啶羧酸", labelName: "四氢甲基嘧啶羧酸", english: "Ectoin", position: 4, featured: true, type: "hydration", alias: "依克多因 · 皮肤调理", role: "皮肤调理类成分", plain: "长名字，也可以有熟悉的叫法。四氢甲基嘧啶羧酸常被称为「依克多因」，英文名称是 Ectoin。", evidence: "COSMILE Europe 将 Ectoin 归为皮肤调理成分。这是成分分类，不是这瓶精华的修护或人群适用性检测结果。", source: "ectoin" },
    { id: "acmella-extract", name: "千日菊提取物", labelName: "千日菊（ACMELLA OLERACEA）提取物", english: "Acmella Oleracea Extract", position: 5, featured: true, type: "plant", alias: "植物提取物", role: "配方记录中的植物来源成分", plantId: "acmella", plain: "从插画里的千日菊，到成分表里的 Acmella Oleracea Extract，中文名与拉丁名构成了一组可以相互核对的线索。", evidence: "配方记录确认了名称和第 5 项的位置。插画为草肤荟公众号发布的品牌视觉素材，并非植物鉴定图；不据此推导提取部位或产品功效。", source: "formula" },
    { id: "ergothioneine", name: "麦角硫因", labelName: "麦角硫因", english: "Ergothioneine", position: 6 },
    { id: "alpha-arbutin", name: "α-熊果苷", labelName: "α-熊果苷", english: "Alpha-Arbutin", position: 7 },
    { id: "panthenol", name: "泛醇", labelName: "泛醇", english: "Panthenol", position: 8, featured: true, type: "hydration", alias: "维生素 B5 前体", role: "皮肤调理类成分", plain: "常听到的「B5」与它有关。泛醇属于维生素 B5 的前体，常被称作「维生素原 B5」，不宜直接把两者画等号。", evidence: "名称关系和分类参考 COSMILE Europe。该资料讲的是原料，不提供草肤荟产品的人体功效或安全性结论。", source: "panthenol" },
    { id: "rhodiola-extract", name: "红景天提取物", labelName: "红景天（RHODIOLA ROSEA）提取物", english: "Rhodiola Rosea Extract", position: 9, featured: true, type: "plant", alias: "植物提取物", role: "配方记录中的植物来源成分", plantId: "rhodiola", plain: "红景天是植物名，「红景天提取物」是这里的配方名称。把两者对应起来，是读懂草本成分表的第一步。", evidence: "第 9 项表示本份记录中的列示位置，不是含量百分比。未提供提取部位、工艺与浓度；不把植物相关研究当作本产品效果。", source: "formula" },
    { id: "matsutake", name: "松口蘑提取物", labelName: "松口蘑（TRICHOLOMA MATSUTAKE）提取物", english: "Tricholoma Matsutake Extract", position: 10 },
    { id: "white-truffle", name: "白松露菌提取物", labelName: "白松露菌（TUBER MAGNATUM）提取物", english: "Tuber Magnatum Extract", position: 11 },
    { id: "sodium-hyaluronate", name: "透明质酸钠", labelName: "透明质酸钠", english: "Sodium Hyaluronate", position: 12, featured: true, type: "hydration", alias: "透明质酸的钠盐", role: "保湿类成分", plain: "这是透明质酸的钠盐。理解「钠」这个后缀，能把常见的护肤词汇和成分表上的正式名称联系起来。", evidence: "COSMILE Europe 收录了它的保湿和皮肤调理功能。最终产品的使用感受和效果还受到整体配方等因素影响。", source: "hyaluronate" },
    { id: "hexanediol", name: "1,2-己二醇", labelName: "1,2-己二醇", english: "1,2-Hexanediol", position: 13, featured: true, type: "other", alias: "溶剂 · 皮肤调理", role: "溶剂、皮肤调理类成分", plain: "一项原料可以有不止一个配方角色。1,2-己二醇可用作溶剂和皮肤调理成分；了解一般用途，比单看名字判断好坏更有帮助。", evidence: "COSMILE Europe 提供一般功能分类。配方第 14 项还列有对羟基苯乙酮，但仅凭这两个名称，不能确认本产品的完整防腐体系、稳定性或安全性。", source: "hexanediol" },
    { id: "hydroxyacetophenone", name: "对羟基苯乙酮", labelName: "对羟基苯乙酮", english: "Hydroxyacetophenone", position: 14 },
    { id: "dipotassium-glycyrrhizate", name: "甘草酸二钾", labelName: "甘草酸二钾", english: "Dipotassium Glycyrrhizate", position: 15 },
    { id: "tremella", name: "银耳提取物", labelName: "银耳（TREMELLA FUCIFORMIS）提取物", english: "Tremella Fuciformis Extract", position: 16 }
  ],
  traceIngredients: ["黄芩（SCUTELLARIA BAICALENSIS）根提取物", "黑孢块菌（TUBER MELANOSPORUM）提取物", "麦冬（OPHIOPOGON JAPONICUS）根提取物", "薰衣草（LAVANDULA ANGUSTIFOLIA）花提取物", "姜黄（CURCUMA LONGA）根提取物", "精氨酸", "葡萄柚（CITRUS PARADISI）果提取物", "柑橘（CITRUS RETICULATA）果提取物", "绣球菌（SPARASSIS CRISPA）提取物", "冬虫夏草（CORDYCEPS SINENSIS）提取物", "矢车菊（CENTAUREA CYANUS）花提取物", "栀子（GARDENIA FLORIDA）提取物", "桂花（OSMANTHUS FRAGRANS）花提取物", "拟石花菜（GELIDIELLA ACEROSA）提取物", "玫瑰（ROSA RUGOSA）花提取物", "檀香（SANTALUM ALBUM）木提取物", "尿囊素"]
};
