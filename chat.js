// All chat content is simulated locally. No messages or personal data are sent.
function enhanceChats(){
 document.querySelectorAll('.scene').forEach(scene=>{
  if(scene.dataset.chatReady)return;scene.dataset.chatReady='true';scene.classList.add('messenger');
  const header=scene.querySelector('.scenehead'),messages=scene.querySelector('.messages'),choices=scene.querySelector('.choices');
  if(!header||!messages||!choices)return;
  const role=header.querySelector('strong')?.textContent||'聯絡人';
  const status=document.createElement('div');status.className='phone-status';status.innerHTML='<span>19:42</span><span class="chat-island"></span><span>▂▄▆　▰</span>';scene.prepend(status);
  const back=document.createElement('button');back.className='chat-back';back.textContent='‹';back.setAttribute('aria-label','返回情境選單');back.onclick=()=>home();header.prepend(back);
  const icons=document.createElement('span');icons.className='chat-tools';icons.setAttribute('aria-hidden','true');icons.innerHTML='<svg viewBox="0 0 24 24"><path d="M5 3l4 4-2 3c2 4 3 5 7 7l3-2 4 4c-2 5-7 2-11-1S1 6 5 3Z"/></svg><svg viewBox="0 0 24 24"><rect x="2" y="6" width="13" height="12" rx="3"/><path d="m15 10 7-4v12l-7-4"/></svg><span>☰</span>';header.append(icons);
  const banner=document.createElement('div');banner.className='chat-sim-label';banner.textContent='情境模擬聊天室 · 非真實訊息';header.after(banner);
  const original=[...messages.children];messages.replaceChildren();
  const date=document.createElement('div');date.className='chat-date';date.textContent='今天 · 示意時間';messages.append(date);
  let speaker=role,index=0;const rows=[];
  original.forEach(el=>{
   if(el.classList.contains('incoming')){speaker=el.textContent;return}if(!el.classList.contains('bubble'))return;
   if(el.textContent.startsWith('SELLER:'))speaker='Claimed Seller';if(el.textContent.startsWith('CLAIMED BANK SUPPORT:'))speaker='Claimed Bank Support';
   const mine=el.classList.contains('me');const row=document.createElement('div');row.className='chat-row'+(mine?' outgoing':'');row.dataset.role=mine?'self':(/銀行|Bank/.test(speaker)?'bank':/賣|Seller/.test(speaker)?'seller':'support');
   if(!mine){const avatar=document.createElement('div');avatar.className='chat-face';avatar.textContent=speaker.includes('銀行')?'銀':speaker.includes('賣')?'賣':speaker.includes('客服')?'客':'友';row.append(avatar)}
   const body=document.createElement('div');body.className='chat-message';if(!mine){const name=document.createElement('div');name.className='chat-sender';name.textContent=speaker;body.append(name)}
   el.style.animationDelay='0s';body.append(el);row.append(body);
   const time=document.createElement('span');time.className='chat-time';time.innerHTML=(mine?'已讀<br>':'')+'19:'+String(42+Math.floor(index/2)).padStart(2,'0');row.append(time);
   row.hidden=index>0;messages.append(row);rows.push(row);index++;
  });
  let shown=Math.min(1,rows.length);choices.hidden=shown<rows.length;
  const next=document.createElement('div');next.className='chat-playbar';next.innerHTML='<button class="chat-next">繼續對話 <span>↓</span></button><button class="chat-show-all">顯示完整對話</button>';messages.after(next);
  const composer=document.createElement('div');composer.className='chat-composer';composer.innerHTML='<span aria-hidden="true">＋</span><div>從下方選項回覆 <span aria-hidden="true">☺</span></div><span aria-hidden="true">♩</span>';next.after(composer);
  function update(){choices.hidden=shown<rows.length;next.hidden=shown>=rows.length;composer.querySelector('div').firstChild.textContent=shown<rows.length?'點「繼續對話」閱讀訊息 ':'從下方選項回覆 ';}
  next.querySelector('.chat-next').onclick=()=>{if(shown<rows.length){rows[shown].hidden=false;shown++;update();messages.scrollTop=messages.scrollHeight}};
  next.querySelector('.chat-show-all').onclick=()=>{rows.forEach(r=>r.hidden=false);shown=rows.length;update();messages.scrollTop=messages.scrollHeight};
  update();
 });
}
