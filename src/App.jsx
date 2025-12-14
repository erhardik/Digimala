
import React, { useState, useEffect } from 'react';
import Journey from './Journey';
import Welcome from './Welcome';
import BottomNav from './BottomNav';
import './index.css';

// Predefined mantras with word breakdown in multiple languages
const MANTRAS = {
  mahamrityunjaya: {
    name: "Mahamrityunjaya Mantra",
    hindi: {
      text: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्",
      words: ["ॐ", "त्र्यम्बकं", "यजामहे", "सुगन्धिं", "पुष्टिवर्धनम्", "उर्वारुकमिव", "बन्धनान्", "मृत्योर्मुक्षीय", "मामृतात्"],
      lines: [
        ["ॐ", "त्र्यम्बकं", "यजामहे"],
        ["सुगन्धिं", "पुष्टिवर्धनम्"],
        ["उर्वारुकमिव", "बन्धनान्"],
        ["मृत्योर्मुक्षीय", "मामृतात्"]
      ]
    },
    gujarati: {
      text: "ૐ ત્ર્યમ્બકં યજામહે સુગન્ધિં પુષ્ટિવર્ધનમ્ ઉર્વારુકમિવ બન્ધનાન્ મૃત્યોર્મુક્ષીય મામૃતાત્",
      words: ["ૐ", "ત્ર્યમ્બકં", "યજામહે", "સુગન્ધિં", "પુષ્ટિવર્ધનમ્", "ઉર્વારુકમિવ", "બન્ધનાન્", "મૃત્યોર્મુક્ષીય", "મામૃતાત્"],
      lines: [
        ["ૐ", "ત્ર્યમ્બકં", "યજામહે"],
        ["સુગન્ધિં", "પુષ્ટિવર્ધનમ્"],
        ["ઉર્વારુકમિવ", "બન્ધનાન્"],
        ["મૃત્યોર્મુક્ષીય", "મામૃતાત્"]
      ]
    },
    english: {
      text: "Om Tryambakam Yajamahe Sugandhim Pushtivardhanam Urvarukamiva Bandhanan Mrityormukshiya Maamritat",
      words: ["Om", "Tryambakam", "Yajamahe", "Sugandhim", "Pushtivardhanam", "Urvarukamiva", "Bandhanan", "Mrityormukshiya", "Maamritat"],
      lines: [
        ["Om", "Tryambakam", "Yajamahe"],
        ["Sugandhim", "Pushtivardhanam"],
        ["Urvarukamiva", "Bandhanan"],
        ["Mrityormukshiya", "Maamritat"]
      ]
    }
  },
  navkar: {
    name: "Navkar Mantra",
    hindi: {
      text: "नमो अरिहंताणं नमो सिद्धाणं नमो आयरियाणं नमो उवज्झायाणं नमो लोए सव्वसाहूणं एसो पंच नमोक्कारो सव्व पाव प्पणासणो मंगलाणं च सव्वेसिं पढमं हवइ मंगलं",
      words: ["नमो", "अरिहंताणं", "नमो", "सिद्धाणं", "नमो", "आयरियाणं", "नमो", "उवज्झायाणं", "नमो", "लोए", "सव्वसाहूणं", "एसो", "पंच", "नमोक्कारो", "सव्व", "पाव", "प्पणासणो", "मंगलाणं", "च", "सव्वेसिं", "पढमं", "हवइ", "मंगलं"],
      lines: [
        ["नमो", "अरिहंताणं"],
        ["नमो", "सिद्धाणं"],
        ["नमो", "आयरियाणं"],
        ["नमो", "उवज्झायाणं"],
        ["नमो", "लोए", "सव्वसाहूणं"],
        ["एसो", "पंच", "नमोक्कारो"],
        ["सव्व", "पाव", "प्पणासणो"],
        ["मंगलाणं", "च", "सव्वेसिं"],
        ["पढमं", "हवइ", "मंगलं"]
      ]
    },
    gujarati: {
      text: "નમો અરિહંતાણં નમો સિદ્ધાણં નમો આયરિયાણં નમો ઉવજ્ઝાયાણં નમો લોએ સવ્વસાહૂણં એસો પંચ નમોક્કારો સવ્વ પાવ પ્પણાસણો મંગલાણં ચ સવ્વેસિં પઢમં હવઇ મંગલં",
      words: ["નમો", "અરિહંતાણં", "નમો", "સિદ્ધાણં", "નમો", "આયરિયાણં", "નમો", "ઉવજ્ઝાયાણં", "નમો", "લોએ", "સવ્વસાહૂણં", "એસો", "પંચ", "નમોક્કારો", "સવ્વ", "પાવ", "પ્પણાસણો", "મંગલાણં", "ચ", "સવ્વેસિં", "પઢમં", "હવઇ", "મંગલં"],
      lines: [
        ["નમો", "અરિહંતાણં"],
        ["નમો", "સિદ્ધાણં"],
        ["નમો", "આયરિયાણં"],
        ["નમો", "ઉવજ્ઝાયાણં"],
        ["નમો", "લોએ", "સવ્વસાહૂણં"],
        ["એસો", "પંચ", "નમોક્કારો"],
        ["સવ્વ", "પાવ", "પ્પણાસણો"],
        ["મંગલાણં", "ચ", "સવ્વેસિં"],
        ["પઢમં", "હવઇ", "મંગલં"]
      ]
    },
    english: {
      text: "Namo Arihantanam Namo Siddhanam Namo Ayariyanam Namo Uvajjhayanam Namo Loe Savvasahunam Eso Pancha Namokkaro Savva Pav Ppanasano Mangalanam Cha Savvesim Padhamam Havai Mangalam",
      words: ["Namo", "Arihantanam", "Namo", "Siddhanam", "Namo", "Ayariyanam", "Namo", "Uvajjhayanam", "Namo", "Loe", "Savvasahunam", "Eso", "Pancha", "Namokkaro", "Savva", "Pav", "Ppanasano", "Mangalanam", "Cha", "Savvesim", "Padhamam", "Havai", "Mangalam"],
      lines: [
        ["Namo", "Arihantanam"],
        ["Namo", "Siddhanam"],
        ["Namo", "Ayariyanam"],
        ["Namo", "Uvajjhayanam"],
        ["Namo", "Loe", "Savvasahunam"],
        ["Eso", "Pancha", "Namokkaro"],
        ["Savva", "Pav", "Ppanasano"],
        ["Mangalanam", "Cha", "Savvesim"],
        ["Padhamam", "Havai", "Mangalam"]
      ]
    }
  },
  gayatri: {
    name: "Gayatri Mantra",
    hindi: {
      text: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्",
      words: ["ॐ", "भूर्भुवः", "स्वः", "तत्सवितुर्वरेण्यं", "भर्गो", "देवस्य", "धीमहि", "धियो", "यो", "नः", "प्रचोदयात्"],
      lines: [
        ["ॐ", "भूर्भुवः", "स्वः"],
        ["तत्सवितुर्वरेण्यं"],
        ["भर्गो", "देवस्य", "धीमहि"],
        ["धियो", "यो", "नः", "प्रचोदयात्"]
      ]
    },
    gujarati: {
      text: "ૐ ભૂર્ભુવઃ સ્વઃ તત્સવિતુર્વરેણ્યં ભર્ગો દેવસ્ય ધીમહિ ધિયો યો નઃ પ્રચોદયાત્",
      words: ["ૐ", "ભૂર્ભુવઃ", "સ્વઃ", "તત્સવિતુર્વરેણ્યં", "ભર્ગો", "દેવસ્ય", "ધીમહિ", "ધિયો", "યો", "નઃ", "પ્રચોદયાત્"],
      lines: [
        ["ૐ", "ભૂર્ભુવઃ", "સ્વઃ"],
        ["તત્સવિતુર્વરેણ્યં"],
        ["ભર્ગો", "દેવસ્ય", "ધીમહિ"],
        ["ધિયો", "યો", "નઃ", "પ્રચોદયાત્"]
      ]
    },
    english: {
      text: "Om Bhur Bhuvah Svah Tat Savitur Varenyam Bhargo Devasya Dhimahi Dhiyo Yo Nah Prachodayat",
      words: ["Om", "Bhur", "Bhuvah", "Svah", "Tat", "Savitur", "Varenyam", "Bhargo", "Devasya", "Dhimahi", "Dhiyo", "Yo", "Nah", "Prachodayat"],
      lines: [
        ["Om", "Bhur", "Bhuvah", "Svah"],
        ["Tat", "Savitur", "Varenyam"],
        ["Bhargo", "Devasya", "Dhimahi"],
        ["Dhiyo", "Yo", "Nah", "Prachodayat"]
      ]
    }
  },
  saraswati: {
    name: "Saraswati Vandana",
    hindi: {
      text: "या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना या ब्रह्माच्युत शंकरप्रभृतिभिर्देवैः सदा वन्दिता सा मां पातु सरस्वति भगवती निःशेषजाड्यापहा",
      words: ["या", "कुन्देन्दुतुषारहारधवला", "या", "शुभ्रवस्त्रावृता", "या", "वीणावरदण्डमण्डितकरा", "या", "श्वेतपद्मासना", "या", "ब्रह्माच्युत", "शंकरप्रभृतिभिर्देवैः", "सदा", "वन्दिता", "सा", "मां", "पातु", "सरस्वति", "भगवती", "निःशेषजाड्यापहा"],
      lines: [
        ["या", "कुन्देन्दुतुषारहारधवला", "या", "शुभ्रवस्त्रावृता"],
        ["या", "वीणावरदण्डमण्डितकरा", "या", "श्वेतपद्मासना"],
        ["या", "ब्रह्माच्युत", "शंकरप्रभृतिभिर्देवैः", "सदा", "वन्दिता"],
        ["सा", "मां", "पातु", "सरस्वति", "भगवती", "निःशेषजाड्यापहा"]
      ]
    },
    gujarati: {
      text: "યા કુન્દેન્દુતુષારહારધવલા યા શુભ્રવસ્ત્રાવૃતા યા વીણાવરદણ્ડમણ્ડિતકરા યા શ્વેતપદ્માસના યા બ્રહ્માચ્યુત શંકરપ્રભૃતિભિર્દેવૈઃ સદા વન્દિતા સા માં પાતુ સરસ્વતિ ભગવતી નિઃશેષજાડ્યાપહા",
      words: ["યા", "કુન્દેન્દુતુષારહારધવલા", "યા", "શુભ્રવસ્ત્રાવૃતા", "યા", "વીણાવરદણ્ડમણ્ડિતકરા", "યા", "શુભ્રવસ્ત્રાવૃતા", "યા", "બ્રહ્માચ્યુત", "શંકરપ્રભૃતિભિર્દેવૈઃ", "સદા", "વન્દિતા", "સા", "માં", "પાતુ", "સરસ્વતિ", "ભગવતી", "નિઃશેષજાડ્યાપહા"],
      lines: [
        ["યા", "કુન્દેન્દુતુષારહારધવલા", "યા", "શુભ્રવસ્ત્રાવૃતા"],
        ["યા", "મ્વીણાવરદણ્ડમણ્ડિતકરા", "યા", "શ્વેતપદ્માસના"],
        ["યા", "બ્રહ્માચ્યુત", "શંકરપ્રભૃતિભિર્દેવૈઃ", "સદા", "વન્દિતા"],
        ["સા", "માં", "પાતુ", "સરસ્વતિ", "ભગવતી", "નિઃશેષજાડ્યાપહા"]
      ]
    },
    english: {
      text: "Ya Kundendu Tushara Hara Dhavala Ya Shubhra Vastravrita Ya Veena Vara Danda Manditakara Ya Shveta Padmasana Ya Brahmachyuta Shankara Prabhritibhir Devai Sada Vandita Sa Mam Patu Saraswati Bhagavati Nihshesha Jadyapaha",
      words: ["Ya", "Kundendu", "Tushara", "Hara", "Dhavala", "Ya", "Shubhra", "Vastravrita", "Ya", "Veena", "Vara", "Danda", "Manditakara", "Ya", "Shveta", "Padmasana", "Ya", "Brahmachyuta", "Shankara", "Prabhritibhir", "Devai", "Sada", "Vandita", "Sa", "Mam", "Patu", "Saraswati", "Bhagavati", "Nihshesha", "Jadyapaha"],
      lines: [
        ["Ya", "Kundendu", "Tushara", "Hara", "Dhavala", "Ya", "Shubhra", "Vastravrita"],
        ["Ya", "Veena", "Vara", "Danda", "Manditakara", "Ya", "Shveta", "Padmasana"],
        ["Ya", "Brahmachyuta", "Shankara", "Prabhritibhir", "Devai", "Sada", "Vandita"],
        ["Sa", "Mam", "Patu", "Saraswati", "Bhagavati", "Nihshesha", "Jadyapaha"]
      ]
    }
  }
};

function App() {
  const [selectedMantra, setSelectedMantra] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
  const [customMantraText, setCustomMantraText] = useState('');
  const [customMantraWords, setCustomMantraWords] = useState([]);
  const [customMantraLines, setCustomMantraLines] = useState([]);
  const [isCustomMantraSet, setIsCustomMantraSet] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [counts, setCounts] = useState({
    mahamrityunjaya: [],
    navkar: [],
    gayatri: [],
    custom: []
  });
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [customMantraName, setCustomMantraName] = useState('');
  const [userName, setUserName] = useState('');
  const [savedMantras, setSavedMantras] = useState([]);
  const [statsMantra, setStatsMantra] = useState(null);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [currentView, setCurrentView] = useState('practice'); // 'practice' | 'home'
  const [mantraVisibility, setMantraVisibility] = useState({}); // { [id]: boolean }
  const [mantraCategories, setMantraCategories] = useState({
    mahamrityunjaya: 'standard',
    navkar: 'standard',
    gayatri: 'standard',
    saraswati: 'popular'
  });
  const [fontSize, setFontSize] = useState(20); // Default 20px
  const [editingMantraId, setEditingMantraId] = useState(null); // Track if editing


  const scrollRef = React.useRef(null);
  const statsRef = React.useRef(null);

  const scrollToStats = () => {
    statsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const saved = localStorage.getItem('malaCounterData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSelectedMantra(data.selectedMantra);
        setSelectedLanguage(data.selectedLanguage || 'hindi');
        setCustomMantraText(data.customMantraText || '');
        setCustomMantraWords(data.customMantraWords || []);
        setCustomMantraLines(data.customMantraLines || []);
        setIsCustomMantraSet(data.isCustomMantraSet || false);
        setSavedMantras(data.savedMantras || []);
        setStatsMantra(data.selectedMantra || null); // Initialize stats mantra
        setDarkMode(data.darkMode || false);
        setUserName(data.userName || '');
        setCounts(data.counts || {
          mahamrityunjaya: [],
          navkar: [],
          gayatri: [],
          saraswati: [],
          custom: [],
          manual: []
        });
        setMantraVisibility(data.mantraVisibility || {});
        if (data.mantraCategories) {
          setMantraCategories(data.mantraCategories);
        }
      } catch (e) {
        console.error('Failed to load data:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedMantra) {
      const data = {
        selectedMantra,
        selectedLanguage,
        customMantraText,
        customMantraWords,
        customMantraLines,
        isCustomMantraSet,
        savedMantras,
        darkMode,
        userName,
        counts,
        mantraVisibility,
        mantraCategories
      };
      localStorage.setItem('malaCounterData', JSON.stringify(data));

      // Update stats mantra if not set or if it was consistent with selection
      if (!statsMantra) {
        setStatsMantra(selectedMantra);
      }
    }
  }, [selectedMantra, selectedLanguage, customMantraText, customMantraWords, customMantraLines, isCustomMantraSet, savedMantras, darkMode, counts, statsMantra, mantraVisibility]);

  // Auto-scroll to bottom of writing area
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [typedText, sessionHistory]);

  const getCurrentMantraData = () => {
    if (selectedMantra === 'custom') {
      return {
        words: customMantraWords,
        lines: customMantraLines,
        text: customMantraText
      };
    }
    // Check if it's a saved custom mantra
    const savedMantra = savedMantras.find(m => m.id === selectedMantra);
    if (savedMantra) {
      return {
        words: savedMantra.words,
        lines: savedMantra.lines,
        text: savedMantra.text
      };
    }
    const mantra = MANTRAS[selectedMantra];
    if (!mantra) return { words: [], lines: [], text: '' };
    const langData = mantra[selectedLanguage];
    if (!langData) return { words: [], lines: [], text: '' };
    return {
      words: langData.words,
      lines: langData.lines,
      text: langData.text
    };
  };

  const handleMantraSelect = (mantra) => {
    setSelectedMantra(mantra);
    setStatsMantra(mantra);
    setSessionHistory([]); // Clear history on mantra change
    if (mantra !== 'custom') {
      setIsCustomMantraSet(true);
    }
  };

  const handleSavedMantraSelect = (savedMantra) => {
    setSelectedMantra(savedMantra.id);
    setStatsMantra(savedMantra.id);
    setSessionHistory([]); // Clear history on mantra change
    setIsCustomMantraSet(true);
  };

  const toggleMantraVisibility = (id) => {
    setMantraVisibility(prev => ({
      ...prev,
      [id]: !getVisibility(id)
    }));
  };

  const moveMantra = (id, category) => {
    setMantraCategories(prev => ({
      ...prev,
      [id]: category
    }));
  };

  const handleEditCustomMantra = (mantra) => {
    setCustomMantraName(mantra.name);
    setCustomMantraText(mantra.text);
    setEditingMantraId(mantra.id); // Set editing ID
    setSelectedMantra('custom');
    setIsCustomMantraSet(false); // Enable edit mode
    setCurrentView('practice');
  };

  const handleDeleteMantra = (id) => {
    if (window.confirm('Are you sure you want to delete this mantra?')) {
      const newSaved = savedMantras.filter(m => m.id !== id);
      setSavedMantras(newSaved);

      // If deleted mantra was selected, reset
      if (selectedMantra === id) {
        setSelectedMantra(null);
        setCurrentView('home');
      }
      if (statsMantra === id) {
        setStatsMantra(null);
      }
    }
  };




  const getVisibility = (id) => {
    return mantraVisibility[id] !== undefined ? mantraVisibility[id] : true;
  };

  const handleManualTap = () => {
    const newCount = {
      timestamp: new Date().toISOString(),
      mantra: 'Manual Chant',
      language: 'en'
    };
    setCounts(prev => ({
      ...prev,
      manual: [...(prev.manual || []), newCount]
    }));
  };

  const handleCustomMantraConfirm = () => {
    if (customMantraText.trim()) {
      const lines = customMantraText.trim().split('\n').filter(line => line.trim());
      const allWords = [];
      const linesArray = lines.map(line => {
        const words = line.trim().split(/\s+/);
        allWords.push(...words);
        return words;
      });

      // If name is provided, save it persistently
      if (customMantraName.trim()) {
        if (editingMantraId) {
          // Update existing
          setSavedMantras(prev => prev.map(m => m.id === editingMantraId ? {
            ...m,
            name: customMantraName.trim(),
            text: customMantraText.trim(),
            words: allWords,
            lines: linesArray
          } : m));
          setSelectedMantra(editingMantraId);
          setStatsMantra(editingMantraId);
        } else {
          // Create new
          const newMantra = {
            id: `custom_${Date.now()} `,
            name: customMantraName.trim(),
            text: customMantraText.trim(),
            words: allWords,
            lines: linesArray
          };
          setSavedMantras([...savedMantras, newMantra]);
          setSelectedMantra(newMantra.id);
          setStatsMantra(newMantra.id);
        }
        setCustomMantraName('');
        setEditingMantraId(null);
      } else {
        setCustomMantraWords(allWords);
        setCustomMantraLines(linesArray);
      }
      setIsCustomMantraSet(true);
      setCurrentView('practice');
    }
  };

  const handleWordClick = (word, index) => {
    const { words, lines } = getCurrentMantraData();

    if (index !== currentWordIndex) {
      return;
    }

    const newText = typedText ? typedText + ' ' + word : word;
    setTypedText(newText);

    if (index === words.length - 1) {
      const newCount = {
        timestamp: new Date().toISOString(),
        mantra: selectedMantra === 'custom'
          ? customMantraText
          : MANTRAS[selectedMantra]
            ? MANTRAS[selectedMantra].name
            : savedMantras.find(m => m.id === selectedMantra)?.name || 'Custom Mantra',
        language: selectedLanguage
      };
      setCounts(prev => ({
        ...prev,
        [selectedMantra]: [...(prev[selectedMantra] || []), newCount]
      }));

      // Add completed mantra to history
      setSessionHistory(prev => [...prev, newText]);

      setCurrentWordIndex(0);
      setTypedText('');

      // Scroll the word buttons container to top after completion
      setTimeout(() => {
        const wordContainer = document.getElementById('word-buttons-container');
        if (wordContainer) {
          wordContainer.scrollTop = 0;
        }
      }, 100);
    } else {
      setCurrentWordIndex(index + 1);

      // Check if we completed a line
      let wordCount = 0;
      let currentLineIndex = -1;
      for (let i = 0; i < lines.length; i++) {
        wordCount += lines[i].length;
        if (index + 1 === wordCount) {
          // Just completed this line
          currentLineIndex = i;
          break;
        }
      }

      // If line completed, scroll the next line into view at the top
      if (currentLineIndex !== -1 && currentLineIndex < lines.length - 1) {
        setTimeout(() => {
          const wordContainer = document.getElementById('word-buttons-container');
          const nextLineElement = document.querySelector(`[data-line-index= "${currentLineIndex + 1}"]`);
          if (wordContainer && nextLineElement) {
            const containerTop = wordContainer.offsetTop;
            const elementTop = nextLineElement.offsetTop;
            wordContainer.scrollTo({
              top: elementTop - containerTop,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    }
  };

  const getStats = () => {
    const targetMantra = statsMantra || selectedMantra;
    const currentCounts = counts[targetMantra] || [];
    const now = new Date();
    const thisHourStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours());
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisYearStart = new Date(now.getFullYear(), 0, 1);

    return {
      thisHour: currentCounts.filter(c => new Date(c.timestamp) >= thisHourStart).length,
      today: currentCounts.filter(c => new Date(c.timestamp) >= todayStart).length,
      thisMonth: currentCounts.filter(c => new Date(c.timestamp) >= thisMonthStart).length,
      thisYear: currentCounts.filter(c => new Date(c.timestamp) >= thisYearStart).length,
      lifetime: currentCounts.length
    };
  };

  const getCurrentPage = () => {
    const targetMantra = statsMantra || selectedMantra;
    const currentCounts = counts[targetMantra] || []; // Use statsMantra
    return Math.floor(currentCounts.length / 108) + 1;
  };

  const getCountInCurrentPage = () => {
    const targetMantra = statsMantra || selectedMantra;
    const currentCounts = counts[targetMantra] || []; // Use statsMantra
    return currentCounts.length % 108;
  };

  const handleReset = () => {
    if (showResetConfirm) {
      setSelectedMantra(null);
      setCustomMantraText('');
      setCustomMantraWords([]);
      setCustomMantraLines([]);
      setIsCustomMantraSet(false);
      setCurrentWordIndex(0);
      setTypedText('');
      setCounts({
        mahamrityunjaya: [],
        navkar: [],
        gayatri: [],
        custom: []
      });
      setSessionHistory([]);
      setShowResetConfirm(false);
      localStorage.removeItem('malaCounterData');
    } else {
      setShowResetConfirm(true);
    }
  };

  const cancelReset = () => setShowResetConfirm(false);

  const handleExport = () => {
    const stats = getStats();
    const currentCounts = counts[selectedMantra] || [];
    const data = {
      mantra: selectedMantra === 'custom' ? customMantraText : MANTRAS[selectedMantra].name,
      language: selectedLanguage,
      stats,
      currentPage: getCurrentPage(),
      exportDate: new Date().toISOString(),
      counts: currentCounts
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mala-counter-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = statsMantra || (selectedMantra && isCustomMantraSet) ? getStats() : null;

  const getAllMantraStats = () => {
    return {
      mahamrityunjaya: (counts.mahamrityunjaya || []).length,
      navkar: (counts.navkar || []).length,
      gayatri: (counts.gayatri || []).length
    };
  };



  const handleStart = (name) => {
    setUserName(name);
    setCurrentView('practice'); // Go to grid or practice
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit?')) {
      setUserName('');
      // Optional: Reset view?
      setCurrentView('practice');
    }
  };

  if (!userName) {
    return <Welcome onStart={handleStart} darkMode={darkMode} />;
  }

  if (!selectedMantra || !isCustomMantraSet || currentView === 'create_custom') {
    return (
      <div className={`min-h-screen p-4 flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-stone-50'} `}>
        <div className={`w-full max-w-md rounded shadow-sm p-8 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'} `}>
          <h1 className={`text-2xl mb-6 text-center font-light ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>Select Your Practice</h1>

          {!selectedMantra && currentView !== 'create_custom' ? (
            <div className="space-y-3">
              <button
                onClick={() => handleMantraSelect('mahamrityunjaya')}
                className={`w-full p-4 text-left border rounded transition-colors ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-stone-300 hover:bg-stone-50'} `}
              >
                <div className={`font-medium ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>Mahamrityunjaya Mantra</div>
                <div className={`text-sm mt-1 font-light ${darkMode ? 'text-gray-400' : 'text-stone-600'} `}>ॐ त्र्यम्बकं यजामहे...</div>
              </button>

              <button
                onClick={() => handleMantraSelect('navkar')}
                className={`w-full p-4 text-left border rounded transition-colors ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-stone-300 hover:bg-stone-50'} `}
              >
                <div className={`font-medium ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>Navkar Mantra (Full)</div>
                <div className={`text-sm mt-1 font-light ${darkMode ? 'text-gray-400' : 'text-stone-600'} `}>नमो अरिहंताणं...</div>
              </button>

              <button
                onClick={() => handleMantraSelect('gayatri')}
                className={`w-full p-4 text-left border rounded transition-colors ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-stone-300 hover:bg-stone-50'} `}
              >
                <div className={`font-medium ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>Gayatri Mantra</div>
                <div className={`text-sm mt-1 font-light ${darkMode ? 'text-gray-400' : 'text-stone-600'} `}>ॐ भूर्भुवः स्वः...</div>
              </button>

              {savedMantras.map(mantra => (
                <button
                  key={mantra.id}
                  onClick={() => handleSavedMantraSelect(mantra)}
                  className={`w-full p-4 text-left border rounded transition-colors ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-stone-300 hover:bg-stone-50'} `}
                >
                  <div className={`font-medium ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>{mantra.name}</div>
                  <div className={`text-sm mt-1 font-light ${darkMode ? 'text-gray-400' : 'text-stone-600'} truncate`}>{mantra.text.substring(0, 50)}...</div>
                </button>
              ))}

              <button
                onClick={() => {
                  handleMantraSelect('custom');
                  isCreatingFromListRef.current = false;
                }}
                className={`w-full p-4 text-left border rounded transition-colors ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-stone-300 hover:bg-stone-50'} `}
              >
                <div className={`font-medium ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>New Custom Mantra</div>
                <div className={`text-sm mt-1 font-light ${darkMode ? 'text-gray-400' : 'text-stone-600'} `}>Create and save your own</div>
              </button>
            </div>
          ) : (selectedMantra === 'custom' && !isCustomMantraSet) || currentView === 'create_custom' ? (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-stone-700'} `}>Mantra Name (Optional-to save):</label>
                <input
                  type="text"
                  value={customMantraName}
                  onChange={(e) => setCustomMantraName(e.target.value)}
                  className={`w-full p-3 mb-4 border rounded focus: outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-gray-500' : 'border-stone-300 focus:border-stone-400'} `}
                  placeholder="e.g., My Morning Regular"
                />
              </div>
              <div>
                <label className={`block text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-stone-700'} `}>Enter your mantra:</label>
                <textarea
                  value={customMantraText}
                  onChange={(e) => setCustomMantraText(e.target.value)}
                  className={`w-full p-3 border rounded resize-none focus: outline-none ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100 focus:border-gray-500' : 'border-stone-300 focus:border-stone-400'} `}
                  rows="6"
                  placeholder="Type your mantra here...
Each line will be a separate row of words"
                  autoFocus
                />
                <div className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-stone-500'} `}>
                  Separate words with spaces, use new lines for different phrases
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCustomMantraConfirm}
                  disabled={!customMantraText.trim()}
                  className={`flex-1 p-3 rounded ${darkMode ? 'bg-gray-700 text-white disabled:bg-gray-600' : 'bg-stone-800 text-white disabled:bg-stone-300'} disabled: cursor-not-allowed`}
                >
                  {customMantraName.trim() ? 'Save & Start' : 'Start Temporary'}
                </button>
                <button
                  onClick={() => {
                    const wasCreating = currentView === 'create_custom';
                    if (wasCreating) {
                      setCurrentView('home');
                    } else {
                      setSelectedMantra(null);
                    }
                    // Only clear form if we are actually leaving the creation flow
                    // But usually safe to clear
                    setCustomMantraName('');
                  }}
                  className={`flex-1 p-3 border rounded ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-stone-300 hover:bg-stone-50'} `}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  const { words, lines, text } = getCurrentMantraData();
  let globalIndex = 0;

  return (
    <div className={`min-h-screen w-full overflow-x-hidden p-4 pb-8 ${darkMode ? 'bg-gray-900' : 'bg-stone-50'} `}>
      <div className="max-w-2xl mx-auto">

        {currentView === 'journey' ? (
          <Journey
            counts={counts}
            darkMode={darkMode}
            onBack={() => setCurrentView('home')}
            onManualTap={handleManualTap}
          />
        ) : currentView === 'home' ? (
          <div className={`rounded shadow-sm p-4 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'} `}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>Mantra List</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    // Just switch view, don't change selection state
                    setCustomMantraName('');
                    setCustomMantraText('');
                    setCurrentView('create_custom');
                  }}
                  className={`text-sm px-3 py-1.5 rounded border ${darkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-stone-300 hover:bg-stone-50 text-stone-700'} `}
                >
                  Add new Mantra
                </button>
                <button
                  onClick={() => setCurrentView('practice')}
                  className={`text-sm px-3 py-1.5 rounded border ${darkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-stone-300 hover:bg-stone-50 text-stone-700'} `}
                >
                  Back to Practice
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className={`text-sm font-semibold uppercase mb-3 ${darkMode ? 'text-gray-400' : 'text-stone-500'} `}>Standard Mantras</h3>
                <div className="space-y-2">
                  <div className="space-y-2">
                    {Object.keys(MANTRAS).filter(key => mantraCategories[key] === 'standard').map(key => (
                      <div key={key} className={`flex items-center justify-between p-3 rounded border ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-stone-200 bg-stone-50'} `}>
                        <span className={`text-base ${darkMode ? 'text-gray-200' : 'text-stone-800'} `}>{MANTRAS[key].name}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => moveMantra(key, 'popular')}
                            className={`px-3 py-1 rounded text-xs font-semibold uppercase border ${darkMode ? 'border-red-900/50 text-red-400 hover:bg-red-900/20' : 'border-red-200 text-red-700 hover:bg-red-50'} `}
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => toggleMantraVisibility(key)}
                            className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide border transition-colors ${getVisibility(key)
                              ? (darkMode ? 'bg-green-900/30 border-green-800 text-green-400' : 'bg-green-100 border-green-200 text-green-700')
                              : (darkMode ? 'bg-gray-700 border-gray-600 text-gray-500' : 'bg-stone-200 border-stone-300 text-stone-500')
                              } `}
                          >
                            {getVisibility(key) ? 'On' : 'Off'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {savedMantras.length > 0 && (
                <div>
                  <h3 className={`text-sm font-semibold uppercase mb-3 ${darkMode ? 'text-gray-400' : 'text-stone-500'} `}>Custom Mantras</h3>
                  <div className="space-y-2">
                    {savedMantras.map(m => (
                      <div key={m.id} className={`flex items-center justify-between p-3 rounded border ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-stone-200 bg-stone-50'} `}>
                        <div className="flex-1 mr-4">
                          <div className={`text-base ${darkMode ? 'text-gray-200' : 'text-stone-800'} `}>{m.name}</div>
                          <div className={`text-xs truncate ${darkMode ? 'text-gray-500' : 'text-stone-500'} `}>{m.text.substring(0, 50)}...</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditCustomMantra(m)}
                            className={`px-3 py-1 rounded text-xs font-semibold uppercase border ${darkMode ? 'border-blue-800 text-blue-400 hover:bg-blue-900/20' : 'border-blue-200 text-blue-700 hover:bg-blue-50'} `}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMantra(m.id)}
                            className={`px-3 py-1 rounded text-xs font-semibold uppercase border ${darkMode ? 'border-red-900/50 text-red-400 hover:bg-red-900/20' : 'border-red-200 text-red-700 hover:bg-red-50'} `}
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => toggleMantraVisibility(m.id)}
                            className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide border transition-colors ${getVisibility(m.id)
                              ? (darkMode ? 'bg-green-900/30 border-green-800 text-green-400' : 'bg-green-100 border-green-200 text-green-700')
                              : (darkMode ? 'bg-gray-700 border-gray-600 text-gray-500' : 'bg-stone-200 border-stone-300 text-stone-500')
                              } `}
                          >
                            {getVisibility(m.id) ? 'On' : 'Off'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className={`text-sm font-semibold uppercase mb-3 ${darkMode ? 'text-gray-400' : 'text-stone-500'} `}>Popular Mantras</h3>
                <div className="space-y-2">
                  {Object.keys(MANTRAS).filter(key => mantraCategories[key] === 'popular').map(key => (
                    <div key={key} className={`flex items-center justify-between p-3 rounded border ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-stone-200 bg-stone-50'} `}>
                      <span className={`text-base ${darkMode ? 'text-gray-200' : 'text-stone-800'} `}>{MANTRAS[key].name}</span>
                      <button
                        onClick={() => moveMantra(key, 'standard')}
                        className={`px-3 py-1 rounded text-xs font-semibold uppercase border ${darkMode ? 'border-blue-800 text-blue-400 hover:bg-blue-900/20' : 'border-blue-200 text-blue-700 hover:bg-blue-50'} `}
                      >
                        Add to Standard
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className={`rounded shadow-sm p-3 mb-4 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'} `}>

              {/* Row 1: Branding (Left) & Dark Mode (Right) */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-dashed border-opacity-30 border-gray-400">
                <div className="flex flex-col">
                  <h1 className={`text-2xl font-bold leading-none tracking-tight ${darkMode ? 'text-orange-100' : 'text-stone-800'}`}>
                    DigiMala <span className="text-sm align-top opacity-70">📿</span>
                  </h1>
                  <span className={`text-[10px] uppercase tracking-widest ${darkMode ? 'text-orange-300/70' : 'text-stone-500'}`}>
                    Digital Spiritual Companion
                  </span>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-full hover: bg-opacity-10 hover: bg-gray-500 transition-colors ${darkMode ? 'text-yellow-400' : 'text-stone-600'} `}
                  title="Toggle Dark Mode"
                >
                  {darkMode ? '☀' : '☾'}
                </button>
              </div>

              {/* Row 2: Left (Mantras, Lang), Right (Counters) */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="flex items-center justify-between md:justify-start gap-2 w-full md:w-auto">
                  {/* Mantra Dropdown */}
                  <div className="relative group">
                    <select
                      value={selectedMantra || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'custom') {
                          handleMantraSelect('custom');
                          setIsCustomMantraSet(false);
                          setEditingMantraId(null);
                          // Standard creation from dropdown
                        } else if (val.startsWith('custom_')) {
                          const saved = savedMantras.find(m => m.id === val);
                          if (saved) handleSavedMantraSelect(saved);
                        } else {
                          handleMantraSelect(val);
                        }
                      }}
                      className={`w-full max-w-[200px] sm:max-w-none text-ellipsis overflow-hidden appearance-none text-base font-bold pr-8 pl-3 py-1.5 cursor-pointer focus: outline-none rounded border ${darkMode ? 'text-gray-100 bg-gray-800 border-gray-600 [&>optgroup]:bg-gray-800 [&>optgroup]:text-gray-100 [&>option]:bg-gray-800 [&>option]:text-gray-100' : 'text-stone-800 bg-white border-stone-300'} `}
                    >
                      {Object.keys(MANTRAS).filter(key => mantraCategories[key] === 'standard' && getVisibility(key)).map(key => (
                        <option key={key} value={key}>{MANTRAS[key].name}</option>
                      ))}
                      {savedMantras.filter(m => getVisibility(m.id)).map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                    <div className={`absolute right-2 top-1 / 2-translate-y-1 / 2 pointer-events-none ${darkMode ? 'text-gray-400' : 'text-stone-500'} `}>
                      ▼
                    </div>
                  </div>

                  {/* Language Selector */}
                  {selectedMantra !== 'custom' && !selectedMantra?.startsWith('custom_') && (
                    <div className="relative">
                      <select
                        value={selectedLanguage}
                        onChange={(e) => {
                          setSelectedLanguage(e.target.value);
                          setCurrentWordIndex(0);
                          setTypedText('');
                        }}
                        className={`w-full max-w-[150px] sm:max-w-none text-ellipsis overflow-hidden text-sm focus: outline-none cursor-pointer pr-8 pl-3 py-1.5 rounded border ${darkMode ? 'text-gray-300 bg-gray-800 border-gray-600 [&>option]:bg-gray-800 [&>option]:text-gray-100' : 'text-stone-600 bg-white border-stone-300'} `}
                      >
                        <option value="hindi">हिन्दी (Hindi)</option>
                        <option value="gujarati">ગુજરાતી (Gujarati)</option>
                        <option value="english">English</option>
                      </select>
                      <div className={`absolute right-2 top-1 / 2-translate-y-1 / 2 pointer-events-none text-xs ${darkMode ? 'text-gray-400' : 'text-stone-500'} `}>
                        ▼
                      </div>
                    </div>
                  )}
                </div>

                {/* Counters */}
                <div className="flex items-center justify-between md:justify-start gap-3 text-xs sm:text-sm w-full md:w-auto">
                  <div className={`${darkMode ? 'text-gray-500' : 'text-stone-400'} `}>
                    Pg {getCurrentPage()}
                  </div>
                  <div className={`${darkMode ? 'text-gray-500' : 'text-stone-400'} `}>
                    Mala {Math.floor((getStats().today || 0) / 108)}
                  </div>
                  <button
                    onClick={scrollToStats}
                    className={`px-3 py-1 rounded font-bold shadow-sm transition-transform active: scale-95 ${darkMode
                      ? 'bg-orange-900 text-orange-100'
                      : 'bg-orange-100 text-orange-800'
                      } `}
                  >
                    {getStats().today} Today
                  </button>
                </div>
              </div>

              {/* Mantra Text Display with Font Size Controls */}
              <div className={`mt-3 p-3 rounded border relative group ${darkMode ? 'bg-orange-900/30 border-orange-800/50' : 'bg-orange-50 border-orange-100'} `}>
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button
                    onClick={() => setFontSize(prev => Math.max(10, prev - 2))}
                    className={`w-6 h-6 flex items-center justify-center rounded border text-xs ${darkMode ? 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700' : 'border-stone-300 bg-white text-stone-600 hover:bg-stone-50'} `}
                    title="Decrease Font Size"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setFontSize(prev => Math.min(32, prev + 2))}
                    className={`w-6 h-6 flex items-center justify-center rounded border text-xs ${darkMode ? 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700' : 'border-stone-300 bg-white text-stone-600 hover:bg-stone-50'} `}
                    title="Increase Font Size"
                  >
                    +
                  </button>
                </div>
                <p
                  className={`leading-relaxed text-center transition-all ${darkMode ? 'text-orange-100' : 'text-stone-700'} `}
                  style={{ fontSize: `${fontSize} px` }}
                >
                  {text}
                </p>
              </div>
            </div>

            <div className={`rounded shadow-sm p-4 mb-4 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'} `}>
              <div
                ref={scrollRef}
                className={`h-32 overflow-y-auto p-3 rounded border transition-all ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-stone-50 border-stone-200'} `}
              >
                {sessionHistory.map((line, index) => (
                  <p key={index} className={`leading-relaxed font-handwriting text-2xl mb-2 opacity-70 ${darkMode ? 'text-gray-300' : 'text-stone-600'} `}>
                    <span className="text-sm opacity-50 mr-3 font-sans align-middle">{index + 1}.</span>
                    {line}
                  </p>
                ))}
                {typedText ? (
                  <p className={`leading-relaxed font-handwriting text-2xl ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>
                    <span className="text-sm opacity-50 mr-3 font-sans align-middle">{sessionHistory.length + 1}.</span>
                    {typedText}<span className={`inline-block w-0.5 h-6 ml-1 align-middle cursor-blink ${darkMode ? 'bg-gray-100' : 'bg-stone-800'} `}></span>
                  </p>
                ) : sessionHistory.length === 0 ? (
                  <p className={`text-center text-sm ${darkMode ? 'text-gray-500' : 'text-stone-400'} `}>Tap words below to begin</p>
                ) : (
                  <p className={`leading-relaxed font-handwriting text-2xl ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>
                    <span className="text-sm opacity-50 mr-3 font-sans align-middle">{sessionHistory.length + 1}.</span>
                    <span className={`inline-block w-0.5 h-6 ml-1 align-middle cursor-blink ${darkMode ? 'bg-gray-100' : 'bg-stone-800'} `}></span>
                  </p>
                )}
              </div>
            </div>

            <div className={`rounded shadow-sm p-4 mb-4 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'} `}>
              <div id="word-buttons-container" className="space-y-3 max-h-64 overflow-y-auto pb-24 md:pb-48">
                {lines.map((line, lineIndex) => {
                  const lineButtons = line.map((word, wordIndexInLine) => {
                    const currentGlobalIndex = globalIndex++;
                    const isActive = currentGlobalIndex === currentWordIndex;
                    return (
                      <button
                        key={currentGlobalIndex}
                        onClick={() => handleWordClick(word, currentGlobalIndex)}
                        disabled={currentGlobalIndex !== currentWordIndex}
                        className={`px-4 py-2.5 rounded border transition-colors ${isActive
                          ? darkMode
                            ? 'bg-orange-900 border-orange-700 text-orange-100 shadow-sm active-word-button'
                            : 'bg-orange-100 border-orange-400 text-stone-800 shadow-sm active-word-button'
                          : currentGlobalIndex < currentWordIndex
                            ? darkMode
                              ? 'bg-gray-700 border-gray-600 text-gray-500 opacity-50'
                              : 'bg-stone-100 border-stone-200 text-stone-400 opacity-50'
                            : darkMode
                              ? 'bg-gray-700 border-gray-600 text-gray-500 opacity-50'
                              : 'bg-white border-stone-300 text-stone-400 opacity-50'
                          } `}
                      >
                        {word}
                      </button>
                    );
                  });
                  return (
                    <div key={lineIndex} data-line-index={lineIndex} className="flex flex-wrap gap-2">
                      {lineButtons}
                    </div>
                  );
                })}
              </div>
              <div className="text-xs text-stone-500 text-center mt-4">
                Tap the highlighted word to continue • {currentWordIndex + 1}/{words.length}
              </div>
            </div>

            {stats && (
              <div ref={statsRef} className={`rounded shadow-sm p-4 mb-4 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'} `}>
                <div className="flex justify-between items-center mb-3">
                  <h2 className={`text-base font-light ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>Statistics</h2>
                  <select
                    value={statsMantra || ''}
                    onChange={(e) => setStatsMantra(e.target.value)}
                    className={`text-sm p-1 border rounded max-w-[150px] ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-stone-200 text-stone-800'} `}
                  >
                    <optgroup label="Standard" className={darkMode ? 'bg-gray-800' : ''}>
                      <option value="mahamrityunjaya">Mahamrityunjaya Mantra</option>
                      <option value="navkar">Navkar Mantra</option>
                      <option value="gayatri">Gayatri Mantra</option>
                    </optgroup>
                    {savedMantras.length > 0 && (
                      <optgroup label="Custom" className={darkMode ? 'bg-gray-800' : ''}>
                        {savedMantras.map(m => (
                          <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className={`text-center p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-stone-50'} `}>
                    <div className={`text-lg font-light ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>{stats.thisHour}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-stone-600'} `}>Hour</div>
                  </div>
                  <div className={`text-center p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-stone-50'} `}>
                    <div className={`text-lg font-light ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>{stats.today}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-stone-600'} `}>Today</div>
                  </div>
                  <div className={`text-center p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-stone-50'} `}>
                    <div className={`text-lg font-light ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>{stats.thisMonth}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-stone-600'} `}>Month</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className={`text-center p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-stone-50'} `}>
                    <div className={`text-lg font-light ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>{stats.thisYear}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-stone-600'} `}>Year</div>
                  </div>
                  <div className={`text-center p-2 rounded border ${darkMode ? 'bg-orange-900/30 border-orange-800/50' : 'bg-orange-50 border-orange-100'} `}>
                    <div className={`text-lg font-light ${darkMode ? 'text-gray-100' : 'text-stone-800'} `}>{stats.lifetime}</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-stone-600'} `}>Lifetime</div>
                  </div>
                </div>
              </div>
            )}

            <div className={`rounded shadow-sm p-4 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-stone-200'} `}>
              <div className="space-y-2">
                <button
                  onClick={handleExport}
                  className={`w-full p-2.5 border rounded text-sm ${darkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-stone-300 hover:bg-stone-50 text-stone-700'} `}
                >
                  Export Data
                </button>

                {!showResetConfirm ? (
                  <button
                    onClick={handleReset}
                    className={`w-full p-2.5 border rounded text-sm ${darkMode ? 'border-red-900/50 hover:bg-red-900/30 text-red-400' : 'border-red-300 hover:bg-red-50 text-red-700'} `}
                  >
                    Reset Practice
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className={`p-2 border rounded text-center text-xs ${darkMode ? 'bg-red-900/20 border-red-900/50 text-red-300' : 'bg-red-50 border-red-200 text-red-800'} `}>
                      This will delete all data. Are you sure?
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleReset}
                        className="flex-1 p-2.5 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                      >
                        Yes, Reset
                      </button>
                      <button
                        onClick={cancelReset}
                        className={`flex-1 p-2.5 border rounded text-sm ${darkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-stone-300 hover:bg-stone-50'} `}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={`text-center text-xs mt-4 ${darkMode ? 'text-gray-500' : 'text-stone-500'} `}>
              All data is stored locally in your browser
            </div>
          </div>
        )}
      </div>
      <BottomNav
        currentView={currentView === 'create_custom' ? 'home' : currentView} // Map create screen to list tab
        onChangeView={setCurrentView}
        onExit={handleExit}
        darkMode={darkMode}
      />
    </div>
  );
}

export default App;
