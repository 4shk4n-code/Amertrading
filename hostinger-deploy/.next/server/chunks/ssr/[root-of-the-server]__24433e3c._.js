module.exports=[254799,(a,b,c)=>{b.exports=a.x("crypto",()=>require("crypto"))},193695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},650645,a=>{a.n(a.i(827572))},517537,a=>{a.n(a.i(903363))},13718,a=>{a.n(a.i(685523))},118198,a=>{a.n(a.i(545518))},262212,a=>{a.n(a.i(866114))},884649,a=>{a.n(a.i(965507))},587127,a=>{"use strict";function b(a){return"object"==typeof a&&null!==a&&!Array.isArray(a)}var c={0:8203,1:8204,2:8205,3:8290,4:8291,5:8288,6:65279,7:8289,8:119155,9:119156,a:119157,b:119158,c:119159,d:119160,e:119161,f:119162},d={0:8203,1:8204,2:8205,3:65279},e=[,,,,].fill(String.fromCodePoint(d[0])).join("");function f(a,b,c="auto"){let g;return!0===c||"auto"===c&&(!(!Number.isNaN(Number(a))||/[a-z]/i.test(a)&&!/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(a))&&Date.parse(a)||function(a){try{new URL(a,a.startsWith("/")?"https://acme.com":void 0)}catch{return!1}return!0}(a))?a:`${a}${g=JSON.stringify(b),`${e}${Array.from(g).map(a=>{let b=a.charCodeAt(0);if(b>255)throw Error(`Only ASCII edit info can be encoded. Error attempting to encode ${g} on character ${a} (${b})`);return Array.from(b.toString(4).padStart(4,"0")).map(a=>String.fromCodePoint(d[a])).join("")}).join("")}`}`}Object.fromEntries(Object.entries(d).map(a=>a.reverse())),Object.fromEntries(Object.entries(c).map(a=>a.reverse()));var g=`${Object.values(c).map(a=>`\\u{${a.toString(16)}}`).join("")}`,h=RegExp(`[${g}]{4,}`,"gu");function i(a){var b,c;return a&&JSON.parse({cleaned:(b=JSON.stringify(a)).replace(h,""),encoded:(null==(c=b.match(h))?void 0:c[0])||""}.cleaned)}a.s(["C",()=>f,"isRecord",()=>b,"stegaClean",()=>i])},480843,a=>{"use strict";function b(a,...c){let d=a.length-1;return a.slice(0,d).reduce((a,b,d)=>a+b+c[d],"")+a[d]}var c=a.i(919067);let d={en:{_id:"company-info-en",name:"AMER GENERAL TRADING L.L.C",mission:"Connecting industries. Powering progress.",description:"AMER GENERAL TRADING L.L.C is a multi-sector enterprise leading innovation across automotive, food, fashion, IT, and global commerce.",heroVideoURL:"https://cdn.coverr.co/videos/coverr-spotlight-on-the-city-6498/1080p.mp4",introVideoURL:"/intro-logo.mp4",locale:"en"},ar:{_id:"company-info-ar",name:"امير تريدينغ القابضة",mission:"ربط الصناعات وتمكين النمو.",description:"مجموعة متعددة القطاعات تقود الابتكار عبر السيارات، الأغذية، الأزياء، تقنية المعلومات والتجارة العالمية.",heroVideoURL:"https://cdn.coverr.co/videos/coverr-spotlight-on-the-city-6498/1080p.mp4",introVideoURL:"/intro-logo.mp4",locale:"ar"},fa:{_id:"company-info-fa",name:"هولدینگ آمر تریدینگ",mission:"اتصال صنایع و توانمندسازی پیشرفت.",description:"هولدینگ آمر تریدینگ در حوزه‌های خودرو، مواد غذایی، پوشاک، فناوری اطلاعات و تجارت جهانی پیشرو است.",heroVideoURL:"https://cdn.coverr.co/videos/coverr-spotlight-on-the-city-6498/1080p.mp4",introVideoURL:"/intro-logo.mp4",locale:"fa"}},e={en:[{_id:"division-auto-en",name:"Auto Parts",description:"Supplying OEM-grade automotive components and lubricants across the GCC and beyond.",slug:{current:"auto-parts"},locale:"en"},{_id:"division-food-en",name:"Food & Markets",description:"Partnering with leading producers to deliver quality foods, beverages, and retail essentials.",slug:{current:"food-markets"},locale:"en"},{_id:"division-clothing-en",name:"Clothing & Lifestyle",description:"Creating fashion and lifestyle brands that combine style with sustainability.",slug:{current:"clothing-lifestyle"},locale:"en"},{_id:"division-it-en",name:"IT & Hardware",description:"Providing advanced computing, networking, and data-center solutions for enterprise clients.",slug:{current:"it-hardware"},locale:"en"},{_id:"division-markets-en",name:"Markets & Trading",description:"Expanding access to goods through integrated wholesale, retail, and marketplace platforms.",slug:{current:"markets-trading"},locale:"en"}]};e.ar=e.en.map(a=>({...a,_id:a._id.replace("en","ar"),name:"Auto Parts"===a.name?"قطع غيار السيارات":"Food & Markets"===a.name?"الأغذية والأسواق":"Clothing & Lifestyle"===a.name?"الأزياء ونمط الحياة":"IT & Hardware"===a.name?"تقنية المعلومات والمعدات":"الأسواق والتجارة",description:a.description,slug:a.slug,locale:"ar"})),e.fa=e.en.map(a=>({...a,_id:a._id.replace("en","fa"),name:"Auto Parts"===a.name?"قطعات خودرو":"Food & Markets"===a.name?"غذا و بازارها":"Clothing & Lifestyle"===a.name?"پوشاک و سبک زندگی":"IT & Hardware"===a.name?"فناوری اطلاعات و سخت‌افزار":"بازارها و بازرگانی",description:a.description,slug:a.slug,locale:"fa"}));let f={en:[{_id:"news-smart-mobility-en",title:"AMER GENERAL TRADING Expands into Smart Mobility",slug:{current:"amer-trading-expands-into-smart-mobility"},body:[{_type:"block",children:[{_type:"span",text:"AMER GENERAL TRADING L.L.C announced its expansion into smart-mobility and EV components as part of its 2025 growth roadmap."}]}],date:new Date().toISOString(),locale:"en"}]};async function g(a){return c.hasSanityCredentials?c.sanityClient.fetch(b`*[_type == "companyInfo" && locale == $locale][0]{
      _id,
      name,
      mission,
      description,
      heroVideoURL,
      introVideoURL,
      "logo": logo{
        asset->{_ref, url}
      },
      locale
    }`,{locale:a??"en"}):d[a]??d.en}async function h(a){return c.hasSanityCredentials?c.sanityClient.fetch(b`*[_type == "division" && locale == $locale] | order(order asc){
      _id,
      name,
      description,
      order,
      locale,
      slug,
      "image": image{
        asset->{_ref, url}
      }
    }`,{locale:a??"en"}):e[a]??e.en}async function i(a,d){return c.hasSanityCredentials?c.sanityClient.fetch(b`*[_type == "division" && locale == $locale && slug.current == $slug][0]{
      _id,
      name,
      description,
      order,
      locale,
      slug,
      "image": image{
        asset->{_ref, url}
      }
    }`,{locale:a??"en",slug:d}):(e[a]??e.en).find(a=>a.slug.current===d)??null}async function j(a){return c.hasSanityCredentials?c.sanityClient.fetch(b`*[_type == "newsPost" && locale == $locale] | order(date desc){
      _id,
      title,
      slug,
      body,
      date,
      locale,
      "image": image{
        asset->{_ref, url}
      }
    }`,{locale:a??"en"}):f[a]??f.en}async function k(a,d){return c.hasSanityCredentials?c.sanityClient.fetch(b`*[_type == "newsPost" && locale == $locale && slug.current == $slug][0]{
      _id,
      title,
      slug,
      body,
      date,
      locale,
      "image": image{
        asset->{_ref, url}
      }
    }`,{locale:a??"en",slug:d}):(f[a]??f.en).find(a=>a.slug.current===d)??null}async function l(a,d){if(!c.hasSanityCredentials){var e,f;return"about"===d?{_id:`page-${a}-about`,title:"ar"===a?"قصة عالمية":"fa"===a?"داستان جهانی":"A Legacy of Vision",slug:{current:"about"},content:("ar"===(e=a)?["لمدة ثلاثة عقود، جمعت امير تريدينغ القابضة فرقًا طموحة لتقديم التنقل، التغذية، الأسلوب والمرونة الرقمية لأسواق المستقبل.","من قطع غيار السيارات المتميزة إلى الخدمات الغذائية الذكية والأجهزة الذكية، نقود الصناعات برؤية هادفة وتركيز لا يلين على الأثر."]:"fa"===e?["به مدت سه دهه، هولدینگ آمر تریدینگ تیم‌های بلندپرواز را گرد هم آورده تا تحرک، تغذیه، سبک و تاب‌آوری دیجیتال آینده را بسازد.","از قطعات خودروی ممتاز تا لجستیک غذایی هوشمند و سخت‌افزار هوشمند، صنایع را با رهبری هدفمند و تمرکز بر تأثیر هدایت می‌کنیم."]:["For three decades, AMER GENERAL TRADING L.L.C has united ambitious teams across continents to deliver mobility, nourishment, style, and digital resilience for tomorrow's markets.","From premium auto parts to smart food logistics and intelligent hardware, we scale industries with purpose-driven leadership and a relentless focus on impact."]).map(a=>({_type:"block",children:[{_type:"span",text:a}]})),locale:a}:"contact"===d?{_id:`page-${a}-contact`,title:"ar"===a?"تواصل معنا":"fa"===a?"تماس با ما":"Connect With AMER GENERAL TRADING L.L.C",slug:{current:"contact"},content:("ar"===(f=a)?["تواصل معنا لنبني نموًا متعدد القطاعات عبر جميع خطوط الأعمال."]:"fa"===f?["برای ساختن رشد چندبخشی در تمام خطوط کسب‌وکار با ما در تماس باشید."]:["Let’s unlock the next era of multi-sector growth together."]).map(a=>({_type:"block",children:[{_type:"span",text:a}]})),locale:a}:null}return c.sanityClient.fetch(b`*[_type == "page" && locale == $locale && slug.current == $slug][0]{
      _id,
      title,
      slug,
      content,
      locale
    }`,{locale:a??"en",slug:d})}f.ar=[{...f.en[0],_id:"news-smart-mobility-ar",title:"أمير تريدينغ تتوسع في التنقل الذكي",locale:"ar"}],f.fa=[{...f.en[0],_id:"news-smart-mobility-fa",title:"گسترش آمر تریدینگ به حوزه حمل‌ونقل هوشمند",locale:"fa"}],a.s(["getCompanyInfo",()=>g,"getDivisionBySlug",()=>i,"getDivisions",()=>h,"getNews",()=>j,"getNewsBySlug",()=>k,"getPage",()=>l],480843)},610649,a=>{"use strict";let b=(0,a.i(211857).registerClientReference)(function(){throw Error("Attempted to call NewsList() from the server but NewsList is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/cms/news-list.tsx <module evaluation>","NewsList");a.s(["NewsList",0,b])},688979,a=>{"use strict";let b=(0,a.i(211857).registerClientReference)(function(){throw Error("Attempted to call NewsList() from the server but NewsList is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/cms/news-list.tsx","NewsList");a.s(["NewsList",0,b])},130967,a=>{"use strict";a.i(610649);var b=a.i(688979);a.n(b)},68174,a=>{"use strict";var b=a.i(907997),c=a.i(130967),d=a.i(480843),e=a.i(488611);async function f({params:a}){let e=await a,f=e?.locale??"en",g=await (0,d.getNews)(f);return(0,b.jsx)(c.NewsList,{locale:f,posts:g})}async function g({params:a}){let b=await a,c=b?.locale??"en";return(0,e.buildMetadata)({title:"Newsroom | AMER GENERAL TRADING L.L.C",description:"Official announcements, market insights, and press releases from AMER GENERAL TRADING L.L.C.",url:`https://amertrading.com/${c}/news`})}a.s(["default",()=>f,"generateMetadata",()=>g])},609489,a=>{a.v(b=>Promise.all(["server/chunks/ssr/node_modules_@sanity_client_dist__chunks-es_stegaEncodeSourceMap_e91a1003.js"].map(b=>a.l(b))).then(()=>b(614025)))},276016,a=>{a.v(b=>Promise.all(["server/chunks/ssr/[root-of-the-server]__48ac7fed._.js"].map(b=>a.l(b))).then(()=>b(312374)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__24433e3c._.js.map