var Map = {

//seta mismunandi data fyrir mismunandi teg af tile, filler tile
    lvl1 : {map : [
        ['WL1','PL1','EL','L/','0','||ML','0','|#L','#|L','0','||ML','0','L/','ER','PR1','WL1'],
        ['WL2','PL2','EL','L/','0','||ML','0','|#L','#|L','0','||ML','0','L/','ER','PR2','WL2'],
        ['WL3','PL1','EL','L/','!!L','||ML','0','|#L','#|L','0','||ML','//R','L/','ER','PR1','WL3'],
        ['WL4','PL2','EL','L/','XL','OL','_LL','|#L','#|L','_RL','OL','XL','L/','ER','PR2','WL4'],
        ['WL1','PL1','EL','L/','//L','||ML','0','|#L','#|L','0','||ML','!!R','L/','ER','PR1','WL1'],
        ['WL2','PL2','EL','L/','0','||ML','0','|_L','_|L','0','||ML','0','L/','ER','PR2','WL2'],
        ['WL3','PL1','EL','L/','0','||ML','SP1','SP2','SP3','SP4','||ML','0','L/','ER','PR1','WL3'],
        ['WL4','PL2','EL','L/','!!L','||BL','SP5','SP6','SP7','SP8','||BL','//R','L/','ER','PR2','WL4'],
        ['WL1','PL1','EL','MLL','XL','OL','_LL','_MD','_MD','_RL','OL','XL','MRL','ER','PR1','WL1'],
        ['WL2','PL2','EL','MLL','//L','||TL','|-L','-#D','-#D','-|L','||TL','!!R','MRL','ER','PR2','WL2'],
        ['WL3','PL1','EL','MLL','0','||ML','|#L','#L','#L','#|L','||ML','0','MRL','ER','PR1','WL3'],
        ['WL4','PL2','EL','MLL','0','||ML','|#L','#L','#L','#|L','||ML','0','MRL','ER','PR2','WL4'],
        ['WL1','PL1','PL','PM','PM','PR','|#L','#L','#L','#|L','PL','PM','PM','PR','PR1','WL1'],
        ['WL2','PL2','EL','MLD','0','||MD','|#L','#L','#L','#|L','||MD','0','MRD','ER','PR2','WL2'],
        ['WL3','PL1','EL','MLD','!!L','||BD','|_L','_#L','_#L','_|L','||BD','//R','MRD','ER','PR1','WL3'],
        ['WL4','PL2','EL','MLL','XL','OL','_LL','_ML','_ML','_RL','OL','XR','MRL','ER','PR2','WL4'],
        ['WL1','PL1','EL','MLL','//L','||TL','|-L','-#L','-#L','-|L','||TL','!!R','MRL','ER','PR1','WL1'],
        ['WL2','PL2','EL','MLL','0','||ML','|#L','#L','#L','#|L','||ML','0','MRL','ER','PR2','WL2'],
        ['WL3','PL1','EL','MLL','0','||ML','PL','PM','PM','PR','||ML','0','MRL','ER','PR1','WL3'],
        ['WL4','PL2','EL','MLL','0','||ML','|#DL','#L','#L','#|DL','||ML','0','MRL','ER','PR2','WL4'],
        ['WL1','PL1','EL','MLL','0','||ML','|#DL','#L','#L','#|DL','||ML','0','MRL','ER','PR1','WL1'],
        ['WL2','PL2','EL','MLL','!!L','||BL','|_L','_#L','_#L','_|L','||BL','//R','MRL','ER','PR2','WL2'],
        ['WL3','PL1','EL','MLL','XL','OL','_LL','_ML','_ML','_RL','OL','XR','MRL','ER','PR1','WL3'],
        ['WL4','PL2','EL','MLL','//L','||TL','|-L','-#L','-#L','-|L','||TL','!!R','MRL','ER','PR2','WL4'],
        ['WL1','PL1','EL','MLL','0','||ML','|#L','#L','#L','#|L','PL','PM','PM','PR','PR1','WL1'],
        ['WL2','PL2','PL','PM','PM','PR','|#L','#L','#L','#|L','||MD','0','MRD','ER','PR2','WL2'],
        ['WL3','PL1','EL','MLD','0','||MD','|#L','#L','#L','#|L','||MD','0','MRD','ER','PR1','WL3'],
        ['WL4','PL2','EL','MLD','0','||MD','|#L','#L','#L','#|L','||ML','0','MRL','ER','PR2','WL4'],
        ['WL1','PL1','EL','MLL','!!L','||BL','|_L','_#L','_#L','_|L','||BL','//R','MRL','ER','PR1','WL1'],
        ['WL2','PL2','EL','MLL','XL','OL','_LL','_ML','_ML','_RL','OL','XR','MRL','ER','PR2','WL2'],
        ['WL3','PL1','EL','MLL','//L','||TL','|-L','-#L','-#L','-|L','||TL','!!R','MRL','ER','PR1','WL3'],
        ['WL4','PL2','EL','MLL','0','||ML','PL','PM','PM','PR','||ML','0','MRL','ER','PR2','WL4'],
        ['WL1','PL1','EL','MLL','0','||ML','|#DL','#L','#L','#|DL','||ML','0','MRL','ER','PR1','WL1'],
        ['WL2','PL2','EL','MLL','0','||ML','|#DL','#L','#L','#|DL','||ML','0','MRL','ER','PR2','WL2'],
        ['WL3','PL1','EL','MLL','0','||ML','|#L','#L','#L','#|L','||ML','0','MRL','ER','PR1','WL3'],
        ['WL4','PL2','EL','MLL','!!L','||BL','|_L','_#L','_#L','_|L','||BL','//R','MRL','ER','PR2','WL4'],
        ['WL1','PL1','EL','MLL','XL','OL','_LL','_ML','_ML','_RL','OL','XR','MRL','ER','PR1','WL1'],
        ['WL2','PL2','PL','PM','PM','PM','PR','-#L','-#L','-|L','||TL','!!R','MRL','ER','PR2','WL2'],
        ['WL3','PL1','EL','MLL','0','||MD','|#DL','#L','#L','#|L','||ML','0','MR/','D/','ID1','DB1'],
        ['WL4','PL2','EL','MLL','0','||ML','|#DL','#L','#L','#|L','||ML','0','>1','ER','ID2','DB2'],
        ['WL1','PL1','EL','MLL','0','||ML','|#L','#L','#L','#|L','||ML','0','>2','ER','ID3','DB3'],
        ['WL2','PL2','EL','MLL','0','||ML','|#L','#L','#L','#|L','||ML','0','MR/','D/','ID4','DB4'],
        ['WL3','PL1','EL','MLL','0','||ML','|#L','#L','#L','#|DL','||MD','0','GML','GMR','PR1','WL3'],
        ['WL4','PL2','EL','MLD','0','||BD','|#DL','#L','#L','#|DL','GML','GMR','MTL','MTR','PR2','WL4'],
        ['WL1','PL1','GML','GMR','GML','GMR','GML','GMR','GML','GMR','MTL','MTR','MTL','MTR','PR1','WL1'],
        ['WL2','PL2','MTL','MTR','MTL','MTR','MTL','MTR','MTL','MTR','MTL','MTR','MTL','MTR','PR2','WL2'],
        ['WL3','PL1','MTL','MTR','MTL','MTR','MTL','MTR','MTL','MTR','MTL','MTR','MTL','MTR','PR1','WL3'],
        ['WL4','PL2','MTL','MTR','MTL','MTR','MTL','MTR','MTL','MTR','MTL','MTR','MTL','MTR','PR2','WL4'],
        ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#']
    ],

    doors: [{x:896, y:2432, direction:'right'}],
    player: [{x:504, y:300}, {x:892, y:2624}],
    background: 'resrc/bg1.png'},

    lvl2 : {map: [
        ['B','B','B|','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','|B','B','B'],
        ['B','B','B|','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','|B','B','B'],
        ['B','B','B|','TL','TR','TL','TR','TL','TR','TL','TR','TL','TR','TL','TR','TL','TR','TL','TR','TL','TR','TL','TR','TL','TR','TL','TR','TL','TR','|B','B','B'],
        ['B','B','B|','0','0','0','Li1','Li2','Li3','Li4','Li1','Li2','Li3','Li4','Li1','Li2','Li3','Li4','Li1','Li2','Li3','Li4','Li1','Li2','Li3','Li4','0','0','0','|B','B','B'],
        ['B','B','B|','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','|B','B','B'],
        ['B_','B_','B_|','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','B|_','B_','B_'],
        ['DL1','DL5','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','DR1','DR5'],
        ['DL2','DL6','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','DR2','DR6'],
        ['DL3','DL7','rL','tL','!FT','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','/FT','rR','tR','DR3','DR7'],
        ['DL4','DL8','[L','[R','!FB','!FT','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','/FT','/FB',']L',']R','DR4','DR8'],
        ['B-','B-','B-','STL','StTL','!FB','!FT','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','/FT','/FB','StTR','STR','B-','B-','B-'],
        ['B','B','B','B','StBL','StTL','!|F','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','|/F','StTR','StBR','B','B','B','B'],
        ['B','B','B','B','B','StBL','s|','0','0','0','0','#TL','#TR','#TL','#TR','#TL','#TR','#TL','#TR','#TL','#TR','0','0','0','0','|s','StBR','B','B','B','B','B'],
        ['B','B','B','B','B','B','BBsL','B-|','BL','BR','BL','#BL','#BR','#BL','#BR','#BL','#BR','#BL','#BR','#BL','#BR','BR','BL','BR','B|-','BBsR','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B']
    ],

    enemies: [{x:1200, y:500}],
    doors: [{x:64, y:384, direction:'left'}, {x:1920, y:384, direction:'right'}],
    player: [{x:160, y:576}, {x:1824, y:576}],
    background: 'resrc/bg2.png'},

    lvl3 : {map:[
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','Br','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_'],
        ['B','B','B','B|','#D','#D','#D','#D','#D','#D','#|DD','_RD','OD','XR','PR2','*R'],
        ['B','B','B','B|','_#D','_#D','_#D','_#D','_#D','_#D','_|D','-|D','||D','!!R','PR1','*R'],
        ['B_','B_','B_','B_|','0','||D','|#DD','#D','#D','#D','#D','#|DD','||MD','0','PR2','*R'],
        ['DL1','DL5','D/','MR/','0','||ML','|#L','#L','#L','#L','#L','#|L','||BL','//R','PR1','*R'],
        ['DL2','DL6','EL','<1','0','||ML','|#L','#L','#L','#L','#r','_|L','OL','XR','PR2','*R'],
        ['DL3','DL7','EL','<2','!!L','||BL','|#L','#L','#L','#L','#|L','0','0','!!R','PR1','*R'],
        ['DL4','DL8','D/','MR/','XL','OL','|_L','_#L','_#L','_#L','_|L','|-L','-#L','-|L','PR2','*R'],
        ['B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-|','#D','#|L','PR1','*R'],
        ['B','B','B','Br','B_','B_','B_','B_','B_','B_','B_','B_|','#D','#|L','PR2','*R'],
        ['B','B','Br','B_|','|#DD','#D','#|DD','_LD','_MD','_MD','_RD','|_D','_#D','_|L','PR1','*R'],
        ['B_','B_','B_|','-|D','|#DL','#D','#|DD','0','0','/FT','rR','tR','0','0','PR2','*R'],
        ['*L','PL1','#D','#|DL','|#L','#L','#|L','0','/FT','/FB',']L',']R','0','0','PR1','*R'],
        ['*L','PL2','#D','#|L','|#L','#r','_|L','/FT','/FB','StTR','STR','B-','B-','B-','B-','B-'],
        ['*L','PL1','_#L','_|L','|#L','#|L','0','|/F','StTR','StBR','B','B','B','B','B','B'],
        ['*L','PL2','|-L','-#L','-|L','_|L','0','|s','StBR','B','B','B','B','B','B','B'],
        ['*L','PL1','|#L','#D','B|-','B-','B-','BBsR','B','B','B','B','B','B','B','B'],
        ['*L','PL2','|#L','#D','B|_','B_','B_','B_','B_','B_','B_','B_','Bt','B','B','B'],
        ['*L','PL1','|_L','_#D','_|D','_LD','_MD','_RD','OD','|#DD','#D','#|DD','|B','B','B','B'],
        ['*L','PL2','#r','_|L','rL','tL','!FT','0','||TD','|_D','_#D','_|D','B|_','B_','B_','B_'],
        ['*L','PL1','_|L','0','[L','[R','!FB','!FT','OL','_LL','_ML','_RL','MR/','D/','DR1','DR5'],
        ['B-','B-','B-','B-','B-','STL','StTL','!FB','!FT','0','0','0','>1','ER','DR2','DR6'],
        ['B','B','B','B','B','B','StBL','StTL','!|F','0','0','0','>2','ER','DR3','DR7'],
        ['B','B','B','B','B','B','B','StBL','s|','0','0','0','MR/','D/','DR4','DR8'],
        ['B','B','B','B','B','B','B','B','BBsL','B-','B-','B-','B-','B-','B-','B-'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B']
    ],
    doors: [{x:64, y:384, direction:'left'}, {x:896, y:1408, direction:'right'}],
    player: [{x:160, y:576}, {x:864, y:1600}],
    background: 'resrc/bg2.png'},

    lvl4 : {map:[
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B|','0','0','0','0','|B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','Br','B_','B_','B_','B_','B_','B_','B_','B_','B_|','0','0','0','0','B|_','B_','B_','B_','B_','B_','B_','B_','B_','Bt','B','B','B','B'],
        ['B','B','B','B','B|','!!T','XT','//T','!!T','XT','//T','!!T','XT','//T','0','0','0','0','!!T','XT','//T','!!T','XT','//T','!!T','XT','//T','|B','B','B','B','B'],
        ['B','B','B','B','B|','_RD','OD','_LD','_RD','OD','_LD','_RD','OD','_RD','0','0','0','0','_LD','OD','_LD','_RD','OD','_LD','_RD','OD','_LD','|B','B','B','B','B'],
        ['B','B','B','B','B|','|-D','-#D','-#D','-#D','-|D','|-D','-#D','-|D','0','0','0','0','0','0','|-D','-#D','-|D','|-D','-#D','-#D','-#D','-|D','|B','B','B','B','B'],
        ['B_','B_','B_','B_','B_|','|#DD','#D','#D','#D','#|DD','|#DD','#D','#|DD','0','0','0','0','0','0','|#DD','#D','#|DD','|#DD','#D','#D','#D','#|DD','B|_','B_','B_','B_','B_'],
        ['DL1','DL5','0','0','0','|_L','_#L','#t','#L','#|L','|_L','_#L','_|L','0','0','0','0','0','0','|_L','_#L','_|L','|#L','#L','#r','_#L','_|L','0','0','0','DR1','DR5'],
        ['DL2','DL6','0','0','0','0','0','|#L','#L','#|L','0','0','0','0','0','0','0','0','0','0','0','0','|#L','#L','#|L','0','0','0','0','0','DR2','DR6'],
        ['DL3','DL7','rL','tL','!FT','0','0','|_L','_#L','_|L','0','0','0','0','0','0','0','0','0','0','0','0','|_L','_#L','_|L','0','0','/FT','rR','tR','DR3','DR7'],
        ['DL4','DL8','[L','[R','!FB','!FT','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','/FT','/FB',']L',']R','DR4','DR8'],
        ['B-','B-','B-','STL','StTL','!FB','!FT','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','/FT','/FB','StTR','STR','B-','B-','B-'],
        ['B','B','B','B','StBL','StTL','!|F','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','|/F','StTR','StBR','B','B','B','B'],
        ['B','B','B','B','B','StBL','s|','0','0','0','Ts1','Ts2','Ts3','0','0','0','0','0','0','Tb1','Tb2','Tb3','Tb4','0','0','|s','StBR','B','B','B','B','B'],
        ['B','B','B','B','B','B','BBsL','B-','B-','B-','B-','B-','B-','B-|','0col','0col','0col','0col','B|-','B-','B-','B-','B-','B-','B-','BBsR','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B|','0col','0col','0col','0col','|B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B|','0col','0col','0col','0col','|B','B','B','B','B','B','B','B','B','B','B','B','B','B']

    ],
    doors: [{x:64, y:384, direction:'left'}, {x:1920, y:384, direction:'right'}],
    player: [{x:160, y:576}, {x:1824, y:574}],
    background: 'resrc/bg3.png'},

    lvl5 : {map:[
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_','B_'],
        ['DL1','DL5','D/','ML/','|-D','-|D','OD','!!ext3','.ext1','||MD','|-D','-#D','-#D','-#D','-|D','||MD','.ext2','//ext3','OD','|-D','-|D','|-D','-#D','-#D','-|D','||MD','|-D','-|D','MR/','D/','DR1','DR5'],
        ['DL2','DL6','EL','<1','|#L','#|L','||TL','!!ext1','!!L','||BL','|#L','#L','#L','#L','#|L','||BL','//R','!!ext2','||TL','|#L','#|L','|#L','#L','#L','#|L','||BL','|#L','#|L','>1','ER','DR2','DR6'],
        ['DL3','DL7','EL','<2','|#L','#|L','||ML','0','XL','OL','|#L','#L','#L','#L','#|L','OL','XR','0','||ML','|#L','#|L','|#L','#L','#L','#|L','OL','|#L','#|L','>2','ER','DR3','DR7'],
        ['DL4','DL8','D/','ML/','|_L','_|L','||ML','//ext1','//L','||TL','|_L','_#L','_#L','_#L','_|L','||TL','!!R','//ext2','||ML','|_L','_|L','|_L','_#L','_#L','_|L','||TL','|_L','_|L','MR/','D/','DR4','DR8'],
        ['B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-','B-'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
        ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B']
    ],
    doors: [{x:64, y:384, direction:'left'}, {x:1920, y:384, direction:'right'}],
    player: [{x:160, y:576}, {x:1824, y:576}],
    background: 'resrc/bg2.png'},

    lvlBoss : {map:[
        ['*L','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
        ['*L','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
        ['*L','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
        ['*L','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
        ['*L','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
        ['^T','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
        ['BD1','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
        ['BD2','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
        ['BD3','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
        ['BD4','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
        ['^B','#','#','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
        ['*L','#','#','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','*R'],
        ['*L','#','#','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','Blk','^T'],
        ['BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR'],
        ['BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR'],
        ['BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR','BFL','BFR']

    ],
    ridley : true,
    doors: [{x:0, y:384, direction:'left'}],
    player: [{x:96, y:480}],
    background: 'resrc/bg1.png'}
}
