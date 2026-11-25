window.RX={views:{},nav:[],data:null,KEY:'rescuex_v1'};
RX.seed=()=>({tick:0,strategy:'manual',settings:{theme:'dark',speed:1,random:false},runs:[],log:[],
incidents:[
{id:1,type:'Flood',title:'Riverside district flooding',sev:'High',status:'Reported',x:260,y:380,victims:40,progress:0,team:0,created:0},
{id:2,type:'Fire',title:'Warehouse fire, Industrial Zone',sev:'Critical',status:'Reported',x:700,y:200,victims:15,progress:0,team:0,created:0},
{id:3,type:'Accident',title:'Highway pile-up',sev:'Medium',status:'Reported',x:520,y:90,victims:8,progress:0,team:0,created:0},
{id:4,type:'Earthquake',title:'Aftershock building collapse',sev:'High',status:'Reported',x:820,y:430,victims:25,progress:0,team:0,created:0}],
teams:[
{id:1,name:'Alpha Medic',type:'Medical',members:8,vehicle:'Ambulance',equipment:'Trauma kits',status:'Available',x:500,y:300,incident:0,busy:0},
{id:2,name:'Bravo Fire',type:'Fire',members:12,vehicle:'Fire engine',equipment:'Hoses, foam',status:'Available',x:650,y:260,incident:0,busy:0},
{id:3,name:'Charlie SAR',type:'Search & Rescue',members:10,vehicle:'Rescue truck',equipment:'Cutters, K9',status:'Available',x:800,y:380,incident:0,busy:0},
{id:4,name:'Delta Water',type:'Water Rescue',members:6,vehicle:'Boat',equipment:'Life jackets',status:'Available',x:300,y:420,incident:0,busy:0},
{id:5,name:'Echo Medic',type:'Medical',members:6,vehicle:'Ambulance',equipment:'First aid',status:'Available',x:480,y:150,incident:0,busy:0}],
hospitals:[
{id:1,name:'City General',beds:120,occupied:70,icu:10,doctors:25,medKits:80,x:480,y:280},
{id:2,name:'St. Mary Hospital',beds:80,occupied:40,icu:6,doctors:15,medKits:50,x:780,y:330},
{id:3,name:'Riverside Clinic',beds:40,occupied:20,icu:2,doctors:8,medKits:30,x:200,y:300}],
shelters:[
{id:1,name:'Central School',capacity:300,occupied:20,food:500,water:800,medical:60,status:'Open',x:400,y:450},
{id:2,name:'City Stadium',capacity:800,occupied:50,food:1500,water:2500,medical:120,status:'Open',x:640,y:490},
{id:3,name:'Community Hall',capacity:200,occupied:10,food:300,water:500,medical:30,status:'Open',x:150,y:480}],
resources:[
{id:1,name:'Food packs',cat:'Food',qty:2000,unit:'packs',min:300,used:0},
{id:2,name:'Drinking water',cat:'Water',qty:5000,unit:'L',min:800,used:0},
{id:3,name:'Medicine kits',cat:'Medicine',qty:400,unit:'kits',min:60,used:0},
{id:4,name:'Rescue boats',cat:'Vehicle',qty:6,unit:'units',min:2,used:0},
{id:5,name:'Generators',cat:'Equipment',qty:12,unit:'units',min:3,used:0}],
zones:[
{id:1,name:'Riverside',x:260,y:380,r:70,pop:600,evacuated:0,shelter:2,status:'Planned'},
{id:2,name:'Industrial Zone',x:700,y:200,r:80,pop:250,evacuated:0,shelter:1,status:'Planned'},
{id:3,name:'Hillside',x:820,y:430,r:60,pop:180,evacuated:0,shelter:3,status:'Planned'}]});
RX.norm=o=>{const f=RX.seed(),d=(o&&typeof o==='object'&&!Array.isArray(o))?Object.assign(f,o):RX.seed(),g=RX.seed();['incidents','teams','hospitals','shelters','resources','zones','runs','log'].forEach(k=>{if(!Array.isArray(d[k]))d[k]=g[k]});d.settings=Object.assign(g.settings,d.settings||{});if(typeof d.tick!=='number')d.tick=0;if(!['manual','nearest','severity'].includes(d.strategy))d.strategy='manual';return d};
RX.load=()=>{let o=null;try{o=JSON.parse(localStorage.getItem(RX.KEY))}catch(e){}RX.data=RX.norm(o)};
RX.save=()=>{try{localStorage.setItem(RX.KEY,JSON.stringify(RX.data))}catch(e){}};
RX.reset=()=>{RX.data=RX.seed();RX.save()};
RX.id=a=>a.reduce((m,i)=>Math.max(m,i.id),0)+1;
RX.sum=(a,f)=>a.reduce((s,x)=>s+f(x),0);
RX.exportJSON=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(RX.data,null,2)],{type:'application/json'}));a.download='rescuex-data.json';a.click()};
RX.importJSON=(f,cb)=>{const r=new FileReader();r.onload=()=>{try{const o=JSON.parse(r.result);if(!Array.isArray(o.incidents)||!Array.isArray(o.teams)||!Array.isArray(o.shelters))throw 0;RX.data=RX.norm(o);RX.save();cb(true)}catch(e){cb(false)}};r.readAsText(f)};
