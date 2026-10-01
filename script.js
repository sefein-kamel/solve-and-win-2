const quizData = [
    {
    question: "ما هو آخر أسفار الكتاب المقدس ؟",
    options: ["سفر دانيال", "سفر ملاخي", "سفر الرؤيا", "سفر أعمال الرسل"],
    correct: "سفر الرؤيا"
    },
    {
    question: "من هو آخر إنسان تنبأ بمجيء الرب يسوع ؟",
    options: ["إشعياء", "يوحنا المعمدان", "ملاخي", "إرميا"],
    correct: "يوحنا المعمدان"
    },
    {
    question: "ما هي آخر ضربة من الضربات العشر ؟",
    options: ["الضفادع", "الظلام", "موت الأبكار", "الجراد"],
    correct: "موت الأبكار"
    },
    {
    question: "من هو آخر من صعد جسده إلى السماء ؟",
    options: ["إيليا النبي", "أخنوخ", "الرب يسوع المسيح", "العذراء مريم"],
    correct: "العذراء مريم"
    },
    {
    question: "ما هو آخر إنجيل في ترتيب الأناجيل الأربعة ؟",
    options: ["إنجيل يوحنا", "إنجيل متى", "إنجيل مرقس", "إنجيل لوقا"],
    correct: "إنجيل يوحنا"
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