
beginning = document.querySelector('.beginning')
count = document.querySelector('.count')
cost = document.querySelector('.cost')
begin = document.querySelector('.begin')
res = document.querySelector('.result')

count.style.display = 'none'
res.style.display = 'none'

begin.addEventListener('click',function(){
count.style.display = 'flex',
beginning.style.display = 'none'})


    const questions = [
            { 
                question: '������� ������� ������, � ������� �� ���� ������ ������ ���� ��������� ���� � �� �� �����.', 
                answers: ['�������, �������, ��������','���...������ (������), �������...����, ����...������','�...������ (�������), �...�����, �...����','��...�����, ��...������, ��...����������'], correctAnswers: [2] 
            },
            { 
                question: '������� ������� ������, � ������� �� ���� ������ ������ ���� ��������� ���� � �� �� �����.', 
                answers: ['�������������, ��������, ���������','��...���������, ��...����, ��...��������','��...������� (������), ��...��������, ��...����� (��������)','��...������, ����...������, ���...������'], correctAnswers: [1] 
            },
            { 
                question: '������� ������� ������, � ������� �� ���� ������ ������ ���� ��������� ���� � �� �� �����.', 
                answers: ['������, ���������','�����...������, ���...��','������...�, ����...���','���������...����, �����...����'], correctAnswers: [2] 
            },
            { 
                question: '������� ������� ������, � ������� �� ���� ������ ������ ���� ��������� ���� � �� �� �����.', 
                answers: ['(��������) �������...�, �������...���','(������) �����...����, (�����) ����...���','����...������, (�����) �����...��','����...�����, �������...�����'], correctAnswers: [2] 
            },
            { 
                question: '������� ������� ������, � ������� �� � ���������� ������ ������� ���������.', 
                answers: ['��� ������� ���� ������ (��)˨����','� ������������� ���� (��)������','(��)������� ����� ���� ��������','� ���� ��� ������ (��)�������� ���'], correctAnswers: [0] 
            },
            { 
                question: '���������� �����������, � ������� ���������� ����� ������� ������.', 
                answers: ['� ������� ���(��), ��� �� ��� ���������','�������� ����� ��(��) ������','�(���) �� �������� ����� �����','� ��(��) ���� ����� � ����'], correctAnswers: [3] 
            },
            { 
                question: '������� ������� ������, � ������� ������� �������� �����, ������������ ������� ������� ����.', 
                answers: ['���������','��������','��������','��������'], correctAnswers: [1] 
            },
        ];

        let currentQuestion = 0;
        let correctAnswers = 0;
        let answeredQuestions = new Array(questions.length).fill(false);
        let userAnswers = new Array(questions.length).fill([]);

        function showQuestion(index) {
            const questionContainer = document.getElementById('question-container');
            questionContainer.innerHTML = '';
            const questionNumberElement = document.createElement('div');
            questionNumberElement.classList.add('task');
            questionNumberElement.innerText = '������ ' + (index + 1);
            questionContainer.appendChild(questionNumberElement);
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            if (index === currentQuestion) {
                questionElement.classList.add('active');
            }
            questionElement.innerText = questions[index].question;
            questionContainer.appendChild(questionElement);

            for (let i = 0; i < questions[index].answers.length; i++) {
                const answerCheckbox = document.createElement('input');
                answerCheckbox.type = 'checkbox';
                answerCheckbox.id = 'answer' + i;
                if (userAnswers[currentQuestion].includes(i)) {
                    answerCheckbox.checked = true;
                }
                const answerLabel = document.createElement('label');
                answerLabel.htmlFor = 'answer' + i;
                answerLabel.innerText = questions[index].answers[i];
                questionContainer.appendChild(answerCheckbox);
                questionContainer.appendChild(answerLabel);
                questionContainer.appendChild(document.createElement('br'));
            }
        }

        function showNavigationButtons() {
            const navigationButtons = document.getElementById('navigation-buttons');
            navigationButtons.innerHTML = '';
            for (let i = 0; i < questions.length; i++) {
                const button = document.createElement('button');
                button.classList.add('nav-button');
                if (answeredQuestions[i]) {
                    button.classList.remove('nav-button');
                    button.classList.add('answered');
                }
                button.innerText = i + 1;
                button.addEventListener('click', function() {
                    currentQuestion = i;
                    showQuestion(currentQuestion);
                });
                navigationButtons.appendChild(button);
            }
        }

        function showResults() {
    if (answeredQuestions.every(val => val === true)) {
        const results = document.getElementById('results');
        results.style.display = 'flex';
        res.style.display = 'block';
        cost.style.display = 'none';

        const correctDiv = document.createElement('div');
        correctDiv.className = 'correct';
        const correctSpan = document.createElement('span');
        correctSpan.innerText = `${currentQuestion + 1}`;
        correctDiv.innerText = `������`;
        correctDiv.appendChild(correctSpan);

        const incorrectDiv = document.createElement('div');
        incorrectDiv.className = 'correct';
        const incorrectSpan = document.createElement('span');
        incorrectSpan.innerText = `${correctAnswers}`;
        incorrectDiv.innerText = `���������`;
        incorrectDiv.appendChild(incorrectSpan);

        const completedDiv = document.createElement('div');
        completedDiv.className = 'correct';
        const completedSpan = document.createElement('span');
        completedSpan.innerText = `${currentQuestion + 1 - correctAnswers}`;
        completedDiv.innerText = `�����������`;
        completedDiv.appendChild(completedSpan);

        results.appendChild(correctDiv);
        results.appendChild(incorrectDiv);
        results.appendChild(completedDiv);

        let score = Math.round((correctAnswers / questions.length) * 100);
        let scoreElement = document.getElementById('scoreDisplay');
        scoreElement.innerText = score;
    }
}


        document.getElementById('next-button').addEventListener('click', function() {
            userAnswers[currentQuestion] = [];
            for (let i = 0; i < questions[currentQuestion].answers.length; i++) {
                if (document.getElementById('answer' + i).checked) {
                    userAnswers[currentQuestion].push(i);
                }
            }
            if (userAnswers[currentQuestion].sort().join(',') === questions[currentQuestion].correctAnswers.sort().join(',')) {
                correctAnswers++;
            }
            answeredQuestions[currentQuestion] = true;
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
            } else {
                showResults();
            }
            showNavigationButtons();
        });

        showQuestion(currentQuestion);
        showNavigationButtons();

        let startTime, endTime;

function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, '0');
    timeInSeconds %= 3600;
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

document.getElementById('startBtn').addEventListener('click', function() {
    startTime = new Date();
});

document.getElementById('next-button').addEventListener('click', function() {
    if (currentQuestion >= questions.length - 1) {
        endTime = new Date();
        let timeDiff = endTime - startTime; 
        let seconds = Math.round(timeDiff / 1000); 
        document.getElementById('time').innerText = '��������� �� ' + formatTime(seconds);
    }
});

function alerted(){ 
alert("������� ������ � ��������� (��������� �����)"); 
}
