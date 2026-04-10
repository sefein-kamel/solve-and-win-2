const quizData = [
    {
    question: "كم عدد محاكمات السيد المسيح ؟",
    options: ["3", "4", "5", "6"],
    correct: "6"
    },
    {
    question: "من هي أول امرأة ظهر لها السيد المسيح بعد القيامة ؟",
    options: ["مريم العذراء", "مريم المجدلية", "مريم المصرية", "مريم أخت لعازر"],
    correct: "مريم المجدلية"
    },
    {
    question: "من هو الذي حمل الصليب بدل من السيد المسيح ؟",
    options: ["سمعان القيرواني", "يوسف الرامي", "نقوديموس", "يوحنا"],
    correct: "سمعان القيرواني"
    },
    {
    question: "صلب السيد المسيح علي الصليب في الساعة ؟",
    options: ["الثالثة", "الغروب", "السادسة", "التاسعة"],
    correct: "السادسة"
    },
    {
    question: "من الذي خان وسلم السيد المسيح ؟",
    options: ["توما", "يهوذا الأسخريوطي", "بطرس", "يعقوب"],
    correct: "يهوذا الأسخريوطي"
    }
];

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");

function loadQuestion() {
    const current = quizData[currentIndex];
    questionEl.innerText = current.question;
    optionsEl.innerHTML = "";

    current.options.forEach(option => {
    const label = document.createElement("label");
    label.innerHTML = `
        <input type="radio" name="answer" value="${option}"> ${option}
    `;
    optionsEl.appendChild(label);
    });
}

nextBtn.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (!selectedOption) {
    alert("Please select an answer  !  رجاءاً اختر اجابة");
    return;
    }

    const userAnswer = selectedOption.value;
    if (userAnswer === quizData[currentIndex].correct) {
    score++;
    }

    currentIndex++;

    if (currentIndex < quizData.length) {
    loadQuestion();
    } else {
    showResult();
    }
});

function copyCode() {
    const codeText = document.getElementById("secretCode").innerText;
    navigator.clipboard.writeText(codeText);
    showMessage("تم نسخ الرقم");
}

function showMessage(msg) {
    let messageBox = document.getElementById("messageBox");

    if (!messageBox) {
        messageBox = document.createElement("div");
        messageBox.id = "messageBox";
        messageBox.style.marginTop = "10px";
        messageBox.style.color = "green";
        messageBox.style.fontSize = "16px";
        resultEl.appendChild(messageBox);
    }

    messageBox.innerText = msg;

    setTimeout(() => {
        messageBox.innerText = "";
    }, 2000);
}

function reloadQuiz() {
    location.reload();
}

function showResult() {
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    nextBtn.style.display = "none";

    resultEl.innerHTML = "";

    if (score === quizData.length) {
        const code = "01003084759";

        resultEl.innerHTML = `
            <p>رائع إجاباتك كلها صحيحة</p>
            <p>مبروك أتصل بالرقم بسرعة</p>
            <p id="secretCode">${code}</p>
            <button onclick="copyCode()">نسخ الرقم</button>
        `;
    } else {
        resultEl.innerHTML = `
            <p>للأسف نتيجتك ${score} من ${quizData.length}</p>
            <button onclick="reloadQuiz()">حاول مجدداً</button>
        `;
    }
}


loadQuestion();