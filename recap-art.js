function addRecapArt(){
 const en=document.documentElement.lang==='en';
 const rows=[...document.querySelectorAll('.recap .timeline .row')];
 const headings=en?['Shopping becomes an account problem','Pressure, then reassurance','A transfer is called an unlock']:['把購物，變成帳戶問題','一邊催促，一邊安撫','把轉帳，說成解鎖'];
 const assets=['shopping','pressure','transfer'];
 const alts=en?['A bear tote purchase leads to a phone showing a verification warning.','An impatient seller and a reassuring support agent pressure a worried shopper.','Money leaves the phone while the supposed account lock stays closed.']:['小熊帆布袋的購物流程，變成手機上的認證警告。','橘色賣家催促、藍色客服安撫，讓中間的購物者感到壓力。','錢從手機轉出，對方聲稱要解除的鎖卻仍然鎖著。'];
 headings.push(...(en?['Free lowers your guard','A familiar platform name makes the link convincing','Watch what they ask for next']:['免費，降低了防備','熟悉的平台名稱，讓連結看起來可信','留意接下來索取的資料與操作']));
 assets.push('gift-fee','gift-link','gift-data');
 alts.push(...(en?['A free bear tote is paired with a small NT$ 60 shipping fee.','A magnifying glass checks the address of a familiar-looking shop.','A verification warning leads toward card details, chat and screen sharing.']:['免費小熊帆布袋與 60 元運費，提醒小額不等於低風險。','放大鏡檢視仿冒賣場的網址，熟悉配色不代表官方。','認證警告可能接著索取卡片資料、引導客服對話與分享畫面。']));
 rows.forEach(row=>{const i=headings.indexOf(row.querySelector('h3')?.textContent);if(i<0||row.querySelector('.recap-art'))return;row.classList.add('illustrated-row');const figure=document.createElement('figure');figure.className='recap-art';const img=document.createElement('img');img.src=(en?'../':'')+'assets/recap-'+assets[i]+'.svg';img.alt=alts[i];img.width=640;img.height=400;figure.append(img);row.prepend(figure)});
}
