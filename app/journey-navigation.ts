import {products} from './products';
export function journeyOffset(){
 const stage=document.querySelector<HTMLElement>('.globe-stage');
 return innerWidth<760?(stage?.getBoundingClientRect().height??250)+20:80;
}
export function jumpToCountry(index:number){
 const chapter=document.getElementById(products[index].id);
 if(!chapter)return;
 const top=chapter.getBoundingClientRect().top+scrollY-journeyOffset();
 window.scrollTo({top,behavior:'instant'});
 history.replaceState(null,'',`#${products[index].id}`);
 chapter.focus({preventScroll:true});
}
