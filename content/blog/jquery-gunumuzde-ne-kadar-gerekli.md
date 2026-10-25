---
title: "JQuery Günümüzde Ne kadar gerekli?"
date: 2018-04-03
description: "JQuery bugün hâlâ gerekli mi? Saf JavaScript ile karşılaştırma, örnekler, animasyonlar ve SPA dünyasında JQuery'nin yeri."
lang: tr
tags: ["jquery", "dom", "frontend", "javascript", "web-development"]
canonical: https://emresandikci.medium.com/jquery-g%C3%BCn%C3%BCm%C3%BCzde-ne-kadar-gerekli-819cfbcd363e
---

Başlamadan önce belirtmek isterim, burada yazacaklarım sadece benim şahsi fikirlerim olacaktır ve amacım _JQuery_ kötülemek değildir, aksine _pure (vanilla) javascript_ ile birçok işimizi kolayca halledebileceğimizi ve alternatif 3.party birkaç farklı framework veya kütüphaneyi göstermek istedim.

![](/blog/jquery-gunumuzde-ne-kadar-gerekli/image-1.png)

Geçmişte ve günümüzde birçok kişi henüz javascript bilmeden ve hatta bir haber olup javascript’i jquery olarak bilen birçok kişiye rastlamışsınızdır.Daha basit bir syntax‘a sahip olduğu için javascripten önce öğrendiğini de pas geçmemek gerekir.Aslında herhangi bir 3.party javascript kütüphanesini öğrenmeden önce javascriptin temellerini öğrenmek o kütüphanelerin çalışma mantığı daha kolay kavramanıza yardımcı olacaktır.

Konuyu fazla saptırmadan asıl meselemize gelelim.

### **Neden** [**JQuery**](https://www.w3schools.com/jquery/default.asp) **?**

Aklıma gelen başlıca sayılabilecek birkaç sebebi şöyle sıralabiliriz;

-   Çünkü basit bir sytax’a sahip, bundan dolayı öğrenmesi daha kolay,
-   Pure (Vanilla) javascripte göre daha az kod ile daha çok iş yapabilme esnekliği sağlıyor,
-   Benzer fazla alternatifler olmaması,
-   Uzun yıllar DOM manipülasyonunun çok basit bir şekilde yapmamıza imkan sağladı.

### **Neden** [**Javascript**](https://www.w3schools.com/js/default.asp) **?**

Herhangi bir kütüphane referansı eklenmeden direk olarak bütün tarayıcılarda (browser) kolayca çalıştırılabilmesi ve bunun en büyük avantajı, sunucuya bir istek (request) gittiğinde bize cevap (response) olarak dönen sayfanın boyutu eklenen her 3.party javascript veya css kütüphanelerinden dolayı artmasına neden olacaktır.

Aslında bu duruma şöyle bakarsak ufkunuzu biraz daha açmış olurum sanırım.Projemize tabiki bazı 3.party kütüphaneler ekleyeceğiz ama birçoğu içerisinde kullanmadığımız birçok kod parçacığı ile birlikte sayfamızın boyutu büyütecektir.Bunun için elimizden geldiğince daha az kullanmaya dikkat etmeliyiz.

### **Birkaç Örnek Vermek Gerekirse**

Şimdi JQuery’nin basit şekilde yaptığı ve ihtiyaçlarımızı karşılayan birkaç kod örneğinin pure (vanilla) javascript karşılığı ile size göstermek istiyorum ki, neden JQuery ihtiyacımızın gereksiz olduğu durumları daha net bir şekilde size anlatmış olurum.

**Selectors**

$(‘.container’)  
   
document.querySelector(‘.container’)

document.querySelectorAll(‘.container span’)

**Append**

$(‘.container’).append(element);

document.querySelector(‘.container’).appendChild(element);

**Children**

$(‘.container’).children();

document.querySelector(‘.container’).children;

**Clone**

$(‘.container’).clone();

document.querySelector(‘.container’).cloneNode(); // ilgili elementi kopyalar

document.querySelector(‘.container’).cloneNode(true); // ilgili elementin alt elementlerinide dahil eder.

**Attribute**

$(‘a’).attr(‘href’);

document.querySelector(‘a’).getAttribute(‘href’);

**HTML/TEXT**

$(‘.container’).html();

document.querySelector(‘.container’).innerHTML;

$(‘.container’).text();

document.querySelector(‘.container’).innerText;

**Each**

$(‘.container .item’)  
.each(function(index,element){

//todo

})

document.querySelectorAll(‘.container .item’)  
.forEach((element,index)=>{

//todo

});

**Json Parser**

$.parseJSON(data);

JSON.parse(data);

**Hide/Show**

$(‘.container’).hide()

document.querySelector(‘.container’).style.display=‘none’;

$(‘.container’).show()

document.querySelector(‘.container’).style.display=‘’;

**AJAX**

$.ajax({  
 type: ‘POST’,  
 url: ‘/my/url’,  
 data: data,  
 success:function(data)\[console.log(data)},  
 error:function(data){}  
});

fetch(url,options)  
  .then(response=>{return response.json()})  
  .then(response=>{console.log(response)})  
  .catch(response=>{console.log('err',response)});

> Yukarıda belirttiğim bazı örnekler gibi JQuery’e bağımlı kalmadan birçok işimizi zaten halledebiliyorken neden ekstra bir kütüphane ile sayfamızı yoralım ? Bunlar sadece benim değindiğim çok kullanılan birkaç özelliktir.

### Peki Ya Animasyonlar Ne Olacak ?

Artık animasyonların bir çoğunu CSS3 ile yapabiliyoruz.Burada amacımız hiç 3.party bir kütüphane kullanmamak değil, amacımız herşeyi içinde barındıran kütüphaneler yerine sadece spesifik amaçlarımız için ihtiyacımız olan kütüphaneleri projemize dahil etmek daha mantıklı bir çözüm olacaktır.Hali hazırda olan [**Animate CSS**](https://daneden.github.io/animate.css/) sizin için güzel bir çözüm olabilir.

### SPA (Single Page Application)

SPA uygulamaları çok yaygın değilken, bazı client-side işlerimizi çok gelişmiş (angular,ember,react,vue gibi) javascript kütüphaneleri veya framework’leri yokken, JQuery kullanırdık.Basit işleri çözmek için biçilmiş kaftandı bizim için.Ama günümüzde SPA yaygınlaşması ile hayatımıza giren birçok yeni JS kütüphanelerinin boyutları küçüldü ve bağımlılıklar kendimiz belirleyerek sadece ihtiyacımız olan ek özellikleri ekleyerek sayfamızda oluşan kalabalığıda azaltmış ve böylece JQuery ile oluşan kod karmaşası ortadan kalkmış oldu.

### Sonuç

JQuery öldü mü diye sorarsanız, bu kullanılacak projeye, yapılacak işlere veya tamamen sizin tercihinize kalmış bir durum.Ben elimden geldiğince JQuery de kullandığımız birçok özelliğin zaten pure (vanilla) JavaScript ile yapabildiğimizi göstermek istedim.Sizinde görüşlerinizi ve eleştirilerinizi almak isterim.Şimdilik benden bu kadar.Görüşmek dileğiyle.
