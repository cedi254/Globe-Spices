export function interpolateDestination(stops, progress) {
 const p=Math.max(0,Math.min(stops.length-1,progress));
 const index=Math.floor(p),next=Math.min(stops.length-1,index+1);
 const f=p-index,t=f*f*(3-2*f);
 return [stops[index][0]+(stops[next][0]-stops[index][0])*t,stops[index][1]+(stops[next][1]-stops[index][1])*t];
}
export function chapterState(tops, at) {
 let index=0;
 for(let i=0;i<tops.length;i++)if(at>=tops[i])index=i;
 const fraction=index<tops.length-1?Math.max(0,Math.min(1,(at-tops[index])/(tops[index+1]-tops[index]))):0;
 return {index,progress:index+Math.max(0,(fraction-.62)/.38)};
}
export function journeyProgress(index,total) {
 if(total<=0)return 0;
 const active=Math.max(0,Math.min(total-1,index));
 return Math.round(((active+1)/total)*100);
}
