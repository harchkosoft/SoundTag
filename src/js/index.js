// Массив с путями к локальным звуковым файлам
const sounds = [
    "./src/audio/1.mp3",
    "./src/audio/2.mp3",
    "./src/audio/3.mp3",
    "./src/audio/4.mp3",
    "./src/audio/5.mp3",
];

let isMuted = false; // Переменная для проверки, заглушен ли звук
let currentAudio = null; // Переменная для хранения текущего аудиообъекта

// Функция для воспроизведения звука
function playSound() {
    if (isMuted) {
        return; // Если звук заглушен, ничего не делаем
    }

    if (currentAudio) {
        currentAudio.pause(); // Останавливаем текущий звук, если он есть
        currentAudio = null;
    }

    // Создаем новый аудиообъект и воспроизводим случайный звук
    const audio = new Audio(sounds[Math.floor(Math.random() * sounds.length)]);
    currentAudio = audio;

    audio.play()
        .then(() => {
            // Скрываем кнопку "Нажми меня" и показываем миньона и кнопку "Выключить звук"
            document.getElementById("playButton").style.display = "none";
            document.getElementById("minionImage").style.display = "block";
            document.getElementById("muteButton").style.display = "block";
            document.getElementById("errorText").style.display = "none";
        })
        .catch((error) => {
            console.log("Ошибка при воспроизведении звука:", error);
        });
}

// Добавляем обработчик для кнопки "Нажми меня"
document.querySelector("#playButton").addEventListener("click", playSound);

// Обработчик для кнопки "Выключить/Включить звук"
document.querySelector("#muteButton").addEventListener("click", function () {
    isMuted = !isMuted; // Переключаем состояние звука

    // Останавливаем или возобновляем звук в зависимости от состояния
    if (isMuted && currentAudio) {
        currentAudio.pause();
    } else if (!isMuted && currentAudio) {
        currentAudio.play();
    }

    // Изменяем текст и стиль кнопки в зависимости от состояния
    if (isMuted) {
        this.textContent = "Включить звук";
        this.classList.add("muted");
    } else {
        this.textContent = "Выключить звук";
        this.classList.remove("muted");
    }
});

// Обработчик клика на фон (всю страницу)
document.body.addEventListener("click", function (event) {
    // Проверяем, что клик был не по кнопке "Нажми меня" или "Выключить звук"
    if (event.target.id !== "playButton" && event.target.id !== "muteButton") {
        playSound();
    }
});