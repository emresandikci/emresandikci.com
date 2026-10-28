---
title: "Evde Mini Datacenter Kurmak: Neden ve Nasıl Bir Homelab Kurdum?"
date: 2026-10-28
description: "Bir Mini PC, Proxmox VE ve port açmadan kurulan bir yapıyla, minimum bütçe ile maksimum verim odaklı homelab kurulumum."
lang: tr
tags: ["homelab", "proxmox", "self-hosted", "cloudflare", "pi-hole", "docker"]
---

Bu yılın şubat ayında Deniz İrgin X'te homelab'i için AI tarafına girip girmemeyi tartışıyordu: 2x RTX 3090 mı, tek RTX 4090 mı? Sonunda [AI'dan vazgeçip homelab'deki asıl hedefine dönmeye karar verdi](https://x.com/denizirgin/status/2026388061752336780). Ben de benzer bir yoldan geçtiğim için altına [kendi kurulumumu anlatan bir cevap yazdım](https://x.com/emresand1kc1/status/2026755450864284119). Homelab'i kuralı bir yılı geçti, o cevabı detaylandırıp yazıya dökmek ise yeni nasip oldu.

Bu işe bir girince araştırmanın, donanım seçeneklerinin ve maliyetlerin sonu gelmiyor. Yüksek kapasiteli RAM'ler, büyük NAS diskleri, sunucu kasaları derken bütçe bir anda katlanıyor.

Ben de bu süreçten geçtim. İşin nerelere varabileceğini gördükten sonra kendime şunu sordum: **"Benim gerçekten neye ihtiyacım var?"**

Ülke şartlarını da düşününce minimum bütçe ile maksimum verim almaya karar verdim. Mini PC olarak GMKtec M6 aldım ve self-hosted tarafına küçük bir adımla başladım. Mini PC'nin maliyeti 15-20 bin TL civarında oldu.

Aşağıda neyi nasıl kurduğumu ve hangi araçları kullandığımı anlatıyorum.

## Proxmox VE

Mini PC'ye [Proxmox VE](https://www.proxmox.com/en/proxmox-virtual-environment/overview) kurdum. CPU, RAM ve diski LXC container'lar ve VM'ler arasında anlık olarak istediğim gibi dağıtabiliyorum, bu da birçok işi kolaylaştırıyor.

LXC ile birkaç sunucu oluşturdum ve iş ile ev ağını sanal olarak birbirinden ayırdım. Her sanal sunucunun içine Docker kurdum, servisler bunların üzerinde container olarak çalışıyor.

Ağ tarafında evdeki router'da `192.168.1.100` - `192.168.1.254` aralığını homelab'e ayırdım ve static DHCP tanımlarını yaptım. Böylece hangi servisin hangi IP'de olduğu belli.

## Dış Erişim: Port Açmak Yok, Sabit IP Yok

Statik IP almak ek maliyet ama pahalı değil, ev internetinden dışarıya port açmak da güvenlik riski. Bunun yerine Cloudflare Zero Trust ile ilerledim ve dış erişim için [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) kullanıyorum.

`cloudflare/cloudflared` container'ı evden Cloudflare'e doğru bir bağlantı açıyor. Dışarıya açmak istediğim servisler bu tünel üzerinden HTTPS ile yayına çıkıyor. Router'da açık bir port yok ve ev IP'm görünmüyor. Firewall kurup ayarlamak gibi detaylarda boğulmak yerine yapmak istediklerime odaklanabildim.

## Çalışan Servisler

- **[Pi-hole](https://pi-hole.net):** Ev ağının DNS sunucusu. Reklam ve tracker domain'lerini ağ seviyesinde engelliyor, her cihaza ayrı ayrı bir şey kurmam gerekmiyor.
- **[Vaultwarden](https://github.com/dani-garcia/vaultwarden):** Bitwarden uyumlu, hafif bir şifre yöneticisi sunucusu. Şifrelerim kendi sunucumda duruyor.
- **[MySpeed](https://github.com/gnmyt/myspeed):** Gün içinde belirli aralıklarla hız testi yapıp sonuçları kaydediyor. İnternette bir sorun olduğunu düşündüğümde tahmin yerine elimde veri oluyor.
- **[Jellyfin](https://jellyfin.org):** Ev ağında medya paylaşımı için. Kendi arşivimi TV'den, telefondan veya bilgisayardan açabiliyorum. Lokal streaming CPU ve GPU'yu yorar diye düşünmeyin, sizden başka izleyen olmadığı sürece ciddi bir etkisi olmuyor.
- **[CasaOS](https://casaos.zimaspace.com):** Servisleri tek bir yerden görmek için basit bir dashboard.

Bu süre içinde herhangi bir problem yaşamadım.

## Homelab'den Hosting'e

Bu işe girince ABD'de yürüttüğüm bir iş için oradaki ortağımla 2. el bir sunucu aldık ve küçük çaplı bir hosting işine girdik. Burada da aynı mantıkla ilerledik: yeni donanım yerine 2. el bir sunucu. Maliyeti kabin dahil 500-600 dolar arasında tuttu.

Sunucuda hem müşterilerimizin hem de kendi projelerimizin bir kısmını host ediyoruz. Özellikleri ve şu anki kullanımı:

- **CPU:** 2x Intel Xeon E5-2697 v4 @ 2.30GHz (2 soket, toplam 72 thread)
- **RAM:** 128 GB, şu an yaklaşık yarısı (61 GiB) kullanımda
- **Depolama:** 1TB, bunun 274 GiB'ı dolu

Kaynakların yaklaşık yarısı hâlâ boşta, yani yeni projeler için de alan var.

## Son Olarak

Büyük sunucu raflarına veya yüksek kapasiteli RAM'lere ihtiyaç duymadan, bir Mini PC ile işime yarayan bir homelab kurmak mümkün. Yeni şeyleri denemek için bir alanım oldu ve şifrelerim gibi bazı verilerim artık kendi evimde duruyor.

Benzer bir kurulum düşünüyorsanız donanıma para dökmeden önce neye ihtiyacınız olduğunu netleştirip küçük başlamanızı tavsiye ederim. Hobi amaçlı başlıyorsanız ve evde boşta duran bir PC varsa, çok detaya girmeden onu kurup başlamak en mantıklısı.

Sorularınız ya da kendi homelab tecrübeleriniz varsa X üzerinden ([@emresand1kc1](https://x.com/emresand1kc1)) yazabilirsiniz.
