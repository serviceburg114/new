const questions = [
    {
        text: "هل تؤيد زيادة الضرائب على الأثرياء لتمويل الخدمات العامة؟",
        left: true // نعم = يسار
    },
    {
        text: "هل تعتقد أن الأولوية للنمو الاقتصادي حتى لو أضر بالبيئة؟",
        right: true // نعم = يمين
    },
    {
        text: "هل تدعم تشريع زواج المثليين؟",
        left: true
    },
    {
        text: "هل يجب أن تحافظ الدولة على الهوية الدينية؟",
        right: true
    }
];

let currentQuestion = 0;
let leftScore = 0;
let rightScore = 0;

function updateProgress() {
    const progress = (currentQuestion / questions.length) * 100;
    document.querySelector('#progress-bar').style.width = `${progress}%`;
}

function answerQuestion(answer) {
    const question = questions[currentQuestion];
    
    if (answer && question.left) leftScore++;
    if (answer && question.right) rightScore++;
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showQuestion() {
    document.getElementById('question-text').textContent = questions[currentQuestion].text;
    updateProgress();
}

function showResult() {
    const total = leftScore + rightScore;
    const leftPercentage = Math.round((leftScore / total) * 100);
    
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    
    document.getElementById('result-title').textContent = 
        `نتيجتك: ${leftPercentage}% يسار • ${100 - leftPercentage}% يمين`;
    
    document.getElementById('result-description').textContent = 
        leftPercentage > 50 ? 
        "توجهك العام يساري مع تركيز على العدالة الاجتماعية والمساواة" :
        "توجهك العام يميني مع تركيز على الحرية الفردية والحفاظ على التقاليد";
}

function restartTest() {
    currentQuestion = 0;
    leftScore = rightScore = 0;
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'none';
    showQuestion();
}

// بدء الاختبار عند تحميل الصفحة
window.onload = showQuestion;