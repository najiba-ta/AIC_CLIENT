"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Scale,
  ShieldCheck,
  Volume2,
  BookOpen,
  Eye,
  GraduationCap,
  Landmark,
  Award,
  ArrowRight,
  Sparkles,
  BookCheck,
  CheckCircle2,
  Gift,
  Users,
  ArrowLeft,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CourseDetailsClient() {
  const { isBn } = useLanguage();

  const coreSubjects = [
    {
      id: "fiqh",
      title: isBn ? "ফিক্বহ (মাসআলা-মাসায়েল)" : "Fiqh",
      arabic: "الفقه",
      subtitle: isBn ? "দৈনন্দিন জীবনের প্রয়োজনীয় ধর্মীয় বিধান" : "Practical Islamic Rulings",
      icon: Scale,
      isFree: false,
      description: isBn
        ? "পবিত্রতা, নামাজ, রোজা এবং অন্যান্য ইবাদতের দৈনন্দিন প্রয়োজনীয় মাসআলা-মাসায়েল শিক্ষা।"
        : "Learning the practical rulings of Islam for everyday life, including purification, prayer, fasting, and other acts of worship.",
      whatYouWillLearn: isBn
        ? "কুরআন ও সুন্নাহর আলোকে পবিত্রতা ও দৈনন্দিন ইবাদতের সহিহ নিয়ম এবং হালাল-হারামের সুস্পষ্ট নির্দেশনা।"
        : "Students gain a systematic understanding of the Halal and Haram in daily living, learning the essential conditions, pillars, and obligations that validate acts of worship according to the Qur’an and authentic Sunnah.",
      mainTopics: isBn
        ? [
            "পবিত্রতা ও তাহারাত (অজু, গোসল, তায়াম্মুম ও নাপাকি দূরীকরণ)",
            "নামাজ ও সালাত (ফরজ, ওয়াজিব, সুন্নত, জামাতের বিধান ও কাজা নামাজ)",
            "রোজা ও সিয়াম (রমজানের বিধান, রোজা ভঙ্গের কারণ ও কাজা-কাফফারা)",
            "যাকাত ও সদকা (যাকাত ফরজ হওয়ার শর্ত, হিসাব ও ব্যয়ের খাতসমূহ)",
            "হালাল-হারাম ও দৈনন্দিন লেনদেনের ইসলামী নীতিমালা",
          ]
        : [
            "Purification & Taharah (Wudu, Ghusl, Tayammum, removal of impurities)",
            "Prayer / Salah (Conditions, pillars, congregational rulings, Sunan & missed prayers)",
            "Fasting / Sawm (Rulings of Ramadan, nullifiers, exemptions, and Sunnah fasts)",
            "Zakat & Charity (Core obligations, calculation basics, and rightful recipients)",
            "Daily Living & Ethics (Halal and Haram in food, drink, and personal transactions)",
          ],
      outcome: isBn
        ? "নির্ভুল ও আত্মবিশ্বাসের সাথে দৈনন্দিন সকল ইবাদত পালনের মানসিক প্রশান্তি ও দক্ষতা।"
        : "Confidence and accuracy in performing daily acts of worship with peace of mind, knowing they are performed in adherence with sound Islamic jurisprudence.",
      suitableFor: isBn
        ? "কিশোর, প্রাপ্তবয়স্ক, নওমুসলিম এবং যারা দ্বীনি বিধিবিধান সঠিকভাবে পালন করতে চান।"
        : "Youth, adults, new Muslims, and anyone seeking clarity and correctness in their daily worship.",
    },
    {
      id: "aqaaid",
      title: isBn ? "আক্বাঈদ (মৌলিক বিশ্বাসমালা)" : "Aqaaid",
      arabic: "العقائد",
      subtitle: isBn ? "ইসলামের মূল বিশ্বাসের বুনিয়াদ" : "Fundamental Islamic Creed",
      icon: ShieldCheck,
      isFree: false,
      description: isBn
        ? "আল্লাহ তাআলা, ফেরেশতা, আসমানী কিতাব, নবী-রাসূল, পরকাল এবং তাকদীরের প্রতি মৌলিক বিশ্বাস।"
        : "Studying the fundamental beliefs of Islam, including belief in Allah, the angels, the Divine Books, the Prophets, the Hereafter, and Divine Decree.",
      whatYouWillLearn: isBn
        ? "ঈমানের রুকনসমূহ এবং তাওহীদের বিশুদ্ধ ধারণার মাধ্যমে দ্বিধাদ্বন্দ্বমুক্ত অটুট বিশ্বাস গড়ে তোলা।"
        : "Students explore the core articles of faith (Arkan al-Iman) to build a grounded, unwavering conviction, understanding Tawheed and clarifying common questions with authentic Islamic scholarship.",
      mainTopics: isBn
        ? [
            "তাওহীদ (আল্লাহ তাআলার রুবুবিয়্যাহ, উলুহিয়্যাহ ও আসমা-সিফাত)",
            "ফেরেশতাগণের অস্তিত্ব ও তাদের ওপর অর্পিত দায়িত্বসমূহ",
            "আসমানী কিতাবসমূহ এবং সর্বশেষ কিতাব আল-কুরআন",
            "রিসালাত এবং বিশ্বনবী হযরত মুহাম্মদ ﷺ-এর খাতামুন নাবিয়্যীন মর্যাদা",
            "আখিরাত (কবরের জীবন, হাশর, মিজান, পুলসিরাত, জান্নাত ও জাহান্নাম)",
            "তাকদীর (আল্লাহর নির্ধারিত ভাগ্যলিপির ওপর নিখাদ বিশ্বাস)",
          ]
        : [
            "Tawheed (Oneness of Allah in His Lordship, Worship, and Beautiful Names & Attributes)",
            "Belief in the Angels and their roles in the cosmic and spiritual order",
            "The Divine Books (Torah, Gospel, Psalms, and the Final Revelation: The Holy Qur’an)",
            "Prophethood and the finality of the message of Prophet Muhammad ﷺ",
            "The Hereafter (Life of the Grave, Day of Resurrection, Judgment, Jannah, and Jahannam)",
            "Qadar (Understanding Divine Decree and predestination with clarity)",
          ],
      outcome: isBn
        ? "সন্দেহ ও বিভ্রান্তিমুক্ত মজবুত ঈমান যা জীবনের সকল ক্ষেত্রে আত্মিক শক্তি যোগায়।"
        : "An intellectual and spiritual fortress of faith that protects against modern doubts and instills tranquility, purpose, and reverence for Allah.",
      suitableFor: isBn
        ? "সকল শিক্ষার্থী, তরুণ ও অভিভাবক যারা বিশুদ্ধ ইসলামী আকিদা শিখতে চান।"
        : "All students, teenagers, and adults seeking deep philosophical and spiritual grounding in classical Islamic creed.",
    },
    {
      id: "tajweed",
      title: isBn ? "তাজবীদ (শুদ্ধ উচ্চারণ ও পঠন)" : "Tajweed",
      arabic: "التجويد",
      subtitle: isBn ? "সহিহ মাখরাজ ও সিফাত শিক্ষা" : "Recitation & Phonetics",
      icon: Volume2,
      isFree: false,
      description: isBn
        ? "সঠিক মাখরাজ, উচ্চারণ এবং তাজবীদের নিয়মানুযায়ী সহিহ-শুদ্ধভাবে কুরআন তিলাওয়াত শিক্ষা।"
        : "Learning to recite the Qur’an correctly with proper pronunciation, Makharij, and the rules of Tajweed.",
      whatYouWillLearn: isBn
        ? "আরবি প্রতিটি অক্ষরের নিখুঁত উচ্চারণস্থল এবং তিলাওয়াতের সৌন্দর্য ও শ্রুতিমধুরতা অর্জন।"
        : "Students learn the anatomical articulation points of every Arabic letter and apply the rules of recitation so that every verse is recited in the harmonious manner in which it was revealed.",
      mainTopics: isBn
        ? [
            "মাখারিজুল হুরুফ (কণ্ঠনালী, জিহ্বা ও ওষ্ঠ থেকে ১৭টি মাখরাজের নিখুঁত প্রয়োগ)",
            "সিফাতুল হুরুফ (মোটা ও চিকন করে পড়ার কায়দা)",
            "নূন সাকিন ও তানভীনের নিয়ম (ইযহার, ইদগাম, ইক্বলাব, ইখফা)",
            "মীম সাকিনের নিয়ম ও রা-লাম পড়ার নিয়মাবলী",
            "মাদ্দ ও ওয়াক্ফের বিস্তারিত আহকাম",
          ]
        : [
            "Makharij al-Huroof (Precise physical exit points of throat, tongue, and lips)",
            "Sifaat al-Huroof (Phonetic characteristics such as softness, heaviness, and echo)",
            "Rules of Noon Sakinah & Tanween (Izhar, Idgham, Iqlab, and Ikhfa)",
            "Rules of Meem Sakinah & Rules of Raa and Laam (Tarkheeq & Tafkheem)",
            "Madd (Natural and prolonged vowel rules) and Waqf (Proper stopping and pausing)",
          ],
      outcome: isBn
        ? "অর্থের বিকৃতি এড়িয়ে রাসূলুল্লাহ ﷺ-এর শেখানো পদ্ধতিতে কুরআন তিলাওয়াতের যোগ্যতা।"
        : "The ability to recite the Qur’an accurately without altering the sacred meanings through mispronunciation, fulfilling the prophetic tradition of recitation.",
      suitableFor: isBn
        ? "সকল বয়সের তিলাওয়াতকারী যারা উচ্চারণের ভুলভ্রান্তি দূর করে তিলাওয়াত শ্রুতিমধুর করতে চান।"
        : "Reciters of all levels wishing to beautify their recitation and eliminate phonological mistakes.",
    },
    {
      id: "nazra-quran",
      title: isBn ? "নাযেরা কুরআন (দেখে কুরআন পড়া)" : "Nazra Qur’an",
      arabic: "ناظرة القرآن",
      subtitle: isBn ? "সাবলীলভাবে দেখে পড়ার প্রশিক্ষণ" : "Fluent Reading from Text",
      icon: Eye,
      isFree: false,
      description: isBn
        ? "আরবি হরফ চেনার মাধ্যমে সরাসরি কুরআন দেখে দেখে সাবলীল ও নির্ভুলভাবে পড়ার দক্ষতা।"
        : "Learning to read the Qur’an fluently and correctly by looking directly at the Arabic text.",
      whatYouWillLearn: isBn
        ? "হরফ পরিচয় থেকে শুরু করে যুক্তাক্ষর, হরকত ও তানভীনের সাহায্যে পুরো কুরআন অনায়াসে পড়া।"
        : "Starting with letter recognition and vowel indicators, students build fluency in recognizing connected Arabic script, graduating toward independent, confident reading directly from the Mushaf.",
      mainTopics: isBn
        ? [
            "আরবি বর্ণমালার একক ও যুক্ত রূপ শনাক্তকরণ",
            "হরকত (যবর, যের, পেশ) ও তানভীন পড়া",
            "জযম, তাশদীদ ও সাইলেন্ট অক্ষরের পরিচয়",
            "শব্দ সংযোগ ও পূর্ণ আয়াতের ধারাবাহিক পঠন",
            "আমপারা ও পূর্ণ কুরআনের মুসহাফ থেকে সরাসরি নিয়মিত অনুশীলন",
          ]
        : [
            "Arabic Alphabet identification in isolated, beginning, middle, and end positions",
            "Harakat (Short vowels: Fatha, Kasra, Damma) and Tanween (Double vowels)",
            "Sukoon, Shaddah, and Silent Letters in Qur’anic orthography",
            "Word linking and continuous sentence recitation from the Arabic text",
            "Direct guided practice reading from Juz Amma into the full Mushaf",
          ],
      outcome: isBn
        ? "কুরআনের যে-কোনো পৃষ্ঠা খুলে আত্মবিশ্বাসের সাথে সাবলীলভাবে পড়ার পূর্ণ আত্মনির্ভরশীলতা।"
        : "Complete self-reliance when opening the Qur’an, reading any Surah fluently with rhythm, speed, and accuracy.",
      suitableFor: isBn
        ? "শিশু, শিক্ষানবিস এবং যে-কেউ যারা কুরআন পড়া শুরু করতে বা নিয়মিত রিভিশন দিতে চান।"
        : "Children, beginners, adults learning to read Arabic, and anyone refreshing their reading fundamentals.",
    },
    {
      id: "islamic-studies",
      title: isBn ? "ইসলামিয়াত ও সুন্নাহ (ইসলামিক স্টাডিজ)" : "Islamic Studies",
      arabic: "الدراسات الإسلامية",
      subtitle: isBn ? "আদব, আখলাক ও মাসনূন দোয়া" : "Manners, Character & Sunnah",
      icon: GraduationCap,
      isFree: false,
      description: isBn
        ? "দৈনন্দিন জীবনে প্রয়োজনীয় দোয়া, সুন্নত, শিষ্টাচার এবং একজন মুসলিমের আচরণ ও স্বভাব চরিত্র গঠন।"
        : "Learning Islamic manners, character, Duas, Sunnah, worship, and essential daily teachings every Muslim should know.",
      whatYouWillLearn: isBn
        ? "রাসূলুল্লাহ ﷺ-এর সুন্নাহর ভিত্তিতে উত্তম চরিত্র, পারিবারিক সৌহার্দ্য ও সামাজিক দায়িত্ববোধ।"
        : "Students explore the holistic way of life demonstrated by the Prophet ﷺ, focusing on moral uprightness, daily Azkar, respecting parents, family harmony, and ethical conduct in modern society.",
      mainTopics: isBn
        ? [
            "আদব ও আখলাক (বিনয়, সত্যবাদিতা, আমানতদারী ও ধৈর্য)",
            "ঘুম, আহার, ভ্রমণ, বিপদাপদ ও সুরক্ষার মাসনূন দোয়া ও আমল",
            "পিতা-মাতা, ভাই-বোন ও প্রতিবেশীর প্রতি দায়িত্ব ও কর্তব্য",
            "ইসলামী ক্যালেন্ডার ও বরকতময় মাসগুলোর ফজিলত",
            "সমসাময়িক সমাজে ঈমান ও মূল্যবোধ ধরে রাখার উপায়",
          ]
        : [
            "Adab & Akhlaaq (Prophetic etiquette in speech, truthfulness, humility, and patience)",
            "Daily Sunnahs and essential Duas for waking, sleeping, eating, traveling, and protection",
            "Rights of parents, siblings, elders, neighbors, and community members",
            "The Islamic Calendar, sacred months, and the virtues of special occasions",
            "Navigating peer pressure and living one's faith with dignity in contemporary life",
          ],
      outcome: isBn
        ? "বাস্তব জীবনে সুন্দর চরিত্র, বিনয় ও ইসলামী শিষ্টাচারের বাস্তব প্রতিফলন ঘটানো।"
        : "Embodying Islamic character, compassion, and noble ethics in daily life, both inside the home and throughout the wider community.",
      suitableFor: isBn
        ? "শিশু, কিশোর ও তরুণদের আদর্শ মানসিক ও চারিত্রিক গঠনের জন্য।"
        : "Children, teenagers, and families seeking structured moral mentorship and holistic Islamic character formation.",
    },
    {
      id: "hifz",
      title: isBn ? "হিফযুল কুরআন (কুরআন মুখস্থকরণ)" : "Hifz",
      arabic: "حفظ القرآن",
      subtitle: isBn ? "পরিকল্পিত তত্ত্বাবধানে কুরআন মুখস্থ" : "Qur'an Memorization",
      icon: Award,
      isFree: false,
      description: isBn
        ? "তাজবীদ রক্ষা করে উস্তাদের প্রত্যক্ষ তত্ত্বাবধানে ধারাবাহিক রিভিশনসহ কুরআনুল কারীম হিফজ।"
        : "Memorizing the Qur’an with proper Tajweed, structured guidance, revision, and teacher support.",
      whatYouWillLearn: isBn
        ? "দৈনিক নতুন পড়া (সবক), সাম্প্রতিক পড়া (সবকি) এবং পূর্বের মুখস্থ অংশের নিয়মিত রিভিশন (মনজিল)।"
        : "Students follow a time-tested, disciplined memorization curriculum combining daily new lessons (Sabaq), short-term consolidation (Sabqi), and long-term cumulative revision (Manzil / Dohr).",
      mainTopics: isBn
        ? [
            "স্মরণশক্তি বৃদ্ধির বৈজ্ঞানিক ও ঐতিহ্যবাহী হিফজ কৌশল",
            "প্রতিদিন উস্তাদের কাছে নতুন সবক সরাসরি শোনানো",
            "পড়া ভুলে যাওয়া রোধে প্রতিদিনের সবকি দোহরানো",
            "পুরো মুখস্থ অংশের নিয়মিত মজবুত মনজিল রিভিশন",
            "হিফজের পাশাপাশি তাজবীদের নিয়ম রক্ষা করে তিলাওয়াত",
          ]
        : [
            "Memorization techniques suited to individual learning retention",
            "Daily Sabaq (new memorization) recitation directly to the teacher",
            "Sabqi (recent Juz retention) daily revision to prevent forgetfulness",
            "Manzil / Dohr (cumulative review) for long-term retention",
            "Tajweed integration and correct stopping rules during memorized recitation",
          ],
      outcome: isBn
        ? "হৃদয়ে পবিত্র কুরআন চিরস্থায়ীভাবে ধারণ এবং উচ্চতর মানসিক শৃঙ্খলা ও আত্মিক নূর অর্জন।"
        : "Preserving verses and Surahs firmly in memory with Tajweed accuracy, developing strong focus, memory retention, and spiritual discipline.",
      suitableFor: isBn
        ? "উৎসর্গীকৃত শিক্ষার্থী যারা নির্বাচিত সূরা বা সম্পূর্ণ কুরআন হিফজ করতে চান।"
        : "Motivated students, youth, and adults committed to memorizing select Surahs or the complete Qur’an under continuous teacher supervision.",
    },
  ];

  const freeSubjects = [
    {
      id: "tafsir",
      title: isBn ? "তাফসীরুল কুরআন" : "Tafsir",
      arabic: "التفسير",
      subtitle: isBn ? "কুরআনের অর্থ, ব্যাখ্যা ও গভীর প্রজ্ঞা" : "Meanings, Explanations & Qur'anic Guidance",
      icon: BookOpen,
      isFree: true,
      description: isBn
        ? "প্রোগ্রামে ভর্তির সাথে তাফসীর সম্পূর্ণ ফ্রি অন্তর্ভুক্ত। কুরআনের আয়াতসমূহের গভীর অর্থ, শানে নুযূল ও শিক্ষা হৃদয়ঙ্গম।"
        : "Students enrolled in the main program also receive Tafsir as a FREE included subject. They will study the meanings, explanations, lessons, and guidance contained in Qur’anic verses.",
      whatYouWillLearn: isBn
        ? "শুধু শব্দের পাঠ নয়, বরং আয়াতের পেছনের প্রেক্ষাপট ও বাস্তব জীবনের সাথে প্রাসঙ্গিকতা উপলব্ধি করা।"
        : "Students move beyond mechanical recitation to understand the profound divine message, uncovering historical contexts of revelation (Asbab an-Nuzul), linguistic beauty, and practical wisdom for daily life.",
      mainTopics: isBn
        ? [
            "দৈনন্দিন নামাযে পঠিত গুরুত্বপূর্ণ সূরাসমূহের তাফসীর",
            "শানে নুযূল (আয়াত নাজিলের ঐতিহাসিক পটভূমি)",
            "আয়াতসমূহের পারস্পরিক যোগসূত্র ও মূল শিক্ষা",
            "কুরআনের দৃষ্টান্ত ও নীতিবাক্য থেকে আত্মশুদ্ধির উপায়",
            "আধুনিক জীবনের সংকট উত্তরণে কুরআনের নির্দেশনা",
          ]
        : [
            "Meanings, vocabulary, and themes of frequently recited Surahs",
            "Asbab an-Nuzul (The historical occasions and contexts of revelation)",
            "Thematic connection between verses and overall Surah structure",
            "Spiritual, moral, and personal lessons embedded in divine commands and parables",
            "Applying the guidance of the Qur’an to contemporary moral and ethical challenges",
          ],
      outcome: isBn
        ? "কুরআনের সাথে এক গভীর ও অর্থবহ সম্পর্ক সৃষ্টি, যার ফলে প্রতিটি নামায হয় হৃদয়স্পর্শী।"
        : "A transformative relationship with the Qur’an where every prayer and recitation becomes a conscious, reflective conversation with Allah.",
      suitableFor: isBn
        ? "মূল কোর্সে ভর্তি হওয়া সকল শিক্ষার্থী যারা আল্লাহর বাণীর মর্মার্থ বুঝতে চান।"
        : "All students enrolled in the Comprehensive Islamic Education Program seeking to understand what they recite.",
    },
    {
      id: "islamic-history",
      title: isBn ? "ইসলামের ইতিহাস ও সীরাত" : "Islamic History",
      arabic: "التاريخ الإسلامي",
      subtitle: isBn ? "নবী-রাসূল ও সাহাবায়ে কেরামের গৌরবময় জীবন" : "Seerah of the Prophet ﷺ, Prophets & Companions",
      icon: Landmark,
      isFree: true,
      description: isBn
        ? "প্রোগ্রামে ভর্তির সাথে ইসলামিক হিস্ট্রি সম্পূর্ণ ফ্রি অন্তর্ভুক্ত। আম্বিয়ায়ে কেরাম ও সীরাতুন্নবী ﷺ থেকে ঐতিহাসিক শিক্ষা।"
        : "Students enrolled in the main program also receive Islamic History FREE. Topics include the lives of the Prophets, the Seerah of Prophet Muhammad ﷺ, the Sahabah, and important events and lessons from Islamic history.",
      whatYouWillLearn: isBn
        ? "নবী-রাসূলগণের ত্যাগ, মক্কী ও মাদানী যুগের বিপ্লব এবং সাহাবায়ে কেরামের আদর্শ জীবনালেখ্য।"
        : "Students gain an inspiring overview of sacred history, from the struggles of early Prophets to the transformative life of Prophet Muhammad ﷺ, his noble companions, and key turning points of Islamic civilization.",
      mainTopics: isBn
        ? [
            "কাসাসুল আম্বিয়া (নবী-রাসূলগণের শিক্ষণীয় ঘটনা)",
            "সীরাতুন্নবী ﷺ (মক্কী জীবনের ধৈর্য ও মাদানী জীবনের দাওয়াত)",
            "খোলাফায়ে রাশেদীন ও শীর্ষ সাহাবিগণের ঈমানী বীরত্ব",
            "মুসলিম সভ্যতার গুরুত্বপূর্ণ ঐতিহাসিক মাইলফলক",
            "বর্তমান জীবনে নেতৃত্ব ও নৈতিকতার বাস্তব পাঠ গ্রহণ",
          ]
        : [
            "Stories of the Prophets (Qasas al-Anbiya) and their messages of patience and perseverance",
            "The Noble Seerah: The Meccan period of steadfastness and the Medinan period of community building",
            "The Khulafa ar-Rashidoon (Rightly-Guided Caliphs) and prominent Sahabah as real-life role models",
            "Crucial historical milestones that shaped Muslim society and the preservation of sacred knowledge",
            "Extracting timeless ethical and leadership lessons applicable to our times",
          ],
      outcome: isBn
        ? "ইসলামী ঐতিহ্যের প্রতি গর্ববোধ, রাসূলুল্লাহ ﷺ-এর প্রতি নিখাদ ভালোবাসা ও আদর্শিক অনুপ্রেরণা।"
        : "A deep sense of Islamic identity, pride in heritage, sincere love for the Messenger of Allah ﷺ, and historical context for Islamic rulings.",
      suitableFor: isBn
        ? "সকল শিক্ষার্থী, তরুণ ও অভিভাবক যারা ইসলামের গৌরবময় ইতিহাসের আলোকবর্তিকা শিখতে চান।"
        : "All enrolled students, youth, and families who wish to connect with their sacred heritage.",
    },
  ];

  const programBenefits = isBn
    ? [
        {
          title: "পূর্ণাঙ্গ দ্বীনি পাঠ্যক্রম",
          desc: "একটি সমন্বিত প্রোগ্রামে ইসলামের সকল মৌলিক ও প্রয়োজনীয় বিষয়ের পাঠদান।",
        },
        {
          title: "সহিহ কুরআন পঠন",
          desc: "হরফ চেনা থেকে শুরু করে সাবলীল ও সুরলিত কণ্ঠে শুদ্ধ কুরআন তিলাওয়াত।",
        },
        {
          title: "তাজবীদের কঠোর অনুশীলন",
          desc: "উচ্চারণের ভুলভ্রান্তি দূর করে রাসূলুল্লাহ ﷺ-এর শেখানো নিয়মে তিলাওয়াত।",
        },
        {
          title: "হিফজের সুশৃঙ্খল পদ্ধতি",
          desc: "সবক, সবকি ও মনজিলভিত্তিক সুসংগঠিত পদ্ধতিতে কুরআন স্মৃতিতে ধারণ।",
        },
        {
          title: "মৌলিক আক্বাঈদ ও ফিক্বহ",
          desc: "বিশুদ্ধ ঈমানী বিশ্বাস এবং দৈনন্দিন ইবাদত-বন্দেগির সঠিক বিধিবিধান শিক্ষা।",
        },
        {
          title: "আদব ও মাসনূন আমল",
          desc: "দৈনন্দিন দোয়া, সুন্নত ও চরিত্র গঠনের মাধ্যমে আলোকিত জীবন গড়ার পথ।",
        },
        {
          title: "তাফসীর সম্পূর্ণ ফ্রি অন্তর্ভুক্ত",
          desc: "কোর্সে ভর্তির সাথেই কোনো অতিরিক্ত ফি ছাড়াই তাফসীর ক্লাসে অংশগ্রহণের সুযোগ।",
        },
        {
          title: "ইসলামের ইতিহাস ফ্রি অন্তর্ভুক্ত",
          desc: "সীরাত ও ইতিহাসের অমূল্য পাঠ ভর্তির সাথে সম্পূরক উপহার হিসেবে প্রদান।",
        },
        {
          title: "পরিকল্পিত পাঠ পরিক্রমা",
          desc: "ধাপে ধাপে অগ্রসর হওয়ার জন্য পরিকল্পিত আধুনিক ও ঐতিহ্যবাহী সিলেবাস।",
        },
        {
          title: "যোগ্য উস্তাদগণের প্রত্যক্ষ গাইডেন্স",
          desc: "দক্ষ ও স্নেহশীল শিক্ষকগণের ব্যক্তিগত তদারকি ও নিয়মিত অগ্রগতি মূল্যায়ন।",
        },
      ]
    : [
        {
          title: "Comprehensive Islamic Learning",
          desc: "All foundational areas of sacred knowledge brought together in one coherent program.",
        },
        {
          title: "Qur’an Reading & Recitation",
          desc: "Systematic progression from reading fluency to melodious, measured tilawah.",
        },
        {
          title: "Tajweed Development",
          desc: "Rigorous phonetics and articulation training to eliminate errors in recitation.",
        },
        {
          title: "Memorization Guidance",
          desc: "Structured Hifz methodology with daily teacher verification and continuous revision.",
        },
        {
          title: "Essential Islamic Knowledge",
          desc: "Solid understanding of faith, creed (Aqaaid), and rulings that govern daily worship.",
        },
        {
          title: "Practical Daily Islamic Teachings",
          desc: "Manners, prophetic Duas, and Sunnah practices for real-world family and community living.",
        },
        {
          title: "Tafsir Included FREE",
          desc: "Included at no additional fee for all students enrolled in the comprehensive program.",
        },
        {
          title: "Islamic History Included FREE",
          desc: "Inspiring Seerah and stories of the Prophets included complimentary with enrollment.",
        },
        {
          title: "Structured Learning",
          desc: "An organized, step-by-step curriculum designed for clear progress and steady mastery.",
        },
        {
          title: "Teacher-Guided Education",
          desc: "Attentive guidance, personal recitation review, and spiritual mentorship from qualified teachers.",
        },
      ];

  return (
    <main className="flex-1 w-full bg-[#FAF8F2] text-[#252525]">
      {/* Hero Header Section */}
      <section className="relative w-full bg-[#FAF8F2] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#E5DFD3] overflow-hidden">
        {/* Ambient Madrasah Background Texture */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
          <div className="absolute inset-0 opacity-45 filter blur-[1px] scale-[1.01]">
            <Image
              src="/images/quran-madrasah-bg.jpg"
              alt="Madrasah Background"
              fill
              unoptimized
              priority
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F2]/80 via-white/70 to-[#FAF8F2]/85 pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B89550]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center min-w-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-white/90 text-xs sm:text-sm font-semibold text-[#B89550] shadow-2xs mb-4">
            <Sparkles className="w-4 h-4 text-[#B89550]" />
            <span>{isBn ? "ইসলামী শিক্ষা পাঠ্যক্রম" : "Islamic Education Curriculum"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#252525] leading-tight">
            {isBn ? "পূর্ণাঙ্গ " : "Comprehensive "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89550] via-[#C9A86A] to-[#A07E3C]">
              {isBn ? "ইসলামী শিক্ষা প্রোগ্রাম" : "Islamic Education Program"}
            </span>
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#B89550] tracking-wide mt-3" dir="rtl">
            وَقُل رَّبِّ زِدْنِي عِلْمًا
          </p>

          <p className="max-w-3xl mx-auto mt-4 text-base sm:text-lg md:text-xl text-[#595959] leading-relaxed font-normal">
            {isBn
              ? "কুরআন তিলাওয়াত, হিফজ, আক্বাঈদ ও ফিক্বহের সমন্বয়ে একটি সুশৃঙ্খল আধুনিক পাঠ্যক্রম—যেখানে তাফসীর ও ইসলামের ইতিহাস সম্পূর্ণ বিনামূল্যে অন্তর্ভুক্ত।"
              : "A unified, structured curriculum combining Qur'anic recitation, memorization, essential creed, and practical rulings—with Tafsir and Islamic History included free with your enrollment."}
          </p>

          {/* Highlights Ribbon */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/85 text-xs font-semibold text-[#252525] shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#B89550]" />
              {isBn ? "৬টি মূল বিষয় অন্তর্ভুক্ত" : "6 Core Subjects Included"}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF8F2] border border-[#B89550]/40 text-xs font-bold text-[#B89550] shadow-2xs">
              <Gift className="w-4 h-4 text-[#B89550]" />
              {isBn ? "তাফসীর + ইতিহাস ফ্রি উপহার" : "Tafsir + History FREE with Enrollment"}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/85 text-xs font-semibold text-[#252525] shadow-2xs">
              <Users className="w-4 h-4 text-[#B89550]" />
              {isBn ? "উস্তাদগণের প্রত্যক্ষ তত্ত্বাবধান" : "Teacher-Guided Education"}
            </span>
          </div>
        </div>
      </section>

      {/* Program Overview Banner */}
      <section className="relative w-full py-10 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E5DFD3]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-[#252525]">
              {isBn ? "মজবুত ইসলামী বুনিয়াদের জন্য যা কিছু প্রয়োজন" : "Everything you need for a firm Islamic foundation"}
            </h2>
            <p className="text-xs sm:text-sm text-[#595959]">
              {isBn
                ? "প্রতিটি বিষয়ের বিস্তারিত রূপরেখা, আলোচ্য বিষয় এবং ব্যবহারিক ফলাফল নিচে দেখুন।"
                : "Review the detailed breakdown of each subject below, including what students learn, key topics, and practical outcomes."}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/register?role=student&program=Comprehensive%20Islamic%20Education%20Program"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold shadow-md"
            >
              <BookCheck className="w-4 h-4 shrink-0" />
              <span>{isBn ? "প্রোগ্রামে ভর্তি হোন" : "Enroll in Program"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Subjects Detailed Breakdown */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F2]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#B89550]/40 text-xs sm:text-sm font-semibold text-[#B89550] shadow-2xs mb-3">
              <BookCheck className="w-4 h-4" />
              <span>{isBn ? "মূল প্রোগ্রামের পাঠ্যক্রম" : "Core Program Curriculum"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525]">
              {isBn ? "অন্তর্ভুক্ত ৬টি মূল বিষয়" : "The 6 Core Subjects Included"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-[#595959]">
              {isBn
                ? "প্রোগ্রামে ভর্তিকৃত প্রত্যেক শিক্ষার্থী এই গুরুত্বপূর্ণ বিষয়গুলোর প্রতিটিতে ধারাবাহিক শিক্ষা লাভ করবেন।"
                : "Every student enrolled in the program receives comprehensive instruction across each of these vital disciplines."}
            </p>
          </div>

          {/* Cards for 6 Core Subjects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {coreSubjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <div
                  key={subject.id}
                  id={subject.id}
                  className="rounded-3xl glass-panel p-6 sm:p-8 lg:p-9 shadow-lg relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="glass-specular-top" />

                  <div className="space-y-6">
                    {/* Header: Title, Arabic, Badge */}
                    <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200/60">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-xs text-[#B89550] border border-[#B89550]/30 flex items-center justify-center shadow-2xs shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-[#252525]">
                            {subject.title}
                          </h3>
                          <p className="text-xs font-semibold text-[#8C827A]">
                            {subject.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-serif text-lg sm:text-xl font-bold text-[#B89550] block" dir="rtl">
                          {subject.arabic}
                        </span>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 border border-stone-200 text-[#595959]">
                          {isBn ? "মূল বিষয়" : "Core Subject"}
                        </span>
                      </div>
                    </div>

                    {/* Detailed Description */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C827A] mb-1.5">
                        {isBn ? "বিষয়ের সংক্ষিপ্ত বিবরণ" : "Subject Overview"}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                        {subject.description}
                      </p>
                    </div>

                    {/* What Students Will Learn */}
                    <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-xs border border-white/80 space-y-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#252525] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#B89550]" />
                        <span>{isBn ? "যা যা শিখবেন" : "What You Will Learn"}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                        {subject.whatYouWillLearn}
                      </p>
                    </div>

                    {/* Main Topics Covered */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C827A]">
                        {isBn ? "প্রধান প্রধান আলোচ্য বিষয়" : "Main Topics Covered"}
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-[#595959]">
                        {subject.mainTopics.map((topic, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B89550] shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcome & Suitable For Grid */}
                    <div className="pt-4 border-t border-stone-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 rounded-xl bg-white/60 border border-white/70">
                        <span className="font-bold text-[#252525] block mb-1">
                          {isBn ? "শিক্ষণের ফলাফল ও প্রাপ্তি:" : "Learning Outcome / Benefit:"}
                        </span>
                        <span className="text-[#595959] leading-relaxed block">
                          {subject.outcome}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-white/60 border border-white/70">
                        <span className="font-bold text-[#252525] block mb-1">
                          {isBn ? "যাদের জন্য প্রযোজ্য:" : "Suitable For:"}
                        </span>
                        <span className="text-[#595959] leading-relaxed block">
                          {subject.suitableFor}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FREE WITH ENROLLMENT Section */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#E5DFD3]">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F2] border border-[#B89550]/40 text-xs sm:text-sm font-bold text-[#B89550] shadow-2xs mb-3">
              <Gift className="w-4 h-4" />
              <span>{isBn ? "ভর্তির সাথে বিশেষ সুবিধা" : "Complimentary Enrollment Benefits"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525]">
              {isBn ? "ভর্তির সাথে সম্পূর্ণ ফ্রি অন্তর্ভুক্ত" : "Included FREE with Enrollment"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-[#595959]">
              {isBn
                ? "পূর্ণাঙ্গ ইসলামী শিক্ষা প্রোগ্রামে ভর্তি হলে তাফসীর এবং ইসলামের ইতিহাস উভয়েই কোনো অতিরিক্ত খরচ ছাড়াই পাবেন।"
                : "When you enroll in the Comprehensive Islamic Education Program, both Tafsir and Islamic History are included at zero extra cost."}
            </p>
          </div>

          {/* Cards for Tafsir & Islamic History */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {freeSubjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <div
                  key={subject.id}
                  id={subject.id}
                  className="rounded-3xl bg-gradient-to-br from-[#FAF8F2]/90 via-white to-white border-2 border-[#B89550]/60 shadow-xl p-6 sm:p-8 lg:p-9 relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="glass-specular-top" />

                  <div className="space-y-6">
                    {/* Header: Title, Arabic, FREE Badge */}
                    <div className="flex items-start justify-between gap-4 pb-4 border-b border-stone-200/60">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-[#FAF8F2] text-[#B89550] border border-[#B89550]/40 flex items-center justify-center shadow-xs shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-xl sm:text-2xl font-bold text-[#252525]">
                              {subject.title}
                            </h3>
                          </div>
                          <p className="text-xs font-semibold text-[#8C827A]">
                            {subject.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#B89550] text-white shadow-2xs">
                          <Gift className="w-3.5 h-3.5" />
                          <span>{isBn ? "ফ্রি" : "FREE"}</span>
                        </span>
                        <span className="font-serif text-lg sm:text-xl font-bold text-[#B89550] block mt-1" dir="rtl">
                          {subject.arabic}
                        </span>
                      </div>
                    </div>

                    {/* Detailed Description */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#B89550] mb-1.5">
                        {isBn ? "ফ্রি কোর্সের বিবরণ" : "Complimentary Subject Overview"}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                        {subject.description}
                      </p>
                    </div>

                    {/* What Students Will Learn */}
                    <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#B89550]/30 space-y-1">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#252525] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#B89550]" />
                        <span>{isBn ? "যা যা শিখবেন" : "What You Will Learn"}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-[#595959] leading-relaxed">
                        {subject.whatYouWillLearn}
                      </p>
                    </div>

                    {/* Main Topics Covered */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C827A]">
                        {isBn ? "প্রধান প্রধান আলোচ্য বিষয়" : "Main Topics Covered"}
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-[#595959]">
                        {subject.mainTopics.map((topic, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B89550] shrink-0 mt-0.5" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcome & Suitable For Grid */}
                    <div className="pt-4 border-t border-stone-200/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 rounded-xl bg-white border border-stone-200">
                        <span className="font-bold text-[#252525] block mb-1">
                          {isBn ? "শিক্ষণের ফলাফল ও প্রাপ্তি:" : "Learning Outcome / Benefit:"}
                        </span>
                        <span className="text-[#595959] leading-relaxed block">
                          {subject.outcome}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-stone-200">
                        <span className="font-bold text-[#252525] block mb-1">
                          {isBn ? "যাদের জন্য প্রযোজ্য:" : "Suitable For:"}
                        </span>
                        <span className="text-[#595959] leading-relaxed block">
                          {subject.suitableFor}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Benefits Section */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F2] border-b border-[#E5DFD3]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#B89550]/40 text-xs sm:text-sm font-semibold text-[#B89550] shadow-2xs mb-3">
              <Award className="w-4 h-4" />
              <span>{isBn ? "মূল সুবিধাসমূহ" : "Key Advantages"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525]">
              {isBn ? "প্রোগ্রামের বিশেষ সুবিধাসমূহ" : "Program Benefits & Features"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-[#595959]">
              {isBn
                ? "যোগ্য শিক্ষকদের নির্দেশনায় আত্মিক বিকাশ, সঠিক আমল এবং কুরআনের সাথে গভীর বন্ধন গড়ে তোলার লক্ষ্য নিয়ে তৈরি।"
                : "Designed to foster spiritual growth, correct practice, and deep Qur'anic attachment under qualified supervision."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {programBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl glass-card relative overflow-hidden flex flex-col justify-between"
              >
                <div className="glass-specular-top" />
                <div>
                  <div className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-xs text-[#B89550] border border-[#B89550]/30 flex items-center justify-center shadow-2xs mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#252525] mb-1.5">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-[#595959] leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONE PROMINENT ENROLL NOW BANNER AT BOTTOM */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 sm:p-12 rounded-3xl sm:rounded-4xl glass-panel shadow-2xl relative overflow-hidden">
            <div className="glass-specular-top" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#B89550]/40 text-xs font-bold text-[#B89550] shadow-2xs mb-4">
              <Sparkles className="w-4 h-4" />
              <span>{isBn ? "ভর্তি কার্যক্রম চলমান" : "Unified Admissions Open"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252525] tracking-tight">
              {isBn ? "পূর্ণাঙ্গ ইসলামী শিক্ষা প্রোগ্রামে যুক্ত হোন" : "Begin the Comprehensive Islamic Education Program"}
            </h2>

            <p className="mt-4 text-xs sm:text-sm md:text-base text-[#595959] max-w-xl mx-auto leading-relaxed">
              {isBn
                ? "কুরআন তিলাওয়াত, হিফজ, আক্বাঈদ ও ফিক্বহ শিক্ষার এই পবিত্র যাত্রায় আপনার পরিবারকে সংযুক্ত করুন—তাফসীর ও ইতিহাস পাচ্ছেন সম্পূর্ণ ফ্রি।"
                : "Join students and families progressing through Qur'anic recitation, memorization, creed, and daily jurisprudence—with Tafsir and Islamic History included free."}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register?role=student&program=Comprehensive%20Islamic%20Education%20Program"
                className="btn-gold w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl text-base font-bold shadow-lg relative overflow-hidden"
              >
                <BookCheck className="w-5 h-5 shrink-0" />
                <span>{isBn ? "এখনই ভর্তি হোন" : "Enroll Now"}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>

              <Link
                href="/contact"
                className="btn-glass w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-[#252525]"
              >
                <span>{isBn ? "যোগাযোগ করুন" : "Contact Admissions"}</span>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-stone-200/60 flex items-center justify-center gap-2 text-xs text-[#8C827A]">
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-[#B89550] transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isBn ? "হোমপেজে ফিরে যান" : "Return to Homepage"}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
