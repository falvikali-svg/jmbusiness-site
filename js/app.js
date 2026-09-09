const C=window.JM_CONFIG;
const services=SERVICES.filter(s=>s.active!==false);
const products=PRODUCTS.filter(p=>p.active!==false);

// Les services ne sont plus gérés dans le panier : ils font l'objet d'une demande de devis.
// On nettoie aussi d'anciens services éventuellement conservés dans le localStorage.
let cart=JSON.parse(localStorage.getItem("jm_cart")||"[]")
  .map(i=>({type:"product",id:Number(i.id),qty:Math.max(1,Number(i.qty)||1)}))
  .filter(i=>Number.isFinite(i.id)&&products.some(p=>p.id===i.id));
let activeCategory="Tous";
let selectedService=null;
const money=n=>`${Number(n||0).toLocaleString("fr-FR")} ${C.currency}`;
const wa=m=>`https://wa.me/${C.whatsappNumber}?text=${encodeURIComponent(m)}`;
const toast=m=>{let t=document.querySelector("#toast");if(!t)return;t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)};

function renderServices(){
  document.querySelector("#services-grid").innerHTML=services.map((s,n)=>`<article class="service-card">
    <div class="service-top"><div class="service-icon"><img src="${s.image}" alt="${s.name}" loading="lazy" onerror="this.style.display='none'">${s.icon}</div>
    <div class="service-price">${s.priceText||money(s.price)} <small>${s.priceText?"":s.unit}</small></div></div>
    <h3>${s.name}</h3><p>${s.desc}</p>
    <a class="text-link" href="#commande" data-service-index="${n}">Demander un devis&nbsp; →</a>
  </article>`).join("");

  document.querySelectorAll("[data-service-index]").forEach(a=>a.onclick=e=>{
    e.preventDefault();
    selectService(Number(a.dataset.serviceIndex));
    document.querySelector("#commande").scrollIntoView({behavior:"smooth",block:"start"});
  });
}

function selectService(index){
  const s=services[index];
  if(!s)return;
  selectedService={index,name:s.name};
  const box=document.querySelector("#quote-box");
  const name=document.querySelector("#selected-service");
  if(box)box.hidden=false;
  if(name)name.textContent=s.name;
  const qty=document.querySelector("#service-qty");
  const format=document.querySelector("#service-format");
  const details=document.querySelector("#service-details");
  if(qty){qty.value=1;qty.focus();}
  if(format)format.value="";
  if(details)details.value="";
  toast(`${s.name} sélectionné pour une demande de devis`);
}

function clearService(){
  selectedService=null;
  const box=document.querySelector("#quote-box");
  if(box)box.hidden=true;
  const qty=document.querySelector("#service-qty");
  const format=document.querySelector("#service-format");
  const details=document.querySelector("#service-details");
  if(qty)qty.value=1;
  if(format)format.value="";
  if(details)details.value="";
}

document.querySelector("#clear-service")?.addEventListener("click",()=>{clearService();toast("Service retiré de la demande de devis")});

function renderFilters(){
  let cats=["Tous",...new Set(products.map(p=>p.category))];
  document.querySelector("#category-filters").innerHTML=cats.map(c=>`<button class="filter ${c===activeCategory?"active":""}" data-cat="${c}">${c}</button>`).join("");
  document.querySelectorAll("[data-cat]").forEach(b=>b.onclick=()=>{activeCategory=b.dataset.cat;renderFilters();renderProducts()});
}

function renderProducts(){
  let q=document.querySelector("#product-search").value.toLowerCase(),list=products.filter(p=>(activeCategory==="Tous"||p.category===activeCategory)&&`${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(q));
  document.querySelector("#products-grid").innerHTML=list.length?list.map(p=>`<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"></div><div class="product-body"><span class="product-cat">${p.category}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="product-foot"><strong>${p.priceText||money(p.price)}</strong><button class="details-btn" data-details="${p.id}">Voir le produit</button><button class="add-btn" data-add="${p.id}" aria-label="Ajouter au panier">+</button></div></div></article>`).join(""):`<div class="no-results">Aucun produit trouvé.</div>`;
  document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>add(+b.dataset.add));
  document.querySelectorAll("[data-details]").forEach(b=>b.onclick=()=>openProduct(+b.dataset.details));
}

function openProduct(id){
  const p=products.find(x=>x.id===id);if(!p)return;
  const modal=document.querySelector("#product-modal"),content=document.querySelector("#product-modal-content"),details=p.details||p.desc,unit=p.unitLabel||"Unité",usage=p.usage||"Contactez JM BUSINESS pour connaître les options disponibles.";
  content.innerHTML=`<div class="product-detail-grid"><div class="product-detail-image"><img src="${p.image}" alt="${p.name}"></div><div class="product-detail-copy"><span class="product-cat">${p.category}</span><h2 id="modal-product-name">${p.name}</h2><p class="product-detail-description">${details}</p><div class="product-detail-price">${p.priceText||money(p.price)} <small>${unit}</small></div><div class="product-detail-box"><strong>À quoi sert ce produit ?</strong><span>${usage}</span></div><div class="product-detail-actions"><button class="btn btn-primary" data-modal-add="${p.id}">Ajouter au panier</button><a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${wa(`Bonjour ${C.businessName}, je souhaite commander : ${p.name} — ${p.priceText||money(p.price)}.`)}">Commander sur WhatsApp</a></div></div></div>`;
  modal.classList.add("open");modal.setAttribute("aria-hidden","false");content.querySelector("[data-modal-add]").onclick=()=>{add(p.id);closeProduct()}
}
function closeProduct(){const modal=document.querySelector("#product-modal");modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
document.addEventListener("click",e=>{if(e.target.matches("[data-close-modal]"))closeProduct()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeProduct()});

function add(id){
  let p=products.find(x=>x.id===id),i=cart.find(x=>x.id===id);if(!p)return;
  i?i.qty++:cart.push({type:"product",id,qty:1});
  save();renderCart();toast(`${p.name} ajouté au panier`)
}
function save(){localStorage.setItem("jm_cart",JSON.stringify(cart))}
function data(){return cart.map(i=>{const p=products.find(p=>p.id===i.id);return p?{...p,qty:i.qty,type:"product"}:null}).filter(Boolean)}

function renderCart(){
  const d=data(),count=d.reduce((s,i)=>s+i.qty,0),total=d.reduce((s,i)=>s+(Number(i.price)||0)*i.qty,0);
  document.querySelector("#cart-count").textContent=`${count} article${count>1?"s":""}`;
  document.querySelector("#cart-total").textContent=money(total);
  document.querySelector("#cart-items").innerHTML=d.length?d.map(i=>`<div class="cart-item" data-cart-type="product" data-cart-id="${i.id}"><div><b>${i.name}</b><small>${money(i.price)} × ${i.qty}</small></div><div class="qty"><button type="button" data-q="product:${i.id}" data-d="-1" aria-label="Diminuer la quantité">−</button><span>${i.qty}</span><button type="button" data-q="product:${i.id}" data-d="1" aria-label="Augmenter la quantité">+</button></div><button type="button" class="remove" data-r="product:${i.id}" aria-label="Retirer ${i.name} du panier">×</button></div>`).join(""):`<div class="empty-cart">Votre panier est vide.<br><small>Ajoutez un produit pour commencer.</small></div>`;
}

document.addEventListener("click",e=>{
  if(e.target.closest("[data-clear-cart]")){e.preventDefault();clearCart();return;}
  const remove=e.target.closest("[data-r]");
  if(remove){
    e.preventDefault();e.stopPropagation();
    const parts=String(remove.dataset.r||"").split(":");
    const id=Number(parts[1]);
    cart=cart.filter(i=>Number(i.id)!==id);save();renderCart();toast("Produit retiré du panier");return;
  }
  const q=e.target.closest("[data-q]");
  if(q){
    e.preventDefault();e.stopPropagation();
    const parts=String(q.dataset.q||"").split(":");
    qty(Number(parts[1]),Number(q.dataset.d));
  }
});

function clearCart(){
  if(!cart.length){toast("Le panier est déjà vide.");return;}
  cart=[];save();renderCart();toast("Panier vidé");
}
function qty(id,d){
  let i=cart.find(x=>Number(x.id)===Number(id));if(!i)return;
  i.qty=Number(i.qty||0)+Number(d||0);
  if(i.qty<1)cart=cart.filter(x=>Number(x.id)!==Number(id));
  save();renderCart();
}

function customerValue(id){return document.querySelector(id)?.value.trim()||"Non renseigné"}

function quoteData(){
  if(!selectedService)return null;
  const qty=Math.max(1,Number(document.querySelector("#service-qty")?.value)||1);
  return {
    name:selectedService.name,
    qty,
    format:customerValue("#service-format"),
    details:customerValue("#service-details")
  };
}

function message(){
  const d=data();
  const total=d.reduce((s,i)=>s+(Number(i.price)||0)*i.qty,0);
  const q=quoteData();
  let text=`Bonjour ${C.businessName},\n\n`;
  if(d.length){
    text+=`Je souhaite commander les produits suivants :\n\n${d.map((i,n)=>`${n+1}. ${i.name} × ${i.qty} — ${money(i.price*i.qty)}`).join("\n")}\n\nTotal produits : ${money(total)}\n`;
  }
  if(q){
    text+=`\nDEMANDE DE DEVIS — SERVICE\nService : ${q.name}\nQuantité souhaitée : ${q.qty}\nFormat / précision : ${q.format}\nDétails : ${q.details}\n`;
  }
  text+=`\nNom : ${customerValue("#customer-name")}\nTéléphone : ${customerValue("#customer-phone")}\nE-mail : ${customerValue("#customer-email")}\nVille / quartier : ${customerValue("#customer-location")}\nCommentaire : ${customerValue("#customer-note")}\n\nMerci.`;
  return text;
}

function valid(){
  if(!cart.length&&!selectedService){toast("Ajoutez un produit au panier ou sélectionnez un service pour demander un devis.");return false}
  if(!document.querySelector("#customer-name").value.trim()){toast("Indiquez votre nom.");return false}
  if(selectedService){
    const qty=Number(document.querySelector("#service-qty")?.value||0);
    if(qty<1){toast("Indiquez une quantité souhaitée pour le service.");return false}
  }
  return true;
}

document.querySelector("#whatsapp-btn").onclick=()=>valid()&&window.open(wa(message()),"_blank");
document.querySelector("#email-btn").onclick=()=>valid()&&(location.href=`mailto:${C.email}?subject=${encodeURIComponent(selectedService?"Demande de devis / commande — JM BUSINESS":"Nouvelle commande — JM BUSINESS")}&body=${encodeURIComponent(message())}`);
document.querySelector("#product-search").oninput=renderProducts;

function links(){
  let u=wa("Bonjour JM BUSINESS, je souhaite obtenir des informations.");
  ["#contact-whatsapp","#footer-whatsapp","#floating-whatsapp"].forEach(s=>{const el=document.querySelector(s);if(el)el.href=u});
  document.querySelectorAll('a[href^="mailto:"]').forEach(a=>a.href=`mailto:${C.email}`);
  let tel=document.querySelector('a[href^="tel:"]');if(tel){tel.href=`tel:${C.phoneLink}`;let sp=tel.querySelector("span");if(sp)sp.innerHTML=`<b>Téléphone</b>${C.phoneDisplay}`}
}

document.querySelector(".menu-toggle").onclick=()=>document.querySelector(".mobile-nav").classList.toggle("open");
document.querySelectorAll(".mobile-nav a").forEach(a=>a.onclick=()=>document.querySelector(".mobile-nav").classList.remove("open"));

function initServiceSlider(){
  const track=document.querySelector("#service-slider-track"),dots=document.querySelector("#service-slider-dots");if(!track||!dots)return;
  const slides=[...track.querySelectorAll(".slider-slide")];let i=0;
  dots.innerHTML=slides.map((_,n)=>`<button type="button" class="slider-dot ${n===0?"active":""}" data-slide="${n}" aria-label="Service ${n+1}"></button>`).join("");
  const show=n=>{slides[i].classList.remove("active");dots.children[i].classList.remove("active");i=n%slides.length;slides[i].classList.add("active");dots.children[i].classList.add("active")};
  [...dots.children].forEach((b,n)=>b.onclick=()=>show(n));setInterval(()=>show(i+1),5000)
}

const contactForm=document.querySelector("#contact-form");
if(contactForm)contactForm.onsubmit=e=>{e.preventDefault();const name=document.querySelector("#contact-name").value.trim(),email=document.querySelector("#contact-email").value.trim(),msg=document.querySelector("#contact-message").value.trim();const text=`Bonjour ${C.businessName},\n\nNom : ${name}\nE-mail : ${email}\n\nMessage :\n${msg}`;window.open(wa(text),"_blank");document.querySelector("#contact-status").textContent="Votre message WhatsApp est prêt à être envoyé."};

save();links();renderServices();renderFilters();renderProducts();renderCart();initServiceSlider();
