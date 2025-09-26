import type { Question } from './types';

export const questions: Question[] = [
  {
    id: 'mat-1',
    subject: 'mathematics',
    question: 'Bir sınıftaki kızların sayısının erkeklerin sayısına oranı 3/5’tir. Sınıfta toplam 40 öğrenci olduğuna göre, erkek öğrenci sayısı kaçtır?',
    options: [
      { id: 'a', text: '15' },
      { id: 'b', text: '20' },
      { id: 'c', text: '25' },
      { id: 'd', text: '30' },
      { id: 'e', text: '35' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'mat-2',
    subject: 'mathematics',
    question: 'Ali’nin bugünkü yaşı Veli’nin yaşının 2 katıdır. 5 yıl sonra yaşları toplamı 55 olacağına göre, Ali’nin bugünkü yaşı kaçtır?',
    options: [
      { id: 'a', text: '15' },
      { id: 'b', text: '20' },
      { id: 'c', text: '25' },
      { id: 'd', text: '30' },
      { id: 'e', text: '35' },
    ],
    correctOptionId: 'd',
  },
    {
    id: 'mat-3',
    subject: 'mathematics',
    question: 'Bir sayının 3 katının 10 eksiği, aynı sayının 5 fazlasına eşittir. Bu sayı kaçtır?',
    options: [
      { id: 'a', text: '5' },
      { id: 'b', text: '6.5' },
      { id: 'c', text: '7' },
      { id: 'd', text: '7.5' },
      { id: 'e', text: '8' },
    ],
    correctOptionId: 'd',
  },
  {
    id: 'mat-4',
    subject: 'mathematics',
    question: 'Bir araç 400 km’lik yolu saatte 80 km hızla kaç saatte alır?',
    options: [
      { id: 'a', text: '3' },
      { id: 'b', text: '4' },
      { id: 'c', text: '5' },
      { id: 'd', text: '6' },
      { id: 'e', text: '7' },
    ],
    correctOptionId: 'c',
  },
    {
    id: 'mat-5',
    subject: 'mathematics',
    question: 'Ardışık üç tek sayının toplamı 81 olduğuna göre, en büyük sayı kaçtır?',
    options: [
      { id: 'a', text: '25' },
      { id: 'b', text: '27' },
      { id: 'c', text: '29' },
      { id: 'd', text: '31' },
      { id: 'e', text: '33' },
    ],
    correctOptionId: 'c',
  },
    {
    id: 'mat-6',
    subject: 'mathematics',
    question: 'Bir mal %20 kârla 360 TL’ye satılıyor. Bu malın maliyeti kaç TL’dir?',
    options: [
      { id: 'a', text: '280' },
      { id: 'b', text: '290' },
      { id: 'c', text: '300' },
      { id: 'd', text: '310' },
      { id: 'e', text: '320' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'mat-7',
    subject: 'mathematics',
    question: '%40’ı 60 olan sayı kaçtır?',
    options: [
      { id: 'a', text: '120' },
      { id: 'b', text: '130' },
      { id: 'c', text: '140' },
      { id: 'd', text: '150' },
      { id: 'e', text: '160' },
    ],
    correctOptionId: 'd',
  },
  {
    id: 'mat-8',
    subject: 'mathematics',
    question: 'Bir işi bir işçi 12 günde, başka bir işçi 24 günde bitiriyor. İkisi birlikte bu işi kaç günde bitirirler?',
    options: [
      { id: 'a', text: '6' },
      { id: 'b', text: '7' },
      { id: 'c', text: '8' },
      { id: 'd', text: '9' },
      { id: 'e', text: '10' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'mat-9',
    subject: 'mathematics',
    question: 'Ahmet’in 5 yıl önceki yaşı, 3 yıl sonraki yaşının yarısı olduğuna göre, Ahmet’in bugünkü yaşı kaçtır?',
    options: [
      { id: 'a', text: '11' },
      { id: 'b', text: '12' },
      { id: 'c', text: '13' },
      { id: 'd', text: '14' },
      { id: 'e', text: '15' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'mat-10',
    subject: 'mathematics',
    question: 'Bir torbada 5 kırmızı, 4 mavi ve 3 yeşil top vardır. Torbadan rastgele çekilen bir topun kırmızı olma olasılığı kaçtır?',
    options: [
      { id: 'a', text: '1/3' },
      { id: 'b', text: '5/12' },
      { id: 'c', text: '1/2' },
      { id: 'd', text: '7/12' },
      { id: 'e', text: '2/3' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'tur-1',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde “göz” kelimesi mecaz anlamda kullanılmıştır?',
    options: [
      { id: 'a', text: 'Çocuğun gözleri masmaviydi.' },
      { id: 'b', text: 'İğnenin gözünden ipi geçiremedi.' },
      { id: 'c', text: 'Odaya girer girmez tüm gözler ona çevrildi.' },
      { id: 'd', text: 'Gözüne uyku girmedi bütün gece.' },
      { id: 'e', text: 'Tabağın gözüne zeytin koydu.' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'tur-2',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde ikileme, diğerlerinden farklı bir görevde kullanılmıştır?',
    options: [
      { id: 'a', text: 'Eğri büğrü yollardan geçtik.' },
      { id: 'b', text: 'Ufak tefek sorunlar yaşandı.' },
      { id: 'c', text: 'Mırıl mırıl şarkı söylüyordu.' },
      { id: 'd', text: 'Yavaş yavaş ilerliyorduk.' },
      { id: 'e', text: 'Güçlü kuvvetli bir adamdı.' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'tur-3',
    subject: 'turkish',
    question: '“Bir işi yaparken acele etme, iyice düşün, sonra yap.” anlamına gelen atasözü aşağıdakilerden hangisidir?',
    options: [
      { id: 'a', text: 'Damlaya damlaya göl olur.' },
      { id: 'b', text: 'Acele işe şeytan karışır.' },
      { id: 'c', text: 'Bir elin nesi var, iki elin sesi var.' },
      { id: 'd', text: 'Komşu komşunun külüne muhtaçtır.' },
      { id: 'e', text: 'Yalancının mumu yatsıya kadar yanar.' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'tur-4',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?',
    options: [
      { id: 'a', text: 'Herkez işini bitirmişti.' },
      { id: 'b', text: 'Kitabı masanın üzerine koydum.' },
      { id: 'c', text: 'Yarın okula gidecek mi?' },
      { id: 'd', text: 'Bu proje çok önemli.' },
      { id: 'e', text: 'Onunla dün akşam buluştuk.' },
    ],
    correctOptionId: 'a',
  },
  {
    id: 'tur-5',
    subject: 'turkish',
    question: 'Bir yazarın, “kelimelerin derinliklerinde bir yolculuğa çıkarır” okuyucuyu demesiyle anlatmak istediği nedir?',
    options: [
      { id: 'a', text: 'Kelimelerin çok uzun olması' },
      { id: 'b', text: 'Kelimelerin anlam katmanlarının zenginliği' },
      { id: 'c', text: 'Kelimelerin ses uyumu' },
      { id: 'd', text: 'Kelimelerin basitliği' },
      { id: 'e', text: 'Kelimelerin sayısı' },
    ],
    correctOptionId: 'b',
  },
    {
    id: 'tur-6',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisi edilgen çatılı değildir?',
    options: [
      { id: 'a', text: 'Kapı yavaşça açıldı.' },
      { id: 'b', text: 'Kitaplar rafa dizildi.' },
      { id: 'c', text: 'Yeni bir bina yapıldı.' },
      { id: 'd', text: 'Çocuklar bahçede oynadı.' },
      { id: 'e', text: 'Mektup okundu.' },
    ],
    correctOptionId: 'd',
  },
  {
    id: 'tur-7',
    subject: 'turkish',
    question: 'Aşağıdaki sözcüklerden hangisi türemiş bir sözcük değildir?',
    options: [
      { id: 'a', text: 'Evli' },
      { id: 'b', text: 'Kitaplık' },
      { id: 'c', text: 'Gözlük' },
      { id: 'd', text: 'Kalem' },
      { id: 'e', text: 'Sevinçli' },
    ],
    correctOptionId: 'd',
  },
  {
    id: 'tur-8',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde noktalama yanlışı yapılmamıştır?',
    options: [
      { id: 'a', text: 'Ahmet, Ayşe, ve Mehmet geldi.' },
      { id: 'b', text: 'Ankara\'ya mı gideceksin?' },
      { id: 'c', text: 'Oku! dedim ona.' },
      { id: 'd', text: 'Tren ne zaman, gelecek?' },
      { id: 'e', text: 'Bu evi kim, almış?' },
    ],
    correctOptionId: 'b',
  },
  {
    id: 'tur-9',
    subject: 'turkish',
    question: '“Hayat, iniş ve çıkışlarla doludur; önemli olan, düştüğünde pes etmeden devam etmektir.” cümlesinin ana fikri nedir?',
    options: [
      { id: 'a', text: 'Başarı, şansla elde edilir.' },
      { id: 'b', text: 'Zorluklar başarıya giden yolda engeldir.' },
      { id: 'c', text: 'Başarılı olmak için azim ve kararlılık gerekir.' },
      { id: 'd', text: 'Hayat kolay ve sorunsuz olmalıdır.' },
      { id: 'e', text: 'Pes etmek, yeni başlangıçlar için iyidir.' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'tur-10',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde edat (ilgeç) kullanılmıştır?',
    options: [
      { id: 'a', text: 'Kitabı okudu ve uyudu.' },
      { id: 'b', text: 'Geldi fakat beni görmedi.' },
      { id: 'c', text: 'Yağmur yağdığı için dışarı çıkmadık.' },
      { id: 'd', text: 'Çok çalıştı ama kazanamadı.' },
      { id: 'e', text: 'Sabahleyin erkenden kalktı.' },
    ],
    correctOptionId: 'c',
  },
  {
    id: 'tur-11',
    subject: 'turkish',
    question: '“Altını çizmek” deyimi hangi cümlede yanlış kullanılmıştır?',
    options: [
        { id: 'a', text: 'Kitaptaki önemli yerlerin altını çizdim.' },
        { id: 'b', text: 'Konuşmasında bu noktanın altını çizdi.' },
        { id: 'c', text: 'Resmin altını kurşun kalemle çizdi.' },
        { id: 'd', text: 'Duvara bir şekil çizip altını imzaladı.' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-12',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde isim tamlaması yoktur?',
    options: [
        { id: 'a', text: 'Okulun bahçesi' },
        { id: 'b', text: 'Çocukların sesi' },
        { id: 'c', text: 'Yeni ev aldılar.' },
        { id: 'd', text: 'Denizin dalgaları' },
        { id: 'e', text: 'Kapının kolu' },
    ],
    correctOptionId: 'c'
  },
  {
    id: 'tur-13',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde “ki”nin yazımı yanlıştır?',
    options: [
        { id: 'a', text: 'Gel ki konuşalım.' },
        { id: 'b', text: 'Çalış ki başarılı olasın.' },
        { id: 'c', text: 'Seninki daha güzel olmuş.' },
        { id: 'd', text: 'Kitap ki en iyi dosttur insana.' },
        { id: 'e', text: 'Biliyorumki gelmeyecek.' },
    ],
    correctOptionId: 'e'
  },
  {
    id: 'tur-14',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerden hangisi öznel bir yargı içermektedir?',
    options: [
        { id: 'a', text: 'Türkiye\'nin başkenti Ankara\'dır.' },
        { id: 'b', text: 'Dünyanın en güzel çiçeği güldür.' },
        { id: 'c', text: 'Ülkemizin en kalabalık şehri İstanbul\'dur.' },
        { id: 'd', text: 'Su 100 santigrat derecede kaynar.' },
        { id: 'e', text: 'Dört mevsim yaşayan bir ülkeyiz.' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-15',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde virgül (,) diğerlerinden farklı bir görevde kullanılmıştır?',
    options: [
        { id: 'a', text: 'Ali, Mehmet ve Ayşe geldi.' },
        { id: 'b', text: 'Konuştu, düşündü, karar verdi.' },
        { id: 'c', text: 'Evet, bu konuda sana katılıyorum.' },
        { id: 'd', text: 'Uzun, yorucu bir yolculuktu.' },
        { id: 'e', text: 'Kalemini, defterini ve kitabını masaya koydu.' },
    ],
    correctOptionId: 'c'
  },
  {
    id: 'tur-16',
    subject: 'turkish',
    question: '“(I) Sabahları (II) erken (III) kalkıp (IV) yürüyüş (V) yapmak ona iyi gelirdi.” cümlesinde numaralanmış sözcüklerden hangisi fiilimsidir?',
    options: [
        { id: 'a', text: 'I' },
        { id: 'b', text: 'II' },
        { id: 'c', text: 'III' },
        { id: 'd', text: 'IV' },
        { id: 'e', text: 'V' },
    ],
    correctOptionId: 'c'
  },
  {
    id: 'tur-17',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde pekiştirme yapılmıştır?',
    options: [
        { id: 'a', text: 'Çok güzel bir gündü.' },
        { id: 'b', text: 'Masada yemyeşil otlar vardı.' },
        { id: 'c', text: 'Hızlı hızlı yürüdü.' },
        { id: 'd', text: 'Büyük bir ev aldılar.' },
        { id: 'e', text: 'Hiçbiri' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-18',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde dolaylı tümleç yoktur?',
    options: [
        { id: 'a', text: 'Kitabı arkadaşına verdi.' },
        { id: 'b', text: 'Bahçede oynayan çocukları izledi.' },
        { id: 'c', text: 'Eve geç geldi.' },
        { id: 'd', text: 'Okuldan yeni çıktı.' },
        { id: 'e', text: 'Masaya oturdu.' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-19',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde “de”nin yazımı yanlıştır?',
    options: [
        { id: 'a', text: 'Gel de birlikte gidelim.' },
        { id: 'b', text: 'Bende seninle geleceğim.' },
        { id: 'c', text: 'Evde kimse yoktu.' },
        { id: 'd', text: 'Kitapta ilginç bilgiler var.' },
        { id: 'e', text: 'O da bu fikri beğendi.' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-20',
    subject: 'turkish',
    question: '“Deniz kenarında martıların sesini duydum. Tuzlu suyun kokusu burnuma geldi. Uzakta parlayan güneş gözlerimi kamaştırıyordu. Ayaklarımın altındaki kum taneleri çıtırdıyordu.” Parçada hangi duyuya ait bir ayrıntı yoktur?',
    options: [
        { id: 'a', text: 'İşitme' },
        { id: 'b', text: 'Koklama' },
        { id: 'c', text: 'Görme' },
        { id: 'd', text: 'Dokunma' },
        { id: 'e', text: 'Tat alma' },
    ],
    correctOptionId: 'e'
  },
  {
    id: 'tur-21',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde “nasıl” kelimesi soru zarfı olarak kullanılmıştır?',
    options: [
        { id: 'a', text: 'Nasıl bir ev arıyorsun?' },
        { id: 'b', text: 'Nasıl geldin buraya?' },
        { id: 'c', text: 'Nasıl bir insansın sen?' },
        { id: 'd', text: 'Nasıl bir hava var dışarıda?' },
        { id: 'e', text: 'Hiçbiri' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-22',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisi amaç-sonuç cümlesidir?',
    options: [
        { id: 'a', text: 'Yağmur yağdığı için dışarı çıkamadık.' },
        { id: 'b', text: 'Ders çalışmak için kütüphaneye gitti.' },
        { id: 'c', text: 'Çok yorulduğu için uyudu.' },
        { id: 'd', text: 'Hava güzeldi, bu yüzden piknik yaptık.' },
        { id: 'e', text: 'Hiçbiri' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-23',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde noktalı virgül (;) doğru kullanılmıştır?',
    options: [
        { id: 'a', text: 'Pazardan elma, armut; portakal ve muz aldım.' },
        { id: 'b', text: 'At ölür, meydan kalır; yiğit ölür, şan kalır.' },
        { id: 'c', text: 'Ahmet, Ayşe ve Ali; okula gitti.' },
        { id: 'd', text: 'Kitabı okudu; sonra uyudu.' },
        { id: 'e', text: 'Hiçbiri' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-24',
    subject: 'turkish',
    question: '“Sözde” kelimesi hangi cümlede pekiştirme amacıyla kullanılmıştır?',
    options: [
        { id: 'a', text: 'Sözde anlaşmıştık, ama hiçbiri olmadı.' },
        { id: 'b', text: 'Sözde iyi biriydi, ama öyle çıkmadı.' },
        { id: 'c', text: 'Sözde öğretmen, öğrencileriyle ilgilenmiyor.' },
        { id: 'd', text: 'Sözde evini temizlemiş, her yer toz içindeydi.' },
        { id: 'e', text: 'Hiçbiri' },
    ],
    correctOptionId: 'e'
  },
  {
    id: 'tur-25',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde büyük harflerin kullanımıyla ilgili bir yanlışlık yapılmıştır?',
    options: [
        { id: 'a', text: 'Mehmet Bey yarın Ankara\'ya gidecek.' },
        { id: 'b', text: 'Türk Dili ve Edebiyatı Bölümü\'nde okuyor.' },
        { id: 'c', text: 'Martı dergisini okudun mu?' },
        { id: 'd', text: '29 Ekim Cumhuriyet Bayramı kutlandı.' },
        { id: 'e', text: 'Avrupa Birliği\'ne üye olmak istiyoruz.' },
    ],
    correctOptionId: 'c'
  },
  {
    id: 'tur-26',
    subject: 'turkish',
    question: '“Eski püskü bir masanın başında oturuyordu. Üzerinde yırtık bir gömlek, yamalı bir pantolon vardı. Saçları darmadağınıktı, gözleri uykusuzluktan kızarmıştı.” Parçada ağır basan anlatım biçimi hangisidir?',
    options: [
        { id: 'a', text: 'Açıklama' },
        { id: 'b', text: 'Betimleme' },
        { id: 'c', text: 'Öyküleme' },
        { id: 'd', text: 'Tartışma' },
        { id: 'e', text: 'Örnekleme' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-27',
    subject: 'turkish',
    question: '“Geçmek” fiili hangi cümlede “bir yerden başka bir yere gitmek” anlamında kullanılmıştır?',
    options: [
        { id: 'a', text: 'Sınavı başarıyla geçti.' },
        { id: 'b', text: 'Köprüden karşıya geçti.' },
        { id: 'c', text: 'Hasta iyileşti, ateşi geçti.' },
        { id: 'd', text: 'Zaman çok çabuk geçti.' },
        { id: 'e', text: 'Dükkan babasından oğluna geçti.' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-28',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde edat grubu zarf tümleci göreviyle kullanılmamıştır?',
    options: [
        { id: 'a', text: 'Arkadaşlarıyla sinemaya gitti.' },
        { id: 'b', text: 'Onun gibi başarılı olmalısın.' },
        { id: 'c', text: 'Sabahleyin erkenden kalktı.' },
        { id: 'd', text: 'Yağmurdan dolayı yollar kaygandı.' },
        { id: 'e', text: 'Kitapçıya kadar yürüdük.' },
    ],
    correctOptionId: 'e'
  },
  {
    id: 'tur-29',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde ünsüz yumuşamasına uymayan bir sözcük vardır?',
    options: [
        { id: 'a', text: 'Ağacın dalları sallanıyordu.' },
        { id: 'b', text: 'Bu topu çok sevdi.' },
        { id: 'c', text: 'Çorabın rengi solmuş.' },
        { id: 'd', text: 'Toprağın kokusu güzeldi.' },
        { id: 'e', text: 'Çocuğun oyuncağı kayboldu.' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-30',
    subject: 'turkish',
    question: '“Okumak, sadece bilgi edinmek değil, aynı zamanda farklı dünyalara yelken açmaktır. Her kitap, size yeni bir bakış açısı sunar, ufkunuzu genişletir ve düşünce dünyanızı zenginleştirir.” Paragrafın ana fikri nedir?',
    options: [
        { id: 'a', text: 'Kitapların pahalı olduğu' },
        { id: 'b', text: 'Okumanın bilgi ve düşünce dünyasını geliştirdiği' },
        { id: 'c', text: 'Farklı kitap türlerinin olduğu' },
        { id: 'd', text: 'Okuma alışkanlığının zor olduğu' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-31',
    subject: 'turkish',
    question: '“Gibi” edatı hangi cümlede benzerlik anlamı katmıştır?',
    options: [
        { id: 'a', text: 'Sabahleyin erkenden kalktı gibi.' },
        { id: 'b', text: 'Onun gibi hızlı koşamıyorum.' },
        { id: 'c', text: 'Yağmur yağacak gibi görünüyor.' },
        { id: 'd', text: 'Sen gidince her yer boş kaldı gibi.' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-32',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde dolaylama vardır?',
    options: [
        { id: 'a', text: 'Aslan, ormanlar kralıdır.' },
        { id: 'b', text: 'Çanakkale, bir destandır.' },
        { id: 'c', text: 'Hava çok sıcaktı, terledik.' },
        { id: 'd', text: 'Kalem, iyi bir silahtır.' },
    ],
    correctOptionId: 'a'
  },
  {
    id: 'tur-33',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde birleşik sözcüklerin yazımıyla ilgili bir yanlışlık yapılmıştır?',
    options: [
        { id: 'a', text: 'Boğazköprüsü\'nden geçtik.' },
        { id: 'b', text: 'Akşamüstü yağmur yağdı.' },
        { id: 'c', text: 'Deniz anası sahile vurmuştu.' },
        { id: 'd', text: 'Mirasyedi bütün parayı harcadı.' },
    ],
    correctOptionId: 'a'
  },
  {
    id: 'tur-34',
    subject: 'turkish',
    question: '“Gülmek” fiili hangi cümlede mecaz anlamda kullanılmıştır?',
    options: [
        { id: 'a', text: 'Çocuk annesine gülümsedi.' },
        { id: 'b', text: 'Ona çok güldüler.' },
        { id: 'c', text: 'Güneşin doğuşuyla doğa gülümsedi.' },
        { id: 'd', 'text': 'Arkadaşının fıkrasına çok güldü.' },
    ],
    correctOptionId: 'c'
  },
  {
    id: 'tur-35',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisi koşul-sonuç cümlesidir?',
    options: [
        { id: 'a', text: 'Güneş açarsa pikniğe gideriz.' },
        { id: 'b', text: 'Yorulduğu için uyudu.' },
        { id: 'c', text: 'Erken kalktı, bu yüzden işlerini bitirdi.' },
        { id: 'd', text: 'Hasta olduğundan okula gelmedi.' },
    ],
    correctOptionId: 'a'
  },
  {
    id: 'tur-36',
    subject: 'turkish',
    question: 'Bir yazarın “toplumun aynasını tuttuğu” söyleniyorsa, ne anlatılmak istenir?',
    options: [
        { id: 'a', text: 'Toplumu eleştirmek' },
        { id: 'b', text: 'Toplumun sorunlarını yansıtmak' },
        { id: 'c', text: 'Topluma ayna vermek' },
        { id: 'd', text: 'Toplumu güzelleştirmek' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-37',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde birleşik fiil kullanılmıştır?',
    options: [
        { id: 'a', text: 'Eve geldi.' },
        { id: 'b', text: 'Kitabı okudu.' },
        { id: 'c', text: 'Yardım etti.' },
        { id: 'd', text: 'Yemek yedi.' },
        { id: 'e', text: 'Ders çalıştı.' },
    ],
    correctOptionId: 'c'
  },
  {
    id: 'tur-38',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde soru eki “mi”nin yazımı yanlıştır?',
    options: [
        { id: 'a', text: 'Gelecek misin?' },
        { id: 'b', text: 'Kitabımı okudun mu?' },
        { id: 'c', text: 'Senmi yaptın bunu?' },
        { id: 'd', text: 'O mu geldi?' },
    ],
    correctOptionId: 'c'
  },
  {
    id: 'tur-39',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde benzetme yapılmıştır?',
    options: [
        { id: 'a', text: 'Aslan gibi güçlü bir adamdı.' },
        { id: 'b', text: 'Güneş parıl parıldı.' },
        { id: 'c', text: 'Ayşe çok güzeldir.' },
        { id: 'd', text: 'Ev büyüktü.' },
    ],
    correctOptionId: 'a'
  },
  {
    id: 'tur-40',
    subject: 'turkish',
    question: '“Yazar, eserlerinde sade ve anlaşılır bir dil kullanır. Ağır anlatımlardan, gereksiz süslemelerden kaçınır.” Parçada yazarın hangi özelliği vurgulanmıştır?',
    options: [
        { id: 'a', text: 'Süslü anlatım' },
        { id: 'b', text: 'Ağır dil' },
        { id: 'c', text: 'Kapalı anlatım' },
        { id: 'd', text: 'Yalınlık' },
        { id: 'e', text: 'Karmaşıklık' },
    ],
    correctOptionId: 'd'
  },
  {
    id: 'tur-41',
    subject: 'turkish',
    question: '“Kırmak” fiili hangi cümlede gerçek anlamıyla kullanılmıştır?',
    options: [
        { id: 'a', text: 'Kalbi kırıldı bu sözlere.' },
        { id: 'b', text: 'Vazoyu yere düşürüp kırdı.' },
        { id: 'c', text: 'Rekorları kırdı bu sezon.' },
        { id: 'd', text: 'Sözünü kırmayı hiç istemezdi.' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-42',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde soru anlamı zamirle sağlanmıştır?',
    options: [
        { id: 'a', text: 'Nereye gidiyorsun?' },
        { id: 'b', text: 'Nasıl bir film izledin?' },
        { id: 'c', text: 'Kim geldi?' },
        { id: 'd', text: 'Niçin ağlıyorsun?' },
        { id: 'e', text: 'Hangi kitabı okuyorsun?' },
    ],
    correctOptionId: 'c'
  },
  {
    id: 'tur-43',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde fiilden isim yapım eki almış bir sözcük yoktur?',
    options: [
        { id: 'a', text: 'Gülüşüyle herkesi etkiledi.' },
        { id: 'b', text: 'Yazı yazmak çok keyifli.' },
        { id: 'c', text: 'Kitaplıkta çok eski eserler var.' },
        { id: 'd', text: 'Gezginler yeni yerler keşfetti.' },
    ],
    correctOptionId: 'c'
  },
  {
    id: 'tur-44',
    subject: 'turkish',
    question: '“Sanat, hayatın karmaşasından bir kaçış değil, tam aksine onu anlamlandırma çabasıdır. Bir resim, bir melodi veya bir şiir, insanın ruhuna dokunarak onu düşündürür, hissettirir ve dünyayı farklı bir gözle görmesini sağlar.” Paragrafın ana düşüncesi nedir?',
    options: [
        { id: 'a', text: 'Sanat, insana sadece eğlence sunar.' },
        { id: 'b', text: 'Sanatın görevi, yaşamın zorluklarından uzaklaştırmaktır.' },
        { id: 'c', text: 'Sanat, yaşamı anlamlandırmanın ve kişisel gelişimin bir aracıdır.' },
        { id: 'd', text: 'Resim, müzik ve şiir sanatın en önemli dallarıdır.' },
    ],
    correctOptionId: 'c'
  },
  {
    id: 'tur-45',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde ilgi zamiri (-ki) kullanılmıştır?',
    options: [
        { id: 'a', text: 'Evdeki hesap çarşıya uymaz.' },
        { id: 'b', text: 'Benimki bozuldu, seninkini kullanabilir miyim?' },
        { id: 'c', text: 'Mademki geldin, otur bir çay iç.' },
        { id: 'd', text: 'Akşamki yemek çok güzeldi.' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-46',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde herhangi bir ses olayı yoktur?',
    options: [
        { id: 'a', text: 'Ağacın dalları sallanıyordu.' },
        { id: 'b', text: 'Rengi soldu.' },
        { id: 'c', text: 'Kitabı okudu.' },
        { id: 'd', text: 'Kalbin ritmi hızlandı.' },
        { id: 'e', text: 'Çocuğun oyuncağı kayboldu.' },
    ],
    correctOptionId: 'a'
  },
  {
    id: 'tur-47',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde yalın bir anlatım yoktur?',
    options: [
        { id: 'a', text: 'Bugün hava çok güzeldi.' },
        { id: 'b', text: 'Masalsı bir dünyanın büyülü atmosferine kapıldı.' },
        { id: 'c', text: 'Eve gelince yemek yedi.' },
        { id: 'd', text: 'Kitabı okuyup uyudu.' },
        { id: 'e', text: 'Hızlı adımlarla yürüdü.' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-48',
    subject: 'turkish',
    question: 'Aşağıdaki cümlelerin hangisinde zarf-fiil (bağ-fiil) kullanılmıştır?',
    options: [
        { id: 'a', text: 'Koşan adamı gördüm.' },
        { id: 'b', text: 'Gelince haber veririm.' },
        { id: 'c', text: 'Okunacak çok kitabım var.' },
        { id: 'd', text: 'Yüzen ördekler çok şirindi.' },
    ],
    correctOptionId: 'b'
  },
  {
    id: 'tur-49',
    subject: 'turkish',
    question: '“Hızlı (A) adımlarla yürüyordu. Güzel (B) bir resim yaptı. Yavaş yavaş (C) ilerliyordu. Büyük (D) bir ev aldılar. Kolay (E) sorular sordu.” Cümlelerdeki altı çizili sözcüklerden hangisi türü bakımından diğerlerinden farklıdır?',
    options: [
        { id: 'a', text: 'A' },
        { id: 'b', text: 'B' },
        { id: 'c', text: 'C' },
        { id: 'd', text: 'D' },
        { id: 'e', text: 'E' },
    ],
    correctOptionId: 'c'
  },
  {
    id: 'tur-50',
    subject: 'turkish',
    question: '“İnsanın doğayla iç içe olması, ruhunu dinlendirir. Şehrin gürültüsünden uzaklaşıp bir orman gezisi yapmak, deniz kenarında yapılan bir yürüyüş insana huzur verir. Örneğin, bir kuş cıvıltısı, bir dalga sesi tüm stresi unutturabilir.” Parçada hangi düşünceyi geliştirme yolu kullanılmıştır?',
    options: [
        { id: 'a', text: 'Tanımlama' },
        { id: 'b', text: 'Karşılaştırma' },
        { id: 'c', text: 'Örnekleme' },
        { id: 'd', text: 'Benzetme' },
    ],
    correctOptionId: 'c'
  },
];
