(function(){
var d=document,b=d.body;
// header scroll state
var h=d.querySelector('.hd');
function sc(){h.classList.toggle('sc',window.scrollY>24)}sc();addEventListener('scroll',sc,{passive:true});
// mobile menu
var bt=d.querySelector('.burger'),m=d.getElementById('menu');
bt.addEventListener('click',function(){var o=m.classList.toggle('open');bt.setAttribute('aria-expanded',o)});
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('open')){m.classList.remove('open');bt.setAttribute('aria-expanded','false');bt.focus()}});
// scroll reveal (also image reveal)
var els=d.querySelectorAll('.rv');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(e){io.observe(e)})}
else els.forEach(function(e){e.classList.add('in')});
// page transition
d.addEventListener('click',function(e){var a=e.target.closest('a');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target)return;
 var u=a.getAttribute('href');if(!u||u.charAt(0)==='#'||/^(https?:|mailto:|tel:)/.test(u))return;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 e.preventDefault();b.classList.add('out');setTimeout(function(){location.href=u},220)});
addEventListener('pageshow',function(e){if(e.persisted)b.classList.remove('out')});
// footer year
var y=d.getElementById('yr');if(y)y.textContent=new Date().getFullYear();
// contact form
var f=d.getElementById('enquiry');
if(f){var st=f.querySelector('.st');
 f.addEventListener('submit',function(e){e.preventDefault();
  if(!f.checkValidity()){f.reportValidity();return}
  var ep=f.getAttribute('data-endpoint');
  if(!ep){st.className='st warn';st.textContent='The enquiry form is not connected yet. Please message us on LinkedIn instead.';return}
  st.className='st';st.textContent='Sending…';
  var data={};new FormData(f).forEach(function(v,k){data[k]=v});
  fetch(ep,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data)})
   .then(function(r){if(!r.ok)throw 0;f.reset();st.className='st ok';st.textContent='Enquiry sent. We will get back to you.'})
   .catch(function(){st.className='st warn';st.textContent='Could not send the enquiry. Please try again or message us on LinkedIn.'})})}
})();
