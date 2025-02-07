// الأسئلة المعدلة (30 سؤالًا)
const questions = [
         { text: "هل تؤيد فرض ضرائب تصاعدية على أصحاب الدخل المرتفع؟", left: true },
            { text: "هل تدعم خصخصة المؤسسات الحكومية مثل الكهرباء والماء؟", right: true },
            { text: "هل تؤيد توفير دخل أساسي شهري لكل مواطن؟", left: true },
            { text: "هل تعتقد أن ساعات العمل يجب أن تُقلّص إلى 6 ساعات يوميًا؟", left: true },
            { text: "هل تؤيد إلغاء الحد الأدنى للأجور؟", right: true },
            { text: "هل تدعم تشريع زواج المثليين؟", left: true },
            { text: "هل تؤيد منع ارتداء النقاب في الأماكن العامة؟", right: true },
            { text: "هل تعتقد أن الإجهاض يجب أن يكون حقًا للمرأة؟", left: true },
            { text: "هل تؤيد تطبيق عقوبة الإعدام؟", right: true },
            { text: "هل تدعم المساواة الكاملة في الميراث بين الرجل والمرأة؟", left: true },
            { text: "هل يجب حظر الأفلام التي تنتقد الدين؟", right: true },
            { text: "هل تؤيد دعم الدولة للفنون الغير تقليدية؟", left: true },
            { text: "هل تعتقد أن التعليم الديني يجب أن يكون إجباريًا؟", right: true },
            { text: "هل تدعم إلغاء الرقابة على الكتب؟", left: true },
            { text: "هل تؤيد منع الاحتفال بالأعياد غير الدينية؟", right: true },
            { text: "هل تؤيد حظر السيارات التي تعمل بالبنزين بحلول 2030؟", left: true },
            { text: "هل تعتقد أن الأولوية للنمو الاقتصادي حتى لو أضر بالبيئة؟", right: true },
            { text: "هل تدعم فرض غرامات على الشركات الملوثة؟", left: true },
            { text: "هل تؤيد استئناف مشاريع التنقيب عن النفط في المحميات؟", right: true },
            { text: "هل تؤيد تخصيص 30% من الميزانية الوطنية للطاقة المتجددة؟", left: true },
            { text: "هل تؤيد زيادة صلاحيات الأجهزة الأمنية في المراقبة؟", right: true },
            { text: "هل تدعم تقليص الميزانية العسكرية لصالح التعليم؟", left: true },
            { text: "هل تؤيد تجريم التظاهر دون ترخيص؟", right: true },
            { text: "هل تعتقد أن الخدمة العسكرية يجب أن تكون إجبارية؟", right: true },
            { text: "هل تدعم تقليل عقوبة تعاطي المخدرات؟", left: true },
            { text: "هل تؤيد فتح الحدود للهجرة غير المقيدة؟", left: true },
            { text: "هل تعتقد أن الدولة يجب أن تتدخل في شؤون الدول الأخرى لحقوق الإنسان؟", left: true },
            { text: "هل تدعم زيادة الرسوم الجمركية على الواردات؟", right: true },
            { text: "هل تؤيد الانضمام إلى تحالفات عسكرية دولية؟", right: true },
            { text: "هل تعتقد أن الأولوية يجب أن تكون للتعاون الإقليمي بدلًا عن العالمي؟", right: true }
    // ... أضف بقية الأسئلة هنا
];

let currentQuestion = 0;
let leftScore = 0;
let rightScore = 0;
let shuffledQuestions = [];

// خلط الأسئلة بشكل عشوائي
function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
    shuffledQuestions = shuffledQuestions.slice(0, 20); // 20 سؤالًا لكل اختبار
}

function updateProgress() {
    const progress = (currentQuestion / shuffledQuestions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function handleAnswer(answer) {
    const question = shuffledQuestions[currentQuestion];
    
    if (answer && question.left) leftScore++;
    if (answer && question.right) rightScore++;
    
    currentQuestion++;
    
    if (currentQuestion < shuffledQuestions.length) {
        document.getElementById('questionText').textContent = shuffledQuestions[currentQuestion].text;
        updateProgress();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('resultBox').style.display = 'block';
    
    const total = leftScore + rightScore;
    const leftPercent = Math.round((leftScore / total) * 100);
    const rightPercent = 100 - leftPercent;
    
    document.getElementById('resultPercent').textContent = `${leftPercent}% يساري | ${rightPercent}% يميني`;
    
    let description = "";
    if (leftPercent >= 70) {
        description = "توجهك يساري واضح مع تركيز على العدالة الاجتماعية وحقوق الأفراد";
    } else if (rightPercent >= 70) {
        description = "توجهك يميني قوي مع إيمان بالحريات الاقتصادية والقيم التقليدية";
    } else {
        description = "توجهك معتدل مع ميول " + (leftPercent > rightPercent ? "يسارية" : "يمينية");
    }
    
    document.getElementById('resultDescription').textContent = description;
}

function restartQuiz() {
    shuffleQuestions();
    currentQuestion = 0;
    leftScore = rightScore = 0;
    document.getElementById('questionContainer').style.display = 'block';
    document.getElementById('resultBox').style.display = 'none';
    document.getElementById('questionText').textContent = shuffledQuestions[0].text;
    updateProgress();
}

// بدء الاختبار عند التحميل
window.onload = () => {
    shuffleQuestions();
    document.getElementById('questionText').textContent = shuffledQuestions[0].text;
    updateProgress();
}